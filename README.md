# Election Process Guide

This folder contains a standalone, elder-friendly election explainer designed for the **older voter** persona. The main experience is a **smart election assistant** that helps people understand the election process, timeline, and next steps in a calm, interactive way. It includes an offline quick preview in the browser and a secure backend that can optionally use **Google Gemini** plus **Google Cloud Text-to-Speech** when the server is running.

## What is included

- Simple bilingual interface in English and Hindi
- Large text and high-contrast controls
- Voice playback with browser text-to-speech
- Step-by-step election guide with Next and Back buttons
- Visual timeline
- Real-life voting guidance
- Practice ballot
- Simple quiz with instant feedback
- FAQ section
- Persona-aware assistant that changes advice using:
  - the current election step
  - selected concern
  - support need
  - quiz progress
  - practice ballot progress
  - optional user question
- Assistant-first homepage flow with a direct jump into personal guidance
- Honest Google service status reporting so the UI only advertises Gemini or Google voice when they are actually ready
- Optional Google Cloud Text-to-Speech audio for clearer elder-friendly playback
- Security headers on all app responses, including stricter browser isolation and HTTPS-aware transport protection
- Reduced-motion support and keyboard focus management for the assistant response flow
- HTTP route tests for validation, security headers, audio behavior, and page serving

## Quick demo options

### 1. Frontend only

Open [index.html](./index.html) in a browser.

This keeps the guide fully usable with the **offline quick preview assistant** but does not enable server-side Gemini responses.

### 2. Full challenge-ready mode

Run the local FastAPI server so the UI, validation, and optional Google integrations are available together.

```powershell
cd election-process-guide
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn server.main:app --app-dir . --reload --host 127.0.0.1 --port 8001
```

Then open:

`http://127.0.0.1:8001`

## Google services setup

1. Copy `.env.example` to `.env`.
2. Set `GEMINI_API_KEY=...` for personalized assistant guidance.
3. To enable Google Cloud voice, set:
   - `GOOGLE_TTS_ENABLED=true`
   - `GOOGLE_SERVICE_ACCOUNT_JSON=...`
4. Start the server with the environment loaded.

When configured:

- **Google Gemini** adds a more natural personalized summary and reassurance.
- **Google Cloud Text-to-Speech** provides clearer server-generated audio playback for older users who benefit from slower, more consistent voice output.

If those services are not configured, the project still works safely with:

- offline assistant preview
- browser speech synthesis fallback

## Tests

```powershell
cd election-process-guide
python -m pytest tests -v
```

## Challenge notes

- Persona/vertical: **older voter**
- Google services: **Gemini** and **Google Cloud Text-to-Speech**
- Safety: secrets remain server-side, responses include security headers, and requests are validated
- Maintainability: backend logic is split into small files under [`server`](./server), service readiness is centralized, and risky assistant rendering paths now use safe DOM updates
- Testing: route-level tests cover config, validation, unexpected fields, blank-input rejection, audio fallbacks, HTML serving, HTTPS-aware headers, and security headers

See [CHALLENGE_ALIGNMENT.md](./CHALLENGE_ALIGNMENT.md) for a direct rubric mapping.
