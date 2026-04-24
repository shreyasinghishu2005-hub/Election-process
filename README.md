# Election Process Guide

This folder contains a standalone, elder-friendly election explainer designed for the **older voter** persona. It now includes a **smart assistant** that uses local decision rules by default and can optionally use **Google Gemini** plus **Google Cloud Text-to-Speech** from a secure backend when the server is running.

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
- Optional Google Cloud Text-to-Speech audio for clearer elder-friendly playback

## Quick demo options

### 1. Frontend only

Open [index.html](./index.html) in a browser.

This keeps the guide fully usable with the **local smart assistant** but does not enable server-side Gemini responses.

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

- local assistant rules
- browser speech synthesis fallback

## Tests

```powershell
cd election-process-guide
python -m pytest tests -v
```

## Challenge notes

- Persona/vertical: **older voter**
- Google services: **Gemini** and **Google Cloud Text-to-Speech**
- Safety: secrets remain server-side and requests are validated
- Maintainability: backend logic is split into small files under [`server`](./server)

See [CHALLENGE_ALIGNMENT.md](./CHALLENGE_ALIGNMENT.md) for a direct rubric mapping.
