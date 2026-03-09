export default function ThumbMainStage({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ flex: 1, borderRadius: 5, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: 6 }}>
        <div style={{ width: "80%", height: 5, borderRadius: 2, background: c }} />
        <div style={{ width: "50%", height: 3, borderRadius: 1, background: p.dim }} />
      </div>
      <div style={{ height: 1, background: p.border }} />
      <div style={{ borderRadius: 4, background: p.accentBg, borderLeft: `2px solid ${c}`, padding: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={{ width: "40%", height: 8, borderRadius: 2, background: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "60%", height: 3, borderRadius: 1, background: p.bg }} />
        </div>
        <div style={{ width: "65%", height: 2, borderRadius: 1, background: `${c}80` }} />
      </div>
    </div>
  );
}
