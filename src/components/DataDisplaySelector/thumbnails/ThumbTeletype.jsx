export default function ThumbTeletype({ accent, label, desc }) {
  const lines = [
    { key: "STATUS", value: "200" },
    { key: "LATENCY", value: "42ms" },
    { key: "UPTIME", value: "99.97%" },
    { key: "MEMORY", value: "1.2 GB" },
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "#0a0e14",
        padding: "8px 8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', monospace",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            lineHeight: 1,
          }}
        >
          {/* Green prompt marker */}
          <span
            style={{
              fontSize: 7,
              color: "#34d399",
              opacity: 0.8,
              flexShrink: 0,
            }}
          >
            {">"}
          </span>
          {/* Key */}
          <span
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,0.4)",
              minWidth: 38,
              flexShrink: 0,
            }}
          >
            {line.key}
          </span>
          {/* Value */}
          <span
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: accent,
              lineHeight: 1,
            }}
          >
            {line.value}
          </span>
        </div>
      ))}
      {/* Cursor line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: 7,
            color: "#34d399",
            opacity: 0.8,
          }}
        >
          {">"}
        </span>
        <div
          style={{
            width: 5,
            height: 8,
            background: accent,
            opacity: 0.7,
            animation: "blink 1s step-end infinite",
          }}
        />
      </div>
    </div>
  );
}
