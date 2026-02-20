export default function ThumbBlueprint({ accent, label, desc }) {
  const ac = accent || "#3b82f6";

  return (
    <div
      style={{
        height: "100%",
        background: "#0c1a36",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      {/* Blueprint grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, ${ac}15 15px, ${ac}15 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, ${ac}15 15px, ${ac}15 16px)`,
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `${ac}08`,
          border: `1.5px solid ${ac}50`,
          borderRadius: 3,
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          position: "relative",
        }}
      >
        {/* Corner marks */}
        {[[0,0],[100,0],[0,100],[100,100]].map(([x,y], i) => (
          <div key={i} style={{
            position: "absolute",
            [y === 0 ? "top" : "bottom"]: -1,
            [x === 0 ? "left" : "right"]: -1,
            width: 8, height: 8,
            borderTop: y === 0 ? `2px solid ${ac}60` : "none",
            borderBottom: y === 100 ? `2px solid ${ac}60` : "none",
            borderLeft: x === 0 ? `2px solid ${ac}60` : "none",
            borderRight: x === 100 ? `2px solid ${ac}60` : "none",
          }} />
        ))}
        <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0", lineHeight: 1.1, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
        <div style={{ fontSize: 10, color: `${ac}90`, lineHeight: 1.3 }}>{desc}</div>
      </div>
    </div>
  );
}
