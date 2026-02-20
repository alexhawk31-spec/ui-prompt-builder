const BASE_PAD = 14;
const BASE_GAP = 8;

export default function PreviewBuilder({ p, mood, cardCSS, buttonCSS }) {
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
    <div style={{ height: "100%", display: "flex", background: p.bg, fontFamily: bFont }}>
      <div style={{ width: 42, background: p.card, borderRight: `1px solid ${p.border}`, padding: `${pad}px 5px`, display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(gap * 0.75), boxShadow: cShadow, transition: tr }}>
        {["□", "○", "△", "⬡", "T", "⊞"].map((t, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: cRad, background: i === 1 ? p.blueBg : p.bg, border: `1.5px solid ${i === 1 ? p.blue : p.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(11), color: i === 1 ? p.blue : p.dim, transition: tr }}>{t}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: pad, display: "flex", alignItems: "center", justifyContent: "center", background: p.surface }}>
        <div style={{ width: "78%", height: "72%", borderRadius: rad, border: `2px dashed ${p.blue}50`, padding: pad, display: "flex", flexDirection: "column", gap }}>
          <div style={{ width: "50%", height: 7, borderRadius: cRad, background: p.dim }} />
          <div style={{ flex: 1, borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.71), boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(gap * 0.75), height: "100%" }}>
              <div style={{ borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, transition: tr }} />
              <div style={{ borderRadius: cRad, background: p.blueBg, border: `1.5px solid ${p.blue}50`, transition: tr }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: Math.round(gap * 0.75) }}>
            <div style={{ padding: `6px ${pad}px`, borderRadius: cRad, background: p.blue, fontSize: fs(9), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Save</div>
            <div style={{ padding: `6px ${pad}px`, borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(9), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Preview</div>
          </div>
        </div>
      </div>
      <div style={{ width: 72, background: p.card, borderLeft: `1px solid ${p.border}`, padding: Math.round(pad * 0.71), display: "flex", flexDirection: "column", gap, boxShadow: cShadow, transition: tr }}>
        <div style={{ fontSize: fs(8), fontWeight: hWt, fontFamily: hFont, textTransform: "uppercase", letterSpacing: ".04em", color: p.dim }}>Properties</div>
        {[{ l: "Width", v: "320px" }, { l: "Height", v: "auto" }, { l: "Color" }, { l: "Radius", v: "12px" }].map((pr) => (
          <div key={pr.l}>
            <div style={{ fontSize: fs(7), color: p.dim, marginBottom: 3, fontWeight: 500 }}>{pr.l}</div>
            <div style={{ height: 20, borderRadius: cRad, background: p.inputBg, border: `1px solid ${p.inputBorder}`, paddingLeft: 7, display: "flex", alignItems: "center", fontSize: fs(8), color: p.text, transition: tr }}>{pr.v || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
