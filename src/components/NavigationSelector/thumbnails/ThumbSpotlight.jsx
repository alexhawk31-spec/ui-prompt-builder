export default function ThumbSpotlight({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.35)";
  const results = ["Dashboard", "Settings", "New Project"];

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
      {/* Dimmed background content */}
      <div
        style={{
          padding: "8px 6px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          opacity: 0.25,
        }}
      >
        <div style={{ height: 3, width: "50%", background: "rgba(255,255,255,0.2)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "80%", background: "rgba(255,255,255,0.12)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "65%", background: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
        <div style={{ height: 2, width: "70%", background: "rgba(255,255,255,0.08)", borderRadius: 1 }} />
      </div>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", borderRadius: 4 }} />

      {/* Centered search modal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "72%",
          display: "flex",
          flexDirection: "column",
          background: "rgba(13,16,24,0.95)",
          borderRadius: 3,
          border: `1px solid ${accent}44`,
          overflow: "hidden",
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 5px",
            borderBottom: `1px solid ${accent}33`,
            gap: 3,
          }}
        >
          <span style={{ fontSize: 7, color: muted, lineHeight: 1 }}>Search...</span>
        </div>

        {/* Result rows */}
        <div style={{ display: "flex", flexDirection: "column", padding: 2, gap: 1 }}>
          {results.map((item, i) => {
            const highlighted = i === 0;
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "2px 3px",
                  borderRadius: 2,
                  background: highlighted ? accent + "22" : "transparent",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: highlighted ? accent : "rgba(255,255,255,0.12)",
                  }}
                />
                <span
                  style={{
                    fontSize: 7,
                    color: highlighted ? accent : muted,
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
    </div>
  );
}
