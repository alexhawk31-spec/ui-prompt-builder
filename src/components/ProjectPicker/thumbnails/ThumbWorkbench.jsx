export default function ThumbWorkbench({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", gap: 2, background: p.bg }}>
      <div style={{ width: 10, borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, paddingTop: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: 1, background: i === 0 ? c : p.dim }} />
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 10, height: 3, borderRadius: 1, background: i === 0 ? c : p.dim }} />
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: `${70 - i * 8}%`, height: 2, borderRadius: 1, background: p.dim }} />
          ))}
        </div>
      </div>
      <div style={{ width: 16, borderRadius: 3, background: p.card, border: `1px solid ${p.border}`, padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ width: "100%", height: 2, borderRadius: 1, background: p.dim }} />
        <div style={{ width: "100%", height: 6, borderRadius: 2, background: `${c}20`, border: `1px solid ${p.border}` }} />
        <div style={{ width: "100%", height: 2, borderRadius: 1, background: p.dim }} />
        <div style={{ width: "80%", height: 2, borderRadius: 1, background: p.dim }} />
      </div>
    </div>
  );
}
