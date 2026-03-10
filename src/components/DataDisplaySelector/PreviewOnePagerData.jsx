import usePromptStore from "../../store/usePromptStore";

// ── Block renderers ──

function CompactStatBlock({ p, m }) {
  const stats = [
    { val: "$4.2M", lbl: "Revenue" },
    { val: "12.4K", lbl: "Users" },
    { val: "+24%", lbl: "Growth" },
    { val: "96%", lbl: "NPS" },
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: m.gap * 0.5 }}>At a Glance</div>
      <div style={{ display: "flex", gap: m.gap }}>
        {stats.map((s, i) => (
          <div key={s.lbl} style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, padding: m.pad * 0.8, textAlign: "center" }}>
            <div style={{ fontSize: m.fs(14), fontWeight: 900, color: i === 0 ? p.accent : p.text }}>{s.val}</div>
            <div style={{ fontSize: m.fs(7), color: p.muted, marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniTableBlock({ p, m }) {
  const rows = [
    ["Feature", "Basic", "Pro"],
    ["Storage", "5 GB", "100 GB"],
    ["Users", "3", "Unlimited"],
    ["Support", "Email", "Priority"],
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ borderRadius: m.cRad, overflow: "hidden", border: `1px solid ${p.border}` }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex" }}>
            {row.map((cell, ci) => (
              <div key={ci} style={{
                flex: ci === 0 ? 1.2 : 1,
                padding: `${m.pad * 0.5}px ${m.pad * 0.7}px`,
                fontSize: m.fs(8),
                fontWeight: ri === 0 || ci === 0 ? 700 : 400,
                color: ri === 0 ? p.accent : ci === 0 ? p.text : p.muted,
                background: ri === 0 ? `${p.accent}10` : ci === 2 ? `${p.accent}06` : p.card,
                borderBottom: ri < rows.length - 1 ? `1px solid ${p.border}` : "none",
              }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleBarBlock({ p, m }) {
  const bars = [
    { lbl: "Awareness", pct: 85 },
    { lbl: "Consideration", pct: 62 },
    { lbl: "Conversion", pct: 38 },
    { lbl: "Retention", pct: 91 },
  ];
  const colors = [p.accent, "#a78bfa", "#22c55e", "#f59e0b"];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ display: "flex", flexDirection: "column", gap: m.gap }}>
        {bars.map((b, i) => (
          <div key={b.lbl}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <div style={{ fontSize: m.fs(8), color: p.muted }}>{b.lbl}</div>
              <div style={{ fontSize: m.fs(8), fontWeight: 700, color: colors[i] }}>{b.pct}%</div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: `${p.muted}15` }}>
              <div style={{ width: `${b.pct}%`, height: "100%", borderRadius: 3, background: colors[i] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonListBlock({ p, m }) {
  const items = [
    { label: "Speed", a: true, b: false },
    { label: "Offline", a: true, b: true },
    { label: "API", a: false, b: true },
    { label: "Mobile", a: true, b: false },
  ];
  return (
    <div style={{ padding: `${m.pad}px 0` }}>
      <div style={{ borderRadius: m.cRad, overflow: "hidden", border: `1px solid ${p.border}` }}>
        {/* Header */}
        <div style={{ display: "flex", background: `${p.accent}08` }}>
          <div style={{ flex: 1.2, padding: `${m.pad * 0.5}px ${m.pad * 0.7}px` }} />
          <div style={{ flex: 1, padding: `${m.pad * 0.5}px`, fontSize: m.fs(8), fontWeight: 700, color: p.accent, textAlign: "center" }}>Ours</div>
          <div style={{ flex: 1, padding: `${m.pad * 0.5}px`, fontSize: m.fs(8), fontWeight: 700, color: p.muted, textAlign: "center" }}>Theirs</div>
        </div>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", borderTop: `1px solid ${p.border}` }}>
            <div style={{ flex: 1.2, padding: `${m.pad * 0.4}px ${m.pad * 0.7}px`, fontSize: m.fs(8), color: p.text }}>{item.label}</div>
            {[item.a, item.b].map((v, ci) => (
              <div key={ci} style={{ flex: 1, textAlign: "center", padding: `${m.pad * 0.4}px`, fontSize: m.fs(9), background: p.card }}>
                <span style={{ color: v ? (ci === 0 ? p.accent : "#22c55e") : "#f8717180" }}>
                  {v ? "✓" : "✗"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const BLOCK_RENDERERS = {
  "compact-stat": CompactStatBlock,
  "mini-table": MiniTableBlock,
  "simple-bar": SimpleBarBlock,
  "comparison-list": ComparisonListBlock,
};

const BLOCK_ORDER = ["compact-stat", "mini-table", "simple-bar", "comparison-list"];

// ── Main Preview ──

export default function PreviewOnePagerData({ p, mood }) {
  const m = mood || {};
  const dataStyleState = usePromptStore((s) => s.dataStyle);
  const selections = dataStyleState?.styleId?.split(",").filter(Boolean) || [];

  const scales = {
    pad: Math.round((m.padScale || 1) * 14),
    gap: Math.round((m.gapScale || 1) * 8),
    fs: (base) => Math.round((m.fontScale || 1) * base),
    cRad: m.cardRadius ?? 8,
    hWt: m.headWeight || 700,
    hFont: m.headFont || "'DM Sans',sans-serif",
    bFont: m.bodyFont || "'DM Sans',sans-serif",
  };

  const visibleIds = selections.length > 0
    ? BLOCK_ORDER.filter((id) => selections.includes(id))
    : BLOCK_ORDER;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: scales.bFont, overflow: "auto" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${scales.gap}px ${scales.pad}px`, borderBottom: `1px solid ${p.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: scales.fs(11), fontWeight: scales.hWt, fontFamily: scales.hFont, color: p.text }}>Acme Brief</div>
        <div style={{ fontSize: scales.fs(7), color: p.muted }}>{selections.length} element{selections.length !== 1 ? "s" : ""}</div>
      </div>

      {/* Document body */}
      <div style={{ flex: 1, padding: `${scales.pad}px ${scales.pad * 1.5}px`, display: "flex", flexDirection: "column" }}>
        {/* Title area */}
        <div style={{ marginBottom: scales.pad }}>
          <div style={{ fontSize: scales.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: scales.gap * 0.5 }}>Data Overview</div>
          <div style={{ fontSize: scales.fs(16), fontWeight: 900, fontFamily: scales.hFont, color: p.text, lineHeight: 1.2, marginBottom: scales.gap }}>Q4 Performance Report</div>
          {/* Body text lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[92, 78, 85, 60].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}20` }} />
            ))}
          </div>
        </div>

        {/* Render selected data blocks */}
        {visibleIds.map((id) => {
          const Renderer = BLOCK_RENDERERS[id];
          return Renderer ? <Renderer key={id} p={p} m={scales} /> : null;
        })}
      </div>
    </div>
  );
}
