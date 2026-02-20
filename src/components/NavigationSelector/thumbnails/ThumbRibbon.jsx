export default function ThumbRibbon({ accent }) {
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
      {/* Horizontal top bar */}
      <div
        style={{
          height: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "0 4px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 2,
        }}
      >
        {/* Logo square */}
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 1,
            background: accent,
            flexShrink: 0,
            opacity: 0.8,
          }}
        />
        {/* Nav link dots */}
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
                width: i === 1 ? 12 : 10,
                height: 2,
                borderRadius: 1,
                background:
                  i === 1
                    ? "rgba(255,255,255,0.35)"
                    : "rgba(255,255,255,0.13)",
              }}
            />
            {i === 1 && (
              <div
                style={{
                  width: 12,
                  height: 1,
                  borderRadius: 1,
                  background: accent,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "0 2px",
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
