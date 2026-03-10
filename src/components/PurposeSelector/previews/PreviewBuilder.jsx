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

  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", background: p.bg, fontFamily: bFont }}>
      {/* Tool sidebar */}
      <div style={{ width: 42, background: p.card, borderRight: cardBorder, padding: `${pad}px 5px`, display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(gap * 0.75), boxShadow: cShadow, transition: tr }}>
        {["□", "○", "△", "⬡", "T", "⊞"].map((t, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: cRad, background: i === 1 ? p.accentBg : p.bg, border: `1.5px solid ${i === 1 ? p.accent : p.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(11), color: i === 1 ? p.accent : p.dim, transition: tr }}>{t}</div>
        ))}
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${Math.round(gap * 0.75)}px ${pad}px`, borderBottom: cardBorder }}>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Undo</div>
            <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Redo</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Preview</div>
            <div style={{ padding: "3px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>Publish</div>
          </div>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, padding: pad, display: "flex", alignItems: "center", justifyContent: "center", background: p.surface }}>
          <div style={{ width: "78%", height: "78%", borderRadius: rad, border: `2px dashed ${p.accent}50`, padding: pad, display: "flex", flexDirection: "column", gap }}>
            <div style={{ width: "50%", height: 7, borderRadius: cRad, background: p.dim }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: Math.round(gap * 0.75), flex: 1 }}>
              <div style={{ borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.6), boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
                <div style={{ width: "60%", height: 5, borderRadius: 2, background: p.dim, marginBottom: 4 }} />
                <div style={{ width: "80%", height: 3, borderRadius: 2, background: `${p.dim}50` }} />
              </div>
              <div style={{ borderRadius: cRad, background: p.bg, border: `1px solid ${p.border}`, padding: Math.round(pad * 0.6), boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
                <div style={{ width: "45%", height: 5, borderRadius: 2, background: p.dim, marginBottom: 4 }} />
                <div style={{ width: "70%", height: 3, borderRadius: 2, background: `${p.dim}50` }} />
              </div>
              <div style={{ borderRadius: cRad, background: p.accentBg, border: `1.5px solid ${p.accent}50`, padding: Math.round(pad * 0.6), gridColumn: "1 / -1", boxShadow: cShadow, transition: tr, ...cBase, ...(cExtra || {}) }}>
                <div style={{ width: "35%", height: 5, borderRadius: 2, background: `${p.accent}60`, marginBottom: 4 }} />
                <div style={{ display: "flex", gap: 4 }}>
                  <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.accent, fontSize: fs(7), fontWeight: 700, color: "#fff", transition: tr, ...btnP }}>Save</div>
                  <div style={{ padding: "3px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Cancel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties panel */}
      <div style={{ width: 72, background: p.card, borderLeft: cardBorder, padding: Math.round(pad * 0.71), display: "flex", flexDirection: "column", gap, boxShadow: cShadow, transition: tr }}>
        <div style={{ fontSize: fs(8), fontWeight: hWt, fontFamily: hFont, textTransform: lblTx, letterSpacing: lblSp, color: p.dim }}>Properties</div>
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
