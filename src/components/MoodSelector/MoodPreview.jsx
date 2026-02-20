import { useState } from "react";

export default function MoodPreview({ values }) {
  const [hov, setHov] = useState(null);
  const { density: d, typography: t, embellishment: e, interaction: inter } = values;
  const ac = "#818cf8";

  // DENSITY — dramatically different structure
  const pad = { spacious: 22, balanced: 14, compact: 8, dense: 5 }[d];
  const gap = { spacious: 14, balanced: 10, compact: 5, dense: 3 }[d];
  const headSz = { spacious: 24, balanced: 17, compact: 13, dense: 11 }[d];
  const statCols = { spacious: 2, balanced: 3, compact: 3, dense: 4 }[d];
  const valSz = { spacious: 24, balanced: 16, compact: 12, dense: 10 }[d];
  const lblSz = { spacious: 10, balanced: 8, compact: 6, dense: 5 }[d];
  const cardPd = { spacious: 16, balanced: 10, compact: 6, dense: 4 }[d];
  const barCt = { spacious: 7, balanced: 10, compact: 14, dense: 20 }[d];
  const barH = { spacious: 70, balanced: 48, compact: 30, dense: 22 }[d];
  const showChange = d !== "dense";
  const showNav = d === "compact" || d === "dense";
  const showTable = d === "compact" || d === "dense";
  const showTabs = d === "spacious" || d === "balanced";

  // TYPOGRAPHY
  const hFont = { clean: "'DM Sans',sans-serif", technical: "'JetBrains Mono',monospace", editorial: "Georgia,'Times New Roman',serif", rounded: "'Nunito','DM Sans',sans-serif" }[t];
  const bFont = { clean: "'DM Sans',sans-serif", technical: "'JetBrains Mono',monospace", editorial: "'DM Sans',sans-serif", rounded: "'Nunito','DM Sans',sans-serif" }[t];
  const hWt = { clean: 700, technical: 600, editorial: 400, rounded: 800 }[t];
  const vFont = { clean: "'DM Sans',sans-serif", technical: "'JetBrains Mono',monospace", editorial: "Georgia,serif", rounded: "'Nunito',sans-serif" }[t];
  const vWt = { clean: 700, technical: 500, editorial: 300, rounded: 800 }[t];
  const lblTx = { clean: "uppercase", technical: "uppercase", editorial: "capitalize", rounded: "none" }[t];
  const lblLs = { clean: ".06em", technical: ".1em", editorial: ".02em", rounded: ".01em" }[t];
  const hItalic = t === "editorial";
  const prefix = t === "technical" ? "> " : "";
  const titleText = t === "editorial" ? "The Dashboard" : t === "rounded" ? "Dashboard" : "Dashboard";

  // EMBELLISHMENT
  const rad = { none: 0, minimal: 6, moderate: 12, rich: 18 }[e];
  const cRad = { none: 0, minimal: 4, moderate: 10, rich: 14 }[e];
  const bgCol = { none: "#111318", minimal: "#0e1118", moderate: "#0c0f1a", rich: "#080c1a" }[e];
  const cBg = { none: "transparent", minimal: "rgba(255,255,255,0.025)", moderate: "rgba(255,255,255,0.04)", rich: "rgba(255,255,255,0.07)" }[e];
  const cBd = { none: "1px solid rgba(255,255,255,0.08)", minimal: "1px solid rgba(255,255,255,0.08)", moderate: `1px solid ${ac}18`, rich: `1px solid ${ac}30` }[e];
  const cSh = { none: "none", minimal: "0 1px 3px rgba(0,0,0,0.15)", moderate: "0 4px 16px rgba(0,0,0,0.25)", rich: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${ac}12, inset 0 1px 0 rgba(255,255,255,0.08)` }[e];
  const btnSh = { none: "none", minimal: "none", moderate: `0 2px 8px ${ac}25`, rich: `0 4px 20px ${ac}35, 0 0 40px ${ac}15` }[e];
  const showGrad = e === "rich" || e === "moderate";
  const showDots = e === "rich";
  const showGlow = e === "rich";

  // INTERACTION
  const tr = { subtle: "all 0.6s ease", smooth: "all 0.35s cubic-bezier(0.4,0,0.2,1)", snappy: "all 0.1s ease-out", dramatic: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)" }[inter];
  const hvScale = { subtle: 1, smooth: 1.015, snappy: 1.03, dramatic: 1.06 }[inter];
  const hvGlow = { subtle: "none", smooth: "none", snappy: `0 0 8px ${ac}20`, dramatic: `0 0 24px ${ac}40, 0 0 60px ${ac}15` }[inter];

  const stats = [
    { l: "Revenue", v: "$2.4M", c: "+12.4%" },
    { l: "Users", v: "18.2K", c: "+8.1%" },
    { l: "Latency", v: "42ms", c: "-3.2%" },
    { l: "Uptime", v: "99.9%", c: "+0.1%" },
  ].slice(0, statCols);

  const bars = Array.from({ length: barCt }, (_, i) => 30 + Math.sin(i * 0.7) * 20 + Math.cos(i * 1.2) * 25);

  const tableRows = [
    { name: "API Gateway", status: "Active", val: "1.2ms" },
    { name: "Auth Service", status: "Active", val: "3.4ms" },
    { name: "Data Pipeline", status: "Warn", val: "89ms" },
  ];

  return (
    <div style={{ background: bgCol, borderRadius: rad, height: "100%", padding: pad, fontFamily: bFont, overflow: "hidden", position: "relative", transition: tr }}>
      {showGrad && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: e === "rich" ? 140 : 80, background: `linear-gradient(180deg, ${ac}${e === "rich" ? "15" : "08"}, transparent)`, borderRadius: `${rad}px ${rad}px 0 0`, pointerEvents: "none" }} />}
      {showDots && <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", backgroundImage: `radial-gradient(${ac} 1px, transparent 1px)`, backgroundSize: "14px 14px" }} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: gap, position: "relative" }}>
        <div style={{ fontSize: headSz, fontWeight: hWt, color: "#F0EDE6", fontFamily: hFont, fontStyle: hItalic ? "italic" : "normal", letterSpacing: t === "technical" ? "-.03em" : "-.01em", transition: tr, lineHeight: 1 }}>
          {prefix}{titleText}
        </div>
        <div style={{ padding: `${d === "dense" ? 2 : 5}px ${d === "dense" ? 6 : 12}px`, borderRadius: cRad, background: e === "rich" ? `linear-gradient(135deg,${ac},#a78bfa)` : ac, color: bgCol, fontSize: d === "dense" ? 6 : 9, fontWeight: 700, fontFamily: bFont, boxShadow: btnSh, transition: tr, textTransform: t === "technical" ? "uppercase" : "none", letterSpacing: t === "technical" ? ".08em" : "0" }}>
          {t === "technical" ? "[NEW]" : "New"}
        </div>
      </div>

      {/* Tabs */}
      {showTabs && (
        <div style={{ display: "flex", gap: d === "spacious" ? 8 : 4, marginBottom: gap, position: "relative" }}>
          {(t === "editorial" ? ["Overview", "Insights", "Archive"] : ["Overview", "Analytics", "Settings"]).map((tab, i) => (
            <div key={tab} style={{ padding: `${d === "spacious" ? 7 : 4}px ${d === "spacious" ? 16 : 10}px`, borderRadius: e === "none" ? 0 : cRad, fontSize: d === "spacious" ? 11 : 9, fontWeight: i === 0 ? 700 : 400, fontFamily: t === "editorial" ? "Georgia,serif" : bFont, fontStyle: t === "editorial" && i === 0 ? "italic" : "normal", background: i === 0 ? (e === "none" ? "transparent" : `${ac}12`) : "transparent", color: i === 0 ? ac : "rgba(240,237,230,0.2)", borderBottom: e === "none" && i === 0 ? `2px solid ${ac}` : "none", transition: tr }}>{tab}</div>
          ))}
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${statCols},1fr)`, gap: d === "dense" ? 2 : gap, marginBottom: gap, position: "relative" }}>
        {stats.map((s, idx) => (
          <div key={s.l}
            onMouseEnter={() => setHov(idx)} onMouseLeave={() => setHov(null)}
            style={{ borderRadius: cRad, padding: cardPd, background: hov === idx ? `${ac}10` : cBg, border: hov === idx ? `1px solid ${ac}40` : cBd, boxShadow: hov === idx ? [cSh, hvGlow].filter((x) => x !== "none").join(",") : cSh, transition: tr, transform: hov === idx ? `scale(${hvScale})` : "scale(1)", cursor: "default" }}>
            <div style={{ fontSize: lblSz, fontWeight: 600, textTransform: lblTx, letterSpacing: lblLs, color: "rgba(240,237,230,0.3)", marginBottom: d === "dense" ? 0 : 3, fontFamily: bFont }}>{s.l}</div>
            <div style={{ fontSize: valSz, fontWeight: vWt, color: "#F0EDE6", fontFamily: vFont, lineHeight: 1.1, transition: tr }}>{s.v}</div>
            {showChange && <div style={{ fontSize: d === "spacious" ? 10 : 8, color: s.c.startsWith("+") ? "#34d399" : "#f87171", marginTop: d === "spacious" ? 6 : 2, fontFamily: "'JetBrains Mono',monospace", fontWeight: 500 }}>{s.c}</div>}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div style={{ display: "grid", gridTemplateColumns: showNav ? (d === "dense" ? "44px 1fr" : "60px 1fr") : "1fr", gap: d === "dense" ? 2 : gap, flex: 1, position: "relative" }}>
        {showNav && (
          <div style={{ borderRadius: cRad, padding: d === "dense" ? 3 : 6, background: cBg, border: cBd, boxShadow: cSh, display: "flex", flexDirection: "column", gap: d === "dense" ? 1 : 2 }}>
            {(d === "dense" ? ["Home", "Stats", "API", "Logs", "Team", "Cfg"] : ["Home", "Stats", "Reports", "Team"]).map((n, i) => (
              <div key={n} style={{ padding: `${d === "dense" ? 2 : 3}px ${d === "dense" ? 3 : 5}px`, borderRadius: Math.max(cRad - 2, 1), fontSize: d === "dense" ? 5 : 7, fontWeight: i === 0 ? 700 : 400, fontFamily: t === "technical" ? "'JetBrains Mono',monospace" : bFont, color: i === 0 ? ac : "rgba(240,237,230,0.15)", background: i === 0 ? `${ac}${showGlow ? "18" : "10"}` : "transparent", borderLeft: `2px solid ${i === 0 ? ac : "transparent"}`, transition: tr }}>
                {t === "technical" && i === 0 ? `> ${n}` : n}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: d === "dense" ? 2 : gap, minHeight: 0 }}>
          <div style={{ borderRadius: cRad, padding: d === "dense" ? 4 : 8, background: cBg, border: cBd, boxShadow: cSh, flex: showTable ? "none" : "1", height: showTable ? (d === "dense" ? 44 : 60) : undefined }}>
            <div style={{ fontSize: d === "dense" ? 4 : 7, fontWeight: 600, textTransform: lblTx, letterSpacing: lblLs, color: "rgba(240,237,230,0.15)", marginBottom: d === "dense" ? 2 : 4, fontFamily: bFont, fontStyle: t === "editorial" ? "italic" : "normal" }}>
              {t === "editorial" ? "Performance Trends" : t === "technical" ? "SYS::PERF_METRICS" : "Performance"}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: d === "dense" ? 1 : d === "spacious" ? 4 : 2, height: barH }}>
              {bars.map((h, i) => {
                const hi = i >= barCt - 2;
                return (
                  <div key={i} style={{ flex: 1, height: `${Math.min(h + 15, 95)}%`, borderRadius: e === "none" ? 0 : e === "rich" ? 6 : e === "moderate" ? 3 : 1, background: hi ? (e === "rich" ? `linear-gradient(180deg,${ac},#a78bfa)` : ac) : `${ac}${e === "none" ? "12" : "20"}`, boxShadow: hi && showGlow ? `0 0 10px ${ac}50` : "none", transition: tr }} />
                );
              })}
            </div>
          </div>

          {showTable && (
            <div style={{ borderRadius: cRad, overflow: "hidden", background: cBg, border: cBd, boxShadow: cSh }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 44px", padding: `${d === "dense" ? 2 : 4}px ${d === "dense" ? 4 : 6}px`, borderBottom: "1px solid rgba(255,255,255,0.04)", background: showGlow ? `${ac}06` : "transparent" }}>
                {["Service", "Status", "Latency"].map((h) => (
                  <div key={h} style={{ fontSize: d === "dense" ? 4 : 5, fontWeight: 700, textTransform: lblTx, letterSpacing: lblLs, color: "rgba(240,237,230,0.2)", fontFamily: bFont }}>{h}</div>
                ))}
              </div>
              {tableRows.map((row) => (
                <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr 52px 44px", padding: `${d === "dense" ? 1 : 3}px ${d === "dense" ? 4 : 6}px`, borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <div style={{ fontSize: d === "dense" ? 5 : 7, color: "rgba(240,237,230,0.45)", fontFamily: t === "technical" ? "'JetBrains Mono',monospace" : bFont }}>{row.name}</div>
                  <div style={{ fontSize: d === "dense" ? 4 : 6, fontWeight: 600, color: row.status === "Active" ? "#34d399" : "#fbbf24" }}>{row.status}</div>
                  <div style={{ fontSize: d === "dense" ? 5 : 6, color: "rgba(240,237,230,0.3)", fontFamily: "'JetBrains Mono',monospace" }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
