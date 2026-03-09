export default function ThumbDrawer({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.35)";
  const items = ["Dashboard", "Projects", "Team", "Settings"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: font,
        position: "relative",
      }}
    >
      {/* Main content area (dimmed, right side) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "8px 6px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div style={{ height: 3, width: "55%", background: "rgba(255,255,255,0.15)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "85%", background: "rgba(255,255,255,0.08)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "70%", background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "60%", background: "rgba(255,255,255,0.05)", borderRadius: 1 }} />
      </div>

      {/* Dim overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", borderRadius: 4 }} />

      {/* Drawer panel (left side) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "40%",
          background: "#151a28",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "5px 4px",
          gap: 1,
        }}
      >
        {/* Close button */}
        <div
          style={{
            alignSelf: "flex-end",
            fontSize: 8,
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1,
            cursor: "pointer",
            marginBottom: 2,
          }}
        >
          {"\u00D7"}
        </div>

        {/* Nav items */}
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
                background: active ? accent + "1a" : "transparent",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: active ? accent : "rgba(255,255,255,0.12)",
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
    </div>
  );
}
