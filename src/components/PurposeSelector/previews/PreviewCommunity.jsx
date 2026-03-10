export default function PreviewCommunity({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 12);
  const gap = Math.round((m.gapScale || 1) * 10);
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap: gap, background: p.bg, fontFamily: bFont }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: fs(15), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>Feed</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Filter</div>
          <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>New Post</div>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: p.pinkBg, border: `1px solid ${p.pink}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(10), fontWeight: 700, color: p.pink }}>S</div>
        </div>
      </div>

      {/* Post cards */}
      {[
        { name: "Sarah Chen", time: "2m ago", text: "Just shipped the new onboarding flow — finally live!", hasImg: true, likes: 12, comments: 4, ibg: `${p.accent}30`, ic: p.accent },
        { name: "Mike Torres", time: "18m ago", text: "Anyone have thoughts on the new API changes?", hasImg: false, likes: 5, comments: 8, ibg: p.amberBg, ic: p.amber },
      ].map((post, pi) => (
        <div key={pi} style={{ borderRadius: cRad, background: cardBg, border: cardBorder, padding: pad, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: post.ibg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(10), fontWeight: 700, color: post.ic }}>{post.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: fs(10), fontWeight: 600, color: p.text }}>{post.name}</div>
              <div style={{ fontSize: fs(7), color: p.dim }}>{post.time}</div>
            </div>
          </div>
          <div style={{ fontSize: fs(9), color: p.muted, lineHeight: 1.5, marginBottom: post.hasImg ? 6 : 0 }}>{post.text}</div>
          {post.hasImg && <div style={{ height: 42, borderRadius: cRad, background: `linear-gradient(135deg,${p.accentBg},${p.greenBg})`, border: cardBorder, marginBottom: 4 }} />}
          <div style={{ display: "flex", gap: 12, marginTop: 6, paddingTop: 6, borderTop: cardBorder }}>
            {[{ ic: "heart", n: post.likes, a: pi === 0 }, { ic: "chat", n: post.comments }, { ic: "share", n: "Share" }].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: fs(9), color: a.a ? p.pink : p.dim, fontWeight: a.a ? 600 : 400 }}><svg width={fs(10)} height={fs(10)} viewBox="0 0 24 24" fill="none" stroke={a.a ? p.pink : p.dim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{a.ic === "heart" ? <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /> : a.ic === "chat" ? <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></> : <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></>}</svg>{a.n}</div>
            ))}
          </div>
        </div>
      ))}

      {/* Compose card */}
      <div style={{ borderRadius: cRad, background: cardBg, border: cardBorder, padding: pad, display: "flex", alignItems: "center", gap, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: p.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(9), fontWeight: 700, color: p.accent }}>Y</div>
        <div style={{ flex: 1, fontSize: fs(8), color: p.dim }}>What's on your mind?</div>
        <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Post</div>
      </div>
    </div>
  );
}
