export default function ThumbBreadcrumb({ accent }) {
  return (
    <div
      style={{
        height: "100%",
        background: "#0d1018",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Breadcrumb trail */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexShrink: 0,
          paddingTop: 1,
        }}
      >
        {/* Segment 1 (parent - dim) */}
        <div
          style={{
            height: 2,
            width: 10,
            borderRadius: 1,
            background: "rgba(255,255,255,0.12)",
          }}
        />
        {/* Chevron */}
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "2px solid transparent",
            borderBottom: "2px solid transparent",
            borderLeft: "2px solid rgba(255,255,255,0.15)",
          }}
        />
        {/* Segment 2 (parent - dim) */}
        <div
          style={{
            height: 2,
            width: 14,
            borderRadius: 1,
            background: "rgba(255,255,255,0.15)",
          }}
        />
        {/* Chevron */}
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "2px solid transparent",
            borderBottom: "2px solid transparent",
            borderLeft: "2px solid rgba(255,255,255,0.15)",
          }}
        />
        {/* Segment 3 (current - bright) */}
        <div
          style={{
            height: 2,
            width: 16,
            borderRadius: 1,
            background: accent,
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div
          style={{
            height: 3,
            width: "60%",
            background: "rgba(255,255,255,0.16)",
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
            background: "rgba(255,255,255,0.07)",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            height: 2,
            width: "50%",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}
