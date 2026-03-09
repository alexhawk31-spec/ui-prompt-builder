export default function ThumbPortfolio({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 5, display: "flex", flexDirection: "column", gap: 3, background: p.bg }}>
      <div style={{ flex: 1, borderRadius: 5, background: `${c}18`, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ width: "30%", height: 10, borderRadius: 2, background: `${c}40` }} />
        <div style={{ position: "absolute", bottom: 4, left: 5, right: 5, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ width: "50%", height: 3, borderRadius: 1, background: c }} />
          <div style={{ width: "35%", height: 2, borderRadius: 1, background: p.dim }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: "40%", height: 2, borderRadius: 1, background: p.dim }} />
        <div style={{ width: 14, height: 6, borderRadius: 3, background: c }} />
      </div>
    </div>
  );
}
