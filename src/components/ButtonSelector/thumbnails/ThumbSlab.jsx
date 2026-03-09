export default function ThumbSlab({ accent, label, desc }) {
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
      {/* Primary — solid accent bg, dark text, 2px dark border, hard offset shadow */}
      <div
        style={{
          width: "100%",
          background: ac,
          border: "2px solid #111",
          borderRadius: 0,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 800,
          color: "#0d1018",
          textAlign: "center",
          lineHeight: 1.2,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          boxSizing: "border-box",
          boxShadow: `3px 3px 0 ${ac}88`,
        }}
      >
        Get Started
      </div>
      {/* Secondary — transparent bg, 2px accent border, hard shadow */}
      <div
        style={{
          width: "100%",
          background: "transparent",
          border: `2px solid ${ac}`,
          borderRadius: 0,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          boxSizing: "border-box",
          boxShadow: `3px 3px 0 ${ac}44`,
        }}
      >
        Learn More
      </div>
      {/* Tertiary — uppercase text only */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Skip
      </div>
    </div>
  );
}
