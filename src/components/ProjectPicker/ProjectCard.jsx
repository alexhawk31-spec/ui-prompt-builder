import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";

export default function ProjectCard({ project, selected, onSelect, p, Thumb }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const active = selected === project.id;

  return (
    <button
      onClick={() => onSelect(project.id)}
      style={{
        background: active ? `${project.color}08` : c.dim,
        border: active ? `2px solid ${project.color}` : `1px solid ${c.panelBorder}`,
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
        boxShadow: active ? `0 4px 20px ${project.color}20` : "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 80, overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
        <Thumb c={project.color} p={p} />
      </div>

      {/* Label + tagline */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: `1px solid ${active ? `${project.color}30` : c.panelBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: `${project.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name={project.icon} size={12} color={project.color} />
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: active ? c.text : c.muted,
            }}
          >
            {project.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: active ? c.text : c.muted,
            lineHeight: 1.4,
            opacity: active ? 0.85 : 0.7,
          }}
        >
          {project.tagline}
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
            background: project.color,
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
