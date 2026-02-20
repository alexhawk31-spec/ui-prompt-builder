import { useState } from "react";

/* ═══════════════════════════════════════════ DATA ═══════════════════════════════════════════ */

const steps = [
  { id: "theme", icon: "palette", label: "Theme", sub: "Colors & palette", color: "#818cf8" },
  { id: "mood", icon: "sparkles", label: "Mood", sub: "Density & feel", color: "#a78bfa" },
  { id: "layout", icon: "layout", label: "Layout", sub: "Page structure", color: "#67e8f9" },
  { id: "components", icon: "grid", label: "Components", sub: "UI blocks", color: "#6ee7b7" },
  { id: "animation", icon: "zap", label: "Animation", sub: "Motion", color: "#fbbf24" },
  { id: "border", icon: "circle", label: "Borders", sub: "Rounding", color: "#f9a8d4" },
  { id: "app-desc", icon: "edit", label: "App Info", sub: "Name & desc", color: "#5eead4" },
  { id: "aws", icon: "aws", label: "AWS", sub: "Brand", color: "#fdba74" },
  { id: "notes", icon: "note", label: "Notes", sub: "Extra", color: "#94a3b8" },
];

const sectionDetails = {
  theme: { label: "Visual Theme", val: 'Dark Luxury · Indigo accent (#818cf8)' },
  mood: { label: "Mood & Feel", val: 'Professional · Balanced · Clean type' },
  layout: { label: "Layout", val: 'Sidebar + main content area' },
  components: { label: "Components", val: 'Stat cards, Charts, Nav, Forms' },
  animation: { label: "Animation", val: 'Subtle hover states, fade-in' },
  border: { label: "Borders", val: '12px rounded corners' },
  "app-desc": { label: "App Info", val: '"CloudOps Dashboard"' },
  aws: { label: "AWS Guidelines", val: 'Orange accent, Ember font' },
  notes: { label: "Custom Notes", val: '"Use Lucide icons, no emojis"' },
};

