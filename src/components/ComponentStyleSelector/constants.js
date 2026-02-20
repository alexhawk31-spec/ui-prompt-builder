// ═══════════════════════════════════════════════════════════════
// Every style gets its OWN fine-tune dimensions.
// No shared generic knobs — each dimension deepens that
// specific style's character.
// ═══════════════════════════════════════════════════════════════

export const CARD_FINE_TUNE_DIMS = {
  // ── Frosted ──
  frostDepth: {
    label: "Frost Depth",
    desc: "How thick the ice is",
    color: "#67e8f9",
    opts: [
      { id: "breath", label: "Breath", desc: "You just breathed on cold glass — barely visible frost, content almost fully clear" },
      { id: "morning", label: "Morning Window", desc: "Classic frosted glass — you can see shapes and colors behind but not details" },
      { id: "snowstorm", label: "Snowstorm", desc: "Heavy frost — the background becomes abstract color, nothing readable through" },
      { id: "glacier", label: "Glacier", desc: "Nearly opaque ice — the card feels solid but light still glows through the edges" },
    ],
  },
  frostTint: {
    label: "Tint",
    desc: "Color temperature of the frost",
    color: "#a5f3fc",
    opts: [
      { id: "clear", label: "Clear", desc: "Neutral, no color shift — pure transparent glass" },
      { id: "cool", label: "Cool", desc: "Slight blue-white cast — cold winter morning" },
      { id: "warm", label: "Warm", desc: "Subtle warm tint — frosted amber, golden hour through ice" },
      { id: "iridescent", label: "Iridescent", desc: "Subtle rainbow shimmer at edges — soap bubble on glass" },
    ],
  },
  frostEdge: {
    label: "Edge Definition",
    desc: "How the glass meets the world",
    color: "#06b6d4",
    opts: [
      { id: "seamless", label: "Seamless", desc: "No visible border — the frost just fades into the background" },
      { id: "etched", label: "Etched", desc: "Thin white hairline border — like the edge of a glass panel" },
      { id: "beveled", label: "Beveled", desc: "Light catches the edge — subtle inner glow along the border" },
      { id: "framed", label: "Framed", desc: "Thin metallic frame — like glass held in a brushed aluminum bezel" },
    ],
  },
  frostLight: {
    label: "Light Behavior",
    desc: "How light interacts with the surface",
    color: "#22d3ee",
    opts: [
      { id: "ambient", label: "Ambient", desc: "Even, diffused light — no directional highlights" },
      { id: "toplit", label: "Top-Lit", desc: "Subtle gradient lighter at top — natural overhead light" },
      { id: "rimlit", label: "Rim-Lit", desc: "Bright edge glow on top and left — light catching the glass edge" },
      { id: "prismatic", label: "Prismatic", desc: "Light refracts through — subtle color split at card edges" },
    ],
  },

  // ── Blueprint ──
  blueprintZones: {
    label: "Zones",
    desc: "How the card is divided",
    color: "#3b82f6",
    opts: [
      { id: "fluid", label: "Fluid", desc: "Content flows naturally — no explicit zones, just spacing" },
      { id: "header-body", label: "Header + Body", desc: "Two clear zones — a labeled header and a content body, divided by a line" },
      { id: "three-zone", label: "Three Zone", desc: "Header, body, footer — each with clear borders and purpose" },
      { id: "grid", label: "Grid Cells", desc: "Card is a grid of equal cells — like a technical spec sheet" },
    ],
  },
  blueprintNotation: {
    label: "Notation",
    desc: "How technical the labeling feels",
    color: "#60a5fa",
    opts: [
      { id: "none", label: "Clean", desc: "No notation — structured but not technical" },
      { id: "markers", label: "Markers", desc: "Small corner marks and alignment dots at card edges" },
      { id: "labels", label: "Labels", desc: "Small uppercase mono labels above each section — HEADER, METRICS, ACTIONS" },
      { id: "specs", label: "Full Specs", desc: "Dimension annotations, grid coordinates, spacing callouts — full technical drawing" },
    ],
  },
  blueprintPrecision: {
    label: "Precision",
    desc: "How rigid the structure feels",
    color: "#2563eb",
    opts: [
      { id: "relaxed", label: "Relaxed", desc: "Soft dividers, comfortable spacing — structured but not stiff" },
      { id: "standard", label: "Standard", desc: "Clean lines, consistent gaps — organized and professional" },
      { id: "technical", label: "Technical", desc: "Monospace type, tight spacing, data-dense — engineering dashboard" },
      { id: "military", label: "Military", desc: "Extreme precision — zero tolerance gaps, grid-snapped, everything aligned to the pixel" },
    ],
  },
  blueprintInk: {
    label: "Ink",
    desc: "Line and divider style",
    color: "#1d4ed8",
    opts: [
      { id: "pencil", label: "Pencil", desc: "Thin, light gray lines — subtle sketch-like feel" },
      { id: "pen", label: "Pen", desc: "Clean solid lines — technical pen on paper" },
      { id: "dashed", label: "Dashed", desc: "Dashed dividers and borders — draft/WIP aesthetic" },
      { id: "double", label: "Double Line", desc: "Double-stroke borders — formal document / certificate feel" },
    ],
  },

  // ── Float ──
  floatAltitude: {
    label: "Altitude",
    desc: "How high the card floats",
    color: "#818cf8",
    opts: [
      { id: "hovering", label: "Hovering", desc: "Just off the surface — subtle shadow, barely lifted" },
      { id: "floating", label: "Floating", desc: "Clearly above the page — classic elevation with medium shadow" },
      { id: "soaring", label: "Soaring", desc: "High above — large spread shadow, card feels disconnected from background" },
      { id: "orbital", label: "Orbital", desc: "Extreme elevation — massive soft shadow, card feels like it's in space" },
    ],
  },
  floatSurface: {
    label: "Surface",
    desc: "What the card is made of",
    color: "#a78bfa",
    opts: [
      { id: "matte", label: "Matte Paper", desc: "Flat, no sheen — like thick card stock floating in air" },
      { id: "satin", label: "Satin", desc: "Subtle sheen — slight gradient from top to bottom" },
      { id: "glossy", label: "Glossy", desc: "Reflective surface — visible gradient highlight across the top" },
      { id: "mirror", label: "Mirror", desc: "Highly reflective — environment-mapped gradient, metallic feel" },
    ],
  },
  floatLanding: {
    label: "Landing",
    desc: "How the card enters the page",
    color: "#7c3aed",
    opts: [
      { id: "placed", label: "Placed", desc: "Already there — no entrance animation, just elevated" },
      { id: "descend", label: "Descend", desc: "Drops into view from above with a gentle settling bounce" },
      { id: "rise", label: "Rise", desc: "Rises up from the page surface like a platform emerging" },
      { id: "materialize", label: "Materialize", desc: "Fades in at full altitude — appears out of thin air" },
    ],
  },
  floatStack: {
    label: "Stacking",
    desc: "How overlapping cards relate",
    color: "#6366f1",
    opts: [
      { id: "flat", label: "Same Level", desc: "All cards at the same altitude — uniform grid" },
      { id: "tiered", label: "Tiered", desc: "Cards at different heights — hovered card rises above neighbors" },
      { id: "cascading", label: "Cascading", desc: "Each card slightly overlaps the previous — fanned deck effect" },
      { id: "deep-stack", label: "Deep Stack", desc: "Visible depth between layers — parallax-like stacking with distinct shadow per level" },
    ],
  },

  // ── Wireframe ──
  wireStroke: {
    label: "Stroke",
    desc: "The character of the line",
    color: "#94a3b8",
    opts: [
      { id: "whisper", label: "Whisper", desc: "0.5px hairline — barely there, delicate" },
      { id: "standard", label: "Standard", desc: "1px solid — clean technical line" },
      { id: "bold", label: "Bold", desc: "2px stroke — confident, visible from a distance" },
      { id: "heavy", label: "Heavy", desc: "3px+ stroke — thick marker on whiteboard" },
    ],
  },
  wireDetail: {
    label: "Detail Level",
    desc: "How much wireframe annotation",
    color: "#64748b",
    opts: [
      { id: "minimal", label: "Minimal", desc: "Just the outline — nothing inside but content" },
      { id: "corners", label: "Corner Marks", desc: "Small L-shaped marks at corners — registration mark aesthetic" },
      { id: "annotated", label: "Annotated", desc: "Corner marks + dimension lines along edges" },
      { id: "blueprint", label: "Full Blueprint", desc: "Crosshairs, grid dots, measurement callouts — technical drawing" },
    ],
  },
  wireFill: {
    label: "Interior",
    desc: "What's inside the frame",
    color: "#475569",
    opts: [
      { id: "empty", label: "Empty", desc: "Fully transparent — content floats in the void" },
      { id: "hint", label: "Hint", desc: "2-3% background tint — barely visible surface" },
      { id: "hatched", label: "Hatched", desc: "Diagonal line pattern fill — classic wireframe/sketch indicator" },
      { id: "dotgrid", label: "Dot Grid", desc: "Subtle dot grid pattern inside — graph paper feel" },
    ],
  },
  wireStyle: {
    label: "Line Character",
    desc: "How the lines feel",
    color: "#cbd5e1",
    opts: [
      { id: "geometric", label: "Geometric", desc: "Perfect straight lines, sharp corners — CAD precision" },
      { id: "rounded", label: "Rounded", desc: "Soft corners, smooth joins — friendly wireframe" },
      { id: "sketched", label: "Sketched", desc: "Slightly wobbly hand-drawn lines — napkin sketch feel" },
      { id: "dashed", label: "Dashed", desc: "Dashed stroke pattern — work-in-progress / draft aesthetic" },
    ],
  },

  // ── Neon ──
  neonGlow: {
    label: "Glow",
    desc: "How bright the sign burns",
    color: "#c084fc",
    opts: [
      { id: "ember", label: "Ember", desc: "Dim glow — like a neon sign that's been on for years, slightly faded" },
      { id: "lit", label: "Lit", desc: "Full brightness — clean, sharp neon at night" },
      { id: "overdriven", label: "Overdriven", desc: "Blown out — glow bleeds wide, edges disappear into light" },
      { id: "plasma", label: "Plasma", desc: "Extreme energy — double glow rings, halo around the entire card" },
    ],
  },
  neonFlicker: {
    label: "Behavior",
    desc: "How the light acts",
    color: "#a78bfa",
    opts: [
      { id: "steady", label: "Steady", desc: "Rock solid — constant glow, no animation" },
      { id: "breathe", label: "Breathe", desc: "Slow pulse — glow intensity rises and falls gently" },
      { id: "flicker", label: "Flicker", desc: "Occasional stutter — random subtle brightness dips like old neon" },
      { id: "surge", label: "Surge", desc: "Power surge on hover — glow snaps to maximum then settles" },
    ],
  },
  neonAtmosphere: {
    label: "Atmosphere",
    desc: "What surrounds the glow",
    color: "#8b5cf6",
    opts: [
      { id: "clean", label: "Clean", desc: "Dark background, no haze — clinical neon" },
      { id: "hazy", label: "Hazy", desc: "Subtle fog around the glow — like neon in rain" },
      { id: "smoky", label: "Smoky", desc: "Dark gradient pooling beneath — nightclub ambiance" },
      { id: "electric", label: "Electric", desc: "Background crackles with faint grid lines — Tron/matrix feel" },
    ],
  },
  neonEdge: {
    label: "Edge Treatment",
    desc: "How the glow meets the card",
    color: "#7c3aed",
    opts: [
      { id: "soft-glow", label: "Soft Glow", desc: "Glow fades smoothly from the edge outward" },
      { id: "sharp-line", label: "Sharp Line", desc: "Bright 1px border with glow behind it — crisp neon tube" },
      { id: "double-ring", label: "Double Ring", desc: "Two concentric glow rings — outer halo + inner bright line" },
      { id: "leak", label: "Color Leak", desc: "Glow seeps into the card from the edges — bleeds inward" },
    ],
  },

  // ── Soft Clay ──
  clayDepth: {
    label: "Imprint",
    desc: "How deep the surface pushes",
    color: "#fbbf24",
    opts: [
      { id: "shallow", label: "Shallow", desc: "Subtle raise — you can barely feel the edge" },
      { id: "medium", label: "Medium", desc: "Clear raised surface — obvious but not dramatic" },
      { id: "deep", label: "Deep", desc: "Strong push — card really pops out from the surface" },
      { id: "extreme", label: "Extreme", desc: "Maximum depth — feels like you could grab the edge and pull it off" },
    ],
  },
  clayMaterial: {
    label: "Material",
    desc: "What you're molding",
    color: "#f59e0b",
    opts: [
      { id: "porcelain", label: "Porcelain", desc: "Smooth, cool, precise — like a ceramic tile" },
      { id: "clay", label: "Clay", desc: "Warm, slightly textured — handmade pottery feel" },
      { id: "rubber", label: "Rubber", desc: "Soft and bouncy — buttons feel pushable, surfaces flex" },
      { id: "silicone", label: "Silicone", desc: "Smooth and squishy — modern tech hardware feel" },
    ],
  },
  clayInset: {
    label: "Insets",
    desc: "How sunken areas feel",
    color: "#d97706",
    opts: [
      { id: "none", label: "None", desc: "No inset areas — everything is raised or flat" },
      { id: "gentle", label: "Gentle", desc: "Subtle depressions for metric areas — barely concave" },
      { id: "pressed", label: "Pressed", desc: "Clear thumbprint dips — input fields and data areas sit below the surface" },
      { id: "stamped", label: "Stamped", desc: "Deep insets — like text stamped into metal, sharp-edged depressions" },
    ],
  },
  clayFinish: {
    label: "Finish",
    desc: "Surface polish level",
    color: "#eab308",
    opts: [
      { id: "matte", label: "Matte", desc: "No sheen — flat, chalky surface like unglazed pottery" },
      { id: "satin", label: "Satin", desc: "Soft sheen — like lightly glazed ceramic" },
      { id: "smooth", label: "Smooth", desc: "Visible sheen gradient — polished stone feel" },
      { id: "wet", label: "Wet Clay", desc: "High sheen — like fresh, just-molded wet clay catching light" },
    ],
  },

  // ── Raw ──
  rawAggression: {
    label: "Aggression",
    desc: "How brutalist it gets",
    color: "#f87171",
    opts: [
      { id: "restrained", label: "Restrained", desc: "Clean but sharp — squared-off modernism, not full brutalist" },
      { id: "assertive", label: "Assertive", desc: "Thick borders, heavy type — clearly making a statement" },
      { id: "brutal", label: "Brutal", desc: "Maximum weight — massive borders, oversized headers, aggressive spacing" },
      { id: "hostile", label: "Hostile", desc: "Intentionally uncomfortable — inverted colors, clashing weights, confrontational" },
    ],
  },
  rawOffset: {
    label: "Offset",
    desc: "Hard shadow positioning",
    color: "#ef4444",
    opts: [
      { id: "tight", label: "Tight", desc: "2px offset — subtle depth, mostly structural" },
      { id: "standard", label: "Standard", desc: "4px offset — classic brutalist shadow" },
      { id: "wide", label: "Wide", desc: "8px offset — dramatic, poster-like depth" },
      { id: "massive", label: "Massive", desc: "12px+ offset — the shadow IS a design element" },
    ],
  },
  rawTexture: {
    label: "Texture",
    desc: "Surface treatment",
    color: "#dc2626",
    opts: [
      { id: "clean", label: "Clean", desc: "Flat solid color — pure, industrial surfaces" },
      { id: "grain", label: "Grain", desc: "Subtle noise texture overlay — concrete wall feel" },
      { id: "stripe", label: "Striped", desc: "Horizontal or diagonal stripes — industrial hazard tape / construction" },
      { id: "stencil", label: "Stencil", desc: "Text and labels look spray-painted / stenciled — urban industrial" },
    ],
  },
  rawType: {
    label: "Typography",
    desc: "How the text hits",
    color: "#b91c1c",
    opts: [
      { id: "mono", label: "Mono", desc: "Monospace everything — terminal-native, technical" },
      { id: "condensed", label: "Condensed", desc: "Tall, narrow, dense headlines — newspaper / protest poster" },
      { id: "black", label: "Black Weight", desc: "Ultra-bold 900-weight headers — text as architecture" },
      { id: "mixed", label: "Mixed", desc: "Combine sizes aggressively — 48px next to 10px, intentional hierarchy clash" },
    ],
  },

  // ── Watercolor ──
  waterSaturation: {
    label: "Saturation",
    desc: "How much pigment in the water",
    color: "#fb923c",
    opts: [
      { id: "tint", label: "Tint", desc: "Barely there — 5% accent wash, like tea staining paper" },
      { id: "wash", label: "Wash", desc: "Clear color — 10-15% accent, visible but soft" },
      { id: "saturated", label: "Saturated", desc: "Rich color — 20-30% accent, bold but still watercolor" },
      { id: "vivid", label: "Vivid", desc: "Deep pigment — 40%+ accent, approaching paint territory" },
    ],
  },
  waterSpread: {
    label: "Spread",
    desc: "How the color moves across the surface",
    color: "#f97316",
    opts: [
      { id: "contained", label: "Contained", desc: "Color stays in one corner — like a drop of paint that hasn't spread yet" },
      { id: "bleed", label: "Bleed", desc: "Color flows from one corner to center — classic watercolor gradient" },
      { id: "flow", label: "Flow", desc: "Color moves across the full card — diagonal wash from corner to corner" },
      { id: "splash", label: "Splash", desc: "Multiple color pools meeting — organic, unpredictable edges" },
    ],
  },
  waterPaper: {
    label: "Paper",
    desc: "What the color sits on",
    color: "#ea580c",
    opts: [
      { id: "smooth", label: "Smooth", desc: "Clean digital surface — gradient is perfectly smooth" },
      { id: "textured", label: "Textured", desc: "Slight paper grain — gradients have subtle variation" },
      { id: "canvas", label: "Canvas", desc: "Visible weave texture — fine arts feel" },
      { id: "rough", label: "Rough", desc: "Heavy paper texture — color pools in the valleys" },
    ],
  },
  waterBlend: {
    label: "Color Mixing",
    desc: "How many colors are in the wash",
    color: "#c2410c",
    opts: [
      { id: "mono", label: "Mono", desc: "Single accent color — one pigment in the water" },
      { id: "duo", label: "Duo", desc: "Accent + secondary blend — two colors meeting and mixing" },
      { id: "analogous", label: "Analogous", desc: "Accent + neighboring hues — warm or cool color family" },
      { id: "rainbow", label: "Rainbow", desc: "Multiple distinct colors — each card is its own painting" },
    ],
  },

  // ── Shared: Accent override ──
  accent: {
    label: "Accent",
    desc: "Color shift for card elements",
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

// ── Prompt text fragments per dimension + option ──
export const CARD_PROMPT_MAP = {
  // Frosted
  frostDepth: {
    breath: "backdrop-filter: blur(6px), background: rgba(255,255,255,0.03) — content almost fully visible through glass",
    morning: "backdrop-filter: blur(16px), background: rgba(255,255,255,0.06) — shapes visible, details obscured",
    snowstorm: "backdrop-filter: blur(28px), background: rgba(255,255,255,0.1) — background becomes abstract color",
    glacier: "backdrop-filter: blur(40px), background: rgba(255,255,255,0.15) — nearly opaque, light glows at edges",
  },
  frostTint: {
    clear: "pure neutral transparency — color-free frost",
    cool: "slight blue-white shift (mix-blend-mode or blue-tinted rgba background) — cold morning glass",
    warm: "subtle amber/warm tint — golden hour light through frosted glass",
    iridescent: "rainbow gradient shimmer at card edges using a subtle linear-gradient overlay at 3-5% opacity",
  },
  frostEdge: {
    seamless: "borderless — the frosted surface fades seamlessly into the background",
    etched: "1px solid rgba(255,255,255,0.12) — thin etched-glass edge",
    beveled: "1px border + inner box-shadow: inset 0 1px 0 rgba(255,255,255,0.1) — light catches the bevel",
    framed: "1px solid rgba(255,255,255,0.18) with 1px padding gap — glass panel in a thin metallic bezel",
  },
  frostLight: {
    ambient: "even, uniform lighting across the card surface",
    toplit: "subtle linear-gradient from rgba(255,255,255,0.04) at top to transparent at bottom — overhead light",
    rimlit: "box-shadow: inset 1px 1px 0 rgba(255,255,255,0.08) — light catches the top-left edge",
    prismatic: "rainbow gradient at 2% opacity along the top edge — light refracting through glass",
  },

  // Blueprint
  blueprintZones: {
    fluid: "content flows naturally with spacing alone — implicit zones",
    "header-body": "card divided into 2 clear zones with a 1px divider: labeled header and content body",
    "three-zone": "card divided into header, body, footer zones with 1px dividers — each zone has a clear purpose",
    grid: "card interior uses CSS Grid to create equal cells — data spec sheet layout",
  },
  blueprintNotation: {
    none: "clean, structured layout with pure content focus",
    markers: "small L-shaped corner registration marks (4px lines) at card corners",
    labels: "small uppercase monospace labels (8px, 0.1em letter-spacing) above each card section",
    specs: "full technical annotations — dimension measurements, grid coordinates, spacing callouts in small mono text",
  },
  blueprintPrecision: {
    relaxed: "soft dividers (low opacity), 16-20px padding — structured but comfortable",
    standard: "clean 1px lines, consistent 12px gaps — organized and professional",
    technical: "monospace type throughout, 8px padding, dense data — engineering dashboard precision",
    military: "pixel-perfect alignment, 4px grid-snapped spacing, zero visual waste — maximum precision",
  },
  blueprintInk: {
    pencil: "0.5px solid rgba lines — thin, light, sketch-like",
    pen: "1px solid at medium opacity — clean technical pen strokes",
    dashed: "1px dashed borders and dividers — draft/work-in-progress aesthetic",
    double: "double-stroke borders (border-style: double) — formal document / certificate feel",
  },

  // Float
  floatAltitude: {
    hovering: "box-shadow: 0 2px 8px rgba(0,0,0,0.08) — barely lifted off the surface",
    floating: "box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06) — clearly elevated",
    soaring: "box-shadow: 0 16px 48px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08) — high above the page",
    orbital: "box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1) — extreme elevation",
  },
  floatSurface: {
    matte: "solid flat background — consistent matte surface, like thick card stock",
    satin: "subtle top-to-bottom gradient (5% lighter at top) — soft satin sheen",
    glossy: "visible linear-gradient highlight across the upper third — glossy plastic/glass surface",
    mirror: "strong gradient highlight + environment reflection effect — polished metal feel",
  },
  floatLanding: {
    placed: "cards appear already in their elevated position — instant, static placement",
    descend: "animate from translateY(-12px) to rest with a subtle ease-out bounce — dropping into place",
    rise: "animate from translateY(8px) and scale(0.97) to rest — rising up from the page",
    materialize: "fade in at full altitude from opacity: 0 — appearing out of thin air",
  },
  floatStack: {
    flat: "all cards at the same elevation — uniform depth across the grid",
    tiered: "hovered/active card increases elevation (stronger shadow) — rises above neighbors",
    cascading: "cards slightly overlap with increasing z-index — fanned deck effect, 4px offset per card",
    "deep-stack": "cards at visibly different altitudes — parallax-like depth with distinct shadow per level",
  },

  // Wireframe
  wireStroke: {
    whisper: "0.5px stroke — delicate, barely visible border",
    standard: "1px solid border — clean, precise line",
    bold: "2px solid border — confident, clearly visible wireframe",
    heavy: "3px+ solid border — thick marker on whiteboard feel",
  },
  wireDetail: {
    minimal: "border outline only — nothing decorative inside",
    corners: "small L-shaped corner marks (6px lines, 1px stroke) at card corners — registration mark aesthetic",
    annotated: "corner marks + thin dimension lines along card edges",
    blueprint: "crosshair indicators at corners, dot grid background, measurement annotations — full technical wireframe",
  },
  wireFill: {
    empty: "fully transparent background — content floats in empty space",
    hint: "background: rgba(accent, 0.02) — barely visible fill, just enough to define the surface",
    hatched: "CSS repeating-linear-gradient diagonal line pattern at 3% opacity — classic wireframe fill",
    dotgrid: "CSS radial-gradient dot pattern at 5% opacity — graph paper / engineering pad feel",
  },
  wireStyle: {
    geometric: "sharp 0px border-radius corners, straight precise lines — CAD precision",
    rounded: "8-12px border-radius, smooth joins — friendly wireframe",
    sketched: "slight transform rotate(0.3deg) + uneven border-width — hand-drawn sketch feel",
    dashed: "border-style: dashed — work-in-progress draft aesthetic",
  },

  // Neon
  neonGlow: {
    ember: "box-shadow: 0 0 8px accent/15%, 0 0 2px accent/30% — dim, aged neon sign",
    lit: "box-shadow: 0 0 16px accent/30%, 0 0 4px accent/60% — full brightness, clean neon",
    overdriven: "box-shadow: 0 0 32px accent/40%, 0 0 8px accent/70% — blown out, glow bleeds wide",
    plasma: "box-shadow: 0 0 48px accent/50%, 0 0 16px accent/80%, inset 0 0 8px accent/20% — extreme energy halo",
  },
  neonFlicker: {
    steady: "constant glow — rock-solid, unwavering brightness",
    breathe: "CSS animation: subtle opacity pulse between 0.85 and 1 over 3s — slow breathing glow",
    flicker: "CSS animation: random opacity dips to 0.7 at irregular intervals — old neon tube stutter",
    surge: "on hover: glow snaps to 150% intensity then settles to 110% — power surge effect",
  },
  neonAtmosphere: {
    clean: "pure dark background with clean, clinical neon — crisp and sterile",
    hazy: "subtle radial gradient fog (accent/5%) around the card — like neon in rain",
    smoky: "dark gradient pooling beneath the card (rgba(0,0,0,0.3) spread below) — nightclub ambiance",
    electric: "faint CSS grid-line overlay (0.5px accent/8% lines) on the page behind — Tron/matrix grid",
  },
  neonEdge: {
    "soft-glow": "glow fades smoothly from the border outward — soft neon diffusion",
    "sharp-line": "1px solid accent border at full opacity + glow behind — crisp neon tube line",
    "double-ring": "two concentric borders: inner 1px accent/90%, outer glow ring — double neon tube",
    leak: "glow seeps inward from edges — box-shadow: inset 0 0 12px accent/15%",
  },

  // Soft Clay
  clayDepth: {
    shallow: "box-shadow: 3px 3px 6px dark/8%, -3px -3px 6px light/6% — barely raised",
    medium: "box-shadow: 5px 5px 12px dark/12%, -5px -5px 12px light/8% — clear neumorphic raise",
    deep: "box-shadow: 8px 8px 20px dark/16%, -8px -8px 20px light/10% — strong surface push",
    extreme: "box-shadow: 12px 12px 30px dark/20%, -12px -12px 30px light/12% — dramatic depth, grab-able edges",
  },
  clayMaterial: {
    porcelain: "smooth, cool surface — precise border-radius (12px), clean edges, subtle blue-white in the highlight shadow",
    clay: "warm tones — slightly warmer shadow colors, 14-16px border-radius, organic feel",
    rubber: "elastic feel — large 20px+ border-radius, hover scale(1.02) bounce, rounded everything",
    silicone: "smooth tech feel — perfect 16px radius, precise dual shadows, Apple-hardware-inspired",
  },
  clayInset: {
    none: "all surfaces raised or flat — uniform elevation",
    gentle: "metric/data areas: box-shadow: inset 2px 2px 4px dark/6%, inset -2px -2px 4px light/4% — barely concave",
    pressed: "input fields and data areas: inset 4px 4px 8px dark/10%, inset -4px -4px 8px light/6% — clear depression",
    stamped: "deep insets: inset 6px 6px 12px dark/14%, inset -6px -6px 12px light/8% — stamped into surface",
  },
  clayFinish: {
    matte: "flat matte surface — uniform finish, zero gradient highlights",
    satin: "subtle top-to-bottom gradient: 2% lighter at top — soft ceramic glaze",
    smooth: "visible gradient: 5% lighter at top — polished stone feel",
    wet: "strong gradient: 8% lighter at top with concentrated highlight spot — fresh wet clay catching light",
  },

  // Raw
  rawAggression: {
    restrained: "2px borders, bold type (700), 0px radius — sharp modernism with restraint",
    assertive: "3px borders, 800 weight headers, 0px radius, hard 4px offset shadow — making a statement",
    brutal: "4px borders, 900 weight headers, negative letter-spacing, 0px radius — maximum visual weight",
    hostile: "5px+ borders, inverted header (bg: text color, text: bg color), aggressive sizing contrasts — confrontational",
  },
  rawOffset: {
    tight: "box-shadow: 2px 2px 0 currentColor — subtle structural depth",
    standard: "box-shadow: 4px 4px 0 currentColor — classic brutalist shadow",
    wide: "box-shadow: 8px 8px 0 currentColor — dramatic poster-like depth",
    massive: "box-shadow: 12px 12px 0 currentColor — the shadow is itself a design element",
  },
  rawTexture: {
    clean: "flat solid backgrounds — pure, clean industrial surfaces",
    grain: "subtle noise overlay at 3% opacity — concrete/industrial wall feel",
    stripe: "CSS repeating-linear-gradient diagonal stripes at 5% opacity — construction/hazard tape aesthetic",
    stencil: "text-transform: uppercase, letter-spacing: 0.15em, font-weight: 800 — spray-paint stencil look",
  },
  rawType: {
    mono: "font-family: monospace throughout — terminal-native, every character same width",
    condensed: "font-stretch: condensed or narrow font-family — tall, narrow, dense headlines",
    black: "font-weight: 900 for headers, massive line-height: 0.9 — text as architecture",
    mixed: "deliberately mismatched sizes: 48px header next to 10px label — intentional hierarchy clash",
  },

  // Watercolor
  waterSaturation: {
    tint: "accent gradient at 4-6% opacity — barely there, like tea staining paper",
    wash: "accent gradient at 10-15% opacity — visible, soft watercolor wash",
    saturated: "accent gradient at 20-30% opacity — rich, bold color presence",
    vivid: "accent gradient at 35-45% opacity — deep pigment, approaching painted surface",
  },
  waterSpread: {
    contained: "radial-gradient from accent in one corner, 30% radius — single drop of pigment",
    bleed: "radial-gradient from corner to center — color flows halfway across the surface",
    flow: "linear-gradient from one corner to opposite — full diagonal wash",
    splash: "multiple overlapping radial-gradients at different corners — organic meeting of color pools",
  },
  waterPaper: {
    smooth: "clean, smooth gradients — digital watercolor",
    textured: "subtle noise overlay at 2% — slight paper grain through the wash",
    canvas: "visible weave-pattern overlay at 4% — fine arts canvas texture",
    rough: "strong paper texture overlay at 6% — heavy watercolor paper, pigment pools in texture",
  },
  waterBlend: {
    mono: "single accent color — one pigment wash",
    duo: "accent + secondary color gradient blend — two pigments meeting and mixing",
    analogous: "accent + neighboring hues (hue-rotate 30deg variants) — warm or cool color family wash",
    rainbow: "multiple hue-rotated accent variants across the card — each card is its own painting",
  },
  accent: {
    theme: "use the global theme accent color for all card highlights, borders, and accents",
    warm: "shift the accent +25° warmer (toward orange/amber) for card borders, glows, and highlights",
    cool: "shift the accent -25° cooler (toward blue/teal) for card borders, glows, and highlights",
    muted: "desaturate the accent ~40% for softer, more muted card highlights and borders",
    complementary: "use the complementary color (hue +180°) of the theme accent for card highlights and borders",
  },
};

// ── The 8 card styles ──
export const CARD_STYLES = [
  {
    id: "frosted",
    label: "Frosted",
    desc: "Frosted glass — translucent surfaces with blurred color bleeding through",
    icon: "wind",
    color: "#67e8f9",
    dims: ["frostDepth", "frostTint", "frostEdge", "frostLight", "accent"],
    defaults: { frostDepth: "morning", frostTint: "cool", frostEdge: "etched", frostLight: "ambient", accent: "theme" },
    basePrompt: "Style cards with glassmorphic frosted-glass treatment: semi-transparent backgrounds (rgba), backdrop-filter blur, subtle border definition. Cards should feel like a layer hovering over the background, with color bleeding through from behind.",
  },
  {
    id: "blueprint",
    label: "Blueprint",
    desc: "Structured and segmented — every line has a purpose",
    icon: "layout",
    color: "#3b82f6",
    dims: ["blueprintZones", "blueprintNotation", "blueprintPrecision", "blueprintInk", "accent"],
    defaults: { blueprintZones: "header-body", blueprintNotation: "none", blueprintPrecision: "standard", blueprintInk: "pen", accent: "theme" },
    basePrompt: "Style cards with structured, segmented zones — a clear header area, body, and footer separated by divider lines. Pure structure and hierarchy only. Every line has a purpose, like an architect's drawing.",
  },
  {
    id: "float",
    label: "Float",
    desc: "Cards feel physically lifted off the page with layered depth",
    icon: "layers",
    color: "#818cf8",
    dims: ["floatAltitude", "floatSurface", "floatLanding", "floatStack", "accent"],
    defaults: { floatAltitude: "floating", floatSurface: "satin", floatLanding: "placed", floatStack: "tiered", accent: "theme" },
    basePrompt: "Style cards with strong depth and elevation — heavy, layered shadows creating a visible gap between the card and the surface below. Subtle surface gradients reinforce the 3D illusion. Elements on the card may have their own smaller shadows for hierarchy of depth.",
  },
  {
    id: "wireframe",
    label: "Wireframe",
    desc: "All definition comes from the border — sketched, not built",
    icon: "grid",
    color: "#94a3b8",
    dims: ["wireStroke", "wireDetail", "wireFill", "wireStyle", "accent"],
    defaults: { wireStroke: "standard", wireDetail: "corners", wireFill: "hint", wireStyle: "geometric", accent: "theme" },
    basePrompt: "Style cards as outlined shapes — transparent or near-transparent backgrounds with all definition coming from the border. Lightweight, sketched feel. Accent lines, corner markers, and progress bars provide all detail through outlines alone. Line art aesthetic.",
  },
  {
    id: "neon",
    label: "Neon",
    desc: "Glowing edges — accent color bleeds out as colored light",
    icon: "zap",
    color: "#c084fc",
    dims: ["neonGlow", "neonFlicker", "neonAtmosphere", "neonEdge", "accent"],
    defaults: { neonGlow: "lit", neonFlicker: "steady", neonAtmosphere: "hazy", neonEdge: "soft-glow", accent: "theme" },
    basePrompt: "Style cards with neon glow effects — the accent color bleeds out from the edges, casting colored light onto the surrounding space. Borders glow, shadows are tinted, and the whole card feels backlit from inside. Glow intensifies on hover. Dark backgrounds required.",
  },
  {
    id: "soft-clay",
    label: "Soft Clay",
    desc: "Neumorphic — tactile, molded-from-surface, dual-shadow depth",
    icon: "circle",
    color: "#fbbf24",
    dims: ["clayDepth", "clayMaterial", "clayInset", "clayFinish", "accent"],
    defaults: { clayDepth: "medium", clayMaterial: "clay", clayInset: "gentle", clayFinish: "satin", accent: "theme" },
    basePrompt: "Style cards with neumorphic treatment — the card background nearly matches the page, and all definition comes from dual shadows (dark shadow on one side, light highlight on the other). Metric areas are inset (pressed into the surface). Buttons feel like raised nubs. Tactile, molded-from-clay feel.",
  },
  {
    id: "raw",
    label: "Raw",
    desc: "Brutalist — zero radius, thick borders, concrete and steel",
    icon: "minus",
    color: "#f87171",
    dims: ["rawAggression", "rawOffset", "rawTexture", "rawType", "accent"],
    defaults: { rawAggression: "assertive", rawOffset: "standard", rawTexture: "clean", rawType: "black", accent: "theme" },
    basePrompt: "Style cards with brutalist treatment — zero border-radius, thick visible borders, hard offset shadows placed with a ruler. Heavy typography. Loud header bars. Everything is structural and deliberate — concrete and steel where you can see the bolts. Anti-aesthetic aesthetic.",
  },
  {
    id: "watercolor",
    label: "Watercolor",
    desc: "Accent color washes across the surface like pigment on paper",
    icon: "palette",
    color: "#fb923c",
    dims: ["waterSaturation", "waterSpread", "waterPaper", "waterBlend", "accent"],
    defaults: { waterSaturation: "wash", waterSpread: "bleed", waterPaper: "textured", waterBlend: "mono", accent: "theme" },
    basePrompt: "Style cards with watercolor wash — the accent color tints the entire card background as a gradient, strongest in one corner and fading to transparent across the rest. A thin accent stripe along the top edge. Embedded data visualizations feel part of the surface. Warm, rich, organic color application.",
  },
];
