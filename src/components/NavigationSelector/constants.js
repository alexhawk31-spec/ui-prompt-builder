/* ─── Fine-Tune Dimensions ─── */

export const NAV_FINE_TUNE_DIMS = {
  // ── Shared across multiple patterns ──
  activeIndicator: {
    label: "Active Indicator",
    desc: "How the active item is marked",
    color: "#67e8f9",
    opts: [
      { id: "leftBar", label: "Left Bar", desc: "Vertical accent bar on the left edge" },
      { id: "bottomLine", label: "Bottom Line", desc: "Accent underline below the item" },
      { id: "bgFill", label: "BG Fill", desc: "Subtle accent background tint" },
      { id: "pill", label: "Pill", desc: "Rounded pill shape behind the item" },
      { id: "glow", label: "Glow", desc: "Soft accent glow shadow" },
      { id: "boldOnly", label: "Bold Only", desc: "Full opacity and bold weight, no decoration" },
    ],
  },
  icons: {
    label: "Icons",
    desc: "Icon style treatment",
    color: "#7dd3fc",
    opts: [
      { id: "outlined", label: "Outlined", desc: "Stroke-only icons, 1.5px weight" },
      { id: "filled", label: "Filled", desc: "Solid filled icon shapes" },
      { id: "duotone", label: "Duotone", desc: "Two-tone with accent fill and muted stroke" },
      { id: "noIcons", label: "No Icons", desc: "Text labels only, no icons" },
    ],
  },
  density: {
    label: "Density",
    desc: "Spacing between items",
    color: "#a5f3fc",
    opts: [
      { id: "tight", label: "Tight", desc: "Minimal padding, compact layout" },
      { id: "balanced", label: "Balanced", desc: "Standard comfortable spacing" },
      { id: "spacious", label: "Spacious", desc: "Generous padding, airy feel" },
    ],
  },
  hover: {
    label: "Hover",
    desc: "Mouse-over effect on items",
    color: "#22d3ee",
    opts: [
      { id: "none", label: "None", desc: "No hover effect" },
      { id: "bgTint", label: "BG Tint", desc: "Subtle background color on hover" },
      { id: "slideRight", label: "Slide Right", desc: "Content shifts right on hover" },
      { id: "glow", label: "Glow", desc: "Soft accent glow on hover" },
      { id: "underline", label: "Underline", desc: "Accent underline on hover" },
    ],
  },
  interaction: {
    label: "Interaction",
    desc: "Click/tap micro-interaction",
    color: "#06b6d4",
    opts: [
      { id: "static", label: "Static", desc: "No animation on interaction" },
      { id: "hoverLift", label: "Hover Lift", desc: "Slight upward shift on hover" },
      { id: "hoverGlow", label: "Hover Glow", desc: "Accent glow intensifies on hover" },
      { id: "hoverGrow", label: "Hover Grow", desc: "Subtle scale-up on hover" },
    ],
  },
  backdrop: {
    label: "Backdrop",
    desc: "Background treatment behind the overlay",
    color: "#0891b2",
    opts: [
      { id: "blur", label: "Blur", desc: "Frosted glass blur behind the panel" },
      { id: "dim", label: "Dim", desc: "Dark semi-transparent overlay" },
      { id: "pushContent", label: "Push Content", desc: "Page content slides away" },
      { id: "none", label: "None", desc: "No backdrop treatment" },
    ],
  },

  // ── Pattern-specific dimensions ──
  grouping: {
    label: "Grouping",
    desc: "How nav items are organized",
    color: "#67e8f9",
    opts: [
      { id: "flatList", label: "Flat List", desc: "Simple stacked list, no sections" },
      { id: "sections", label: "Sections", desc: "Grouped under category headers" },
      { id: "collapsible", label: "Collapsible", desc: "Accordion sections that expand/collapse" },
    ],
  },
  dividers: {
    label: "Dividers",
    desc: "Lines between nav groups",
    color: "#7dd3fc",
    opts: [
      { id: "none", label: "None", desc: "No divider lines" },
      { id: "hairline", label: "Hairline", desc: "1px subtle separator lines" },
      { id: "spaced", label: "Spaced", desc: "Extra spacing between groups" },
    ],
  },
  alignment: {
    label: "Alignment",
    desc: "How nav links are positioned",
    color: "#67e8f9",
    opts: [
      { id: "left", label: "Left", desc: "Links aligned to the left side" },
      { id: "center", label: "Center", desc: "Links centered in the bar" },
      { id: "spread", label: "Spread", desc: "Links spread across the full width" },
    ],
  },
  sticky: {
    label: "Sticky",
    desc: "Scroll behavior",
    color: "#7dd3fc",
    opts: [
      { id: "sticky", label: "Sticky", desc: "Fixed to top on scroll" },
      { id: "scrollsAway", label: "Scrolls Away", desc: "Scrolls with the page content" },
    ],
  },
  tabStyle: {
    label: "Tab Style",
    desc: "Visual treatment of tab items",
    color: "#67e8f9",
    opts: [
      { id: "underline", label: "Underline", desc: "Active tab has accent bottom bar" },
      { id: "pill", label: "Pill", desc: "Active tab has pill-shaped background" },
      { id: "boxed", label: "Boxed", desc: "Active tab has bordered box background" },
      { id: "fade", label: "Fade", desc: "Inactive tabs are faded, active is full opacity" },
      { id: "lifted", label: "Lifted", desc: "Active tab appears raised/elevated" },
    ],
  },
  pillShape: {
    label: "Pill Shape",
    desc: "Shape of the capsule selectors",
    color: "#67e8f9",
    opts: [
      { id: "rounded", label: "Rounded", desc: "Moderately rounded corners (8-12px)" },
      { id: "fullPill", label: "Full Pill", desc: "Fully rounded ends (border-radius 9999px)" },
      { id: "squircle", label: "Squircle", desc: "iOS-style continuous corners" },
    ],
  },
  separator: {
    label: "Separator",
    desc: "Character between breadcrumb segments",
    color: "#67e8f9",
    opts: [
      { id: "slash", label: "Slash /", desc: "Forward slash separator" },
      { id: "chevron", label: "Chevron \u203a", desc: "Right-pointing chevron" },
      { id: "dot", label: "Dot \u00b7", desc: "Centered dot separator" },
      { id: "arrow", label: "Arrow \u2192", desc: "Right arrow separator" },
    ],
  },
  slideFrom: {
    label: "Slide From",
    desc: "Which edge the drawer appears from",
    color: "#67e8f9",
    opts: [
      { id: "left", label: "Left", desc: "Panel slides in from the left edge" },
      { id: "right", label: "Right", desc: "Panel slides in from the right edge" },
      { id: "bottom", label: "Bottom", desc: "Panel slides up from the bottom" },
    ],
  },

  // ── Shared: Accent override ──
  accent: {
    label: "Accent",
    desc: "Color shift for nav elements",
    color: "#fbbf24",
    opts: [
      { id: "theme", label: "Theme Default", desc: "Use the global theme accent as-is" },
      { id: "warm", label: "Warm Shift", desc: "Rotate hue +25° toward orange/amber tones" },
      { id: "cool", label: "Cool Shift", desc: "Rotate hue -25° toward blue/teal tones" },
      { id: "muted", label: "Muted", desc: "Desaturate the accent ~40% for softer highlights" },
      { id: "complementary", label: "Complementary", desc: "Rotate hue 180° for high-contrast accents" },
    ],
  },
};

