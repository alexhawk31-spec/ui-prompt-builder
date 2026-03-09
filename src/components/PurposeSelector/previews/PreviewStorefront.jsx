export default function PreviewStorefront({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 12);
  const gap = Math.round((m.gapScale || 1) * 8);
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont }}>
      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${Math.round(gap)}px ${pad}px`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ fontSize: fs(11), fontWeight: hWt, fontFamily: hFont, color: p.text }}>Acme</div>
        <div style={{ display: "flex", gap: pad }}>
          {["Features", "Pricing"].map((t) => (
            <div key={t} style={{ fontSize: fs(8), fontWeight: 500, color: p.muted }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Log In</div>
          <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Sign Up</div>
        </div>
      </div>

      {/* Hero section */}
      <div style={{ flex: 2, background: `linear-gradient(135deg, ${p.accentBg}, ${p.gradA})`, display: "flex", flexDirection: "column", justifyContent: "center", padding: pad * 1.5, gap: gap * 0.5 }}>
        <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: "uppercase", letterSpacing: ".12em", color: p.accent }}>Launch Day</div>
        <div style={{ fontSize: fs(18), fontWeight: hWt, fontFamily: hFont, color: p.text, lineHeight: 1.2 }}>Ship faster,<br />build better.</div>
        <div style={{ width: "80%", height: 4, borderRadius: rad, background: `${p.dim}40`, marginTop: 2 }} />
        <div style={{ display: "flex", gap, marginTop: gap }}>
          <div style={{ padding: `${gap}px ${pad}px`, borderRadius: cRad, background: p.accent, fontSize: fs(9), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Get Started Free</div>
          <div style={{ padding: `${gap}px ${pad}px`, borderRadius: cRad, background: "transparent", border: `1px solid ${p.border}`, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>See Demo</div>
        </div>
      </div>

      {/* Social proof bar */}
      <div style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${p.border}`, borderBottom: `1px solid ${p.border}`, display: "flex", alignItems: "center", justifyContent: "center", gap: pad }}>
        {["10K+ users", "4.9 ★", "99.9% uptime"].map((t) => (
          <div key={t} style={{ fontSize: fs(8), fontWeight: 600, color: p.dim }}>{t}</div>
        ))}
      </div>

      {/* Feature cards */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap, padding: pad }}>
        {[
          { icon: "zap", title: "Fast", desc: "Sub-50ms responses" },
          { icon: "shield", title: "Secure", desc: "Enterprise-grade" },
          { icon: "barChart", title: "Insights", desc: "Real-time analytics" },
        ].map((f) => (
          <div key={f.title} style={{ borderRadius: cRad, padding: gap, background: p.card, border: `1px solid ${p.border}`, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
            <div style={{ marginBottom: 4, display: "flex", alignItems: "center" }}><svg width={fs(14)} height={fs(14)} viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon === "zap" ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> : f.icon === "shield" ? <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> : <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>}</svg></div>
            <div style={{ fontSize: fs(10), fontWeight: hWt, fontFamily: hFont, color: p.text }}>{f.title}</div>
            <div style={{ fontSize: fs(7), color: p.muted, marginTop: 2 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${gap}px ${pad}px`, gap: 4, borderTop: `1px solid ${p.border}` }}>
        <div style={{ padding: `4px ${pad}px`, borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Contact Sales</div>
        <div style={{ padding: `4px ${pad}px`, borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Start Free Trial</div>
      </div>
    </div>
  );
}