const iconPaths = {
  palette: <><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12" r="1.5"/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.66 0 3-1.34 3-3 0-.79-.31-1.5-.81-2.03-.49-.52-.79-1.21-.79-2.02 0-1.66 1.34-3 3-3h3.03c3.32 0 6.02-2.69 6.02-6.01A9.99 9.99 0 0012 2z"/></>,
  sparkles: <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  circle: <circle cx="12" cy="12" r="10"/>,
  edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  aws: <><path d="M6 12l2 2 4-4"/><rect x="2" y="6" width="20" height="12" rx="2"/></>,
  note: <><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></>,
  copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
  check: <polyline points="20 6 9 17 4 12"/>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  wand: <><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="M11 6.2L9.7 5"/><path d="M11 11.8L9.7 13"/><path d="M2 21l9-9"/></>,
  list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  chevDown: <polyline points="6 9 12 15 18 9"/>,
  chevUp: <polyline points="18 15 12 9 6 15"/>,
};
const Icon = ({ name, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>
);

/* ═══════════════════════════════════════════ EVOLVING PREVIEW ═══════════════════════════════════════════ */

function EvolvingPreview({ configured }) {
  const has = (id) => configured.includes(id);
  const bg = has("theme") ? "#0B0F19" : "#e2e2e8";
  const card = has("theme") ? "#1a1f2e" : "#f0f0f4";
  const accent = has("theme") ? "#818cf8" : "#b8b8c4";
  const text = has("theme") ? "#F0EDE6" : "#2a2a30";
  const muted = has("theme") ? "rgba(240,237,230,0.35)" : "#8888a0";
  const dim = has("theme") ? "rgba(240,237,230,0.12)" : "#d0d0d8";
  const pad = has("mood") ? 12 : 18;
  const gap = has("mood") ? 7 : 12;
  const hw = has("mood") ? 700 : 400;
  const radius = has("border") ? 12 : 3;
  const cols = has("components") ? 3 : 2;
  const showNav = has("layout");
  const tr = has("animation") ? "all 0.3s ease" : "none";
  const stats = [{ l: "Revenue", v: "$2.4M" }, { l: "Users", v: "18.2K" }, { l: "Latency", v: "42ms" }].slice(0, cols);
  const bars = [35, 55, 40, 70, 60, 80, 50, 65];

  return (
    <div style={{ background: bg, borderRadius: radius + 3, overflow: "hidden", height: "100%", padding: pad, fontFamily: "'DM Sans',sans-serif", transition: tr, border: `1px solid ${has("theme") ? "rgba(255,255,255,0.05)" : "#dddde2"}`, position: "relative" }}>
      {configured.length === 0 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#9898a8" }}>Your app preview</div>
          <div style={{ fontSize: 10, color: "#b0b0b8" }}>Start configuring to watch it evolve</div>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: gap, opacity: configured.length ? 1 : 0.1, transition: tr }}>
        <div style={{ fontSize: 16, fontWeight: hw, color: text, transition: tr }}>Dashboard</div>
        <div style={{ padding: "5px 10px", borderRadius: radius, background: accent, color: has("theme") ? "#0B0F19" : "#fff", fontSize: 9, fontWeight: 700, transition: tr }}>New</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap, marginBottom: gap, opacity: configured.length ? 1 : 0.08, transition: tr }}>
        {stats.map((s) => (
          <div key={s.l} style={{ borderRadius: radius, padding: 10, background: card, border: `1px solid ${has("theme") ? "rgba(255,255,255,0.05)" : "#e4e4ea"}`, transition: tr }}>
            <div style={{ fontSize: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: muted, marginBottom: 2 }}>{s.l}</div>
            <div style={{ fontSize: 14, fontWeight: hw, color: text, fontFamily: "'JetBrains Mono',monospace", transition: tr }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: showNav ? "60px 1fr" : "1fr", gap, flex: 1, opacity: configured.length ? 1 : 0.06 }}>
        {showNav && (
          <div style={{ borderRadius: radius, padding: 6, background: card, border: `1px solid ${has("theme") ? "rgba(255,255,255,0.05)" : "#e4e4ea"}`, display: "flex", flexDirection: "column", gap: 1, transition: tr }}>
            {["Home", "Stats", "Team"].map((n, i) => (
              <div key={n} style={{ padding: "3px 5px", borderRadius: radius - 2, background: i === 0 ? `${accent}15` : "transparent", fontSize: 8, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? accent : dim, borderLeft: i === 0 ? `2px solid ${accent}` : "2px solid transparent" }}>{n}</div>
            ))}
          </div>
        )}
        <div style={{ borderRadius: radius, padding: 8, background: card, border: `1px solid ${has("theme") ? "rgba(255,255,255,0.05)" : "#e4e4ea"}`, display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: tr }}>
          <div style={{ fontSize: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: dim, marginBottom: 4 }}>Performance</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 36 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: radius > 6 ? 2 : 1, background: i >= 6 ? accent : `${accent}20`, transition: tr }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ SUMMARY OVERLAY ═══════════════════════════════════════════ */

function SummaryOverlay({ configured, onClose }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(8,10,18,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 560, borderRadius: 18, background: "linear-gradient(135deg, rgba(30,35,55,0.95), rgba(20,25,40,0.95))", border: "1px solid rgba(129,140,248,0.12)", boxShadow: "0 16px 60px rgba(0,0,0,0.5)", padding: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#F0EDE6" }}>Your Selections</div>
            <div style={{ fontSize: 12, color: "rgba(240,237,230,0.35)", marginTop: 2 }}>{configured.length} of {steps.length} sections configured</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="x" size={15} color="rgba(240,237,230,0.4)" />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {steps.map((s) => {
            const done = configured.includes(s.id);
            const detail = sectionDetails[s.id];
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: done ? "rgba(255,255,255,0.03)" : "transparent", border: done ? `1px solid ${s.color}15` : "1px solid rgba(255,255,255,0.03)", opacity: done ? 1 : 0.35, transition: "all 0.2s" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: done ? `${s.color}15` : "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {done ? <Icon name="check" size={13} color={s.color} /> : <Icon name={s.icon} size={13} color="rgba(240,237,230,0.15)" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: done ? "#F0EDE6" : "rgba(240,237,230,0.3)" }}>{detail?.label || s.label}</div>
                  <div style={{ fontSize: 10, color: done ? "rgba(240,237,230,0.4)" : "rgba(240,237,230,0.15)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{done ? detail?.val : "Not configured"}</div>
                </div>
                {done && <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0, boxShadow: `0 0 6px ${s.color}40` }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.04)" }}>
          <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #818cf8, #a78bfa, #67e8f9)", width: `${(configured.length / steps.length) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ TERMINAL PROMPT ═══════════════════════════════════════════ */

function TerminalPrompt({ configured, showInfo, setShowInfo, expanded, setExpanded }) {
  const termSections = [
    { id: "theme", flag: "visual-theme", val: 'palette: "dark-luxury", accent: "#818cf8"', color: "#818cf8" },
    { id: "mood", flag: "mood-feel", val: 'density: "balanced", type: "clean"', color: "#a78bfa" },
    { id: "layout", flag: "layout", val: 'structure: "sidebar-main"', color: "#67e8f9" },
    { id: "components", flag: "components", val: 'cards, charts, nav, forms', color: "#6ee7b7" },
    { id: "animation", flag: "animation", val: 'level: "subtle", hovers: true', color: "#fbbf24" },
    { id: "border", flag: "borders", val: 'radius: "12px"', color: "#f9a8d4" },
    { id: "app-desc", flag: "app-info", val: 'name: "CloudOps Dashboard"', color: "#5eead4" },
    { id: "aws", flag: "aws-guide", val: 'accent: "orange", font: "Ember"', color: "#fdba74" },
    { id: "notes", flag: "notes", val: '"Use Lucide icons"', color: "#94a3b8" },
  ];
  const active = termSections.filter((s) => configured.includes(s.id));

  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      background: "#1e2130",
      border: "1px solid rgba(129,140,248,0.15)",
      boxShadow: "0 -2px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
    }}>
      {/* Title bar */}
      <div onClick={() => setExpanded(!expanded)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px",
        background: "linear-gradient(180deg, rgba(129,140,248,0.06), rgba(129,140,248,0.02))",
        borderBottom: expanded ? "1px solid rgba(129,140,248,0.08)" : "none",
        cursor: "pointer",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(129,140,248,0.7)", fontFamily: "'JetBrains Mono',monospace" }}>prompt-output</span>
          <Icon name={expanded ? "chevUp" : "chevDown"} size={12} color="rgba(129,140,248,0.35)" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9, color: "rgba(240,237,230,0.25)", fontFamily: "'JetBrains Mono',monospace" }}>
            {active.length} sections · ~{active.length * 140} tokens
          </span>
          <button onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }} style={{
            width: 24, height: 24, borderRadius: 6, border: `1px solid ${showInfo ? "rgba(129,140,248,0.2)" : "rgba(255,255,255,0.06)"}`,
            background: showInfo ? "rgba(129,140,248,0.1)" : "transparent",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="info" size={12} color={showInfo ? "#818cf8" : "rgba(240,237,230,0.25)"} />
          </button>
          <button onClick={(e) => e.stopPropagation()} style={{
            padding: "5px 12px", borderRadius: 6, border: "none",
            background: "#818cf8", color: "#0c0e14",
            fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <Icon name="copy" size={11} color="#0c0e14" /> Copy
          </button>
        </div>
      </div>

      {/* Info explainer */}
      {showInfo && expanded && (
        <div style={{ margin: "10px 12px 0", padding: 10, borderRadius: 8, background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.1)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#818cf8", marginBottom: 4 }}>How this prompt works</div>
          <div style={{ fontSize: 9, color: "rgba(240,237,230,0.4)", lineHeight: 1.5 }}>
            Each section gives the AI concrete values — hex codes, pixel sizes, font names — instead of vague descriptions. We use markdown headers so the AI can parse sections independently. Copy just the parts you need, and the AI gets precise instructions instead of guessing.
          </div>
        </div>
      )}

      {/* Expanded terminal content */}
      {expanded && (
        <div style={{ padding: "10px 14px 14px", maxHeight: 220, overflowY: "auto", fontFamily: "'JetBrains Mono',monospace" }}>
          {active.length === 0 ? (
            <div style={{ fontSize: 11, color: "rgba(240,237,230,0.15)" }}>
              <span style={{ color: "#28c840" }}>$</span> waiting for configuration...
              <span style={{ display: "inline-block", width: 7, height: 13, background: "rgba(129,140,248,0.4)", marginLeft: 4, animation: "blink 1s step-end infinite", verticalAlign: "text-bottom" }} />
            </div>
          ) : (
            active.map((sec, i) => (
              <div key={sec.id} style={{ marginBottom: i < active.length - 1 ? 10 : 0 }}>
                <div style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ color: "#28c840" }}>$</span>
                  <span style={{ color: "rgba(240,237,230,0.2)" }}>--</span>
                  <span style={{ color: sec.color, fontWeight: 600 }}>{sec.flag}</span>
                </div>
                <div style={{ fontSize: 10, color: "rgba(240,237,230,0.35)", paddingLeft: 16, marginTop: 2, lineHeight: 1.5 }}>
                  {sec.val}
                </div>
              </div>
            ))
          )}
          {active.length > 0 && (
            <div style={{ marginTop: 10, fontSize: 10, color: "rgba(240,237,230,0.12)" }}>
              <span style={{ color: "#28c840" }}>$</span> <span style={{ color: "rgba(240,237,230,0.2)" }}>ready</span>
              <span style={{ display: "inline-block", width: 7, height: 13, background: "rgba(129,140,248,0.4)", marginLeft: 4, animation: "blink 1s step-end infinite", verticalAlign: "text-bottom" }} />
            </div>
          )}
        </div>
      )}

      {/* Collapsed one-liner */}
      {!expanded && active.length > 0 && (
        <div style={{ padding: "6px 14px 10px", fontSize: 10, color: "rgba(240,237,230,0.2)", fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          <span style={{ color: "#28c840" }}>$</span> generate{" "}
          {active.map((s) => <span key={s.id}><span style={{ color: s.color }}>--{s.flag}</span> </span>)}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════ MAIN ═══════════════════════════════════════════ */

export default function OptionGRefined() {
  const [activeStep, setActiveStep] = useState("theme");
  const [configured, setConfigured] = useState(["theme", "mood", "layout"]);
  const [showInfo, setShowInfo] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const toggleConfig = (id) => setConfigured((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  return (
    <div style={{
      minHeight: "100vh", background: "#080b14",
      backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(129,140,248,0.03) 0%, transparent 60%)",
      color: "#F0EDE6", fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      padding: "48px 24px 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(129,140,248,0.2); border-radius: 4px; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#818cf8", marginBottom: 6 }}>Refined</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#F0EDE6", letterSpacing: "-0.02em" }}>Option G — Distinct Terminal + Summary</div>
          <div style={{ fontSize: 13, color: "rgba(240,237,230,0.4)", marginTop: 4 }}>Click nav icons, toggle "Included," try the summary button (list icon at bottom of nav), expand/collapse the terminal.</div>
        </div>

        {/* App frame */}
        <div style={{ width: "100%", height: 720, borderRadius: 16, overflow: "hidden", display: "flex", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
          {showSummary && <SummaryOverlay configured={configured} onClose={() => setShowSummary(false)} />}

          {/* ── NAV STRIP ── */}
          <div style={{
            width: 68, display: "flex", flexDirection: "column", alignItems: "center",
            padding: "14px 0 10px", gap: 2,
            background: "linear-gradient(180deg, #4338ca, #3730a3, #312e81)",
            flexShrink: 0,
          }}>
            <div style={{ marginBottom: 12, padding: 6 }}>
              <Icon name="wand" size={20} color="rgba(255,255,255,0.9)" />
            </div>
            {steps.map((s) => {
              const active = activeStep === s.id;
              const done = configured.includes(s.id);
              return (
                <button key={s.id} onClick={() => setActiveStep(s.id)} title={s.label} style={{
                  width: 42, height: 42, borderRadius: 12, border: "none", cursor: "pointer",
                  background: active ? "rgba(255,255,255,0.15)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", transition: "all 0.15s",
                }}>
                  <Icon name={s.icon} size={17} color={active ? "#fff" : (done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)")} />
                  {done && !active && <div style={{ position: "absolute", top: 5, right: 5, width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", border: "1.5px solid #3730a3" }} />}
                  {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: "0 3px 3px 0", background: "#fff" }} />}
                </button>
              );
            })}
            <div style={{ flex: 1 }} />
            {/* Summary button */}
            <button onClick={() => setShowSummary(true)} title="View all selections" style={{
              width: 42, height: 42, borderRadius: 12, border: "none", cursor: "pointer",
              background: "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", transition: "all 0.15s",
            }}>
              <Icon name="list" size={16} color="rgba(255,255,255,0.7)" />
              <div style={{
                position: "absolute", top: 3, right: 3,
                minWidth: 14, height: 14, borderRadius: 7,
                background: "#6ee7b7", color: "#0c0e14",
                fontSize: 8, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 3px",
              }}>{configured.length}</div>
            </button>
          </div>

          {/* ── MAIN ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0e1118", minWidth: 0 }}>
            {/* Top bar */}
            <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#F0EDE6", letterSpacing: "-0.01em" }}>{steps.find((s) => s.id === activeStep)?.label}</div>
                <div style={{ fontSize: 11, color: "rgba(240,237,230,0.3)", marginTop: 1 }}>{steps.find((s) => s.id === activeStep)?.sub}</div>
              </div>
              <button onClick={() => toggleConfig(activeStep)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit",
                background: configured.includes(activeStep) ? "rgba(110,231,183,0.1)" : "rgba(255,255,255,0.04)",
                color: configured.includes(activeStep) ? "#6ee7b7" : "rgba(240,237,230,0.3)",
                fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 5,
              }}>
                {configured.includes(activeStep) ? <><Icon name="check" size={12} /> Included</> : "Include in prompt"}
              </button>
            </div>

            {/* Content: options + preview */}
            <div style={{ flex: 1, display: "flex", gap: 12, padding: 14, overflowY: "auto", minHeight: 0 }}>
              <div style={{ flex: 1, borderRadius: 12, background: "rgba(26,31,46,0.3)", border: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,237,230,0.12)", fontSize: 12 }}>
                {steps.find((s) => s.id === activeStep)?.label} options
              </div>
              <div style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(240,237,230,0.15)", marginBottom: 5 }}>Live Preview</div>
                <div style={{ flex: 1 }}>
                  <EvolvingPreview configured={configured} />
                </div>
              </div>
            </div>

            {/* ── TERMINAL ── */}
            <div style={{ padding: "0 14px 14px" }}>
              <TerminalPrompt configured={configured} showInfo={showInfo} setShowInfo={setShowInfo} expanded={promptExpanded} setExpanded={setPromptExpanded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
