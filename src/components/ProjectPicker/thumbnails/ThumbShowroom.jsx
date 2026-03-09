export default function ThumbShowroom({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ height: 7, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", padding: "0 4px" }}>
        <div style={{ width: "65%", height: 2, borderRadius: 1, background: p.borderLight }} />
        <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: 2, background: c }} />
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ flex: 1, borderRadius: 2, background: i === 0 ? `${c}20` : p.accentBg, minHeight: 8 }} />
            <div style={{ width: "70%", height: 2, borderRadius: 1, background: p.dim }} />
          </div>
        ))}
      </div>
    </div>
  );
}
