# Requirements Document

## Introduction

This feature improves the `election-process-guide` project across two focused topics:

1. **Code Quality** — improve maintainability, type safety, structured logging, test coverage, and efficiency without breaking any existing behavior (security headers, accessibility, validation, bilingual content, and the deterministic rule engine all remain intact).
2. **Google Service Integration** — improve the robustness, timeout handling, retry/fallback observability, and response-parsing resilience of the Gemini and Google Cloud Text-to-Speech integrations.

After all changes are applied, the updated code is pushed to GitHub and test coverage percentages are reported.

---

## Glossary

- **System**: The FastAPI backend located under `election-process-guide/server/`.
- **Gemini_Client**: The optional Google Gemini generative-AI integration in `gemini_assistant.py`.
- **TTS_Client**: The optional Google Cloud Text-to-Speech integration in `google_audio.py`.
- **Rule_Engine**: The deterministic guidance logic in `logic.py`.
- **Assistant_Service**: The orchestration layer in `assistant_service.py`.
- **Test_Suite**: The pytest test suite in `election-process-guide/tests/test_server.py`.
- **Coverage_Report**: The pytest-cov output showing per-module line-coverage percentages.
- **Service_Status**: A dict with keys `available: bool` and `reason: str` returned by status helpers.
- **Fallback**: The deterministic path taken when a Google service is unavailable or fails.
- **Cache**: The `lru_cache`-backed singleton used for service client initialization.

---

## Requirements

### Requirement 1: Code Quality — Type Safety and Maintainability

**User Story:** As a developer, I want all public server functions to carry explicit return-type annotations, so that static analysis tools can catch type errors before runtime.

#### Acceptance Criteria

1. THE System SHALL provide explicit return-type annotations on every public function in `main.py`, `assistant_service.py`, `google_services.py`, `gemini_assistant.py`, `google_audio.py`, `logic.py`, `config.py`, and `schemas.py`.
2. WHEN a function returns `None` implicitly, THE System SHALL annotate the return type as `None`.
3. THE System SHALL use `from __future__ import annotations` in every server module so that forward references resolve correctly at import time.

---

### Requirement 2: Code Quality — Structured Logging

**User Story:** As a developer, I want all error and warning paths to emit structured log records instead of silently swallowing exceptions, so that production issues are observable without changing application behavior.

#### Acceptance Criteria

1. WHEN the Gemini_Client falls back to deterministic guidance due to a caught exception, THE System SHALL emit a `logger.warning` record that includes the exception message.
2. WHEN the TTS_Client fails during speech synthesis, THE System SHALL emit a `logger.exception` record that includes the exception context.
3. WHEN the TTS_Client fails during client initialization, THE System SHALL emit a `logger.warning` record that includes the failure reason string.
4. THE System SHALL use the module-level `logger = logging.getLogger(__name__)` pattern in every server module that performs error handling.
5. IF a log record is emitted for a Google service failure, THEN THE System SHALL NOT raise an unhandled exception to the caller; the Fallback path SHALL be taken instead.

---

### Requirement 3: Code Quality — Test Coverage and Reporting

**User Story:** As a developer, I want the test suite to cover the key logic branches and report line-coverage percentages, so that I can see exactly which lines are exercised.

#### Acceptance Criteria

1. THE Test_Suite SHALL include at least 15 passing tests after the improvements are applied (up from 13).
2. WHEN `pytest --cov=server --cov-report=term-missing` is executed from the `election-process-guide/` directory, THE System SHALL produce a Coverage_Report showing per-module line-coverage percentages.
3. THE Test_Suite SHALL include a test that verifies `_parse_labeled_lines` returns an empty dict (not an exception) for any arbitrary string input, covering the property that the parser is total and never raises.
4. THE Test_Suite SHALL include a test that verifies the Gemini enhancement falls back gracefully when `enhance_guidance` raises a `ValueError` mid-call.
5. THE Test_Suite SHALL include a test that verifies `synthesize_speech` returns `(None, "fallback")` when the TTS client raises an unexpected exception during synthesis.
6. WHEN all tests are run, THE Test_Suite SHALL report zero failures and zero errors.

---

### Requirement 4: Code Quality — Efficiency and Cache Hygiene

**User Story:** As a developer, I want the service-client caches to be clearable in tests and to avoid redundant work at runtime, so that test isolation is guaranteed and the server starts efficiently.

#### Acceptance Criteria

