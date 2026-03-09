// ═══════════════════════════════════════════════════════════════
// Mode-specific option sets for steps that change per output type.
// App mode uses the existing selector constants.
// Presentation and One Pager get their own simpler option sets.
// ═══════════════════════════════════════════════════════════════

// ── Cards (Presentation) ──
export const PRESENTATION_CARD_OPTIONS = [
  { id: "title-slide", label: "Title Slide", icon: "type", desc: "Opening slide with big headline and subtitle" },
  { id: "section-divider", label: "Section Divider", icon: "minus", desc: "Full-screen section break with centered label" },
  { id: "full-bleed-image", label: "Full-Bleed Image", icon: "film", desc: "Edge-to-edge image with optional overlay text" },
  { id: "chart-data", label: "Chart / Data Slide", icon: "barChart", desc: "Chart or data visualization as the focal point" },
  { id: "quote-highlight", label: "Quote / Highlight", icon: "edit", desc: "Large pull quote or key takeaway" },
  { id: "side-by-side", label: "Side-by-Side", icon: "columns", desc: "Two-column comparison layout" },
  { id: "impact-stat", label: "Impact Stat", icon: "zap", desc: "Single dramatic number, impossible to miss" },
  { id: "cta-takeaway", label: "CTA / Takeaway", icon: "send", desc: "Closing slide with call to action" },
];

// ── Cards (One Pager) ──
export const ONE_PAGER_CARD_OPTIONS = [
  { id: "stat-metric", label: "Stat / Metric Block", icon: "barChart", desc: "Inline metric with label and value" },
  { id: "pull-quote", label: "Pull Quote", icon: "edit", desc: "Highlighted quote or key statement" },
  { id: "callout-box", label: "Callout Box", icon: "info", desc: "Bordered or tinted callout for emphasis" },
  { id: "image-placeholder", label: "Image Placeholder", icon: "film", desc: "Image block with caption" },
  { id: "footnote-citation", label: "Footnote / Citation", icon: "list", desc: "Small reference text block" },
];

// ── Data (Presentation) ──
export const PRESENTATION_DATA_OPTIONS = [
  { id: "oversized-stat", label: "Oversized Single Stat", icon: "zap", desc: "Impossible to miss, dramatic type" },
  { id: "bar-column", label: "Bar / Column Chart", icon: "barChart", desc: "Standard bar or column visualization" },
  { id: "line-chart", label: "Line Chart", icon: "chart", desc: "Trend line over time" },
  { id: "comparison-table", label: "Comparison Table", icon: "list", desc: "Side-by-side data comparison" },
  { id: "progress-bar", label: "Progress / Completion Bar", icon: "minus", desc: "Visual completion indicator" },
  { id: "before-after", label: "Before / After Split", icon: "columns", desc: "Two-state comparison" },
];

// ── Data (One Pager) ──
export const ONE_PAGER_DATA_OPTIONS = [
  { id: "compact-stat", label: "Compact Stat Block", icon: "barChart", desc: "2-4 metrics inline" },
  { id: "mini-table", label: "Mini Table", icon: "list", desc: "Small reference table" },
  { id: "simple-bar", label: "Simple Bar Chart", icon: "chart", desc: "Minimal bar visualization" },
  { id: "comparison-list", label: "Comparison List", icon: "columns", desc: "Side-by-side item comparison" },
];

// ── Navigation (Presentation) — multi-select, grouped ──
export const PRESENTATION_NAV_GROUPS = [
  {
    label: "How you move through slides",
    options: [
      { id: "arrow-keys", label: "Arrow keys", desc: "Keyboard left/right to navigate" },
      { id: "click-anywhere", label: "Click anywhere to advance", desc: "Full slide is clickable" },
      { id: "click-halves", label: "Click left / right halves", desc: "Click direction determines back/forward" },
      { id: "onscreen-arrows", label: "On-screen arrow buttons", desc: "Visible prev/next buttons" },
    ],
  },
  {
    label: "How you orient within the deck",
    options: [
      { id: "slide-counter", label: "Slide counter", desc: 'Small monospace "3 / 7" indicator' },
      { id: "progress-bar", label: "Progress bar", desc: "Thin bar showing deck position" },
      { id: "section-dots", label: "Section dots", desc: "Dot indicators per slide" },
      { id: "slide-overview", label: "Slide overview / thumbnail grid", desc: "Click to jump to any slide" },
      { id: "outline-panel", label: "Collapsible outline panel", desc: "Table of contents, click to jump" },
    ],
  },
];

// ── Navigation (One Pager) — multi-select ──
export const ONE_PAGER_NAV_OPTIONS = [
  { id: "sticky-header", label: "Sticky header with anchor links", desc: "Fixed nav bar with jump links" },
  { id: "back-to-top", label: "Back to top button", desc: "Floating button to scroll up" },
  { id: "section-indicators", label: "Section indicators on scroll", desc: "Visual cue for current section" },
  { id: "none", label: "None (just scroll)", desc: "Pure scrolling, no navigation aids" },
];

// ── Animation (Presentation) ──
export const PRESENTATION_ANIMATION_OPTIONS = [
  { id: "slide-entrance", label: "Slide entrance", desc: "Fade, slide, or scale between slides" },
  { id: "element-build", label: "Element build", desc: "Stagger on entry — title first, then body, then visuals" },
  { id: "chart-animate", label: "Chart / number animate-in", desc: "Bars fill, numbers count up" },
  { id: "none", label: "None (static deck)", desc: "No animation, all content appears instantly" },
];

// ── Prompt text for mode-specific options ──

