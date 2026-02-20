export default function PreviewDiscover({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 12);
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap: gap, background: p.bg, fontFamily: bFont }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: fs(15), fontWeight: hWt, fontFamily: hFont, color: p.text }}>Explore</div>
        <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Search</div>
      </div>
      <div style={{ height: 30, borderRadius: 15, background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", paddingLeft: 12, gap: 6, boxShadow: cShadow, transition: tr }}>
        <div style={{ width: 13, height: 13, borderRadius: "50%", border: `1.5px solid ${p.dim}` }} />
        <div style={{ fontSize: fs(9), color: p.dim }}>Search anything...</div>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        {["All", "Popular", "New", "Trending"].map((f, i) => (
          <div key={f} style={{ padding: "4px 10px", borderRadius: rad, fontSize: fs(8), fontWeight: 600, background: i === 0 ? p.orange : p.tagBg, color: i === 0 ? "#fff" : p.muted, border: `1px solid ${i === 0 ? p.orange : p.border}`, transition: tr }}>{f}</div>
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, overflow: "hidden" }}>
        {[{ n: "Alpine Retreat", pr: "$240/night", r: "4.9", bg: p.blueBg }, { n: "City Loft", pr: "$180/night", r: "4.7", bg: p.amberBg }, { n: "Beach House", pr: "$320/night", r: "4.8", bg: p.greenBg }, { n: "Mountain View", pr: "$195/night", r: "4.6", bg: p.accentBg }].map((item, i) => (
          <div key={item.n} style={{ borderRadius: cRad, overflow: "hidden", background: p.card, border: `1px solid ${p.border}`, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
            <div style={{ height: 40, background: item.bg }} />
            <div style={{ padding: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <div style={{ fontSize: fs(9), fontWeight: 600, color: p.text }}>{item.n}</div>
                <div style={{ fontSize: fs(7), color: p.amber, fontWeight: 600 }}>★ {item.r}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: fs(8), color: p.muted }}>{item.pr}</div>
                <div style={{ padding: "2px 8px", borderRadius: cRad, background: i < 2 ? p.accent : p.surface, border: i < 2 ? "none" : `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: i < 2 ? "#fff" : p.muted, transition: tr, ...(i < 2 ? btnP : btnS) }}>Book</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
