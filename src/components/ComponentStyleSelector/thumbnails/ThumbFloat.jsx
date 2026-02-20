export default function ThumbFloat({ label, desc }) {
  return (
    <div
      style={{
        height: "100%",
        background: "linear-gradient(180deg, #e8eaf0 0%, #d1d5e0 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 14px 35px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top highlight sheen */}
        <div style={{ height: 3, background: "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0.4))", flexShrink: 0 }} />
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", lineHeight: 1.1 }}>{label}</div>
          <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.3 }}>{desc}</div>
        </div>
      </div>
    </div>
  );
}
