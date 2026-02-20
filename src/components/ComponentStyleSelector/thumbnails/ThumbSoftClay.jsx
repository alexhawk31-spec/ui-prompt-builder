export default function ThumbSoftClay({ label, desc }) {
  const bg = "#e0e5ec";

  return (
    <div
      style={{
        height: "100%",
        background: bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          borderRadius: 18,
          boxShadow: "6px 6px 14px rgba(0,0,0,0.15), -6px -6px 14px rgba(255,255,255,0.7)",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: "#3d4454", lineHeight: 1.1 }}>{label}</div>
        <div style={{ fontSize: 10, color: "#7a8394", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
