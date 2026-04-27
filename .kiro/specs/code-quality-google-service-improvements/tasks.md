# Implementation Plan: code-quality-google-service-improvements

## Overview

Targeted improvements to the `election-process-guide` FastAPI backend across two themes: code quality (type annotations, structured logging, test coverage, cache hygiene) and Google service integration (Gemini timeout handling, response-parser robustness, TTS observability, named constants). All existing behavior is preserved.

## Tasks

- [x] 1. Add named constants and `from __future__ import annotations` to all server modules
  - [x] 1.1 Add `REASON_READY`, `REASON_MISSING_API_KEY`, `REASON_LIBRARY_UNAVAILABLE` constants to `server/gemini_assistant.py` and replace inline strings in `gemini_service_status()`
    - Define three module-level string constants at the top of the file
    - Replace `"ready"`, `"missing_api_key"`, `"library_unavailable"` literals in `gemini_service_status()` with the constants
    - _Requirements: 8.1, 8.2_
  - [x] 1.2 Add `REASON_READY`, `REASON_DISABLED`, `REASON_MISSING_SERVICE_ACCOUNT_JSON`, `REASON_LIBRARY_UNAVAILABLE`, `REASON_INVALID_SERVICE_ACCOUNT_JSON`, `REASON_CLIENT_INITIALIZATION_FAILED` constants to `server/google_audio.py` and replace all inline strings in `_tts_client_status()`
    - Define six module-level string constants
    - Replace every inline reason string in `_tts_client_status()` with the corresponding constant
    - _Requirements: 8.1, 8.2_
  - [x] 1.3 Ensure `from __future__ import annotations` is present in `server/config.py`, `server/logic.py`, `server/schemas.py`, and `server/assistant_service.py`
    - Add the import as the first line (after the module docstring) in any module where it is missing
    - _Requirements: 1.3_

- [x] 2. Add explicit return-type annotations to all public functions
  - [x] 2.1 Add return-type annotations to `_t()`, `_lookup()`, and `_localized_actions()` in `server/logic.py`
    - Annotate `_t` as `-> str`, `_lookup` as `-> str`, `_localized_actions` as `-> list[str]`
    - Do not change any logic in the rule engine
    - _Requirements: 1.1, 1.2_
  - [x] 2.2 Verify all route handlers and helpers in `server/main.py` carry explicit return-type annotations
    - Confirm `add_security_headers`, `_service_status_response`, `_request_is_secure`, and all route functions are annotated
    - _Requirements: 1.1_

