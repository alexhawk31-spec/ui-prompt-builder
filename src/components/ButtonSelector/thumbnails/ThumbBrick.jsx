export default function ThumbBrick({ accent, label, desc }) {
  const ac = accent || "#fb923c";
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
      {/* Primary — solid fill with thick bottom border */}
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
          boxSizing: "border-box",
          borderBottom: `3px solid ${ac}99`,
          filter: "brightness(1)",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", bottom: -3, left: 0, right: 0, height: 3,
          background: `${ac}`,
          filter: "brightness(0.65)",
          borderRadius: "0 0 6px 6px",
        }} />
        Get Started
      </div>
      {/* Secondary — lighter fill with accent bottom border */}
      <div
        style={{
          width: "100%",
          background: `${ac}18`,
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          boxSizing: "border-box",
          borderBottom: `3px solid ${ac}44`,
        }}
      >
        Learn More
      </div>
      {/* Tertiary — text only with bottom border */}
      <div
        style={{
          fontSize: 8,
          fontWeight: 600,
          color: ac,
          textAlign: "center",
          lineHeight: 1.2,
          borderBottom: `2px solid ${ac}33`,
          paddingBottom: 2,
        }}
      >
        Skip
      </div>
    </div>
  );
}
