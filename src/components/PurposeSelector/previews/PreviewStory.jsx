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

  const cardBg = glass ? `${p.card}${gAlpha}` : p.card;
  const cardBlur = glass ? { backdropFilter: `blur(${gBlur}px)`, WebkitBackdropFilter: `blur(${gBlur}px)` } : {};
  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont }}>
      {/* Hero */}
      <div style={{ flex: 2, background: `linear-gradient(160deg, ${p.accentBg}, ${p.gradA})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: pad, gap, boxShadow: cShadow, transition: tr }}>
        <div style={{ fontSize: fs(9), fontWeight: hWt, fontFamily: hFont, textTransform: lblTx, letterSpacing: ".1em", color: p.accent }}>Introducing</div>
        <div style={{ width: "65%", height: 10, borderRadius: rad, background: p.dim }} />
        <div style={{ width: "40%", height: 5, borderRadius: cRad, background: `${p.dim}80` }} />
        <div style={{ display: "flex", gap, marginTop: 6 }}>
          <div style={{ padding: `${Math.round(gap)}px ${Math.round(pad * 0.92)}px`, borderRadius: rad * 2, background: p.accent, color: "#fff", fontSize: fs(10), fontWeight: 700, transition: tr, boxShadow: accentShadow, ...btnP }}>Get Started</div>
          <div style={{ padding: `${Math.round(gap)}px ${Math.round(pad * 0.92)}px`, borderRadius: rad * 2, background: "transparent", border: cardBorder, color: p.muted, fontSize: fs(10), fontWeight: 600, transition: tr, ...btnS }}>Watch Demo</div>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ flex: 1, padding: Math.round(pad * 0.67), display: "flex", gap: Math.round(gap * 1.5) }}>
        {[{ t: "Fast", icon: "zap" }, { t: "Secure", icon: "shield" }, { t: "Simple", icon: "target" }].map((f) => (
          <div key={f.t} style={{ flex: 1, borderRadius: cRad, padding: Math.round(gap * 1.2), background: cardBg, border: cardBorder, display: "flex", flexDirection: "column", gap: Math.round(gap * 0.625), boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
            <div style={{ width: 28, height: 28, borderRadius: cRad, background: p.accentBg, border: `1px solid ${p.accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width={fs(12)} height={fs(12)} viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon === "zap" ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> : f.icon === "shield" ? <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> : <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>}</svg></div>
            <div style={{ fontSize: fs(11), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>{f.t}</div>
            <div style={{ fontSize: fs(9), color: p.muted, lineHeight: 1.4 }}>Built for the modern web</div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ background: p.surface, display: "flex", alignItems: "center", justifyContent: "center", gap, padding: `${Math.round(gap * 1.2)}px ${pad}px`, borderTop: cardBorder, transition: tr }}>
        <div style={{ padding: `6px ${Math.round(pad * 0.58)}px`, borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Learn More</div>
        <div style={{ padding: `6px ${Math.round(pad * 0.58)}px`, borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Pricing</div>
        <div style={{ padding: `6px ${Math.round(pad * 0.58)}px`, borderRadius: cRad, background: p.accent, fontSize: fs(9), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Sign Up Free</div>
      </div>
    </div>
  );
}
