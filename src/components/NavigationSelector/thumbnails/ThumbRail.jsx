export default function ThumbRail({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        display: "flex",
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Icon-only narrow rail */}
      <div
        style={{
          width: 12,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          paddingTop: 4,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 2,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 1,
              background: i === 1 ? accent : "rgba(255,255,255,0.13)",
              opacity: i === 1 ? 1 : 0.6,
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
          paddingTop: 4,
          paddingRight: 2,
        }}
      >
        <div
          style={{
            height: 3,
            width: "70%",
            background: "rgba(255,255,255,0.18)",
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
            width: "60%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "80%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "45%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
