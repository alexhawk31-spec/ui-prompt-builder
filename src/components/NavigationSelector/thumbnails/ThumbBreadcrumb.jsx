export default function ThumbBreadcrumb({ accent, label, desc }) {
  const font = "'DM Sans', sans-serif";
  const muted = "rgba(255,255,255,0.35)";
  const crumbs = ["Home", "Products", "Detail"];

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
        padding: "7px 6px 5px",
        gap: 6,
      }}
    >
      {/* Breadcrumb trail */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexShrink: 0,
        }}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={crumb} style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <span
                style={{
                  fontSize: 7,
                  color: isLast ? accent : muted,
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                {crumb}
              </span>
              {!isLast && (
                <span
                  style={{
                    fontSize: 7,
                    color: "rgba(255,255,255,0.2)",
                    lineHeight: 1,
                  }}
                >
                  {"\u203A"}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Page content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Heading */}
        <div
          style={{
            height: 3,
            width: "55%",
            background: "rgba(255,255,255,0.16)",
            borderRadius: 1,
          }}
        />
        {/* Body lines */}
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
            width: "75%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "60%",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
