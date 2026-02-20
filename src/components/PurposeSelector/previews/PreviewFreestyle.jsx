const BASE_PAD = 10;
const BASE_GAP = 6;

export default function PreviewFreestyle({ p, mood, cardCSS, buttonCSS }) {
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: bFont, overflow: "hidden" }}>
      {/* Mini nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${Math.round(pad * 0.8)}px ${Math.round(pad * 1.2)}px`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <div style={{ width: 18, height: 18, borderRadius: cRad, background: `linear-gradient(135deg, ${p.accent}, ${p.pink || p.accent})`, transition: tr }} />
          <div style={{ fontSize: fs(10), fontWeight: hWt, fontFamily: hFont, color: p.text }}>MyApp</div>
        </div>
        <div style={{ display: "flex", gap: Math.round(gap * 1.67) }}>
          {["Home", "Explore", "Create"].map((t) => (
            <div key={t} style={{ fontSize: fs(8), fontWeight: 500, color: t === "Home" ? p.accent : p.muted }}>{t}</div>
          ))}
        </div>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: p.accentBg, border: `1px solid ${p.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(8), fontWeight: 700, color: p.accent, transition: tr }}>A</div>
      </div>

      {/* Stat cards row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap, padding: `${Math.round(pad * 0.8)}px ${pad}px ${Math.round(pad * 0.4)}px` }}>
        {[
          { l: "Users", v: "2.4K", c: "+12%", cl: p.green },
          { l: "Revenue", v: "$18K", c: "+8%", cl: p.accent },
          { l: "Growth", v: "94%", c: "+3%", cl: p.amber },
        ].map((s) => (
          <div key={s.l} style={{ borderRadius: cRad, padding: `${Math.round(gap)}px ${Math.round(gap * 1.33)}px`, background: p.card, border: `1px solid ${p.border}`, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
            <div style={{ fontSize: fs(6), fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", color: p.dim }}>{s.l}</div>
            <div style={{ fontSize: fs(13), fontWeight: hWt, fontFamily: hFont, color: p.text, marginTop: 2 }}>{s.v}</div>
            <div style={{ fontSize: fs(7), fontWeight: 600, color: s.cl, marginTop: 1 }}>{s.c}</div>
          </div>
        ))}
      </div>

      {/* Middle row: chart + card */}
      <div style={{ display: "flex", gap, padding: `${Math.round(pad * 0.4)}px ${pad}px`, flex: 1, minHeight: 0 }}>
        {/* Mini bar chart */}
        <div style={{ flex: 3, borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.8), display: "flex", flexDirection: "column", boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
          <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: "uppercase", color: p.dim, marginBottom: gap }}>Activity</div>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: Math.round(gap * 0.5) }}>
            {[35, 55, 40, 70, 50, 80, 45, 65, 75, 90, 60, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: i >= 10 ? p.accent : `${p.accent}30`, transition: tr }} />
            ))}
          </div>
        </div>

        {/* Mini feed card */}
        <div style={{ flex: 2, borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.8), display: "flex", flexDirection: "column", gap, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
          <div style={{ fontSize: fs(7), fontWeight: 600, textTransform: "uppercase", color: p.dim }}>Recent</div>
          {[
            { name: "Design", color: p.accent },
            { name: "Deploy", color: p.green },
            { name: "Review", color: p.amber },
          ].map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: Math.round(gap * 0.83) }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: item.color, flexShrink: 0 }} />
              <div style={{ fontSize: fs(8), color: p.text, fontWeight: 500 }}>{item.name}</div>
              <div style={{ marginLeft: "auto", width: 24, height: 4, borderRadius: 2, background: `${item.color}30` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${Math.round(gap)}px ${pad}px ${Math.round(pad * 0.8)}px`, borderTop: `1px solid ${p.border}` }}>
        <div style={{ padding: `${Math.round(gap * 0.67)}px ${Math.round(pad * 1.2)}px`, borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Learn More</div>
        <div style={{ padding: `${Math.round(gap * 0.67)}px ${Math.round(pad * 1.2)}px`, borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Get Started</div>
      </div>
    </div>
  );
}
