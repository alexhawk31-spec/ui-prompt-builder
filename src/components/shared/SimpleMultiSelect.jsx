import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "./Icon";

/**
 * Simple multi-select checklist used by Cards/Data/Animation in Presentation & One Pager modes.
 * Stores selections as a cardStyle/dataStyle object with styleId = comma-separated selected IDs.
 */
export default function SimpleMultiSelect({
  options,
  selections,
  onToggle,
  color = "#818cf8",
  columns = 2,
}) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
      }}
    >
      {options.map((opt) => {
        const active = selections.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: active
                ? `1.5px solid ${color}`
                : `1px solid ${c.panelBorder}`,
              background: active
                ? `${color}12`
                : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              transition: "all 0.15s",
              textAlign: "left",
            }}
          >
            {/* Checkbox */}
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: active
                  ? `2px solid ${color}`
                  : `1.5px solid rgba(255,255,255,0.15)`,
                background: active ? color : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
                transition: "all 0.15s",
              }}
            >
              {active && <Icon name="check" size={9} color="#0c0e14" />}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icon
                  name={opt.icon || "layers"}
                  size={12}
                  color={active ? color : c.muted}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: active ? 700 : 500,
                    color: active ? color : c.muted,
                  }}
                >
                  {opt.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: c.muted,
                  marginTop: 3,
                  lineHeight: 1.3,
                }}
              >
                {opt.desc}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
