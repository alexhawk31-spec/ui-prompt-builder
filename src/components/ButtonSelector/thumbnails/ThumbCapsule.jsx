export default function ThumbCapsule({ accent }) {
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
      {/* Primary — solid accent, fully rounded pill */}
      <div
        style={{
          width: "80%",
          height: 7,
          borderRadius: 9999,
          background: accent,
        }}
      />
      {/* Secondary — accent 10% bg, fully rounded */}
      <div
        style={{
          width: "70%",
          height: 7,
          borderRadius: 9999,
          background: accent,
          opacity: 0.1,
        }}
      />
      {/* Tertiary — no fill, pill-shaped text bar */}
      <div
        style={{
          width: "50%",
          height: 2,
          borderRadius: 9999,
          background: accent,
          opacity: 0.45,
        }}
      />
    </div>
  );
}