/* ─── Prompt Map ─── */

export const NAV_PROMPT_MAP = {
  activeIndicator: {
    leftBar: "3px accent-color left bar, 20px tall, border-radius 0 2px 2px 0",
    bottomLine: "2px accent bottom border below the item",
    bgFill: "accent-tinted background at 8-12% opacity, border-radius 8px",
    pill: "accent pill shape behind the item, border-radius 999px, padding 4px 12px",
    glow: "accent box-shadow glow (0 0 8px accent at 40%), background stays consistent",
    boldOnly: "full opacity + bold weight, typography-only emphasis",
  },
  icons: {
    outlined: "20px outlined stroke icons, 1.5px stroke, muted at 35% opacity, active at full opacity",
    filled: "20px solid filled icons, muted at 30% opacity, active at full accent color",
    duotone: "20px duotone icons — accent fill at 15% with full accent stroke",
    noIcons: "text labels only — all navigation through typography",
  },
  density: {
    tight: "tight spacing, 6px vertical padding per item, 4px gaps",
    balanced: "balanced spacing, 10px vertical padding per item, 8px gaps",
    spacious: "spacious layout, 14px vertical padding per item, 12px gaps",
  },
  hover: {
    none: "static on hover — cursor change only",
    bgTint: "background tint rgba(255,255,255,0.08) on hover, border-radius 8px",
    slideRight: "text and icon slide 4px right on hover, 0.2s ease transition",
    glow: "subtle accent glow on hover (0 0 6px accent at 20%)",
    underline: "accent-colored underline fades in on hover, 0.2s ease",
  },
  interaction: {
    static: "instant state change on click/tap",
    hoverLift: "translateY(-1px) on hover, 0.15s ease, subtle lift effect",
    hoverGlow: "accent box-shadow intensifies on hover, 0.2s ease",
    hoverGrow: "scale(1.03) on hover, 0.15s ease, subtle grow effect",
  },
  backdrop: {
    blur: "backdrop-filter: blur(8px) + dim overlay at 40% black opacity",
    dim: "dark overlay at 35-40% black opacity, direct opacity only",
    pushContent: "page content slides to the side, clean transition",
    none: "panel overlays directly on content",
  },
  grouping: {
    flatList: "simple stacked list — unified, flat layout",
    sections: "grouped under uppercase 10px category headers at 25% opacity",
    collapsible: "accordion sections with expand/collapse, chevron indicator, section header clickable",
  },
  dividers: {
    none: "groups separated by spacing only",
    hairline: "1px dividers at 4% white opacity between sections",
    spaced: "16px extra spacing between groups — whitespace as separator",
  },
  alignment: {
    left: "nav links left-aligned after logo, action buttons right-aligned",
    center: "nav links centered in the bar, logo left, actions right",
    spread: "nav links spread evenly across the full bar width with justify-between",
  },
  sticky: {
    sticky: "position: sticky, top: 0, z-index: 50, stays fixed on scroll",
    scrollsAway: "position: relative, scrolls away with page content",
  },
  tabStyle: {
    underline: "active tab has 2px accent bottom bar, bold text. Inactive tabs 25% opacity, normal weight",
    pill: "active tab has pill-shaped accent background at 15% opacity, bold text. Inactive tabs transparent",
    boxed: "active tab has 1px border, accent-tinted background. Inactive tabs: borderless, muted text",
    fade: "active tab full opacity, bold. Inactive tabs at 20% opacity, fades in on hover",
    lifted: "active tab slightly elevated with box-shadow, background surface. Inactive tabs flat",
  },
  pillShape: {
    rounded: "border-radius 8-12px on each capsule",
    fullPill: "border-radius 9999px on each capsule, 12px horizontal padding",
    squircle: "iOS-style continuous corner radius, 14px with smooth bezier clip",
  },
  separator: {
    slash: "/ forward slash character at 15% opacity between segments",
    chevron: "\u203a chevron character at 15% opacity between segments",
    dot: "\u00b7 centered dot at 15% opacity between segments",
    arrow: "\u2192 right arrow at 15% opacity between segments",
  },
  slideFrom: {
    left: "panel slides in from left edge, width 280px",
    right: "panel slides in from right edge, width 280px",
    bottom: "panel slides up from bottom edge, height 60vh",
  },
  accent: {
    theme: "use the global theme accent color for all nav highlights and active states",
    warm: "shift the accent +25° warmer (toward orange/amber) for nav active indicators and highlights",
    cool: "shift the accent -25° cooler (toward blue/teal) for nav active indicators and highlights",
    muted: "desaturate the accent ~40% for softer, more muted nav highlights",
    complementary: "use the complementary color (hue +180°) of the theme accent for nav active states",
  },
};

