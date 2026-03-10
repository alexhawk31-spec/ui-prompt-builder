import { useMemo } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { THEMES } from "../../constants/themes";
import { getPreviewPalette } from "../PurposeSelector/constants";
import MiniPreview from "./MiniPreview";

export default function PresetCard({ preset, isSelected, onClick }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const themeId = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const customColors = usePromptStore((s) => s.customColors);
  const previewMode = usePromptStore((s) => s.previewMode);

  const palette = useMemo(() => {
    const base = THEMES.find((t) => t.id === themeId);
    if (!base) return null;
    const overrides = customColors[themeId] || {};
    const accent = customAccents[themeId] || base.preview.accent;
    const effectiveTheme = { ...base, preview: { ...base.preview, ...overrides, accent } };
    return getPreviewPalette(previewMode === "dark", effectiveTheme);
  }, [themeId, customAccents, customColors, previewMode]);

  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: isSelected ? "rgba(129,140,248,0.06)" : c.dim,
        border: isSelected
          ? "2px solid rgba(129,140,248,0.5)"
          : `1px solid ${c.panelBorder}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "left",
        padding: 0,
        transition: "all 0.2s ease",
        outline: "none",
        boxShadow: isSelected ? "0 4px 20px rgba(129,140,248,0.2)" : "none",
      }}
    >
      {/* Preview fills the entire card */}
      <div style={{ height: 140, position: "relative" }}>
        <div style={{ height: "100%", overflow: "hidden" }}>
          <MiniPreview v={preset.v} palette={palette} />
        </div>

        {/* Name overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 10px 8px",
            background: `linear-gradient(to top, ${palette?.bg || preset.v.bg}ee 30%, ${palette?.bg || preset.v.bg}00 100%)`,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: palette?.text || preset.v.text,
              textShadow: `0 1px 3px ${palette?.bg || preset.v.bg}80`,
            }}
          >
            {preset.name}
          </span>
        </div>
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            borderRadius: 6,
            background: "#818cf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  );
}
