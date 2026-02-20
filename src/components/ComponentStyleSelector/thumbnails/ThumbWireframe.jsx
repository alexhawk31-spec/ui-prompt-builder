export default function ThumbWireframe({ label, desc }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#f8fafc",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        position: "relative",
      }}
    >
      {/* Dot grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, #cbd5e1 0.8px, transparent 0.8px)",
        backgroundSize: "14px 14px",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      <div
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          border: "1.5px dashed #94a3b8",
          borderRadius: 3,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          position: "relative",
        }}
      >
        {/* X marks in corners */}
        {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
          <div key={v+h} style={{ position: "absolute", [v]: 4, [h]: 6, fontSize: 7, color: "#94a3b8", fontWeight: 700 }}>+</div>
        ))}
        <div style={{ fontSize: 15, fontWeight: 700, color: "#475569", lineHeight: 1.1 }}>{label}</div>
        <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
