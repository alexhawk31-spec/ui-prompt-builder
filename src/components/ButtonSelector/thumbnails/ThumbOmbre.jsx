export default function ThumbOmbre({ accent, label, desc }) {
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
      {/* Primary — gradient from accent to lighter accent, white text */}
      <div
        style={{
          width: "100%",
          background: `linear-gradient(135deg, ${ac}, ${ac}99)`,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.2,
          boxShadow: `0 2px 8px ${ac}33`,
        }}
      >
        Get Started
      </div>
      {/* Secondary — accent at 10% opacity bg, accent text */}
      <div
        style={{
          width: "100%",
          background: `${ac}1A`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Learn More
      </div>
      {/* Tertiary — transparent, accent text */}
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
