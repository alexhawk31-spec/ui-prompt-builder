export default function ThumbHangout({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ height: 4, borderRadius: 2, background: p.border }}>
        <div style={{ width: "35%", height: "100%", borderRadius: 2, background: c }} />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ flex: 1, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, padding: 4, display: "flex", gap: 4, alignItems: "flex-start" }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, flexShrink: 0, background: i === 0 ? c : p.dim }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ width: "60%", height: 2, borderRadius: 1, background: p.dim }} />
            <div style={{ width: "90%", height: 2, borderRadius: 1, background: p.borderLight }} />
            <div style={{ width: "45%", height: 2, borderRadius: 1, background: p.borderLight }} />
          </div>
        </div>
      ))}
    </div>
  );
}
