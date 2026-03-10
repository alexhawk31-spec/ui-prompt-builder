export default function PreviewKeynote({ p, mood, cardCSS, buttonCSS, dataCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 14);
  const gap = Math.round((m.gapScale || 1) * 8);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const rad = m.radius ?? 10;
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${gap}px ${pad}px`, borderBottom: cardBorder }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Edit</div>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Theme</div>
        </div>
        <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Present</div>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: pad * 1.5, textAlign: "center", gap }}>
        <div style={{ fontSize: fs(8), fontWeight: 600, textTransform: lblTx, letterSpacing: ".15em", color: p.accent }}>Slide 3 of 12</div>
        <div style={{ fontSize: fs(20), fontWeight: hWt, fontFamily: hFont, color: p.text, lineHeight: 1.2, fontStyle: hIt ? "italic" : "normal" }}>The Big Idea</div>
        <div style={{ width: "70%", height: 4, borderRadius: rad, background: `${p.dim}60`, marginTop: 2 }} />
        <div style={{ width: "50%", height: 4, borderRadius: rad, background: `${p.dim}30` }} />
        <div style={{ marginTop: gap, display: "flex", gap }}>
          {["$4.2B", "340%", "12M+"].map((v, i) => (
            <div key={v} style={{ padding: `${gap}px ${pad}px`, borderRadius: cRad, background: cardBg, border: cardBorder, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
              <div style={{ fontSize: fs(14), fontWeight: hWt, fontFamily: hFont, color: i === 0 ? p.accent : p.text, fontStyle: hIt ? "italic" : "normal", ...(ds.number || {}) }}>{v}</div>
              <div style={{ fontSize: fs(7), color: p.muted, marginTop: 2 }}>{["Market Size", "Growth", "Users"][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${gap}px ${pad}px`, borderTop: cardBorder }}>
        <div style={{ padding: `4px ${pad * 0.8}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>← Previous</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} style={{ width: n === 3 ? 16 : 6, height: 6, borderRadius: 3, background: n === 3 ? p.accent : `${p.dim}40`, transition: tr }} />
          ))}
        </div>
        <div style={{ padding: `4px ${pad * 0.8}px`, borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Next →</div>
      </div>
    </div>
  );
}
