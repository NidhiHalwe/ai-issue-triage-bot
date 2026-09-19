🤖 AI Issue Triage & Bug-Fix Bot
An automated, LLM-powered DevOps tool that integrates with GitHub Webhooks to analyze incoming repository issues, identify potential root causes, and generate code-fix suggestions using Google’s Gemini API.
Designed to streamline developer workflows, reduce manual issue-triage time, and demonstrate how LLMs can assist with real-world software-engineering tasks.
✨ Features
Automated Issue Triage: Listens for issues.opened events through GitHub Webhooks.
LLM-Powered Analysis: Uses Google’s Gemini API to analyze bug descriptions and available code context.
Automated Issue Responses: Posts actionable analysis and suggested fixes directly to the GitHub issue using Octokit.
Root-Cause Analysis: Identifies likely causes and affected areas based on the provided issue context.
Code-Fix Suggestions: Generates structured suggestions and example patches for developers to review.
Webhook-Based Architecture: Processes GitHub events automatically without manual intervention.
Environment Agnostic: Can run locally using ngrok or be deployed to a cloud environment.
🛠️ Tech Stack
Backend: Node.js, Express.js
AI Integration: Google Gemini API
GitHub Integration: Octokit REST API
Webhooks: GitHub Webhooks
Local Development: ngrok
Configuration: dotenv
Version Control: Git & GitHub
📁 Project Structure
ai-issue-triage-bot/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── .env.example
├── package.json
├── package-lock.json
└── README.md
🚀 Local Setup & Installation
1. Clone the Repository
git clone https://github.com/NidhiHalwe/ai-issue-triage-bot.git
cd ai-issue-triage-bot
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env file in the root directory:
GITHUB_TOKEN=your_github_personal_access_token
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
WEBHOOK_SECRET=your_custom_webhook_secret
Never commit your .env file or API keys to GitHub.
4. Start the Server
npm start
The server will start on:
http://localhost:3000
5. Expose the Local Server
For local GitHub webhook testing, use ngrok:
ngrok http 3000
Copy the generated HTTPS forwarding URL.
Example:
https://example.ngrok-free.app
6. Configure the GitHub Webhook
Open:
GitHub Repository
→ Settings
→ Webhooks
→ Add webhook
Configure:
Payload URL:
https://example.ngrok-free.app/webhook

Content type:
application/json

Secret:
YOUR_WEBHOOK_SECRET
Under Which events would you like to trigger this webhook?, select:
Issues
Then save the webhook.
💡 How It Works
GitHub Issue Created
        ↓
GitHub Webhook
        ↓
Node.js / Express Server
        ↓
Issue Context Extraction
        ↓
Gemini AI Analysis
        ↓
Root Cause + Suggested Fix
        ↓
Octokit GitHub API
        ↓
Automated Issue Comment
Example Workflow
A developer creates a GitHub issue describing a bug.
GitHub sends an issues.opened webhook event.
The Node.js server validates and processes the event.
The issue title and description are extracted.
Relevant context is sent to the Gemini model.
The model analyzes the issue and generates a structured response.
The response is posted back to the GitHub issue through Octokit.
The developer can review the suggested solution and apply the fix.
🎯 Example AI Response
Issue Analysis

Likely Cause:
The request handler does not properly handle
an undefined response value.

Affected Area:
API request handler

Suggested Fix:
Add validation before accessing the response
property and return an appropriate error response.

Suggested Test:
Add a regression test covering the undefined
response scenario.
🔐 Security
The application uses environment variables for sensitive credentials.
The following files should never be committed:
.env
private keys
GitHub access tokens
Gemini API keys
webhook secrets
A .gitignore file should include:
node_modules/
.env
.env.*
!.env.example
🚀 Future Improvements
Automatic repository cloning and codebase analysis
Pull-request generation for suggested fixes
Automated test execution
Docker-based isolated execution
Issue severity classification
