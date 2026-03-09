import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { generatePrompt } from "../../utils/generatePrompt";
import { getSelectionSummary } from "../../utils/categoryHelpers";
import { CATEGORIES } from "../../constants/categories";
import Icon from "../shared/Icon";

const TROUBLESHOOTING_ITEMS = [
  {
    icon: "palette",
    color: "#818cf8",
    title: "AI ignoring my colors",
    fix: "Make sure the Theme section is included. The prompt passes exact hex values so the AI has precise colors — if it's not included, the AI will guess.",
  },
  {
    icon: "zap",
    color: "#fbbf24",
    title: "Too much or too little animation",
    fix: "Use the Animation section to set intensity. \"Subtle\" gives micro-interactions only; \"Energetic\" adds page transitions and scroll effects.",
  },
  {
    icon: "layers",
    color: "#818cf8",
    title: "Cards look generic",
    fix: "Use the Card Style section to pick a visual surface treatment (Frosted, Neon, Raw, etc.) and fine-tune corners, shadows, borders, and interactions.",
  },
  {
    icon: "layers",
    color: "#818cf8",
    title: "Borders or spacing feel off",
    fix: "Use the Card Style fine-tune options to control borders, corners, and shadows. The Mood section also adjusts density and spacing across the UI.",
  },
  {
    icon: "alertTriangle",
    color: "#fb923c",
    title: "Prompt is too long / AI confused",
    fix: "Uncheck sections you don't need using the toggle in each section header. Each section adds ~140 tokens. Focused instructions perform better than a wall of text.",
  },
  {
    icon: "edit",
    color: "#5eead4",
    title: "AI doesn't understand my app",
    fix: "Use the App Info section to describe your app's purpose, audience, and features. Context helps the AI make design decisions that fit your product.",
  },
  {
    icon: "target",
    color: "#a78bfa",
    title: "Results are inconsistent across tools",
    fix: "Different AI tools parse prompts differently. Try pasting just the sections you need. The markdown headers help AIs parse sections independently.",
  },
  {
    icon: "layers",
    color: "#38bdf8",
    title: "Starting from scratch?",
    fix: "Lead with a structural prompt before pasting the UI prompt: \"Take this idea, make a Vite React JavaScript and Framer Motion app as a principal engineer. Create feature component folders with constant files and sub-components, a store folder for Zustand, and a services folder for API calls. Keep code clean, components small, and update the README.\"",
  },
  {
    icon: "alertTriangle",
    color: "#f87171",
    title: "App getting too big to manage",
    fix: "Break work into smaller prompts — one feature at a time. Ask the AI to refactor large components into sub-components, extract constants into their own files, and move shared logic into utils. If a file is over ~200 lines, it's time to split it.",
  },
];

const TERMINAL_SECTIONS = [
  { categoryId: "appType", flag: "app-purpose" },
  { categoryId: "theme", flag: "visual-theme" },
  { categoryId: "mood", flag: "mood-feel" },
  { categoryId: "cards", flag: "card-style" },
  { categoryId: "data", flag: "data-display" },
  { categoryId: "navigation", flag: "navigation" },
  { categoryId: "buttons", flag: "button-style" },
  { categoryId: "animation", flag: "animation" },
];

function useStoreState() {
  return {
    configuredSections: usePromptStore((s) => s.configuredSections),
    selectedPurpose: usePromptStore((s) => s.selectedPurpose),
    outputType: usePromptStore((s) => s.outputType),
    outputPurpose: usePromptStore((s) => s.outputPurpose),
    buildMode: usePromptStore((s) => s.buildMode),
    appStarterEnabled: usePromptStore((s) => s.appStarterEnabled),
    theme: usePromptStore((s) => s.theme),
    customAccents: usePromptStore((s) => s.customAccents),
    customColors: usePromptStore((s) => s.customColors),
    modeFilter: usePromptStore((s) => s.modeFilter),
    moodPreset: usePromptStore((s) => s.moodPreset),
    moodDimensions: usePromptStore((s) => s.moodDimensions),
    moodCustom: usePromptStore((s) => s.moodCustom),
    cardStyle: usePromptStore((s) => s.cardStyle),
    navStyle: usePromptStore((s) => s.navStyle),
    navSelections: usePromptStore((s) => s.navSelections),
    buttonStyle: usePromptStore((s) => s.buttonStyle),
    dataStyle: usePromptStore((s) => s.dataStyle),
    animation: usePromptStore((s) => s.animation),
    faviconDesc: usePromptStore((s) => s.faviconDesc),
  };
}

