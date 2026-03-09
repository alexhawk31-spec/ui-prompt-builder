const STAT_SETS = {
  default: [
    { l: "Revenue", v: "$2.4M", c: "+12.4%" },
    { l: "Users", v: "18.2K", c: "+8.1%" },
    { l: "Latency", v: "42ms", c: "-3.2%" },
    { l: "Uptime", v: "99.9%", c: "stable" },
  ],
  terminal: [
    { l: "CPU", v: "34%", c: "stable" },
    { l: "MEM", v: "8.2G", c: "+0.4%" },
    { l: "I/O", v: "1.2K", c: "+2.1%" },
    { l: "NET", v: "840M", c: "-0.3%" },
  ],
  editorial: [
    { l: "Readers", v: "42K", c: "+18%" },
    { l: "Articles", v: "156", c: "+3" },
    { l: "Avg. Time", v: "4:22", c: "+12%" },
  ],
  playful: [
    { l: "Points", v: "12.4K", c: "+340" },
    { l: "Streak", v: "14d", c: "+1" },
    { l: "Level", v: "38", c: "+2" },
  ],
  ops: [
    { l: "NODES", v: "284", c: "stable" },
    { l: "ALERTS", v: "3", c: "-2" },
    { l: "p99", v: "18ms", c: "-4.1%" },
    { l: "ERRS", v: "0.02%", c: "-0.01%" },
  ],
  brutalist: [
    { l: "VIEWS", v: "91K", c: "+22%" },
    { l: "CTR", v: "4.8%", c: "+0.3%" },
    { l: "CONV", v: "2.1%", c: "+0.5%" },
  ],
  glass: [
    { l: "Streams", v: "2.8K", c: "+14%" },
    { l: "Listeners", v: "890", c: "+6.2%" },
  ],
  luxe: [
    { l: "AUM", v: "$14.2M", c: "+3.8%" },
    { l: "Yield", v: "7.4%", c: "+0.6%" },
    { l: "Alpha", v: "+2.1%", c: "stable" },
  ],
};

