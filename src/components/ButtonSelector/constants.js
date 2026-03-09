/* ─── Fine-Tune Dimensions ─── */

export const BTN_FINE_TUNE_DIMS = {
  // ── Shared across most styles ──
  size: {
    label: "Size",
    desc: "Button scale and padding",
    color: "#f9a8d4",
    opts: [
      { id: "small", label: "Small", desc: "Compact — 8px 16px padding, 12px font" },
      { id: "medium", label: "Medium", desc: "Standard — 10px 20px padding, 14px font" },
      { id: "large", label: "Large", desc: "Prominent — 14px 28px padding, 16px font" },
    ],
  },
  corners: {
    label: "Corners",
    desc: "Border radius treatment",
    color: "#f472b6",
    opts: [
      { id: "sharp", label: "Sharp", desc: "0px radius — hard geometric edges" },
      { id: "slight", label: "Slight", desc: "4px radius — barely softened" },
      { id: "rounded", label: "Rounded", desc: "8px radius — comfortable, modern default" },
      { id: "soft", label: "Soft", desc: "12px radius — friendly, approachable" },
      { id: "pill", label: "Full Pill", desc: "9999px radius — fully rounded ends" },
    ],
  },
  labelWeight: {
    label: "Label Weight",
    desc: "Font weight of button text",
    color: "#ec4899",
    opts: [
      { id: "regular", label: "Regular", desc: "400 weight — understated, quiet" },
      { id: "semibold", label: "Semibold", desc: "600 weight — balanced default" },
      { id: "bold", label: "Bold", desc: "700 weight — confident, clear" },
      { id: "heavy", label: "Heavy", desc: "800 weight — loud, commanding" },
    ],
  },
  icon: {
    label: "Icon",
    desc: "Icon placement relative to label",
    color: "#f9a8d4",
    opts: [
      { id: "none", label: "No Icon", desc: "Text only — clean and simple" },
      { id: "left", label: "Left", desc: "Icon before the label" },
      { id: "right", label: "Right", desc: "Icon after the label (arrow, chevron)" },
      { id: "iconOnly", label: "Icon Only", desc: "No text — square icon button" },
    ],
  },
  shadow: {
    label: "Shadow",
    desc: "Depth and glow treatment",
    color: "#f472b6",
    opts: [
      { id: "none", label: "None", desc: "Flat — zero shadow" },
      { id: "subtle", label: "Subtle", desc: "Soft shadow — barely lifted" },
      { id: "accentGlow", label: "Accent Glow", desc: "Tinted shadow using the accent color" },
      { id: "hardOffset", label: "Hard Offset", desc: "Solid offset shadow — brutalist/retro" },
    ],
  },
  hover: {
    label: "Hover",
    desc: "Mouse-over effect",
    color: "#ec4899",
    opts: [
      { id: "darken", label: "Darken", desc: "Background darkens 10-15% on hover" },
      { id: "lighten", label: "Lighten", desc: "Background lightens 10-15% on hover" },
      { id: "lift", label: "Lift", desc: "translateY(-2px) + stronger shadow on hover" },
      { id: "grow", label: "Grow", desc: "scale(1.04) on hover — subtle size increase" },
    ],
  },
  press: {
    label: "Press",
    desc: "Active / click-down effect",
    color: "#db2777",
    opts: [
      { id: "sink", label: "Sink", desc: "translateY(1px), shadow shrinks — pushed into surface" },
      { id: "darken", label: "Darken", desc: "Background darkens 20% on press" },
      { id: "shrink", label: "Shrink", desc: "scale(0.97) on press — quick squeeze" },
    ],
  },

  // ── Shared: Accent override ──
  accent: {
    label: "Accent",
    desc: "Color shift for button elements",
    color: "#fbbf24",
    opts: [
      { id: "theme", label: "Theme Default", desc: "Use the global theme accent as-is" },
      { id: "warm", label: "Warm Shift", desc: "Rotate hue +25° toward orange/amber tones" },
      { id: "cool", label: "Cool Shift", desc: "Rotate hue -25° toward blue/teal tones" },
      { id: "muted", label: "Muted", desc: "Desaturate the accent ~40% for softer highlights" },
      { id: "complementary", label: "Complementary", desc: "Rotate hue 180° for high-contrast accents" },
    ],
  },

  // ── Toggle-specific dimensions ──
  segmentCount: {
    label: "Segment Count",
    desc: "How many segments in the toggle",
    color: "#f9a8d4",
    opts: [
      { id: "two", label: "2 Segments", desc: "Binary toggle — On/Off, Light/Dark" },
      { id: "three", label: "3 Segments", desc: "Triple toggle — e.g. Day/Week/Month" },
    ],
  },
  activeFill: {
    label: "Active Fill",
    desc: "How the active segment is marked",
    color: "#f472b6",
    opts: [
      { id: "solid", label: "Solid", desc: "Active segment gets solid accent background" },
      { id: "tinted", label: "Tinted", desc: "Active segment gets accent tint at 15% opacity" },
      { id: "outline", label: "Outline", desc: "Active segment gets accent border, no fill" },
    ],
  },

  // ── Frost-specific ──
  blur: {
    label: "Blur",
    desc: "Glass blur intensity",
    color: "#67e8f9",
    opts: [
      { id: "light", label: "Light", desc: "Subtle 8px blur — barely frosted" },
      { id: "heavy", label: "Heavy", desc: "Thick 20px blur with saturation boost" },
    ],
  },

  // ── Ink-specific ──
  underline: {
    label: "Underline",
    desc: "Underline behavior",
    color: "#94a3b8",
    opts: [
      { id: "hover", label: "On Hover", desc: "Underline appears on hover only" },
      { id: "always", label: "Always", desc: "Underline always visible" },
      { id: "animated", label: "Animated", desc: "Underline slides in from left on hover" },
    ],
  },

  // ── Brick-specific ──
  depth: {
    label: "Depth",
    desc: "3D bottom border thickness",
    color: "#fb923c",
    opts: [
      { id: "shallow", label: "Shallow", desc: "3px bottom border — subtle 3D" },
      { id: "deep", label: "Deep", desc: "5px bottom border — thick pushable depth" },
    ],
  },
};

