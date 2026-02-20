export default function PreviewCommunity({ p, mood, cardCSS, buttonCSS }) {
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

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap: gap, background: p.bg, fontFamily: bFont }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: fs(15), fontWeight: hWt, fontFamily: hFont, color: p.text }}>Feed</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>New Post</div>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.pinkBg, border: `1px solid ${p.pink}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(10), fontWeight: 700, color: p.pink }}>S</div>
        </div>
      </div>
      {[
        { name: "Sarah Chen", time: "2m ago", text: "Just shipped the new onboarding flow — three weeks and it's finally live!", hasImg: true, likes: 12, comments: 4, ibg: `${p.accent}30`, ic: p.accent },
        { name: "Mike Torres", time: "18m ago", text: "Anyone have thoughts on the new API changes? Found some edge cases.", hasImg: false, likes: 5, comments: 8, ibg: p.amberBg, ic: p.amber },
      ].map((post, pi) => (
        <div key={pi} style={{ borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, padding: pad, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: post.ibg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(11), fontWeight: 700, color: post.ic }}>{post.name[0]}</div>
            <div>
              <div style={{ fontSize: fs(10), fontWeight: 600, color: p.text }}>{post.name}</div>
              <div style={{ fontSize: fs(7), color: p.dim }}>{post.time}</div>
            </div>
          </div>
          <div style={{ fontSize: fs(9), color: p.muted, lineHeight: 1.6, marginBottom: post.hasImg ? 8 : 0 }}>{post.text}</div>
          {post.hasImg && <div style={{ height: 50, borderRadius: cRad, background: `linear-gradient(135deg,${p.accentBg},${p.greenBg})`, border: `1px solid ${p.border}`, marginBottom: 4 }} />}
          <div style={{ display: "flex", gap: 14, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${p.borderLight}` }}>
            {[{ ic: "♡", n: post.likes, a: pi === 0 }, { ic: "💬", n: post.comments }, { ic: "↗", n: "Share" }].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: fs(9), color: a.a ? p.pink : p.dim, fontWeight: a.a ? 600 : 400 }}><span style={{ fontSize: fs(11) }}>{a.ic}</span>{a.n}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
