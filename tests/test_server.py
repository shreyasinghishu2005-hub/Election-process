"""Focused tests for the standalone election guide backend."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest
from pydantic import ValidationError

os.environ.setdefault("GEMINI_API_KEY", "")

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from server.main import AssistantGuideRequest, assistant_guide, health, index, public_config  # noqa: E402


def test_health() -> None:
    data = health()
    assert data["status"] == "ok"


def test_public_config() -> None:
    data = public_config()
    assert data["assistant"] in ("gemini", "fallback")
    assert data["persona"] == "older_adult"


def test_assistant_guide_fallback_shape() -> None:
    request = AssistantGuideRequest(
        language="en",
        persona="older_adult",
        step_index=3,
        concern="documents",
        support_need="mobility",
        question="I get tired if the line is too long.",
        high_contrast=True,
        text_scale=1.24,
        vote_submitted=False,
        quiz_correct_count=2,
    )
    data = assistant_guide(request)
    assert data["source"] in ("gemini", "fallback")
    assert isinstance(data["actions"], list)
    assert len(data["actions"]) >= 3
    assert "older voter" in str(data["why_this_help"]).lower()


def test_validation_rejects_bad_step() -> None:
    with pytest.raises(ValidationError):
        AssistantGuideRequest(
            language="en",
            persona="older_adult",
            step_index=12,
            concern="documents",
        )


def test_index_points_to_html_file() -> None:
    response = index()
    assert str(response.path).endswith("index.html")
