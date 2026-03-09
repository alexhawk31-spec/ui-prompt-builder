export default function ThumbRibbon({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.4)";
  const links = ["Overview", "Features", "Pricing", "FAQ"];

  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        overflow: "hidden",
        fontFamily: font,
        padding: "6px 6px",
        gap: 5,
      }}
    >
      {/* Content above */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div
          style={{
            height: 3,
            width: "50%",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "80%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>

      {/* Centered pill-shaped ribbon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          padding: "3px 5px",
          flexShrink: 0,
        }}
      >
        {links.map((link, i) => {
          const active = i === 1;
          return (
            <span
              key={link}
              style={{
                fontSize: 7,
                padding: "2px 4px",
                borderRadius: 999,
                background: active ? accent : "transparent",
                color: active ? "#0d1018" : muted,
                whiteSpace: "nowrap",
                lineHeight: 1,
                fontWeight: active ? 600 : 400,
              }}
            >
              {link}
            </span>
          );
        })}
      </div>

      {/* Content below */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          flex: 1,
        }}
      >
        <div
          style={{
            height: 2,
            width: "90%",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "65%",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
