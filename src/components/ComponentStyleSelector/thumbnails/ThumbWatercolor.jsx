export default function ThumbWatercolor({ accent, label, desc }) {
  const ac = accent || "#fb923c";

  return (
    <div
      style={{
        height: "100%",
        background: "#fdf8f3",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        position: "relative",
      }}
    >
      {/* Watercolor blobs */}
      <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: `${ac}20`, filter: "blur(12px)" }} />
      <div style={{ position: "absolute", bottom: -10, left: -10, width: 55, height: 55, borderRadius: "50%", background: `${ac}15`, filter: "blur(10px)" }} />

      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${ac}22 0%, ${ac}08 45%, transparent 100%)`,
          borderRadius: 14,
          borderTop: `3px solid ${ac}60`,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          position: "relative",
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 800, color: "#3d2f24", lineHeight: 1.1 }}>{label}</div>
        <div style={{ fontSize: 10, color: "#8a7262", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
