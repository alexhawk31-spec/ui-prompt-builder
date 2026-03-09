export default function ThumbCapsules({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.35)";
  const pills = ["All", "Active", "Draft", "Archived"];

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
        padding: "7px 6px 5px",
        gap: 6,
      }}
    >
      {/* Pill row */}
      <div
        style={{
          display: "flex",
          gap: 3,
          flexShrink: 0,
        }}
      >
        {pills.map((pill, i) => {
          const active = i === 1;
          return (
            <span
              key={pill}
              style={{
                fontSize: 7,
                padding: "2px 5px",
                borderRadius: 999,
                background: active ? accent : "transparent",
                color: active ? "#0d1018" : muted,
                border: active ? "none" : "1px solid rgba(255,255,255,0.12)",
                whiteSpace: "nowrap",
                lineHeight: 1,
                fontWeight: active ? 600 : 400,
              }}
            >
              {pill}
            </span>
          );
        })}
      </div>

      {/* Content grid 2x2 */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 3,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
