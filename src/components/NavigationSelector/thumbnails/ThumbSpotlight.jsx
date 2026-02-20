export default function ThumbSpotlight({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background content (dim) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          opacity: 0.3,
          paddingTop: 2,
        }}
      >
        <div
          style={{
            height: 3,
            width: "50%",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "85%",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "70%",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "60%",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 1,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          borderRadius: 4,
        }}
      />

      {/* Centered search modal */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* Search bar */}
        <div
          style={{
            width: "100%",
            height: 10,
            borderRadius: 3,
            border: `1px solid ${accent}`,
            background: "rgba(13,16,24,0.95)",
            display: "flex",
            alignItems: "center",
            padding: "0 3px",
            gap: 2,
          }}
        >
          {/* Search icon placeholder */}
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 4,
              border: `1px solid ${accent}55`,
              flexShrink: 0,
            }}
          />
          {/* Query text placeholder */}
          <div
            style={{
              height: 2,
              width: "60%",
              background: "rgba(255,255,255,0.2)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Result rows */}
        <div
          style={{
            width: "100%",
            background: "rgba(13,16,24,0.9)",
            borderRadius: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                height: 2,
                width: i === 0 ? "80%" : i === 1 ? "65%" : "50%",
                borderRadius: 1,
                background:
                  i === 0
                    ? accent + "44"
                    : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
