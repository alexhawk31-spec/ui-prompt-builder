import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { NAV_PATTERNS, NAV_FINE_TUNE_DIMS } from "./constants";
import {
  PRES_NAV_CATEGORIES,
  ONE_PAGER_NAV_OPTIONS,
} from "../../constants/modeOptions";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

// ── Visual previews for presentation/one-pager nav options ──
function NavOptionPreview({ id, active, color }) {
  const c1 = active ? color : "rgba(255,255,255,0.35)";
  const c2 = active ? `${color}60` : "rgba(255,255,255,0.12)";
  const c3 = active ? `${color}25` : "rgba(255,255,255,0.06)";

  const previewMap = {
    // Presentation — movement
    "arrow-keys": (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 28, height: 22, borderRadius: 4, border: `1.5px solid ${c1}`, background: c3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: c1, fontWeight: 700 }}>←</div>
        <div style={{ width: 28, height: 22, borderRadius: 4, border: `1.5px solid ${c1}`, background: c3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: c1, fontWeight: 700 }}>→</div>
      </div>
    ),
    "click-anywhere": (
      <div style={{ width: 70, height: 46, borderRadius: 6, border: `1.5px solid ${c2}`, background: c3, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c1 }} />
        <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${c1}`, background: "transparent" }} />
      </div>
    ),
    "click-halves": (
      <div style={{ width: 70, height: 46, borderRadius: 6, border: `1.5px solid ${c2}`, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: c3, borderRight: `1.5px dashed ${c2}`, fontSize: 12, color: c1, fontWeight: 700 }}>←</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: `${c3}`, fontSize: 12, color: c1, fontWeight: 700 }}>→</div>
      </div>
    ),
    "onscreen-arrows": (
      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        <div style={{ width: 18, height: 28, borderRadius: 4, background: c2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: c1, fontWeight: 700 }}>‹</div>
        <div style={{ width: 18, height: 28, borderRadius: 4, background: c2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: c1, fontWeight: 700 }}>›</div>
      </div>
    ),
    // Presentation — orientation
    "slide-counter": (
      <div style={{ padding: "4px 10px", borderRadius: 5, background: c3, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: c1, fontWeight: 600, letterSpacing: ".05em" }}>3 / 7</div>
    ),
    "progress-bar": (
      <div style={{ width: 80, height: 4, borderRadius: 2, background: c2 }}>
        <div style={{ width: "45%", height: "100%", borderRadius: 2, background: c1 }} />
      </div>
    ),
    "section-dots": (
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} style={{ width: n === 3 ? 14 : 6, height: 6, borderRadius: 3, background: n === 3 ? c1 : c2, transition: "all 0.15s" }} />
        ))}
      </div>
    ),
    "thumbnail-grid": (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} style={{ width: 18, height: 13, borderRadius: 3, background: n === 2 ? c1 : c2, border: n === 2 ? `1px solid ${c1}` : "none" }} />
        ))}
      </div>
    ),
    "side-outline": (
      <div style={{ display: "flex", gap: 4, border: `1px solid ${c2}`, borderRadius: 5, overflow: "hidden" }}>
        <div style={{ width: 26, display: "flex", flexDirection: "column", gap: 3, padding: 4, borderRight: `1px solid ${c2}`, background: c3 }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={{ height: 3, borderRadius: 1, background: n === 2 ? c1 : c2 }} />
          ))}
        </div>
        <div style={{ width: 40, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 28, height: 18, borderRadius: 2, background: c2 }} />
        </div>
      </div>
    ),
    "floating-toc": (
      <div style={{ width: 70, height: 46, borderRadius: 6, border: `1px solid ${c2}`, background: c3, position: "relative" }}>
        <div style={{ position: "absolute", bottom: 3, right: 3, width: 26, height: 28, borderRadius: 4, background: `${c1}20`, border: `1px solid ${c1}40`, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ height: 2, borderRadius: 1, background: n === 1 ? c1 : c2, width: n === 1 ? "100%" : "70%" }} />
          ))}
        </div>
      </div>
    ),
    "minimap": (
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ width: 48, height: 34, borderRadius: 4, background: c3, border: `1px solid ${c2}` }} />
        <div style={{ width: 10, display: "flex", flexDirection: "column", gap: 2, paddingTop: 1 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} style={{ height: 4, borderRadius: 1, background: n === 2 ? c1 : c2, border: n === 2 ? `1px solid ${c1}` : "none" }} />
          ))}
        </div>
      </div>
    ),
    // One Pager
    "sticky-header": (
      <div style={{ width: 70, display: "flex", flexDirection: "column", gap: 3, border: `1px solid ${c2}`, borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: 8, background: c1, display: "flex", alignItems: "center", gap: 3, padding: "0 4px" }}>
          {[1, 2, 3].map((n) => <div key={n} style={{ width: 8, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.6)" }} />)}
        </div>
        <div style={{ padding: "0 4px 4px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "80%" }} />
          <div style={{ height: 3, borderRadius: 1, background: c2, width: "60%" }} />
        </div>
      </div>
    ),
    "back-to-top": (
      <div style={{ width: 24, height: 24, borderRadius: 6, background: c1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700, boxShadow: `0 2px 6px ${c2}` }}>↑</div>
    ),
    "section-indicators": (
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} style={{ width: 4, height: n === 2 ? 16 : 10, borderRadius: 2, background: n === 2 ? c1 : c2, transition: "all 0.15s" }} />
        ))}
      </div>
    ),
    "none": (
      <div style={{ width: 70, height: 40, borderRadius: 5, background: c3, border: `1px solid ${c2}`, display: "flex", flexDirection: "column", gap: 3, padding: 6 }}>
        <div style={{ height: 3, borderRadius: 1, background: `${c1}40`, width: "70%" }} />
        <div style={{ height: 3, borderRadius: 1, background: `${c1}30`, width: "50%" }} />
        <div style={{ height: 3, borderRadius: 1, background: `${c1}20`, width: "60%" }} />
      </div>
    ),
  };

  return previewMap[id] || <div style={{ width: 24, height: 24, borderRadius: 4, background: c2 }} />;
}

import ThumbRail from "./thumbnails/ThumbRail";
import ThumbShelf from "./thumbnails/ThumbShelf";
import ThumbRibbon from "./thumbnails/ThumbRibbon";
import ThumbTabs from "./thumbnails/ThumbTabs";
import ThumbCapsules from "./thumbnails/ThumbCapsules";
import ThumbBreadcrumb from "./thumbnails/ThumbBreadcrumb";
import ThumbSpotlight from "./thumbnails/ThumbSpotlight";
import ThumbDrawer from "./thumbnails/ThumbDrawer";

const THUMB_MAP = {
  rail: ThumbRail,
  shelf: ThumbShelf,
  ribbon: ThumbRibbon,
  tabs: ThumbTabs,
  capsules: ThumbCapsules,
  breadcrumb: ThumbBreadcrumb,
  spotlight: ThumbSpotlight,
  drawer: ThumbDrawer,
};

function DimCard({ dim, value, onChange, expanded, onToggle }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const d = NAV_FINE_TUNE_DIMS[dim];

  return (
    <div style={{
      borderRadius: 12,
      overflow: "hidden",
      background: expanded ? `${d.color}0a` : "rgba(255,255,255,0.04)",
      border: expanded ? `1px solid ${d.color}25` : `1px solid ${c.panelBorder}`,
      transition: "all 0.2s",
    }}>
      <button onClick={onToggle} style={{
        width: "100%",
        padding: "12px 14px",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, boxShadow: `0 0 6px ${d.color}40` }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.label}</span>
          <span style={{ fontSize: 10, color: c.muted }}>{d.desc}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            padding: "3px 10px",
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 600,
            background: `${d.color}15`,
            color: d.color,
            border: `1px solid ${d.color}25`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {d.opts.find((o) => o.id === value)?.label}
          </span>
          <Icon name={expanded ? "chevUp" : "chevDown"} size={13} color={c.muted} />
        </div>
      </button>
      {expanded && (
        <div style={{ padding: "0 14px 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {d.opts.map((opt) => {
            const active = value === opt.id;
            return (
              <button key={opt.id} onClick={() => onChange(opt.id)} style={{
                padding: "8px 14px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "inherit",
                border: active ? `1.5px solid ${d.color}` : `1px solid ${c.panelBorder}`,
                background: active ? `${d.color}15` : "rgba(255,255,255,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                transition: "all 0.15s",
                flex: "1 1 calc(50% - 3px)",
                minWidth: 100,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: active ? d.color : c.muted, display: "flex", alignItems: "center", gap: 5 }}>
                  {active && <Icon name="check" size={11} color={d.color} />}
                  {opt.label}
                </div>
                <div style={{ fontSize: 9, color: c.muted, lineHeight: 1.3, textAlign: "left" }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NavigationSelector() {
  const navStyle = usePromptStore((s) => s.navStyle);
  const setNavStyle = usePromptStore((s) => s.setNavStyle);
  const setNavFineTune = usePromptStore((s) => s.setNavFineTune);
  const clearNavStyle = usePromptStore((s) => s.clearNavStyle);
  const navSelections = usePromptStore((s) => s.navSelections);
  const setNavSelections = usePromptStore((s) => s.setNavSelections);
  const clearNavSelections = usePromptStore((s) => s.clearNavSelections);
  const setHoveredNavSelection = usePromptStore((s) => s.setHoveredNavSelection);
  const outputType = usePromptStore((s) => s.outputType);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const [expDim, setExpDim] = useState(null);
  const [expandedNavCat, setExpandedNavCat] = useState(null);

  const SECTION_COLOR = "#67e8f9";

  // ── Presentation: category-based with expandable options (like slide layouts) ──
  if (outputType === "presentation") {
    const selections = navSelections || [];

    const handleToggle = (optionId, categoryId) => {
      // Single-select per category
      if (selections.includes(optionId)) {
        const next = selections.filter((s) => s !== optionId);
        if (next.length === 0) { clearNavSelections(); } else { setNavSelections(next); }
        return;
      }
      const cat = PRES_NAV_CATEGORIES.find((c) => c.id === categoryId);
      const siblingIds = cat ? cat.options.map((o) => o.id) : [];
      const next = selections.filter((s) => !siblingIds.includes(s)).concat(optionId);
      setNavSelections(next);
    };

    const totalSelected = selections.length;

    return (
      <>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
            Navigation
          </div>
          <div style={{ fontSize: 11, color: c.muted, lineHeight: 1.5 }}>
            How people move through and orient within your deck.
          </div>
        </div>

        {/* Category boxes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {PRES_NAV_CATEGORIES.map((cat) => {
            const isExpanded = expandedNavCat === cat.id;
            const selectedCount = cat.options.filter((opt) => selections.includes(opt.id)).length;
            const hasSelections = selectedCount > 0;

            return (
              <div key={cat.id} style={{ gridColumn: isExpanded ? "1 / -1" : undefined }}>
                {/* Category header */}
                <button
                  onClick={() => setExpandedNavCat(isExpanded ? null : cat.id)}
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
                              onMouseEnter={() => setHoveredNavSelection(opt.id)}
                              onMouseLeave={() => setHoveredNavSelection(null)}
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
                                <NavOptionPreview id={opt.id} active={active} color={cat.color} />
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
              {totalSelected} control{totalSelected !== 1 ? "s" : ""} selected
            </div>
          </div>
        )}

        <NextStepButton targetCategory="animation" label="Animation" />
      </>
    );
  }

  // ── One-Pager: simple multi-select list ──
  if (outputType === "one-pager") {
    const selections = navSelections || [];

    const handleToggle = (id) => {
      if (id === "none") {
        if (selections.includes("none")) { clearNavSelections(); } else { setNavSelections(["none"]); }
        return;
      }
      let next = selections.filter((s) => s !== "none");
      if (next.includes(id)) { next = next.filter((s) => s !== id); } else { next.push(id); }
      if (next.length === 0) { clearNavSelections(); } else { setNavSelections(next); }
    };

    return (
      <>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Navigation</div>
          <div style={{ fontSize: 11, color: c.muted }}>How readers move through your page</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {ONE_PAGER_NAV_OPTIONS.map((opt) => {
            const active = selections.includes(opt.id);
            const isNone = opt.id === "none";
            return (
              <button
                key={opt.id}
                onClick={() => handleToggle(opt.id)}
                onMouseEnter={() => setHoveredNavSelection(opt.id)}
                onMouseLeave={() => setHoveredNavSelection(null)}
                style={{
                  padding: 0, borderRadius: 14, cursor: "pointer", fontFamily: "inherit",
                  border: active ? `2px solid ${SECTION_COLOR}` : `1px solid ${c.panelBorder}`,
                  background: active ? `${SECTION_COLOR}08` : "rgba(255,255,255,0.03)",
                  display: "flex", flexDirection: "column", overflow: "hidden",
                  transition: "all 0.15s", boxShadow: active ? `0 4px 20px ${SECTION_COLOR}20` : "none",
                  textAlign: "left", position: "relative",
                  opacity: isNone && selections.length > 0 && !selections.includes("none") ? 0.5 : 1,
                }}
              >
                <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: active ? `${SECTION_COLOR}06` : "rgba(255,255,255,0.02)", padding: "0 12px" }}>
                  <NavOptionPreview id={opt.id} active={active} color={SECTION_COLOR} />
                </div>
                <div style={{ padding: "8px 10px", borderTop: `1px solid ${active ? `${SECTION_COLOR}25` : c.panelBorder}` }}>
                  <div style={{ fontSize: 11, fontWeight: active ? 700 : 600, color: active ? SECTION_COLOR : c.text }}>{opt.label}</div>
                  <div style={{ fontSize: 9, color: c.muted, marginTop: 2, lineHeight: 1.3 }}>{opt.desc}</div>
                </div>
                {active && (
                  <div style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: 4, background: SECTION_COLOR, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={9} color="#0c0e14" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selections.length > 0 && (
          <div style={{ marginBottom: 12, padding: "8px 12px", borderRadius: 8, background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.12)", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="check" size={12} color="#6ee7b7" />
            <div style={{ fontSize: 10, color: "#6ee7b7", fontWeight: 600 }}>
              {selections.includes("none") ? "No navigation aids" : `${selections.length} option${selections.length !== 1 ? "s" : ""} selected`}
            </div>
          </div>
        )}

        <NextStepButton targetCategory="prompt" label="Prompt" />
      </>
    );
  }

  // ── App: single-select mode (existing behavior) ──
  const selectedPattern = navStyle
    ? NAV_PATTERNS.find((p) => p.id === navStyle.patternId)
    : null;
  const fineTune = navStyle?.fineTune || {};

  const selectedIndex = selectedPattern
    ? NAV_PATTERNS.findIndex((p) => p.id === selectedPattern.id)
    : -1;
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / 4) : -1;
  const insertAfterIndex = selectedRow >= 0 ? (selectedRow + 1) * 4 - 1 : -1;

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Navigation</div>
        <div style={{ fontSize: 11, color: c.muted }}>How users move through your app</div>
      </div>

      {/* Pattern grid with inline fine-tune */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {NAV_PATTERNS.map((pattern, i) => {
          const active = selectedPattern?.id === pattern.id;
          const Thumb = THUMB_MAP[pattern.id];

          return (
            <Fragment key={pattern.id}>
              <button
                onClick={() => active ? clearNavStyle() : setNavStyle(pattern)}
                style={{
                  padding: 0,
                  borderRadius: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: active ? `2px solid ${SECTION_COLOR}` : `1px solid ${c.panelBorder}`,
                  background: active ? `${SECTION_COLOR}08` : "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "all 0.15s",
                  boxShadow: active ? `0 4px 20px ${SECTION_COLOR}20` : "none",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {/* Styled preview with real content */}
                <div style={{ height: 110, overflow: "hidden" }}>
                  {Thumb && <Thumb accent={pattern.color} label={pattern.label} desc={pattern.tagline} />}
                </div>

                {/* Check badge */}
                {active && (
                  <div style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    background: SECTION_COLOR,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon name="check" size={9} color="#0c0e14" />
                  </div>
                )}
              </button>

              {/* Inline fine-tune expansion */}
              {i === insertAfterIndex && selectedPattern && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={"ft-" + selectedPattern.id}
                    style={{ gridColumn: "1 / -1", overflow: "hidden" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div style={{
                      padding: "16px 14px",
                      borderRadius: 12,
                      background: `${SECTION_COLOR}06`,
                      border: `1px solid ${SECTION_COLOR}18`,
                      marginTop: 4,
                    }}>
                      {/* Fine-tune header */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}>
                        <Icon name="sliders" size={14} color={SECTION_COLOR} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>
                          Fine-Tune{" "}
                          <span style={{ color: SECTION_COLOR }}>{selectedPattern.label}</span>
                        </span>
                        {navStyle?.custom && (
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: 5,
                            fontSize: 9,
                            fontWeight: 700,
                            background: `${SECTION_COLOR}15`,
                            color: SECTION_COLOR,
                            border: `1px solid ${SECTION_COLOR}25`,
                          }}>Custom</span>
                        )}
                        <div style={{ flex: 1 }} />
                        <div style={{ display: "flex", gap: 4 }}>
                          {selectedPattern.dims.map((dimId) => (
                            <div key={dimId} style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: NAV_FINE_TUNE_DIMS[dimId].color,
                              opacity: 0.6,
                            }} />
                          ))}
                        </div>
                      </div>

                      {/* Dim cards */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {selectedPattern.dims.map((dimId) => (
                          <DimCard
                            key={dimId}
                            dim={dimId}
                            value={fineTune[dimId]}
                            onChange={(v) => setNavFineTune(dimId, v)}
                            expanded={expDim === dimId}
                            onToggle={() => setExpDim(expDim === dimId ? null : dimId)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </Fragment>
          );
        })}
      </div>

      <NextStepButton targetCategory="buttons" label="Buttons" />
    </>
  );
}
