import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";

export default function PurposeCard({ purpose, selected, onSelect, p, Thumb }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const active = selected === purpose.id;

  return (
    <button
      onClick={() => onSelect(purpose.id)}
      style={{
        background: active ? `${purpose.color}08` : c.dim,
        border: active ? `2px solid ${purpose.color}` : `1px solid ${c.panelBorder}`,
        borderRadius: 14,
        cursor: "pointer",
        fontFamily: "inherit",
        textAlign: "left",
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s",
        position: "relative",
        boxShadow: active ? `0 4px 20px ${purpose.color}20` : "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 80, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
        <Thumb c={purpose.color} p={p} />
      </div>

      {/* Label + description */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: `1px solid ${active ? `${purpose.color}30` : c.panelBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: `${purpose.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name={purpose.icon} size={12} color={purpose.color} />
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: active ? c.text : c.muted,
            }}
          >
            {purpose.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 9,
            color: c.muted,
            lineHeight: 1.4,
            opacity: active ? 0.8 : 0.5,
          }}
        >
          {purpose.desc}
        </div>
      </div>

      {/* Check badge */}
      {active && (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 18,
            height: 18,
            borderRadius: 5,
            background: purpose.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="check" size={10} color="#fff" />
        </div>
      )}
    </button>
  );
}
