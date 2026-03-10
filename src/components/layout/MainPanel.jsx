import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { CATEGORIES } from "../../constants/categories";
import { getShellColors } from "../../utils/shellColors";
import { isCategoryConfigured, getSelectionSummary } from "../../utils/categoryHelpers";
import { generateCategorySnippet } from "../../utils/generatePrompt";
import ThemeSelector from "../ThemeSelector";
import ProjectPicker from "../ProjectPicker";
import MoodSelector from "../MoodSelector";
import SlideLayoutSelector from "../SlideLayoutSelector";
import CardStyleSelector from "../ComponentStyleSelector";
import NavigationSelector from "../NavigationSelector";
import ButtonSelector from "../ButtonSelector";
import DataDisplaySelector from "../DataDisplaySelector";
import AnimationSelector from "../AnimationSelector";
import TemplateLibrary from "../TemplateLibrary";
import PromptViewPanel from "../PromptViewPanel";
import Icon from "../shared/Icon";

const PANEL_COMPONENTS = {
  appType: ProjectPicker,
  theme: ThemeSelector,
  mood: MoodSelector,
  layouts: SlideLayoutSelector,
  cards: CardStyleSelector,
  data: DataDisplaySelector,
  navigation: NavigationSelector,
  buttons: ButtonSelector,
  animation: AnimationSelector,
  templates: TemplateLibrary,
  prompt: PromptViewPanel,
};

const CLEAR_ACTIONS = {
  appType: "clearAppType",
  theme: "clearTheme",
  mood: "clearMood",
  layouts: "clearSlideLayouts",
  cards: "clearCardStyle",
  navigation: "clearNavStyle",
  buttons: "clearButtonStyle",
  data: "clearDataStyle",
  animation: "clearAnimation",
};

function ComingSoonPanel({ categoryId }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const cat = CATEGORIES.find((ct) => ct.id === categoryId);
  const catColor = cat?.color || "#818cf8";

  return (
    <div style={{ padding: "20px 4px" }}>
      <div
        style={{
          padding: 40,
          borderRadius: 12,
          border: `1px dashed ${c.panelBorder}`,
          background: c.dim,
          textAlign: "center",
        }}
      >
        <Icon name={cat?.icon || "wand"} size={28} color={`${catColor}50`} />
        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 12, color: c.muted }}>
          Coming soon
        </div>
        <div style={{ fontSize: 12, marginTop: 4, color: c.dim }}>
          This section is being built
        </div>
      </div>
    </div>
  );
}

export default function MainPanel() {
  const activeCategory = usePromptStore((s) => s.activeCategory);
  const shellMode = usePromptStore((s) => s.shellMode);
  const storeState = usePromptStore();

  const c = getShellColors(shellMode === "light");
  const cat = CATEGORIES.find((ct) => ct.id === activeCategory);
  const hasData = isCategoryConfigured(storeState, activeCategory);
  const summary = hasData ? getSelectionSummary(storeState, activeCategory) : null;
  const PanelComponent = PANEL_COMPONENTS[activeCategory];

  const clearAction = CLEAR_ACTIONS[activeCategory];
  const handleReset = useCallback(() => {
    if (clearAction && storeState[clearAction]) {
      storeState[clearAction]();
    }
  }, [clearAction, storeState]);

  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    const snippet = generateCategorySnippet(storeState, activeCategory);
    if (!snippet) return;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeCategory, storeState]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeCategory]);

  const catColor = cat?.color || "#818cf8";

  return (
    <>
      {/* Section header */}
      <div style={{ padding: "14px 20px 0", flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {/* Left: icon + name + summary badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: `${catColor}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={cat?.icon || "palette"} size={15} color={catColor} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: c.text }}>
                  {cat?.label}
                </span>
                {/* Summary badge */}
                {hasData && summary?.text && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: catColor,
                      background: `${catColor}12`,
                      padding: "2px 8px",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {summary.colors && (
                      <span style={{ display: "flex", gap: 2 }}>
                        {summary.colors.map((cl, i) => (
                          <span
                            key={i}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: cl,
                              border: "0.5px solid rgba(128,128,128,0.3)",
                            }}
                          />
                        ))}
                      </span>
                    )}
                    {summary.text}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 10, color: c.muted, marginTop: 1 }}>
                {cat?.sub}
              </div>
            </div>
          </div>

          {/* Right: Copy + Reset (only when section has data, hidden for prompt panel) */}
          {hasData && activeCategory !== "prompt" && activeCategory !== "appType" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                onClick={handleCopy}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: copied ? `${catColor}25` : c.dim,
                  color: copied ? "#4ade80" : c.muted,
                  fontSize: 10,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s",
                }}
              >
                <Icon name={copied ? "check" : "copy"} size={11} color={copied ? "#4ade80" : c.muted} />
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={handleReset}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: c.dim,
                  color: c.muted,
                  fontSize: 10,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s",
                }}
              >
                <Icon name="refresh" size={11} color={c.muted} />
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Guidance callout */}
        {cat?.guidance && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              background: `${catColor}08`,
              border: `1px solid ${catColor}12`,
              marginBottom: 4,
            }}
          >
            <Icon name="wand" size={14} color={`${catColor}80`} />
            <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.5, margin: 0 }}>
              {cat.guidance}
            </p>
          </div>
        )}
      </div>

      {/* Config content */}
      <div ref={scrollRef} style={{ flex: 1, padding: "10px 14px 14px", overflowY: "auto" }}>
        <div
          style={{
            background: c.panelBg,
            border: `1px solid ${c.panelBorder}`,
            borderRadius: 14,
            padding: 20,
            minHeight: "100%",
            transition: "all 0.3s",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {PanelComponent ? (
                <PanelComponent />
              ) : (
                <ComingSoonPanel categoryId={activeCategory} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
