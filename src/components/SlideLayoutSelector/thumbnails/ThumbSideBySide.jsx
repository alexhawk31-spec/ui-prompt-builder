export default function ThumbSideBySide({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, padding: 8, display: "flex", gap: 4 }}>
      {/* Left column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "60%", height: 3, borderRadius: 2, background: color, opacity: 0.8 }} />
        <div style={{ width: "90%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: "70%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)" }} />
      </div>
      {/* Divider */}
      <div style={{ width: 1, background: "rgba(255,255,255,0.1)", alignSelf: "stretch", margin: "4px 0" }} />
      {/* Right column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ width: "60%", height: 3, borderRadius: 2, background: color, opacity: 0.8 }} />
        <div style={{ width: "85%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: "65%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)" }} />
      </div>
    </div>
  );
}
