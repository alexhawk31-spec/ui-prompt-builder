export default function ThumbKeynote({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ flex: 1, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: 6 }}>
        <div style={{ width: "70%", height: 6, borderRadius: 2, background: c }} />
        <div style={{ width: "45%", height: 3, borderRadius: 1, background: p.dim }} />
        <div style={{ width: "30%", height: 3, borderRadius: 1, background: p.dim, marginTop: 2 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 3 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 4, height: 2, borderRadius: 1, background: i === 0 ? c : p.dim }} />
        ))}
      </div>
    </div>
  );
}
