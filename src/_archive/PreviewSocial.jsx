const POSTS = [
  { name: "Sarah Chen", handle: "@schen", time: "2m", body: "Just shipped the new onboarding flow. Dark mode looks incredible with this palette!", likes: 24, replies: 5 },
  { name: "Marcus Rivera", handle: "@mrivera", time: "18m", body: "Anyone else obsessed with these accent colors? The contrast is chef's kiss.", likes: 12, replies: 3 },
];

const AVATAR_COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6"];

export default function PreviewSocial({ bg, card, accent, text }) {
  const textMuted = `${text}80`;
  const borderSubtle = `${accent}08`;

  return (
    <>
      {/* Profile header card */}
      <div style={{
        borderRadius: 9, overflow: "hidden", marginBottom: 14,
        background: card, border: `1px solid ${borderSubtle}`,
      }}>
        {/* Banner */}
        <div style={{
          height: 36,
          background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
        }} />
        <div style={{ padding: "0 14px 12px", marginTop: -14 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: accent,
              border: `3px solid ${card}`, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: bg,
            }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: text }}>Alex Designer</div>
              <div style={{ fontSize: 9, color: textMuted }}>@alexdesigns</div>
            </div>
            <div style={{
              padding: "4px 12px", borderRadius: 6, background: accent,
              color: bg, fontSize: 9, fontWeight: 700,
            }}>Follow</div>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 9 }}>
            {[
              { label: "Posts", val: "847" },
              { label: "Following", val: "234" },
              { label: "Followers", val: "12.4K" },
            ].map((s, i) => (
              <div key={i}>
                <span style={{ fontWeight: 700, color: text, fontFamily: "'JetBrains Mono', monospace" }}>{s.val}</span>
                <span style={{ color: textMuted, marginLeft: 3 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {POSTS.map((post, i) => (
          <div key={i} style={{
            borderRadius: 9, padding: 12, background: card,
            border: `1px solid ${borderSubtle}`,
          }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, color: "#fff",
              }}>{post.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: text }}>{post.name}</span>
                  <span style={{ fontSize: 9, color: textMuted }}>{post.handle}</span>
                  <span style={{ fontSize: 8, color: `${text}55` }}>{post.time}</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: `${text}80`, lineHeight: 1.5, marginBottom: 10, paddingLeft: 30 }}>
              {post.body}
            </div>
            <div style={{ display: "flex", gap: 16, paddingLeft: 30 }}>
              {[
                { icon: "heart", val: post.likes },
                { icon: "reply", val: post.replies },
                { icon: "share", val: "" },
              ].map((action, j) => (
                <div key={j} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 9, color: j === 0 ? accent : textMuted, fontWeight: 500,
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 3,
                    background: j === 0 ? `${accent}15` : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: j === 0 ? "50%" : 1,
                      background: j === 0 ? accent : `${text}55`,
                    }} />
                  </div>
                  {action.val}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
