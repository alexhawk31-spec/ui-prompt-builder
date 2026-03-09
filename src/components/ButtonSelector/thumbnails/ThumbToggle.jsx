export default function ThumbToggle({ accent, label, desc }) {
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
        padding: 10,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Segmented control container */}
      <div
        style={{
          width: "100%",
          border: `1px solid rgba(255,255,255,0.12)`,
          borderRadius: 8,
          display: "flex",
          overflow: "hidden",
          boxSizing: "border-box",
          background: `${ac}0A`,
        }}
      >
        {/* Left segment — active, accent filled */}
        <div
          style={{
            flex: 1,
            background: ac,
            padding: "6px 8px",
            fontSize: 8,
            fontWeight: 700,
            color: "#0d1018",
            textAlign: "center",
            lineHeight: 1.2,
            borderRadius: "7px 0 0 7px",
          }}
        >
          Monthly
        </div>
        {/* Right segment — inactive, transparent */}
        <div
          style={{
            flex: 1,
            background: "transparent",
            borderLeft: "1px solid rgba(255,255,255,0.12)",
            padding: "6px 8px",
            fontSize: 8,
            fontWeight: 600,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            lineHeight: 1.2,
            borderRadius: "0 7px 7px 0",
          }}
        >
          Yearly
        </div>
      </div>
    </div>
  );
}
