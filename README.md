# 🤖 AI Issue Triage & Bug-Fix Bot

An automated, LLM-powered DevOps tool that integrates with GitHub Webhooks to analyze incoming repository issues, identify potential root causes, and generate actionable code-fix suggestions using Google's Gemini API.

The project demonstrates how Large Language Models can assist developers with real-world issue triage, debugging, and software-engineering workflows.

---

## ✨ Features

- 🤖 **Automated Issue Triage**
  - Monitors GitHub `issues.opened` webhook events.

- 🧠 **AI-Powered Issue Analysis**
  - Uses Google's Gemini API to analyze bug descriptions and available context.

- 🔍 **Root-Cause Analysis**
  - Identifies the likely cause of reported issues.

- 💻 **Code-Fix Suggestions**
  - Generates actionable solutions and example code changes.

- 💬 **Automated GitHub Comments**
  - Posts the AI-generated analysis directly to the GitHub issue.

- 🔗 **GitHub Integration**
  - Uses Octokit REST API for GitHub communication.

- 🌐 **Webhook Architecture**
  - Automatically processes issues as soon as they are created.

- 🚀 **Local & Cloud Ready**
  - Can be tested locally using ngrok or deployed to a cloud environment.

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │    GitHub Issue      │
                    │    Created / Opened  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   GitHub Webhook     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Node.js + Express    │
                    │ Webhook Server       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Issue Context        │
                    │ Extraction           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Gemini AI          │
                    │   Analysis Engine    │
                    └──────────┬───────────┘
                               │
                     ┌─────────┴─────────┐
                     ▼                   ▼
              Root Cause            Fix Suggestion
                     │                   │
                     └─────────┬─────────┘
                               ▼
                    ┌──────────────────────┐
                    │   GitHub Octokit     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ AI Response Posted   │
                    │ Back to GitHub Issue │
                    └──────────────────────┘
