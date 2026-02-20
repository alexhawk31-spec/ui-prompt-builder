export default function ThumbNeon({ accent }) {
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
      {/* Primary — accent border with glow */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 2,
          background: "transparent",
          border: `1px solid ${accent}`,
          boxShadow: `0 0 6px ${accent}66`,
          boxSizing: "border-box",
        }}
      />
      {/* Secondary — dimmer glow */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 2,
          background: "transparent",
          border: `1px solid ${accent}55`,
          boxShadow: `0 0 3px ${accent}33`,
          boxSizing: "border-box",
        }}
      />
      {/* Tertiary — text only, no glow */}
      <div
        style={{
          width: "50%",
          height: 2,
          borderRadius: 1,
          background: accent,
          opacity: 0.45,
        }}
      />
    </div>
  );
}
