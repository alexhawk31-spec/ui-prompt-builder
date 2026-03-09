import { useRef, useCallback, useState } from "react";
import { useDrag } from "../../hooks/useDrag";
import Icon from "../shared/Icon";

// Light-colored accents that need a dark checkmark for contrast
const LIGHT_ACCENTS = new Set([
  "#C9A84C", "#D4AF37", "#E8D5B7", "#b8ff00", "#fee440", "#fbbf24",
  "#eab308", "#f59e0b", "#fb923c", "#A8B2BD", "#a5f3fc", "#67e8f9",
  "#fca5a5", "#86efac", "#a3e635", "#4ade80", "#34d399", "#c084fc",
  "#a78bfa", "#60a5fa", "#f87171", "#22d3ee", "#38bdf8", "#f97066",
  "#84cc16",
]);

export default function AccentColorPicker({ options, value, onChange, themeBg, label }) {
  const trackRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const activeIndex = Math.max(0, options.indexOf(value));
  const isLightBg = themeBg === "#ffffff" || themeBg.startsWith("#f") || themeBg.startsWith("#F");
  const labelColor = isLightBg ? "rgba(44,62,80,0.38)" : "rgba(240,237,230,0.38)";
  const mutedColor = isLightBg ? "rgba(44,62,80,0.32)" : "rgba(240,237,230,0.32)";

  const handleMove = useCallback(
    (clientX) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const index = Math.round(pct * (options.length - 1));
      if (options[index] && options[index] !== value) onChange(options[index]);
    },
    [options, value, onChange],
  );

  const { dragging, onPointerDown } = useDrag(handleMove);

  const thumbPct = (activeIndex / Math.max(options.length - 1, 1)) * 100;

  return (
    <div style={{ padding: "14px 0 4px" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: labelColor }}>
          {label || "Accent Color"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: mutedColor }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: value, border: "1px solid rgba(128,128,128,0.2)" }} />
          {value}
        </div>
      </div>

      {/* Gradient track */}
      <div
        ref={trackRef}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
        style={{ position: "relative", height: 40, cursor: "pointer", userSelect: "none", touchAction: "none" }}
      >
        {/* Gradient bar */}
        <div style={{
          position: "absolute", top: 14, left: 0, right: 0, height: 12, borderRadius: 6,
          background: `linear-gradient(to right, ${options.join(", ")})`,
          boxShadow: `0 2px 8px ${value}25`,
          border: "1px solid rgba(128,128,128,0.15)",
        }} />

        {/* Stop dots */}
        {options.map((color, i) => {
          const leftPct = (i / Math.max(options.length - 1, 1)) * 100;
          const isActive = i === activeIndex;
          const isHovered = i === hoverIndex;
          return (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); onChange(color); }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                top: isActive ? 8 : 12,
                transform: "translateX(-50%)",
                width: isActive ? 24 : isHovered ? 18 : 14,
                height: isActive ? 24 : isHovered ? 18 : 14,
                borderRadius: "50%",
                background: color,
                border: isActive ? "3px solid #fff" : "2px solid rgba(255,255,255,0.5)",
                boxShadow: isActive
                  ? `0 2px 12px ${color}60, 0 0 0 2px ${color}30`
                  : "0 1px 4px rgba(0,0,0,0.2)",
                cursor: "grab",
                transition: dragging ? "none" : "all 0.2s ease",
                zIndex: isActive ? 10 : isHovered ? 5 : 1,
              }}
            />
          );
        })}

        {/* Invisible drag hit target */}
        <div style={{
          position: "absolute", left: `${thumbPct}%`, top: 2, transform: "translateX(-50%)",
          width: 36, height: 36, borderRadius: "50%", cursor: dragging ? "grabbing" : "grab",
          zIndex: 20, opacity: 0,
        }} />
      </div>

      {/* Click circles */}
      <div style={{ display: "flex", gap: 6, marginTop: 6, justifyContent: "center" }}>
        {options.map((color, i) => {
          const isActive = color === value;
          return (
            <button
              key={i}
              onClick={() => onChange(color)}
              title={color}
              style={{
                width: isActive ? 28 : 22, height: isActive ? 28 : 22,
                borderRadius: "50%", border: "none", cursor: "pointer",
                background: color,
                outline: isActive ? `2px solid ${color}` : "none",
                outlineOffset: 3,
                boxShadow: isActive ? `0 2px 10px ${color}40` : "0 1px 3px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              {isActive && (
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="check" size={10} color={LIGHT_ACCENTS.has(color) ? "#000" : "#fff"} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
