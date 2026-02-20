export default function ThumbCapsules({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Pill selector container */}
      <div
        style={{
          display: "flex",
          gap: 3,
          padding: 3,
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 3,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 2 ? 18 : i === 0 ? 14 : 16,
              height: 6,
              borderRadius: 999,
              background: i === 2 ? accent : "transparent",
              border:
                i === 2
                  ? "none"
                  : "1px solid rgba(255,255,255,0.12)",
              opacity: i === 2 ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingTop: 1,
        }}
      >
        <div
          style={{
            height: 3,
            width: "55%",
            background: "rgba(255,255,255,0.16)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "85%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "65%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