export default function MiniPreview({ v }) {
  const {
    bg, card, accent, text, muted, dimmer, radius, font,
    headSize, headWeight, valSize, valWeight, valFont,
    labelSize, labelCase, labelSpacing,
    cardPad, gap, cardCount, barCount, barGap,
    showNav, showTabs, tabStyle,
    border, shadow, glass, glow, brutalist, light,
    headText, chartLabel, barAccentStart, titleDecor,
    statSet,
  } = v;

  const stats = (STAT_SETS[statSet] || STAT_SETS.default).slice(0, cardCount);

  const bars = Array.from({ length: barCount }, (_, i) =>
    25 + Math.sin(i * 0.8 + 1) * 22 + (i * 2.3 % 20)
  );

  const cardBg = glass
    ? "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
    : card;

  const tabItems = ["Overview", "Analytics", "Reports"];

  const greenColor = light ? "#16a34a" : "#34d399";

  return (
    <div
      style={{
        background: bg,
        padding: cardPad,
        fontFamily: font,
        height: "100%",
        overflow: "hidden",
        borderRadius: Math.max(radius - 2, 4),
        position: "relative",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: gap,
        }}
      >
        <div
          style={{
            fontSize: headSize,
            fontWeight: headWeight,
            color: text,
            fontFamily: font,
            fontStyle: titleDecor === "italic" ? "italic" : "normal",
            letterSpacing: brutalist ? "0.08em" : undefined,
            lineHeight: 1.1,
          }}
        >
          {headText}
        </div>
        <div
          style={{
            fontSize: 5,
            fontWeight: 700,
            color: brutalist ? accent : "#fff",
            background: brutalist
              ? "transparent"
              : glow
                ? `linear-gradient(135deg, ${accent}, ${accent}aa)`
                : accent,
            padding: brutalist ? "1px 3px" : "2px 5px",
            borderRadius: brutalist ? 0 : Math.max(radius - 4, 2),
            border: brutalist ? `1px solid ${accent}` : "none",
            boxShadow: glow ? `0 0 8px ${accent}60` : "none",
            textTransform: brutalist ? "uppercase" : "none",
            letterSpacing: brutalist ? "0.06em" : 0,
            lineHeight: 1,
          }}
        >
          Live
        </div>
      </div>

      {/* Tabs */}
      {showTabs && (
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: gap,
          }}
        >
          {tabItems.map((tab, i) => {
            const isActive = i === 0;

            if (tabStyle === "pill") {
              return (
                <div
                  key={tab}
                  style={{
                    fontSize: 5,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? accent : muted,
                    background: isActive ? `${accent}18` : "transparent",
                    padding: "2px 6px",
                    borderRadius: Math.max(radius - 4, 2),
                    lineHeight: 1.3,
                  }}
                >
                  {tab}
                </div>
              );
            }

            if (tabStyle === "underline-bold") {
              return (
                <div
                  key={tab}
                  style={{
                    fontSize: 5,
                    fontWeight: isActive ? 900 : 400,
                    color: isActive ? text : muted,
                    padding: "2px 4px",
                    borderBottom: isActive ? `2px solid ${accent}` : "2px solid transparent",
                    borderRadius: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {tab}
                </div>
              );
            }

            // underline (default)
            return (
              <div
                key={tab}
                style={{
                  fontSize: 5,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? text : muted,
                  padding: "2px 4px",
                  borderBottom: isActive ? `1px solid ${accent}` : "1px solid transparent",
                  borderRadius: 0,
                  lineHeight: 1.3,
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
      )}

      {/* Body: flex row with optional sidebar nav + main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: gap,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Sidebar nav */}
        {showNav && (
          <div
            style={{
              width: 38,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: glass ? cardBg : card,
              border: border,
              borderRadius: radius > 0 ? Math.max(radius - 4, 2) : 0,
              padding: 3,
              ...(glass ? { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } : {}),
              ...(shadow !== "none" ? { boxShadow: shadow } : {}),
            }}
          >
            {["Home", "Data", "Logs", "Cfg"].map((item, i) => {
              const isActive = i === 0;
              return (
                <div
                  key={item}
                  style={{
                    fontSize: 4.5,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? accent : dimmer,
                    padding: "2px 3px",
                    borderLeft: `2px solid ${isActive ? accent : "transparent"}`,
                    paddingLeft: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: gap }}>
          {/* Stat cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cardCount}, 1fr)`,
              gap: gap,
            }}
          >
            {stats.map((s) => (
              <div
                key={s.l}
                style={{
                  background: glass ? cardBg : card,
                  border: border,
                  borderRadius: brutalist ? 0 : Math.max(radius - 4, 2),
                  padding: Math.max(cardPad - 3, 3),
                  boxShadow: shadow !== "none" ? shadow : "none",
                  ...(glass ? { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } : {}),
                }}
              >
                <div
                  style={{
                    fontSize: labelSize,
                    textTransform: brutalist ? "uppercase" : labelCase,
                    letterSpacing: labelSpacing,
                    color: muted,
                    marginBottom: 2,
                    lineHeight: 1.2,
                    fontWeight: 500,
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontSize: valSize,
                    fontWeight: valWeight,
                    fontFamily: valFont,
                    color: text,
                    lineHeight: 1.1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: Math.max(labelSize - 1, 4),
                    marginTop: 2,
                    fontWeight: 500,
                    color: s.c.startsWith("+")
                      ? greenColor
                      : s.c.startsWith("-")
                        ? accent
                        : muted,
                    lineHeight: 1.2,
                  }}
                >
                  {s.c}
                </div>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div
            style={{
              background: glass ? cardBg : card,
              border: border,
              borderRadius: brutalist ? 0 : Math.max(radius - 4, 2),
              padding: Math.max(cardPad - 3, 3),
              boxShadow: shadow !== "none" ? shadow : "none",
              flex: 1,
              minHeight: 0,
              ...(glass ? { backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } : {}),
            }}
          >
            <div
              style={{
                fontSize: labelSize,
                textTransform: brutalist ? "uppercase" : labelCase,
                letterSpacing: labelSpacing,
                color: muted,
                marginBottom: 4,
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              {chartLabel}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: barGap,
                height: 36,
              }}
            >
              {bars.map((h, i) => {
                const isHighlighted = i >= barAccentStart;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${Math.min(Math.max(h, 10), 95)}%`,
                      borderRadius: brutalist ? 0 : Math.max(radius - 8, 1),
                      background: isHighlighted ? accent : `${accent}30`,
                      boxShadow: isHighlighted && glow ? `0 0 6px ${accent}70` : "none",
                      transition: "height 0.3s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
