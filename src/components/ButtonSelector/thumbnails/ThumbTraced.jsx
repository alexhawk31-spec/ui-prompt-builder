export default function ThumbTraced({ accent }) {
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
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Primary — full opacity accent border */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 2,
          background: "transparent",
          border: `1px solid ${accent}`,
          boxSizing: "border-box",
        }}
      />
      {/* Secondary — 40% opacity accent border */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 2,
          background: "transparent",
          border: `1px solid ${accent}`,
          opacity: 0.4,
          boxSizing: "border-box",
        }}
      />
      {/* Tertiary — text line only */}
      <div
        style={{
          width: "50%",
          height: 2,
          borderRadius: 1,
          background: accent,
          opacity: 0.5,
        }}
      />
    </div>
  );
}
