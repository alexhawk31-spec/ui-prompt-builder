export default function ThumbInk({ accent, label, desc }) {
  const ac = accent || "#94a3b8";
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
        gap: 10,
        padding: 10,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Primary — accent text with underline */}
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          textDecorationThickness: 1.5,
        }}
      >
        Get Started
      </div>
      {/* Secondary — muted text with underline */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          lineHeight: 1.2,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          textDecorationThickness: 1,
          textDecorationColor: "rgba(255,255,255,0.25)",
        }}
      >
        Learn More
      </div>
      {/* Tertiary — dimmer text, no underline */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: "rgba(255,255,255,0.3)",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Skip
      </div>
    </div>
  );
}
