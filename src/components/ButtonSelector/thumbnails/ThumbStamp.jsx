export default function ThumbStamp({ accent }) {
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
      {/* Primary — solid accent fill, dark text */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 2,
          background: accent,
        }}
      />
      {/* Secondary — transparent, accent border */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 2,
          background: "transparent",
          border: `1px solid ${accent}`,
          boxSizing: "border-box",
        }}
      />
      {/* Tertiary — no border, accent text line */}
      <div
        style={{
          width: "50%",
          height: 2,
          borderRadius: 1,
          background: accent,
          opacity: 0.7,
        }}
      />
    </div>
  );
}
