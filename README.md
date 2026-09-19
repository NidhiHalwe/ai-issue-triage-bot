````markdown
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
                    │      Gemini AI       │
                    │   Analysis Engine     │
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
````

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript
* REST API

### AI

* Google Gemini API

### GitHub Integration

* GitHub Webhooks
* GitHub REST API
* Octokit

### Development Tools

* Git
* GitHub
* npm
* Postman
* VS Code
* ngrok

---

## 📁 Project Structure

```text
ai-issue-triage-bot/
│
├── src/
│   ├── controllers/
│   │   └── issueController.js
│   │
│   ├── services/
│   │   ├── aiService.js
│   │   └── githubService.js
│   │
│   ├── routes/
│   │   └── webhookRoutes.js
│   │
│   ├── utils/
│   │   └── issueParser.js
│   │
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/NidhiHalwe/ai-issue-triage-bot.git
```

### 2. Navigate to the Project

```bash
cd ai-issue-triage-bot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

### 5. Start the Server

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## 🔐 Environment Variables

| Variable                | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `PORT`                  | Port on which the Node.js server runs           |
| `GEMINI_API_KEY`        | Google Gemini API key                           |
| `GITHUB_TOKEN`          | GitHub personal access token                    |
| `GITHUB_WEBHOOK_SECRET` | Secret used to validate GitHub webhook requests |

> Never commit your `.env` file or expose API keys publicly.

---

## 🔗 GitHub Webhook Setup

To connect the bot with a GitHub repository:

### Step 1

Open your GitHub repository.

### Step 2

Go to:

```text
Settings → Webhooks → Add webhook
```

### Step 3

Enter your publicly accessible backend URL.

For local development using ngrok:

```text
https://your-ngrok-url.ngrok-free.app/api/webhook
```

For production:

```text
https://your-domain.com/api/webhook
```

### Step 4

Set the content type to:

```text
application/json
```

### Step 5

Add the same webhook secret configured in your `.env` file.

### Step 6

Select the GitHub event:

```text
Issues
```

### Step 7

Save the webhook.

Whenever a new issue is opened, GitHub sends the issue information to the Node.js backend.

---

## 🔄 Workflow

```text
GitHub Issue Created
        │
        ▼
GitHub Webhook Triggered
        │
        ▼
Node.js Webhook Server
        │
        ▼
Issue Data Extracted
        │
        ▼
AI Prompt Generated
        │
        ▼
Gemini API
        │
        ├── Issue Classification
        ├── Severity Analysis
        ├── Root Cause Analysis
        ├── Relevant Context
        └── Fix Suggestions
        │
        ▼
Structured AI Response
        │
        ▼
GitHub Octokit
        │
        ▼
Comment Posted on GitHub Issue
```

---

## 🧠 AI Analysis

The AI analyzes incoming issues and generates structured information such as:

### Issue Type

Examples:

* Bug
* Feature Request
* Enhancement
* Documentation
* Performance
* Security
* Configuration

### Severity

The issue can be analyzed based on its potential impact:

* Low
* Medium
* High
* Critical

### Root Cause

The AI identifies the most likely technical cause based on the issue description and available context.

### Relevant Files

The system can identify potentially affected files, modules, components, or services.

### Suggested Fix

The AI provides an actionable explanation of the changes that could help resolve the issue.

---

## 💬 Example Issue

### GitHub Issue

```text
Users are receiving a 500 Internal Server Error
when trying to update their profile information.
```

### AI Generated Analysis

```text
Issue Type:
Bug

Severity:
High

Possible Root Cause:
The profile update endpoint may be receiving invalid
user data or failing during database validation.

Relevant Area:
User profile update API

Suggested Investigation:
1. Check the request payload.
2. Validate authentication middleware.
3. Check database validation.
4. Inspect the profile update controller.
5. Review database error handling.

Suggested Fix:
Validate the incoming request body before performing
the database update and return a meaningful error
response when required fields are missing.
```

---

## 📊 Example GitHub Comment

The bot can post a structured analysis directly to the GitHub issue:

```text
🤖 AI Issue Analysis

Type: Bug
Severity: High

