export default function DataPreview({ style, fineTune, accent }) {
  /* ── Row density → padding ── */
  const densityMap = { compact: 3, standard: 6, spacious: 10, expansive: 14 };
  const rowPad = densityMap[fineTune.rowDensity] ?? 6;

  /* ── Header style ── */
  function headerStyles() {
    const id = fineTune.headerStyle;
    const base = {
      fontSize: 8,
      fontFamily: "'DM Sans', sans-serif",
      padding: `${rowPad}px 6px`,
      letterSpacing: "0.04em",
    };
    if (id === "subtle")
      return {
        ...base,
        color: "rgba(255,255,255,0.35)",
        fontWeight: 500,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      };
    if (id === "bold")
      return {
        ...base,
        color: "#fff",
        fontWeight: 800,
        textTransform: "uppercase",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      };
    if (id === "sticky")
      return {
        ...base,
        color: "#fff",
        fontWeight: 800,
        textTransform: "uppercase",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      };
    if (id === "colored")
      return {
        ...base,
        color: "#fff",
        fontWeight: 700,
        background: `${accent}1A`,
        borderBottom: `1px solid ${accent}33`,
      };
    return { ...base, color: "rgba(255,255,255,0.35)", fontWeight: 500 };
  }

  /* ── Dividers ── */
  function dividerBorder() {
    const d = fineTune.dividers;
    if (d === "none") return "none";
    if (d === "hairline") return "1px solid rgba(255,255,255,0.06)";
    if (d === "solid") return "1px solid rgba(255,255,255,0.15)";
    return "none"; // zebra handled per-row
  }

  function zebraBackground(index) {
    if (fineTune.dividers === "zebra" && index % 2 === 0)
      return "rgba(255,255,255,0.03)";
    return "transparent";
  }

  /* ── Number style ── */
  function numStyle(value) {
    const id = fineTune.numberStyle;
    const base = { fontSize: 9, fontFamily: "'DM Sans', sans-serif", fontWeight: 400 };
    if (id === "tabularMono")
      return { ...base, fontFamily: "'JetBrains Mono', monospace", fontSize: 9 };
    if (id === "highlighted")
      return { ...base, fontWeight: 700, fontSize: 10 };
    if (id === "colorCoded") {
      const n = typeof value === "number" ? value : parseFloat(value);
      const color = n < 0 ? "#ef4444" : n > 0 ? "#22c55e" : "rgba(255,255,255,0.6)";
      return { ...base, color };
    }
    return base; // proportional
  }

  /* ── Row label (matches ButtonPreview) ── */
  const rowLabel = {
    width: 60,
    fontSize: 8,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  };

  /* ── Shared cell style ── */
  const cellBase = {
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'DM Sans', sans-serif",
    padding: `${rowPad}px 6px`,
    lineHeight: 1.3,
  };

  /* ── Wrapper ── */
  const wrap = { background: "#0d1018", padding: 16, borderRadius: 10 };

  /* ═══════════════ LEDGER ═══════════════ */
  if (style.id === "ledger") {
    const columns = ["Label", "Value", "Change"];
    const rows = [
      { label: "Revenue", value: "$84,230", change: 12.4 },
      { label: "Users", value: "2,847", change: 8.1 },
      { label: "Orders", value: "1,204", change: -3.2 },
      { label: "Growth", value: "23.7%", change: 23.7 },
    ];

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Table</div>
          <div style={{ flex: 1 }}>
            {/* Header */}
            <div style={{ display: "flex", ...headerStyles() }}>
              <div style={{ flex: 2 }}>{columns[0]}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{columns[1]}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{columns[2]}</div>
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  ...cellBase,
                  borderBottom:
                    i < rows.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(i),
                }}
              >
                <div style={{ flex: 2, color: "rgba(255,255,255,0.6)" }}>
                  {r.label}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    ...numStyle(r.change),
                  }}
                >
                  {r.value}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    ...numStyle(r.change),
                  }}
                >
                  {r.change > 0 ? "+" : ""}
                  {r.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ PULSE ═══════════════ */
  if (style.id === "pulse") {
    const kpis = [
      { label: "Revenue", value: "$84.2k", trend: "+12.4%" },
      { label: "Users", value: "2,847", trend: "+8.1%" },
    ];
    const bars = [
      { label: "Mon", height: 60 },
      { label: "Tue", height: 80 },
      { label: "Wed", height: 45 },
      { label: "Thu", height: 72 },
    ];

    return (
      <div style={wrap}>
        {/* KPI cards */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <div style={rowLabel}>KPIs</div>
          <div style={{ display: "flex", gap: 8, flex: 1 }}>
            {kpis.map((k) => (
              <div
                key={k.label}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  padding: `${rowPad + 4}px 8px`,
                }}
              >
                <div
                  style={{
                    ...numStyle(1),
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 2,
                  }}
                >
                  {k.value}
                </div>
                <div
                  style={{
                    fontSize: 7,
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 2,
                  }}
                >
                  {k.label}
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "#22c55e",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {"\u2191"} {k.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Chart</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              flex: 1,
              height: 48,
              paddingTop: 4,
            }}
          >
            {bars.map((b) => (
              <div
                key={b.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}
              >
                <div
                  style={{
                    width: "100%",
                    height: (b.height / 100) * 36,
                    background: accent,
                    borderRadius: 2,
                    opacity: 0.8,
                  }}
                />
                <div
                  style={{
                    fontSize: 7,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 3,
                  }}
                >
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ LINEN ═══════════════ */
  if (style.id === "linen") {
    const columns = ["Label", "Value", "Change"];
    const rows = [
      { label: "Revenue", value: "$84,230", change: 12.4 },
      { label: "Users", value: "2,847", change: 8.1 },
      { label: "Orders", value: "1,204", change: -3.2 },
      { label: "Growth", value: "23.7%", change: 23.7 },
    ];

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Table</div>
          <div style={{ flex: 1 }}>
            {/* Header */}
            <div style={{ display: "flex", ...headerStyles() }}>
              <div style={{ flex: 2 }}>{columns[0]}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{columns[1]}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{columns[2]}</div>
            </div>
            {/* Rows — more generous spacing, lighter text */}
            {rows.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  ...cellBase,
                  padding: `${rowPad + 2}px 6px`,
                  color: "rgba(255,255,255,0.55)",
                  borderBottom:
                    i < rows.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(i),
                }}
              >
                <div style={{ flex: 2, color: "rgba(255,255,255,0.5)" }}>
                  {r.label}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    ...numStyle(r.change),
                    color:
                      fineTune.numberStyle === "colorCoded"
                        ? undefined
                        : "rgba(255,255,255,0.5)",
                  }}
                >
                  {r.value}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "right",
                    ...numStyle(r.change),
                    color:
                      fineTune.numberStyle === "colorCoded"
                        ? undefined
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {r.change > 0 ? "+" : ""}
                  {r.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ EMBER ═══════════════ */
  if (style.id === "ember") {
    const cols = ["Metric", "Q1", "Q2"];
    const rows = [
      { label: "Conv. Rate", q1: 85, q2: 42 },
      { label: "Retention", q1: 72, q2: 23 },
      { label: "NPS", q1: 56, q2: 91 },
      { label: "Churn", q1: 12, q2: 38 },
    ];

    function intensityBg(val) {
      // Map 0-100 to 5%-30% accent opacity
      const pct = Math.max(5, Math.min(30, Math.round((val / 100) * 30)));
      const alpha = Math.round((pct / 100) * 255)
        .toString(16)
        .padStart(2, "0");
      return `${accent}${alpha}`;
    }

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Grid</div>
          <div style={{ flex: 1 }}>
            {/* Header */}
            <div style={{ display: "flex", ...headerStyles() }}>
              <div style={{ flex: 2 }}>{cols[0]}</div>
              <div style={{ flex: 1, textAlign: "center" }}>{cols[1]}</div>
              <div style={{ flex: 1, textAlign: "center" }}>{cols[2]}</div>
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  borderBottom:
                    i < rows.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(i),
                }}
              >
                <div
                  style={{
                    ...cellBase,
                    flex: 2,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    ...cellBase,
                    flex: 1,
                    textAlign: "center",
                    background: intensityBg(r.q1),
                    ...numStyle(r.q1),
                  }}
                >
                  {r.q1}%
                </div>
                <div
                  style={{
                    ...cellBase,
                    flex: 1,
                    textAlign: "center",
                    background: intensityBg(r.q2),
                    ...numStyle(r.q2),
                  }}
                >
                  {r.q2}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ TICKER ═══════════════ */
  if (style.id === "ticker") {
    const events = [
      { time: "2m ago", text: "New user signed up" },
      { time: "5m ago", text: "Order #1042 completed" },
      { time: "12m ago", text: "Payment received — $420" },
      { time: "18m ago", text: "Server deploy finished" },
    ];

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Feed</div>
          <div style={{ flex: 1, position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 4,
                top: 6,
                bottom: 6,
                width: 1,
                background: `${accent}40`,
              }}
            />
            {events.map((e, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: `${rowPad}px 0`,
                  borderBottom:
                    i < events.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(i),
                  position: "relative",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: accent,
                    flexShrink: 0,
                    marginTop: 1,
                    boxShadow: `0 0 6px ${accent}40`,
                  }}
                />
                {/* Timestamp */}
                <div
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'DM Sans', sans-serif",
                    width: 36,
                    flexShrink: 0,
                    ...numStyle(0),
                  }}
                >
                  {e.time}
                </div>
                {/* Description */}
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {e.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ LINEUP ═══════════════ */
  if (style.id === "lineup") {
    const plans = ["Basic", "Pro", "Enterprise"];
    const features = [
      { label: "Users", values: ["5", "50", "Unlimited"] },
      { label: "Storage", values: ["1 GB", "25 GB", "500 GB"] },
      { label: "Support", values: ["\u2014", "\u2713", "\u2713"] },
    ];

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Compare</div>
          <div style={{ flex: 1 }}>
            {/* Header row */}
            <div style={{ display: "flex", ...headerStyles() }}>
              <div style={{ flex: 1.2 }} />
              {plans.map((p, i) => (
                <div
                  key={p}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    ...(i === 1
                      ? { color: accent, fontWeight: 800 }
                      : {}),
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
            {/* Feature rows */}
            {features.map((f, fi) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  borderBottom:
                    fi < features.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(fi),
                }}
              >
                <div
                  style={{
                    ...cellBase,
                    flex: 1.2,
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 500,
                  }}
                >
                  {f.label}
                </div>
                {f.values.map((v, vi) => (
                  <div
                    key={vi}
                    style={{
                      ...cellBase,
                      flex: 1,
                      textAlign: "center",
                      ...(vi === 1
                        ? {
                            background: `${accent}0D`,
                            color: "rgba(255,255,255,0.8)",
                          }
                        : { color: "rgba(255,255,255,0.55)" }),
                      ...numStyle(0),
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ MOSAIC ═══════════════ */
  if (style.id === "mosaic") {
    const tiles = [
      { label: "Revenue", value: "$84k", trend: "+12%" },
      { label: "Users", value: "2.8k", trend: "+8%" },
      { label: "Orders", value: "1,204", trend: "-3%" },
      { label: "NPS", value: "72", trend: "+5%" },
    ];

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Cards</div>
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
          >
            {tiles.map((t) => {
              const isNeg = t.trend.startsWith("-");
              return (
                <div
                  key={t.label}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    padding: `${rowPad + 3}px 8px`,
                  }}
                >
                  <div
                    style={{
                      ...numStyle(isNeg ? -1 : 1),
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: 1,
                    }}
                  >
                    {t.value}
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: 2,
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: isNeg ? "#ef4444" : "#22c55e",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {isNeg ? "\u2193" : "\u2191"} {t.trend}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ TELETYPE ═══════════════ */
  if (style.id === "teletype") {
    const lines = [
      { key: "STATUS", value: "200" },
      { key: "LATENCY", value: "42ms" },
      { key: "UPTIME", value: "99.97%" },
      { key: "ERRORS", value: "0" },
    ];

    const monoBase = {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9,
      lineHeight: 1.3,
    };

    return (
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={rowLabel}>Output</div>
          <div style={{ flex: 1 }}>
            {lines.map((l, i) => (
              <div
                key={l.key}
                style={{
                  display: "flex",
                  padding: `${rowPad}px 0`,
                  borderBottom:
                    i < lines.length - 1 ? dividerBorder() : "none",
                  background: zebraBackground(i),
                }}
              >
                <div
                  style={{
                    ...monoBase,
                    width: 60,
                    color: "rgba(255,255,255,0.4)",
                    flexShrink: 0,
                  }}
                >
                  {l.key}
                </div>
                <div
                  style={{
                    ...monoBase,
                    color: accent,
                    fontWeight: fineTune.numberStyle === "highlighted" ? 700 : 400,
                  }}
                >
                  {l.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════ FALLBACK ═══════════════ */
  return (
    <div style={wrap}>
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "'DM Sans', sans-serif",
          textAlign: "center",
          padding: 20,
        }}
      >
        Preview not available for "{style.label}"
      </div>
    </div>
  );
}
