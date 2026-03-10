export default function PreviewPortfolio({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 12);
  const gap = Math.round((m.gapScale || 1) * 8);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const cRad = m.cardRadius ?? 8;
  const hFont = m.headFont || "'DM Sans',sans-serif";
  const bFont = m.bodyFont || "'DM Sans',sans-serif";
  const hWt = m.headWeight || 700;
  const cShadow = m.cardShadow || "none";
  const tr = m.transition || "all 0.2s";
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

  const cardBg = glass ? `${p.card}${gAlpha}` : p.card;
  const cardBlur = glass ? { backdropFilter: `blur(${gBlur}px)`, WebkitBackdropFilter: `blur(${gBlur}px)` } : {};
  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont }}>
      {/* Minimal nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${pad}px ${pad * 1.5}px` }}>
        <div style={{ fontSize: fs(12), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>Jane Doe</div>
        <div style={{ display: "flex", gap: pad, alignItems: "center" }}>
          {["Work", "About"].map((t, i) => (
            <div key={t} style={{ fontSize: fs(8), fontWeight: 500, color: i === 0 ? p.accent : p.muted }}>{t}</div>
          ))}
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Hire Me</div>
        </div>
      </div>

      {/* Project gallery — 2x2 grid */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap, padding: `0 ${pad * 1.5}px`, minHeight: 0 }}>
        {[
          { name: "Brand Identity", cat: "Design", bg: p.accentBg },
          { name: "Mobile App", cat: "Development", bg: p.greenBg },
          { name: "Dashboard UI", cat: "Product", bg: p.amberBg },
          { name: "Marketing Site", cat: "Web", bg: p.blueBg },
        ].map((proj) => (
          <div key={proj.name} style={{ borderRadius: cRad, overflow: "hidden", background: cardBg, border: cardBorder, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
            <div style={{ height: "60%", background: proj.bg, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 6, left: 8, padding: "2px 8px", borderRadius: 4, background: `${p.bg}cc`, fontSize: fs(6), fontWeight: 600, color: p.accent }}>{proj.cat}</div>
            </div>
            <div style={{ padding: `${gap}px ${gap * 1.2}px` }}>
              <div style={{ fontSize: fs(10), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>{proj.name}</div>
              <div style={{ width: "75%", height: 3, borderRadius: 2, background: `${p.dim}40`, marginTop: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${pad}px`, gap, borderTop: cardBorder }}>
        <div style={{ padding: `4px ${pad}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>View Resume</div>
        <div style={{ padding: `4px ${pad}px`, borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Say Hello</div>
        <div style={{ padding: `4px ${pad}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Download CV</div>
      </div>
    </div>
  );
}
