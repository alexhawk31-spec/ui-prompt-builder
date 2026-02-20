export default function ThumbRaw({ accent, label, desc }) {
  const ac = accent || "#f87171";

  return (
    <div
      style={{
        height: "100%",
        background: "#fafaf5",
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
          background: "#fff",
          border: "3px solid #111",
          borderRadius: 0,
          boxShadow: `5px 5px 0 ${ac}`,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 900, color: "#111", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "-0.03em" }}>{label}</div>
        <div style={{ fontSize: 10, color: "#555", lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
