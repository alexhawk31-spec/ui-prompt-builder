export default function ThumbQuote({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, padding: 10, display: "flex", alignItems: "center", gap: 6 }}>
      {/* Left accent bar */}
      <div style={{ width: 3, height: "60%", borderRadius: 2, background: color, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "90%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
        <div style={{ width: "75%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: "40%", height: 2, borderRadius: 1, background: `${color}60`, marginTop: 3 }} />
      </div>
    </div>
  );
}