/* ─── Prompt Map ─── */

export const BTN_PROMPT_MAP = {
  size: {
    small: "compact buttons: padding 8px 16px, font-size 12px, icon 14px",
    medium: "standard buttons: padding 10px 20px, font-size 14px, icon 16px",
    large: "prominent buttons: padding 14px 28px, font-size 16px, icon 18px",
  },
  corners: {
    sharp: "border-radius: 0 — hard geometric edges on all buttons",
    slight: "border-radius: 4px — barely softened corners",
    rounded: "border-radius: 8px — comfortable modern rounding",
    soft: "border-radius: 12px — friendly, approachable corners",
    pill: "border-radius: 9999px — fully rounded pill-shaped buttons",
  },
  labelWeight: {
    regular: "font-weight: 400 — understated, quiet button labels",
    semibold: "font-weight: 600 — balanced, confident button labels",
    bold: "font-weight: 700 — strong, clear button labels",
    heavy: "font-weight: 800 — loud, commanding button labels",
  },
  icon: {
    none: "text labels only — clean, icon-free buttons",
    left: "icon left of label, 6px gap — Lucide icon before text",
    right: "icon right of label, 6px gap — arrow or chevron after text",
    iconOnly: "icon-only buttons — square aspect ratio, centered icon",
  },
  shadow: {
    none: "completely flat buttons — shadow-free surface",
    subtle: "box-shadow: 0 1px 3px rgba(0,0,0,0.12) — barely lifted off surface",
    accentGlow: "box-shadow: 0 2px 12px accent/25% on primary buttons — accent-tinted glow beneath",
    hardOffset: "box-shadow: 3px 3px 0 currentColor on primary — solid offset shadow, brutalist feel",
  },
  hover: {
    darken: "on hover: background darkens 10-15% (filter: brightness(0.88) or darker shade), transition 0.15s",
    lighten: "on hover: background lightens 10-15% (filter: brightness(1.12) or lighter shade), transition 0.15s",
    lift: "on hover: translateY(-2px) + stronger shadow, transition 0.15s ease — lift off the surface",
    grow: "on hover: scale(1.04), transition 0.15s ease — subtle size increase",
  },
  press: {
    sink: "on active: translateY(1px), box-shadow shrinks or disappears — pressed into surface",
    darken: "on active: background darkens 20%, transition 0.1s — quick dark flash",
    shrink: "on active: scale(0.97), transition 0.1s — quick squeeze feedback",
  },
  segmentCount: {
    two: "2-segment toggle control — binary choice (e.g. On/Off, Light/Dark)",
    three: "3-segment toggle control — triple choice (e.g. Day/Week/Month)",
  },
  activeFill: {
    solid: "active toggle segment: solid accent background, white text, smooth sliding indicator",
    tinted: "active toggle segment: accent tint at 15% opacity, accent text, subtle indicator",
    outline: "active toggle segment: accent border, transparent background, accent text — minimal toggle indicator",
  },
  accent: {
    theme: "use the global theme accent color for all button fills, borders, and glows",
    warm: "shift the accent +25° warmer (toward orange/amber) for button fills and hover states",
    cool: "shift the accent -25° cooler (toward blue/teal) for button fills and hover states",
    muted: "desaturate the accent ~40% for softer, more muted button colors",
    complementary: "use the complementary color (hue +180°) of the theme accent for buttons",
  },
  blur: {
    light: "backdrop-filter: blur(8px) — light frosted glass, 60% white/10% black bg",
    heavy: "backdrop-filter: blur(20px) saturate(1.4) — thick frosted glass, 40% white bg, saturated backdrop",
  },
  underline: {
    hover: "text-decoration: underline appears on hover only, underline-offset: 4px",
    always: "text-decoration: underline always visible, underline-offset: 4px, decoration-thickness: 1.5px",
    animated: "underline animates in from left on hover via pseudo-element (width 0→100%, transition 0.2s)",
  },
  depth: {
    shallow: "border-bottom: 3px solid — subtle 3D press depth",
    deep: "border-bottom: 5px solid — thick 3D pushable depth, translateY(4px) + border-bottom: 1px on active",
  },
};

