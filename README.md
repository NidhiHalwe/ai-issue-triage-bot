Act as a Senior DevOps and Backend Software Engineer. I need to build an "AI Issue Triage & Bug-Fix Bot" using Node.js. The goal is to evaluate an LLM's ability to fix bugs in open-source repositories. 

Please generate the complete project structure and code with the following specifications:

1. Tech Stack: Node.js, Express.js (for receiving webhooks), @octokit/rest (for GitHub API interaction), and the '@google/generative-ai' npm package.
2. Core Logic: 
   - Create an Express server listening for GitHub webhooks on the /webhook endpoint (handling the issues.opened event).
   - When a new issue is opened, extract the issue title and body.
   - Send this data to the Google Gemini API (use the 'gemini-1.5-flash' model) with a strict system prompt instructing it to act as a Senior JavaScript Developer and provide a direct code snippet fix for the bug described.
   - Use Octokit to automatically post the Gemini model's response as a comment back on that specific GitHub issue.
3. Environment & DevOps:
   - Provide a complete .env.example file (needs GITHUB_TOKEN, GEMINI_API_KEY, PORT=3000, WEBHOOK_SECRET).
   - Generate a production-ready Dockerfile to containerize this Node.js app using a lightweight alpine image (`node:20-alpine`).
   - Generate a docker-compose.yml file to run this locally on port 3000.
4. Output Requirements: 
   - Add basic try-catch blocks for API failures and webhook signature verification.
   - Provide the complete file structure, package.json dependencies, and the code for index.js, Dockerfile, and docker-compose.yml.
