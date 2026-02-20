const STAT_CARDS = [
  { label: "Revenue", value: "$2.4M", change: "+12.4%" },
  { label: "Active Users", value: "18.2K", change: "+8.1%" },
  { label: "Latency", value: "42ms", change: "-3.2%" },
];

const NAV_ITEMS = ["Dashboard", "Analytics", "Settings", "Team"];

const BAR_HEIGHTS = [35, 55, 40, 70, 60, 80, 50, 65, 75, 45, 85, 55];

export default function PreviewDashboard({ bg, card, accent, text }) {
  const textMuted = `${text}80`;

  return (
    <>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14, minWidth: 0, overflow: "hidden" }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} style={{
            borderRadius: 9, padding: 13, background: card,
            border: `1px solid ${accent}10`,
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: textMuted }}>
              {s.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: text, letterSpacing: "-0.02em", fontFamily: "'JetBrains Mono', monospace" }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: accent }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Nav + Chart */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: 10, minHeight: 70, minWidth: 0, overflow: "hidden" }}>
        <div style={{
          borderRadius: 9, padding: 10, background: card,
          border: `1px solid ${accent}08`,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_ITEMS.map((item, i) => (
            <div key={i} style={{
              padding: "5px 8px", borderRadius: 5,
              background: i === 0 ? `${accent}12` : "transparent",
              fontSize: 10, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? accent : `${text}75`,
              borderLeft: i === 0 ? `2px solid ${accent}` : "2px solid transparent",
            }}>{item}</div>
          ))}
        </div>
        <div style={{
          borderRadius: 9, padding: 12, background: card,
          border: `1px solid ${accent}08`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          position: "relative",
        }}>
          <div style={{
            fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
            color: `${text}65`, position: "absolute", top: 10, left: 12,
          }}>Performance</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 44 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div key={i} style={{
                flex: 1, height: `${h}%`, borderRadius: 2,
                background: i >= 10 ? accent : `${accent}22`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
