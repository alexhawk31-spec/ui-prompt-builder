import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import ScissorsMascot from "../shared/ScissorsMascot";

export default function TitleBar() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const toggleShellMode = usePromptStore((s) => s.toggleShellMode);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  return (
    <div
      style={{
        padding: "16px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ScissorsMascot size={32} expression="classic" />
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              fontFamily: "'Outfit',sans-serif",
              color: c.text,
              letterSpacing: "-0.02em",
            }}
          >
            Pintuck
          </div>
          <div style={{ fontSize: 10, color: c.muted, marginTop: -1 }}>
            Craft the vibe. Copy the prompt.
          </div>
        </div>
      </div>

      {/* Shell light/dark toggle */}
      <button
        onClick={toggleShellMode}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          borderRadius: 20,
          border: `1px solid ${c.panelBorder}`,
          background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
          cursor: "pointer",
          fontFamily: "inherit",
          color: c.muted,
          fontSize: 10,
          fontWeight: 600,
          transition: "all 0.2s",
        }}
      >
        <Icon
          name={isLight ? "sun" : "moon"}
          size={13}
          color={isLight ? "#f59e0b" : "#818cf8"}
        />
        {isLight ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
