# AI Issue Triage & Bug-Fix Bot

A Node.js webhook service that sends newly opened GitHub issues to Gemini and posts the suggested JavaScript fix as an issue comment.

## Setup

1. Copy `.env.example` to `.env` and set the GitHub token, Gemini API key, and webhook secret.
2. Install dependencies with `npm install`.
3. Start the service with `npm start`.
4. Configure a GitHub repository webhook pointing to `/webhook` with `application/json` content type and the same webhook secret.

The service accepts `issues.opened` events and exposes `GET /health` for health checks.

`GEMINI_MODEL` defaults to `gemini-3.6-flash`. Set it in `.env` if you need to use another model available for your API key.

## Docker

Run `docker compose up --build` after creating `.env` from `.env.example`.
