const localized = (en, hi) => ({ en, hi });
const { buildOfflineAssistantPreview } = window.ElectionGuideAssistantPreview || {};

if (!buildOfflineAssistantPreview) {
  throw new Error("Assistant preview helper failed to load.");
}

const copy = {
  brandEyebrow: localized("Smart civic learning tool", "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤¸à¥€à¤–à¤¨à¥‡ à¤•à¤¾ à¤¸à¤¾à¤§à¤¨"),
  brandTitle: localized("Election Process Explained", "à¤šà¥à¤¨à¤¾à¤µ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¸à¤®à¤à¤¿à¤"),
  brandSubtitle: localized(
    "Built for older voters with simple steps, large text, and calm guidance.",
    "à¤¬à¥à¤œà¥à¤°à¥à¤— à¤®à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤°à¤² à¤šà¤°à¤£, à¤¬à¤¡à¤¼à¥‡ à¤…à¤•à¥à¤·à¤° à¤”à¤° à¤¶à¤¾à¤‚à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤"
  ),
  languageLabel: localized("Language", "à¤­à¤¾à¤·à¤¾"),
  english: localized("English", "English"),
  hindi: localized("Hindi", "à¤¹à¤¿à¤‚à¤¦à¥€"),
  textSizeLabel: localized("Text size", "à¤…à¤•à¥à¤·à¤° à¤†à¤•à¤¾à¤°"),
  decreaseText: localized("A-", "A-"),
  increaseText: localized("A+", "A+"),
  decreaseTextAria: localized("Decrease text size", "à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ à¤›à¥‹à¤Ÿà¤¾ à¤•à¤°à¥‡à¤‚"),
  increaseTextAria: localized("Increase text size", "à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ à¤¬à¤¡à¤¼à¤¾ à¤•à¤°à¥‡à¤‚"),
  contrastLabel: localized("Contrast", "à¤•à¥‰à¤¨à¥à¤Ÿà¥à¤°à¤¾à¤¸à¥à¤Ÿ"),
  contrastOn: localized("High contrast", "à¤¹à¤¾à¤ˆ à¤•à¥‰à¤¨à¥à¤Ÿà¥à¤°à¤¾à¤¸à¥à¤Ÿ"),
  contrastOff: localized("Standard view", "à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¦à¥ƒà¤¶à¥à¤¯"),
  voiceLabel: localized("Audio", "à¤‘à¤¡à¤¿à¤¯à¥‹"),
  stopAudio: localized("Stop audio", "à¤‘à¤¡à¤¿à¤¯à¥‹ à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚"),
  voiceReady: localized("Voice support ready", "à¤†à¤µà¤¾à¤œ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¤à¥ˆà¤¯à¤¾à¤° à¤¹à¥ˆ"),
  voicePlaying: localized("Audio is playing", "à¤‘à¤¡à¤¿à¤¯à¥‹ à¤šà¤² à¤°à¤¹à¤¾ à¤¹à¥ˆ"),
  voiceReadyGoogle: localized("Google voice ready", "Google à¤†à¤µà¤¾à¤œ à¤¤à¥ˆà¤¯à¤¾à¤°"),
  voicePlayingGoogle: localized("Google voice playing", "Google à¤†à¤µà¤¾à¤œ à¤šà¤² à¤°à¤¹à¥€ à¤¹à¥ˆ"),
  voiceReadyBrowser: localized("Browser voice ready", "à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤†à¤µà¤¾à¤œ à¤¤à¥ˆà¤¯à¤¾à¤°"),
  voicePlayingBrowser: localized("Browser voice playing", "à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤†à¤µà¤¾à¤œ à¤šà¤² à¤°à¤¹à¥€ à¤¹à¥ˆ"),
  heroEyebrow: localized("Easy guide for all ages", "à¤¹à¤° à¤‰à¤®à¥à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤†à¤¸à¤¾à¤¨ à¤—à¤¾à¤‡à¤¡"),
  heroTitle: localized(
    "Learn how an election works, one step at a time.",
    "à¤šà¥à¤¨à¤¾à¤µ à¤•à¥ˆà¤¸à¥‡ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆ, à¤‡à¤¸à¥‡ à¤à¤•-à¤à¤• à¤•à¤¦à¤® à¤®à¥‡à¤‚ à¤¸à¤®à¤à¤¿à¤à¥¤"
  ),
  heroIntro: localized(
    "This guide explains what happens before voting day, on voting day, and after the vote count. The language stays simple so older adults can follow without confusion.",
    "à¤¯à¤¹ à¤—à¤¾à¤‡à¤¡ à¤¬à¤¤à¤¾à¤¤à¥€ à¤¹à¥ˆ à¤•à¤¿ à¤®à¤¤à¤¦à¤¾à¤¨ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡, à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡ à¤¦à¤¿à¤¨ à¤”à¤° à¤µà¥‹à¤Ÿ à¤—à¤¿à¤¨à¤¤à¥€ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤•à¥à¤¯à¤¾ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤­à¤¾à¤·à¤¾ à¤†à¤¸à¤¾à¤¨ à¤°à¤–à¥€ à¤—à¤ˆ à¤¹à¥ˆ à¤¤à¤¾à¤•à¤¿ à¤¬à¥à¤œà¥à¤°à¥à¤— à¤¬à¤¿à¤¨à¤¾ à¤‰à¤²à¤à¤¨ à¤•à¥‡ à¤¸à¤®à¤ à¤¸à¤•à¥‡à¤‚à¥¤"
  ),
  startLearning: localized("Start Learning", "à¤¸à¥€à¤–à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚"),
  viewTimeline: localized("View Timeline", "à¤Ÿà¤¾à¤‡à¤®à¤²à¤¾à¤‡à¤¨ à¤¦à¥‡à¤–à¥‡à¤‚"),
  listenAudio: localized("Listen Audio", "à¤†à¤µà¤¾à¤œ à¤®à¥‡à¤‚ à¤¸à¥à¤¨à¥‡à¤‚"),
  listenSection: localized("Listen", "à¤¸à¥à¤¨à¥‡à¤‚"),
  listenStep: localized("Listen to this step", "à¤¯à¤¹ à¤šà¤°à¤£ à¤¸à¥à¤¨à¥‡à¤‚"),
  assistantEyebrow: localized("Smart assistant", "à¤¸à¥à¤®à¤¾à¤°à¥à¤Ÿ à¤¸à¤¹à¤¾à¤¯à¤•"),
  assistantTitle: localized(
    "Get personal help for an older voter",
    "à¤µà¤°à¤¿à¤·à¥à¤  à¤®à¤¤à¤¦à¤¾à¤¤à¤¾ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤®à¤¦à¤¦ à¤ªà¤¾à¤à¤‚"
  ),
  assistantIntro: localized(
    "This assistant changes its advice based on the current election step, your concern, accessibility need, practice progress, and optional question. It gives a simple offline preview in the browser and can use Google Gemini plus Google Cloud Text-to-Speech when the secure server is running.",
    "à¤¯à¤¹ à¤¸à¤¹à¤¾à¤¯à¤• à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤šà¥à¤¨à¤¾à¤µ à¤šà¤°à¤£, à¤†à¤ªà¤•à¥€ à¤šà¤¿à¤‚à¤¤à¤¾, à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤, à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤ªà¥à¤°à¤—à¤¤à¤¿ à¤”à¤° à¤µà¥ˆà¤•à¤²à¥à¤ªà¤¿à¤• à¤ªà¥à¤°à¤¶à¥à¤¨ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤¸à¤²à¤¾à¤¹ à¤¬à¤¦à¤²à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¯à¤¹ à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤­à¥€ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ à¤”à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¸à¤°à¥à¤µà¤° à¤šà¤²à¤¨à¥‡ à¤ªà¤° Google Gemini à¤”à¤° Google Cloud Text-to-Speech à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤° à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤"
  ),
  assistantPersona: localized("Chosen persona: Older voter", "à¤šà¥à¤¨à¤¾ à¤—à¤¯à¤¾ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤¤à¥à¤µ: à¤µà¤°à¤¿à¤·à¥à¤  à¤®à¤¤à¤¦à¤¾à¤¤à¤¾"),
  assistantConcernLabel: localized("What do you need help with?", "à¤†à¤ªà¤•à¥‹ à¤•à¤¿à¤¸ à¤¬à¤¾à¤¤ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤šà¤¾à¤¹à¤¿à¤?"),
  assistantSupportLabel: localized("Accessibility or support need", "à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¯à¤¾ à¤ªà¤¹à¥à¤‚à¤š à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤"),
  assistantQuestionLabel: localized("Optional question", "à¤µà¥ˆà¤•à¤²à¥à¤ªà¤¿à¤• à¤ªà¥à¤°à¤¶à¥à¤¨"),
  assistantQuestionPlaceholder: localized(
    "Example: I may need help standing in line for a long time.",
    "à¤‰à¤¦à¤¾à¤¹à¤°à¤£: à¤®à¥à¤à¥‡ à¤²à¤‚à¤¬à¥€ à¤²à¤¾à¤‡à¤¨ à¤®à¥‡à¤‚ à¤–à¤¡à¤¼à¥‡ à¤°à¤¹à¤¨à¥‡ à¤®à¥‡à¤‚ à¤•à¤ à¤¿à¤¨à¤¾à¤ˆ à¤¹à¥‹ à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆà¥¤"
  ),
  assistantAsk: localized("Get Personal Guidance", "à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤²à¥‡à¤‚"),
  assistantLoading: localized("Preparing guidance...", "à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨ à¤¤à¥ˆà¤¯à¤¾à¤° à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆ..."),
  assistantSummaryTitle: localized("Personal guidance", "à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨"),
  assistantActionsTitle: localized("Recommended actions", "à¤¸à¥à¤à¤¾à¤ à¤—à¤ à¤•à¤¦à¤®"),
  assistantReassuranceLabel: localized("Reassurance:", "à¤¹à¥Œà¤¸à¤²à¤¾:"),
  assistantNextStepLabel: localized("Next:", "à¤…à¤—à¤²à¤¾:"),
  assistantVerificationLabel: localized("Check this officially:", "à¤‡à¤¸à¥‡ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤°à¥‚à¤ª à¤¸à¥‡ à¤œà¤¾à¤‚à¤šà¥‡à¤‚:"),
  assistantFollowUpLabel: localized("Helpful next question:", "à¤…à¤—à¤²à¤¾ à¤‰à¤ªà¤¯à¥‹à¤—à¥€ à¤¸à¤µà¤¾à¤²:"),
  assistantGoogleFeaturesTitle: localized("Google support in this response", "à¤‡à¤¸ à¤‰à¤¤à¥à¤¤à¤° à¤®à¥‡à¤‚ Google à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾"),
  assistantModeLocal: localized("Offline preview mode", "à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤ªà¥à¤°à¥€à¤µà¥à¤¯à¥‚ à¤®à¥‹à¤¡"),
  assistantModeFallback: localized("Server rules ready", "à¤¸à¤°à¥à¤µà¤° à¤¨à¤¿à¤¯à¤® à¤¤à¥ˆà¤¯à¤¾à¤°"),
  assistantModeGemini: localized("Google Gemini ready", "Google Gemini à¤¤à¥ˆà¤¯à¤¾à¤°"),
  assistantSourceLocal: localized("Source: offline quick preview", "à¤¸à¥à¤°à¥‹à¤¤: à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤ªà¥à¤°à¥€à¤µà¥à¤¯à¥‚"),
  assistantSourceFallback: localized("Source: secure server fallback", "à¤¸à¥à¤°à¥‹à¤¤: à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¸à¤°à¥à¤µà¤° à¤«à¥‰à¤²à¤¬à¥ˆà¤•"),
  assistantSourceGemini: localized("Source: Google Gemini", "à¤¸à¥à¤°à¥‹à¤¤: Google Gemini"),
  assistantPreviewAction: localized(
    "Press Get Personal Guidance for detailed advice from the secure server.",
    "à¤µà¤¿à¤¸à¥à¤¤à¥ƒà¤¤ à¤¸à¤²à¤¾à¤¹ à¤•à¥‡ à¤²à¤¿à¤ Get Personal Guidance à¤¦à¤¬à¤¾à¤à¤à¥¤"
  ),
  guideEyebrow: localized("Step-by-step guide", "à¤à¤•-à¤à¤• à¤šà¤°à¤£ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€"),
  guideTitle: localized("Follow the election process in order", "à¤šà¥à¤¨à¤¾à¤µ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤•à¥‹ à¤¸à¤¹à¥€ à¤•à¥à¤°à¤® à¤®à¥‡à¤‚ à¤¸à¤®à¤à¥‡à¤‚"),
  guideIntro: localized(
    "Use Next and Back to move through the process. Each screen keeps the explanation short and clear.",
    "à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¸à¤®à¤à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ Next à¤”à¤° Back à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤ à¤¹à¤° à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤ªà¤° à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤›à¥‹à¤Ÿà¥€ à¤”à¤° à¤¸à¤¾à¤« à¤°à¤–à¥€ à¤—à¤ˆ à¤¹à¥ˆà¥¤"
  ),
  prevStep: localized("Back", "à¤ªà¥€à¤›à¥‡"),
  nextStep: localized("Next", "à¤…à¤—à¤²à¤¾"),
  stepForYou: localized("What this means for you", "à¤†à¤ªà¤•à¥‡ à¤²à¤¿à¤ à¤‡à¤¸à¤•à¤¾ à¤®à¤¤à¤²à¤¬"),
  timelineEyebrow: localized("Visual timeline", "à¤¦à¥ƒà¤¶à¥à¤¯ à¤Ÿà¤¾à¤‡à¤®à¤²à¤¾à¤‡à¤¨"),
  timelineTitle: localized("See all six steps together", "à¤¸à¤­à¥€ à¤›à¤¹ à¤šà¤°à¤£ à¤à¤• à¤¸à¤¾à¤¥ à¤¦à¥‡à¤–à¥‡à¤‚"),
  timelineIntro: localized(
    "Tap any step to jump straight to it. The current step stays highlighted.",
    "à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤šà¤°à¤£ à¤ªà¤° à¤Ÿà¥ˆà¤ª à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¸à¥€à¤§à¥‡ à¤‰à¤¸ à¤ªà¤° à¤œà¤¾à¤à¤‚à¥¤ à¤œà¥‹ à¤šà¤°à¤£ à¤–à¥à¤²à¤¾ à¤¹à¥ˆ, à¤µà¤¹ à¤¹à¤¾à¤‡à¤²à¤¾à¤‡à¤Ÿ à¤°à¤¹à¥‡à¤—à¤¾à¥¤"
  ),
  guidanceEyebrow: localized("Real-life guidance", "à¤µà¥à¤¯à¤¾à¤µà¤¹à¤¾à¤°à¤¿à¤• à¤®à¤¦à¤¦"),
  guidanceTitle: localized("What you need to do", "à¤†à¤ªà¤•à¥‹ à¤•à¥à¤¯à¤¾ à¤•à¤°à¤¨à¤¾ à¤¹à¥ˆ"),
  guidanceIntro: localized(
    "These reminders help you prepare for voting day in a calm and simple way.",
    "à¤¯à¥‡ à¤†à¤¸à¤¾à¤¨ à¤¯à¤¾à¤¦ à¤¦à¤¿à¤²à¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥€ à¤¬à¤¾à¤¤à¥‡à¤‚ à¤†à¤ªà¤•à¥‹ à¤®à¤¤à¤¦à¤¾à¤¨ à¤¦à¤¿à¤µà¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤°à¤² à¤¤à¤°à¥€à¤•à¥‡ à¤¸à¥‡ à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¤°à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤"
  ),
  guidanceNote: localized(
    "Rules can change by place. Always confirm local details with your election office or official election website.",
    "à¤¨à¤¿à¤¯à¤® à¤…à¤²à¤—-à¤…à¤²à¤— à¤œà¤—à¤¹ à¤¬à¤¦à¤² à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤¸à¤¹à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤²à¤¿à¤ à¤…à¤ªà¤¨à¥‡ à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤šà¥à¤¨à¤¾à¤µ à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯ à¤¯à¤¾ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤šà¥à¤¨à¤¾à¤µ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¸à¥‡ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚à¥¤"
  ),
  practiceEyebrow: localized("Practice mode", "à¤ªà¥à¤°à¥ˆà¤•à¥à¤Ÿà¤¿à¤¸ à¤®à¥‹à¤¡"),
  practiceTitle: localized("Try a simple demo ballot", "à¤à¤• à¤†à¤¸à¤¾à¤¨ à¤¡à¥‡à¤®à¥‹ à¤®à¤¤à¤ªà¤¤à¥à¤° à¤†à¤œà¤®à¤¾à¤à¤‚"),
  practiceIntro: localized(
    "This is only for learning. Choose one candidate and press Submit Vote to see how a simple ballot works.",
    "à¤¯à¤¹ à¤•à¥‡à¤µà¤² à¤¸à¥€à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆà¥¤ à¤à¤• à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤šà¥à¤¨à¥‡à¤‚ à¤”à¤° Submit Vote à¤¦à¤¬à¤¾à¤à¤‚ à¤¤à¤¾à¤•à¤¿ à¤¸à¤®à¤ à¤¸à¤•à¥‡à¤‚ à¤•à¤¿ à¤¸à¤°à¤² à¤®à¤¤à¤ªà¤¤à¥à¤° à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤"
  ),
  practiceNote: localized("Demo only. No real vote is recorded here.", "à¤¯à¤¹ à¤•à¥‡à¤µà¤² à¤¡à¥‡à¤®à¥‹ à¤¹à¥ˆà¥¤ à¤¯à¤¹à¤¾à¤‚ à¤•à¥‹à¤ˆ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤• à¤µà¥‹à¤Ÿ à¤¦à¤°à¥à¤œ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹à¤¤à¤¾à¥¤"),
  submitVote: localized("Submit Vote", "à¤µà¥‹à¤Ÿ à¤œà¤®à¤¾ à¤•à¤°à¥‡à¤‚"),
  resetVote: localized("Clear Choice", "à¤šà¤¯à¤¨ à¤¹à¤Ÿà¤¾à¤à¤‚"),
  voteSuccess: localized(
    "Vote submitted successfully. This was a practice vote only.",
    "à¤µà¥‹à¤Ÿ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤œà¤®à¤¾ à¤¹à¥à¤†à¥¤ à¤¯à¤¹ à¤•à¥‡à¤µà¤² à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤µà¤¾à¤²à¤¾ à¤µà¥‹à¤Ÿ à¤¥à¤¾à¥¤"
  ),
  votePickFirst: localized("Please choose one candidate first.", "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¤¹à¤²à¥‡ à¤à¤• à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤šà¥à¤¨à¥‡à¤‚à¥¤"),
  quizEyebrow: localized("Simple quiz", "à¤¸à¤°à¤² à¤ªà¥à¤°à¤¶à¥à¤¨"),
  quizTitle: localized("Check what you learned", "à¤¦à¥‡à¤–à¤¿à¤ à¤†à¤ªà¤¨à¥‡ à¤•à¥à¤¯à¤¾ à¤¸à¥€à¤–à¤¾"),
  quizIntro: localized(
    "These questions are short and easy. You will get feedback right away.",
    "à¤¯à¥‡ à¤ªà¥à¤°à¤¶à¥à¤¨ à¤›à¥‹à¤Ÿà¥‡ à¤”à¤° à¤†à¤¸à¤¾à¤¨ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤ªà¤•à¥‹ à¤¤à¥à¤°à¤‚à¤¤ à¤‰à¤¤à¥à¤¤à¤° à¤®à¤¿à¤²à¥‡à¤—à¤¾ à¤•à¤¿ à¤œà¤µà¤¾à¤¬ à¤¸à¤¹à¥€ à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚à¥¤"
  ),
  correct: localized("Correct", "à¤¸à¤¹à¥€"),
  tryAgain: localized("Try again", "à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚"),
  faqEyebrow: localized("Help and FAQ", "à¤®à¤¦à¤¦ à¤”à¤° à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¥à¤°à¤¶à¥à¤¨"),
  faqTitle: localized("Common questions", "à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¸à¤µà¤¾à¤²"),
  faqIntro: localized(
    "Short answers to common concerns people have before voting.",
    "à¤®à¤¤à¤¦à¤¾à¤¨ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤²à¥‹à¤—à¥‹à¤‚ à¤•à¥‡ à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤¸à¤µà¤¾à¤²à¥‹à¤‚ à¤•à¥‡ à¤›à¥‹à¤Ÿà¥‡ à¤”à¤° à¤¸à¤¾à¤« à¤œà¤µà¤¾à¤¬à¥¤"
  ),
  stepCounter: localized("Step", "à¤šà¤°à¤£"),
  of: localized("of", "à¤®à¥‡à¤‚ à¤¸à¥‡"),
  speechUnavailable: localized(
    "This browser does not support text-to-speech.",
    "à¤¯à¤¹ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ à¤•à¥‹ à¤†à¤µà¤¾à¤œ à¤®à¥‡à¤‚ à¤ªà¤¢à¤¼à¤¨à¥‡ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾à¥¤"
  ),
  speechStarted: localized("Reading aloud started.", "à¤†à¤µà¤¾à¤œ à¤®à¥‡à¤‚ à¤ªà¤¢à¤¼à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤¹à¥à¤†à¥¤"),
  speechStartedGoogle: localized("Google voice playback started.", "Google à¤†à¤µà¤¾à¤œ à¤šà¤²à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤¹à¥à¤†à¥¤"),
  speechStartedBrowser: localized("Browser voice playback started.", "à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤†à¤µà¤¾à¤œ à¤šà¤²à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤¹à¥à¤†à¥¤"),
  speechStopped: localized("Audio stopped.", "à¤‘à¤¡à¤¿à¤¯à¥‹ à¤¬à¤‚à¤¦ à¤¹à¥à¤†à¥¤"),
  speechFallbackBrowser: localized(
    "Google voice was not available, so browser voice was used instead.",
    "Google à¤†à¤µà¤¾à¤œ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¥à¥€, à¤‡à¤¸à¤²à¤¿à¤ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤†à¤µà¤¾à¤œ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤"
  ),
  languageChanged: localized("Language changed.", "à¤­à¤¾à¤·à¤¾ à¤¬à¤¦à¤² à¤—à¤ˆ à¤¹à¥ˆà¥¤"),
  textSmaller: localized("Text size decreased.", "à¤…à¤•à¥à¤·à¤° à¤†à¤•à¤¾à¤° à¤›à¥‹à¤Ÿà¤¾ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤"),
  textLarger: localized("Text size increased.", "à¤…à¤•à¥à¤·à¤° à¤†à¤•à¤¾à¤° à¤¬à¤¡à¤¼à¤¾ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤"),
  contrastChanged: localized("Contrast setting changed.", "à¤•à¥‰à¤¨à¥à¤Ÿà¥à¤°à¤¾à¤¸à¥à¤Ÿ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤— à¤¬à¤¦à¤²à¥€ à¤—à¤ˆà¥¤"),
};

