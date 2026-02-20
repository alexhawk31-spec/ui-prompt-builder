export const PURPOSES = [
  { id: "learn", name: "Learn & Explore", icon: "compass", color: "#6366f1", desc: "Step-by-step guidance with clear progression" },
  { id: "data", name: "Data-Heavy", icon: "barChart", color: "#16a34a", desc: "Metrics, tables, and charts front and center" },
  { id: "story", name: "Telling a Story", icon: "film", color: "#d97706", desc: "Big visuals, cinematic pacing, narrative flow" },
  { id: "builder", name: "Builder", icon: "hammer", color: "#0284c7", desc: "Workspace with tools, canvas, and panels" },
  { id: "community", name: "Community Based", icon: "users", color: "#db2777", desc: "Feeds, profiles, and real-time conversations" },
  { id: "discover", name: "Discover", icon: "search", color: "#ea580c", desc: "Browse, filter, and explore a catalog" },
  { id: "mission", name: "Mission Control", icon: "target", color: "#dc2626", desc: "Track status, assign work, move things forward" },
  { id: "freestyle", name: "Freestyle", icon: "wind", color: "#64748b", desc: "No specific type — just apply your settings" },
];

export const PURPOSE_PROMPT_DESC = {
  learn: "Build a guided learning experience — think clear progression, generous whitespace, callout annotations, and a patient pace that maintains clarity at every step.",
  data: "Build a dense analytics interface — KPIs up top, charts in the middle, tables at the bottom. Every pixel earns its space with real data.",
  story: "Build a narrative landing page — big hero, cinematic pacing, one idea per section, and scroll-driven reveals that build toward a CTA.",
  builder: "Build a creator workspace — toolbar on the left, canvas in the center, property panel on the right. The UI is a functional workbench for creators.",
  community: "Build a social feed — avatar-driven posts, real-time reactions, threaded conversations, and a layout that puts people first.",
  discover: "Build a browse-and-filter experience — search bar, smart filters, card grid with images, and a layout designed for scanning and comparing.",
  mission: "Build a project tracking interface — kanban columns, status badges, task cards with assignees and priorities, and a clear sense of what's moving.",
  freestyle: "Build a flexible, multi-purpose interface — mix of cards, lists, data, and content blocks. Every pattern coexists equally. Adapt the layout to whatever the content needs.",
};

export function getPreviewPalette(isDark, themeOverride) {
  const base = isDark ? {
    bg: "#0f1219",
    card: "#1a1e2e",
    surface: "#141824",
    text: "#e5e7eb",
    muted: "#9ca3af",
    dim: "#4b5563",
    border: "#2d3348",
    borderLight: "#232840",
    accent: "#818cf8",
    accentBg: "#1e2040",
    green: "#4ade80", greenBg: "#0c2a1a",
    red: "#f87171", redBg: "#2a0f0f",
    amber: "#fbbf24", amberBg: "#2a2008",
    blue: "#60a5fa", blueBg: "#0f1a2e",
    pink: "#f472b6", pinkBg: "#2a0f20",
    orange: "#fb923c", orangeBg: "#2a1808",
    gradA: "#1a1e30", gradB: "#1a2030",
    tagBg: "rgba(255,255,255,0.06)",
    inputBg: "#1a1e2e", inputBorder: "#2d3348",
  } : {
    bg: "#ffffff",
    card: "#f9fafb",
    surface: "#f3f4f6",
    text: "#111827",
    muted: "#6b7280",
    dim: "#9ca3af",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    accent: "#6366f1",
    accentBg: "#eef2ff",
    green: "#16a34a", greenBg: "#dcfce7",
    red: "#dc2626", redBg: "#fef2f2",
    amber: "#d97706", amberBg: "#fef9c3",
    blue: "#0284c7", blueBg: "#e0f2fe",
    pink: "#db2777", pinkBg: "#fce7f3",
    orange: "#ea580c", orangeBg: "#fff7ed",
    gradA: "#eef2ff", gradB: "#fdf4ff",
    tagBg: "#f3f4f6",
    inputBg: "#fff", inputBorder: "#e5e7eb",
  };

  if (!themeOverride) return base;

  const tv = themeOverride.preview;
  return {
    ...base,
    bg: tv.bg,
    card: tv.card,
    text: tv.text,
    muted: tv.text + "90",
    dim: tv.text + "40",
    accent: tv.accent,
    accentBg: tv.accent + "18",
    secondary: tv.secondary || tv.accent,
    surface: tv.card,
    inputBg: tv.card,
    border: tv.text + "15",
    borderLight: tv.text + "0a",
    inputBorder: tv.text + "15",
    gradA: tv.card,
    gradB: tv.bg,
    tagBg: tv.text + "0a",
  };
}
