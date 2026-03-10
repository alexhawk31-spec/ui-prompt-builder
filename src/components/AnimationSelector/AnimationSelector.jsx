import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { ANIMATIONS } from "../../constants";
import { PRES_ANIM_CATEGORIES } from "../../constants/modeOptions";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

// ── Visual thumbnail previews for each animation option ──
function AnimThumb({ id, active, color }) {
  const c1 = active ? color : "rgba(255,255,255,0.35)";
  const c2 = active ? `${color}60` : "rgba(255,255,255,0.12)";
  const c3 = active ? `${color}20` : "rgba(255,255,255,0.06)";

  const thumbs = {
    // Slide transitions
    "transition-fade": (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 36, height: 26, borderRadius: 4, background: c3, border: `1px solid ${c2}`, opacity: 0.3, display: "flex", flexDirection: "column", gap: 2, padding: 4 }}>
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "70%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "50%" }} />
        </div>
        <div style={{ width: 40, height: 28, borderRadius: 4, background: c3, border: `1.5px solid ${c1}`, display: "flex", flexDirection: "column", gap: 2, padding: 4, boxShadow: `0 2px 8px ${c2}` }}>
          <div style={{ height: 3, borderRadius: 1, background: c1, width: "80%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "60%" }} />
        </div>
      </div>
    ),
    "transition-slide": (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 32, height: 24, borderRadius: 4, background: c3, border: `1px solid ${c2}`, opacity: 0.3, transform: "translateX(-4px)", display: "flex", flexDirection: "column", gap: 2, padding: 3 }}>
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "70%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "50%" }} />
        </div>
        <div style={{ fontSize: 12, color: c1, fontWeight: 700 }}>→</div>
        <div style={{ width: 40, height: 28, borderRadius: 4, background: c3, border: `1.5px solid ${c1}`, display: "flex", flexDirection: "column", gap: 2, padding: 4, boxShadow: `0 2px 8px ${c2}` }}>
          <div style={{ height: 3, borderRadius: 1, background: c1, width: "80%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "60%" }} />
        </div>
      </div>
    ),
    "transition-scale": (
      <div style={{ position: "relative", width: 60, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: 50, height: 34, borderRadius: 4, background: c3, border: `1px solid ${c2}`, opacity: 0.2 }} />
        <div style={{ width: 40, height: 28, borderRadius: 4, background: c3, border: `1.5px solid ${c1}`, display: "flex", flexDirection: "column", gap: 2, padding: 4, zIndex: 1, boxShadow: `0 2px 8px ${c2}` }}>
          <div style={{ height: 3, borderRadius: 1, background: c1, width: "80%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "60%" }} />
        </div>
      </div>
    ),
    "transition-none": (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{ width: 44, height: 30, borderRadius: 4, background: c3, border: `1px solid ${c2}`, display: "flex", flexDirection: "column", gap: 2, padding: 4 }}>
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "75%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "55%" }} />
        </div>
        <div style={{ fontSize: 7, color: `${c1}60`, fontWeight: 600 }}>instant</div>
      </div>
    ),
    // Element builds
    "build-stagger": (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 56, height: 4, borderRadius: 2, background: c1 }} />
        <div style={{ width: 42, height: 3, borderRadius: 2, background: `${c1}80` }} />
        <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
          {[0.3, 0.5, 0.7, 0.9].map((h, i) => (
            <div key={i} style={{ width: 10, height: `${h * 18}px`, borderRadius: 2, background: `${c1}${i === 3 ? "" : "50"}`, alignSelf: "flex-end" }} />
          ))}
        </div>
        <div style={{ fontSize: 7, color: `${c1}60`, fontWeight: 600, marginTop: 1 }}>1 → 2 → 3</div>
      </div>
    ),
    "build-fade-up": (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
          <div style={{ width: 50, height: 4, borderRadius: 2, background: c1 }} />
          <div style={{ width: 38, height: 3, borderRadius: 2, background: `${c1}70` }} />
          <div style={{ width: 44, height: 3, borderRadius: 2, background: `${c1}50` }} />
        </div>
        <div style={{ fontSize: 10, color: c1, marginTop: 2 }}>↑</div>
        <div style={{ fontSize: 7, color: `${c1}60`, fontWeight: 600 }}>fade + rise</div>
      </div>
    ),
    "build-chart": (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: c1, fontFamily: "'JetBrains Mono', monospace" }}>87%</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
          {[0.3, 0.5, 0.4, 0.8, 0.6].map((h, i) => (
            <div key={i} style={{
              width: 8, borderRadius: "2px 2px 0 0",
              height: `${h * 22}px`,
              background: `${c1}${["40", "50", "45", "", "60"][i]}`,
              alignSelf: "flex-end",
            }} />
          ))}
        </div>
        <div style={{ fontSize: 7, color: `${c1}60`, fontWeight: 600 }}>0 → value</div>
      </div>
    ),
    "build-none": (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 50, height: 34, borderRadius: 4, background: c3, border: `1px solid ${c2}`, display: "flex", flexDirection: "column", gap: 3, padding: 5 }}>
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "75%" }} />
          <div style={{ height: 2, borderRadius: 1, background: c2, width: "55%" }} />
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
            {[1, 2, 3].map((n) => <div key={n} style={{ width: 8, height: 8, borderRadius: 2, background: c2 }} />)}
          </div>
        </div>
        <div style={{ fontSize: 7, color: `${c1}60`, fontWeight: 600 }}>instant</div>
      </div>
    ),
  };

  return thumbs[id] || <div style={{ width: 24, height: 24, borderRadius: 4, background: c2 }} />;
}