const steps = [
  {
    icon: "ðŸªª",
    title: localized("Voter Registration", "à¤®à¤¤à¤¦à¤¾à¤¤à¤¾ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£"),
    description: localized(
      "Your name must be on the voter list before election day. It is best to check early so there is time to correct mistakes.",
      "à¤®à¤¤à¤¦à¤¾à¤¨ à¤¦à¤¿à¤µà¤¸ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤†à¤ªà¤•à¤¾ à¤¨à¤¾à¤® à¤®à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¸à¥‚à¤šà¥€ à¤®à¥‡à¤‚ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤à¥¤ à¤—à¤²à¤¤à¥€ à¤¸à¥à¤§à¤¾à¤°à¤¨à¥‡ à¤•à¤¾ à¤¸à¤®à¤¯ à¤®à¤¿à¤²à¥‡, à¤‡à¤¸à¤²à¤¿à¤ à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤œà¤¾à¤‚à¤š à¤•à¤°à¤¨à¤¾ à¤¬à¥‡à¤¹à¤¤à¤° à¤¹à¥ˆà¥¤"
    ),
    helper: localized(
      "Keep your basic details ready, such as name, address, age proof, and any form your local authority asks for.",
      "à¤…à¤ªà¤¨à¤¾ à¤¨à¤¾à¤®, à¤ªà¤¤à¤¾, à¤†à¤¯à¥ à¤ªà¥à¤°à¤®à¤¾à¤£ à¤”à¤° à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤®à¤¾à¤‚à¤—à¥‡ à¤—à¤ à¤«à¥‰à¤°à¥à¤® à¤œà¥ˆà¤¸à¥€ à¤œà¤°à¥‚à¤°à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤¤à¥ˆà¤¯à¤¾à¤° à¤°à¤–à¥‡à¤‚à¥¤"
    ),
  },
  {
    icon: "ðŸ“„",
    title: localized("Candidate Nomination", "à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤¨à¤¾à¤®à¤¾à¤‚à¤•à¤¨"),
    description: localized(
      "People who want to contest the election submit forms and documents. Election officials check whether each application meets the rules.",
      "à¤œà¥‹ à¤²à¥‹à¤— à¤šà¥à¤¨à¤¾à¤µ à¤²à¤¡à¤¼à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤µà¥‡ à¤«à¥‰à¤°à¥à¤® à¤”à¤° à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œ à¤œà¤®à¤¾ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤šà¥à¤¨à¤¾à¤µ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤œà¤¾à¤‚à¤š à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤•à¤¿ à¤†à¤µà¥‡à¤¦à¤¨ à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚à¥¤"
    ),
    helper: localized(
      "This step helps make sure the final list of candidates is official and verified.",
      "à¤¯à¤¹ à¤šà¤°à¤£ à¤¸à¥à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ à¤•à¤¿ à¤…à¤‚à¤¤à¤¿à¤® à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤¸à¥‚à¤šà¥€ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤”à¤° à¤œà¤¾à¤‚à¤šà¥€ à¤¹à¥à¤ˆ à¤¹à¥‹à¥¤"
    ),
  },
  {
    icon: "ðŸ“£",
    title: localized("Campaigning", "à¤ªà¥à¤°à¤šà¤¾à¤°"),
    description: localized(
      "Candidates meet voters and explain their plans. Campaigning is allowed only within election rules about speech, money, and public conduct.",
      "à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤®à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤¸à¥‡ à¤®à¤¿à¤²à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤”à¤° à¤…à¤ªà¤¨à¥€ à¤¯à¥‹à¤œà¤¨à¤¾à¤à¤‚ à¤¬à¤¤à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤ªà¥à¤°à¤šà¤¾à¤° à¤šà¥à¤¨à¤¾à¤µ à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¥‡ à¤­à¥€à¤¤à¤° à¤¹à¥€ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆ, à¤œà¥ˆà¤¸à¥‡ à¤­à¤¾à¤·à¤£, à¤–à¤°à¥à¤š à¤”à¤° à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤µà¥à¤¯à¤µà¤¹à¤¾à¤°à¥¤"
    ),
    helper: localized(
      "Use this time to compare ideas calmly and listen for clear promises that matter to your daily life.",
      "à¤‡à¤¸ à¤¸à¤®à¤¯ à¤…à¤²à¤—-à¤…à¤²à¤— à¤µà¤¿à¤šà¤¾à¤°à¥‹à¤‚ à¤•à¥€ à¤¶à¤¾à¤‚à¤¤ à¤®à¤¨ à¤¸à¥‡ à¤¤à¥à¤²à¤¨à¤¾ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤‰à¤¨ à¤µà¤¾à¤¦à¥‹à¤‚ à¤ªà¤° à¤§à¥à¤¯à¤¾à¤¨ à¤¦à¥‡à¤‚ à¤œà¥‹ à¤†à¤ªà¤•à¥‡ à¤°à¥‹à¤œà¤®à¤°à¥à¤°à¤¾ à¤œà¥€à¤µà¤¨ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤"
    ),
  },
  {
    icon: "ðŸ—³ï¸",
    title: localized("Voting Day", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤¦à¤¿à¤µà¤¸"),
    description: localized(
      "Go to your polling booth, show accepted identification, and cast your vote. Your choice stays secret.",
      "à¤…à¤ªà¤¨à¥‡ à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤ªà¤° à¤œà¤¾à¤à¤‚, à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¤¹à¤šà¤¾à¤¨ à¤ªà¤¤à¥à¤° à¤¦à¤¿à¤–à¤¾à¤à¤‚ à¤”à¤° à¤µà¥‹à¤Ÿ à¤¡à¤¾à¤²à¥‡à¤‚à¥¤ à¤†à¤ªà¤•à¤¾ à¤µà¥‹à¤Ÿ à¤—à¥à¤ªà¥à¤¤ à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆà¥¤"
    ),
    helper: localized(
      "Check your booth location in advance, go at a comfortable time, and ask polling staff for help if you need assistance.",
      "à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤…à¤ªà¤¨à¤¾ à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤¦à¥‡à¤– à¤²à¥‡à¤‚, à¤†à¤°à¤¾à¤®à¤¦à¤¾à¤¯à¤• à¤¸à¤®à¤¯ à¤ªà¤° à¤œà¤¾à¤à¤‚ à¤”à¤° à¤œà¤°à¥‚à¤°à¤¤ à¤¹à¥‹ à¤¤à¥‹ à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¤°à¥à¤®à¤¿à¤¯à¥‹à¤‚ à¤¸à¥‡ à¤®à¤¦à¤¦ à¤®à¤¾à¤‚à¤—à¥‡à¤‚à¥¤"
    ),
  },
  {
    icon: "ðŸ“Š",
    title: localized("Vote Counting", "à¤µà¥‹à¤Ÿ à¤—à¤¿à¤¨à¤¤à¥€"),
    description: localized(
      "After voting ends, officials count valid votes carefully. Observers and authorized agents may watch the process.",
      "à¤®à¤¤à¤¦à¤¾à¤¨ à¤–à¤¤à¥à¤® à¤¹à¥‹à¤¨à¥‡ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤®à¤¾à¤¨à¥à¤¯ à¤µà¥‹à¤Ÿà¥‹à¤‚ à¤•à¥€ à¤¸à¤¾à¤µà¤§à¤¾à¤¨à¥€ à¤¸à¥‡ à¤—à¤¿à¤¨à¤¤à¥€ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤ à¤ªà¤°à¥à¤¯à¤µà¥‡à¤•à¥à¤·à¤• à¤”à¤° à¤…à¤§à¤¿à¤•à¥ƒà¤¤ à¤ªà¥à¤°à¤¤à¤¿à¤¨à¤¿à¤§à¤¿ à¤‡à¤¸ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤•à¥‹ à¤¦à¥‡à¤– à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤"
    ),
    helper: localized(
      "Counting is meant to be orderly and transparent so people can trust the result.",
      "à¤—à¤¿à¤¨à¤¤à¥€ à¤•à¥€ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤µà¥à¤¯à¤µà¤¸à¥à¤¥à¤¿à¤¤ à¤”à¤° à¤ªà¤¾à¤°à¤¦à¤°à¥à¤¶à¥€ à¤°à¤–à¥€ à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆ à¤¤à¤¾à¤•à¤¿ à¤²à¥‹à¤— à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤ªà¤° à¤­à¤°à¥‹à¤¸à¤¾ à¤•à¤° à¤¸à¤•à¥‡à¤‚à¥¤"
    ),
  },
  {
    icon: "ðŸ",
    title: localized("Results Declaration", "à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤˜à¥‹à¤·à¤£à¤¾"),
    description: localized(
      "When counting is complete, the official result is announced publicly. The winner is declared according to the election rules.",
      "à¤—à¤¿à¤¨à¤¤à¥€ à¤ªà¥‚à¤°à¥€ à¤¹à¥‹à¤¨à¥‡ à¤ªà¤° à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤°à¥‚à¤ª à¤¸à¥‡ à¤˜à¥‹à¤·à¤¿à¤¤ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤šà¥à¤¨à¤¾à¤µ à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤µà¤¿à¤œà¥‡à¤¤à¤¾ à¤˜à¥‹à¤·à¤¿à¤¤ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤"
    ),
    helper: localized(
      "Wait for official updates from trusted election sources instead of relying on rumors or forwarded messages.",
      "à¤…à¤«à¤µà¤¾à¤¹à¥‹à¤‚ à¤¯à¤¾ à¤«à¥‰à¤°à¤µà¤°à¥à¤¡ à¤¸à¤‚à¤¦à¥‡à¤¶à¥‹à¤‚ à¤ªà¤° à¤¨à¤¹à¥€à¤‚, à¤¬à¤²à¥à¤•à¤¿ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤šà¥à¤¨à¤¾à¤µ à¤¸à¥à¤°à¥‹à¤¤à¥‹à¤‚ à¤•à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¤° à¤­à¤°à¥‹à¤¸à¤¾ à¤•à¤°à¥‡à¤‚à¥¤"
    ),
  },
];

const guidanceItems = [
  {
    title: localized("How to register", "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¥ˆà¤¸à¥‡ à¤•à¤°à¥‡à¤‚"),
    points: [
      localized("Check whether your name is already on the voter list.", "à¤œà¤¾à¤‚à¤š à¤•à¤°à¥‡à¤‚ à¤•à¤¿ à¤†à¤ªà¤•à¤¾ à¤¨à¤¾à¤® à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤®à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¸à¥‚à¤šà¥€ à¤®à¥‡à¤‚ à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚à¥¤"),
      localized(
        "If needed, fill the required form and submit proof of identity and address.",
        "à¤œà¤°à¥‚à¤°à¤¤ à¤¹à¥‹ à¤¤à¥‹ à¤œà¤°à¥‚à¤°à¥€ à¤«à¥‰à¤°à¥à¤® à¤­à¤°à¥‡à¤‚ à¤”à¤° à¤ªà¤¹à¤šà¤¾à¤¨ à¤µ à¤ªà¤¤à¥‡ à¤•à¤¾ à¤ªà¥à¤°à¤®à¤¾à¤£ à¤œà¤®à¤¾ à¤•à¤°à¥‡à¤‚à¥¤"
      ),
    ],
  },
  {
    title: localized("What to carry", "à¤•à¥à¤¯à¤¾ à¤¸à¤¾à¤¥ à¤²à¥‡ à¤œà¤¾à¤à¤‚"),
    points: [
      localized(
        "Carry an accepted photo ID and any voter slip or reference note you have.",
        "à¤®à¤¾à¤¨à¥à¤¯ à¤«à¥‹à¤Ÿà¥‹ à¤ªà¤¹à¤šà¤¾à¤¨ à¤ªà¤¤à¥à¤° à¤”à¤° à¤†à¤ªà¤•à¥‡ à¤ªà¤¾à¤¸ à¤¹à¥‹ à¤¤à¥‹ à¤µà¥‹à¤Ÿà¤° à¤¸à¥à¤²à¤¿à¤ª à¤¯à¤¾ à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤ªà¤°à¥à¤šà¥€ à¤¸à¤¾à¤¥ à¤°à¤–à¥‡à¤‚à¥¤"
      ),
      localized(
        "If you use spectacles, hearing aids, or a walking support, take them with you.",
        "à¤¯à¤¦à¤¿ à¤†à¤ª à¤šà¤¶à¥à¤®à¤¾, à¤¸à¥à¤¨à¤¨à¥‡ à¤•à¥€ à¤®à¤¶à¥€à¤¨ à¤¯à¤¾ à¤šà¤²à¤¨à¥‡ à¤•à¤¾ à¤¸à¤¹à¤¾à¤°à¤¾ à¤²à¥‡à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤¤à¥‹ à¤‰à¤¸à¥‡ à¤¸à¤¾à¤¥ à¤²à¥‡ à¤œà¤¾à¤à¤‚à¥¤"
      ),
    ],
  },
  {
    title: localized("How to vote", "à¤µà¥‹à¤Ÿ à¤•à¥ˆà¤¸à¥‡ à¤¦à¥‡à¤‚"),
    points: [
      localized(
        "Find your polling desk, confirm your name, and follow the instructions given there.",
        "à¤…à¤ªà¤¨à¥€ à¤®à¤¤à¤¦à¤¾à¤¨ à¤¡à¥‡à¤¸à¥à¤• à¤–à¥‹à¤œà¥‡à¤‚, à¤…à¤ªà¤¨à¤¾ à¤¨à¤¾à¤® à¤œà¤¾à¤‚à¤šà¥‡à¤‚ à¤”à¤° à¤µà¤¹à¤¾à¤‚ à¤¦à¤¿à¤ à¤—à¤ à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶à¥‹à¤‚ à¤•à¤¾ à¤ªà¤¾à¤²à¤¨ à¤•à¤°à¥‡à¤‚à¥¤"
      ),
      localized(
        "Press the button or mark the ballot for your chosen candidate, then complete the final step as guided by staff.",
        "à¤…à¤ªà¤¨à¥‡ à¤šà¥à¤¨à¥‡ à¤¹à¥à¤ à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤Ÿà¤¨ à¤¦à¤¬à¤¾à¤à¤‚ à¤¯à¤¾ à¤®à¤¤à¤ªà¤¤à¥à¤° à¤ªà¤° à¤¨à¤¿à¤¶à¤¾à¤¨ à¤²à¤—à¤¾à¤à¤‚, à¤«à¤¿à¤° à¤•à¤°à¥à¤®à¤šà¤¾à¤°à¤¿à¤¯à¥‹à¤‚ à¤•à¥‡ à¤¬à¤¤à¤¾à¤ à¤…à¤‚à¤¤à¤¿à¤® à¤šà¤°à¤£ à¤•à¥‹ à¤ªà¥‚à¤°à¤¾ à¤•à¤°à¥‡à¤‚à¥¤"
      ),
    ],
  },
];

const candidates = [
  { id: "candidate-a", name: "Asha Verma", label: localized("Candidate A", "à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° A"), note: localized("Practice choice only", "à¤•à¥‡à¤µà¤² à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤µà¤¿à¤•à¤²à¥à¤ª") },
  { id: "candidate-b", name: "Rohan Mehta", label: localized("Candidate B", "à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° B"), note: localized("Practice choice only", "à¤•à¥‡à¤µà¤² à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤µà¤¿à¤•à¤²à¥à¤ª") },
  { id: "candidate-c", name: "Nazia Khan", label: localized("Candidate C", "à¤‰à¤®à¥à¤®à¥€à¤¦à¤µà¤¾à¤° C"), note: localized("Practice choice only", "à¤•à¥‡à¤µà¤² à¤…à¤­à¥à¤¯à¤¾à¤¸ à¤µà¤¿à¤•à¤²à¥à¤ª") },
];

const quizQuestions = [
  {
    question: localized(
      "When is the best time to check whether your name is on the voter list?",
      "à¤®à¤¤à¤¦à¤¾à¤¤à¤¾ à¤¸à¥‚à¤šà¥€ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¤¾ à¤¨à¤¾à¤® à¤œà¤¾à¤‚à¤šà¤¨à¥‡ à¤•à¤¾ à¤¸à¤¬à¤¸à¥‡ à¤…à¤šà¥à¤›à¤¾ à¤¸à¤®à¤¯ à¤•à¤¬ à¤¹à¥ˆ?"
    ),
    options: [
      localized("Only after the results are announced", "à¤•à¥‡à¤µà¤² à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤†à¤¨à¥‡ à¤•à¥‡ à¤¬à¤¾à¤¦"),
      localized("Before election day", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤¦à¤¿à¤µà¤¸ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡"),
      localized("There is no need to check", "à¤œà¤¾à¤‚à¤š à¤•à¤°à¤¨à¥‡ à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆ"),
    ],
    correctIndex: 1,
  },
  {
    question: localized("What should you usually carry on voting day?", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤¦à¤¿à¤µà¤¸ à¤ªà¤° à¤†à¤® à¤¤à¥Œà¤° à¤ªà¤° à¤•à¥à¤¯à¤¾ à¤¸à¤¾à¤¥ à¤²à¥‡ à¤œà¤¾à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤?"),
    options: [
      localized("An accepted photo ID", "à¤®à¤¾à¤¨à¥à¤¯ à¤«à¥‹à¤Ÿà¥‹ à¤ªà¤¹à¤šà¤¾à¤¨ à¤ªà¤¤à¥à¤°"),
      localized("A school notebook", "à¤¸à¥à¤•à¥‚à¤² à¤•à¥€ à¤•à¥‰à¤ªà¥€"),
      localized("A shopping bill", "à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤•à¥€ à¤°à¤¸à¥€à¤¦"),
    ],
    correctIndex: 0,
  },
  {
    question: localized("Is your vote meant to stay private?", "à¤•à¥à¤¯à¤¾ à¤†à¤ªà¤•à¤¾ à¤µà¥‹à¤Ÿ à¤¨à¤¿à¤œà¥€ à¤”à¤° à¤—à¥à¤ªà¥à¤¤ à¤°à¤¹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤?"),
    options: [
      localized("Yes, your choice is secret", "à¤¹à¤¾à¤‚, à¤†à¤ªà¤•à¤¾ à¤šà¥à¤¨à¤¾à¤µ à¤—à¥à¤ªà¥à¤¤ à¤°à¤¹à¤¤à¤¾ à¤¹à¥ˆ"),
      localized("No, everyone should know", "à¤¨à¤¹à¥€à¤‚, à¤¸à¤¬à¤•à¥‹ à¤ªà¤¤à¤¾ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤"),
      localized("Only your neighbors should know", "à¤•à¥‡à¤µà¤² à¤ªà¤¡à¤¼à¥‹à¤¸à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤ªà¤¤à¤¾ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤"),
    ],
    correctIndex: 0,
  },
];

const faqs = [
  {
    question: localized("What if I forget my ID?", "à¤…à¤—à¤° à¤®à¥ˆà¤‚ à¤ªà¤¹à¤šà¤¾à¤¨ à¤ªà¤¤à¥à¤° à¤­à¥‚à¤² à¤œà¤¾à¤Šà¤‚ à¤¤à¥‹ à¤•à¥à¤¯à¤¾ à¤¹à¥‹à¤—à¤¾?"),
    answer: localized(
      "Ask the polling staff what other accepted proof is allowed in your area. Rules can differ, so official guidance is important.",
      "à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¤°à¥à¤®à¤¿à¤¯à¥‹à¤‚ à¤¸à¥‡ à¤ªà¥‚à¤›à¥‡à¤‚ à¤•à¤¿ à¤†à¤ªà¤•à¥‡ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤•à¥Œà¤¨ à¤¸à¤¾ à¤¦à¥‚à¤¸à¤°à¤¾ à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¥à¤°à¤®à¤¾à¤£ à¤¸à¥à¤µà¥€à¤•à¤¾à¤° à¤¹à¥ˆà¥¤ à¤¨à¤¿à¤¯à¤® à¤…à¤²à¤— à¤¹à¥‹ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤‡à¤¸à¤²à¤¿à¤ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤œà¤°à¥‚à¤°à¥€ à¤¹à¥ˆà¥¤"
    ),
  },
  {
    question: localized("Where is my polling booth?", "à¤®à¥‡à¤°à¤¾ à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤•à¤¹à¤¾à¤‚ à¤¹à¥ˆ?"),
    answer: localized(
      "Check your voter slip, official election message, or your local election website before you travel.",
      "à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤…à¤ªà¤¨à¥€ à¤µà¥‹à¤Ÿà¤° à¤¸à¥à¤²à¤¿à¤ª, à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤šà¥à¤¨à¤¾à¤µ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¯à¤¾ à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤šà¥à¤¨à¤¾à¤µ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤"
    ),
  },
  {
    question: localized(
      "Can I ask for help if I am elderly or have difficulty walking?",
      "à¤…à¤—à¤° à¤®à¥ˆà¤‚ à¤¬à¥à¤œà¥à¤°à¥à¤— à¤¹à¥‚à¤‚ à¤¯à¤¾ à¤šà¤²à¤¨à¥‡ à¤®à¥‡à¤‚ à¤¦à¤¿à¤•à¥à¤•à¤¤ à¤¹à¥ˆ à¤¤à¥‹ à¤•à¥à¤¯à¤¾ à¤®à¥ˆà¤‚ à¤®à¤¦à¤¦ à¤®à¤¾à¤‚à¤— à¤¸à¤•à¤¤à¤¾ à¤¹à¥‚à¤‚?"
    ),
    answer: localized(
      "Yes. Polling staff can guide you, and many places provide support for senior citizens and voters with disabilities.",
      "à¤¹à¤¾à¤‚à¥¤ à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¤°à¥à¤®à¥€ à¤†à¤ªà¤•à¥€ à¤®à¤¦à¤¦ à¤•à¤° à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤”à¤° à¤•à¤ˆ à¤œà¤—à¤¹ à¤µà¤°à¤¿à¤·à¥à¤  à¤¨à¤¾à¤—à¤°à¤¿à¤•à¥‹à¤‚ à¤µ à¤¦à¤¿à¤µà¥à¤¯à¤¾à¤‚à¤— à¤®à¤¤à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¹à¥‹à¤¤à¥€ à¤¹à¥ˆà¥¤"
    ),
  },
  {
    question: localized(
      "Should I trust every election message I receive on my phone?",
      "à¤•à¥à¤¯à¤¾ à¤®à¥à¤à¥‡ à¤«à¥‹à¤¨ à¤ªà¤° à¤®à¤¿à¤²à¤¾ à¤¹à¤° à¤šà¥à¤¨à¤¾à¤µ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¸à¤š à¤®à¤¾à¤¨ à¤²à¥‡à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤?"
    ),
    answer: localized(
      "No. Use official election sources for important details such as dates, booth location, and ID rules.",
      "à¤¨à¤¹à¥€à¤‚à¥¤ à¤¤à¤¾à¤°à¥€à¤–, à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤”à¤° à¤ªà¤¹à¤šà¤¾à¤¨ à¤¨à¤¿à¤¯à¤® à¤œà¥ˆà¤¸à¥€ à¤œà¤°à¥‚à¤°à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤•à¥‡ à¤²à¤¿à¤ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤šà¥à¤¨à¤¾à¤µ à¤¸à¥à¤°à¥‹à¤¤à¥‹à¤‚ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤"
    ),
  },
];

const assistantConcerns = [
  { id: "registration", label: localized("Checking registration", "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤œà¤¾à¤‚à¤šà¤¨à¤¾") },
  { id: "documents", label: localized("What ID or papers to carry", "à¤•à¥Œà¤¨ à¤¸à¤¾ à¤ªà¤¹à¤šà¤¾à¤¨ à¤ªà¤¤à¥à¤° à¤¯à¤¾ à¤•à¤¾à¤—à¤œ à¤²à¥‡ à¤œà¤¾à¤à¤‚") },
  { id: "booth", label: localized("Finding the polling booth", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤¢à¥‚à¤‚à¤¢à¤¨à¤¾") },
  { id: "assistance", label: localized("Senior citizen support at the booth", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤•à¥‡à¤‚à¤¦à¥à¤° à¤ªà¤° à¤µà¤°à¤¿à¤·à¥à¤  à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾") },
  { id: "voting_process", label: localized("Understanding the voting process", "à¤®à¤¤à¤¦à¤¾à¤¨ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¸à¤®à¤à¤¨à¤¾") },
  { id: "trusted_updates", label: localized("How to trust election updates", "à¤šà¥à¤¨à¤¾à¤µ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤ªà¤° à¤­à¤°à¥‹à¤¸à¤¾ à¤•à¥ˆà¤¸à¥‡ à¤•à¤°à¥‡à¤‚") },
];

const assistantSupportNeeds = [
  { id: "none", label: localized("No extra support needed", "à¤…à¤¤à¤¿à¤°à¤¿à¤•à¥à¤¤ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤•à¥€ à¤œà¤°à¥‚à¤°à¤¤ à¤¨à¤¹à¥€à¤‚") },
  { id: "vision", label: localized("Vision support", "à¤¦à¥ƒà¤·à¥à¤Ÿà¤¿ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾") },
  { id: "hearing", label: localized("Hearing support", "à¤¸à¥à¤¨à¤¨à¥‡ à¤•à¥€ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾") },
  { id: "mobility", label: localized("Mobility support", "à¤šà¤²à¤¨à¥‡-à¤«à¤¿à¤°à¤¨à¥‡ à¤•à¥€ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾") },
  { id: "helper", label: localized("Family helper or caregiver support", "à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤¯à¤¾ à¤¸à¤¹à¤¾à¤¯à¤• à¤•à¥€ à¤®à¤¦à¤¦") },
];

const googleFeatureLabels = {
  gemini_personalized_guidance: localized("Gemini personalized guidance", "Gemini à¤µà¥à¤¯à¤•à¥à¤¤à¤¿à¤—à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨"),
  cloud_tts_audio_ready: localized("Google Cloud voice ready", "Google Cloud à¤†à¤µà¤¾à¤œ à¤¤à¥ˆà¤¯à¤¾à¤°"),
};

const state = {
  language: "en",
  textScaleIndex: 1,
  highContrast: false,
  currentStepIndex: 0,
  selectedCandidateId: null,
  voteSubmitted: false,
  quizSelections: {},
  isSpeaking: false,
  audioAvailability: "browser",
  speakingSource: null,
  remoteAudio: null,
  remoteAudioUrl: null,
  assistantAvailability: "local",
  availableGoogleFeatures: [],
  assistantConcern: "registration",
  assistantSupportNeed: "none",
  assistantQuestion: "",
  assistantLoading: false,
  assistantResult: null,
};

const textScales = [1, 1.12, 1.24];

const elements = {
  body: document.body,
  brandEyebrow: document.getElementById("brandEyebrow"),
  brandTitle: document.getElementById("brandTitle"),
  brandSubtitle: document.getElementById("brandSubtitle"),
  languageLabel: document.getElementById("languageLabel"),
  langEnBtn: document.getElementById("langEnBtn"),
  langHiBtn: document.getElementById("langHiBtn"),
  textSizeLabel: document.getElementById("textSizeLabel"),
  decreaseTextBtn: document.getElementById("decreaseTextBtn"),
  increaseTextBtn: document.getElementById("increaseTextBtn"),
  contrastLabel: document.getElementById("contrastLabel"),
  contrastToggleBtn: document.getElementById("contrastToggleBtn"),
  voiceLabel: document.getElementById("voiceLabel"),
  stopAudioBtn: document.getElementById("stopAudioBtn"),
  currentStepBadge: document.getElementById("currentStepBadge"),
  voiceStatusBadge: document.getElementById("voiceStatusBadge"),
  globalStatus: document.getElementById("globalStatus"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroIntro: document.getElementById("heroIntro"),
  startLearningBtn: document.getElementById("startLearningBtn"),
  askAssistantBtn: document.getElementById("askAssistantBtn"),
  viewTimelineBtn: document.getElementById("viewTimelineBtn"),
  listenHeroBtn: document.getElementById("listenHeroBtn"),
  assistantEyebrow: document.getElementById("assistantEyebrow"),
  assistantTitle: document.getElementById("assistantTitle"),
  assistantIntro: document.getElementById("assistantIntro"),
  listenAssistantBtn: document.getElementById("listenAssistantBtn"),
  assistantPersona: document.getElementById("assistantPersona"),
  assistantConcernLabel: document.getElementById("assistantConcernLabel"),
  assistantConcern: document.getElementById("assistantConcern"),
  assistantSupportLabel: document.getElementById("assistantSupportLabel"),
  assistantSupportNeed: document.getElementById("assistantSupportNeed"),
  assistantQuestionLabel: document.getElementById("assistantQuestionLabel"),
  assistantQuestion: document.getElementById("assistantQuestion"),
  assistantAskBtn: document.getElementById("assistantAskBtn"),
  assistantResponse: document.getElementById("assistantResponse"),
  assistantSourceBadge: document.getElementById("assistantSourceBadge"),
  assistantModeBadge: document.getElementById("assistantModeBadge"),
  assistantSummaryTitle: document.getElementById("assistantSummaryTitle"),
  assistantSummary: document.getElementById("assistantSummary"),
  assistantActionsTitle: document.getElementById("assistantActionsTitle"),
  assistantActions: document.getElementById("assistantActions"),
  assistantReassuranceLabel: document.getElementById("assistantReassuranceLabel"),
  assistantReassurance: document.getElementById("assistantReassurance"),
  assistantNextStepLabel: document.getElementById("assistantNextStepLabel"),
  assistantNextStep: document.getElementById("assistantNextStep"),
  assistantVerificationLabel: document.getElementById("assistantVerificationLabel"),
  assistantVerificationTip: document.getElementById("assistantVerificationTip"),
  assistantFollowUpLabel: document.getElementById("assistantFollowUpLabel"),
  assistantFollowUpPrompt: document.getElementById("assistantFollowUpPrompt"),
  assistantGoogleFeaturesTitle: document.getElementById("assistantGoogleFeaturesTitle"),
  assistantGoogleFeatures: document.getElementById("assistantGoogleFeatures"),
  assistantWhyThisHelp: document.getElementById("assistantWhyThisHelp"),
  guideEyebrow: document.getElementById("guideEyebrow"),
  guideTitle: document.getElementById("guideTitle"),
  guideIntro: document.getElementById("guideIntro"),
  listenGuideBtn: document.getElementById("listenGuideBtn"),
  stepRail: document.getElementById("stepRail"),
  currentStepCard: document.getElementById("currentStepCard"),
  prevStepBtn: document.getElementById("prevStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  timelineEyebrow: document.getElementById("timelineEyebrow"),
  timelineTitle: document.getElementById("timelineTitle"),
  timelineIntro: document.getElementById("timelineIntro"),
  listenTimelineBtn: document.getElementById("listenTimelineBtn"),
  timelineList: document.getElementById("timelineList"),
  guidanceEyebrow: document.getElementById("guidanceEyebrow"),
  guidanceTitle: document.getElementById("guidanceTitle"),
  guidanceIntro: document.getElementById("guidanceIntro"),
  listenGuidanceBtn: document.getElementById("listenGuidanceBtn"),
  guidanceGrid: document.getElementById("guidanceGrid"),
  guidanceNote: document.getElementById("guidanceNote"),
  practiceEyebrow: document.getElementById("practiceEyebrow"),
  practiceTitle: document.getElementById("practiceTitle"),
  practiceIntro: document.getElementById("practiceIntro"),
  listenPracticeBtn: document.getElementById("listenPracticeBtn"),
  practiceNote: document.getElementById("practiceNote"),
  ballotList: document.getElementById("ballotList"),
  submitVoteBtn: document.getElementById("submitVoteBtn"),
  resetVoteBtn: document.getElementById("resetVoteBtn"),
  practiceStatus: document.getElementById("practiceStatus"),
  quizEyebrow: document.getElementById("quizEyebrow"),
  quizTitle: document.getElementById("quizTitle"),
  quizIntro: document.getElementById("quizIntro"),
  listenQuizBtn: document.getElementById("listenQuizBtn"),
  quizList: document.getElementById("quizList"),
  faqEyebrow: document.getElementById("faqEyebrow"),
  faqTitle: document.getElementById("faqTitle"),
  faqIntro: document.getElementById("faqIntro"),
  listenFaqBtn: document.getElementById("listenFaqBtn"),
  faqList: document.getElementById("faqList"),
};

function t(entry) {
  return entry[state.language];
}

function announce(message) {
  elements.globalStatus.textContent = message;
}

function updateTheme() {
  document.documentElement.style.setProperty("--text-scale", String(textScales[state.textScaleIndex]));
  elements.body.classList.toggle("high-contrast", state.highContrast);
  document.documentElement.lang = state.language === "hi" ? "hi" : "en";
}

function currentQuizCorrectCount() {
  return quizQuestions.reduce((count, question, index) => {
    return state.quizSelections[index] === question.correctIndex ? count + 1 : count;
  }, 0);
}

function currentAssistantModeLabel() {
  if (state.assistantAvailability === "gemini") return t(copy.assistantModeGemini);
  if (state.assistantAvailability === "fallback") return t(copy.assistantModeFallback);
  return t(copy.assistantModeLocal);
}

function currentVoiceStatusLabel() {
  const activeSource = state.isSpeaking ? state.speakingSource : (state.audioAvailability === "google" ? "google" : "browser");
  if (activeSource === "google") {
    return state.isSpeaking ? t(copy.voicePlayingGoogle) : t(copy.voiceReadyGoogle);
  }
  return state.isSpeaking ? t(copy.voicePlayingBrowser) : t(copy.voiceReadyBrowser);
}

function currentAssistantSourceLabel() {
  if (!state.assistantResult) return t(copy.assistantSourceLocal);
  if (state.assistantResult.source === "gemini") return t(copy.assistantSourceGemini);
  if (state.assistantResult.source === "fallback") return t(copy.assistantSourceFallback);
  return t(copy.assistantSourceLocal);
}

function buildAssistantPayload() {
  return {
    language: state.language,
    persona: "older_adult",
    stepIndex: state.currentStepIndex,
    concern: state.assistantConcern,
    supportNeed: state.assistantSupportNeed,
    question: state.assistantQuestion.trim(),
    highContrast: state.highContrast,
    textScale: textScales[state.textScaleIndex],
    voteSubmitted: state.voteSubmitted,
    quizCorrectCount: currentQuizCorrectCount(),
  };
}

function buildLocalAssistantPreview() {
  return buildOfflineAssistantPreview({
    context: buildAssistantPayload(),
    language: state.language,
    t,
    steps,
    assistantConcerns,
    assistantSupportNeeds,
    copy,
    availableGoogleFeatures: state.availableGoogleFeatures,
  });
}

function updateLocalAssistant() {
  state.assistantResult = buildLocalAssistantPreview();
  renderAssistant();
}

function renderSelectOptions(selectElement, items, selectedId) {
  selectElement.replaceChildren(
    ...items.map((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = t(item.label);
      option.selected = item.id === selectedId;
      return option;
    })
  );
}

function renderTextList(listElement, items) {
  listElement.replaceChildren(
    ...items.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );
}

function prefersReducedMotion() {
  return typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function focusElement(element) {
  if (!element || typeof element.focus !== "function") return;
  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
}

async function loadAssistantAvailability() {
  if (!window.location.protocol.startsWith("http")) {
    state.assistantAvailability = "local";
    state.audioAvailability = "browser";
    state.availableGoogleFeatures = [];
    renderAssistant();
    renderStatus();
    return;
  }

  try {
    const response = await fetch("/api/config/public");
    if (!response.ok) throw new Error("config fetch failed");
    const data = await response.json();
    const geminiStatus = data.google_services?.gemini || {};
    const ttsStatus = data.google_services?.cloud_text_to_speech || {};
    state.availableGoogleFeatures = Array.isArray(data.google_features) ? data.google_features : [];
    state.assistantAvailability = geminiStatus.available ? "gemini" : "fallback";
    state.audioAvailability = ttsStatus.available ? "google" : "browser";
  } catch {
    state.assistantAvailability = "local";
    state.audioAvailability = "browser";
    state.availableGoogleFeatures = [];
  }
  renderAssistant();
  renderStatus();
}

async function requestAssistantGuidance() {
  state.assistantLoading = true;
  renderAssistant();

  if (!window.location.protocol.startsWith("http") || state.assistantAvailability === "local") {
    state.assistantLoading = false;
    updateLocalAssistant();
    return;
  }

  try {
    const response = await fetch("/api/assistant/guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: state.language,
        persona: "older_adult",
        step_index: state.currentStepIndex,
        concern: state.assistantConcern,
        support_need: state.assistantSupportNeed,
        question: state.assistantQuestion.trim() || undefined,
        high_contrast: state.highContrast,
        text_scale: textScales[state.textScaleIndex],
        vote_submitted: state.voteSubmitted,
        quiz_correct_count: currentQuizCorrectCount(),
      }),
    });

    if (!response.ok) {
      throw new Error("assistant fetch failed");
    }

    const data = await response.json();
    state.assistantResult = {
      summary: data.summary,
      actions: data.actions,
      reassurance: data.reassurance,
      nextStep: data.next_step,
      verificationTip: data.verification_tip,
      followUpPrompt: data.follow_up_prompt,
      whyThisHelp: data.why_this_help,
      googleFeatures: Array.isArray(data.google_features) ? data.google_features : [],
      source: data.source,
    };
    state.availableGoogleFeatures = Array.isArray(data.google_features) ? data.google_features : state.availableGoogleFeatures;
    state.assistantAvailability = data.source === "gemini" ? "gemini" : "fallback";
  } catch {
    state.assistantAvailability = "local";
    state.assistantResult = buildLocalAssistantPreview();
  } finally {
    state.assistantLoading = false;
    renderAssistant();
    renderStatus();
  }
}

async function playRemoteAudio(text) {
  try {
    const response = await fetch("/api/audio/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: state.language,
        text,
      }),
    });
    if (!response.ok) {
      throw new Error("remote audio unavailable");
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);

    state.remoteAudio = audio;
    state.remoteAudioUrl = audioUrl;
    state.speakingSource = "google";

    audio.onplay = () => {
      state.isSpeaking = true;
      renderStatus();
      announce(t(copy.speechStartedGoogle));
    };

    audio.onended = () => {
      if (state.remoteAudioUrl) {
        URL.revokeObjectURL(state.remoteAudioUrl);
      }
      state.remoteAudio = null;
      state.remoteAudioUrl = null;
      state.isSpeaking = false;
      state.speakingSource = null;
      renderStatus();
      announce(t(copy.speechStopped));
    };

    audio.onerror = () => {
      if (state.remoteAudioUrl) {
        URL.revokeObjectURL(state.remoteAudioUrl);
      }
      state.remoteAudio = null;
      state.remoteAudioUrl = null;
      state.isSpeaking = false;
      state.speakingSource = null;
      renderStatus();
    };

    await audio.play();
    return true;
  } catch {
    return false;
  }
}

async function speakText(text) {
  stopSpeaking(false);

  if (window.location.protocol.startsWith("http") && state.audioAvailability === "google") {
    const playedRemotely = await playRemoteAudio(text);
    if (playedRemotely) {
      return;
    }
    state.audioAvailability = "browser";
    renderStatus();
    announce(t(copy.speechFallbackBrowser));
  }

  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    announce(t(copy.speechUnavailable));
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.language === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 0.88;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const voicePrefix = state.language === "hi" ? "hi" : "en";
  const matchingVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(voicePrefix));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.onstart = () => {
    state.isSpeaking = true;
    state.speakingSource = "browser";
    renderStatus();
    announce(t(copy.speechStartedBrowser));
  };

  utterance.onend = () => {
    state.isSpeaking = false;
    state.speakingSource = null;
    renderStatus();
    announce(t(copy.speechStopped));
  };

  utterance.onerror = () => {
    state.isSpeaking = false;
    state.speakingSource = null;
    renderStatus();
    announce(t(copy.speechUnavailable));
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking(shouldAnnounce = true) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (state.remoteAudio) {
    state.remoteAudio.pause();
  }
  if (state.remoteAudioUrl) {
    URL.revokeObjectURL(state.remoteAudioUrl);
  }
  state.remoteAudio = null;
  state.remoteAudioUrl = null;
  state.isSpeaking = false;
  state.speakingSource = null;
  renderStatus();
  if (shouldAnnounce) {
    announce(t(copy.speechStopped));
  }
}

function currentGoogleFeatureLabels(featureIds) {
  return featureIds
    .map((featureId) => googleFeatureLabels[featureId])
    .filter(Boolean)
    .map((label) => t(label));
}

function renderStatus() {
  elements.currentStepBadge.textContent = `${t(copy.stepCounter)} ${state.currentStepIndex + 1} ${t(copy.of)} ${steps.length}`;
  elements.voiceStatusBadge.textContent = currentVoiceStatusLabel();
}

function renderStaticText() {
  elements.brandEyebrow.textContent = t(copy.brandEyebrow);
  elements.brandTitle.textContent = t(copy.brandTitle);
  elements.brandSubtitle.textContent = t(copy.brandSubtitle);
  elements.languageLabel.textContent = t(copy.languageLabel);
  elements.langEnBtn.textContent = t(copy.english);
  elements.langHiBtn.textContent = t(copy.hindi);
  elements.textSizeLabel.textContent = t(copy.textSizeLabel);
  elements.decreaseTextBtn.textContent = t(copy.decreaseText);
  elements.increaseTextBtn.textContent = t(copy.increaseText);
  elements.decreaseTextBtn.setAttribute("aria-label", t(copy.decreaseTextAria));
  elements.increaseTextBtn.setAttribute("aria-label", t(copy.increaseTextAria));
  elements.contrastLabel.textContent = t(copy.contrastLabel);
  elements.contrastToggleBtn.textContent = state.highContrast ? t(copy.contrastOff) : t(copy.contrastOn);
  elements.voiceLabel.textContent = t(copy.voiceLabel);
  elements.stopAudioBtn.textContent = t(copy.stopAudio);

  elements.heroEyebrow.textContent = t(copy.heroEyebrow);
  elements.heroTitle.textContent = t(copy.heroTitle);
  elements.heroIntro.textContent = t(copy.heroIntro);
  elements.startLearningBtn.textContent = t(copy.startLearning);
  elements.askAssistantBtn.textContent = t(copy.assistantAsk);
  elements.viewTimelineBtn.textContent = t(copy.viewTimeline);
  elements.listenHeroBtn.textContent = t(copy.listenAudio);

  elements.assistantEyebrow.textContent = t(copy.assistantEyebrow);
  elements.assistantTitle.textContent = t(copy.assistantTitle);
  elements.assistantIntro.textContent = t(copy.assistantIntro);
  elements.listenAssistantBtn.textContent = t(copy.listenSection);
  elements.assistantPersona.textContent = t(copy.assistantPersona);
  elements.assistantConcernLabel.textContent = t(copy.assistantConcernLabel);
  elements.assistantSupportLabel.textContent = t(copy.assistantSupportLabel);
  elements.assistantQuestionLabel.textContent = t(copy.assistantQuestionLabel);
  elements.assistantQuestion.placeholder = t(copy.assistantQuestionPlaceholder);
  elements.assistantSummaryTitle.textContent = t(copy.assistantSummaryTitle);
  elements.assistantActionsTitle.textContent = t(copy.assistantActionsTitle);
  elements.assistantReassuranceLabel.textContent = t(copy.assistantReassuranceLabel);
  elements.assistantNextStepLabel.textContent = t(copy.assistantNextStepLabel);
  elements.assistantVerificationLabel.textContent = t(copy.assistantVerificationLabel);
  elements.assistantFollowUpLabel.textContent = t(copy.assistantFollowUpLabel);
  elements.assistantGoogleFeaturesTitle.textContent = t(copy.assistantGoogleFeaturesTitle);

  elements.guideEyebrow.textContent = t(copy.guideEyebrow);
  elements.guideTitle.textContent = t(copy.guideTitle);
  elements.guideIntro.textContent = t(copy.guideIntro);
  elements.listenGuideBtn.textContent = t(copy.listenSection);
  elements.prevStepBtn.textContent = t(copy.prevStep);
  elements.nextStepBtn.textContent = t(copy.nextStep);

  elements.timelineEyebrow.textContent = t(copy.timelineEyebrow);
  elements.timelineTitle.textContent = t(copy.timelineTitle);
  elements.timelineIntro.textContent = t(copy.timelineIntro);
  elements.listenTimelineBtn.textContent = t(copy.listenSection);

  elements.guidanceEyebrow.textContent = t(copy.guidanceEyebrow);
  elements.guidanceTitle.textContent = t(copy.guidanceTitle);
  elements.guidanceIntro.textContent = t(copy.guidanceIntro);
  elements.guidanceNote.textContent = t(copy.guidanceNote);
  elements.listenGuidanceBtn.textContent = t(copy.listenSection);

  elements.practiceEyebrow.textContent = t(copy.practiceEyebrow);
  elements.practiceTitle.textContent = t(copy.practiceTitle);
  elements.practiceIntro.textContent = t(copy.practiceIntro);
  elements.practiceNote.textContent = t(copy.practiceNote);
  elements.listenPracticeBtn.textContent = t(copy.listenSection);
  elements.submitVoteBtn.textContent = t(copy.submitVote);
  elements.resetVoteBtn.textContent = t(copy.resetVote);

  elements.quizEyebrow.textContent = t(copy.quizEyebrow);
  elements.quizTitle.textContent = t(copy.quizTitle);
  elements.quizIntro.textContent = t(copy.quizIntro);
  elements.listenQuizBtn.textContent = t(copy.listenSection);

  elements.faqEyebrow.textContent = t(copy.faqEyebrow);
  elements.faqTitle.textContent = t(copy.faqTitle);
  elements.faqIntro.textContent = t(copy.faqIntro);
  elements.listenFaqBtn.textContent = t(copy.listenSection);

  elements.langEnBtn.classList.toggle("active", state.language === "en");
  elements.langHiBtn.classList.toggle("active", state.language === "hi");
  elements.langEnBtn.setAttribute("aria-pressed", String(state.language === "en"));
  elements.langHiBtn.setAttribute("aria-pressed", String(state.language === "hi"));
  elements.contrastToggleBtn.setAttribute("aria-pressed", String(state.highContrast));
}

function renderAssistant() {
  if (!state.assistantResult) {
    state.assistantResult = buildLocalAssistantPreview();
  }

  renderSelectOptions(elements.assistantConcern, assistantConcerns, state.assistantConcern);
  renderSelectOptions(elements.assistantSupportNeed, assistantSupportNeeds, state.assistantSupportNeed);

  elements.assistantQuestion.value = state.assistantQuestion;
  elements.assistantAskBtn.textContent = state.assistantLoading ? t(copy.assistantLoading) : t(copy.assistantAsk);
  elements.assistantAskBtn.disabled = state.assistantLoading;
  elements.assistantAskBtn.setAttribute("aria-busy", String(state.assistantLoading));
  elements.assistantResponse.setAttribute("aria-busy", String(state.assistantLoading));
  elements.assistantSourceBadge.textContent = currentAssistantSourceLabel();
  elements.assistantModeBadge.textContent = currentAssistantModeLabel();
  elements.assistantSummary.textContent = state.assistantResult.summary;
  renderTextList(elements.assistantActions, state.assistantResult.actions);
  elements.assistantReassurance.textContent = state.assistantResult.reassurance;
  elements.assistantNextStep.textContent = state.assistantResult.nextStep;
  elements.assistantVerificationTip.textContent = state.assistantResult.verificationTip || "";
  elements.assistantFollowUpPrompt.textContent = state.assistantResult.followUpPrompt || "";
  const assistantGoogleFeatures = state.assistantResult.googleFeatures?.length
    ? state.assistantResult.googleFeatures
    : state.availableGoogleFeatures;
  const googleFeatureLabelsForResponse = currentGoogleFeatureLabels(assistantGoogleFeatures);
  renderTextList(elements.assistantGoogleFeatures, googleFeatureLabelsForResponse);
  elements.assistantGoogleFeaturesTitle.hidden = googleFeatureLabelsForResponse.length === 0;
  elements.assistantGoogleFeatures.hidden = googleFeatureLabelsForResponse.length === 0;
  elements.assistantWhyThisHelp.textContent = state.assistantResult.whyThisHelp;
}

function renderGuide() {
  elements.stepRail.innerHTML = steps
    .map(
      (step, index) => `
        <button
          type="button"
          class="step-pill ${index === state.currentStepIndex ? "active" : ""}"
          data-step-index="${index}"
          aria-current="${index === state.currentStepIndex ? "step" : "false"}"
        >
          <span class="step-number">${index + 1}</span>
          <strong>${t(step.title)}</strong>
        </button>
      `
    )
    .join("");

  const currentStep = steps[state.currentStepIndex];
  elements.currentStepCard.innerHTML = `
    <div class="step-card-top">
      <div class="step-title-wrap">
        <span class="step-icon" aria-hidden="true">${currentStep.icon}</span>
        <div>
          <p class="eyebrow">${t(copy.stepCounter)} ${state.currentStepIndex + 1}</p>
          <h3>${t(currentStep.title)}</h3>
          <p>${t(currentStep.description)}</p>
        </div>
      </div>
      <button type="button" class="listen-btn" id="listenCurrentStepBtn">${t(copy.listenStep)}</button>
    </div>
    <div class="step-helper">
      <strong>${t(copy.stepForYou)}</strong>
      <p>${t(currentStep.helper)}</p>
    </div>
  `;

  elements.prevStepBtn.disabled = state.currentStepIndex === 0;
  elements.nextStepBtn.disabled = state.currentStepIndex === steps.length - 1;
}

function renderTimeline() {
  elements.timelineList.innerHTML = steps
    .map(
      (step, index) => `
        <button
          type="button"
          class="timeline-button ${index === state.currentStepIndex ? "active" : ""}"
          data-step-index="${index}"
          aria-current="${index === state.currentStepIndex ? "step" : "false"}"
        >
          <span class="timeline-number">${index + 1}</span>
          <strong>${t(step.title)}</strong>
          <p>${t(step.description)}</p>
        </button>
      `
    )
    .join("");
}

function renderGuidance() {
  elements.guidanceGrid.innerHTML = guidanceItems
    .map(
      (item) => `
        <article class="guidance-card">
          <h3>${t(item.title)}</h3>
          <ul>
            ${item.points.map((point) => `<li>${t(point)}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderPractice() {
  elements.ballotList.innerHTML = candidates
    .map(
      (candidate) => `
        <button
          type="button"
          class="ballot-card ${candidate.id === state.selectedCandidateId ? "selected" : ""}"
          data-candidate-id="${candidate.id}"
          aria-pressed="${candidate.id === state.selectedCandidateId ? "true" : "false"}"
        >
          <strong>${t(candidate.label)}</strong>
          <span>${candidate.name}</span>
          <span>${t(candidate.note)}</span>
        </button>
      `
    )
    .join("");

  if (state.voteSubmitted && state.selectedCandidateId) {
    elements.practiceStatus.textContent = t(copy.voteSuccess);
  } else {
    elements.practiceStatus.textContent = "";
  }
}

function renderQuiz() {
  elements.quizList.innerHTML = quizQuestions
    .map((item, questionIndex) => {
      const selectedIndex = state.quizSelections[questionIndex];
      const hasSelection = Number.isInteger(selectedIndex);
      const isCorrect = selectedIndex === item.correctIndex;

      return `
        <article class="quiz-card">
          <h3>${t(item.question)}</h3>
          <div class="option-list">
            ${item.options
              .map((option, optionIndex) => {
                let optionClass = "option-btn";
                if (selectedIndex === optionIndex) {
                  optionClass += optionIndex === item.correctIndex ? " correct" : " wrong";
                }

                return `
                  <button
                    type="button"
                    class="${optionClass}"
                    data-question-index="${questionIndex}"
                    data-option-index="${optionIndex}"
                  >
                    ${t(option)}
                  </button>
                `;
              })
              .join("")}
          </div>
          ${hasSelection ? `<p class="quiz-feedback">${isCorrect ? t(copy.correct) : t(copy.tryAgain)}</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function renderFaq() {
  elements.faqList.innerHTML = faqs
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${t(item.question)}</summary>
          <p class="faq-answer">${t(item.answer)}</p>
        </details>
      `
    )
    .join("");
}

function renderAll() {
  updateTheme();
  renderStaticText();
  renderStatus();
  renderAssistant();
  renderGuide();
  renderTimeline();
  renderGuidance();
  renderPractice();
  renderQuiz();
  renderFaq();
}

function setStep(index) {
  state.currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));
  renderGuide();
  renderTimeline();
  renderStatus();
  updateLocalAssistant();
}

function getHeroSpeech() {
  return `${t(copy.brandTitle)}. ${t(copy.heroIntro)}`;
}

function getAssistantSpeech() {
  const result = state.assistantResult || buildLocalAssistantPreview();
  return `${t(copy.assistantTitle)}. ${result.summary}. ${result.actions.join(" ")} ${result.reassurance}. ${t(copy.assistantNextStepLabel)} ${result.nextStep}. ${t(copy.assistantVerificationLabel)} ${result.verificationTip}.`;
}

function getGuideSpeech() {
  const step = steps[state.currentStepIndex];
  return `${t(copy.stepCounter)} ${state.currentStepIndex + 1}. ${t(step.title)}. ${t(step.description)}. ${t(copy.stepForYou)}. ${t(step.helper)}`;
}

function getTimelineSpeech() {
  return steps.map((step, index) => `${index + 1}. ${t(step.title)}. ${t(step.description)}`).join(" ");
}

function getGuidanceSpeech() {
  return guidanceItems.map((item) => `${t(item.title)}. ${item.points.map((point) => t(point)).join(" ")}`).join(" ");
}

function getPracticeSpeech() {
  return `${t(copy.practiceIntro)} ${t(copy.practiceNote)}`;
}

function getQuizSpeech() {
  return quizQuestions.map((item) => t(item.question)).join(" ");
}

function getFaqSpeech() {
  return faqs.map((item) => `${t(item.question)} ${t(item.answer)}`).join(" ");
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }
}

elements.langEnBtn.addEventListener("click", () => {
  if (state.language === "en") return;
  stopSpeaking(false);
  state.language = "en";
  renderAll();
  updateLocalAssistant();
  announce(t(copy.languageChanged));
});

elements.langHiBtn.addEventListener("click", () => {
  if (state.language === "hi") return;
  stopSpeaking(false);
  state.language = "hi";
  renderAll();
  updateLocalAssistant();
  announce(t(copy.languageChanged));
});

elements.decreaseTextBtn.addEventListener("click", () => {
  if (state.textScaleIndex === 0) return;
  state.textScaleIndex -= 1;
  updateTheme();
  announce(t(copy.textSmaller));
});

elements.increaseTextBtn.addEventListener("click", () => {
  if (state.textScaleIndex === textScales.length - 1) return;
  state.textScaleIndex += 1;
  updateTheme();
  announce(t(copy.textLarger));
});

elements.contrastToggleBtn.addEventListener("click", () => {
  state.highContrast = !state.highContrast;
  updateTheme();
  renderStaticText();
  updateLocalAssistant();
  announce(t(copy.contrastChanged));
});

elements.stopAudioBtn.addEventListener("click", () => {
  stopSpeaking();
});

elements.startLearningBtn.addEventListener("click", () => {
  setStep(0);
  scrollToSection("guide");
});

elements.askAssistantBtn.addEventListener("click", () => {
  scrollToSection("assistant");
  focusElement(elements.assistantQuestion);
});

elements.viewTimelineBtn.addEventListener("click", () => {
  scrollToSection("timeline");
});

elements.listenHeroBtn.addEventListener("click", () => {
  speakText(getHeroSpeech());
});

elements.listenAssistantBtn.addEventListener("click", () => {
  speakText(getAssistantSpeech());
});

elements.listenGuideBtn.addEventListener("click", () => {
  speakText(getGuideSpeech());
});

elements.listenTimelineBtn.addEventListener("click", () => {
  speakText(getTimelineSpeech());
});

elements.listenGuidanceBtn.addEventListener("click", () => {
  speakText(getGuidanceSpeech());
});

elements.listenPracticeBtn.addEventListener("click", () => {
  speakText(getPracticeSpeech());
});

elements.listenQuizBtn.addEventListener("click", () => {
  speakText(getQuizSpeech());
});

elements.listenFaqBtn.addEventListener("click", () => {
  speakText(getFaqSpeech());
});

elements.assistantConcern.addEventListener("change", (event) => {
  state.assistantConcern = event.target.value;
  updateLocalAssistant();
});

elements.assistantSupportNeed.addEventListener("change", (event) => {
  state.assistantSupportNeed = event.target.value;
  updateLocalAssistant();
});

elements.assistantQuestion.addEventListener("input", (event) => {
  state.assistantQuestion = event.target.value;
  updateLocalAssistant();
});

elements.assistantAskBtn.addEventListener("click", async () => {
  await requestAssistantGuidance();
  focusElement(elements.assistantResponse);
});

elements.prevStepBtn.addEventListener("click", () => {
  setStep(state.currentStepIndex - 1);
});

elements.nextStepBtn.addEventListener("click", () => {
  setStep(state.currentStepIndex + 1);
});

elements.stepRail.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step-index]");
  if (!button) return;
  setStep(Number(button.dataset.stepIndex));
});

elements.currentStepCard.addEventListener("click", (event) => {
  const listenButton = event.target.closest("#listenCurrentStepBtn");
  if (!listenButton) return;
  speakText(getGuideSpeech());
});

elements.timelineList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step-index]");
  if (!button) return;
  setStep(Number(button.dataset.stepIndex));
  scrollToSection("guide");
});

elements.ballotList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-candidate-id]");
  if (!card) return;
  state.selectedCandidateId = card.dataset.candidateId;
  state.voteSubmitted = false;
  renderPractice();
  updateLocalAssistant();
});

elements.submitVoteBtn.addEventListener("click", () => {
  if (!state.selectedCandidateId) {
    elements.practiceStatus.textContent = t(copy.votePickFirst);
    return;
  }

  state.voteSubmitted = true;
  renderPractice();
  updateLocalAssistant();
});

elements.resetVoteBtn.addEventListener("click", () => {
  state.selectedCandidateId = null;
  state.voteSubmitted = false;
  elements.practiceStatus.textContent = "";
  renderPractice();
  updateLocalAssistant();
});

elements.quizList.addEventListener("click", (event) => {
  const option = event.target.closest("[data-question-index]");
  if (!option) return;
  const questionIndex = Number(option.dataset.questionIndex);
  const optionIndex = Number(option.dataset.optionIndex);
  state.quizSelections[questionIndex] = optionIndex;
  renderQuiz();
  updateLocalAssistant();
});

window.addEventListener("beforeunload", () => {
  stopSpeaking(false);
});

renderAll();
updateLocalAssistant();
void loadAssistantAvailability();

