import { motion, AnimatePresence } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { CATEGORIES } from "../../constants/categories";
import { isStepAvailable } from "../../constants/outputTypes";
import { getSelectionSummary } from "../../utils/categoryHelpers";
import Icon from "../shared/Icon";

function useStoreSnapshot() {
  return {
    configuredSections: usePromptStore((s) => s.configuredSections),
    outputType: usePromptStore((s) => s.outputType),
    outputPurpose: usePromptStore((s) => s.outputPurpose),
    selectedPurpose: usePromptStore((s) => s.selectedPurpose),
    theme: usePromptStore((s) => s.theme),
    customAccents: usePromptStore((s) => s.customAccents),
    customColors: usePromptStore((s) => s.customColors),
    moodPreset: usePromptStore((s) => s.moodPreset),
    moodDimensions: usePromptStore((s) => s.moodDimensions),
    moodCustom: usePromptStore((s) => s.moodCustom),
    cardStyle: usePromptStore((s) => s.cardStyle),
    navStyle: usePromptStore((s) => s.navStyle),
    navSelections: usePromptStore((s) => s.navSelections),
    buttonStyle: usePromptStore((s) => s.buttonStyle),
    dataStyle: usePromptStore((s) => s.dataStyle),
    animation: usePromptStore((s) => s.animation),
  };
}

export default function SummaryOverlay() {
  const showSummary = usePromptStore((s) => s.showSummary);
  const setShowSummary = usePromptStore((s) => s.setShowSummary);
  const state = useStoreSnapshot();
  const { configuredSections } = state;

  return (
    <AnimatePresence>
      {showSummary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            background: "rgba(8,10,18,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setShowSummary(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 560,
              borderRadius: 18,
              background:
                "linear-gradient(135deg, rgba(30,35,55,0.95), rgba(20,25,40,0.95))",
              border: "1px solid rgba(129,140,248,0.12)",
              boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
              padding: 28,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: "#F0EDE6" }}
                >
                  Your Selections
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(240,237,230,0.35)",
                    marginTop: 2,
                  }}
                >
                  {configuredSections.length} of {CATEGORIES.length} sections
                  configured
                </div>
              </div>
              <button
                onClick={() => setShowSummary(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="x" size={15} color="rgba(240,237,230,0.4)" />
              </button>
            </div>

            {/* Section rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {CATEGORIES.map((cat) => {
                const done = configuredSections.includes(cat.id);
                const available = cat.id === "appType" || isStepAvailable(state.outputType, cat.id);
                const notApplicable = state.outputType && !available;
                const summary = done
                  ? getSelectionSummary(state, cat.id)
                  : null;

                return (
                  <div
                    key={cat.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: done
                        ? "rgba(255,255,255,0.03)"
                        : "transparent",
                      border: done
                        ? `1px solid ${cat.color}15`
                        : "1px solid rgba(255,255,255,0.03)",
                      opacity: done ? 1 : 0.35,
                      transition: "all 0.2s",
                    }}
                  >
                    {/* Icon badge */}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: done
                          ? `${cat.color}15`
                          : "rgba(255,255,255,0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {done ? (
                        <Icon name="check" size={13} color={cat.color} />
                      ) : (
                        <Icon
                          name={cat.icon}
                          size={13}
                          color="rgba(240,237,230,0.15)"
                        />
                      )}
                    </div>

                    {/* Label + value */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: done
                            ? "#F0EDE6"
                            : "rgba(240,237,230,0.3)",
                        }}
                      >
                        {cat.navLabel || cat.label}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: done
                            ? "rgba(240,237,230,0.4)"
                            : "rgba(240,237,230,0.15)",
                          marginTop: 1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {notApplicable
                          ? "Not applicable for this project type"
                          : done
                            ? summary?.text || "Configured"
                            : "Not configured"}
                      </div>
                    </div>

                    {/* Glowing dot */}
                    {done && (
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: cat.color,
                          flexShrink: 0,
                          boxShadow: `0 0 6px ${cat.color}40`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div
              style={{
                marginTop: 18,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg, #818cf8, #a78bfa, #67e8f9)",
                  width: `${(configuredSections.length / CATEGORIES.length) * 100}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
