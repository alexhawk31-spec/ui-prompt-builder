export default function PreviewLearn({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 14);
  const gap = Math.round((m.gapScale || 1) * 8);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const rad = m.radius ?? 10;
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: pad, gap, background: p.bg, fontFamily: bFont }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: fs(15), fontFamily: hFont, fontWeight: hWt, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>Getting Started</div>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Skip</div>
          <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Next</div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, height: 5, borderRadius: rad, background: p.surface }}>
          <div style={{ width: "40%", height: "100%", borderRadius: rad, background: p.accent }} />
        </div>
        <div style={{ fontSize: fs(8), fontWeight: 600, color: p.dim }}>Step 2/5</div>
      </div>

      {/* Lesson cards */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap, minHeight: 0, overflow: "hidden" }}>
        {[
          { icon: "book", title: "Introduction", desc: "Learn the basics of the platform", done: true },
          { icon: "zap", title: "Quick Setup", desc: "Configure your workspace settings", active: true },
          { icon: "palette", title: "Customization", desc: "Personalize your experience" },
        ].map((lesson) => (
          <div key={lesson.title} style={{
            flex: 1,
            borderRadius: cRad,
            padding: pad,
            background: lesson.active ? (glass ? `${p.accentBg}${gAlpha}` : p.accentBg) : cardBg,
            border: `${Math.max(bdrW, 1)}px solid ${lesson.active ? p.accent : p.border}`,
            display: "flex",
            alignItems: "center",
            gap: gap * 1.2,
            boxShadow: lesson.active && glow ? `0 0 ${Math.round(glowSz * 0.5)}px ${p.accent}30` : cShadow,
            transition: tr,
            ...cardBlur,
            ...cBase,
            ...(cExtra || {}),
          }}>
            <div style={{ width: 30, height: 30, borderRadius: cRad, background: lesson.done ? p.greenBg : lesson.active ? `${p.accent}20` : p.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {lesson.done ? (
                <svg width={fs(13)} height={fs(13)} viewBox="0 0 24 24" fill="none" stroke={p.green || "#34d399"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width={fs(13)} height={fs(13)} viewBox="0 0 24 24" fill="none" stroke={lesson.active ? p.accent : p.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{lesson.icon === "book" ? <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> : lesson.icon === "zap" ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> : <><circle cx="12" cy="12" r="10" /><path d="M12 2a7 7 0 0 0-7 7" /><circle cx="12" cy="12" r="3" /></>}</svg>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: fs(11), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>{lesson.title}</div>
              <div style={{ fontSize: fs(8), color: p.muted, marginTop: 2 }}>{lesson.desc}</div>
            </div>
            {lesson.active && (
              <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", flexShrink: 0, transition: tr, boxShadow: accentShadow, ...btnP }}>Start</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: gap * 0.5 }}>
        <div style={{ padding: `${Math.round(pad * 0.4)}px ${pad}px`, borderRadius: cRad, background: p.surface, border: cardBorder, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Save for Later</div>
        <div style={{ padding: `${Math.round(pad * 0.4)}px ${pad}px`, borderRadius: cRad, background: p.accent, fontSize: fs(9), fontWeight: hWt, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Complete Lesson</div>
      </div>
    </div>
  );
}
