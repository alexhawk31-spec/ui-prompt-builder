export default function ThumbCapsule({ accent, label, desc }) {
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
      {/* Primary — solid accent bg, dark text, pill shape */}
      <div
        style={{
          width: "100%",
          background: ac,
          borderRadius: 9999,
          padding: "5px 18px",
          fontSize: 9,
          fontWeight: 700,
          color: "#0d1018",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Get Started
      </div>
      {/* Secondary — accent at 10% opacity bg, accent text, pill shape */}
      <div
        style={{
          width: "100%",
          background: `${ac}1A`,
          borderRadius: 9999,
          padding: "4px 18px",
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Learn More
      </div>
      {/* Tertiary — transparent, accent text, pill hit area */}
      <div
        style={{
          borderRadius: 9999,
          padding: "2px 18px",
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