/* ─── Nav Patterns ─── */

export const NAV_PATTERNS = [
  {
    id: "rail",
    label: "Rail",
    tagline: "Icons only, out of the way",
    desc: "Narrow icon-only vertical strip for compact navigation",
    icon: "sidebar",
    color: "#67e8f9",
    dims: ["activeIndicator", "icons", "density", "hover", "interaction", "accent"],
    defaults: { activeIndicator: "leftBar", icons: "outlined", density: "balanced", hover: "bgTint", interaction: "static", accent: "theme" },
    basePrompt: "Icon-only vertical nav strip, 48px wide, fixed to the left edge. Stack icons vertically with 8px gap. Tooltips appear on hover to identify each item.",
  },
  {
    id: "shelf",
    label: "Shelf",
    tagline: "Full sidebar, everything visible",
    desc: "Labeled sidebar with icons, text, and section grouping",
    icon: "layout",
    color: "#22d3ee",
    dims: ["activeIndicator", "icons", "density", "hover", "grouping", "dividers", "interaction", "accent"],
    defaults: { activeIndicator: "bgFill", icons: "outlined", density: "balanced", hover: "slideRight", grouping: "sections", dividers: "hairline", interaction: "static", accent: "theme" },
    basePrompt: "Labeled sidebar nav, 240px wide, fixed left, dark surface background. Each item: icon (20px) + text label in a horizontal row.",
  },
  {
    id: "ribbon",
    label: "Ribbon",
    tagline: "Horizontal top bar",
    desc: "Classic horizontal navigation bar across the top",
    icon: "minus",
    color: "#06b6d4",
    dims: ["alignment", "activeIndicator", "density", "sticky", "hover", "interaction", "accent"],
    defaults: { alignment: "center", activeIndicator: "bottomLine", density: "balanced", sticky: "sticky", hover: "underline", interaction: "static", accent: "theme" },
    basePrompt: "Horizontal top nav bar, full width, 56px height. Logo/brand mark left-aligned, nav links in center or left, action buttons right-aligned. Links: 13px font weight 500, 24px horizontal gap.",
  },
  {
    id: "tabs",
    label: "Tabs",
    tagline: "Section switcher",
    desc: "Horizontal tab bar for in-page section switching",
    icon: "grid",
    color: "#0891b2",
    dims: ["tabStyle", "density", "hover", "interaction", "accent"],
    defaults: { tabStyle: "underline", density: "balanced", hover: "bgTint", interaction: "static", accent: "theme" },
    basePrompt: "Horizontal tab bar for in-page section switching. Sits below page header with a 1px bottom border at 6% white.",
  },
  {
    id: "capsules",
    label: "Capsules",
    tagline: "Floating pill selectors",
    desc: "Rounded pill buttons as selectors in a container",
    icon: "circle",
    color: "#67e8f9",
    dims: ["pillShape", "density", "hover", "interaction", "accent"],
    defaults: { pillShape: "fullPill", density: "balanced", hover: "glow", interaction: "static", accent: "theme" },
    basePrompt: "Rounded pill selectors in a horizontal row inside a container. Container: subtle background at 3% white, 1px border at 4% white, full pill border-radius. Active pill: filled with accent color, dark text, shadow at accent 30% opacity. Inactive pills: transparent background, muted text at 30% opacity.",
  },
  {
    id: "breadcrumb",
    label: "Breadcrumb",
    tagline: "Wayfinding trail",
    desc: "Horizontal path showing page hierarchy",
    icon: "chevRight",
    color: "#22d3ee",
    dims: ["separator", "density", "hover", "interaction", "accent"],
    defaults: { separator: "chevron", density: "balanced", hover: "underline", interaction: "static", accent: "theme" },
    basePrompt: "Horizontal breadcrumb trail showing page hierarchy. Parent segments: accent color at 70% opacity, clickable. Current segment (last item): full white, bold weight.",
  },
  {
    id: "spotlight",
    label: "Spotlight",
    tagline: "Command palette, search to jump",
    desc: "Modal search interface triggered by keyboard shortcut",
    icon: "search",
    color: "#06b6d4",
    dims: ["density", "backdrop", "hover", "interaction", "accent"],
    defaults: { density: "balanced", backdrop: "blur", hover: "bgTint", interaction: "static", accent: "theme" },
    basePrompt: "Command palette modal triggered by \u2318K keyboard shortcut. Floating search panel: 480px wide, centered, dark surface background. Border: 1px accent at 25% opacity, border-radius 12px. Shadow: 0 8px 32px rgba(0,0,0,0.4). Search input at top with icon, placeholder text, \u2318K badge. Results list below: first result highlighted with accent tint at 8%. Each result: small icon + label.",
  },
  {
    id: "drawer",
    label: "Drawer",
    tagline: "Slide-out hidden menu",
    desc: "Hidden nav panel that slides in from the edge",
    icon: "menu",
    color: "#0891b2",
    dims: ["slideFrom", "backdrop", "density", "hover", "icons", "interaction", "accent"],
    defaults: { slideFrom: "left", backdrop: "blur", density: "balanced", hover: "slideRight", icons: "outlined", interaction: "static", accent: "theme" },
    basePrompt: "Slide-out nav panel, hidden by default, triggered by hamburger icon. Panel shadow: 4px 0 20px rgba(0,0,0,0.3) on the leading edge. Close button in top right of panel. Nav items: icon + label rows. Transition: panel slides in 0.3s cubic-bezier(0.4, 0, 0.2, 1).",
  },
];
