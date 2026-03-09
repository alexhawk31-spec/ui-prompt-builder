export default function ThumbCommunity({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      {[1, 2].map((n) => (
        <div key={n} style={{ borderRadius: 5, background: p.card, border: `1px solid ${p.border}`, padding: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: n === 1 ? `${c}30` : p.amberBg }} />
            <div style={{ width: 20, height: 2, borderRadius: 1, background: p.dim }} />
          </div>
          <div style={{ width: "80%", height: 2, borderRadius: 1, background: p.borderLight }} />
          {n === 1 && <div style={{ height: 14, borderRadius: 3, background: p.accentBg, border: `1px solid ${c}30`, marginTop: 2 }} />}
        </div>
      ))}
    </div>
  );
}
