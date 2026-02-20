export default function ThumbShelf({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        display: "flex",
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Labeled sidebar */}
      <div
        style={{
          width: "30%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 2,
          padding: 3,
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            height: 3,
            width: "60%",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 1,
            marginBottom: 2,
          }}
        />
        {/* Nav rows: icon dot + label line */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: "1px 2px",
              borderRadius: 2,
              background: i === 2 ? accent + "22" : "transparent",
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: 1,
                flexShrink: 0,
                background: i === 2 ? accent : "rgba(255,255,255,0.15)",
              }}
            />
            <div
              style={{
                height: 2,
                flex: 1,
                borderRadius: 1,
                background:
                  i === 2 ? accent + "99" : "rgba(255,255,255,0.1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingTop: 4,
        }}
      >
        <div
          style={{
            height: 3,
            width: "65%",
            background: "rgba(255,255,255,0.18)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "90%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "75%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "55%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
