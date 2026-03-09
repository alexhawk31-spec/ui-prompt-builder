export default function ThumbRail({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.4)";
  const items = ["Dashboard", "Projects", "Team", "Settings"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        display: "flex",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: font,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "35%",
          flexShrink: 0,
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          padding: "6px 4px",
          gap: 1,
        }}
      >
        {items.map((item, i) => {
          const active = i === 1;
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "2px 3px",
                borderRadius: 2,
                background: active ? accent + "22" : "transparent",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: active ? accent : "rgba(255,255,255,0.15)",
                }}
              />
              <span
                style={{
                  fontSize: 7,
                  color: active ? accent : muted,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "8px 6px",
        }}
      >
        <div
          style={{
            height: 3,
            width: "70%",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "90%",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "60%",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
