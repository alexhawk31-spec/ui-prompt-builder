export default function ThumbCTA({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
      <div style={{ width: "55%", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }} />
      <div style={{ width: "30%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)" }} />
      {/* CTA button */}
      <div style={{ padding: "3px 10px", borderRadius: 4, background: color, marginTop: 2 }}>
        <div style={{ width: 16, height: 2, borderRadius: 1, background: "#fff" }} />
      </div>
    </div>
  );
}
