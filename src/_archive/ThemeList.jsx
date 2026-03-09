import { AnimatePresence } from "framer-motion";
import ThemeListItem from "./ThemeListItem";

export default function ThemeList({ themes, selectedId, customAccents, onSelect }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 5,
      background: "rgba(26,31,46,0.4)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderRadius: 14, padding: 8,
      border: "1px solid rgba(201,168,76,0.06)",
      maxHeight: 520, overflowY: "auto",
    }}>
      <AnimatePresence mode="popLayout">
        {themes.map((t, index) => (
          <ThemeListItem
            key={t.id}
            theme={t}
            isSelected={selectedId === t.id}
            displayAccent={customAccents[t.id] || t.preview.accent}
            index={index}
            onSelect={() => onSelect(t.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
