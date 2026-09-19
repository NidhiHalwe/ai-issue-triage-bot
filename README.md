# 🤖 AI Issue Triage & Bug-Fix Bot

An automated, LLM-powered DevOps tool that integrates with GitHub Webhooks to analyze incoming repository issues, identify root causes, and automatically generate code-patch suggestions using Google's Gemini API. 

Designed to streamline developer workflows, reduce manual triage time, and showcase LLM performance in bug-fixing scenarios.

## ✨ Features
- **Automated Issue Triage:** Listens to issues.opened events via GitHub Webhooks.
- LLM-Driven Analysis: Utilizes the Google Gemini API (`gemini-pro`) to analyze bug descriptions and code snippets.
- Auto-Commenting System: Automatically posts actionable code fixes back to the GitHub issue using @octokit/rest.
- Environment Agnostic: Easily configurable for local development (via ngrok) or cloud deployment.

## 🛠️ Tech Stack
- Backend: Node.js, Express.js
- AI Integration: Google Gemini API (`@google/generative-ai`)
- GitHub API: Octokit REST API (`@octokit/rest`)
- Webhooks & Tunneling: GitHub Webhooks, ngrok

## 🚀 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/NidhiHalwe/ai-issue-triage-bot.git](https://github.com/NidhiHalwe/ai-issue-triage-bot.git)
cd ai-issue-triage-bot
2. Install Dependencies
npm install
3. Environment Variables
Create a .env file in the root directory and add the following keys:
GITHUB_TOKEN=your_github_personal_access_token_with_repo_scope
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
WEBHOOK_SECRET=your_custom_webhook_secret
4. Run the Server
npm start
The server will start listening on http://localhost:3000.
5. Expose Local Server (For GitHub Webhooks)
Use ngrok to create a secure tunnel to your local server:
ngrok http 3000
Copy the forwarding URL (e.g., https://<your-id>.ngrok-free.app).
6. Configure GitHub Webhook
Go to your GitHub Repository Settings > Webhooks.
Click Add webhook.
Payload URL: Paste your ngrok URL and append /webhook (e.g., https://<your-id>.ngrok-free.app/webhook).
Content type: application/json.
Secret: Enter the WEBHOOK_SECRET defined in your .env file.
Events: Select Issues.
Click Add webhook.
💡 How it Works
A user creates a new issue in the GitHub repository detailing a bug.
GitHub fires a Webhook event payload to the Node.js Express server.
The server extracts the issue title and body, constructing a prompt for the Gemini LLM.
Gemini processes the context and returns a formatted markdown response containing the corrected code.
Octokit takes the LLM's response and publishes it as a comment on the original GitHub issue.
Author: Nidhi Halwe Software Engineer | Educator
