export default function ThumbMosaic({ accent, label, desc }) {
  const tiles = [
    { value: "$84k", label: "Revenue", trend: "+12%", up: true },
    { value: "2.8k", label: "Users", trend: "+8%", up: true },
    { value: "1.2k", label: "Orders", trend: "-3%", up: false },
    { value: "72", label: "NPS", trend: "+5", up: true },
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {tiles.map((tile, i) => (
        <div
          key={i}
          style={{
            borderRadius: 4,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "5px 6px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tile.value}
            </span>
            <span
              style={{
                fontSize: 6,
                fontWeight: 600,
                color: tile.up ? "#34d399" : "#f87171",
                lineHeight: 1,
              }}
            >
              {tile.trend}
            </span>
          </div>
          <div
            style={{
              fontSize: 6,
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1,
              letterSpacing: 0.3,
            }}
          >
            {tile.label}
          </div>
        </div>
      ))}
    </div>
  );
}
