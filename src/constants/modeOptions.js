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
  { id: "key-metrics-row", label: "Key Metrics Row", icon: "barChart", desc: "Row of metric cards with bold values" },
  { id: "pull-quote", label: "Pull Quote", icon: "edit", desc: "Oversized quote with attribution" },
  { id: "callout-block", label: "Callout Block", icon: "info", desc: "Accent-tinted block with icon and heading" },
  { id: "two-column-text", label: "Two Column Text", icon: "columns", desc: "Body copy split into two columns" },
  { id: "feature-list", label: "Feature List", icon: "list", desc: "Grid of features with accent dots" },
  { id: "timeline", label: "Timeline", icon: "clock", desc: "Vertical timeline with milestones" },
  { id: "comparison-table", label: "Comparison Table", icon: "grid", desc: "Three-column comparison with highlight" },
  { id: "icon-feature-grid", label: "Icon Feature Grid", icon: "grid", desc: "Three columns with icon tiles" },
  { id: "citations-block", label: "Citations Block", icon: "bookmark", desc: "Numbered footnotes at bottom" },
  { id: "testimonial-card", label: "Testimonial Card", icon: "user", desc: "Quote card with avatar and name" },
  { id: "progress-bars", label: "Progress Bars", icon: "minus", desc: "Stacked bars with percentages" },
  { id: "cta-banner", label: "CTA Banner", icon: "send", desc: "Inline banner with action button" },
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

