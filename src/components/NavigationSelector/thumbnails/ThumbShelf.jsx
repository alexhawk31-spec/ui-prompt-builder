export default function ThumbShelf({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.4)";
  const links = ["Home", "Products", "About", "Contact"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: font,
      }}
    >
      {/* Top navigation bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 6px 4px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: 2,
            background: accent,
            flexShrink: 0,
            opacity: 0.85,
          }}
        />
        {/* Nav links */}
        {links.map((link, i) => {
          const active = i === 1;
          return (
            <div
              key={link}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                style={{
                  fontSize: 7,
                  color: active ? "rgba(255,255,255,0.9)" : muted,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {link}
              </span>
              <div
                style={{
                  height: 2,
                  width: "100%",
                  borderRadius: 1,
                  background: active ? accent : "transparent",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Content area with placeholder cards */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 4,
          padding: "6px 6px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 3,
              height: "100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
