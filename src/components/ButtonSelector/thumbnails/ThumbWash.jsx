export default function ThumbWash({ accent, label, desc }) {
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
      {/* Primary — accent at 15% opacity bg, accent text */}
      <div
        style={{
          width: "100%",
          background: `${ac}26`,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Get Started
      </div>
      {/* Secondary — accent at 6% opacity bg, muted text */}
      <div
        style={{
          width: "100%",
          background: `${ac}0F`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: `${ac}aa`,
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
