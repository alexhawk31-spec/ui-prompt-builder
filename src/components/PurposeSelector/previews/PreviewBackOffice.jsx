export default function PreviewBackOffice({ p, mood, cardCSS, buttonCSS, dataCSS }) {
  const m = mood || {};
  const pad = Math.round((m.padScale || 1) * 10);
  const gap = Math.round((m.gapScale || 1) * 6);
  const fs = (base) => Math.round((m.fontScale || 1) * base);
  const cRad = m.cardRadius ?? 8;
  const hFont = m.headFont || "'DM Sans',sans-serif";
  const bFont = m.bodyFont || "'DM Sans',sans-serif";
  const hWt = m.headWeight || 700;
  const cShadow = m.cardShadow || "none";
  const tr = m.transition || "all 0.2s";
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

  const cardBg = glass ? `${p.card}${gAlpha}` : p.card;
  const cardBlur = glass ? { backdropFilter: `blur(${gBlur}px)`, WebkitBackdropFilter: `blur(${gBlur}px)` } : {};
  const cardBorder = bdrW === 0 ? "none" : `${bdrW}px solid ${p.border}`;
  const accentShadow = glow ? `0 0 ${glowSz}px ${p.accent}40` : undefined;

  return (
    <div style={{ height: "100%", display: "flex", background: p.bg, fontFamily: bFont }}>
      {/* Sidebar */}
      <div style={{ width: 60, background: cardBg, borderRight: cardBorder, padding: `${pad}px 0`, display: "flex", flexDirection: "column", alignItems: "center", gap: gap * 1.5, ...cardBlur }}>
        <div style={{ width: 24, height: 24, borderRadius: cRad, background: p.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(10), fontWeight: 700, color: "#fff" }}>A</div>
        {["▪", "◆", "●", "▸", "☰"].map((icon, i) => (
          <div key={i} style={{ width: 28, height: 28, borderRadius: cRad, background: i === 0 ? p.accentBg : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs(10), color: i === 0 ? p.accent : p.dim, transition: tr }}>{icon}</div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: pad, gap, overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: fs(14), fontWeight: hWt, fontFamily: hFont, color: p.text, fontStyle: hIt ? "italic" : "normal" }}>Users</div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Import</div>
            <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(8), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Export</div>
            <div style={{ padding: "4px 10px", borderRadius: cRad, background: p.accent, fontSize: fs(8), fontWeight: 700, color: "#fff", transition: tr, boxShadow: accentShadow, ...btnP }}>+ Add User</div>
          </div>
        </div>

        {/* Stat cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap }}>
          {[
            { l: "Total Users", v: "1,284", cl: p.accent },
            { l: "Active", v: "1,042", cl: p.green },
            { l: "Invited", v: "38", cl: p.amber },
          ].map((s) => (
            <div key={s.l} style={{ borderRadius: cRad, padding: `${Math.round(gap)}px ${Math.round(gap * 1.5)}px`, background: cardBg, border: cardBorder, boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
              <div style={{ fontSize: fs(6), fontWeight: 600, textTransform: lblTx, letterSpacing: lblSp, color: p.dim }}>{s.l}</div>
              <div style={{ fontSize: fs(13), fontWeight: hWt, fontFamily: hFont, color: s.cl, marginTop: 2 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div style={{ display: "flex", gap, alignItems: "center" }}>
          <div style={{ flex: 1, height: 26, borderRadius: cRad, background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: fs(8), color: p.dim }}>Search users...</div>
          <div style={{ padding: "4px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Role ▾</div>
          <div style={{ padding: "4px 8px", borderRadius: cRad, background: p.surface, border: `1px solid ${p.border}`, fontSize: fs(7), fontWeight: 600, color: p.muted, transition: tr, ...btnS }}>Status ▾</div>
        </div>

        {/* Data table */}
        <div style={{ flex: 1, borderRadius: cRad, background: cardBg, border: cardBorder, overflow: "hidden", boxShadow: cShadow, transition: tr, ...cardBlur, ...cBase, ...(cExtra || {}) }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.2fr 1fr 1fr", padding: ds.rowPad || "6px 10px", borderBottom: cardBorder, background: p.surface, ...(ds.header || {}) }}>
            {["", "Name", "Role", "Status", ""].map((h, i) => (
              <div key={i} style={{ fontSize: fs(7), fontWeight: ds.header?.fontWeight || 700, textTransform: ds.header?.textTransform || lblTx, letterSpacing: ds.header?.letterSpacing || lblSp, color: ds.header?.color || p.dim }}>{h}</div>
            ))}
          </div>
          {/* Rows */}
          {[
            { name: "Sarah Chen", email: "sarah@co.io", role: "Admin", status: "Active", color: p.green },
            { name: "Marcus Lee", email: "marcus@co.io", role: "Editor", status: "Active", color: p.green },
            { name: "Ava Patel", email: "ava@co.io", role: "Viewer", status: "Invited", color: p.amber },
            { name: "Jake Miller", email: "jake@co.io", role: "Editor", status: "Active", color: p.green },
          ].map((row, i, arr) => (
            <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.2fr 1fr 1fr", padding: ds.rowPad || "5px 10px", borderBottom: i < arr.length - 1 ? (ds.divider || `1px solid ${p.borderLight}`) : "none", alignItems: "center", background: ds.zebraStripe && i % 2 === 1 ? ds.zebraBg : "transparent" }}>
              <div><div style={{ width: 5, height: 5, borderRadius: 2, border: `1.5px solid ${p.border}` }} /></div>
              <div>
                <div style={{ fontSize: fs(9), fontWeight: 500, color: p.text }}>{row.name}</div>
                <div style={{ fontSize: fs(7), color: p.dim }}>{row.email}</div>
              </div>
              <div style={{ fontSize: fs(8), color: p.muted }}>{row.role}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: row.color }} />
                <span style={{ fontSize: fs(8), color: p.muted }}>{row.status}</span>
              </div>
              <div style={{ fontSize: fs(8), color: p.accent, fontWeight: 500 }}>Edit</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
