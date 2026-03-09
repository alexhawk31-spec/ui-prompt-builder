export default function ThumbCommandCenter({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 2, background: p.bg }}>
      <div style={{ height: 6, borderRadius: 2, background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", padding: "0 3px", gap: 2 }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: c }} />
        <div style={{ width: 14, height: 2, borderRadius: 1, background: p.dim }} />
        <div style={{ flex: 1 }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: i === 0 ? `${c}60` : p.dim }} />
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: i === 0 ? "#4ade80" : i === 1 ? c : i === 2 ? "#facc15" : "#4ade80" }} />
              <div style={{ width: 12, height: 2, borderRadius: 1, background: p.dim }} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 1 }}>
              {(i === 0 ? [40, 60, 50, 70, 55] : i === 1 ? [30, 45, 65, 50, 80] : i === 2 ? [60, 40, 55, 45, 50] : [50, 70, 60, 80, 75]).map((h, j) => (
                <div key={j} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: j >= 3 ? `${c}60` : `${c}20` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
