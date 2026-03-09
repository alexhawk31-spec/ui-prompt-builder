export default function ThumbStorefront({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ height: 22, borderRadius: 4, background: `${c}20`, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "40%", height: 4, borderRadius: 1, background: c }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ borderRadius: 3, padding: 3, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: 10, height: 6, borderRadius: 2, background: p.dim }} />
            <div style={{ width: 12, height: 2, borderRadius: 1, background: p.dim }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 28, height: 6, borderRadius: 3, background: c }} />
      </div>
    </div>
  );
}
