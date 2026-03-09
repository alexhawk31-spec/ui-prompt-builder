import { useState } from "react";

/* ── Mood Presets v4 ──
   Same base layout (header, stat cards, chart, nav elements)
   rendered through dramatically different design lenses.
   The structure is recognizable — the FEELING is completely different.
   
   Plus: Quick Combo section pairing mood + purpose.
*/

const presets = [
  {
    id: "boardroom",
    name: "Boardroom",
    tagline: "Polished. Poised. Pitch-ready.",
    icon: "briefcase",
    density: "balanced",
    typography: "clean",
    interaction: "smooth",
    embellishment: "minimal",
    promptSnippet: 'Professional, restrained design. Clean sans-serif, balanced whitespace, muted palette with one accent color. No gradients or glow. Enterprise-ready.',
    v: {
      bg: "#0f1219", card: "#181c27", accent: "#6366f1", text: "#e2e0db",
      muted: "rgba(226,224,219,0.3)", dimmer: "rgba(226,224,219,0.15)",
      radius: 10, font: "'DM Sans', sans-serif", headSize: 11, headWeight: 600,
      valSize: 18, valWeight: 700, valFont: "'DM Sans', sans-serif",
      labelSize: 6, labelCase: "uppercase", labelSpacing: "0.08em",
      cardPad: 10, gap: 8, cardCount: 3, barCount: 14, barGap: 3,
      showNav: false, showTabs: true, tabStyle: "pill",
      border: "1px solid rgba(255,255,255,0.06)", shadow: "none",
      glass: false, glow: false, brutalist: false, light: false,
      headText: "Dashboard", chartLabel: "Performance",
      barAccentStart: 11, titleDecor: "",
    },
  },
  {
    id: "hackmode",
    name: "Hack Mode",
    tagline: "Dense. Mono. Zero fluff.",
    icon: "terminal",
    density: "dense",
    typography: "technical",
    interaction: "snappy",
    embellishment: "none",
    promptSnippet: 'Dense, monospace-driven interface. JetBrains Mono everywhere, tight 4-6px spacing, no border-radius, uppercase labels with wide letter-spacing. Terminal aesthetic.',
    v: {
      bg: "#0a0a0a", card: "#111111", accent: "#22c55e", text: "#a3a3a3",
      muted: "rgba(163,163,163,0.4)", dimmer: "rgba(163,163,163,0.15)",
      radius: 0, font: "'JetBrains Mono', monospace", headSize: 9, headWeight: 500,
      valSize: 14, valWeight: 500, valFont: "'JetBrains Mono', monospace",
      labelSize: 5, labelCase: "uppercase", labelSpacing: "0.12em",
      cardPad: 6, gap: 4, cardCount: 4, barCount: 24, barGap: 1,
      showNav: true, showTabs: false, tabStyle: "none",
      border: "1px solid #1a1a1a", shadow: "none",
      glass: false, glow: false, brutalist: false, light: false,
      headText: "> sys_dashboard", chartLabel: "> THROUGHPUT [5m]",
      barAccentStart: 20, titleDecor: "",
    },
  },
  {
    id: "frontpage",
    name: "Front Page",
    tagline: "Serif headlines. Generous whitespace.",
    icon: "type",
    density: "spacious",
    typography: "editorial",
    interaction: "smooth",
    embellishment: "moderate",
    promptSnippet: 'Editorial, magazine-quality design. Georgia or serif headlines (italic), generous padding 20px+, 2-column layouts where appropriate, elegant dividers. Content-first, typography-driven.',
    v: {
      bg: "#faf8f4", card: "#ffffff", accent: "#1a1a2e", text: "#1a1a2e",
      muted: "rgba(26,26,46,0.45)", dimmer: "rgba(26,26,46,0.12)",
      radius: 4, font: "Georgia, serif", headSize: 15, headWeight: 400,
      valSize: 20, valWeight: 400, valFont: "Georgia, serif",
      labelSize: 7, labelCase: "normal", labelSpacing: "0.02em",
      cardPad: 14, gap: 12, cardCount: 3, barCount: 10, barGap: 4,
      showNav: false, showTabs: true, tabStyle: "underline",
      border: "1px solid rgba(0,0,0,0.08)", shadow: "0 1px 3px rgba(0,0,0,0.04)",
      glass: false, glow: false, brutalist: false, light: true,
      headText: "Dashboard", chartLabel: "Monthly Trends",
      barAccentStart: 7, titleDecor: "italic",
    },
  },
  {
    id: "arcade",
    name: "Arcade",
    tagline: "Bouncy. Bold. Full personality.",
    icon: "zap",
    density: "balanced",
    typography: "rounded",
    interaction: "dramatic",
    embellishment: "rich",
    promptSnippet: 'Playful, energetic design. Rounded font (Nunito 800), 16-20px border-radius, bouncy hover animations with scale(1.06), vibrant gradients, glassmorphism cards, progress indicators.',
    v: {
      bg: "#120b20", card: "rgba(255,255,255,0.05)", accent: "#e879f9", text: "#f5f0ff",
      muted: "rgba(245,240,255,0.4)", dimmer: "rgba(245,240,255,0.15)",
      radius: 18, font: "'Nunito', sans-serif", headSize: 12, headWeight: 800,
      valSize: 18, valWeight: 800, valFont: "'Nunito', sans-serif",
      labelSize: 7, labelCase: "normal", labelSpacing: "0",
      cardPad: 10, gap: 8, cardCount: 3, barCount: 12, barGap: 3,
      showNav: false, showTabs: true, tabStyle: "pill",
      border: "1px solid rgba(255,255,255,0.08)", shadow: "0 0 20px rgba(232,121,249,0.1)",
      glass: true, glow: true, brutalist: false, light: false,
      headText: "Dashboard", chartLabel: "Activity",
      barAccentStart: 9, titleDecor: "",
    },
  },
  {
    id: "warroom",
    name: "War Room",
    tagline: "Max density. Real-time everything.",
    icon: "radar",
    density: "dense",
    typography: "technical",
    interaction: "snappy",
    embellishment: "minimal",
    promptSnippet: 'Operations/monitoring density. JetBrains Mono, 3-5px spacing, status indicators, amber/red alert colors, multi-panel grid layout. Designed for information overload.',
    v: {
      bg: "#050a12", card: "#0a1020", accent: "#f59e0b", text: "#94a3b8",
      muted: "rgba(148,163,184,0.4)", dimmer: "rgba(148,163,184,0.15)",
      radius: 2, font: "'JetBrains Mono', monospace", headSize: 8, headWeight: 600,
      valSize: 13, valWeight: 600, valFont: "'JetBrains Mono', monospace",
      labelSize: 5, labelCase: "uppercase", labelSpacing: "0.1em",
      cardPad: 5, gap: 3, cardCount: 4, barCount: 28, barGap: 1,
      showNav: true, showTabs: false, tabStyle: "none",
      border: "1px solid #1a2540", shadow: "none",
      glass: false, glow: false, brutalist: false, light: false,
      headText: "OPS_DASH", chartLabel: "SYS LOAD [5m]",
      barAccentStart: 24, titleDecor: "",
    },
  },
  {
    id: "rawcut",
    name: "Raw Cut",
    tagline: "No radius. No shadows. No apologies.",
    icon: "slash",
    density: "balanced",
    typography: "clean",
    interaction: "subtle",
    embellishment: "none",
    promptSnippet: 'Brutalist design. Zero border-radius, zero box-shadow, hard 2px borders, stark contrast. Heavy uppercase typography, aggressive spacing. Anti-decoration as the aesthetic.',
    v: {
      bg: "#f0f0f0", card: "#ffffff", accent: "#000000", text: "#000000",
      muted: "rgba(0,0,0,0.4)", dimmer: "rgba(0,0,0,0.1)",
      radius: 0, font: "'DM Sans', sans-serif", headSize: 13, headWeight: 900,
      valSize: 18, valWeight: 900, valFont: "'DM Sans', sans-serif",
      labelSize: 6, labelCase: "uppercase", labelSpacing: "0.1em",
      cardPad: 8, gap: 5, cardCount: 3, barCount: 12, barGap: 2,
      showNav: false, showTabs: true, tabStyle: "underline-bold",
      border: "2px solid #000", shadow: "none",
      glass: false, glow: false, brutalist: true, light: true,
      headText: "DASHBOARD", chartLabel: "OUTPUT",
      barAccentStart: 9, titleDecor: "",
    },
  },
  {
    id: "vapor",
    name: "Vapor",
    tagline: "Frosted layers. Soft glow. Dreamy.",
    icon: "layers",
    density: "spacious",
    typography: "clean",
    interaction: "smooth",
    embellishment: "rich",
    promptSnippet: 'Glassmorphism design. Frosted translucent cards with backdrop-filter blur(20px), layered depth with subtle gradients, soft accent glow (box-shadow with color), rounded 14-18px radius.',
    v: {
      bg: "#0c0f1a", card: "rgba(255,255,255,0.04)", accent: "#67e8f9", text: "#e0f2fe",
      muted: "rgba(224,242,254,0.35)", dimmer: "rgba(224,242,254,0.12)",
      radius: 16, font: "'DM Sans', sans-serif", headSize: 12, headWeight: 600,
      valSize: 18, valWeight: 700, valFont: "'DM Sans', sans-serif",
      labelSize: 7, labelCase: "normal", labelSpacing: "0.02em",
      cardPad: 12, gap: 10, cardCount: 2, barCount: 12, barGap: 3,
      showNav: false, showTabs: true, tabStyle: "pill",
      border: "1px solid rgba(255,255,255,0.08)", shadow: "0 8px 32px rgba(0,0,0,0.2)",
      glass: true, glow: true, brutalist: false, light: false,
      headText: "Dashboard", chartLabel: "Signal Flow",
      barAccentStart: 9, titleDecor: "",
    },
  },
  {
    id: "midnight",
    name: "Midnight Luxe",
    tagline: "Dark. Rich. Gold-trimmed.",
    icon: "crown",
    density: "balanced",
    typography: "clean",
    interaction: "smooth",
    embellishment: "moderate",
    promptSnippet: 'Premium dark design. Near-black backgrounds (#08090d), warm gold accent (#d4a254), subtle gold-tinted borders, refined spacing. Luxury fintech or private portal feel.',
    v: {
      bg: "#08090d", card: "#12141c", accent: "#d4a254", text: "#e8e4dc",
      muted: "rgba(232,228,220,0.35)", dimmer: "rgba(232,228,220,0.12)",
      radius: 12, font: "'DM Sans', sans-serif", headSize: 11, headWeight: 700,
      valSize: 18, valWeight: 700, valFont: "'DM Sans', sans-serif",
      labelSize: 6, labelCase: "uppercase", labelSpacing: "0.08em",
      cardPad: 10, gap: 8, cardCount: 3, barCount: 14, barGap: 3,
      showNav: false, showTabs: true, tabStyle: "pill",
      border: "1px solid rgba(212,162,84,0.12)", shadow: "0 2px 12px rgba(0,0,0,0.3)",
      glass: false, glow: false, brutalist: false, light: false,
      headText: "Dashboard", chartLabel: "Portfolio Value",
      barAccentStart: 11, titleDecor: "",
    },
  },
];

