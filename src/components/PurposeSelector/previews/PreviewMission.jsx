export default function PreviewMission({ p, mood, cardCSS, buttonCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 10);
  const gap = Math.round((m.gapScale || 1) * 6);
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
        <div style={{ fontSize: fs(15), fontWeight: hWt, fontFamily: hFont, color: p.text }}>Sprint 24</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Add Task</div>
          <div style={{ padding: "4px 10px", borderRadius: rad, background: p.redBg, border: `1px solid ${p.red}30`, fontSize: fs(8), fontWeight: 600, color: p.red }}>7 days left</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {[{ l: "To Do", n: 4, bg: p.surface, c: p.muted }, { l: "In Progress", n: 3, bg: p.accentBg, c: p.accent }, { l: "Review", n: 2, bg: p.amberBg, c: p.amber }, { l: "Done", n: 7, bg: p.greenBg, c: p.green }].map((s) => (
          <div key={s.l} style={{ flex: 1, padding: "5px 8px", borderRadius: rad, background: s.bg, display: "flex", alignItems: "center", justifyContent: "space-between", transition: tr }}>
            <div style={{ fontSize: fs(7), fontWeight: 600, color: s.c }}>{s.l}</div>
            <div style={{ fontSize: fs(9), fontWeight: 700, color: s.c }}>{s.n}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", gap: gap, minHeight: 0 }}>
        {[
          { title: "To Do", cards: [{ t: "API auth", a: "SC", p: "high" }, { t: "Error states", a: "MT", p: "med" }, { t: "Tests", a: "", p: "low" }] },
          { title: "In Progress", cards: [{ t: "Dashboard v2", a: "SC", p: "high", active: true }, { t: "Search", a: "JL", p: "med" }] },
          { title: "Done", cards: [{ t: "Onboarding", a: "MT", p: "med" }, { t: "Dark mode", a: "SC", p: "low" }, { t: "Export", a: "JL", p: "low" }] },
        ].map((col) => (
          <div key={col.title} style={{ flex: 1, borderRadius: rad, background: p.surface, border: `1px solid ${p.border}`, padding: gap, display: "flex", flexDirection: "column", gap: 4, overflow: "hidden", boxShadow: cShadow, transition: tr }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
              <div style={{ fontSize: fs(7), fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: p.dim }}>{col.title}</div>
              <div style={{ padding: "1px 5px", borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.dim, transition: tr, ...btnS }}>+</div>
            </div>
            {col.cards.map((card) => (
              <div key={card.t} style={{ borderRadius: cRad, padding: 8, background: card.active ? p.accentBg : p.bg, border: `1.5px solid ${card.active ? p.accent : p.border}`, flexShrink: 0, boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
                <div style={{ fontSize: fs(9), fontWeight: 600, color: p.text, marginBottom: 4 }}>{card.t}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {card.a && <div style={{ width: 16, height: 16, borderRadius: "50%", background: card.active ? `${p.accent}30` : p.surface, fontSize: fs(6), fontWeight: 700, color: card.active ? p.accent : p.dim, display: "flex", alignItems: "center", justifyContent: "center" }}>{card.a}</div>}
                  <div style={{ padding: "2px 6px", borderRadius: 4, fontSize: fs(7), fontWeight: 600, background: card.p === "high" ? p.redBg : card.p === "med" ? p.amberBg : p.surface, color: card.p === "high" ? p.red : card.p === "med" ? p.amber : p.dim }}>{card.p}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
