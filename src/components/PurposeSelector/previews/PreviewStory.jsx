const BASE_PAD = 24;
const BASE_GAP = 8;

export default function PreviewStory({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const rad = m.radius ?? 10;
  const cRad = m.cardRadius ?? 8;
  const hFont = m.headFont || "'DM Sans',sans-serif";
  const bFont = m.bodyFont || "'DM Sans',sans-serif";
  const hWt = m.headWeight || 700;
  const cShadow = m.cardShadow || "none";
  const tr = m.transition || "all 0.2s";
  const pad = Math.round((m.padScale || 1) * BASE_PAD);
  const gap = Math.round((m.gapScale || 1) * BASE_GAP);

  const cs = cardCSS || {};
  const { extra: cExtra, ...cBase } = cs;
  const bs = buttonCSS || {};
  const btnP = bs.primary || {};
  const btnS = bs.secondary || {};

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont }}>
      <div style={{ flex: 2, background: `linear-gradient(160deg, ${p.amberBg}, ${p.gradA})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: pad, gap, boxShadow: cShadow, transition: tr }}>
        <div style={{ fontSize: fs(9), fontWeight: hWt, fontFamily: hFont, textTransform: "uppercase", letterSpacing: ".1em", color: p.amber }}>Introducing</div>
        <div style={{ width: "65%", height: 10, borderRadius: rad, background: p.dim }} />
        <div style={{ width: "40%", height: 5, borderRadius: cRad, background: `${p.dim}80` }} />
        <div style={{ padding: `${Math.round(gap)}px ${Math.round(pad * 0.92)}px`, borderRadius: rad * 2, background: p.amber, color: "#fff", fontSize: fs(10), fontWeight: 700, marginTop: 6, transition: tr, ...btnP }}>Get Started</div>
      </div>
      <div style={{ flex: 1, padding: Math.round(pad * 0.67), display: "flex", gap: Math.round(gap * 1.5) }}>
        {[{ t: "Fast" }, { t: "Secure" }, { t: "Simple" }].map((f) => (
          <div key={f.t} style={{ flex: 1, display: "flex", flexDirection: "column", gap: Math.round(gap * 0.625) }}>
            <div style={{ width: 28, height: 28, borderRadius: rad, background: p.amberBg, border: `1px solid ${p.amber}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(12), color: p.amber, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>✦</div>
            <div style={{ fontSize: fs(11), fontWeight: hWt, fontFamily: hFont, color: p.text }}>{f.t}</div>
            <div style={{ fontSize: fs(9), color: p.muted, lineHeight: 1.4 }}>Built for the modern web</div>
          </div>
        ))}
      </div>
      <div style={{ height: 44, background: p.surface, display: "flex", alignItems: "center", justifyContent: "center", gap, borderTop: `1px solid ${p.border}`, transition: tr }}>
        <div style={{ padding: `6px ${Math.round(pad * 0.58)}px`, borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Learn More</div>
        <div style={{ padding: `6px ${Math.round(pad * 0.58)}px`, borderRadius: cRad, background: p.amber, fontSize: fs(9), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Sign Up Free</div>
      </div>
    </div>
  );
}
