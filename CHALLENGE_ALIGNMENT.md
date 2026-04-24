# Challenge Alignment

This standalone project is designed around one clear persona: **older voters who need a calm, simple, and accessible election guide**.

## Smart, dynamic assistant

- The assistant changes guidance based on:
  - current election step
  - selected concern
  - accessibility/support need
  - quiz progress
  - practice ballot progress
  - optional personal question
- The frontend always has a **local rule-based assistant** for offline demos.
- The backend can enhance the same guidance with **Google Gemini** when `GEMINI_API_KEY` is configured.

## Logical decision making

- Advice is not a single canned response.
- The rule engine explains **why the help was chosen** so judges can see the decision path.
- Accessibility settings such as larger text and high contrast are included in the context.

## Google Services

- **Google Gemini** is used server-side only for personalized, natural-language summaries and reassurance.
- API keys never reach the browser.
- The project still works without Gemini, which keeps demos reliable and resource-efficient.

## Practical usability

- Older-adult-first UI
- English and Hindi support
- Audio playback
- Large text and high contrast controls
- Practice ballot
- Simple quiz
- FAQ for common real-world questions

## Code quality

- Frontend and backend live in one self-contained folder.
- Backend logic is split into `config`, `data`, `logic`, `gemini_assistant`, and `main`.
- Tests cover health, config, assistant response shape, validation, and page serving.

## Security and responsibility

- Secrets stay in environment variables.
- Request validation uses Pydantic field constraints.
- Gemini responses are restricted to simple, low-risk educational guidance and fall back safely when unavailable.

## Efficiency

- Local rules handle most updates instantly.
- Gemini is used only when the user explicitly asks for refreshed personal guidance from the running server.
