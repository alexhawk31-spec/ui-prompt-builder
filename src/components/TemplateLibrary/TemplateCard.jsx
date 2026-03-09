import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { THEMES } from "../../constants/themes";

export default function TemplateCard({ template, onPreview, isSelected, accent }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [hovered, setHovered] = useState(false);

  // Resolve theme preview colors
  const themeMatch = THEMES.find((t) => t.id === template.config.theme);
  const previewColors = themeMatch
    ? [
        themeMatch.preview.bg,
        themeMatch.preview.card,
        themeMatch.preview.accent,
        themeMatch.preview.secondary,
        themeMatch.preview.text,
      ]
    : ["#555", "#666", "#777", "#888", "#999"];

  const isSystem = template.author === "system";

  const borderColor = isSelected
    ? accent
    : hovered
      ? `${accent}60`
      : c.panelBorder;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPreview(template)}
      style={{
        background: isSelected
          ? `${accent}08`
          : hovered
            ? isLight
              ? "rgba(230,232,242,1)"
              : "rgba(38,42,62,0.9)"
            : c.panelBg,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 12,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "all 0.2s",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 8px ${accent}80`,
          }}
        />
      )}

      {/* Name */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: isSelected ? accent : c.text,
          lineHeight: 1.3,
          paddingRight: isSelected ? 18 : 0,
        }}
      >
        {template.name}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 11,
          color: c.muted,
          lineHeight: 1.4,
        }}
      >
        {template.description}
      </div>

      {/* Author badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 9,
            fontWeight: 700,
            background: isSystem
              ? `${accent}18`
              : "rgba(34,197,94,0.12)",
            color: isSystem ? accent : "#22c55e",
            border: `1px solid ${
              isSystem ? `${accent}30` : "rgba(34,197,94,0.25)"
            }`,
          }}
        >
          {isSystem ? "System" : "Community"}
        </span>
      </div>

      {/* Color preview dots */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {previewColors.map((color, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              border: "1px solid rgba(128,128,128,0.2)",
            }}
          />
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {template.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "1px 6px",
              borderRadius: 4,
              fontSize: 8,
              fontWeight: 600,
              color: c.muted,
              background: c.dim,
              border: `1px solid ${c.panelBorder}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: isSelected ? accent : `${accent}90`,
          }}
        >
          {isSelected ? "Previewing — click again to explore" : "Click to preview"}
        </span>
      </div>
    </div>
  );
}
