# Challenge Alignment

This standalone project is designed around one clear persona: **older voters who need a calm, simple, and accessible election guide**. The product is centered on the problem statement: **an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way**.

## Smart, dynamic assistant

- The assistant changes guidance based on:
  - current election step
  - selected concern
  - accessibility/support need
  - quiz progress
  - practice ballot progress
  - optional personal question
- The homepage now gives the assistant a primary call to action so the main solution is immediately visible to judges and users.
- The frontend always has an **offline quick preview assistant** for demos without a server.
- The backend can enhance the same guidance with **Google Gemini** when `GEMINI_API_KEY` is configured.
- The audio flow can use **Google Cloud Text-to-Speech** for more accessible spoken guidance when configured.

## Logical decision making

- Advice is not a single canned response.
- The rule engine explains **why the help was chosen** so judges can see the decision path.
- Accessibility settings such as larger text and high contrast are included in the context.

## Google Services

- **Google Gemini** is used server-side only for personalized, natural-language summaries and reassurance.
- **Google Cloud Text-to-Speech** is used server-side only for clearer elder-friendly audio playback.
- The UI only reports Google services as available when the backend has verified they are actually ready.
- API keys never reach the browser.
- The project still works without Google services, which keeps demos reliable and resource-efficient.

## Practical usability

- Older-adult-first UI
- English and Hindi support
- Audio playback
- Large text and high contrast controls
- Better button semantics with `aria-pressed`, live regions, busy states, focus management, and reduced-motion support
- Practice ballot
- Simple quiz
- FAQ for common real-world questions

## Code quality

- Frontend and backend live in one self-contained folder.
- Backend logic is split into `config`, `data`, `logic`, `gemini_assistant`, and `main`.
- The browser uses a lighter offline preview while the backend remains the main source of detailed decision logic.
- Safer assistant rendering avoids injecting model-produced action text with `innerHTML`.
- Tests cover real HTTP health, config, validation, extra-field rejection, security headers, audio behavior, and page serving.

## Security and responsibility

- Secrets stay in environment variables.
- Request validation uses Pydantic field constraints.
- Security headers are added to responses to reduce common browser-side risks, including stricter cross-origin and HTTPS-aware protection.
- Gemini responses are restricted to simple, low-risk educational guidance and fall back safely when unavailable.

## Efficiency

- Local rules handle most updates instantly.
- Gemini is used only when the user explicitly asks for refreshed personal guidance from the running server.
- Google Cloud voice is used only when the user asks to listen and the service is verified as ready; otherwise browser audio is used and the UI downgrades gracefully.
