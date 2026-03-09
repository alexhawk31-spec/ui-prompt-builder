export const PROJECT_TYPES = [
  {
    id: "keynote",
    name: "The Keynote",
    tagline: "Presentations, decks, and slide-style layouts",
    icon: "play",
    color: "#f59e0b",
    promptContext:
      "This is a presentation or slide-style interface. Prioritize large typography, cinematic pacing, hero sections with big statements, minimal UI chrome, and smooth transitions between content blocks. Think keynote speaker energy — every screen should make a point.",
    previewHints: {
      layout: "full-width sections, minimal nav",
      components: "hero text, big numbers, image blocks, minimal cards",
      density: "spacious",
    },
  },
  {
    id: "storefront",
    name: "The Storefront",
    tagline: "Landing pages, marketing sites, launch pages",
    icon: "send",
    color: "#f472b6",
    promptContext:
      "This is a landing page or marketing site. Prioritize a strong hero section with headline + CTA, feature highlight cards, social proof sections, and clear visual hierarchy guiding the user toward conversion. Bold typography, generous whitespace, and polished micro-interactions.",
    previewHints: {
      layout: "single column, hero + sections",
      components: "hero banner, feature cards, CTA buttons, testimonials",
      density: "spacious",
    },
  },
  {
    id: "number-cruncher",
    name: "Number Cruncher",
    tagline: "Metrics, charts, and walls of data",
    icon: "barChart",
    color: "#16a34a",
    promptContext:
      "This is a data-heavy dashboard or analytics interface. Prioritize stat cards with big numbers, chart components (bar, line, area), data tables, and dense but organized information hierarchy. Clear labels, monospace numbers, and efficient use of space.",
    previewHints: {
      layout: "sidebar nav + main content grid",
      components: "stat cards, charts, tables, filters",
      density: "balanced to dense",
    },
  },
  {
    id: "workbench",
    name: "The Workbench",
    tagline: "Tools, panels, and 'let me build this' energy",
    icon: "hammer",
    color: "#0284c7",
    promptContext:
      "This is a builder tool or workspace interface. Prioritize split-pane layouts, toolbars, property panels, canvas areas, and configuration forms. Functional density with clear tool groupings. Think code editors, design tools, or config dashboards.",
    previewHints: {
      layout: "split panes, toolbars, sidebar panels",
      components: "toolbars, property editors, canvas, tabs",
      density: "compact",
    },
  },
  {
    id: "command-center",
    name: "Command Center",
    tagline: "Status boards, ops panels, blinking lights",
    icon: "radar",
    color: "#dc2626",
    promptContext:
      "This is an operations or monitoring dashboard. Prioritize multi-panel grid layouts, real-time status indicators, alert badges, event logs, and maximum information density. Monospace typography, amber/green/red status colors, and a sense of always-on awareness.",
    previewHints: {
      layout: "multi-panel grid, status bar",
      components: "status indicators, event logs, metric bars, heatmaps",
      density: "dense",
    },
  },
  {
    id: "handbook",
    name: "The Handbook",
    tagline: "Guides, docs, and 'how do I...' moments",
    icon: "compass",
    color: "#6366f1",
    promptContext:
      "This is a documentation or knowledge base interface. Prioritize clean text hierarchy, readable body text, sidebar navigation with section tree, search bar, code blocks, and generous line-height. Content-first — the text IS the product.",
    previewHints: {
      layout: "sidebar nav + content area, table of contents",
      components: "text blocks, code snippets, search, breadcrumbs",
      density: "spacious",
    },
  },
  {
    id: "hangout",
    name: "The Hangout",
    tagline: "Feeds, profiles, and group chats",
    icon: "users",
    color: "#db2777",
    promptContext:
      "This is a social or community interface. Prioritize activity feeds, user avatars, comment threads, reaction buttons, profile cards, and real-time conversation elements. Warm, approachable spacing with clear visual hierarchy for user-generated content.",
    previewHints: {
      layout: "feed-based, profile sidebars",
      components: "feed cards, avatars, comments, reactions, notifications",
      density: "balanced",
    },
  },
  {
    id: "showroom",
    name: "The Showroom",
    tagline: "Browse, filter, and find the thing",
    icon: "search",
    color: "#ea580c",
    promptContext:
      "This is a browse/discover interface. Prioritize a card grid layout, filter sidebar or top bar, search input, thumbnail previews, and pagination or infinite scroll. Visual browsing — users are scanning, not reading.",
    previewHints: {
      layout: "filter sidebar + card grid",
      components: "search bar, filter chips, image cards, grid/list toggle",
      density: "balanced",
    },
  },
  {
    id: "portfolio",
    name: "The Portfolio",
    tagline: "Personal sites, showcases, creative work on display",
    icon: "layers",
    color: "#a855f7",
    promptContext:
      "This is a portfolio or showcase interface. Prioritize large imagery, minimal UI chrome, elegant typography, generous whitespace, and smooth scroll-driven reveals. The work is the hero — everything else gets out of the way.",
    previewHints: {
      layout: "full-width, minimal nav, scroll-driven",
      components: "image galleries, project cards, bio section, contact",
      density: "spacious",
    },
  },
  {
    id: "back-office",
    name: "Back Office",
    tagline: "Admin panels, CRMs, internal tools, settings pages",
    icon: "grid",
    color: "#64748b",
    promptContext:
      "This is an admin panel or internal tool. Prioritize data tables with sorting/filtering, form inputs, sidebar navigation, settings panels, and utilitarian efficiency. Function over form — but still clean and organized.",
    previewHints: {
      layout: "sidebar nav + data tables + forms",
      components: "tables, forms, toggles, breadcrumbs, bulk actions",
      density: "compact",
    },
  },
  {
    id: "main-stage",
    name: "The Main Stage",
    tagline: "Big visuals, narrative flow, mic-drop moments",
    icon: "film",
    color: "#d97706",
    promptContext:
      "This is a narrative or storytelling interface. Prioritize cinematic pacing, big visual moments, scroll-driven storytelling sections, pull quotes, and dramatic typography. Each section should feel like turning a page or advancing a slide.",
    previewHints: {
      layout: "full-width sections, scroll-driven",
      components: "hero sections, stat callouts, image blocks, dividers",
      density: "spacious",
    },
  },
  {
    id: "off-the-pattern",
    name: "Off the Pattern",
    tagline: "No rules — just go",
    icon: "wind",
    color: "#94a3b8",
    promptContext:
      "No specific app type constraints. Apply the selected design settings without any assumptions about layout or component priorities. Full creative freedom.",
    previewHints: {
      layout: "no suggestion",
      components: "no suggestion",
      density: "no suggestion",
    },
  },
];

// Map old purpose IDs to new project type IDs for backward compat
export const PURPOSE_TO_PROJECT = {
  learn: "handbook",
  data: "number-cruncher",
  story: "main-stage",
  builder: "workbench",
  community: "hangout",
  discover: "showroom",
  mission: "command-center",
  freestyle: "off-the-pattern",
};
