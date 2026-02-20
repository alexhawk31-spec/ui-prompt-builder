import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════ */

const THEMES = [
  {
    id: "dark-luxury",
    name: "Dark Luxury",
    preview: { bg: "#0B0F19", card: "#1a1f2e", accent: "#C9A84C", text: "#F0EDE6" },
    desc: "Deep darks, gold accents, glassmorphism",
    subOptions: {
      accentVariants: [
        { id: "gold", name: "Gold", color: "#C9A84C" },
        { id: "rose-gold", name: "Rose Gold", color: "#B76E79" },
        { id: "silver", name: "Silver", color: "#A8B2BD" },
        { id: "copper", name: "Copper", color: "#B87333" },
      ],
      glassIntensity: [
        { id: "subtle", name: "Subtle Glass", desc: "Light frosted backdrop" },
        { id: "heavy", name: "Heavy Glass", desc: "Strong blur, visible layers" },
        { id: "solid", name: "Solid Cards", desc: "No glass, opaque surfaces" },
      ],
    },
  },
  {
    id: "light-clean",
    name: "Light & Clean",
    preview: { bg: "#FAF9F6", card: "#FFFFFF", accent: "#2D7D8E", text: "#2C3E50" },
    desc: "Warm backgrounds, teal accents, professional",
    subOptions: {
      accentVariants: [
        { id: "teal", name: "Teal", color: "#2D7D8E" },
        { id: "blue", name: "Ocean Blue", color: "#3498DB" },
        { id: "green", name: "Sage Green", color: "#7FB069" },
        { id: "purple", name: "Soft Purple", color: "#8E44AD" },
      ],
      cardStyle: [
        { id: "flat", name: "Flat", desc: "Clean borders, no shadow" },
        { id: "elevated", name: "Elevated", desc: "Subtle shadow, lifted feel" },
        { id: "bordered", name: "Bordered", desc: "Color-coded left borders" },
      ],
    },
  },
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    preview: { bg: "#0a0a1a", card: "#12122a", accent: "#00f5d4", text: "#e0e0ff" },
    desc: "Electric neons on dark, cyberpunk energy",
    subOptions: {
      accentVariants: [
        { id: "mint", name: "Electric Mint", color: "#00f5d4" },
        { id: "magenta", name: "Hot Magenta", color: "#ff00ff" },
        { id: "cyan", name: "Laser Cyan", color: "#00e5ff" },
        { id: "lime", name: "Toxic Lime", color: "#b8ff00" },
      ],
      effects: [
        { id: "scanlines", name: "Scan Lines", desc: "CRT overlay effect" },
        { id: "glow", name: "Neon Glow", desc: "Glowing borders and text" },
        { id: "clean-neon", name: "Clean Neon", desc: "Neon palette, no effects" },
      ],
    },
  },
  {
    id: "earth-organic",
    name: "Earth & Organic",
    preview: { bg: "#f5f0e8", card: "#fffdf7", accent: "#6b8f71", text: "#3d3229" },
    desc: "Natural tones, soft greens, warm and grounded",
    subOptions: {
      accentVariants: [
        { id: "forest", name: "Forest", color: "#6b8f71" },
        { id: "terracotta", name: "Terracotta", color: "#c4704b" },
        { id: "sand", name: "Sand Gold", color: "#c9a96e" },
        { id: "slate", name: "Cool Slate", color: "#708090" },
      ],
      texture: [
        { id: "paper", name: "Paper", desc: "Subtle paper-like grain" },
        { id: "linen", name: "Linen", desc: "Woven texture overlay" },
        { id: "smooth", name: "Smooth", desc: "Clean, no texture" },
      ],
    },
  },
  {
    id: "bold-editorial",
    name: "Bold Editorial",
    preview: { bg: "#ffffff", card: "#f8f8f8", accent: "#e63946", text: "#1d1d1d" },
    desc: "High contrast, strong typography, magazine-inspired",
    subOptions: {
      accentVariants: [
        { id: "red", name: "Classic Red", color: "#e63946" },
        { id: "blue", name: "Ink Blue", color: "#1d3557" },
        { id: "black", name: "All Black", color: "#1d1d1d" },
        { id: "coral", name: "Bright Coral", color: "#FF6B6B" },
      ],
      typographyWeight: [
        { id: "heavy", name: "Heavy", desc: "Bold headlines, dramatic contrast" },
        { id: "balanced", name: "Balanced", desc: "Medium weight throughout" },
        { id: "delicate", name: "Delicate", desc: "Thin type, elegant spacing" },
      ],
    },
  },
  {
    id: "midnight-gradient",
    name: "Midnight Gradient",
    preview: { bg: "#1a1a2e", card: "#16213e", accent: "#e94560", text: "#eaeaea" },
    desc: "Deep blues and purples, vivid pops, immersive",
    subOptions: {
      accentVariants: [
        { id: "hot-pink", name: "Hot Pink", color: "#e94560" },
        { id: "electric-blue", name: "Electric Blue", color: "#4361ee" },
        { id: "amber", name: "Warm Amber", color: "#f4a261" },
        { id: "violet", name: "Violet", color: "#9b5de5" },
      ],
      gradientDirection: [
        { id: "diagonal", name: "Diagonal", desc: "135deg gradient flow" },
        { id: "radial", name: "Radial", desc: "Center-outward gradient" },
        { id: "horizontal", name: "Horizontal", desc: "Left-to-right gradient" },
      ],
    },
  },
];

