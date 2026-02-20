export const MOODS = [
  {
    id: "professional",
    name: "Professional",
    icon: "briefcase",
    desc: "Clean, structured, enterprise-ready",
    subOptions: [
      { id: "corporate", name: "Corporate", desc: "Formal, data-first" },
      { id: "startup", name: "Modern Startup", desc: "Clean but approachable" },
      { id: "consulting", name: "Consulting", desc: "Polished, authoritative" },
    ],
  },
  {
    id: "playful",
    name: "Playful & Fun",
    icon: "sparkles",
    desc: "Gamified, animated, engaging",
    subOptions: [
      { id: "gamified", name: "Gamified", desc: "Points, badges, progress bars" },
      { id: "whimsical", name: "Whimsical", desc: "Bouncy, colorful, delightful" },
      { id: "retro", name: "Retro Fun", desc: "Pixel art, 8-bit energy" },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    icon: "minus",
    desc: "Less is more, whitespace-forward",
    subOptions: [
      { id: "zen", name: "Zen", desc: "Maximum whitespace, whisper-quiet" },
      { id: "swiss", name: "Swiss Style", desc: "Grid-perfect, typographic" },
      { id: "japanese", name: "Japanese Minimal", desc: "Wabi-sabi, asymmetric balance" },
    ],
  },
  {
    id: "data-heavy",
    name: "Data-Dense",
    icon: "chart",
    desc: "Dashboards, metrics, information-rich",
    subOptions: [
      { id: "ops-center", name: "Ops Center", desc: "Real-time monitoring, dark theme" },
      { id: "analytics", name: "Analytics", desc: "Charts, tables, filterable" },
      { id: "executive", name: "Executive View", desc: "High-level KPIs, clean" },
    ],
  },
  {
    id: "immersive",
    name: "Immersive",
    icon: "layers",
    desc: "Full-screen, experience-driven",
    subOptions: [
      { id: "cinematic", name: "Cinematic", desc: "Full-bleed, dramatic reveals" },
      { id: "interactive", name: "Interactive Story", desc: "Scroll-driven narrative" },
      { id: "spatial", name: "Spatial", desc: "3D-inspired depth layers" },
    ],
  },
];
