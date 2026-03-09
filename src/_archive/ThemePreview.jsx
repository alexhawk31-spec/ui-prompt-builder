import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AccentColorPicker from "./AccentColorPicker";
import PreviewDashboard from "./PreviewDashboard";
import PreviewMarketing from "./PreviewMarketing";
import PreviewSocial from "./PreviewSocial";
import Icon from "../shared/Icon";

const VIEWS = [
  { id: "dashboard", label: "Dashboard", icon: "chart" },
  { id: "marketing", label: "Marketing", icon: "send" },
  { id: "social", label: "Social", icon: "sparkles" },
];

const VIEW_COMPONENTS = {
  dashboard: PreviewDashboard,
  marketing: PreviewMarketing,
  social: PreviewSocial,
};

export default function ThemePreview({ theme, accent, accentOptions, onAccentChange }) {
  const [activeView, setActiveView] = useState("dashboard");
  const { bg, card, text } = theme.preview;
  const textMuted = `${text}80`;
  const ViewComponent = VIEW_COMPONENTS[activeView];

  return (
    <motion.div
      key={theme.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        borderRadius: 14, overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        background: bg,
        display: "flex", flexDirection: "column",
        position: "relative",
        width: "100%", maxWidth: "100%", boxSizing: "border-box",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 70% 20%, ${accent}10 0%, transparent 60%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header: theme name + CTA demos */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{
              fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
              color: textMuted, marginBottom: 3, fontFamily: "'JetBrains Mono', monospace",
            }}>Preview</div>
            <div style={{
              fontSize: 20, fontWeight: 700, color: text, letterSpacing: "-0.03em",
            }}>{theme.name}</div>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{
              padding: "6px 14px", borderRadius: 7, background: card,
              border: `1px solid ${accent}20`, color: text, fontSize: 10, fontWeight: 600,
            }}>Secondary</div>
            <div style={{
              padding: "6px 14px", borderRadius: 7, background: accent,
              color: bg, fontSize: 10, fontWeight: 700, boxShadow: `0 3px 12px ${accent}30`,
            }}>Primary CTA</div>
          </div>
        </div>

        {/* View toggle */}
        <div style={{
          display: "inline-flex", borderRadius: 8, overflow: "hidden",
          border: `1px solid ${accent}12`, background: `${card}80`,
          marginBottom: 14, alignSelf: "flex-start",
        }}>
          {VIEWS.map(({ id, label, icon }, i) => (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "5px 12px", border: "none", cursor: "pointer",
                background: activeView === id ? `${accent}18` : "transparent",
                color: activeView === id ? accent : `${text}70`,
                fontSize: 10, fontWeight: activeView === id ? 600 : 500,
                fontFamily: "inherit",
                borderRight: i < VIEWS.length - 1 ? `1px solid ${accent}08` : "none",
                transition: "all 0.15s",
              }}
            >
              <Icon name={icon} size={11} color={activeView === id ? accent : `${text}60`} />
              {label}
            </button>
          ))}
        </div>

        {/* Active view content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <ViewComponent bg={bg} card={card} accent={accent} text={text} />
          </motion.div>
        </AnimatePresence>

        {/* Accent picker */}
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${accent}10` }}>
          <AccentColorPicker
            options={accentOptions}
            value={accent}
            onChange={onAccentChange}
            themeBg={bg}
          />
        </div>

        {/* Hex readout */}
        <div style={{ display: "flex", gap: 14, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${accent}08` }}>
          {Object.entries({ ...theme.preview, accent }).map(([key, color]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: color, border: "1px solid rgba(128,128,128,0.2)" }} />
              <div>
                <div style={{ fontSize: 7, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", color: `${text}60` }}>{key}</div>
                <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: `${text}80` }}>{color}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
