export default function ThumbOmbre({ accent }) {
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
      {/* Primary — gradient from accent to lighter shifted version */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
        }}
      />
      {/* Secondary — solid tint */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 2,
          background: accent,
          opacity: 0.2,
        }}
      />
      {/* Tertiary — text only */}
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
