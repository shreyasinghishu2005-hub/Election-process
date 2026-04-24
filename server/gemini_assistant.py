"""Optional Google Gemini enhancement for the election guide assistant."""

from __future__ import annotations

from dataclasses import replace
from typing import Literal

from . import config
from .logic import GuideResult

Source = Literal["gemini", "fallback"]


def _parse_labeled_lines(text: str) -> tuple[str | None, str | None]:
    cleaned = text.replace("```", "").strip()
    summary = None
    reassurance = None
    for raw_line in cleaned.splitlines():
        line = raw_line.strip()
        if line.lower().startswith("summary:"):
            summary = line.split(":", 1)[1].strip()
        elif line.lower().startswith("reassurance:"):
            reassurance = line.split(":", 1)[1].strip()
    return summary, reassurance


def enhance_guidance(
    *,
    language: str,
    step_title: str,
    concern_label: str,
    support_label: str,
    question: str | None,
    base_result: GuideResult,
) -> tuple[GuideResult, Source]:
    key = config.gemini_api_key()
    if not key:
        return base_result, "fallback"

    try:
        import google.generativeai as genai  # type: ignore[import-untyped]

        genai.configure(api_key=key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        language_name = "Hindi" if language == "hi" else "English"

        prompt = (
            "You are a calm election learning assistant designed for older adults.\n"
            f"Write in {language_name}.\n"
            "Use short, clear sentences. Do not invent exact legal rules or local services. "
            "If a rule might vary by place, say to confirm with official election sources.\n"
            "Return exactly two labeled lines:\n"
            "Summary: ...\n"
            "Reassurance: ...\n\n"
            f"Current step: {step_title}\n"
            f"Current concern: {concern_label}\n"
            f"Support need: {support_label}\n"
            f"User question: {question or 'None provided'}\n"
            f"Base summary: {base_result.summary}\n"
            f"Actions already chosen by rule engine: {' | '.join(base_result.actions)}\n"
            f"Why this help: {base_result.why_this_help}\n"
        )

        response = model.generate_content(
            prompt,
            generation_config={"max_output_tokens": 220, "temperature": 0.35},
        )
        summary, reassurance = _parse_labeled_lines((response.text or "").strip())
        if not summary or not reassurance:
            raise ValueError("Gemini response missing labeled lines")

        return replace(base_result, summary=summary, reassurance=reassurance), "gemini"
    except Exception:
        return base_result, "fallback"
