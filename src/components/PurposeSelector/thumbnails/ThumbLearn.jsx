export default function ThumbLearn({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 7, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ height: 4, borderRadius: 2, background: p.border }}>
        <div style={{ width: "40%", height: "100%", borderRadius: 2, background: c }} />
      </div>
      <div style={{ flex: 1, borderRadius: 5, background: p.card, border: `1px solid ${p.border}`, padding: 5, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "55%", height: 4, borderRadius: 2, background: p.dim }} />
        <div style={{ width: "85%", height: 2, borderRadius: 1, background: p.borderLight }} />
        <div style={{ padding: 4, borderRadius: 4, background: p.accentBg, borderLeft: `2px solid ${c}` }}>
          <div style={{ width: "60%", height: 2, borderRadius: 1, background: `${c}80` }} />
        </div>
        <div style={{ width: "75%", height: 2, borderRadius: 1, background: p.borderLight }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: 20, height: 9, borderRadius: 4, background: p.surface }} />
        <div style={{ width: 20, height: 9, borderRadius: 4, background: c }} />
      </div>
    </div>
  );
}
