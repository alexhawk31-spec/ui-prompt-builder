export default function ThumbToggle({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Segmented control container */}
      <div
        style={{
          width: "90%",
          height: 10,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Left segment — active, accent filled */}
        <div
          style={{
            flex: 1,
            background: accent,
            borderRadius: "2px 0 0 2px",
          }}
        />
        {/* Right segment — inactive, transparent */}
        <div
          style={{
            flex: 1,
            background: "transparent",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>
    </div>
  );
}
