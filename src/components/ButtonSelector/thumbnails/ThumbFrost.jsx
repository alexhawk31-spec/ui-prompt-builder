export default function ThumbFrost({ accent, label, desc }) {
  const ac = accent || "#67e8f9";
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
        position: "relative",
      }}
    >
      {/* Background texture to show frosted effect */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(135deg, ${ac}18 25%, transparent 25%, transparent 50%, ${ac}18 50%, ${ac}18 75%, transparent 75%)`,
        backgroundSize: "8px 8px",
        opacity: 0.5,
      }} />
      {/* Primary — frosted glass */}
      <div
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 9,
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
          position: "relative",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Get Started
      </div>
      {/* Secondary — lighter glass */}
      <div
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: "rgba(255,255,255,0.6)",
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        Learn More
      </div>
      {/* Tertiary — text only */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          position: "relative",
        }}
      >
        Skip
      </div>
    </div>
  );
}
