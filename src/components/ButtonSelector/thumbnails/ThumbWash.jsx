export default function ThumbWash({ accent }) {
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
      {/* Primary — accent at 15% opacity bg */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 2,
          background: accent,
          opacity: 0.15,
        }}
      />
      {/* Secondary — accent at 8% opacity bg */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 2,
          background: accent,
          opacity: 0.08,
        }}
      />
      {/* Tertiary — text only, subtle */}
      <div
        style={{
          width: "50%",
          height: 2,
          borderRadius: 1,
          background: accent,
          opacity: 0.35,
        }}
      />
    </div>
  );
}