export default function TerminalPrompt() {
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [copied, setCopied] = useState(false);

  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const state = useStoreState();
  const { configuredSections } = state;

  const activeSections = TERMINAL_SECTIONS.filter((s) =>
    configuredSections.includes(s.categoryId)
  ).map((s) => {
    const cat = CATEGORIES.find((ct) => ct.id === s.categoryId);
    const summary = getSelectionSummary(state, s.categoryId);
    return {
      ...s,
      color: cat?.color || "#818cf8",
      value: summary?.detail || summary?.text || "configured",
    };
  });

  const tokenEstimate = Math.round(activeSections.length * 140);

  const handleCopy = useCallback(() => {
    const prompt = generatePrompt(state);
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [state]);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: c.termBg,
        border: `1px solid ${c.termBorder}`,
        cursor: "pointer",
        transition: "all 0.3s",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: c.termBarBg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <span
            style={{
              fontSize: 10,
              fontFamily: "'JetBrains Mono',monospace",
              color: "rgba(129,140,248,0.7)",
            }}
          >
            prompt-output
          </span>
          <Icon
            name={expanded ? "chevUp" : "chevDown"}
            size={11}
            color="rgba(129,140,248,0.3)"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 8,
              fontFamily: "'JetBrains Mono',monospace",
              color: c.muted,
            }}
          >
            {activeSections.length} sections · ~{tokenEstimate} tokens
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = !showTroubleshooting;
              setShowTroubleshooting(next);
              if (next) { setExpanded(true); setShowInfo(false); }
            }}
            title="Common issues"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              padding: "3px 8px",
              borderRadius: 5,
              border: `1px solid ${showTroubleshooting ? "rgba(251,146,60,0.25)" : c.panelBorder}`,
              background: showTroubleshooting ? "rgba(251,146,60,0.1)" : "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <Icon
              name="helpCircle"
              size={11}
              color={showTroubleshooting ? "#fb923c" : c.muted}
            />
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              color: showTroubleshooting ? "#fb923c" : c.muted,
            }}>Help</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = !showInfo;
              setShowInfo(next);
              if (next) { setExpanded(true); setShowTroubleshooting(false); }
            }}
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              border: `1px solid ${showInfo ? "rgba(129,140,248,0.2)" : c.panelBorder}`,
              background: showInfo ? "rgba(129,140,248,0.1)" : "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name="info"
              size={11}
              color={showInfo ? "#818cf8" : c.muted}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            style={{
              padding: "4px 10px",
              borderRadius: 5,
              border: "none",
              background: copied ? "#16a34a" : "#818cf8",
              color: copied ? "#fff" : "#0c0e14",
              fontSize: 9,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 3,
              transition: "background 0.2s",
            }}
          >
            <Icon
              name={copied ? "check" : "copy"}
              size={10}
              color={copied ? "#fff" : "#0c0e14"}
            />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Info explainer */}
      {showInfo && (
        <div
          style={{
            margin: "8px 12px 0",
            padding: 10,
            borderRadius: 8,
            background: "rgba(129,140,248,0.06)",
            border: `1px solid ${c.termBorder}`,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", marginBottom: 6 }}>
            How this prompt works
          </div>
          <div style={{ fontSize: 11, color: c.muted, lineHeight: 1.6 }}>
            Each section gives the AI concrete values — hex codes, pixel sizes,
            font names — instead of vague descriptions. We use markdown headers
            so the AI can parse sections independently. Copy just the parts you
            need, and the AI gets precise instructions instead of guessing.
          </div>
        </div>
      )}

      {/* Troubleshooting panel */}
      <AnimatePresence>
        {showTroubleshooting && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                margin: "8px 12px 0",
                padding: 12,
                borderRadius: 10,
                background: "rgba(251,146,60,0.04)",
                border: "1px solid rgba(251,146,60,0.12)",
              }}
            >
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="helpCircle" size={14} color="#fb923c" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fb923c" }}>Common Issues</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTroubleshooting(false); }}
                  style={{
                    width: 18, height: 18, borderRadius: 4, border: "none",
                    background: "rgba(251,146,60,0.1)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name="x" size={9} color="rgba(251,146,60,0.5)" />
                </button>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
                maxHeight: 300, overflowY: "auto",
              }}>
                {TROUBLESHOOTING_ITEMS.map((item) => (
                  <div key={item.title} style={{
                    padding: 8, borderRadius: 7,
                    background: c.dim, border: `1px solid ${c.panelBorder}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                      <Icon name={item.icon} size={12} color={item.color} />
                      <span style={{ fontSize: 10, fontWeight: 700, color: c.text }}>{item.title}</span>
                    </div>
                    <div style={{ fontSize: 9, color: c.muted, lineHeight: 1.6 }}>{item.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded terminal content */}
      {expanded && (
        <div
          style={{
            padding: "8px 12px 12px",
            maxHeight: 300,
            overflowY: "auto",
            fontFamily: "'JetBrains Mono',monospace",
            borderTop: `1px solid ${c.termBorder}`,
          }}
        >
          {activeSections.length === 0 ? (
            <div style={{ fontSize: 10, color: c.muted }}>
              <span style={{ color: "#28c840" }}>$</span> waiting for configuration...
              <span style={{
                display: "inline-block", width: 6, height: 12,
                background: "rgba(129,140,248,0.4)", marginLeft: 3,
                animation: "blink 1s step-end infinite", verticalAlign: "text-bottom",
              }} />
            </div>
          ) : (
            activeSections.map((sec, i) => (
              <div key={sec.categoryId} style={{ marginBottom: i < activeSections.length - 1 ? 6 : 0 }}>
                <div style={{ fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ color: "#28c840" }}>$</span>
                  <span style={{ color: c.dim }}>--</span>
                  <span style={{ color: sec.color, fontWeight: 600 }}>{sec.flag}</span>
                </div>
                <div style={{ fontSize: 9, color: c.muted, paddingLeft: 14, marginTop: 2 }}>
                  {sec.value}
                </div>
              </div>
            ))
          )}
          {activeSections.length > 0 && (
            <div style={{ marginTop: 6, fontSize: 9, color: c.dim }}>
              <span style={{ color: "#28c840" }}>$</span> ready
              <span style={{
                display: "inline-block", width: 6, height: 12,
                background: "rgba(129,140,248,0.4)", marginLeft: 3,
                animation: "blink 1s step-end infinite", verticalAlign: "text-bottom",
              }} />
            </div>
          )}
        </div>
      )}

      {/* Collapsed one-liner */}
      {!expanded && (
        <div
          style={{
            padding: "6px 14px 10px",
            fontSize: 9,
            fontFamily: "'JetBrains Mono',monospace",
            color: c.dim,
          }}
        >
          <span style={{ color: "#28c840" }}>$</span> generate{" "}
          {activeSections.map((s) => (
            <span key={s.categoryId} style={{ color: "#818cf8" }}>--{s.flag} </span>
          ))}
        </div>
      )}
    </div>
  );
}