export default function AnimationSelector() {
  const animation = usePromptStore((s) => s.animation);
  const setAnimation = usePromptStore((s) => s.setAnimation);
  const clearAnimation = usePromptStore((s) => s.clearAnimation);
  const setHoveredAnimation = usePromptStore((s) => s.setHoveredAnimation);
  const outputType = usePromptStore((s) => s.outputType);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const [expandedCat, setExpandedCat] = useState(null);

  // ── Presentation mode: category-based with expandable options ──
  if (outputType === "presentation") {
    const selections = animation ? animation.split(",").filter(Boolean) : [];

    const handleToggle = (optionId, categoryId) => {
      // Single-select per category
      const cat = PRES_ANIM_CATEGORIES.find((c) => c.id === categoryId);
      const siblingIds = cat ? cat.options.map((o) => o.id) : [];

      if (selections.includes(optionId)) {
        // Deselect
        const next = selections.filter((s) => s !== optionId);
        if (next.length === 0) { clearAnimation(); } else { setAnimation(next.join(",")); }
        return;
      }
      // Replace sibling, add this one
      const next = selections.filter((s) => !siblingIds.includes(s)).concat(optionId);
      setAnimation(next.join(","));
    };

    const totalSelected = selections.length;

    return (
      <>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: c.muted, lineHeight: 1.5 }}>
            Pick a transition style and an element build — they layer together.
          </div>
        </div>

        {/* Category boxes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {PRES_ANIM_CATEGORIES.map((cat) => {
            const isExpanded = expandedCat === cat.id;
            const selectedCount = cat.options.filter((opt) => selections.includes(opt.id)).length;
            const hasSelections = selectedCount > 0;

            return (
              <div key={cat.id} style={{ gridColumn: isExpanded ? "1 / -1" : undefined }}>
                {/* Category header */}
                <button
                  onClick={() => setExpandedCat(isExpanded ? null : cat.id)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: isExpanded ? "12px 12px 0 0" : 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    border: isExpanded
                      ? `1.5px solid ${cat.color}50`
                      : hasSelections
                        ? `1.5px solid ${cat.color}40`
                        : `1px solid ${c.panelBorder}`,
                    borderBottom: isExpanded ? `1px solid ${cat.color}20` : undefined,
                    background: isExpanded
                      ? `${cat.color}0a`
                      : hasSelections
                        ? `${cat.color}08`
                        : "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    textAlign: "left",
                    transition: "all 0.15s",
                    boxShadow: hasSelections && !isExpanded ? `0 2px 12px ${cat.color}15` : "none",
                  }}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: hasSelections ? cat.color : `${cat.color}40`,
                    boxShadow: hasSelections ? `0 0 8px ${cat.color}60` : "none",
                    flexShrink: 0, transition: "all 0.15s",
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: hasSelections ? cat.color : c.text }}>
                      {cat.label}
                    </div>
                    <div style={{ fontSize: 9, color: c.muted, marginTop: 1 }}>
                      {cat.desc}
                    </div>
                  </div>
                  {hasSelections && !isExpanded ? (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4,
                      background: `${cat.color}25`, color: cat.color,
                    }}>
                      {selectedCount}
                    </span>
                  ) : (
                    <Icon name={isExpanded ? "chevUp" : "chevDown"} size={12} color={c.muted} />
                  )}
                </button>

                {/* Expanded options */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{
                        overflow: "hidden",
                        borderRadius: "0 0 12px 12px",
                        border: `1.5px solid ${cat.color}50`,
                        borderTop: "none",
                        background: `${cat.color}06`,
                      }}
                    >
                      <div style={{ padding: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {cat.options.map((opt) => {
                          const active = selections.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleToggle(opt.id, cat.id)}
                              onMouseEnter={() => setHoveredAnimation(opt.id)}
                              onMouseLeave={() => setHoveredAnimation(null)}
                              style={{
                                padding: 0,
                                borderRadius: 10,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                border: active ? `2px solid ${cat.color}` : `1px solid ${c.panelBorder}`,
                                background: active ? `${cat.color}0a` : "rgba(255,255,255,0.03)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                transition: "all 0.15s",
                                boxShadow: active ? `0 4px 16px ${cat.color}20` : "none",
                                textAlign: "left",
                                position: "relative",
                              }}
                            >
                              {/* Visual preview */}
                              <div style={{
                                height: 80,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: active ? `${cat.color}08` : "rgba(255,255,255,0.02)",
                                padding: "0 12px",
                              }}>
                                <AnimThumb id={opt.id} active={active} color={cat.color} />
                              </div>

                              {/* Label */}
                              <div style={{ padding: "8px 10px", borderTop: `1px solid ${active ? `${cat.color}25` : c.panelBorder}` }}>
                                <div style={{ fontSize: 11, fontWeight: active ? 700 : 600, color: active ? cat.color : c.text }}>
                                  {opt.label}
                                </div>
                              </div>

                              {/* Check badge */}
                              {active && (
                                <div style={{
                                  position: "absolute", top: 4, right: 4,
                                  width: 16, height: 16, borderRadius: 4,
                                  background: cat.color,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                  <Icon name="check" size={9} color="#0c0e14" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Selection summary */}
        {totalSelected > 0 && (
          <div style={{
            marginTop: 12, padding: "8px 12px", borderRadius: 8,
            background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.12)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="check" size={12} color="#6ee7b7" />
            <div style={{ fontSize: 10, color: "#6ee7b7", fontWeight: 600 }}>
              {totalSelected} option{totalSelected !== 1 ? "s" : ""} selected
            </div>
          </div>
        )}

        <NextStepButton targetCategory="prompt" label="Prompt" />
      </>
    );
  }

  // ── App mode: simple 4-option single-select ──
  const SECTION_COLOR = "#fbbf24";
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: c.muted }}>
          Motion & transition style for your app
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {ANIMATIONS.map((anim) => {
          const active = animation === anim.id;
          return (
            <button
              key={anim.id}
              onClick={() => (active ? clearAnimation() : setAnimation(anim.id))}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border: active
                  ? `2px solid ${SECTION_COLOR}`
                  : `1px solid ${c.panelBorder}`,
                background: active
                  ? `${SECTION_COLOR}10`
                  : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all 0.15s",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: active ? SECTION_COLOR : c.muted,
                  marginBottom: 4,
                }}
              >
                {anim.name}
              </div>
              <div style={{ fontSize: 10, color: c.muted, lineHeight: 1.4 }}>
                {anim.desc}
              </div>
              {active && (
                <div
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: SECTION_COLOR,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="check" size={9} color="#0c0e14" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <NextStepButton targetCategory="prompt" label="Prompt" />
    </>
  );
}
