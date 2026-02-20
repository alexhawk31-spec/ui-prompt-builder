import { useState, useRef, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════
   THEME DATA — 7 dark, 7 light
   ═══════════════════════════════════════════ */

const THEMES = [
  // DARK
  { id: "dark-luxury", name: "Dark Luxury", mode: "dark",
    preview: { bg: "#0B0F19", card: "#1a1f2e", accent: "#C9A84C", text: "#F0EDE6" },
    desc: "Deep darks, gold accents, glassmorphism",
    accentOptions: ["#C9A84C", "#B76E79", "#A8B2BD", "#B87333", "#D4AF37", "#E8D5B7"],
  },
  { id: "neon-cyber", name: "Neon Cyber", mode: "dark",
    preview: { bg: "#0a0a1a", card: "#12122a", accent: "#00f5d4", text: "#e0e0ff" },
    desc: "Electric neons, cyberpunk energy",
    accentOptions: ["#00f5d4", "#ff00ff", "#00e5ff", "#b8ff00", "#ff6b9d", "#7b61ff"],
  },
  { id: "midnight-gradient", name: "Midnight Gradient", mode: "dark",
    preview: { bg: "#1a1a2e", card: "#16213e", accent: "#e94560", text: "#eaeaea" },
    desc: "Deep blues, vivid pops, immersive",
    accentOptions: ["#e94560", "#4361ee", "#f4a261", "#9b5de5", "#00bbf9", "#fee440"],
  },
  { id: "charcoal-ember", name: "Charcoal Ember", mode: "dark",
    preview: { bg: "#1c1917", card: "#292524", accent: "#f97316", text: "#fafaf9" },
    desc: "Warm darks, ember orange, industrial",
    accentOptions: ["#f97316", "#ef4444", "#eab308", "#f59e0b", "#fb923c", "#fbbf24"],
  },
  { id: "deep-ocean", name: "Deep Ocean", mode: "dark",
    preview: { bg: "#0c1220", card: "#162032", accent: "#06b6d4", text: "#e2e8f0" },
    desc: "Navy depths, cyan glow, calm and deep",
    accentOptions: ["#06b6d4", "#22d3ee", "#0ea5e9", "#38bdf8", "#67e8f9", "#a5f3fc"],
  },
  { id: "noir-crimson", name: "Noir Crimson", mode: "dark",
    preview: { bg: "#0f0a0a", card: "#1a1212", accent: "#dc2626", text: "#f5f5f4" },
    desc: "Near-black, sharp red, cinematic",
    accentOptions: ["#dc2626", "#ef4444", "#f87171", "#b91c1c", "#fca5a5", "#f97066"],
  },
  { id: "slate-matrix", name: "Slate Matrix", mode: "dark",
    preview: { bg: "#111318", card: "#1a1d25", accent: "#22c55e", text: "#d4d4d8" },
    desc: "Cool grays, terminal green, developer-native",
    accentOptions: ["#22c55e", "#4ade80", "#10b981", "#34d399", "#86efac", "#a3e635"],
  },
  // LIGHT
  { id: "light-clean", name: "Light & Clean", mode: "light",
    preview: { bg: "#FAF9F6", card: "#FFFFFF", accent: "#2D7D8E", text: "#2C3E50" },
    desc: "Warm paper backgrounds, teal accents",
    accentOptions: ["#2D7D8E", "#3498DB", "#27AE60", "#8E44AD", "#16a085", "#2980b9"],
  },
  { id: "earth-organic", name: "Earth & Organic", mode: "light",
    preview: { bg: "#f5f0e8", card: "#fffdf7", accent: "#6b8f71", text: "#3d3229" },
    desc: "Natural tones, soft greens, grounded",
    accentOptions: ["#6b8f71", "#c4704b", "#c9a96e", "#708090", "#8b7355", "#5f7a61"],
  },
  { id: "bold-editorial", name: "Bold Editorial", mode: "light",
    preview: { bg: "#ffffff", card: "#f8f8f8", accent: "#e63946", text: "#1d1d1d" },
    desc: "High contrast, strong type, magazine feel",
    accentOptions: ["#e63946", "#1d3557", "#457b9d", "#e76f51", "#264653", "#2a9d8f"],
  },
  { id: "soft-lavender", name: "Soft Lavender", mode: "light",
    preview: { bg: "#faf8ff", card: "#ffffff", accent: "#7c3aed", text: "#1e1b4b" },
    desc: "Gentle purples, airy, approachable",
    accentOptions: ["#7c3aed", "#8b5cf6", "#a78bfa", "#6d28d9", "#c084fc", "#a855f7"],
  },
  { id: "arctic-frost", name: "Arctic Frost", mode: "light",
    preview: { bg: "#f0f4f8", card: "#ffffff", accent: "#2563eb", text: "#1e293b" },
    desc: "Cool whites, crisp blue, clinical precision",
    accentOptions: ["#2563eb", "#3b82f6", "#0369a1", "#1d4ed8", "#60a5fa", "#0284c7"],
  },
  { id: "peach-sunrise", name: "Peach Sunrise", mode: "light",
    preview: { bg: "#fef7f0", card: "#ffffff", accent: "#ea580c", text: "#292524" },
    desc: "Warm whites, sunset orange, friendly energy",
    accentOptions: ["#ea580c", "#f97316", "#fb923c", "#dc2626", "#d97706", "#c2410c"],
  },
  { id: "sage-studio", name: "Sage Studio", mode: "light",
    preview: { bg: "#f5f7f3", card: "#ffffff", accent: "#4d7c0f", text: "#1c1917" },
    desc: "Muted greens, studio calm, design-forward",
    accentOptions: ["#4d7c0f", "#65a30d", "#84cc16", "#16a34a", "#15803d", "#059669"],
  },
];

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */

const CheckIcon = ({ size = 12, stroke = "#0B0F19" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SunIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const GripIcon = ({ size = 10, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <circle cx="8" cy="4" r="2.5" /><circle cx="16" cy="4" r="2.5" /><circle cx="8" cy="12" r="2.5" /><circle cx="16" cy="12" r="2.5" /><circle cx="8" cy="20" r="2.5" /><circle cx="16" cy="20" r="2.5" />
  </svg>
);

/* ═══════════════════════════════════════════
   DRAGGABLE ACCENT COLOR PICKER
   ═══════════════════════════════════════════ */

function AccentColorPicker({ options, value, onChange, themeBg }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Find current index
  const currentIndex = options.indexOf(value);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  // Handle drag along the track
  const handleMove = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.round(pct * (options.length - 1));
    if (options[index] && options[index] !== value) {
      onChange(options[index]);
    }
  }, [options, value, onChange]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    setDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => handleMove(e.clientX || e.touches?.[0]?.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, handleMove]);

  const thumbPosition = (activeIndex / Math.max(options.length - 1, 1)) * 100;

  return (
    <div style={{ padding: "14px 0 4px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10,
      }}>
        <div style={{
          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
          color: `${themeBg === "#ffffff" || themeBg.startsWith("#f") ? "#2C3E50" : "#F0EDE6"}60`,
        }}>Accent Color</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
          color: `${themeBg === "#ffffff" || themeBg.startsWith("#f") ? "#2C3E50" : "#F0EDE6"}50`,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: 3, background: value,
            border: "1px solid rgba(128,128,128,0.2)",
          }} />
          {value}
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          position: "relative", height: 40, cursor: "pointer",
          userSelect: "none", touchAction: "none",
        }}
      >
        {/* Color gradient bar */}
        <div style={{
          position: "absolute", top: 14, left: 0, right: 0, height: 12, borderRadius: 6,
          background: `linear-gradient(to right, ${options.join(", ")})`,
          boxShadow: `0 2px 8px ${value}25`,
          border: "1px solid rgba(128,128,128,0.15)",
        }} />

        {/* Stop markers */}
        {options.map((color, i) => {
          const leftPct = (i / Math.max(options.length - 1, 1)) * 100;
          const isActive = i === activeIndex;
          const isHovered = i === hoverIndex;
          return (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); onChange(color); }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: isActive ? 8 : 12,
                transform: "translateX(-50%)",
                width: isActive ? 24 : (isHovered ? 18 : 14),
                height: isActive ? 24 : (isHovered ? 18 : 14),
                borderRadius: "50%",
                background: color,
                border: isActive ? "3px solid #fff" : "2px solid rgba(255,255,255,0.5)",
                boxShadow: isActive
                  ? `0 2px 12px ${color}60, 0 0 0 2px ${color}30`
                  : `0 1px 4px rgba(0,0,0,0.2)`,
                cursor: "grab",
                transition: dragging ? "none" : "all 0.2s ease",
                zIndex: isActive ? 10 : (isHovered ? 5 : 1),
              }}
            />
          );
        })}

        {/* Drag thumb (larger hit target) */}
        <div style={{
          position: "absolute",
          left: `${thumbPosition}%`,
          top: 2,
          transform: "translateX(-50%)",
          width: 36, height: 36, borderRadius: "50%",
          cursor: dragging ? "grabbing" : "grab",
          zIndex: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0,
        }} />
      </div>

      {/* Direct click circles below */}
      <div style={{
        display: "flex", gap: 6, marginTop: 6, justifyContent: "center",
      }}>
        {options.map((color, i) => {
          const isActive = color === value;
          return (
            <button
              key={i}
              onClick={() => onChange(color)}
              style={{
                width: isActive ? 28 : 22, height: isActive ? 28 : 22,
                borderRadius: "50%", border: "none", cursor: "pointer",
                background: color,
                outline: isActive ? `2px solid ${color}` : "none",
                outlineOffset: 3,
                boxShadow: isActive ? `0 2px 10px ${color}40` : `0 1px 3px rgba(0,0,0,0.15)`,
                transition: "all 0.2s ease",
                position: "relative",
              }}
              title={color}
            >
              {isActive && (
                <span style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CheckIcon size={10} stroke={
                    // Pick contrasting check color
                    ["#C9A84C","#D4AF37","#E8D5B7","#b8ff00","#fee440","#fbbf24","#eab308","#f59e0b","#fb923c","#A8B2BD","#a5f3fc","#67e8f9","#fca5a5","#86efac","#a3e635","#4ade80","#34d399","#c084fc","#a78bfa","#60a5fa","#f87171","#22d3ee","#38bdf8","#f97066","#84cc16"].includes(color) ? "#000" : "#fff"
                  } />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN THEME SELECTOR
   ═══════════════════════════════════════════ */

export default function ThemeSelector() {
  const [selected, setSelected] = useState("dark-luxury");
  const [modeFilter, setModeFilter] = useState("dark");
  const [customAccents, setCustomAccents] = useState({});

  const filteredThemes = THEMES.filter((t) => t.mode === modeFilter);

  // Auto-select first in mode if current isn't visible
  const visibleIds = filteredThemes.map((t) => t.id);
  const effectiveSelected = visibleIds.includes(selected) ? selected : filteredThemes[0]?.id;
  if (effectiveSelected !== selected) {
    setTimeout(() => setSelected(effectiveSelected), 0);
  }

  const baseTheme = THEMES.find((t) => t.id === effectiveSelected);
  const currentAccent = customAccents[effectiveSelected] || baseTheme?.preview.accent;

  // Build effective theme with custom accent
  const effectiveTheme = baseTheme ? {
    ...baseTheme,
    preview: { ...baseTheme.preview, accent: currentAccent },
  } : filteredThemes[0];

  const setAccent = (color) => {
    setCustomAccents((prev) => ({ ...prev, [effectiveSelected]: color }));
  };

  const isLight = modeFilter === "light";
  const previewText = effectiveTheme.preview.text;
  const textMuted = `${previewText}50`;

  return (
    <div style={{
      minHeight: "100vh", background: "#080b14",
      backgroundImage: "radial-gradient(ellipse at 20% 60%, rgba(201,168,76,0.03) 0%, transparent 60%)",
      color: "#F0EDE6", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      padding: "48px 24px 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes previewFade { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 4px; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
            <span style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A84C, #a8893a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#0B0F19", flexShrink: 0,
            }}>2</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Color Theme</div>
              <div style={{ fontSize: 12, color: "rgba(240,237,230,0.4)", marginTop: 1 }}>Pick a palette, then drag to fine-tune your accent color</div>
            </div>
          </div>
        </div>

        {/* Dark / Light toggle */}
        <div style={{
          display: "inline-flex", borderRadius: 10, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.3)", marginBottom: 16,
        }}>
          {[
            { mode: "dark", label: "Dark Themes", IconComp: MoonIcon },
            { mode: "light", label: "Light Themes", IconComp: SunIcon },
          ].map(({ mode, label, IconComp }) => (
            <button key={mode} onClick={() => setModeFilter(mode)} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "9px 20px",
              border: "none", cursor: "pointer",
              background: modeFilter === mode ? "rgba(201,168,76,0.12)" : "transparent",
              color: modeFilter === mode ? "#C9A84C" : "rgba(240,237,230,0.4)",
              fontSize: 13, fontWeight: 600, fontFamily: "inherit",
              borderRight: mode === "dark" ? "1px solid rgba(255,255,255,0.06)" : "none",
              transition: "all 0.2s",
            }}>
              <IconComp size={14} color={modeFilter === mode ? "#C9A84C" : "rgba(240,237,230,0.35)"} />
              {label}
            </button>
          ))}
        </div>

        {/* Split Layout */}
        <div style={{
          display: "grid", gridTemplateColumns: "280px 1fr", gap: 14,
          animation: "fadeIn 0.3s ease",
        }}>

          {/* LEFT: Scrollable theme list */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 5,
            background: "rgba(26,31,46,0.4)", backdropFilter: "blur(16px)",
            borderRadius: 14, padding: 8, border: "1px solid rgba(201,168,76,0.06)",
            maxHeight: 520, overflowY: "auto",
          }}>
            {filteredThemes.map((t, index) => {
              const active = effectiveSelected === t.id;
              const colors = Object.values(t.preview);
              const displayAccent = customAccents[t.id] || t.preview.accent;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 11, padding: "11px 12px",
                    borderRadius: 10, cursor: "pointer", textAlign: "left", flexShrink: 0,
                    border: active ? "1.5px solid rgba(201,168,76,0.35)" : "1.5px solid transparent",
                    background: active ? "rgba(201,168,76,0.08)" : "transparent",
                    transition: "all 0.2s",
                    animation: `slideIn 0.2s ease ${index * 0.03}s both`,
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = active ? "rgba(201,168,76,0.08)" : "transparent"; }}
                >
                  {/* Swatch strip */}
                  <div style={{
                    display: "flex", borderRadius: 5, overflow: "hidden", width: 48, height: 24, flexShrink: 0,
                    border: "1px solid rgba(128,128,128,0.15)",
                  }}>
                    <div style={{ flex: 1, background: t.preview.bg }} />
                    <div style={{ flex: 1, background: t.preview.card }} />
                    <div style={{ flex: 1, background: displayAccent }} />
                    <div style={{ flex: 1, background: t.preview.text }} />
                  </div>
                  {/* Name + desc */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 600,
                      color: active ? "#C9A84C" : "#F0EDE6",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{t.name}</div>
                    <div style={{
                      fontSize: 10, color: "rgba(240,237,230,0.3)", marginTop: 1,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{t.desc}</div>
                  </div>
                  {active && (
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", background: "#C9A84C", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}><CheckIcon size={10} /></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Live Preview + Accent Picker */}
          <div
            key={effectiveSelected + currentAccent}
            style={{
              borderRadius: 14, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: effectiveTheme.preview.bg,
              display: "flex", flexDirection: "column",
              animation: "previewFade 0.3s ease",
              position: "relative",
            }}
          >
            {/* Ambient glow */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse at 70% 20%, ${currentAccent}10 0%, transparent 60%)`,
            }} />

            <div style={{ position: "relative", zIndex: 1, padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>

              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{
                    fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
                    color: textMuted, marginBottom: 3, fontFamily: "'JetBrains Mono', monospace",
                  }}>Preview</div>
                  <div style={{
                    fontSize: 20, fontWeight: 700, color: previewText, letterSpacing: "-0.03em",
                  }}>{effectiveTheme.name}</div>
                </div>
                <div style={{ display: "flex", gap: 7 }}>
                  <div style={{
                    padding: "6px 14px", borderRadius: 7,
                    background: effectiveTheme.preview.card,
                    border: `1px solid ${currentAccent}20`,
                    color: previewText, fontSize: 10, fontWeight: 600,
                  }}>Secondary</div>
                  <div style={{
                    padding: "6px 14px", borderRadius: 7,
                    background: currentAccent,
                    color: effectiveTheme.preview.bg, fontSize: 10, fontWeight: 700,
                    boxShadow: `0 3px 12px ${currentAccent}30`,
                  }}>Primary CTA</div>
                </div>
              </div>

              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Revenue", value: "$2.4M", change: "+12.4%" },
                  { label: "Active Users", value: "18.2K", change: "+8.1%" },
                  { label: "Latency", value: "42ms", change: "-3.2%" },
                ].map((card, i) => (
                  <div key={i} style={{
                    borderRadius: 9, padding: 13,
                    background: effectiveTheme.preview.card,
                    border: `1px solid ${currentAccent}10`,
                    display: "flex", flexDirection: "column", gap: 4,
                  }}>
                    <div style={{
                      fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                      color: textMuted,
                    }}>{card.label}</div>
                    <div style={{
                      fontSize: 20, fontWeight: 700, color: previewText,
                      letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono', monospace",
                    }}>{card.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: currentAccent }}>{card.change}</div>
                  </div>
                ))}
              </div>

              {/* Content row */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: 10, minHeight: 70 }}>
                {/* Nav */}
                <div style={{
                  borderRadius: 9, padding: 10,
                  background: effectiveTheme.preview.card,
                  border: `1px solid ${currentAccent}08`,
                  display: "flex", flexDirection: "column", gap: 4,
                }}>
                  {["Dashboard", "Analytics", "Settings", "Team"].map((item, i) => (
                    <div key={i} style={{
                      padding: "5px 8px", borderRadius: 5,
                      background: i === 0 ? `${currentAccent}12` : "transparent",
                      fontSize: 10, fontWeight: i === 0 ? 600 : 400,
                      color: i === 0 ? currentAccent : `${previewText}45`,
                      borderLeft: i === 0 ? `2px solid ${currentAccent}` : "2px solid transparent",
                    }}>{item}</div>
                  ))}
                </div>
                {/* Chart */}
                <div style={{
                  borderRadius: 9, padding: 12,
                  background: effectiveTheme.preview.card,
                  border: `1px solid ${currentAccent}08`,
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  position: "relative",
                }}>
                  <div style={{
                    fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                    color: `${previewText}35`, position: "absolute", top: 10, left: 12,
                  }}>Performance</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 44 }}>
                    {[35,55,40,70,60,80,50,65,75,45,85,55].map((h, i) => (
                      <div key={i} style={{
                        flex: 1, height: `${h}%`, borderRadius: 2,
                        background: i >= 10 ? currentAccent : `${currentAccent}22`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── ACCENT COLOR PICKER ── */}
              <div style={{
                marginTop: 14, paddingTop: 14,
                borderTop: `1px solid ${currentAccent}10`,
              }}>
                <AccentColorPicker
                  options={baseTheme.accentOptions}
                  value={currentAccent}
                  onChange={setAccent}
                  themeBg={effectiveTheme.preview.bg}
                />
              </div>

              {/* Hex readout */}
              <div style={{
                display: "flex", gap: 14, marginTop: 10, paddingTop: 10,
                borderTop: `1px solid ${currentAccent}08`,
              }}>
                {Object.entries(effectiveTheme.preview).map(([key, color]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: 3, background: color,
                      border: "1px solid rgba(128,128,128,0.2)",
                    }} />
                    <div>
                      <div style={{ fontSize: 7, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: `${previewText}30` }}>{key}</div>
                      <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: `${previewText}55` }}>{color}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
