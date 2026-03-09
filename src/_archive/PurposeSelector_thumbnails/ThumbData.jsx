export default function ThumbData({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ borderRadius: 3, padding: 2, background: p.card, border: `1px solid ${p.border}` }}>
            <div style={{ width: 10, height: 1, borderRadius: 1, background: p.dim }} />
            <div style={{ width: 14, height: 4, borderRadius: 1, background: i === 1 ? c : p.dim, marginTop: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, padding: 3, display: "flex", alignItems: "flex-end", gap: 1 }}>
        {[30, 50, 35, 65, 45, 70, 40, 60, 55, 75, 50, 80, 65, 90].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: i >= 12 ? c : `${c}30` }} />
        ))}
      </div>
      <div style={{ borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, overflow: "hidden" }}>
        {[0, 1, 2].map((r) => (
          <div key={r} style={{ height: 5, borderBottom: r < 2 ? `1px solid ${p.borderLight}` : "none" }} />
        ))}
      </div>
    </div>
  );
}
