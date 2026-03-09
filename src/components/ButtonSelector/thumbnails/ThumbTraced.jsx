export default function ThumbTraced({ accent, label, desc }) {
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
      {/* Primary — transparent bg, 1.5px accent border, accent text */}
      <div
        style={{
          width: "100%",
          background: "transparent",
          border: `1.5px solid ${ac}`,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
        }}
      >
        Get Started
      </div>
      {/* Secondary — transparent bg, 1px accent border at 40% opacity, muted text */}
      <div
        style={{
          width: "100%",
          background: "transparent",
          border: `1px solid ${ac}66`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: `${ac}99`,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
        }}
      >
        Learn More
      </div>
      {/* Tertiary — accent text only */}
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