/* Quick combos — mood + purpose pairings */
const combos = [
  { mood: "boardroom", purpose: "Telling a Story", label: "Corporate Deck", desc: "Polished presentation for leadership" },
  { mood: "arcade", purpose: "Community Based", label: "Team Rally", desc: "Fun internal engagement tool" },
  { mood: "warroom", purpose: "Mission Control", label: "Ops Dashboard", desc: "Real-time monitoring center" },
  { mood: "vapor", purpose: "Discover", label: "Product Launch", desc: "Dreamy product showcase" },
  { mood: "frontpage", purpose: "Learn & Explore", label: "Knowledge Base", desc: "Editorial documentation site" },
  { mood: "midnight", purpose: "Data-Heavy", label: "Executive Intel", desc: "Premium analytics portal" },
];

/* ── Icons ── */
const iconPaths = {
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></>,
  terminal: <><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></>,
  type: <><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  radar: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="2" x2="12" y2="6" /></>,
  slash: <line x1="18" y1="6" x2="6" y2="18" />,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
  crown: <><path d="M2 17l3-10 5 6 2-8 2 8 5-6 3 10z" /><path d="M2 17h20" /></>,
  sliders: <><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></>,
  chevDown: <polyline points="6 9 12 15 18 9" />,
  chevRight: <polyline points="9 18 15 12 9 6" />,
  sparkle: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></>,
};
const Icon = ({ name, size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>
);

/* ── Unified Mini Preview ── 
   Same base layout, dramatically different rendering per mood.
*/
function MiniPreview({ v }) {
  const {
    bg, card, accent, text, muted, dimmer, radius, font,
    headSize, headWeight, valSize, valWeight, valFont,
    labelSize, labelCase, labelSpacing,
    cardPad, gap, cardCount, barCount, barGap,
    showNav, showTabs, tabStyle,
    border, shadow, glass, glow, brutalist, light,
    headText, chartLabel, barAccentStart, titleDecor,
  } = v;

  const stats = [
    { l: "Revenue", v: "$2.4M", c: "+12.4%" },
    { l: "Users", v: "18.2K", c: "+8.1%" },
    { l: "Latency", v: "42ms", c: "-3.2%" },
    { l: "Uptime", v: "99.9%", c: "stable" },
  ].slice(0, cardCount);

  const bars = Array.from({ length: barCount }, (_, i) =>
    25 + Math.sin(i * 0.8 + 1) * 22 + (i * 2.3 % 20)
  );

  const cardBg = glass
    ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
    : card;

  const tabItems = ["Overview", "Analytics", "Reports"];

  return (
    <div style={{
      height: "100%", background: bg, padding: cardPad, fontFamily: font,
      display: "flex", flexDirection: "column", color: text, overflow: "hidden",
      borderRadius: Math.max(radius - 2, 4),
    }}>
      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: gap,
      }}>
        <div style={{
          fontSize: headSize, fontWeight: headWeight, color: text,
          fontStyle: titleDecor === "italic" ? "italic" : "normal",
          letterSpacing: brutalist ? "0.04em" : "0",
        }}>{headText}</div>
        <div style={{
          padding: `2px ${brutalist ? 4 : 7}px`,
          borderRadius: brutalist ? 0 : radius / 2,
          background: brutalist ? accent : glow ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : `${accent}18`,
          color: brutalist || glow ? (light ? "#fff" : bg) : accent,
          fontSize: 6, fontWeight: 700, fontFamily: font,
          boxShadow: glow ? `0 0 8px ${accent}40` : "none",
        }}>Live</div>
      </div>

      {/* Tabs */}
      {showTabs && (
        <div style={{
          display: "flex", gap: tabStyle === "underline" || tabStyle === "underline-bold" ? 8 : 3,
          marginBottom: gap,
          borderBottom: tabStyle === "underline" || tabStyle === "underline-bold" ? `1px solid ${dimmer}` : "none",
          paddingBottom: tabStyle === "underline" || tabStyle === "underline-bold" ? 4 : 0,
        }}>
          {tabItems.map((t, i) => {
            const active = i === 0;
            if (tabStyle === "pill") {
              return (
                <div key={t} style={{
                  padding: `2px 7px`, borderRadius: radius / 3,
                  fontSize: 6, fontWeight: active ? 600 : 400,
                  background: active ? (glow ? `${accent}25` : `${accent}12`) : "transparent",
                  color: active ? accent : muted, fontFamily: font,
                }}>{t}</div>
              );
            }
            if (tabStyle === "underline" || tabStyle === "underline-bold") {
              return (
                <div key={t} style={{
                  fontSize: 6, fontWeight: active ? (brutalist ? 800 : 600) : 400,
                  color: active ? text : muted,
                  borderBottom: active ? `${brutalist ? 2 : 1.5}px solid ${accent}` : "1.5px solid transparent",
                  paddingBottom: 3, fontFamily: font,
                  textTransform: brutalist ? "uppercase" : "none",
                  letterSpacing: brutalist ? "0.06em" : "0",
                }}>{t}</div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Body: optional nav + main content */}
      <div style={{ display: "flex", gap, flex: 1, minHeight: 0 }}>
        {/* Sidebar nav */}
        {showNav && (
          <div style={{
            width: 38, borderRadius: radius, padding: 3,
            background: glass ? "rgba(255,255,255,0.02)" : `${accent}05`,
            border, flexShrink: 0,
            display: "flex", flexDirection: "column", gap: 1,
          }}>
            {["Home", "Data", "Logs", "Cfg"].map((n, i) => (
              <div key={n} style={{
                padding: "2px 3px", borderRadius: Math.max(radius / 3, 1),
                fontSize: 5, fontWeight: i === 0 ? 600 : 400,
                color: i === 0 ? accent : dimmer,
                background: i === 0 ? `${accent}10` : "transparent",
                fontFamily: font,
                borderLeft: i === 0 ? `1.5px solid ${accent}` : "1.5px solid transparent",
              }}>{n}</div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap, minWidth: 0 }}>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cardCount}, 1fr)`, gap }}>
            {stats.map(s => (
              <div key={s.l} style={{
                borderRadius: radius, padding: cardPad * 0.7,
                background: cardBg, border, boxShadow: shadow,
                backdropFilter: glass ? "blur(16px)" : "none",
              }}>
                <div style={{
                  fontSize: labelSize, fontWeight: 600, textTransform: labelCase,
                  letterSpacing: labelSpacing, color: muted, marginBottom: 2,
                  fontFamily: font,
                }}>{s.l}</div>
                <div style={{
                  fontSize: cardCount > 3 ? Math.max(valSize - 5, 10) : valSize,
                  fontWeight: valWeight, color: text, fontFamily: valFont,
                }}>{s.v}</div>
                <div style={{
                  fontSize: 6, marginTop: 1, fontFamily: font,
                  color: s.c.startsWith("+") ? (light ? "#16a34a" : "#4ade80")
                    : s.c.startsWith("-") ? accent : muted,
                }}>{s.c}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{
            flex: 1, borderRadius: radius, padding: cardPad * 0.7,
            background: cardBg, border, boxShadow: shadow,
            backdropFilter: glass ? "blur(16px)" : "none",
            display: "flex", flexDirection: "column", minHeight: 0,
          }}>
            <div style={{
              fontSize: labelSize, fontWeight: 600, textTransform: labelCase,
              letterSpacing: labelSpacing, color: dimmer, marginBottom: gap,
              fontFamily: font,
            }}>{chartLabel}</div>
            <div style={{
              display: "flex", alignItems: "flex-end", gap: barGap, flex: 1, minHeight: 0,
            }}>
              {bars.map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  borderRadius: brutalist ? 0 : Math.max(radius / 5, 1),
                  background: i >= barAccentStart ? accent
                    : glass ? `${accent}25`
                    : `${accent}${light ? "20" : "18"}`,
                  boxShadow: glow && i >= barAccentStart ? `0 0 6px ${accent}40` : "none",
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Preset Card ── */
function PresetCard({ preset, isSelected, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", display: "flex", flexDirection: "column",
      background: isSelected ? "rgba(129,140,248,0.06)" : "rgba(255,255,255,0.02)",
      border: isSelected ? "1.5px solid rgba(129,140,248,0.4)" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, overflow: "hidden", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif", textAlign: "left", padding: 0,
      transition: "all 0.2s ease", outline: "none",
    }}>
      <div style={{ height: 140, padding: 6, paddingBottom: 0 }}>
        <div style={{
          height: "100%", borderRadius: 10, overflow: "hidden",
          border: isSelected ? "1px solid rgba(129,140,248,0.15)" : "1px solid rgba(255,255,255,0.04)",
        }}>
          <MiniPreview v={preset.v} />
        </div>
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: isSelected ? "rgba(129,140,248,0.15)" : "rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name={preset.icon} size={12} color={isSelected ? "#818cf8" : "rgba(240,237,230,0.4)"} />
          </div>
          <div style={{
            fontSize: 13, fontWeight: 700,
            color: isSelected ? "#F0EDE6" : "rgba(240,237,230,0.7)",
          }}>{preset.name}</div>
        </div>
        <div style={{
          fontSize: 10, color: "rgba(240,237,230,0.35)", lineHeight: 1.4, paddingLeft: 28,
        }}>{preset.tagline}</div>
      </div>
      {isSelected && (
        <div style={{
          position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 6,
          background: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      )}
    </button>
  );
}

/* ── Prompt Preview ── */
function PromptPreview({ preset }) {
  return (
    <div style={{
      marginTop: 14, background: "#1e2130", borderRadius: 10,
      border: "1px solid rgba(129,140,248,0.15)", overflow: "hidden",
    }}>
      <div style={{
        padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(129,140,248,0.04)", borderBottom: "1px solid rgba(129,140,248,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: 6, background: "#ff5f57" }} />
          <div style={{ width: 6, height: 6, borderRadius: 6, background: "#febc2e" }} />
          <div style={{ width: 6, height: 6, borderRadius: 6, background: "#28c840" }} />
          <span style={{ fontSize: 8, color: "rgba(240,237,230,0.3)", marginLeft: 4, fontFamily: "'JetBrains Mono', monospace" }}>prompt preview</span>
        </div>
        <div style={{
          padding: "2px 8px", borderRadius: 4, background: "rgba(129,140,248,0.1)",
          fontSize: 7, color: "#818cf8", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <Icon name="copy" size={9} color="#818cf8" /> Copy
        </div>
      </div>
      <div style={{ padding: "10px 14px", fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ fontSize: 8, lineHeight: 1.7 }}>
          <span style={{ color: "#22c55e" }}>$</span>{" "}
          <span style={{ color: "#a78bfa" }}>--mood-feel</span>
          <br />
          <span style={{ color: "rgba(240,237,230,0.5)", paddingLeft: 12, display: "inline-block" }}>
            {preset.promptSnippet}
          </span>
          <br /><br />
          <span style={{ color: "#22c55e" }}>$</span>{" "}
          <span style={{ color: "#a78bfa" }}>--dimensions</span>
          <br />
          <span style={{ color: "rgba(240,237,230,0.35)", paddingLeft: 12, display: "inline-block" }}>
            density: "{preset.density}", typography: "{preset.typography}"
          </span>
          <br />
          <span style={{ color: "rgba(240,237,230,0.35)", paddingLeft: 12, display: "inline-block" }}>
            interaction: "{preset.interaction}", embellishment: "{preset.embellishment}"
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Quick Combos ── */
function QuickCombos({ onSelectMood }) {
  return (
    <div style={{
      marginTop: 18, background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Icon name="sparkle" size={14} color="#fbbf24" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#F0EDE6" }}>Quick Combos</div>
          <div style={{ fontSize: 10, color: "rgba(240,237,230,0.35)", marginTop: 1 }}>Mood + Purpose paired together — sets multiple sections at once</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {combos.map(c => {
          const moodData = presets.find(p => p.id === c.mood);
          return (
            <button key={c.label} onClick={() => onSelectMood(c.mood)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              textAlign: "left", transition: "all 0.15s ease", outline: "none",
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
              }}>
                <MiniPreview v={moodData.v} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#F0EDE6" }}>{c.label}</div>
                <div style={{ fontSize: 8, color: "rgba(240,237,230,0.3)", marginTop: 1 }}>{c.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Fine-Tune ── */
const dimensions = [
  { id: "density", label: "Density", color: "#3b82f6", options: ["spacious", "balanced", "compact", "dense"] },
  { id: "typography", label: "Typography", color: "#a855f7", options: ["clean", "technical", "editorial", "rounded"] },
  { id: "interaction", label: "Interaction", color: "#f59e0b", options: ["subtle", "smooth", "snappy", "dramatic"] },
  { id: "embellishment", label: "Embellishment", color: "#10b981", options: ["none", "minimal", "moderate", "rich"] },
];

function FineTuneSection({ selectedPreset }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      marginTop: 16, background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden",
    }}>
      <button onClick={() => setExpanded(!expanded)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="sliders" size={14} color="rgba(240,237,230,0.5)" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#F0EDE6" }}>Fine-Tune</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {dimensions.map(d => (
            <div key={d.id} style={{ width: 8, height: 8, borderRadius: 4, background: d.color, opacity: 0.7 }} />
          ))}
          <Icon name="chevDown" size={14} color="rgba(240,237,230,0.3)" />
        </div>
      </button>
      {expanded && (
        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {dimensions.map(dim => (
            <div key={dim.id} style={{
              background: `${dim.color}08`, borderRadius: 10, padding: "10px 12px",
              border: `1px solid ${dim.color}15`,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: dim.color, marginBottom: 8,
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>{dim.label}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {dim.options.map(opt => (
                  <button key={opt} style={{
                    padding: "6px 12px", borderRadius: 8,
                    border: selectedPreset[dim.id] === opt ? `1px solid ${dim.color}50` : "1px solid rgba(255,255,255,0.06)",
                    background: selectedPreset[dim.id] === opt ? `${dim.color}18` : "rgba(255,255,255,0.03)",
                    color: selectedPreset[dim.id] === opt ? "#F0EDE6" : "rgba(240,237,230,0.35)",
                    fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize",
                    transition: "all 0.15s ease",
                  }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export default function MoodPresetsV4() {
  const [selected, setSelected] = useState("boardroom");
  const selectedPreset = presets.find(p => p.id === selected);

  return (
    <div style={{
      minHeight: "100vh", background: "#080b14", color: "#F0EDE6",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      padding: "40px 24px 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&family=JetBrains+Mono:wght@400;500&family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(129,140,248,0.2); border-radius: 4px; }
        button:hover { filter: brightness(1.08); }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.12em", color: "#a78bfa", marginBottom: 6,
          }}>Mood & Feel — v4</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#F0EDE6", marginBottom: 4 }}>Pick a Vibe</div>
          <div style={{ fontSize: 12, color: "rgba(240,237,230,0.4)", lineHeight: 1.5 }}>
            Same layout, completely different feel. Each preset controls density, typography, interaction, and embellishment — see the prompt it generates below.
          </div>
        </div>

        <div style={{
          background: "rgba(28,32,52,0.7)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: 20, marginTop: 20,
        }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F0EDE6" }}>Quick Presets</div>
            <div style={{ fontSize: 11, color: "rgba(240,237,230,0.35)", marginTop: 2 }}>One click sets all four dimensions</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {presets.map(p => (
              <PresetCard key={p.id} preset={p} isSelected={selected === p.id} onClick={() => setSelected(p.id)} />
            ))}
          </div>

          {/* Prompt preview for selected */}
          <PromptPreview preset={selectedPreset} />

          {/* Fine-tune */}
          <FineTuneSection selectedPreset={selectedPreset} />

          {/* Quick combos */}
          <QuickCombos onSelectMood={setSelected} />

          {/* Next */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <div style={{
              padding: "10px 24px", borderRadius: 12,
              border: "1px solid rgba(129,140,248,0.3)",
              background: "rgba(129,140,248,0.06)", color: "#818cf8",
              fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>
              Next: <span style={{ color: "#67e8f9" }}>Card Style</span> →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
