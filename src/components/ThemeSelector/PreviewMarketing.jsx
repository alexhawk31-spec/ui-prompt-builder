const FEATURES = [
  { title: "Lightning Fast", desc: "Sub-50ms response times across all endpoints" },
  { title: "Secure by Default", desc: "End-to-end encryption with zero-trust architecture" },
  { title: "Scale Infinitely", desc: "Auto-scaling infrastructure that grows with you" },
];

export default function PreviewMarketing({ bg, card, accent, text }) {
  const textMuted = `${text}80`;

  return (
    <>
      {/* Hero */}
      <div style={{
        borderRadius: 9, padding: "20px 18px", marginBottom: 14,
        background: card, border: `1px solid ${accent}10`,
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block", padding: "3px 10px", borderRadius: 999,
          background: `${accent}15`, color: accent,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          marginBottom: 10,
        }}>
          Now Available
        </div>
        <div style={{
          fontSize: 18, fontWeight: 700, color: text, letterSpacing: "-0.03em",
          lineHeight: 1.2, marginBottom: 6,
        }}>
          Build beautiful products<br />faster than ever
        </div>
        <div style={{ fontSize: 10, color: textMuted, lineHeight: 1.5, marginBottom: 14, maxWidth: 260, margin: "0 auto 14px" }}>
          The modern toolkit for teams who ship. Design, develop, and deploy — all in one place.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <div style={{
            padding: "7px 18px", borderRadius: 7, background: accent,
            color: bg, fontSize: 10, fontWeight: 700, boxShadow: `0 3px 12px ${accent}30`,
          }}>Get Started Free</div>
          <div style={{
            padding: "7px 18px", borderRadius: 7, background: card,
            border: `1px solid ${accent}20`, color: text, fontSize: 10, fontWeight: 600,
          }}>Watch Demo</div>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            borderRadius: 9, padding: 13, background: card,
            border: `1px solid ${accent}08`,
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {/* Icon dot */}
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: `${accent}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: accent }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: text }}>{f.title}</div>
            <div style={{ fontSize: 9, color: textMuted, lineHeight: 1.4 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Social proof strip */}
      <div style={{
        marginTop: 14, padding: "10px 14px", borderRadius: 9,
        background: card, border: `1px solid ${accent}06`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Avatar stack */}
          <div style={{ display: "flex" }}>
            {["#6366f1", "#ec4899", "#f59e0b", "#10b981"].map((c, i) => (
              <div key={i} style={{
                width: 18, height: 18, borderRadius: "50%", background: c,
                border: `2px solid ${card}`,
                marginLeft: i > 0 ? -6 : 0, position: "relative", zIndex: 4 - i,
              }} />
            ))}
          </div>
          <div style={{ fontSize: 9, color: textMuted }}>
            <span style={{ color: text, fontWeight: 600 }}>2,400+</span> teams already building
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} style={{
              width: 8, height: 8, borderRadius: 1,
              background: s <= 4 ? accent : `${accent}30`,
            }} />
          ))}
        </div>
      </div>
    </>
  );
}
