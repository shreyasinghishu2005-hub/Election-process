"""Localized content and labels shared by the rule engine."""

from __future__ import annotations

PERSONA_LABELS = {
    "older_adult": {
        "en": "Older voter",
        "hi": "वरिष्ठ मतदाता",
    }
}

STEP_TITLES = {
    "en": [
        "Voter Registration",
        "Candidate Nomination",
        "Campaigning",
        "Voting Day",
        "Vote Counting",
        "Results Declaration",
    ],
    "hi": [
        "मतदाता पंजीकरण",
        "उम्मीदवार नामांकन",
        "प्रचार",
        "मतदान दिवस",
        "वोट गिनती",
        "परिणाम घोषणा",
    ],
}

CONCERN_LABELS = {
    "registration": {
        "en": "Checking registration",
        "hi": "पंजीकरण जांचना",
    },
    "documents": {
        "en": "What ID or papers to carry",
        "hi": "कौन सा पहचान पत्र या कागज ले जाएं",
    },
    "booth": {
        "en": "Finding the polling booth",
        "hi": "मतदान केंद्र ढूंढना",
    },
    "assistance": {
        "en": "Senior citizen support at the booth",
        "hi": "मतदान केंद्र पर वरिष्ठ सहायता",
    },
    "voting_process": {
        "en": "Understanding the voting process",
        "hi": "मतदान प्रक्रिया समझना",
    },
    "trusted_updates": {
        "en": "How to trust election updates",
        "hi": "चुनाव जानकारी पर भरोसा कैसे करें",
    },
}

SUPPORT_LABELS = {
    "none": {
        "en": "No extra support needed",
        "hi": "अतिरिक्त सहायता की जरूरत नहीं",
    },
    "vision": {
        "en": "Vision support",
        "hi": "दृष्टि सहायता",
    },
    "hearing": {
        "en": "Hearing support",
        "hi": "सुनने की सहायता",
    },
    "mobility": {
        "en": "Mobility support",
        "hi": "चलने-फिरने की सहायता",
    },
    "helper": {
        "en": "Family helper or caregiver support",
        "hi": "परिवार या सहायक की मदद",
    },
}

FINAL_DESTINATIONS = {
    "en": "Review the FAQ or ask one more personal question.",
    "hi": "FAQ देखें या एक और व्यक्तिगत प्रश्न पूछें।",
}
