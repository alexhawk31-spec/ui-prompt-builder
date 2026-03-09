export default function ThumbTicker({ accent, label, desc }) {
  const items = [
    { time: "2m ago", text: "User signed up", opacity: 1 },
    { time: "14m ago", text: "Payment received", opacity: 0.65 },
    { time: "1h ago", text: "Report exported", opacity: 0.4 },
  ];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: "8px 6px",
        display: "flex",
        flexDirection: "row",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Timeline spine */}
      <div
        style={{
          width: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            width: 1,
            background: accent,
            opacity: 0.2,
          }}
        />
        {/* Dots */}
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
                opacity: item.opacity,
                boxShadow:
                  i === 0 ? `0 0 4px ${accent}` : "none",
              }}
            />
          </div>
        ))}
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
          paddingLeft: 4,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              opacity: item.opacity,
            }}
          >
            <div
              style={{
                fontSize: 6,
                color: accent,
                lineHeight: 1,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {item.time}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1,
              }}
            >
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
