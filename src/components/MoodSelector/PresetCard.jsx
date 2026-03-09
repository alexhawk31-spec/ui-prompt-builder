import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import MiniPreview from "./MiniPreview";

export default function PresetCard({ preset, isSelected, onClick, shellColors }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = shellColors || getShellColors(shellMode === "light");

  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: isSelected ? "rgba(129,140,248,0.06)" : c.dim,
        border: isSelected
          ? "1.5px solid rgba(129,140,248,0.4)"
          : `1px solid ${c.panelBorder}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "left",
        padding: 0,
        transition: "all 0.2s ease",
        outline: "none",
      }}
    >
      {/* Preview area */}
      <div style={{ height: 140, padding: 6, paddingBottom: 0 }}>
        <div
          style={{
            height: "100%",
            borderRadius: 10,
            overflow: "hidden",
            border: isSelected
              ? "1px solid rgba(129,140,248,0.2)"
              : `1px solid ${c.panelBorder}`,
          }}
        >
          <MiniPreview v={preset.v} />
        </div>
      </div>

      {/* Info area */}
      <div style={{ padding: "10px 12px 12px" }}>
        {/* Icon + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: isSelected
                ? "rgba(129,140,248,0.12)"
                : c.dim,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${
                isSelected ? "rgba(129,140,248,0.25)" : c.panelBorder
              }`,
            }}
          >
            <Icon
              name={preset.icon}
              size={12}
              color={isSelected ? "#818cf8" : c.muted}
            />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: isSelected ? c.text : c.muted,
            }}
          >
            {preset.name}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 10,
            color: c.muted,
            paddingLeft: 28,
            marginTop: 2,
            lineHeight: 1.3,
            opacity: 0.8,
          }}
        >
          {preset.tagline}
        </div>
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
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
