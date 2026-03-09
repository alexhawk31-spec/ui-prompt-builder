export default function ThumbLineup({ accent, label, desc }) {
  const plans = ["Free", "Pro", "Team"];
  const features = [
    ["5 GB", "50 GB", "500 GB"],
    ["1 user", "5 users", "Unlim"],
  ];
  const featureLabels = ["Storage", "Seats"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Plan header row */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          paddingLeft: 30,
        }}
      >
        {plans.map((plan, i) => (
          <div
            key={plan}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 7,
              fontWeight: 700,
              color: i === 1 ? accent : "rgba(255,255,255,0.5)",
              lineHeight: 1,
              padding: "3px 0",
              background:
                i === 1 ? `${accent}18` : "transparent",
              borderRadius: 3,
            }}
          >
            {plan}
          </div>
        ))}
      </div>
      {/* Feature rows */}
      {features.map((row, r) => (
        <div
          key={r}
          style={{
            display: "flex",
            gap: 2,
            padding: "5px 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            alignItems: "center",
          }}
        >
          {/* Feature label */}
          <div
            style={{
              width: 30,
              fontSize: 6,
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {featureLabels[r]}
          </div>
          {/* Values */}
          {row.map((val, c) => (
            <div
              key={c}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 7,
                fontFamily: "'JetBrains Mono', monospace",
                color:
                  c === 1
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(255,255,255,0.4)",
                lineHeight: 1,
                background:
                  c === 1 ? `${accent}0a` : "transparent",
                padding: "2px 0",
                borderRadius: 2,
              }}
            >
              {val}
            </div>
          ))}
        </div>
      ))}
      {/* Price row */}
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "5px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "auto",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 30,
            fontSize: 6,
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          Price
        </div>
        {["$0", "$12", "$49"].map((price, c) => (
          <div
            key={c}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 8,
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: c === 1 ? accent : "rgba(255,255,255,0.5)",
              lineHeight: 1,
              background:
                c === 1 ? `${accent}0a` : "transparent",
              padding: "2px 0",
              borderRadius: 2,
            }}
          >
            {price}
          </div>
        ))}
      </div>
    </div>
  );
}
