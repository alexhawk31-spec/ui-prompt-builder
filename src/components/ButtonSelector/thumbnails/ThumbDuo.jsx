export default function ThumbDuo({ accent, label, desc }) {
  const ac = accent || "#e879f9";
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: 10,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Primary — split: dark icon zone + accent label zone */}
      <div
        style={{
          width: "100%",
          display: "flex",
          borderRadius: 6,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            padding: "5px 8px",
            background: `${ac}`,
            filter: "brightness(0.7)",
            fontSize: 9,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &rarr;
        </div>
        <div
          style={{
            flex: 1,
            padding: "5px 10px",
            background: ac,
            fontSize: 9,
            fontWeight: 700,
            color: "#0d1018",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Get Started
        </div>
      </div>
      {/* Secondary — split: tinted icon zone + outline label zone */}
      <div
        style={{
          width: "100%",
          display: "flex",
          borderRadius: 6,
          overflow: "hidden",
          border: `1px solid ${ac}55`,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            padding: "4px 7px",
            background: `${ac}20`,
            fontSize: 8,
            color: ac,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: `1px solid ${ac}33`,
          }}
        >
          &rarr;
        </div>
        <div
          style={{
            flex: 1,
            padding: "4px 10px",
            background: "transparent",
            fontSize: 8,
            fontWeight: 600,
            color: ac,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Learn More
        </div>
      </div>
      {/* Tertiary — text only with subtle divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 8,
          fontWeight: 600,
          color: `${ac}99`,
          lineHeight: 1.2,
        }}
      >
        <span style={{ opacity: 0.5 }}>&rarr;</span>
        <span style={{ width: 1, height: 8, background: `${ac}33` }} />
        Skip
      </div>
    </div>
  );
}