const MOODS = [
  { id: "professional", name: "Professional", icon: "briefcase", desc: "Clean, structured, enterprise-ready",
    subOptions: [
      { id: "corporate", name: "Corporate", desc: "Formal, data-first" },
      { id: "startup", name: "Modern Startup", desc: "Clean but approachable" },
      { id: "consulting", name: "Consulting", desc: "Polished, authoritative" },
    ],
  },
  { id: "playful", name: "Playful & Fun", icon: "sparkles", desc: "Gamified, animated, engaging",
    subOptions: [
      { id: "gamified", name: "Gamified", desc: "Points, badges, progress bars" },
      { id: "whimsical", name: "Whimsical", desc: "Bouncy, colorful, delightful" },
      { id: "retro", name: "Retro Fun", desc: "Pixel art, 8-bit energy" },
    ],
  },
  { id: "minimal", name: "Minimal", icon: "minus", desc: "Less is more, whitespace-forward",
    subOptions: [
      { id: "zen", name: "Zen", desc: "Maximum whitespace, whisper-quiet" },
      { id: "swiss", name: "Swiss Style", desc: "Grid-perfect, typographic" },
      { id: "japanese", name: "Japanese Minimal", desc: "Wabi-sabi, asymmetric balance" },
    ],
  },
  { id: "data-heavy", name: "Data-Dense", icon: "chart", desc: "Dashboards, metrics, information-rich",
    subOptions: [
      { id: "ops-center", name: "Ops Center", desc: "Real-time monitoring, dark theme" },
      { id: "analytics", name: "Analytics", desc: "Charts, tables, filterable" },
      { id: "executive", name: "Executive View", desc: "High-level KPIs, clean" },
    ],
  },
  { id: "immersive", name: "Immersive", icon: "layers", desc: "Full-screen, experience-driven",
    subOptions: [
      { id: "cinematic", name: "Cinematic", desc: "Full-bleed, dramatic reveals" },
      { id: "interactive", name: "Interactive Story", desc: "Scroll-driven narrative" },
      { id: "spatial", name: "Spatial", desc: "3D-inspired depth layers" },
    ],
  },
];

const COMPONENTS = [
  { id: "cards", name: "Cards", icon: "\u25a1",
    subOptions: [
      { id: "stat-card", name: "Stat Cards", desc: "Big number + label + status" },
      { id: "content-card", name: "Content Cards", desc: "Image, title, description" },
      { id: "action-card", name: "Action Cards", desc: "Clickable, CTA-driven" },
      { id: "profile-card", name: "Profile Cards", desc: "Avatar, name, details" },
    ],
  },
  { id: "tables", name: "Tables", icon: "\u25a6",
    subOptions: [
      { id: "data-table", name: "Data Table", desc: "Sortable, filterable rows" },
      { id: "comparison", name: "Comparison", desc: "Side-by-side feature grid" },
      { id: "timeline-table", name: "Schedule", desc: "Time-based row layout" },
    ],
  },
  { id: "charts", name: "Charts", icon: "\u25d0",
    subOptions: [
      { id: "line", name: "Line Charts", desc: "Trends over time" },
      { id: "bar", name: "Bar Charts", desc: "Category comparison" },
      { id: "donut", name: "Donut/Pie", desc: "Part-of-whole breakdown" },
      { id: "area", name: "Area Charts", desc: "Volume and fill" },
    ],
  },
  { id: "forms", name: "Forms", icon: "\u2610",
    subOptions: [
      { id: "input-fields", name: "Input Fields", desc: "Text, number, date" },
      { id: "selectors", name: "Selectors", desc: "Dropdowns, toggles, radios" },
      { id: "multi-step", name: "Multi-Step", desc: "Wizard / step-by-step" },
    ],
  },
  { id: "modals", name: "Modals", icon: "\u25fb",
    subOptions: [
      { id: "dialog", name: "Dialog", desc: "Confirmation, alert" },
      { id: "drawer", name: "Drawer", desc: "Slide-in side panel" },
      { id: "fullscreen-modal", name: "Full Screen", desc: "Overlay takeover" },
    ],
  },
  { id: "nav", name: "Navigation", icon: "\u2261",
    subOptions: [
      { id: "top-bar", name: "Top Bar", desc: "Horizontal, fixed header" },
      { id: "sidebar-nav", name: "Sidebar", desc: "Vertical, collapsible" },
      { id: "tabs-nav", name: "Tabs", desc: "Segmented content switching" },
      { id: "breadcrumb", name: "Breadcrumbs", desc: "Hierarchical path" },
    ],
  },
  { id: "hero", name: "Hero Section", icon: "\u25a3",
    subOptions: [
      { id: "split-hero", name: "Split", desc: "Text left, visual right" },
      { id: "centered-hero", name: "Centered", desc: "Full-width centered" },
      { id: "video-hero", name: "Video BG", desc: "Background video or animation" },
    ],
  },
  { id: "timeline", name: "Timeline", icon: "\u2502",
    subOptions: [
      { id: "vertical-tl", name: "Vertical", desc: "Top-to-bottom flow" },
      { id: "horizontal-tl", name: "Horizontal", desc: "Left-to-right scroll" },
      { id: "alternating", name: "Alternating", desc: "Zigzag left/right" },
    ],
  },
  { id: "maps", name: "Maps & Geo", icon: "\u25ce",
    subOptions: [
      { id: "interactive-map", name: "Interactive Map", desc: "Pins, tooltips, zoom" },
      { id: "heatmap", name: "Heat Map", desc: "Density visualization" },
      { id: "route-map", name: "Route Map", desc: "Path + waypoints" },
    ],
  },
  { id: "feed", name: "Activity Feed", icon: "\u25bc",
    subOptions: [
      { id: "social-feed", name: "Social Style", desc: "Posts, likes, comments" },
      { id: "log-feed", name: "Event Log", desc: "Timestamped entries" },
      { id: "notification-feed", name: "Notifications", desc: "Alert-style items" },
    ],
  },
];