- [x] 3. Improve `_parse_labeled_lines` robustness in `server/gemini_assistant.py`
  - Replace `text.replace("```", "")` with `re.sub(r"```[^\n]*\n?", "", text)` to handle fenced code blocks with language tags (e.g., ` ```json `)
  - Add `import re` at the top of the file if not already present
  - _Requirements: 6.3, 6.4_

- [x] 4. Add Gemini timeout handling and extend caught exceptions in `server/gemini_assistant.py`
  - [x] 4.1 Pass `request_options={"timeout": 10}` to `model.generate_content(...)` call
    - _Requirements: 5.1_
  - [x] 4.2 Extend the `except` tuple to include `DeadlineExceeded` and `TimeoutError`; import `DeadlineExceeded` lazily inside the `try` block after the `import google.generativeai` line
    - _Requirements: 5.2, 5.3_
  - [ ]* 4.3 Write property test for timeout fallback (Property 3)
    - **Property 3: Timeout exceptions always produce fallback**
    - Use `hypothesis.strategies.sampled_from([DeadlineExceeded("timeout"), TimeoutError("timeout")])` to generate exception instances
    - Assert `enhance_guidance` returns `(base_result, "fallback")` and does not raise
    - **Validates: Requirements 5.2, 5.3**

- [x] 5. Improve structured logging in `server/google_audio.py`
  - [x] 5.1 Add `logger.warning` on the `(ValueError, TypeError, json.JSONDecodeError)` path in `_tts_client_status()`
    - Log message: `"TTS client initialization failed: invalid service account JSON"`
    - _Requirements: 2.3_
  - [x] 5.2 Add `logger.info("Google Cloud TTS client initialized successfully")` immediately before `return client, REASON_READY`
    - _Requirements: 7.4_
  - [x] 5.3 Update the `except Exception` block in `synthesize_speech` to include `language` and `len(text)` in the log message
    - Change to: `logger.exception("Google Cloud TTS synthesis failed (language=%s, text_length=%d)", language, len(text))`
    - _Requirements: 2.2, 7.1, 7.2_

- [x] 6. Checkpoint — verify existing tests still pass
  - Ensure all 13 existing tests pass with no failures or errors
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Add `pytest-cov` and `hypothesis` to `requirements.txt`
  - Append `pytest-cov>=5.0.0` and `hypothesis>=6.0.0` to `election-process-guide/requirements.txt`
  - _Requirements: 3.2, 10.3_

- [x] 8. Add new tests to `tests/test_server.py`
  - [x] 8.1 Add `test_parse_labeled_lines_is_total_for_arbitrary_input` (Test 14)
    - Call `_parse_labeled_lines` with the representative tricky-input list specified in the design
    - Assert each call returns a `dict` without raising
    - _Requirements: 3.3, 6.3_
  - [ ]* 8.2 Write property test for `_parse_labeled_lines` total-function property (Property 1)
    - **Property 1: `_parse_labeled_lines` is a total function**
    - Use `hypothesis.strategies.text()` to generate arbitrary Unicode strings
    - Assert return value is `dict` and no exception is raised for every generated input
    - **Validates: Requirements 3.3, 6.3**
  - [ ]* 8.3 Write property test for case-insensitive label matching (Property 2)
    - **Property 2: Label matching is case-insensitive**
    - Generate strings of the form `{random_case("Summary")}: {value}\n{random_case("Reassurance")}: {value2}` using `hypothesis.strategies.text()` for values
    - Assert returned dict contains `"summary"` and `"reassurance"` keys with correct values
    - **Validates: Requirements 6.1**
  - [x] 8.4 Add `test_gemini_enhance_guidance_falls_back_on_value_error` (Test 15)
    - Monkeypatch `google.generativeai` with a fake module whose `GenerativeModel.generate_content` raises `ValueError("bad response")`
    - Assert `enhance_guidance` returns `(base_result, "fallback")`
    - _Requirements: 3.4, 5.2_
  - [ ]* 8.5 Write property test for Google service exceptions never propagating (Property 4)
    - **Property 4: Google service exceptions never propagate to callers**
    - Use `hypothesis.strategies.sampled_from([ValueError, RuntimeError, AttributeError, Exception])` to generate exception types
    - Assert `enhance_guidance` and `synthesize_speech` always return fallback, never raise
    - **Validates: Requirements 2.5**
  - [x] 8.6 Add `test_synthesize_speech_returns_fallback_on_tts_exception` (Test 16)
    - Patch `_tts_client_status` to return `(FakeClient(), REASON_READY)` where `FakeClient.synthesize_speech` raises `RuntimeError("network error")`
    - Assert `synthesize_speech` returns `(None, "fallback")`
    - _Requirements: 3.5, 7.1_

- [x] 9. Final checkpoint — run full test suite and coverage report
  - Run `pytest --cov=server --cov-report=term-missing` from `election-process-guide/` and confirm ≥15 tests pass with zero failures
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 3.1, 3.2, 3.6, 10.1, 10.2_

- [x] 10. Commit and push to GitHub
  - [x] 10.1 Stage all changes with `git add -A` from `election-process-guide/`
    - _Requirements: 9.1_
  - [x] 10.2 Commit with message: `"improve: code quality and Google service integration (type annotations, logging, timeout, parser robustness, TTS observability, named constants, test coverage)"`
    - _Requirements: 9.2_
  - [x] 10.3 Push to remote with `git push` from `election-process-guide/`
    - _Requirements: 9.3_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests (Tasks 4.3, 8.2, 8.3, 8.5) use Hypothesis and validate universal correctness properties
- Unit tests (Tasks 8.1, 8.4, 8.6) validate specific examples and edge cases
- Do NOT modify any existing test, security header logic, accessibility/bilingual content, or the deterministic rule engine logic
