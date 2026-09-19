# 🤖 AI Issue Triage & Bug-Fix Bot

An automated, LLM-powered DevOps tool that integrates with GitHub Webhooks to analyze incoming repository issues, identify root causes, and automatically generate code-patch suggestions using Google's Gemini API. 

Designed to streamline developer workflows, reduce manual triage time, and showcase LLM performance in bug-fixing scenarios.

## ✨ Features
- Automated Issue Triage: Listens to issues.opened events via GitHub Webhooks.
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
git clone [https://github.com/your-username/ai-issue-triage-bot.git](https://github.com/your-username/ai-issue-triage-bot.git)
cd ai-issue-triage-bot
