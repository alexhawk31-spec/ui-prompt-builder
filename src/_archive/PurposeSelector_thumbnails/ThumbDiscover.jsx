export default function ThumbDiscover({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ height: 12, borderRadius: 6, background: p.card, border: `1px solid ${p.border}` }} />
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ padding: "1px 5px", borderRadius: 5, height: 8, background: i === 1 ? c : p.card, border: `1px solid ${i === 1 ? c : p.border}` }} />
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {[p.blueBg, p.amberBg, p.greenBg, p.accentBg].map((bg, i) => (
          <div key={i} style={{ borderRadius: 4, overflow: "hidden", background: p.card, border: `1px solid ${p.border}` }}>
            <div style={{ height: 14, background: bg }} />
            <div style={{ padding: 2 }}>
              <div style={{ width: "60%", height: 2, borderRadius: 1, background: p.dim }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
