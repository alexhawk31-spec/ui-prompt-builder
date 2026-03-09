export default function ThumbStamp({ accent, label, desc }) {
  const ac = accent || "#6366f1";
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 10,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Primary — solid accent fill, dark text */}
      <div
        style={{
          width: "100%",
          background: ac,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: "#0d1018",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Get Started
      </div>
      {/* Secondary — transparent bg, accent border, accent text */}
      <div
        style={{
          width: "100%",
          background: "transparent",
          border: `1px solid ${ac}`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
        }}
      >
        Learn More
      </div>
      {/* Tertiary — just accent text, no border/bg */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Skip
      </div>
    </div>
  );
}