/* ─── Button Styles ─── */

export const BTN_STYLES = [
  {
    id: "stamp",
    label: "Stamp",
    tagline: "Bold and decisive",
    desc: "Solid filled accent background — the classic confident CTA",
    icon: "square",
    color: "#f9a8d4",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", icon: "none", shadow: "subtle", hover: "darken", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with solid accent fill. Primary: full accent background, dark/white text. Secondary: transparent with 1px accent border, accent text. Tertiary: transparent background, accent text only — text-button style. All tiers share the same size, corners, and weight.",
  },
  {
    id: "traced",
    label: "Traced",
    tagline: "Defined by outline",
    desc: "Transparent background with accent border — elegant restraint",
    icon: "square",
    color: "#e879f9",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", icon: "none", shadow: "none", hover: "lighten", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with outline/traced treatment. Primary: transparent background, 1.5px solid accent border, accent text. Secondary: transparent, 1px border at 40% accent opacity, muted text. Tertiary: borderless, accent text only. Hover fills the background at 8% accent opacity.",
  },
  {
    id: "wash",
    label: "Wash",
    tagline: "Soft accent tint",
    desc: "10-15% accent background — soft, low-contrast surfaces",
    icon: "droplet",
    color: "#c084fc",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", icon: "none", shadow: "none", hover: "darken", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with tinted wash treatment. Primary: accent background at 12-15% opacity, accent text. Secondary: accent at 6-8% opacity, muted text. Tertiary: transparent, accent text only. Soft, low-contrast surfaces — always translucent fills. Hover deepens the tint.",
  },
  {
    id: "ombre",
    label: "Ombré",
    tagline: "Gradient premium CTA",
    desc: "Accent-to-secondary gradient — polished, high-end feel",
    icon: "sunrise",
    color: "#a78bfa",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "bold", icon: "right", shadow: "accentGlow", hover: "lift", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with gradient treatment. Primary: linear-gradient from accent to secondary (or hue-rotated accent +30deg), white text. Secondary: solid accent at 10% opacity, accent text. Tertiary: transparent, accent text. Primary hover intensifies the gradient and lifts the shadow.",
  },
  {
    id: "neon",
    label: "Neon",
    tagline: "Backlit and buzzing",
    desc: "Glowing borders and accent glow — electric night-mode energy",
    icon: "zap",
    color: "#818cf8",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "bold", icon: "none", shadow: "accentGlow", hover: "lighten", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with neon glow treatment. Primary: transparent or 5% accent fill, 1px accent border, accent box-shadow glow (0 0 12px accent/30%), accent text. Secondary: dimmer glow (0 0 6px accent/15%), 1px border at 30% opacity. Tertiary: minimal, accent text only. Hover intensifies glow to 50% opacity.",
  },
  {
    id: "slab",
    label: "Slab",
    tagline: "Zero softness",
    desc: "Brutalist buttons — 0px radius, thick borders, hard shadows",
    icon: "minus",
    color: "#f87171",
    dims: ["size", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", labelWeight: "heavy", icon: "none", shadow: "hardOffset", hover: "darken", press: "sink", accent: "theme" },
    basePrompt: "Style buttons with brutalist slab treatment. All buttons have border-radius: 0px — zero softness. Primary: solid accent fill, 2px dark border, hard offset shadow (3px 3px 0). Secondary: transparent, 2px accent border, hard offset shadow. Tertiary: flat, transparent, uppercase text, heavy weight. All text is uppercase, letter-spacing: 0.05em.",
  },
  {
    id: "capsule",
    label: "Capsule",
    tagline: "Smooth and friendly",
    desc: "Full pill radius — soft, approachable, rounded ends",
    icon: "circle",
    color: "#34d399",
    dims: ["size", "labelWeight", "icon", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", labelWeight: "semibold", icon: "left", shadow: "subtle", hover: "grow", press: "shrink", accent: "theme" },
    basePrompt: "Style buttons with full pill/capsule shape. All buttons have border-radius: 9999px — fully rounded ends. Primary: solid accent fill, white/dark text. Secondary: accent at 10% opacity, accent text, pill shape. Tertiary: transparent, accent text, still pill-shaped hit area. Extra horizontal padding (24px+) to emphasize the capsule proportion.",
  },
  {
    id: "toggle",
    label: "Toggle",
    tagline: "Pick a side",
    desc: "Segmented control — grouped options in one container",
    icon: "toggleRight",
    color: "#fbbf24",
    dims: ["size", "corners", "labelWeight", "shadow", "hover", "press", "accent", "segmentCount", "activeFill"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", shadow: "none", hover: "darken", press: "sink", accent: "theme", segmentCount: "two", activeFill: "solid" },
    basePrompt: "Style buttons as segmented toggle controls. Container: subtle background at 4% white, 1px border at 6% white, shared border-radius. Segments sit inside the container separated by 1px dividers. Active segment: filled accent or tinted, with a smooth sliding indicator on transition. Inactive segments: transparent, muted text. This replaces separate Primary/Secondary/Tertiary buttons with a unified selector.",
  },
  {
    id: "frost",
    label: "Frost",
    tagline: "Glass and light",
    desc: "Frosted glass buttons — translucent blur with subtle borders",
    icon: "snowflake",
    color: "#67e8f9",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "hover", "press", "accent", "blur"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", icon: "none", shadow: "subtle", hover: "lighten", press: "sink", accent: "theme", blur: "light" },
    basePrompt: "Style buttons with frosted glass treatment. Primary: backdrop-filter: blur(12px), rgba(255,255,255,0.12) background, 1px solid rgba(255,255,255,0.18) border, white text. Secondary: same blur but rgba(255,255,255,0.06) background, muted text. Tertiary: no blur, transparent, accent text. All glass buttons need a background with some visual texture behind them to make the blur visible.",
  },
  {
    id: "ink",
    label: "Ink",
    tagline: "Quiet and linked",
    desc: "Text-only with underline — minimal, hyperlink-inspired CTAs",
    icon: "underline",
    color: "#94a3b8",
    dims: ["size", "labelWeight", "hover", "press", "accent", "underline"],
    defaults: { size: "medium", labelWeight: "semibold", hover: "darken", press: "sink", accent: "theme", underline: "hover" },
    basePrompt: "Style buttons as text-only link-style CTAs with zero background or border. Primary: accent text, underline on hover (underline-offset: 4px). Secondary: muted text, underline on hover. Tertiary: dimmer muted text, underline on hover. No padding, no border, no background — purely typographic. The underline is the only visual affordance.",
  },
  {
    id: "brick",
    label: "Brick",
    tagline: "Push me down",
    desc: "3D raised buttons — thick bottom border creates a pushable look",
    icon: "box",
    color: "#fb923c",
    dims: ["size", "corners", "labelWeight", "icon", "shadow", "accent", "depth"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "bold", icon: "none", shadow: "none", accent: "theme", depth: "shallow" },
    basePrompt: "Style buttons with 3D raised/pushable treatment. Primary: solid accent fill, thick bottom border (3-5px) in a darker shade of the accent (filter: brightness(0.7)), creates a physical pushable look. On active/press: translateY(2-4px) and reduce bottom border to 1px — the button visually presses down. Secondary: lighter fill, accent-tinted bottom border. Tertiary: transparent, bottom border only. The depth creates satisfying tactile feedback.",
  },
  {
    id: "duo",
    label: "Duo",
    tagline: "Two-tone split",
    desc: "Split button — icon zone + label zone in contrasting fills",
    icon: "columns",
    color: "#e879f9",
    dims: ["size", "corners", "labelWeight", "shadow", "hover", "press", "accent"],
    defaults: { size: "medium", corners: "rounded", labelWeight: "semibold", shadow: "subtle", hover: "darken", press: "sink", accent: "theme" },
    basePrompt: "Style buttons as two-tone split buttons. Each button has two visually distinct zones side by side: an icon zone (narrower, darker or contrasting fill) and a label zone (wider, primary fill). Primary: accent fill on label zone, darker accent on icon zone, 1px divider between them, shared border-radius. Secondary: transparent label zone with accent border, accent-tinted icon zone. Tertiary: transparent both zones, accent text, subtle divider only. The split creates a clear visual hierarchy between the action icon and the label text.",
  },
];
