// ── One-Pager Data Element Thumbnails ──

const B = "#0d1018";

export function ThumbCompactStat({ accent }) {
  const stats = [
    { val: "$4.2M", lbl: "Revenue" },
    { val: "12.4K", lbl: "Users" },
    { val: "+24%", lbl: "Growth" },
    { val: "96%", lbl: "NPS" },
  ];
  return (
    <div style={{ height: 110, background: B, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 7, color: "#fff6", textTransform: "uppercase", letterSpacing: ".08em" }}>At a Glance</div>
      <div style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
        {stats.map((s, i) => (
          <div key={s.lbl} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: i === 0 ? accent : "#fffc" }}>{s.val}</div>
            <div style={{ fontSize: 5, color: "#fff5", marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThumbMiniTable({ accent }) {
  const rows = [
    ["Feature", "Basic", "Pro"],
    ["Storage", "5 GB", "100 GB"],
    ["Users", "3", "Unlimited"],
    ["Support", "Email", "Priority"],
  ];
  return (
    <div style={{ height: 110, background: B, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 1 }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{
              flex: ci === 0 ? 1.2 : 1,
              padding: "3px 5px",
              fontSize: ri === 0 ? 6 : 5.5,
              fontWeight: ri === 0 || ci === 0 ? 700 : 400,
              color: ri === 0 ? accent : ci === 0 ? "#fff8" : "#fff5",
              background: ri === 0 ? `${accent}12` : ci === 2 ? `${accent}06` : "#ffffff04",
              borderRadius: ri === 0 && ci === 0 ? "4px 0 0 0" : ri === 0 && ci === 2 ? "0 4px 0 0" : 0,
            }}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ThumbSimpleBar({ accent }) {
  const bars = [
    { lbl: "Awareness", pct: 85 },
    { lbl: "Consideration", pct: 62 },
    { lbl: "Conversion", pct: 38 },
    { lbl: "Retention", pct: 91 },
  ];
  const colors = [accent, "#a78bfa", "#22c55e", "#f59e0b"];
  return (
    <div style={{ height: 110, background: B, padding: "10px 10px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
      {bars.map((b, i) => (
        <div key={b.lbl}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <div style={{ fontSize: 5.5, color: "#fff7" }}>{b.lbl}</div>
            <div style={{ fontSize: 5.5, fontWeight: 700, color: colors[i] }}>{b.pct}%</div>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: "#ffffff08" }}>
            <div style={{ width: `${b.pct}%`, height: "100%", borderRadius: 2, background: colors[i] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThumbComparisonList({ accent }) {
  const items = [
    { label: "Speed", a: true, b: false },
    { label: "Offline", a: true, b: true },
    { label: "API", a: false, b: true },
    { label: "Mobile", a: true, b: false },
  ];
  return (
    <div style={{ height: 110, background: B, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
      <div style={{ display: "flex", gap: 1, marginBottom: 2 }}>
        <div style={{ flex: 1.2 }} />
        <div style={{ flex: 1, fontSize: 6, fontWeight: 700, color: accent, textAlign: "center", padding: "3px 0" }}>Ours</div>
        <div style={{ flex: 1, fontSize: 6, fontWeight: 700, color: "#fff6", textAlign: "center", padding: "3px 0" }}>Theirs</div>
      </div>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", gap: 1 }}>
          <div style={{ flex: 1.2, fontSize: 6, color: "#fff7", padding: "3px 5px" }}>{item.label}</div>
          {[item.a, item.b].map((v, ci) => (
            <div key={ci} style={{ flex: 1, textAlign: "center", padding: "3px 0", background: "#ffffff04", fontSize: 7 }}>
              <span style={{ color: v ? (ci === 0 ? accent : "#22c55e") : "#f8717180" }}>
                {v ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
