export default function ThumbNeon({ accent, label, desc }) {
  const ac = accent || "#c084fc";

  return (
    <div
      style={{
        height: "100%",
        background: "#07060d",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        position: "relative",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, ${ac}18 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          border: `1.5px solid ${ac}`,
          borderRadius: 10,
          boxShadow: `0 0 20px ${ac}50, 0 0 6px ${ac}80, inset 0 0 15px ${ac}10`,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          position: "relative",
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.1, textShadow: `0 0 12px ${ac}60` }}>{label}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