Root Cause:
The profile update endpoint may be failing because
required request fields are not being validated.

Affected Area:
Profile Update API

Recommended Fix:
Add request validation before performing the database
operation and return a proper 400 response for invalid data.

Suggested Files:
- controllers/profileController.js
- routes/profileRoutes.js
- middleware/validation.js
```

---

## 🎯 Real-World Use Cases

This project can help development teams with:

* GitHub issue triage
* Automated bug classification
* Initial debugging
* Root-cause investigation
* Developer productivity
* Open-source project maintenance
* AI-assisted software development
* Automated issue response
* Faster engineering workflows

---

## 💡 Why This Project?

Software development teams often receive a large number of GitHub issues.

Developers usually need to manually understand:

* What type of issue was reported
* How severe the issue is
* Which part of the application may be affected
* What could be causing the problem
* Which files should be investigated
* What the possible solution might be

This project explores how Large Language Models can assist developers during the initial stages of software debugging and issue triage.

---

## 🔒 Security

The project follows basic security practices:

* API keys are stored using environment variables.
* `.env` files are excluded using `.gitignore`.
* GitHub webhook secrets are used for request validation.
* Sensitive credentials should never be committed to GitHub.
* GitHub tokens should be granted only the permissions required by the application.

---

## 🧪 Testing

The project can be tested using:

* GitHub test issues
* GitHub Webhooks
* Postman
* Local development environment
* ngrok for webhook forwarding

Example local endpoint:

```text
POST /api/webhook
```

---

## 🚀 Deployment

The Node.js application can be deployed to platforms such as:

* Render
* Railway
* AWS
* Google Cloud
* Azure
* DigitalOcean

For local webhook development, ngrok can be used to expose the local server publicly.

---

## 🔮 Future Improvements

* [ ] Automatic repository codebase analysis
* [ ] Automatic bug reproduction
* [ ] Docker-based isolated execution
* [ ] Automated test execution
* [ ] AI-generated unit tests
* [ ] Code patch generation
* [ ] Automatic Pull Request creation
* [ ] GitHub Actions integration
* [ ] Code coverage analysis
* [ ] Duplicate issue detection
* [ ] Similar issue detection
* [ ] Multiple LLM provider support
* [ ] Issue analytics dashboard
* [ ] Repository-level context analysis
* [ ] Automated regression testing

---

## 🧩 Future Architecture

The long-term goal is to evolve the system from an issue-triage assistant into a more complete AI software-engineering agent.

```text
                    GitHub Issue
                         │
                         ▼
                 Understand Issue
                         │
                         ▼
                Analyze Repository
                         │
                         ▼
                  Reproduce Bug
                         │
                         ▼
                 Identify Root Cause
                         │
                         ▼
                    Modify Code
                         │
                         ▼
                   Run Tests
                         │
                         ▼
                 Evaluate Changes
                         │
                         ▼
                Generate Code Diff
                         │
                         ▼
                Create Pull Request
```

---

## 📌 Project Highlights

```text
✔ GitHub Webhook Integration
✔ GitHub REST API
✔ Octokit Integration
✔ Node.js Backend
✔ Express.js
✔ Gemini AI Integration
✔ Automated Issue Triage
✔ Bug Classification
✔ Severity Analysis
✔ Root Cause Analysis
✔ Code-Fix Suggestions
✔ Automated GitHub Comments
✔ REST API Architecture
✔ Real-World Developer Workflow
```

---

## 🌟 Key Engineering Concepts Demonstrated

* Event-driven architecture
* Webhook-based integrations
* REST API development
* GitHub API integration
* LLM API integration
* Prompt engineering
* Backend service architecture
* Environment-based configuration
* Error handling
* Secure API key management
* Automated developer workflows

---

## 👨‍💻 Author

**Nidhi Halwe**

Full Stack Developer | JavaScript | Node.js | React | AI Applications

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available for educational and development purposes.

````

Ab **writing block ke andar jo poora ` ```markdown ... ``` ` hai**, usko hi copy karke GitHub ke `README.md` mein paste karna hai. `## Features`, `## Architecture`, `-` bullets, code blocks sab waise hi render honge.
````
