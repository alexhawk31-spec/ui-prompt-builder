import { motion } from "framer-motion";
import Icon from "../shared/Icon";

export default function ThemeListItem({ theme, isSelected, displayAccent, index, onSelect }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", gap: 11, padding: "11px 12px",
        borderRadius: 10, cursor: "pointer", textAlign: "left", flexShrink: 0,
        border: isSelected ? "1.5px solid rgba(201,168,76,0.35)" : "1.5px solid transparent",
        background: isSelected ? "rgba(201,168,76,0.08)" : "transparent",
        transition: "all 0.2s",
        fontFamily: "inherit",
        width: "100%",
      }}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
    >
      {/* Swatch strip */}
      <div style={{
        display: "flex", borderRadius: 5, overflow: "hidden", width: 48, height: 24, flexShrink: 0,
        border: "1px solid rgba(128,128,128,0.15)",
      }}>
        <div style={{ flex: 1, background: theme.preview.bg }} />
        <div style={{ flex: 1, background: theme.preview.card }} />
        <div style={{ flex: 1, background: displayAccent }} />
        <div style={{ flex: 1, background: theme.preview.text }} />
      </div>

      {/* Name + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12, fontWeight: 600,
          color: isSelected ? "#C9A84C" : "#F0EDE6",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{theme.name}</div>
        <div style={{
          fontSize: 10, color: "rgba(240,237,230,0.3)", marginTop: 1,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{theme.desc}</div>
      </div>

      {/* Active check */}
      {isSelected && (
        <span style={{
          width: 18, height: 18, borderRadius: "50%", background: "#C9A84C", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="check" size={10} color="#0B0F19" />
        </span>
      )}
    </motion.button>
  );
}