// ── Navigation (Presentation) — categories with expandable options ──
export const PRES_NAV_CATEGORIES = [
  {
    id: "slide-movement",
    label: "Slide Navigation",
    desc: "How the audience moves between slides.",
    color: "#67e8f9",
    options: [
      { id: "arrow-keys", label: "Arrow Keys", desc: "Keyboard left/right to advance or go back." },
      { id: "click-anywhere", label: "Click to Advance", desc: "Full slide is clickable — tap anywhere to go forward." },
      { id: "click-halves", label: "Click Halves", desc: "Left half goes back, right half goes forward." },
      { id: "onscreen-arrows", label: "On-screen Arrows", desc: "Visible prev/next buttons at slide edges." },
    ],
  },
  {
    id: "progress",
    label: "Progress & Position",
    desc: "Visual cues showing where you are in the deck.",
    color: "#a78bfa",
    options: [
      { id: "slide-counter", label: "Slide Counter", desc: "Small monospace indicator like \"3 / 7\" in a corner." },
      { id: "progress-bar", label: "Progress Bar", desc: "Thin bar at top or bottom showing how far through the deck." },
      { id: "section-dots", label: "Section Dots", desc: "Row of dots per slide — active dot highlighted in accent." },
    ],
  },
  {
    id: "outline",
    label: "Outline & Overview",
    desc: "Ways to see the full deck and jump between slides.",
    color: "#34d399",
    options: [
      { id: "thumbnail-grid", label: "Thumbnail Grid", desc: "Grid of mini slide thumbnails — click any to jump there." },
      { id: "side-outline", label: "Side Outline", desc: "Collapsible panel listing slide titles — click to jump." },
      { id: "floating-toc", label: "Floating TOC", desc: "Hover-reveal table of contents anchored to a corner." },
      { id: "minimap", label: "Minimap Strip", desc: "Thin vertical strip of miniature slides for quick orientation." },
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

// ── Animation (Presentation) — two categories ──
export const PRES_ANIM_CATEGORIES = [
  {
    id: "slide-transition",
    label: "Slide Transitions",
    desc: "How you move between slides.",
    color: "#fbbf24",
    options: [
      { id: "transition-fade", label: "Fade", desc: "Cross-fade between slides — clean and minimal." },
      { id: "transition-slide", label: "Slide", desc: "New slide pushes in from the right, old exits left." },
      { id: "transition-scale", label: "Scale", desc: "New slide scales up from center, old fades out." },
      { id: "transition-none", label: "Cut", desc: "Instant swap — no transition between slides." },
    ],
  },
  {
    id: "element-build",
    label: "Element Builds",
    desc: "How content appears within a slide.",
    color: "#a78bfa",
    options: [
      { id: "build-stagger", label: "Stagger", desc: "Title first, then body, then visuals — one by one." },
      { id: "build-fade-up", label: "Fade Up", desc: "All elements fade in and rise slightly on entry." },
      { id: "build-chart", label: "Chart Animate", desc: "Bars fill, numbers count up from zero." },
      { id: "build-none", label: "Instant", desc: "All content appears immediately — no build animation." },
    ],
  },
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
  "key-metrics-row": 'content-block: "key-metrics-row" — background color, muted monospace uppercase label top-left, three equal surface cards in a row each with large bold value 26–32px weight 900 in rotating accent colors and small muted label below, border and border-radius 8px on each card',
  "pull-quote": 'content-block: "pull-quote" — background color, content vertically centered, 3px accent left border on content block, oversized faded accent quote mark above text low opacity, italic quote text 12–14px line-height 1.6, monospace uppercase attribution in accent color below',
  "callout-block": 'content-block: "callout-block" — background color, accent tint background block with accent border border-radius 10px, small filled accent circle with white ! icon left, bold heading 11px weight 700 right of icon, muted body text below heading line-height 1.6',
  "two-column-text": 'content-block: "two-column-text" — background color, bold section heading top-left 11–13px weight 700, body copy split into two equal columns below, muted text color line-height 1.7, no divider between columns',
  "feature-list": 'content-block: "feature-list" — background color, bold section heading top-left, two-column grid of feature items, each item small filled accent dot left and feature name primary text color right, even vertical spacing between items',
  "timeline": 'content-block: "timeline" — background color, bold section heading top-left, vertical timeline with full-height 1px border line left, filled accent circles as milestone markers, bold date label and muted description right of each marker, final milestone outlined circle to indicate future state',
  "comparison-table": 'content-block: "comparison-table" — background color, bold section heading top-left, three-column table, row labels muted left-aligned, primary column accent color header white text with bold accent values below, competitor column surface color header with muted values, 1px gap between cells',
  "icon-feature-grid": 'content-block: "icon-feature-grid" — background color, bold section heading top-left, three equal columns each with 36px square icon tile border-radius 10px tinted accent background and accent border, bold feature name below 9px weight 700, short muted description below line-height 1.4, each column uses a different accent color',
  "citations-block": 'content-block: "citations-block" — background color, full-width 1px border color horizontal rule, numbered footnotes stacked below, accent monospace number left, muted citation text right line-height 1.5, sits at bottom of document',
  "testimonial-card": 'content-block: "testimonial-card" — background color, centered surface card with border border-radius 12px, italic quote text top primary text color line-height 1.6, avatar circle left accent gradient fill, bold speaker name right, muted title and company below name in smaller text',
  "progress-bars": 'content-block: "progress-bars" — background color, bold section heading top-left, stacked horizontal progress bars, label left and bold percentage right in matching accent color, track surface color 6px height rounded ends, fill cycles through accent colors per bar',
  "cta-banner": 'content-block: "cta-banner" — background color, full-width inline banner accent gradient tint background with accent border border-radius 12px, bold headline left 12–14px weight 800, short muted supporting line below headline, filled accent pill button right-aligned white text weight 700',
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
  // Slide Navigation
  "arrow-keys": "Support arrow key navigation (left = previous, right = next) with keyboard event listeners.",
  "click-anywhere": "Allow clicking anywhere on the slide to advance to the next slide.",
  "click-halves": "Split the slide into left/right click zones — clicking the left half goes back, right half goes forward.",
  "onscreen-arrows": "Show on-screen arrow buttons (left/right) at slide edges. Subtle, appear on hover or always visible.",
  // Progress & Position
  "slide-counter": 'Show a small monospace slide counter (e.g., "3 / 7") in the bottom corner. Low opacity, unobtrusive.',
  "progress-bar": "Show a thin progress bar at the top or bottom of the viewport indicating position in the deck.",
  "section-dots": "Show section dot indicators (small circles) for each slide. Current slide dot highlighted in accent color.",
  // Outline & Overview
  "thumbnail-grid": "Include a slide overview/thumbnail grid accessible via button or keyboard shortcut. Click any thumbnail to jump to that slide.",
  "side-outline": "Include a collapsible side outline panel (table of contents) that lists slide titles. Click any title to jump to that slide. Slide over the content.",
  "floating-toc": "Include a floating table of contents anchored to the bottom-right corner. Hover or click to reveal section list, click any item to jump. Semi-transparent, stays out of the way.",
  "minimap": "Include a minimap strip — a thin vertical column of miniature slide thumbnails fixed to the right edge. Highlights the current slide. Click any to jump.",
};

export const ONE_PAGER_NAV_PROMPT_MAP = {
  "sticky-header": "Include a sticky header with anchor links that jump to each section. Header stays fixed on scroll, 48-56px height.",
  "back-to-top": 'Include a floating "back to top" button that appears on scroll. Fixed bottom-right, subtle, accent color.',
  "section-indicators": "Include section indicators on scroll — highlight the current section in the nav or show a scroll progress indicator.",
  none: "No navigation aids — pure scrolling experience. Content flows naturally from top to bottom.",
};

export const PRESENTATION_ANIMATION_PROMPT_MAP = {
  // Slide transitions
  "transition-fade": "Animate slide transitions with a cross-fade: outgoing slide fades out while incoming fades in. CSS @keyframes only, 400-500ms ease. No JS animation libraries.",
  "transition-slide": "Animate slide transitions with a horizontal slide: new slide pushes in from right, old slide exits left. CSS @keyframes only, 400-500ms ease-out. No JS animation libraries.",
  "transition-scale": "Animate slide transitions with a scale effect: new slide scales up from 90% to 100% while fading in, old slide fades out. CSS @keyframes only, 400-500ms ease. No JS animation libraries.",
  "transition-none": "No slide transition — cut instantly between slides with no animation.",
  // Element builds
  "build-stagger": "Stagger element entrance within each slide: title appears first (0ms), then body text (150ms), then visuals/charts (300ms). CSS @keyframes only, under 500ms each.",
  "build-fade-up": "Animate all elements on slide entry: fade in while translating up 12-16px. Apply to the slide content container. CSS @keyframes only, 400ms ease-out.",
  "build-chart": "Animate data visualizations on slide entry: bars fill from 0 to value width/height, numbers count up from 0 to final value. CSS @keyframes only, under 600ms.",
  "build-none": "No element build animation — all content renders immediately when the slide appears.",
};
