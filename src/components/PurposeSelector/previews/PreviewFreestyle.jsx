const BASE_PAD = 10;
const BASE_GAP = 6;

export default function PreviewFreestyle({ p, mood, cardCSS, buttonCSS, dataCSS }) {
  const m = mood || {};
  const fs = (base) => Math.round((m.fontScale || 1) * base);
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
  const ds = dataCSS || {};

  // Glass card overrides
  const cardBg = glass ? `${p.card}${gAlpha}` : p.card;
  const cardBlur = glass ? { backdropFilter: `blur(${gBlur}px)`, WebkitBackdropFilter: `blur(${gBlur}px)` } : {};
  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont, overflow: "hidden" }}>
      {/* Mini nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${Math.round(pad * 0.8)}px ${Math.round(pad * 1.2)}px`, borderBottom: cardBorder }}>
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <div style={{ width: 18, height: 18, borderRadius: cRad, background: `linear-gradient(135deg, ${p.accent}, ${p.pink || p.accent})`, transition: tr, boxShadow: accentShadow }} />
          <div style={{ fontSize: fs(10), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>MyApp</div>
        </div>
        <div style={{ display: "flex", gap: Math.round(gap * 1.67) }}>
          {["Home", "Explore", "Create"].map((t) => (
            <div key={t} style={{ fontSize: fs(8), fontWeight: 500, color: t === "Home" ? p.accent : p.muted, letterSpacing: lblSp }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Sign In</div>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Sign Up</div>
        </div>
      </div>

      {/* Stat cards row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap, padding: `${Math.round(pad * 0.8)}px ${pad}px ${Math.round(pad * 0.4)}px` }}>
        {[
          { l: "Users", v: "2.4K", c: "+12%", cl: p.green },
          { l: "Revenue", v: "$18K", c: "+8%", cl: p.accent },
          { l: "Growth", v: "94%", c: "+3%", cl: p.amber },
        ].map((s) => (
          <div key={s.l} style={{ borderRadius: cRad, padding: `${Math.round(gap)}px ${Math.round(gap * 1.33)}px`, background: cardBg, border: cardBorder, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
            <div style={{ fontSize: fs(6), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim }}>{s.l}</div>
            <div style={{ fontSize: fs(13), fontWeight: hWt, fontFamily: hFont, color: p.text, marginTop: 2, fontStyle: hIt ? "italic" : "normal", ...(ds.number || {}) }}>{s.v}</div>
            <div style={{ fontSize: fs(7), fontWeight: 600, color: s.cl, marginTop: 1 }}>{s.c}</div>
          </div>
        ))}
      </div>

      {/* Middle row: chart + card */}
      <div style={{ display: "flex", gap, padding: `${Math.round(pad * 0.4)}px ${pad}px`, flex: 1, minHeight: 0 }}>
        {/* Mini bar chart */}
        <div style={{ flex: 3, borderRadius: cRad, background: cardBg, border: cardBorder, padding: Math.round(pad * 0.8), display: "flex", flexDirection: "column", boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
          <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim, marginBottom: gap, ...(ds.header || {}) }}>Activity</div>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: Math.round(gap * 0.5) }}>
            {[35, 55, 40, 70, 50, 80, 45, 65, 75, 90, 60, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: Math.min(cRad, 3), background: i >= 10 ? p.accent : `${p.accent}30`, transition: tr, boxShadow: i >= 10 && glow ? `0 0 ${Math.round(glowSz * 0.35)}px ${p.accent}50` : "none" }} />
            ))}
          </div>
        </div>

        {/* Mini feed card */}
        <div style={{ flex: 2, borderRadius: cRad, background: cardBg, border: cardBorder, padding: Math.round(pad * 0.8), display: "flex", flexDirection: "column", gap, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
          <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim }}>Recent</div>
          {[
            { name: "Design", color: p.accent },
            { name: "Deploy", color: p.green },
            { name: "Review", color: p.amber },
          ].map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: Math.round(gap * 0.83) }}>
              <div style={{ width: 6, height: 6, borderRadius: cRad > 4 ? 3 : 0, background: item.color, flexShrink: 0, boxShadow: glow ? `0 0 4px ${item.color}60` : "none" }} />
              <div style={{ fontSize: fs(8), color: p.text, fontWeight: 500, fontFamily: bFont }}>{item.name}</div>
              <div style={{ marginLeft: "auto", width: 24, height: 4, borderRadius: Math.min(cRad, 2), background: `${item.color}30` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${Math.round(gap)}px ${pad}px ${Math.round(pad * 0.8)}px`, borderTop: cardBorder, gap: 4 }}>
        <div style={{ padding: `${Math.round(gap * 0.67)}px ${Math.round(pad * 1.2)}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Docs</div>
        <div style={{ padding: `${Math.round(gap * 0.67)}px ${Math.round(pad * 1.2)}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Learn More</div>
        <div style={{ padding: `${Math.round(gap * 0.67)}px ${Math.round(pad * 1.2)}px`, borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Get Started</div>
      </div>
    </div>
  );
}
