export default function ThumbTitleSlide({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a2e", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <div style={{ width: "70%", height: 6, borderRadius: 3, background: color, opacity: 0.9 }} />
      <div style={{ width: "45%", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.25)" }} />
      <div style={{ width: "30%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)", marginTop: 4 }} />
    </div>
  );
}
