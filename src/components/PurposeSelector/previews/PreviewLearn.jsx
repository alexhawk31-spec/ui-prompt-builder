export default function PreviewLearn({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 16);
  const gap = Math.round((m.gapScale || 1) * 10);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const rad = m.radius ?? 10;
  const cRad = m.cardRadius ?? 8;
  const hFont = m.headFont || "'DM Sans',sans-serif";
  const bFont = m.bodyFont || "'DM Sans',sans-serif";
  const hWt = m.headWeight || 700;
  const cShadow = m.cardShadow || "none";
  const tr = m.transition || "all 0.2s";

  const cs = cardCSS || {};
  const { extra: cExtra, ...cBase } = cs;
  const bs = buttonCSS || {};
  const btnP = bs.primary || {};
  const btnS = bs.secondary || {};

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap, background: p.bg, fontFamily: bFont }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: fs(15), fontFamily: hFont, fontWeight: hWt, color: p.text }}>Getting Started</div>
        <div style={{ fontSize: fs(9), fontFamily: bFont, fontWeight: 600, color: p.muted }}>Step 2 of 5</div>
      </div>
      <div style={{ height: 6, borderRadius: rad, background: p.surface }}>
        <div style={{ width: "40%", height: "100%", borderRadius: rad, background: p.accent }} />
      </div>
      <div style={{ flex: 1, borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, padding: pad, display: "flex", flexDirection: "column", gap: Math.round(gap * 0.8), overflow: "hidden", boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
        <div style={{ width: "55%", height: 8, borderRadius: cRad / 2, background: p.dim }} />
        <div style={{ width: "92%", height: 4, borderRadius: cRad / 4, background: p.borderLight }} />
        <div style={{ width: "80%", height: 4, borderRadius: cRad / 4, background: p.borderLight }} />
        <div style={{ padding: Math.round(pad * 0.75), borderRadius: rad, background: p.accentBg, borderLeft: `3px solid ${p.accent}`, transition: tr }}>
          <div style={{ width: "65%", height: 5, borderRadius: cRad / 4, background: `${p.accent}80` }} />
          <div style={{ width: "45%", height: 4, borderRadius: cRad / 4, background: `${p.accent}50`, marginTop: 5 }} />
        </div>
        <div style={{ width: "88%", height: 4, borderRadius: cRad / 4, background: p.borderLight }} />
        <div style={{ borderRadius: rad, background: p.bg, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.625), marginTop: 2, boxShadow: cShadow, transition: tr }}>
          <div style={{ width: "40%", height: 5, borderRadius: cRad / 2, background: p.dim, marginBottom: 6 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(gap * 0.6) }}>
            <div style={{ height: 28, borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(9), fontFamily: bFont, fontWeight: 500, color: p.muted, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>Option A</div>
            <div style={{ height: 28, borderRadius: cRad, background: p.accentBg, border: `2px solid ${p.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(9), fontFamily: bFont, fontWeight: hWt, color: p.accent, boxShadow: cShadow, transition: tr }}>Option B ✓</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ padding: `${Math.round(pad * 0.5)}px ${pad}px`, borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(10), fontFamily: bFont, fontWeight: 600, color: p.muted, boxShadow: cShadow, transition: tr, ...btnS }}>Back</div>
        <div style={{ padding: `${Math.round(pad * 0.5)}px ${pad}px`, borderRadius: cRad, background: p.accent, fontSize: fs(10), fontFamily: bFont, fontWeight: hWt, color: "#fff", boxShadow: cShadow, transition: tr, ...btnP }}>Continue</div>
      </div>
    </div>
  );
}
