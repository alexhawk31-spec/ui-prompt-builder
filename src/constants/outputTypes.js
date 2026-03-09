// ── Output Type Definitions (Tier 1) ──

export const OUTPUT_TYPES = [
  {
    id: "app",
    label: "App / UI Interface",
    subtitle: "React, dashboards, web tools",
    icon: "monitor",
    color: "#818cf8",
    locked: false,
  },
  {
    id: "presentation",
    label: "Presentation",
    subtitle: "Slide decks, executive briefs",
    icon: "layout",
    color: "#f59e0b",
    locked: false,
  },
  {
    id: "one-pager",
    label: "One Pager",
    subtitle: "Single-page docs, summaries",
    icon: "fileText",
    color: "#22c55e",
    locked: false,
  },
];

// ── Purpose Options (Tier 2) per Output Type ──

export const PURPOSE_OPTIONS = {
  app: [
    { id: "dashboard", label: "Data-Heavy / Dashboard", icon: "barChart" },
    { id: "mission-control", label: "Mission Control", icon: "radar" },
    { id: "builder", label: "Builder / Config Tool", icon: "hammer" },
    { id: "learn", label: "Learn & Explore", icon: "compass" },
    { id: "community", label: "Community / Social", icon: "users" },
    { id: "discover", label: "Discover / Browse", icon: "search" },
    { id: "freestyle", label: "Freestyle", icon: "wind" },
  ],
  presentation: [
    { id: "executive-briefing", label: "Executive Briefing", icon: "briefcase" },
    { id: "product-demo", label: "Product Demo", icon: "play" },
    { id: "storytelling", label: "Storytelling / Narrative", icon: "film" },
    { id: "sales-deck", label: "Sales Deck", icon: "send" },
    { id: "workshop", label: "Workshop / Training", icon: "layers" },
  ],
  "one-pager": [
    { id: "summary-brief", label: "Summary / Brief", icon: "fileText" },
    { id: "research-analysis", label: "Research / Analysis", icon: "search" },
    { id: "announcement", label: "Announcement", icon: "send" },
    { id: "reference-cheat-sheet", label: "Reference / Cheat Sheet", icon: "list" },
  ],
};

// ── Step Availability per Output Type ──

export const STEP_AVAILABILITY = {
  app: {
    theme: true,
    mood: true,
    cards: true,
    data: true,
    navigation: true,
    buttons: true,
    animation: true,
    templates: true,
    prompt: true,
  },
  presentation: {
    theme: true,
    mood: true,
    cards: true,
    data: true,
    navigation: true,
    buttons: false,
    animation: true,
    templates: true,
    prompt: true,
  },
  "one-pager": {
    theme: true,
    mood: true,
    cards: true,
    data: true,
    navigation: true,
    buttons: false,
    animation: false,
    templates: true,
    prompt: true,
  },
};

// ── Disabled Step Tooltips ──

export const DISABLED_STEP_TOOLTIPS = {
  buttons: {
    presentation: "Buttons don't apply to presentations.",
    "one-pager": "Buttons don't apply to one-pagers.",
  },
  animation: {
    "one-pager": "Animation doesn't apply to one-pagers.",
  },
};

// ── Usage Tips per Output Type ──

export const USAGE_TIPS = {
  app: {
    title: "How to use this prompt",
    lines: [
      {
        bold: "Upgrading an existing project:",
        text: 'Open your project in Kiro or Claude Code, paste this prompt, and tell it "apply this design direction to my existing app."',
      },
      {
        bold: "Starting from scratch:",
        text: "Enable the app starter toggle below. Paste the full prompt and describe your idea — your AI will set up the project structure before it starts building.",
      },
    ],
  },
  presentation: {
    title: "How to use this prompt",
    lines: [
      {
        bold: "Starting from scratch:",
        text: "Give your AI this prompt plus a doc, bullet list, or brain dump of your content. It'll turn it into a full presentation.",
      },
      {
        bold: "Upgrading existing:",
        text: "Share your current deck or outline alongside this prompt. Tell it to keep your content but apply this design direction.",
      },
    ],
  },
  "one-pager": {
    title: "How to use this prompt",
    lines: [
      {
        bold: "Starting from scratch:",
        text: "Give your AI this prompt plus your key points or a rough draft. It'll lay it out for you.",
      },
      {
        bold: "Upgrading existing:",
        text: "Paste your existing content alongside this prompt and ask it to redesign the layout.",
      },
    ],
  },
};

// ── Helper: check if a step is available for the current output type ──

export function isStepAvailable(outputType, stepId) {
  if (!outputType) return false; // No type selected = all locked
  if (stepId === "appType") return true; // Always available
  const avail = STEP_AVAILABILITY[outputType];
  if (!avail) return false;
  return avail[stepId] !== false;
}

// ── Helper: get tooltip for disabled step ──

export function getDisabledTooltip(outputType, stepId) {
  const tooltips = DISABLED_STEP_TOOLTIPS[stepId];
  if (!tooltips) return null;
  return tooltips[outputType] || null;
}
