export default function ThumbFullBleed({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(180deg, ${color}20 0%, #1a1a2e 100%)`, borderRadius: 8, position: "relative", overflow: "hidden" }}>
      {/* Image placeholder */}
      <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, ${color}08, ${color}08 4px, transparent 4px, transparent 8px)` }} />
      {/* Text overlay at bottom */}
      <div style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}>
        <div style={{ width: "60%", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.7)" }} />
        <div style={{ width: "35%", height: 2, borderRadius: 1, background: "rgba(255,255,255,0.3)", marginTop: 3 }} />
      </div>
    </div>
  );
}
