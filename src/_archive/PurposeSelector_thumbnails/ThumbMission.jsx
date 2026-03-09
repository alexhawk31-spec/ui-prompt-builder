export default function ThumbMission({ c, p }) {
  return (
    <div style={{ height: "100%", padding: 4, display: "flex", flexDirection: "column", gap: 2, background: p.bg }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[p.surface, p.accentBg, p.greenBg].map((bg, i) => (
          <div key={i} style={{ flex: 1, height: 8, borderRadius: 3, background: bg }} />
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", gap: 2 }}>
        {[3, 2, 3].map((n, ci) => (
          <div key={ci} style={{ flex: 1, borderRadius: 4, background: p.surface, border: `1px solid ${p.border}`, padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {Array(n).fill(0).map((_, ri) => (
              <div key={ri} style={{ borderRadius: 3, padding: 3, background: ci === 1 && ri === 0 ? p.accentBg : p.bg, border: `1px solid ${ci === 1 && ri === 0 ? `${c}40` : p.border}`, flexShrink: 0 }}>
                <div style={{ width: "70%", height: 2, borderRadius: 1, background: p.dim }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
