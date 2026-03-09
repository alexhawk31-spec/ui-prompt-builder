export default function ThumbHandbook({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", gap: 2, background: p.bg }}>
      <div style={{ width: "30%", borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ width: "80%", height: 2, borderRadius: 1, background: c }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: i > 0 && i < 4 ? 4 : 0 }}>
            <div style={{ width: 2, height: 2, borderRadius: "50%", background: i === 1 ? c : p.dim }} />
            <div style={{ width: i > 0 && i < 4 ? 12 : 16, height: 2, borderRadius: 1, background: i === 1 ? c : p.dim }} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "60%", height: 4, borderRadius: 1, background: c }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: `${90 - i * 15}%`, height: 2, borderRadius: 1, background: p.dim }} />
          ))}
        </div>
        <div style={{ borderRadius: 3, background: `${c}15`, border: `1px solid ${c}30`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ width: "50%", height: 2, borderRadius: 1, background: c }} />
          <div style={{ width: "80%", height: 2, borderRadius: 1, background: p.dim }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ width: `${85 - i * 20}%`, height: 2, borderRadius: 1, background: p.dim }} />
          ))}
        </div>
      </div>
    </div>
  );
}
