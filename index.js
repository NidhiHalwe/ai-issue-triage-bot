require('dotenv').config();

const crypto = require('node:crypto');
const express = require('express');
const { Octokit } = require('@octokit/rest');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const requiredEnvironmentVariables = [
  'GITHUB_TOKEN',
  'GEMINI_API_KEY',
  'WEBHOOK_SECRET'
];

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

const app = express();
const port = Number(process.env.PORT) || 3000;
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const model = generativeAI.getGenerativeModel({
  model: geminiModelName,
  systemInstruction: [
    'Act as a Senior JavaScript Developer performing issue triage.',
    'Analyze the GitHub issue title and body provided by the user.',
    'Identify the likely root cause and provide a direct, actionable code snippet fix.',
    'Prefer a minimal patch over a full rewrite.',
    'Include a short explanation and mention assumptions when the issue lacks context.',
    'Do not invent repository files or claim to have tested the code.'
  ].join(' ')
});

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  let processingStage = 'signature verification';

  try {
    if (!verifyWebhookSignature(request)) {
      return response.status(401).json({ error: 'Invalid webhook signature' });
    }

    const event = request.get('x-github-event');
    processingStage = 'payload parsing';
    const payload = JSON.parse(request.body.toString('utf8'));

    if (event !== 'issues' || payload.action !== 'opened') {
      return response.status(200).json({ message: 'Event ignored' });
    }

    const issueTitle = payload.issue?.title;
    const issueBody = payload.issue?.body || '(No issue body provided.)';
    const repositoryOwner = payload.repository?.owner?.login;
    const repositoryName = payload.repository?.name;
    const issueNumber = payload.issue?.number;

    if (!issueTitle || !repositoryOwner || !repositoryName || !issueNumber) {
      return response.status(400).json({ error: 'Malformed issue webhook payload' });
    }

    const prompt = [
      `Issue title: ${issueTitle}`,
      `Issue body:\n${issueBody}`
    ].join('\n\n');

    processingStage = `Gemini request (${geminiModelName})`;
    const result = await model.generateContent(prompt);
    const suggestedFix = result.response.text();

    processingStage = 'GitHub issue comment';
    await octokit.issues.createComment({
      owner: repositoryOwner,
      repo: repositoryName,
      issue_number: issueNumber,
      body: `## Gemini Bug-Fix Suggestion\n\n${suggestedFix}`
    });

    return response.status(201).json({ message: 'Issue triaged successfully' });
  } catch (error) {
    console.error(`Webhook processing failed during ${processingStage}:`, {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code
    });
    return response.status(500).json({ error: 'Failed to process webhook' });
  }
});

function verifyWebhookSignature(request) {
  try {
    const signature = request.get('x-hub-signature-256');

    if (!signature || !Buffer.isBuffer(request.body)) {
      return false;
    }

    const expectedSignature = `sha256=${crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(request.body)
      .digest('hex')}`;

    const receivedSignature = Buffer.from(signature, 'utf8');
    const calculatedSignature = Buffer.from(expectedSignature, 'utf8');

    return receivedSignature.length === calculatedSignature.length
      && crypto.timingSafeEqual(receivedSignature, calculatedSignature);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

const server = app.listen(port, () => {
  console.log(`AI Issue Triage & Bug-Fix Bot listening on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing server or set PORT to another value in .env.`);
  } else {
    console.error('Server startup failed:', error);
  }

  process.exit(1);
});
