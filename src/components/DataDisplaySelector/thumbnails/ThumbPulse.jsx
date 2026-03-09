export default function ThumbPulse({ accent, label, desc }) {
  const kpis = [
    { value: "$84k", label: "Revenue", trend: "+12%", up: true },
    { value: "2.4k", label: "Users", trend: "+8%", up: true },
  ];
  const bars = [65, 45, 80, 55, 90, 70, 85];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 6,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* KPI cards row */}
      <div style={{ display: "flex", gap: 4 }}>
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 4,
              padding: "5px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 3,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {kpi.value}
              </span>
              <span
                style={{
                  fontSize: 6,
                  fontWeight: 600,
                  color: kpi.up ? "#34d399" : "#f87171",
                  lineHeight: 1,
                }}
              >
                {kpi.trend}
              </span>
            </div>
            <div
              style={{
                fontSize: 6,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1,
                letterSpacing: 0.2,
              }}
            >
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
          padding: "0 2px",
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: accent,
              opacity: 0.5 + (h / 100) * 0.5,
              borderRadius: "2px 2px 0 0",
            }}
          />
        ))}
      </div>
    </div>
  );
}
