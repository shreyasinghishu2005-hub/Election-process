"""Helpers for reporting Google service readiness and active capabilities."""

from __future__ import annotations

from typing import Literal

from . import gemini_assistant, google_audio

ServiceStatus = dict[str, str | bool]
ServiceStatuses = dict[str, ServiceStatus]


def collect_google_service_statuses() -> ServiceStatuses:
    return {
        "gemini": gemini_assistant.gemini_service_status(),
        "cloud_text_to_speech": google_audio.google_tts_service_status(),
    }


def assistant_mode_from_statuses(statuses: ServiceStatuses) -> Literal["gemini", "fallback"]:
    return "gemini" if statuses["gemini"]["available"] else "fallback"


def audio_mode_from_statuses(statuses: ServiceStatuses) -> Literal["google", "browser"]:
    return "google" if statuses["cloud_text_to_speech"]["available"] else "browser"


def available_google_features(statuses: ServiceStatuses) -> list[str]:
    features: list[str] = []
    if statuses["gemini"]["available"]:
        features.append("gemini_personalized_guidance")
    if statuses["cloud_text_to_speech"]["available"]:
        features.append("cloud_tts_audio_ready")
    return features


def guide_google_features(statuses: ServiceStatuses, source: str) -> list[str]:
    features: list[str] = []
    if source == "gemini":
        features.append("gemini_personalized_guidance")
    if statuses["cloud_text_to_speech"]["available"]:
        features.append("cloud_tts_audio_ready")
    return features