const ANIMATIONS = [
  { id: "none", name: "None", desc: "Static, no motion" },
  { id: "subtle", name: "Subtle", desc: "Fade-ins, soft hover states" },
  { id: "smooth", name: "Smooth", desc: "Transitions, slide-ins, micro-interactions" },
  { id: "dynamic", name: "Dynamic", desc: "Staggered reveals, parallax, particle effects" },
];

const LAYOUTS = [
  { id: "single-column", name: "Single Column", desc: "Content stacked vertically" },
  { id: "two-column", name: "Two Column", desc: "Side-by-side content areas" },
  { id: "sidebar-main", name: "Sidebar + Main", desc: "Nav sidebar with main content" },
  { id: "dashboard-grid", name: "Dashboard Grid", desc: "Multi-card grid layout" },
  { id: "full-screen", name: "Full Screen", desc: "Edge-to-edge immersive" },
  { id: "split-screen", name: "Split Screen", desc: "50/50 or 60/40 horizontal split" },
];

const BORDER_STYLES = [
  { id: "rounded", name: "Rounded", val: "16px" },
  { id: "soft", name: "Soft", val: "8px" },
  { id: "sharp", name: "Sharp", val: "0px" },
  { id: "pill", name: "Pill", val: "999px" },
];

const AWS_GUIDELINES = {
  colors: "Use AWS Orange (#FF9900) as primary brand accent. AWS Dark (#232F3E) for dark backgrounds. AWS Squid Ink (#232F3E) for text on light backgrounds.",
  font: "Font family: 'Amazon Ember Display', 'Amazon Ember', system-ui, sans-serif. Use 'JetBrains Mono' for code/data values.",
  spacing: "Follow 8px spacing grid (8, 16, 24, 32, 48). Cards use 24px internal padding. Sections separated by 32-48px.",
  components: "Cards should have left-border color coding for categorization. Use eyebrow labels (uppercase, 0.75rem, monospace, letter-spacing 0.1em) above headlines. Data values use monospace font.",
  patterns: "Glassmorphism with backdrop-blur(20px) and semi-transparent backgrounds. Neumorphic shadows on interactive elements. Gradient hero headers. Status indicators use green (#00C853), yellow (#FFD700), red (#FF3B5C).",
  icons: "Use Lucide React icons — never emojis. Consistent 20px sizing for inline, 24px for standalone.",
};

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    sparkles: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />,
    minus: <line x1="5" y1="12" x2="19" y2="12" />,
    chart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    chevronUp: <polyline points="18 15 12 9 6 15" />,
    chevronRight: <polyline points="9 18 15 12 9 6" />,
    wand: <><path d="M15 4V2" /><path d="M15 16v-2" /><path d="M8 9h2" /><path d="M20 9h2" /><path d="M17.8 11.8L19 13" /><path d="M15 9h0" /><path d="M17.8 6.2L19 5" /><path d="m3 21 9-9" /><path d="M12.2 6.2L11 5" /></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>,
    loader: <><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    refresh: <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>,
    notPicky: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

/* ═══════════════════════════════════════════
   PROMPT GENERATOR
   ═══════════════════════════════════════════ */

