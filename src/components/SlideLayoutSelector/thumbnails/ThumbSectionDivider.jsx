export default function ThumbSectionDivider({ color }) {
  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${color}30, ${color}10)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "50%", height: 5, borderRadius: 3, background: color, opacity: 0.8 }} />
    </div>
  );
}
