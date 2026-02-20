export default function ThumbDrawer({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Main content area (slightly dimmed) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingTop: 3,
          paddingLeft: 2,
          opacity: 0.35,
        }}
      >
        <div
          style={{
            height: 3,
            width: "55%",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "85%",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "70%",
            background: "rgba(255,255,255,0.1)",
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
      </div>

      {/* Dim overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          borderRadius: 4,
        }}
      />

      {/* Slide-in drawer panel from left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "35%",
          background: "#131825",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 4,
          paddingTop: 5,
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            height: 3,
            width: "70%",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        {/* Nav rows inside drawer */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "1px 2px",
              borderRadius: 2,
              background:
                i === 1 ? accent + "18" : "transparent",
            }}
          >
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: 1,
                flexShrink: 0,
                background:
                  i === 1
                    ? accent
                    : "rgba(255,255,255,0.12)",
              }}
            />
            <div
              style={{
                height: 2,
                width: i === 1 ? "80%" : "65%",
                borderRadius: 1,
                background:
                  i === 1
                    ? accent + "88"
                    : "rgba(255,255,255,0.1)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
