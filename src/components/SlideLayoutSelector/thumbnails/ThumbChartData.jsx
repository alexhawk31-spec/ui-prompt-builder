export default function ThumbChartData({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ width: "40%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
      {/* Mini bar chart */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, padding: "0 4px" }}>
        {[0.5, 0.8, 0.35, 0.95, 0.6, 0.75].map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: "2px 2px 0 0", background: i === 3 ? color : `${color}50`, transition: "all 0.2s" }} />
        ))}
      </div>
      <div style={{ width: "25%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
    </div>
  );
}
