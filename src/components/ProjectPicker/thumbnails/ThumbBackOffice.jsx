export default function ThumbBackOffice({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", gap: 3, background: p.bg }}>
      <div style={{ width: "25%", borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "70%", height: 2, borderRadius: 1, background: c }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: "85%", height: 2, borderRadius: 1, background: i === 0 ? p.dim : p.borderLight }} />
        ))}
      </div>
      <div style={{ flex: 1, borderRadius: 4, background: p.card, border: `1px solid ${p.border}`, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", gap: 3, paddingBottom: 2, borderBottom: `1px solid ${p.border}` }}>
          <div style={{ width: "25%", height: 2, borderRadius: 1, background: p.dim }} />
          <div style={{ width: "25%", height: 2, borderRadius: 1, background: p.dim }} />
          <div style={{ width: "25%", height: 2, borderRadius: 1, background: p.dim }} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 3, paddingBottom: 2, borderBottom: `1px solid ${p.borderLight}` }}>
            <div style={{ width: "25%", height: 2, borderRadius: 1, background: i === 0 ? c : p.borderLight }} />
            <div style={{ width: "25%", height: 2, borderRadius: 1, background: p.borderLight }} />
            <div style={{ width: "25%", height: 2, borderRadius: 1, background: p.borderLight }} />
          </div>
        ))}
      </div>
    </div>
  );
}
