export default function ThumbLedger({ accent, label, desc }) {
  const headers = ["Item", "Qty", "Total"];
  const rows = [
    ["Widget", "12", "$240"],
    ["Gadget", "8", "$360"],
    ["Module", "24", "$720"],
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: "6px 5px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "3px 4px",
          borderBottom: `1px solid ${accent}`,
          marginBottom: 1,
        }}
      >
        {headers.map((h) => (
          <div
            key={h}
            style={{
              flex: h === "Item" ? 2 : 1,
              fontSize: 7,
              fontWeight: 700,
              color: accent,
              letterSpacing: 0.3,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {/* Data rows */}
      {rows.map((row, r) => (
        <div
          key={r}
          style={{
            display: "flex",
            gap: 2,
            padding: "3px 4px",
            background: r % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
          }}
        >
          {row.map((cell, c) => (
            <div
              key={c}
              style={{
                flex: c === 0 ? 2 : 1,
                fontSize: 7,
                color:
                  c === 0
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(255,255,255,0.5)",
                fontFamily:
                  c > 0 ? "'JetBrains Mono', monospace" : "inherit",
                lineHeight: 1,
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      {/* Totals row */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "3px 4px",
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          marginTop: "auto",
        }}
      >
        <div
          style={{
            flex: 2,
            fontSize: 7,
            fontWeight: 700,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1,
          }}
        >
          Total
        </div>
        <div
          style={{
            flex: 1,
            fontSize: 7,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
          }}
        >
          44
        </div>
        <div
          style={{
            flex: 1,
            fontSize: 7,
            fontWeight: 700,
            color: accent,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
          }}
        >
          $1,320
        </div>
      </div>
    </div>
  );
}
