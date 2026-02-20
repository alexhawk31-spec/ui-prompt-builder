export default function ThumbTabs({ accent }) {
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
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 3,
          paddingBottom: 2,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <div
              style={{
                width: i === 0 ? 14 : i === 2 ? 10 : 12,
                height: 2,
                borderRadius: 1,
                background:
                  i === 0
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.12)",
              }}
            />
            <div
              style={{
                width: i === 0 ? 14 : i === 2 ? 10 : 12,
                height: 1,
                borderRadius: 1,
                background: i === 0 ? accent : "transparent",
              }}
            />
          </div>
        ))}
      </div>

      {/* Content area below tabs */}
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
            width: "60%",
            background: "rgba(255,255,255,0.16)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "90%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "70%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "50%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
