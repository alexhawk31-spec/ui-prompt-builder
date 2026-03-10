export default function PreviewData({ p, mood, cardCSS, buttonCSS, dataCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 10);
  const gap = Math.round((m.gapScale || 1) * 6);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const cRad = m.cardRadius ?? 8;
  const hFont = m.headFont || "'DM Sans',sans-serif";
  const bFont = m.bodyFont || "'DM Sans',sans-serif";
  const hWt = m.headWeight || 700;
  const cShadow = m.cardShadow || "none";
  const tr = m.transition || "all 0.2s";
  const lblTx = m.labelTransform || "uppercase";
  const lblSp = m.labelSpacing || "0.04em";
  const hIt = m.headItalic;
  const glass = m.glassCard;
  const glow = m.accentGlow;
  const gAlpha = m.glassAlpha || "ff";
  const gBlur = m.glassBlur || 0;
  const glowSz = m.glowSize || 0;
  const bdrW = m.borderWeight ?? 1;

  const cs = cardCSS || {};
  const { extra: cExtra, ...cBase } = cs;
  const bs = buttonCSS || {};
  const btnP = bs.primary || {};
  const btnS = bs.secondary || {};
  const ds = dataCSS || {};

  const cardBg = glass ? `${p.card}${gAlpha}` : p.card;
  const cardBlur = glass ? { backdropFilter: `blur(${gBlur}px)`, WebkitBackdropFilter: `blur(${gBlur}px)` } : {};
  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap: gap, background: p.bg, fontFamily: bFont }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
        <div style={{ fontSize: fs(15), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>Analytics</div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Filter</div>
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Share</div>
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Export</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: gap }}>
        {[{ l: "Revenue", v: "$2.4M", c: "+12.4%" }, { l: "Users", v: "18.2K", c: "+8.1%" }, { l: "Sessions", v: "142K", c: "+3.7%" }, { l: "Bounce", v: "24%", c: "-2.1%" }].map((s) => (
          <div key={s.l} style={{ borderRadius: cRad, padding: 8, background: cardBg, border: cardBorder, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
            <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim, marginBottom: 3 }}>{s.l}</div>
            <div style={{ fontSize: fs(14), fontWeight: 700, color: p.text, fontStyle: hIt ? "italic" : "normal", ...(ds.number || { fontFamily: "'JetBrains Mono',monospace" }) }}>{s.v}</div>
            <div style={{ fontSize: fs(8), fontWeight: 600, color: s.c.startsWith("+") ? p.green : p.red, marginTop: 2 }}>{s.c}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: cRad, background: cardBg, border: cardBorder, padding: pad, display: "flex", flexDirection: "column", minHeight: 0, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ fontSize: fs(8), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim }}>Performance</div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}><div style={{ width: 8, height: 3, borderRadius: Math.min(cRad, 2), background: p.green }} /><span style={{ fontSize: fs(7), color: p.muted }}>Revenue</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}><div style={{ width: 8, height: 3, borderRadius: Math.min(cRad, 2), background: `${p.green}60` }} /><span style={{ fontSize: fs(7), color: p.muted }}>Users</span></div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, minHeight: 0 }}>
          {[25, 40, 30, 55, 45, 65, 35, 50, 42, 62, 48, 72, 55, 80, 60, 85, 65, 92].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, justifyContent: "flex-end", height: "100%" }}>
              <div style={{ height: `${h * 0.4}%`, borderRadius: Math.min(cRad, 2), background: `${p.green}40` }} />
              <div style={{ height: `${h}%`, borderRadius: Math.min(cRad, 2), background: i >= 16 ? p.green : `${p.green}25`, boxShadow: i >= 16 && glow ? `0 0 ${Math.round(glowSz * 0.35)}px ${p.green}50` : "none" }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: cRad, background: cardBg, border: cardBorder, overflow: "hidden", boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr .8fr", padding: ds.rowPad || "6px 10px", borderBottom: cardBorder, background: p.surface, ...(ds.header || {}) }}>
          {["Page", "Views", "Bounce", "Time", ""].map((h) => (
            <div key={h || "x"} style={{ fontSize: fs(7), fontWeight: ds.header?.fontWeight || 700, textTransform: ds.header?.textTransform || lblTx, letterSpacing: ds.header?.letterSpacing || lblSp, color: ds.header?.color || p.dim }}>{h}</div>
          ))}
        </div>
        {[{ pg: "/dashboard", v: "12.4K", b: "18%", t: "4:32" }, { pg: "/pricing", v: "8.2K", b: "32%", t: "2:15" }, { pg: "/docs", v: "6.8K", b: "12%", t: "6:41" }].map((r, i) => (
          <div key={r.pg} style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr .8fr", padding: ds.rowPad || "5px 10px", borderBottom: i < 2 ? (ds.divider || `1px solid ${p.borderLight}`) : "none", alignItems: "center", background: ds.zebraStripe && i % 2 === 1 ? ds.zebraBg : "transparent" }}>
            <div style={{ fontSize: fs(9), color: p.text, fontWeight: 500 }}>{r.pg}</div>
            <div style={{ fontSize: fs(9), ...(ds.number || { color: p.muted, fontFamily: "'JetBrains Mono',monospace" }) }}>{r.v}</div>
            <div style={{ fontSize: fs(9), ...(ds.number || { color: p.muted, fontFamily: "'JetBrains Mono',monospace" }) }}>{r.b}</div>
            <div style={{ fontSize: fs(9), ...(ds.number || { color: p.muted, fontFamily: "'JetBrains Mono',monospace" }) }}>{r.t}</div>
            <div style={{ width: 18, height: 8, borderRadius: cRad > 4 ? 4 : 0, background: p.greenBg, border: `1px solid ${p.green}30` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
