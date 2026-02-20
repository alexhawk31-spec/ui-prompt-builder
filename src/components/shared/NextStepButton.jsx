import usePromptStore from "../../store/usePromptStore";
import { CATEGORIES } from "../../constants/categories";
import { getShellColors } from "../../utils/shellColors";
import Icon from "./Icon";

export default function NextStepButton({ targetCategory, label }) {
  const setActiveCategory = usePromptStore((s) => s.setActiveCategory);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const cat = CATEGORIES.find((ct) => ct.id === targetCategory);
  const color = cat?.color || "#818cf8";

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
      <button
        onClick={() => setActiveCategory(targetCategory)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "10px 24px",
          borderRadius: 10,
          border: `1px solid ${color}30`,
          background: `${color}12`,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        <span style={{ color: c.muted }}>Next:</span>
        <span style={{ color }}>{label}</span>
        <Icon name="chevronRight" size={15} color={color} />
      </button>
    </div>
  );
}
