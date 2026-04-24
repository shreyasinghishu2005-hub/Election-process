"""Shared request and response schemas for the election guide API."""

from __future__ import annotations

import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


class StrictModel(BaseModel):
    """Base model with stricter input handling for API contracts."""

    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    @staticmethod
    def _clean_text(value: str) -> str:
        cleaned = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", value)
        return cleaned.strip()


class ServiceStatusResponse(BaseModel):
    available: bool
    reason: str


class GoogleServicesStatusResponse(BaseModel):
    gemini: ServiceStatusResponse
    cloud_text_to_speech: ServiceStatusResponse


class HealthResponse(BaseModel):
    status: str
    service: str
    google_services: GoogleServicesStatusResponse


class PublicConfigResponse(BaseModel):
    assistant: Literal["gemini", "fallback"]
    audio: Literal["google", "browser"]
    persona: Literal["older_adult"]
    google_services: GoogleServicesStatusResponse


class GuideResponse(BaseModel):
    summary: str
    actions: list[str]
    reassurance: str
    next_step: str
    why_this_help: str
    source: Literal["gemini", "fallback"]


class AssistantGuideRequest(StrictModel):
    language: Literal["en", "hi"] = "en"
    persona: Literal["older_adult"] = "older_adult"
    step_index: int = Field(ge=0, le=5)
    concern: Literal["registration", "documents", "booth", "assistance", "voting_process", "trusted_updates"]
    support_need: Literal["none", "vision", "hearing", "mobility", "helper"] = "none"
    question: str | None = Field(default=None, max_length=400)
    high_contrast: bool = False
    text_scale: float = Field(default=1.12, ge=1.0, le=1.4)
    vote_submitted: bool = False
    quiz_correct_count: int = Field(default=0, ge=0, le=3)

    @field_validator("question", mode="before")
    @classmethod
    def normalize_question(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = cls._clean_text(value)
        return cleaned or None


class SpeakRequest(StrictModel):
    language: Literal["en", "hi"] = "en"
    text: str = Field(min_length=1, max_length=1600)

    @field_validator("text", mode="before")
    @classmethod
    def normalize_text(cls, value: str) -> str:
        return cls._clean_text(value)