function generatePrompt(config) {
  const { theme, themeSubSelections, mood, moodSub, components, componentSubs, animation, layout, borderStyle, customNotes, appName, appDescription, awsGuidelines } = config;

  const t = THEMES.find((x) => x.id === theme);
  const m = MOODS.find((x) => x.id === mood);
  const a = ANIMATIONS.find((x) => x.id === animation);
  const l = LAYOUTS.find((x) => x.id === layout);
  const b = BORDER_STYLES.find((x) => x.id === borderStyle);
  const selectedComps = COMPONENTS.filter((c) => components.includes(c.id));

  let p = `As a principal UX designer, create a premium, polished UI`;
  if (appName) p += ` for "${appName}"`;
  if (appDescription) p += `.\n\nApp Description: ${appDescription}`;
  p += `\n\nHere are the design specifications:\n\n`;

  p += `## Visual Theme\n`;
  p += `Use a ${t?.name || "dark luxury"} theme. ${t?.desc || ""}.\n`;
  p += `Primary background: ${t?.preview.bg}, card/surface: ${t?.preview.card}, accent: ${t?.preview.accent}, text: ${t?.preview.text}.\n`;
  if (themeSubSelections && Object.keys(themeSubSelections).length > 0) {
    const subs = Object.entries(themeSubSelections);
    for (const [category, value] of subs) {
      if (value === "not-picky") continue;
      const catOptions = t?.subOptions?.[category];
      if (catOptions) {
        const selected = catOptions.find((o) => o.id === value);
        if (selected) {
          if (selected.color) p += `Accent color preference: ${selected.name} (${selected.color}).\n`;
          else p += `${category.replace(/([A-Z])/g, " $1").trim()}: ${selected.name} — ${selected.desc}.\n`;
        }
      }
    }
  }
  p += `\n`;

  p += `## Mood & Feel\n`;
  p += `Overall feel: ${m?.name || "professional"} — ${m?.desc || ""}.\n`;
  if (moodSub && moodSub !== "not-picky") {
    const sub = m?.subOptions?.find((s) => s.id === moodSub);
    if (sub) p += `Specifically a "${sub.name}" vibe: ${sub.desc}.\n`;
  }
  p += `\n`;

  p += `## Layout\n`;
  p += `Use a ${l?.name || "dashboard grid"} layout${l?.desc ? ` (${l.desc})` : ""}.\n\n`;

  p += `## Components\n`;
  if (selectedComps.length > 0) {
    for (const comp of selectedComps) {
      const subs = componentSubs?.[comp.id];
      if (subs && subs.length > 0 && !subs.includes("not-picky")) {
        const subNames = comp.subOptions
          .filter((s) => subs.includes(s.id))
          .map((s) => `${s.name} (${s.desc})`)
          .join(", ");
        p += `- **${comp.name}**: ${subNames}\n`;
      } else {
        p += `- **${comp.name}**\n`;
      }
    }
    p += `\n`;
  }

  p += `## Border Radius\n`;
  p += `Use ${b?.name || "rounded"} corners (${b?.val || "16px"}) throughout.\n\n`;

  p += `## Animation Level\n`;
  p += `${a?.name || "Smooth"}: ${a?.desc || "transitions and micro-interactions"}.\n`;
  if (animation === "dynamic") p += `Include staggered entrance animations, hover scale effects, particle backgrounds, and smooth page transitions using Framer Motion.\n`;
  else if (animation === "smooth") p += `Include fade-in animations on mount, subtle hover transitions, and smooth state changes.\n`;
  else if (animation === "subtle") p += `Keep animations minimal — soft opacity transitions and gentle hover states only.\n`;
  p += `\n`;

  if (awsGuidelines) {
    p += `## AWS Design Guidelines (Enabled)\n`;
    p += `Follow AWS branding conventions:\n`;
    p += `- ${AWS_GUIDELINES.colors}\n`;
    p += `- ${AWS_GUIDELINES.font}\n`;
    p += `- ${AWS_GUIDELINES.spacing}\n`;
    p += `- ${AWS_GUIDELINES.components}\n`;
    p += `- ${AWS_GUIDELINES.patterns}\n`;
    p += `- ${AWS_GUIDELINES.icons}\n\n`;
  }

  p += `## Design Principles\n`;
  p += `- Create a premium feel with glassmorphism (subtle backdrop-blur with semi-transparent backgrounds)\n`;
  p += `- Strong visual hierarchy with font size contrast\n`;
  p += `- Use accent color sparingly for CTAs and key data\n`;
  p += `- Generous padding and breathing room\n`;
  p += `- No emojis — use Lucide React icons\n`;
  if (!awsGuidelines) p += `- Use a distinctive, modern typeface (not Inter/Arial/Roboto)\n`;

  if (customNotes) p += `\n## Additional Notes\n${customNotes}\n`;

  return p;
}

/* ═══════════════════════════════════════════
   PARTICLES BACKGROUND
   ═══════════════════════════════════════════ */

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.25 + 0.03,
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ═══════════════════════════════════════════
   COLLAPSIBLE SECTION
   ═══════════════════════════════════════════ */

