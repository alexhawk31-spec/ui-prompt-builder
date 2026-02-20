export default function ThumbFrosted({ label, desc }) {
  return (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      {/* Blurred background shapes */}
      <div style={{ position: "absolute", top: -10, left: -10, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.2)", filter: "blur(15px)" }} />
      <div style={{ position: "absolute", bottom: -5, right: -5, width: 50, height: 50, borderRadius: "50%", background: "rgba(103,232,249,0.25)", filter: "blur(12px)" }} />

      {/* Frosted card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 14,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>{label}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
