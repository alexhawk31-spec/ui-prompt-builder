import usePromptStore from "../../store/usePromptStore";
import { CATEGORIES } from "../../constants/categories";
import Icon from "../shared/Icon";

export default function ContentHeader() {
  const activeCategory = usePromptStore((s) => s.activeCategory);
  const configuredSections = usePromptStore((s) => s.configuredSections);
  const toggleConfigured = usePromptStore((s) => s.toggleConfigured);

  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  const isIncluded = configuredSections.includes(activeCategory);

  return (
    <div
      style={{
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#F0EDE6",
            letterSpacing: "-0.01em",
          }}
        >
          {cat?.navLabel || cat?.label}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(240,237,230,0.3)",
            marginTop: 1,
          }}
        >
          {cat?.sub}
        </div>
      </div>
      <button
        onClick={() => toggleConfigured(activeCategory)}
        style={{
          padding: "6px 14px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          background: isIncluded
            ? "rgba(110,231,183,0.1)"
            : "rgba(255,255,255,0.04)",
          color: isIncluded ? "#6ee7b7" : "rgba(240,237,230,0.3)",
          fontSize: 11,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 5,
          transition: "all 0.15s",
        }}
      >
        {isIncluded ? (
          <>
            <Icon name="check" size={12} color="#6ee7b7" /> Included
          </>
        ) : (
          "Include in prompt"
        )}
      </button>
    </div>
  );
}
