export default function ThumbImpactStat({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
      <div style={{ fontSize: 18, fontWeight: 900, color, lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>87%</div>
      <div style={{ width: "35%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.25)" }} />
    </div>
  );
}
