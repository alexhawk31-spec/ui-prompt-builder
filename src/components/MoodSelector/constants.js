export const MOOD_DIMS = {
  density: {
    label: "Density",
    desc: "How packed is the UI",
    color: "#3b82f6",
    opts: [
      { id: "spacious", label: "Spacious", desc: "Generous whitespace, large touch targets" },
      { id: "balanced", label: "Balanced", desc: "Standard padding, comfortable reading" },
      { id: "compact", label: "Compact", desc: "Tighter spacing, more content visible" },
      { id: "dense", label: "Dense", desc: "Maximum info density, minimal padding" },
    ],
  },
  typography: {
    label: "Typography",
    desc: "Font personality",
    color: "#a855f7",
    opts: [
      { id: "clean", label: "Clean", desc: "Modern sans-serif, neutral and professional" },
      { id: "technical", label: "Technical", desc: "Monospace-heavy, code-like precision" },
      { id: "editorial", label: "Editorial", desc: "Serif accents, magazine-quality hierarchy" },
      { id: "rounded", label: "Rounded", desc: "Soft, friendly fonts with personality" },
    ],
  },
  interaction: {
    label: "Interaction",
    desc: "Hover and transition energy",
    color: "#f59e0b",
    opts: [
      { id: "subtle", label: "Subtle", desc: "Gentle opacity shifts, understated" },
      { id: "smooth", label: "Smooth", desc: "Fluid easing, polished transitions" },
      { id: "snappy", label: "Snappy", desc: "Quick, responsive, satisfying clicks" },
      { id: "dramatic", label: "Dramatic", desc: "Bold transforms, scale shifts, glows" },
    ],
  },
  embellishment: {
    label: "Embellishment",
    desc: "Visual extras",
    color: "#10b981",
    opts: [
      { id: "none", label: "None", desc: "Pure content, zero decoration" },
      { id: "minimal", label: "Minimal", desc: "Subtle borders and light shadows" },
      { id: "moderate", label: "Moderate", desc: "Gradients, shadows, accent borders" },
      { id: "rich", label: "Rich", desc: "Glows, glass effects, layered textures" },
    ],
  },
};

export const MOOD_PRESETS = [
  {
    id: "professional",
    name: "Professional",
    icon: "briefcase",
    color: "#3b82f6",
    desc: "Clean, trustworthy, enterprise-ready",
    v: { density: "balanced", typography: "clean", interaction: "smooth", embellishment: "minimal" },
  },
  {
    id: "playful",
    name: "Playful",
    icon: "sparkles",
    color: "#f59e0b",
    desc: "Fun, energetic, approachable",
    v: { density: "spacious", typography: "rounded", interaction: "snappy", embellishment: "moderate" },
  },
  {
    id: "minimal",
    name: "Minimal",
    icon: "minus",
    color: "#94a3b8",
    desc: "Stripped back, content-first, quiet",
    v: { density: "spacious", typography: "clean", interaction: "subtle", embellishment: "none" },
  },
  {
    id: "data-dense",
    name: "Data-Dense",
    icon: "chart",
    color: "#22c55e",
    desc: "Maximum info, dashboard-optimized",
    v: { density: "dense", typography: "technical", interaction: "snappy", embellishment: "minimal" },
  },
  {
    id: "immersive",
    name: "Immersive",
    icon: "layers",
    color: "#8b5cf6",
    desc: "Full-screen, atmospheric, cinematic",
    v: { density: "spacious", typography: "editorial", interaction: "dramatic", embellishment: "rich" },
  },
  {
    id: "editorial",
    name: "Editorial",
    icon: "type",
    color: "#e63946",
    desc: "Magazine-quality, typography-driven",
    v: { density: "balanced", typography: "editorial", interaction: "smooth", embellishment: "moderate" },
  },
];

export const DEFAULT_MOOD_DIMENSIONS = {
  density: "balanced",
  typography: "clean",
  interaction: "smooth",
  embellishment: "minimal",
};

// Prompt descriptions for each dimension value
export const MOOD_PROMPT_MAP = {
  density: {
    spacious: "generous whitespace, large touch targets, breathing room between sections",
    balanced: "standard comfortable spacing, balanced padding",
    compact: "tight spacing, more content visible, reduced padding",
    dense: "maximum information density, minimal padding, every pixel earns its place",
  },
  typography: {
    clean: "modern sans-serif typography (DM Sans, Inter), neutral and professional",
    technical: "monospace-heavy typography (JetBrains Mono, Fira Code), code-like precision and data readability",
    editorial: "serif accents for headings (Georgia, Playfair Display), magazine-quality typographic hierarchy",
    rounded: "soft, friendly fonts (Nunito, Quicksand), rounded letterforms with personality",
  },
  interaction: {
    subtle: "understated hover effects — gentle opacity shifts, minimal motion",
    smooth: "polished transitions — fluid easing (cubic-bezier(0.4, 0, 0.2, 1)), 300-350ms durations",
    snappy: "quick, responsive interactions — 100-150ms ease-out, satisfying click feedback",
    dramatic: "bold hover transforms — scale shifts, glow effects, spring-physics easing",
  },
  embellishment: {
    none: "pure content, zero decoration — flat surfaces and clean geometry only",
    minimal: "subtle borders and light box-shadows only",
    moderate: "gradients, layered shadows, accent-colored borders, subtle depth",
    rich: "glassmorphism, glows, layered textures, backdrop-blur, radial gradients",
  },
};
