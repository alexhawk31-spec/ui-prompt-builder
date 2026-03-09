export default function ThumbLinen({ accent, label, desc }) {
  const headers = ["Name", "Role", "Status"];
  const rows = [
    ["A. Chen", "Engineer", "Active"],
    ["M. Park", "Designer", "Active"],
    ["J. Silva", "Manager", "Away"],
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "rgba(255,255,255,0.02)",
        padding: "8px 8px",
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
          gap: 4,
          padding: "0 4px 6px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {headers.map((h) => (
          <div
            key={h}
            style={{
              flex: h === "Name" ? 2 : 1,
              fontSize: 7,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: 0.4,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            {h}
          </div>
        ))}
      </div>
      {/* Data rows with generous spacing */}
      {rows.map((row, r) => (
        <div
          key={r}
          style={{
            display: "flex",
            gap: 4,
            padding: "7px 4px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
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
                    ? "rgba(255,255,255,0.6)"
                    : cell === "Away"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(255,255,255,0.35)",
                lineHeight: 1,
                fontWeight: c === 0 ? 500 : 400,
              }}
            >
              {c === 2 ? (
                <span
                  style={{
                    color:
                      cell === "Active"
                        ? accent
                        : "rgba(255,255,255,0.25)",
                    opacity: cell === "Active" ? 0.7 : 1,
                  }}
                >
                  {cell}
                </span>
              ) : (
                cell
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
