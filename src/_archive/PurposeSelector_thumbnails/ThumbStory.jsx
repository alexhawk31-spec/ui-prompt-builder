export default function ThumbStory({ c, p }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg }}>
      <div style={{ flex: 2, background: `linear-gradient(135deg,${p.gradA},${p.gradB})`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3, padding: 5 }}>
        <div style={{ width: "50%", height: 5, borderRadius: 2, background: p.dim }} />
        <div style={{ width: 22, height: 8, borderRadius: 4, background: c }} />
      </div>
      <div style={{ flex: 1, padding: 5, display: "flex", gap: 3 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, padding: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: 4, background: p.accentBg, marginBottom: 2 }} />
            <div style={{ width: "70%", height: 2, borderRadius: 1, background: p.dim }} />
          </div>
        ))}
      </div>
    </div>
  );
}