function Section({ title, subtitle, step, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      marginBottom: 20,
      background: "rgba(26,31,46,0.55)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: 16,
      border: "1px solid rgba(201,168,76,0.1)",
      overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 22px", background: "none", border: "none", cursor: "pointer", color: "#F0EDE6",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg, #C9A84C, #a8893a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#0B0F19", flexShrink: 0,
          }}>{step}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: "rgba(240,237,230,0.45)", marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        <Icon name={open ? "chevronUp" : "chevronDown"} size={16} color="rgba(201,168,76,0.5)" />
      </button>
      <div style={{
        maxHeight: open ? 3000 : 0, opacity: open ? 1 : 0, overflow: "hidden",
        transition: "max-height 0.4s ease, opacity 0.3s ease",
        padding: open ? "0 22px 22px" : "0 22px 0",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EXPANDABLE OPTION CARD
   ═══════════════════════════════════════════ */

function ExpandableOption({ selected, onSelect, label, desc, preview, subOptions, subValue, onSubChange, icon }) {
  const isSelected = selected;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    onSelect();
    if (subOptions && subOptions.length > 0) setExpanded(true);
  };

  return (
    <div style={{
      borderRadius: 12,
      border: isSelected ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
      background: isSelected ? "rgba(201,168,76,0.06)" : "rgba(0,0,0,0.2)",
      transition: "all 0.2s", overflow: "hidden",
    }}>
      <button onClick={handleClick} style={{
        width: "100%", padding: 14, background: "none", border: "none",
        cursor: "pointer", textAlign: "left", color: "#F0EDE6", display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <div style={{ flex: 1 }}>
          {preview && (
            <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
              {Object.values(preview).map((c, i) => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          )}
          {icon && <span style={{ color: isSelected ? "#C9A84C" : "rgba(240,237,230,0.4)", marginBottom: 6, display: "block" }}><Icon name={icon} size={18} /></span>}
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{label}</div>
          <div style={{ fontSize: 11, color: "rgba(240,237,230,0.4)", lineHeight: 1.3 }}>{desc}</div>
        </div>
        {isSelected && subOptions && (
          <span style={{ color: "rgba(201,168,76,0.5)", marginTop: 2, flexShrink: 0 }}>
            <Icon name={expanded ? "chevronUp" : "chevronDown"} size={14} />
          </span>
        )}
      </button>

      {isSelected && expanded && subOptions && (
        <div style={{
          padding: "0 14px 14px",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(240,237,230,0.35)", margin: "10px 0 8px", }}>
            Get specific or skip
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button
              onClick={() => onSubChange("not-picky")}
              style={{
                padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500, fontFamily: "inherit",
                border: subValue === "not-picky" ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                background: subValue === "not-picky" ? "rgba(201,168,76,0.12)" : "rgba(0,0,0,0.2)",
                color: subValue === "not-picky" ? "#C9A84C" : "rgba(240,237,230,0.5)",
                cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <Icon name="notPicky" size={12} /> Not picky
            </button>
            {subOptions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSubChange(sub.id)}
                style={{
                  padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 500, fontFamily: "inherit",
                  border: subValue === sub.id ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                  background: subValue === sub.id ? "rgba(201,168,76,0.12)" : "rgba(0,0,0,0.2)",
                  color: subValue === sub.id ? "#C9A84C" : "rgba(240,237,230,0.5)",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                title={sub.desc}
              >
                {sub.color && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: sub.color, marginRight: 4 }} />}
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COMPONENT SELECTOR WITH SUB-OPTIONS
   ═══════════════════════════════════════════ */

function ComponentSelector({ comp, isSelected, onToggle, subs, onSubChange }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      borderRadius: 10, overflow: "hidden",
      border: isSelected ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
      background: isSelected ? "rgba(201,168,76,0.06)" : "rgba(0,0,0,0.2)",
      transition: "all 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => { onToggle(); if (!isSelected) setExpanded(true); }}
          style={{
            flex: 1, padding: "10px 14px", background: "none", border: "none",
            cursor: "pointer", color: isSelected ? "#C9A84C" : "rgba(240,237,230,0.5)",
            fontSize: 12, fontWeight: 500, fontFamily: "inherit", textAlign: "left",
            display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 15 }}>{comp.icon}</span>
          {comp.name}
        </button>
        {isSelected && comp.subOptions && (
          <button onClick={() => setExpanded(!expanded)} style={{
            padding: "8px 10px", background: "none", border: "none", cursor: "pointer",
            color: "rgba(201,168,76,0.4)",
          }}>
            <Icon name={expanded ? "chevronUp" : "chevronDown"} size={12} />
          </button>
        )}
      </div>
      {isSelected && expanded && comp.subOptions && (
        <div style={{ padding: "0 12px 12px", borderTop: "1px solid rgba(201,168,76,0.06)" }}>
          <div style={{ fontSize: 10, color: "rgba(240,237,230,0.3)", margin: "8px 0 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Specifics</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            <button
              onClick={() => onSubChange(comp.id, ["not-picky"])}
              style={{
                padding: "5px 10px", borderRadius: 999, fontSize: 10, fontWeight: 500, fontFamily: "inherit",
                border: subs?.includes("not-picky") ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                background: subs?.includes("not-picky") ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.15)",
                color: subs?.includes("not-picky") ? "#C9A84C" : "rgba(240,237,230,0.45)",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 3,
              }}
            >
              <Icon name="notPicky" size={10} /> Not picky
            </button>
            {comp.subOptions.map((sub) => {
              const active = subs?.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    if (subs?.includes("not-picky")) {
                      onSubChange(comp.id, [sub.id]);
                    } else if (active) {
                      onSubChange(comp.id, (subs || []).filter((s) => s !== sub.id));
                    } else {
                      onSubChange(comp.id, [...(subs || []), sub.id]);
                    }
                  }}
                  style={{
                    padding: "5px 10px", borderRadius: 999, fontSize: 10, fontWeight: 500, fontFamily: "inherit",
                    border: active ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                    background: active ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.15)",
                    color: active ? "#C9A84C" : "rgba(240,237,230,0.45)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                  title={sub.desc}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export default function UIPromptBuilder() {
  const [appDescription, setAppDescription] = useState("");
  const [appName, setAppName] = useState("");
  const [nameOptions, setNameOptions] = useState([]);
  const [loadingNames, setLoadingNames] = useState(false);
  const [nameError, setNameError] = useState("");

  const [theme, setTheme] = useState("dark-luxury");
  const [themeSubSelections, setThemeSubSelections] = useState({});
  const [mood, setMood] = useState("professional");
  const [moodSub, setMoodSub] = useState("");
  const [components, setComponents] = useState(["cards", "nav"]);
  const [componentSubs, setComponentSubs] = useState({});
  const [animation, setAnimation] = useState("smooth");
  const [layout, setLayout] = useState("dashboard-grid");
  const [borderStyle, setBorderStyle] = useState("rounded");
  const [customNotes, setCustomNotes] = useState("");
  const [awsGuidelines, setAwsGuidelines] = useState(true);

  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const toggleComponent = (id) => {
    setComponents((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const updateComponentSubs = (compId, subs) => {
    setComponentSubs((prev) => ({ ...prev, [compId]: subs }));
  };

  const updateThemeSub = (category, value) => {
    setThemeSubSelections((prev) => ({ ...prev, [category]: value }));
  };

  const generateNames = async () => {
    if (!appDescription.trim()) return;
    setLoadingNames(true);
    setNameError("");
    setNameOptions([]);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `I'm building an app. Here's what it does:\n\n"${appDescription}"\n\nGenerate exactly 5 creative, memorable app name options. Names should be:\n- Short (1-3 words)\n- Fun and catchy but still professional\n- Mix of clever/punny and clean/serious options\n- Not generic\n\nRespond ONLY with a JSON array of objects, each with "name" (the app name) and "vibe" (2-4 word description of the feeling). No markdown, no backticks, no explanation. Just the JSON array. Example format: [{"name":"AppName","vibe":"short description"}]`
          }],
        }),
      });

      const data = await response.json();
      const text = data.content?.map((c) => c.text || "").join("") || "";
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setNameOptions(parsed);
    } catch (err) {
      console.error("Name generation error:", err);
      setNameError("Couldn't generate names — you can still type one manually.");
      setNameOptions([
        { name: "Vibe Forge", vibe: "creative energy" },
        { name: "PixelCraft", vibe: "precision building" },
        { name: "LaunchPad", vibe: "ready for takeoff" },
        { name: "NeonFrame", vibe: "glowing structure" },
        { name: "BuildFlow", vibe: "smooth creation" },
      ]);
    } finally {
      setLoadingNames(false);
    }
  };

  const prompt = generatePrompt({
    theme, themeSubSelections, mood, moodSub,
    components, componentSubs, animation, layout, borderStyle,
    customNotes, appName, appDescription, awsGuidelines,
  });

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  const selectedTheme = THEMES.find((t) => t.id === theme);

  return (
    <div style={{
      minHeight: "100vh", background: "#080b14",
      backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(45,125,142,0.03) 0%, transparent 60%)",
      color: "#F0EDE6", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(201,168,76,0.3); color: #fff; }
        textarea:focus, input:focus { outline: none; border-color: rgba(201,168,76,0.35) !important; }
        @keyframes fadeInUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <ParticleCanvas />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "56px 24px 32px", animation: "fadeInUp 0.5s ease" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999,
          background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.18)",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18,
        }}>
          <Icon name="wand" size={16} />
          <span>UI Prompt Builder</span>
        </div>
        <h1 style={{
          fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10,
          background: "linear-gradient(135deg, #F0EDE6 0%, #C9A84C 50%, #F0EDE6 100%)", backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 6s ease infinite",
        }}>
          Design Your Vibe. Generate Your Prompt.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(240,237,230,0.5)", maxWidth: 500, margin: "0 auto", lineHeight: 1.5 }}>
          Configure your ideal UI, get a ready-to-paste prompt for Claude Code, Kiro, or any AI coding tool.
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "0 20px 80px", animation: "fadeInUp 0.7s ease" }}>

        <Section title="What Are You Building?" subtitle="Describe your idea — AI will suggest some names" step="1">
          <textarea
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
            placeholder="e.g. A dashboard that tracks my team's demo pipeline..."
            rows={3}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.12)", background: "rgba(0,0,0,0.3)",
              color: "#F0EDE6", fontSize: 14, fontFamily: "inherit", resize: "vertical", lineHeight: 1.5,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
            <button
              onClick={generateNames}
              disabled={!appDescription.trim() || loadingNames}
              style={{
                padding: "10px 18px", borderRadius: 10, border: "none",
                background: appDescription.trim() ? "linear-gradient(135deg, #C9A84C, #a8893a)" : "rgba(255,255,255,0.06)",
                color: appDescription.trim() ? "#0B0F19" : "rgba(240,237,230,0.3)",
                fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: appDescription.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                opacity: loadingNames ? 0.7 : 1,
              }}
            >
              {loadingNames ? (
                <span style={{ animation: "spin 1s linear infinite", display: "inline-flex" }}><Icon name="loader" size={16} /></span>
              ) : (
                <Icon name="send" size={16} />
              )}
              {loadingNames ? "Thinking..." : "Generate Name Ideas"}
            </button>
            <span style={{ fontSize: 11, color: "rgba(240,237,230,0.3)" }}>or type your own below</span>
          </div>

          {nameOptions.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(240,237,230,0.35)", marginBottom: 8 }}>
                Pick a name or type your own
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {nameOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setAppName(opt.name)}
                    style={{
                      padding: "8px 14px", borderRadius: 10,
                      border: appName === opt.name ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                      background: appName === opt.name ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.25)",
                      color: appName === opt.name ? "#C9A84C" : "rgba(240,237,230,0.6)",
                      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", textAlign: "left",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{opt.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(240,237,230,0.35)", marginTop: 2 }}>{opt.vibe}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {nameError && <div style={{ fontSize: 12, color: "rgba(201,168,76,0.6)", marginTop: 8 }}>{nameError}</div>}

          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="App name (selected or custom)..."
            style={{
              width: "100%", padding: "12px 16px", borderRadius: 10, marginTop: 12,
              border: "1px solid rgba(201,168,76,0.12)", background: "rgba(0,0,0,0.3)",
              color: "#F0EDE6", fontSize: 14, fontFamily: "inherit",
            }}
          />
        </Section>

        <Section title="Color Theme" subtitle="Click a theme, then drill into accent colors and style details" step="2">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              const subKeys = t.subOptions ? Object.keys(t.subOptions) : [];
              return (
                <div key={t.id} style={{
                  borderRadius: 12, overflow: "hidden",
                  border: isSelected ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                  background: isSelected ? "rgba(201,168,76,0.06)" : "rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                }}>
                  <button onClick={() => { setTheme(t.id); setThemeSubSelections({}); }} style={{
                    width: "100%", padding: 14, background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", color: "#F0EDE6",
                  }}>
                    <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
                      {Object.values(t.preview).map((c, i) => (
                        <div key={i} style={{ width: 20, height: 20, borderRadius: 5, background: c, border: "1px solid rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(240,237,230,0.4)", lineHeight: 1.3 }}>{t.desc}</div>
                  </button>

                  {isSelected && subKeys.length > 0 && (
                    <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(201,168,76,0.06)" }}>
                      {subKeys.map((cat) => {
                        const catLabel = cat.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
                        const opts = t.subOptions[cat];
                        const currentVal = themeSubSelections[cat] || "";
                        return (
                          <div key={cat} style={{ marginTop: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(240,237,230,0.3)", marginBottom: 6 }}>{catLabel}</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                              <button onClick={() => updateThemeSub(cat, "not-picky")} style={{
                                padding: "5px 10px", borderRadius: 999, fontSize: 10, fontWeight: 500, fontFamily: "inherit",
                                border: currentVal === "not-picky" ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                                background: currentVal === "not-picky" ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.15)",
                                color: currentVal === "not-picky" ? "#C9A84C" : "rgba(240,237,230,0.4)",
                                cursor: "pointer", display: "flex", alignItems: "center", gap: 3,
                              }}>
                                <Icon name="notPicky" size={10} /> Not picky
                              </button>
                              {opts.map((opt) => (
                                <button key={opt.id} onClick={() => updateThemeSub(cat, opt.id)} title={opt.desc || ""} style={{
                                  padding: "5px 10px", borderRadius: 999, fontSize: 10, fontWeight: 500, fontFamily: "inherit",
                                  border: currentVal === opt.id ? "1.5px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                                  background: currentVal === opt.id ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.15)",
                                  color: currentVal === opt.id ? "#C9A84C" : "rgba(240,237,230,0.4)",
                                  cursor: "pointer", display: "flex", alignItems: "center", gap: 3,
                                }}>
                                  {opt.color && <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: opt.color }} />}
                                  {opt.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Mood & Feel" subtitle="How should this app feel? Click to expand style variants." step="3">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {MOODS.map((m) => (
              <ExpandableOption
                key={m.id}
                selected={mood === m.id}
                onSelect={() => { setMood(m.id); setMoodSub(""); }}
                label={m.name}
                desc={m.desc}
                icon={m.icon}
                subOptions={m.subOptions}
                subValue={moodSub}
                onSubChange={setMoodSub}
              />
            ))}
          </div>
        </Section>

        <Section title="Layout" subtitle="Overall page structure" step="4">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {LAYOUTS.map((l) => (
              <button key={l.id} onClick={() => setLayout(l.id)} title={l.desc} style={{
                padding: "9px 16px", borderRadius: 999, fontSize: 12, fontWeight: 500, fontFamily: "inherit",
                border: layout === l.id ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                background: layout === l.id ? "rgba(201,168,76,0.08)" : "rgba(0,0,0,0.2)",
                color: layout === l.id ? "#C9A84C" : "rgba(240,237,230,0.55)", cursor: "pointer", transition: "all 0.15s",
              }}>
                {l.name}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Components" subtitle="Select what you need, then click the arrow to get more specific" step="5">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8 }}>
            {COMPONENTS.map((c) => (
              <ComponentSelector
                key={c.id}
                comp={c}
                isSelected={components.includes(c.id)}
                onToggle={() => toggleComponent(c.id)}
                subs={componentSubs[c.id]}
                onSubChange={updateComponentSubs}
              />
            ))}
          </div>
        </Section>

        <Section title="Animation Level" subtitle="How much motion?" step="6" defaultOpen={false}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 8 }}>
            {ANIMATIONS.map((a) => (
              <button key={a.id} onClick={() => setAnimation(a.id)} style={{
                padding: 12, borderRadius: 10, textAlign: "left",
                border: animation === a.id ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                background: animation === a.id ? "rgba(201,168,76,0.06)" : "rgba(0,0,0,0.2)",
                color: "#F0EDE6", cursor: "pointer", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "rgba(240,237,230,0.4)", lineHeight: 1.3 }}>{a.desc}</div>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Border Style" subtitle="Corner rounding" step="7" defaultOpen={false}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BORDER_STYLES.map((b) => (
              <button key={b.id} onClick={() => setBorderStyle(b.id)} style={{
                padding: "9px 16px", borderRadius: 999, fontSize: 12, fontWeight: 500, fontFamily: "inherit",
                border: borderStyle === b.id ? "2px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                background: borderStyle === b.id ? "rgba(201,168,76,0.08)" : "rgba(0,0,0,0.2)",
                color: borderStyle === b.id ? "#C9A84C" : "rgba(240,237,230,0.55)", cursor: "pointer", transition: "all 0.15s",
              }}>
                <span style={{
                  display: "inline-block", width: 14, height: 14, border: "2px solid currentColor",
                  borderRadius: b.val, marginRight: 6, verticalAlign: "middle",
                }} />
                {b.name}
              </button>
            ))}
          </div>
        </Section>

        <Section title="AWS Design Guidelines" subtitle="Include AWS branding conventions in the prompt" step="8" defaultOpen={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setAwsGuidelines(!awsGuidelines)} style={{
              width: 48, height: 26, borderRadius: 13, padding: 2,
              background: awsGuidelines ? "linear-gradient(135deg, #C9A84C, #a8893a)" : "rgba(255,255,255,0.1)",
              border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", background: "#fff",
                transform: awsGuidelines ? "translateX(22px)" : "translateX(0)",
                transition: "transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }} />
            </button>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                {awsGuidelines ? "Enabled" : "Disabled"}
              </div>
              <div style={{ fontSize: 11, color: "rgba(240,237,230,0.4)" }}>
                Adds AWS colors, fonts, spacing, and component patterns
              </div>
            </div>
          </div>
          {awsGuidelines && (
            <div style={{
              marginTop: 14, padding: 14, borderRadius: 10,
              background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,153,0,0.15)",
              fontSize: 11, color: "rgba(240,237,230,0.5)", lineHeight: 1.6,
            }}>
              <div style={{ color: "#FF9900", fontWeight: 600, marginBottom: 6, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Preview of injected guidelines</div>
              {Object.entries(AWS_GUIDELINES).map(([key, val]) => (
                <div key={key} style={{ marginBottom: 4 }}>
                  <span style={{ color: "rgba(240,237,230,0.7)", fontWeight: 600, textTransform: "capitalize" }}>{key}:</span> {val}
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Additional Notes" subtitle="Anything else for the AI to know?" step="9" defaultOpen={false}>
          <textarea
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="e.g. Use Recharts for graphs, add a dark/light mode toggle, include a loading skeleton..."
            rows={3}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.12)", background: "rgba(0,0,0,0.3)",
              color: "#F0EDE6", fontSize: 13, fontFamily: "inherit", resize: "vertical", lineHeight: 1.5,
            }}
          />
        </Section>

        <div style={{
          position: "sticky", bottom: 0, zIndex: 10,
          background: "rgba(8,11,20,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          padding: "16px 0", marginTop: 8,
        }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {selectedTheme && Object.entries(selectedTheme.preview).map(([key, color]) => (
              <div key={key} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 10px",
                borderRadius: 999, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: color, border: "1px solid rgba(255,255,255,0.1)" }} />
                <span style={{ fontSize: 10, color: "rgba(240,237,230,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>{color}</span>
              </div>
            ))}
            {awsGuidelines && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6, padding: "4px 10px",
                borderRadius: 999, background: "rgba(255,153,0,0.08)", border: "1px solid rgba(255,153,0,0.2)",
              }}>
                <Icon name="shield" size={10} color="#FF9900" />
                <span style={{ fontSize: 10, color: "#FF9900", fontWeight: 600 }}>AWS</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              style={{
                padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(201,168,76,0.06)", color: "#C9A84C", fontSize: 14, fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <Icon name="chevronRight" size={18} />
              {showPrompt ? "Hide Prompt" : "Generate Prompt"}
            </button>
            <button
              onClick={handleCopy}
              style={{
                padding: "12px 24px", borderRadius: 12, border: "none",
                background: copied ? "linear-gradient(135deg, #2ecc71, #27ae60)" : "linear-gradient(135deg, #C9A84C, #a8893a)",
                color: copied ? "#fff" : "#0B0F19", fontSize: 14, fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <Icon name={copied ? "check" : "copy"} size={18} />
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          </div>

          {showPrompt && (
            <div style={{
              marginTop: 16, padding: 18, borderRadius: 12,
              background: "rgba(0,0,0,0.4)", border: "1px solid rgba(201,168,76,0.1)",
              maxHeight: 400, overflowY: "auto",
            }}>
              <pre style={{
                fontSize: 12, color: "rgba(240,237,230,0.7)", lineHeight: 1.6,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {prompt}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
