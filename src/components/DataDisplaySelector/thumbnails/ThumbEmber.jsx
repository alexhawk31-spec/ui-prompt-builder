export default function ThumbEmber({ accent, label, desc }) {
  const colHeaders = ["Q1", "Q2", "Q3"];
  const rowHeaders = ["North", "South", "West"];
  const data = [
    [85, 42, 91],
    [67, 78, 35],
    [50, 88, 63],
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Column headers */}
      <div
        style={{
          display: "flex",
          gap: 2,
          paddingLeft: 28,
        }}
      >
        {colHeaders.map((h) => (
          <div
            key={h}
            style={{
              flex: 1,
              fontSize: 7,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {/* Data grid */}
      {data.map((row, r) => (
        <div
          key={r}
          style={{
            display: "flex",
            gap: 2,
            flex: 1,
            alignItems: "stretch",
          }}
        >
          {/* Row header */}
          <div
            style={{
              width: 26,
              fontSize: 6,
              color: "rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
            }}
          >
            {rowHeaders[r]}
          </div>
          {/* Heat cells */}
          {row.map((val, c) => (
            <div
              key={c}
              style={{
                flex: 1,
                background: accent,
                opacity: 0.15 + (val / 100) * 0.7,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1,
                }}
              >
                {val}%
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
