"""Optional Google Gemini enhancement for the election guide assistant."""

from __future__ import annotations

from dataclasses import replace
from functools import lru_cache
import logging
import re
from typing import Literal

from . import config
from .logic import GuideResult

Source = Literal["gemini", "fallback"]

logger = logging.getLogger(__name__)

# Named constants for service status reason strings
REASON_READY: str = "ready"
REASON_MISSING_API_KEY: str = "missing_api_key"
REASON_LIBRARY_UNAVAILABLE: str = "library_unavailable"


@lru_cache(maxsize=1)
def _gemini_import_error() -> str | None:
    try:
        import google.generativeai as genai  # type: ignore[import-untyped]
    except Exception as exc:  # pragma: no cover - depends on local environment
        return str(exc)
    return None


def gemini_service_status() -> dict[str, str | bool]:
    if not config.gemini_api_key():
        return {"available": False, "reason": REASON_MISSING_API_KEY}
    import_error = _gemini_import_error()
    if import_error:
        return {"available": False, "reason": REASON_LIBRARY_UNAVAILABLE}
    return {"available": True, "reason": REASON_READY}


def _parse_labeled_lines(text: str) -> dict[str, str]:
    cleaned = re.sub(r"```[^\n]*\n?", "", text).strip()
    values: dict[str, str] = {}
    for raw_line in cleaned.splitlines():
        line = raw_line.strip()
        if line.lower().startswith("summary:"):
            values["summary"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("reassurance:"):
            values["reassurance"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("verificationtip:"):
            values["verification_tip"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("followupprompt:"):
            values["follow_up_prompt"] = line.split(":", 1)[1].strip()
    return values


def enhance_guidance(
    *,
    language: str,
    step_title: str,
    concern_label: str,
    support_label: str,
    question: str | None,
    base_result: GuideResult,
) -> tuple[GuideResult, Source]:
    status = gemini_service_status()
    if not status["available"]:
        return base_result, "fallback"

    # Resolve DeadlineExceeded once before the try block to avoid scoping issues
    try:
        from google.api_core.exceptions import DeadlineExceeded as _DeadlineExceeded  # type: ignore[import-untyped]
    except Exception:
        _DeadlineExceeded = Exception  # type: ignore[assignment,misc]

    try:
        import google.generativeai as genai  # type: ignore[import-untyped]

        genai.configure(api_key=config.gemini_api_key())
        model = genai.GenerativeModel("gemini-1.5-flash")
        language_name = "Hindi" if language == "hi" else "English"

        prompt = (
            "You are a calm election learning assistant designed for older adults.\n"
            f"Write in {language_name}.\n"
            "Use short, clear sentences. Do not invent exact legal rules or local services. "
            "If a rule might vary by place, say to confirm with official election sources.\n"
            "Return exactly four labeled lines:\n"
            "Summary: ...\n"
            "Reassurance: ...\n"
            "VerificationTip: ...\n"
            "FollowUpPrompt: ...\n\n"
            f"Current step: {step_title}\n"
            f"Current concern: {concern_label}\n"
            f"Support need: {support_label}\n"
            f"User question: {question or 'None provided'}\n"
            f"Base summary: {base_result.summary}\n"
            f"Actions already chosen by rule engine: {' | '.join(base_result.actions)}\n"
            f"Base verification tip: {base_result.verification_tip}\n"
            f"Base follow-up prompt: {base_result.follow_up_prompt}\n"
            f"Why this help: {base_result.why_this_help}\n"
        )

        response = model.generate_content(
            prompt,
            generation_config={"max_output_tokens": 280, "temperature": 0.35},
            request_options={"timeout": 10},
        )
        parsed = _parse_labeled_lines((response.text or "").strip())
        if not parsed.get("summary") or not parsed.get("reassurance"):
            raise ValueError("Gemini response missing labeled lines")

        return replace(
            base_result,
            summary=parsed["summary"],
            reassurance=parsed["reassurance"],
            verification_tip=parsed.get("verification_tip", base_result.verification_tip),
            follow_up_prompt=parsed.get("follow_up_prompt", base_result.follow_up_prompt),
        ), "gemini"
    except (ValueError, AttributeError, RuntimeError, _DeadlineExceeded, TimeoutError) as exc:
        logger.warning("Gemini enhancement fell back to deterministic guidance: %s", exc)
        return base_result, "fallback"
    except Exception as exc:  # pragma: no cover - third-party failure path
        logger.exception("Unexpected Gemini error; using deterministic guidance")
        return base_result, "fallback"
