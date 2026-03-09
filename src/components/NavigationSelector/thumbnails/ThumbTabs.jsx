export default function ThumbTabs({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.35)";
  const tabs = ["Overview", "Details", "History"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: font,
        padding: "6px 6px 4px",
      }}
    >
      {/* Tab strip */}
      <div
        style={{
          display: "flex",
          gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
          paddingBottom: 0,
        }}
      >
        {tabs.map((tab, i) => {
          const active = i === 0;
          return (
            <div
              key={tab}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 3,
                borderBottom: active
                  ? `2px solid ${accent}`
                  : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              <span
                style={{
                  fontSize: 7,
                  color: active ? accent : muted,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {tab}
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
          paddingTop: 7,
        }}
      >
        <div
          style={{
            height: 2,
            width: "85%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "70%",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "55%",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
