export default function ThumbSlab({ accent }) {
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
        gap: 4,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Primary — solid accent, dark border, offset shadow */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 0,
          background: accent,
          border: "1.5px solid #0d1018",
          boxShadow: `2px 2px 0 ${accent}66`,
          boxSizing: "border-box",
        }}
      />
      {/* Secondary — transparent, thick accent border, offset shadow */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 0,
          background: "transparent",
          border: `1.5px solid ${accent}`,
          boxShadow: `2px 2px 0 ${accent}44`,
          boxSizing: "border-box",
        }}
      />
      {/* Tertiary — thick uppercase text bar */}
      <div
        style={{
          width: "50%",
          height: 3,
          borderRadius: 0,
          background: accent,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
