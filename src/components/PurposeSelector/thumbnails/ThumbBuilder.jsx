export default function ThumbBuilder({ c, p }) {
  return (
    <div style={{ height: "100%", display: "flex", background: p.bg }}>
      <div style={{ width: 16, background: p.card, borderRight: `1px solid ${p.border}`, padding: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: 2, background: i === 1 ? p.accentBg : p.surface, border: `1px solid ${i === 1 ? c : p.border}` }} />
        ))}
      </div>
      <div style={{ flex: 1, padding: 5, display: "flex", alignItems: "center", justifyContent: "center", background: p.surface }}>
        <div style={{ width: "65%", height: "55%", borderRadius: 4, border: `1.5px dashed ${c}60` }} />
      </div>
      <div style={{ width: 20, background: p.card, borderLeft: `1px solid ${p.border}`, padding: 2 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ height: 7, borderRadius: 2, background: p.surface, border: `1px solid ${p.border}`, marginBottom: 2 }} />
        ))}
      </div>
    </div>
  );
}