export const PRESENTATION_CARD_PROMPT_MAP = {
  "title-slide": "Include a title slide layout: large headline (48-72px), subtitle below (18-24px), minimal content, centered composition. This is the opening impression.",
  "section-divider": "Include section divider slides: full-screen background with centered section title (36-48px bold). Use to break the deck into clear chapters.",
  "full-bleed-image": "Include full-bleed image slides: edge-to-edge image with optional text overlay using a dark gradient for legibility. No margins.",
  "chart-data": "Include chart/data slides: chart or data visualization takes 70%+ of slide real estate. Title above, source/note below. Clean axis labels.",
  "quote-highlight": "Include quote/highlight slides: large pull quote (28-36px italic or light weight), attribution below. Generous whitespace around the text.",
  "side-by-side": "Include side-by-side comparison slides: two equal columns with a thin vertical divider. Each column has its own heading and content.",
  "impact-stat": "Include impact stat slides: single dramatic number (80-120px bold), short label below (16-20px). The number IS the slide.",
  "cta-takeaway": "Include CTA/takeaway slides: clear call to action with a button-style element or emphasized next step. This is the closer.",
};

export const ONE_PAGER_CARD_PROMPT_MAP = {
  "stat-metric": "Include stat/metric blocks: inline metric with large value (24-32px bold) and small label (11-12px muted). Arrange 2-4 per row.",
  "pull-quote": "Include pull quotes: highlighted text block with left accent border or background tint. Larger font size than body (18-22px).",
  "callout-box": "Include callout boxes: bordered or tinted background section for emphasis. Icon + text format, clearly distinguished from body.",
  "image-placeholder": "Include image placeholder blocks: responsive image with optional caption below. Rounded corners, subtle border.",
  "footnote-citation": "Include footnote/citation blocks: small reference text (10-11px) at section or page bottom. Muted color, compact.",
};

export const PRESENTATION_DATA_PROMPT_MAP = {
  "oversized-stat": "Display data as oversized single stats: one number per slide at 80-120px, dramatic type weight. Label below at 18-20px. Impossible to miss.",
  "bar-column": "Include bar/column charts: clean axis labels, accent fill on bars, value labels on top. Chart takes majority of slide area.",
  "line-chart": "Include line charts: smooth curves with dot markers at data points. Subtle grid, clean axis labels. Show trend clearly.",
  "comparison-table": "Include comparison tables: 2-4 columns, clear headers, alternating rows or subtle dividers. Highlight the winning/key column.",
  "progress-bar": "Include progress/completion bars: horizontal bar at 100% width, filled portion in accent color. Percentage label alongside.",
  "before-after": "Include before/after splits: two-state comparison side by side or stacked. Clear labels, visual contrast between states.",
};

export const ONE_PAGER_DATA_PROMPT_MAP = {
  "compact-stat": "Display data as compact stat blocks: 2-4 metrics inline in a row. Each: value (20-24px bold) + label (10-11px). Tight spacing.",
  "mini-table": "Include mini tables: 3-5 rows max, 2-3 columns. Simple borders, compact padding. Reference data, not analysis.",
  "simple-bar": "Include simple bar charts: horizontal bars preferred for scannability. Label + bar + value on each row. Accent fill.",
  "comparison-list": "Include comparison lists: two items side by side with checkmarks or feature rows. Clear visual difference.",
};

export const PRESENTATION_NAV_PROMPT_MAP = {
  "arrow-keys": "Support arrow key navigation (left = previous, right = next) with keyboard event listeners.",
  "click-anywhere": "Allow clicking anywhere on the slide to advance to the next slide.",
  "click-halves": "Split the slide into left/right click zones — clicking the left half goes back, right half goes forward.",
  "onscreen-arrows": "Show on-screen arrow buttons (left/right) at slide edges. Subtle, appear on hover or always visible.",
  "slide-counter": 'Show a small monospace slide counter (e.g., "3 / 7") in the bottom corner. Low opacity, unobtrusive.',
  "progress-bar": "Show a thin progress bar at the top or bottom of the viewport indicating position in the deck.",
  "section-dots": "Show section dot indicators (small circles) for each slide. Current slide dot highlighted in accent color.",
  "slide-overview": "Include a slide overview/thumbnail grid accessible via button or keyboard shortcut. Click any thumbnail to jump to that slide.",
  "outline-panel": "Include a collapsible outline panel (table of contents) that lists slide titles. Click any title to jump to that slide.",
};

export const ONE_PAGER_NAV_PROMPT_MAP = {
  "sticky-header": "Include a sticky header with anchor links that jump to each section. Header stays fixed on scroll, 48-56px height.",
  "back-to-top": 'Include a floating "back to top" button that appears on scroll. Fixed bottom-right, subtle, accent color.',
  "section-indicators": "Include section indicators on scroll — highlight the current section in the nav or show a scroll progress indicator.",
  none: "No navigation aids — pure scrolling experience. Content flows naturally from top to bottom.",
};

export const PRESENTATION_ANIMATION_PROMPT_MAP = {
  "slide-entrance": "Animate slide transitions: use fade, slide-from-right, or scale effects between slides. CSS @keyframes only, under 600ms. No JS animation libraries.",
  "element-build": "Stagger element entrance within each slide: title appears first (0ms), then body text (150ms), then visuals/charts (300ms). CSS @keyframes only, under 600ms each.",
  "chart-animate": "Animate data visualizations on slide entry: bars fill from 0 to value, numbers count up from 0. CSS @keyframes only, under 600ms.",
  none: "Keep the deck completely static — all elements render immediately, no animation.",
};
