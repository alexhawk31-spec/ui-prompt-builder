export default function ThumbNeon({ accent, label, desc }) {
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
        backgroundImage: `radial-gradient(ellipse at center, ${ac}15 0%, transparent 70%)`,
      }}
    >
      {/* Primary — dark bg, accent border with glow, accent text */}
      <div
        style={{
          width: "100%",
          background: `${ac}0D`,
          border: `1px solid ${ac}`,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
          boxShadow: `0 0 8px ${ac}66, inset 0 0 8px ${ac}1A`,
        }}
      >
        Get Started
      </div>
      {/* Secondary — dimmer glow, softer border */}
      <div
        style={{
          width: "100%",
          background: "transparent",
          border: `1px solid ${ac}55`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: `${ac}bb`,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
          boxShadow: `0 0 4px ${ac}33`,
        }}
      >
        Learn More
      </div>
      {/* Tertiary — just accent text */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          textShadow: `0 0 6px ${ac}66`,
        }}
      >
        Skip
      </div>
    </div>
  );
}
