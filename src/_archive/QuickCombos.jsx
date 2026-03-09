import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { MOOD_PRESETS, MOOD_COMBOS } from "./constants";
import Icon from "../shared/Icon";
import MiniPreview from "./MiniPreview";

export default function QuickCombos({ onSelectCombo }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  return (
    <div
      style={{
        background: c.dim,
        border: `1px solid ${c.panelBorder}`,
        borderRadius: 12,
        padding: 16,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="sparkles" size={14} color="#fbbf24" />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: c.text,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Quick Combos
          </span>
        </div>
        <div
          style={{
            fontSize: 10,
            color: c.muted,
            marginTop: 4,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Mood + Purpose paired together — sets multiple sections at once
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
        }}
      >
        {MOOD_COMBOS.map((combo) => {
          const moodData = MOOD_PRESETS.find((p) => p.id === combo.mood);

          return (
            <button
              key={combo.label}
              onClick={() => onSelectCombo(combo.mood, combo.purpose)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 10,
                background: c.dim,
                border: `1px solid ${c.panelBorder}`,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "left",
                outline: "none",
              }}
            >
              {/* Mini-preview thumbnail */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  overflow: "hidden",
                  border: `1px solid ${c.panelBorder}`,
                  flexShrink: 0,
                }}
              >
                <MiniPreview v={moodData.v} />
              </div>

              {/* Label + description */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.text,
                    lineHeight: 1.3,
                  }}
                >
                  {combo.label}
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: c.muted,
                    lineHeight: 1.3,
                  }}
                >
                  {combo.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