1. THE System SHALL expose `cache_clear()` on every `lru_cache`-decorated function used for service client initialization so that tests can reset state between runs.
2. WHEN `collect_google_service_statuses` is called multiple times within a single request, THE System SHALL call each underlying status helper at most once per request by relying on the cached client state.
3. THE System SHALL NOT import `google.generativeai` or `google.cloud.texttospeech` at module load time; imports SHALL remain inside the functions that use them so that the server starts without those libraries installed.

---

### Requirement 5: Google Service Integration — Gemini Timeout Handling

**User Story:** As a developer, I want Gemini API calls to respect a configurable timeout, so that a slow or unresponsive Gemini endpoint cannot block a user request indefinitely.

#### Acceptance Criteria

1. WHEN the Gemini_Client calls `model.generate_content`, THE System SHALL pass a `request_options` argument that sets a timeout of no more than 10 seconds.
2. IF the Gemini_Client call raises a timeout-related exception, THEN THE System SHALL log a warning and return the Fallback result without propagating the exception to the caller.
3. THE System SHALL treat `google.api_core.exceptions.DeadlineExceeded` and `TimeoutError` as timeout signals that trigger the Fallback path.

---

### Requirement 6: Google Service Integration — Gemini Response Parsing Robustness

**User Story:** As a developer, I want the Gemini response parser to handle any string without raising an exception, so that malformed or unexpected model output never causes a 500 error.

#### Acceptance Criteria

1. THE Gemini_Client SHALL parse labeled lines in a case-insensitive manner so that `Summary:`, `SUMMARY:`, and `summary:` are all recognized.
2. WHEN the parsed response is missing both `summary` and `reassurance` fields, THE System SHALL fall back to the deterministic `base_result` without raising an exception.
3. FOR ALL string inputs passed to `_parse_labeled_lines`, THE System SHALL return a `dict` and SHALL NOT raise any exception (total-function property).
4. WHEN the Gemini response contains markdown code fences or leading/trailing whitespace, THE System SHALL strip those before parsing.

---

### Requirement 7: Google Service Integration — TTS Retry and Observability

**User Story:** As a developer, I want the TTS integration to log synthesis failures with enough context to diagnose issues, so that audio problems are observable in production logs.

#### Acceptance Criteria

1. WHEN `synthesize_speech` catches an exception from the TTS client, THE System SHALL log the exception using `logger.exception` so that the full traceback is captured.
2. WHEN `synthesize_speech` returns `(None, "fallback")` due to an exception, THE System SHALL include the language and text length (not the full text) in the log record for context.
3. THE System SHALL NOT retry a failed TTS synthesis call automatically; the Fallback path SHALL be taken immediately on the first failure.
4. WHEN the TTS client is initialized successfully, THE System SHALL log a `logger.info` record confirming readiness.

---

### Requirement 8: Google Service Integration — Service Status Consistency

**User Story:** As a developer, I want all Service_Status reason strings to be defined as named constants, so that callers can compare against known values without relying on free-form text.

#### Acceptance Criteria

1. THE System SHALL define all valid `reason` string values as module-level constants in `google_audio.py` and `gemini_assistant.py` (e.g., `REASON_READY = "ready"`, `REASON_DISABLED = "disabled"`).
2. WHEN a Service_Status is returned, THE System SHALL use only the defined constants for the `reason` field.
3. THE Test_Suite SHALL assert against the named constants rather than raw string literals when checking `reason` values, so that a rename is caught at compile time.

---

### Requirement 9: GitHub Push

**User Story:** As a developer, I want all improvements committed and pushed to the remote GitHub repository, so that the updated code is available to collaborators and the CI pipeline.

#### Acceptance Criteria

1. WHEN all code changes and new tests are complete, THE System SHALL have a clean `git status` (no untracked or modified files outside the spec directory).
2. THE System SHALL commit all changes with a descriptive commit message that references both improvement topics.
3. WHEN `git push` is executed from the `election-process-guide/` directory, THE System SHALL push successfully to the configured remote branch without merge conflicts.

---

### Requirement 10: Test Coverage Display

**User Story:** As a developer, I want to see test coverage percentages for each server module after the work is complete, so that I can confirm the improvements are exercised.

#### Acceptance Criteria

1. WHEN `pytest --cov=server --cov-report=term-missing` is run, THE Coverage_Report SHALL display a coverage percentage for each of the following modules: `main`, `assistant_service`, `gemini_assistant`, `google_audio`, `google_services`, `logic`, `config`, `schemas`.
2. THE Coverage_Report SHALL show an overall combined coverage percentage across all server modules.
3. WHERE `pytest-cov` is not installed, THE System SHALL include `pytest-cov` in `requirements.txt` so that the coverage report can be generated after a standard `pip install -r requirements.txt`.
