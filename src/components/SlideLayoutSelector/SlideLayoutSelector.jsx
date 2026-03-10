import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { THEMES } from "../../constants/themes";
import { getShellColors } from "../../utils/shellColors";
import { getPreviewPalette } from "../PurposeSelector/constants";
import { getMoodStyles } from "../../utils/moodStyles";
import { SLIDE_LAYOUT_CATEGORIES } from "./constants";
import { SLIDE_RENDERERS } from "./PreviewSlideLayout";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

export default function SlideLayoutSelector() {
  const slideLayouts = usePromptStore((s) => s.slideLayouts);
  const setSlideLayouts = usePromptStore((s) => s.setSlideLayouts);
  const clearSlideLayouts = usePromptStore((s) => s.clearSlideLayouts);
  const shellMode = usePromptStore((s) => s.shellMode);
  const previewMode = usePromptStore((s) => s.previewMode);
  const themeId = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const customColors = usePromptStore((s) => s.customColors);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const c = getShellColors(shellMode === "light");

  const effectiveTheme = useMemo(() => {
    const base = THEMES.find((t) => t.id === themeId);
    if (!base) return null;
    const overrides = customColors[themeId] || {};
    const accent = customAccents[themeId] || base.preview.accent;
    return { ...base, preview: { ...base.preview, ...overrides, accent } };
  }, [themeId, customAccents, customColors]);

  const p = getPreviewPalette(previewMode === "dark", effectiveTheme);
  const mood = useMemo(() => getMoodStyles(moodDimensions), [moodDimensions]);
  const scales = useMemo(() => ({
    pad: Math.round(((mood || {}).padScale || 1) * 14),
    gap: Math.round(((mood || {}).gapScale || 1) * 8),
    fs: (base) => Math.round(((mood || {}).fontScale || 1) * base),
    cRad: (mood || {}).cardRadius ?? 8,
    hWt: (mood || {}).headWeight || 700,
    hFont: (mood || {}).headFont || "'DM Sans',sans-serif",
    bFont: (mood || {}).bodyFont || "'DM Sans',sans-serif",
  }), [mood]);

  const [expandedCat, setExpandedCat] = useState(null);
  const selections = slideLayouts || [];

  const handleToggle = (optionId, categoryId) => {
    // Single-select per category: deselect if already active, otherwise replace within category
    if (selections.includes(optionId)) {
      const next = selections.filter((s) => s !== optionId);
      if (next.length === 0) {
        clearSlideLayouts();
      } else {
        setSlideLayouts(next);
      }
      return;
    }
    // Find sibling option IDs in this category
    const cat = SLIDE_LAYOUT_CATEGORIES.find((c) => c.id === categoryId);
    const siblingIds = cat ? cat.options.map((o) => o.id) : [];
    // Remove any existing selection from this category, then add the new one
    const next = selections.filter((s) => !siblingIds.includes(s)).concat(optionId);
    setSlideLayouts(next);
  };

  const totalSelected = selections.length;

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
          Slide Layouts
        </div>
        <div style={{ fontSize: 11, color: c.muted, lineHeight: 1.5 }}>
          Select as many as you want — the prompt tells the AI which slide types to include; it decides what content goes where.
        </div>
      </div>

      {/* Category boxes grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {SLIDE_LAYOUT_CATEGORIES.map((cat) => {
          const isExpanded = expandedCat === cat.id;
          const selectedCount = cat.options.filter((opt) => selections.includes(opt.id)).length;
          const hasSelections = selectedCount > 0;

          return (
            <div
              key={cat.id}
              style={{
                gridColumn: isExpanded ? "1 / -1" : undefined,
              }}
            >
              {/* Category box */}
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
                {/* Color dot */}
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: hasSelections ? cat.color : `${cat.color}40`,
                  boxShadow: hasSelections ? `0 0 8px ${cat.color}60` : "none",
                  flexShrink: 0,
                  transition: "all 0.15s",
                }} />

                {/* Label */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: hasSelections ? cat.color : c.text,
                  }}>
                    {cat.label}
                  </div>
                  <div style={{ fontSize: 9, color: c.muted, marginTop: 1 }}>
                    {cat.desc}
                  </div>
                </div>

                {/* Count badge or chevron */}
                {hasSelections && !isExpanded ? (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4,
                    background: `${cat.color}25`, color: cat.color,
                  }}>
                    {selectedCount}
                  </span>
                ) : (
                  <Icon
                    name={isExpanded ? "chevUp" : "chevDown"}
                    size={12}
                    color={c.muted}
                  />
                )}
              </button>

              {/* Expanded options — visual grid */}
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
                        const Renderer = SLIDE_RENDERERS[opt.id];

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleToggle(opt.id, cat.id)}
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
                            {/* Slide preview — label is the headline inside */}
                            <div style={{
                              height: 120,
                              overflow: "hidden",
                              background: p.bg,
                              fontSize: 0,
                            }}>
                              {Renderer && (
                                <div style={{ transform: "scale(0.55)", transformOrigin: "top left", width: "182%", height: "182%" }}>
                                  <Renderer p={p} m={scales} label={opt.label} />
                                </div>
                              )}
                            </div>

                            {/* Check badge */}
                            {active && (
                              <div style={{
                                position: "absolute", top: 4, right: 4,
                                width: 16, height: 16, borderRadius: 4,
                                background: cat.color,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <Icon name="check" size={9} color="#fff" />
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
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(110,231,183,0.06)",
            border: "1px solid rgba(110,231,183,0.12)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name="check" size={12} color="#6ee7b7" />
          <div style={{ fontSize: 10, color: "#6ee7b7", fontWeight: 600 }}>
            {totalSelected} layout{totalSelected !== 1 ? "s" : ""} selected
          </div>
          <div style={{ fontSize: 9, color: c.muted, marginLeft: 4 }}>
            — the AI will arrange your content across these slide types
          </div>
        </div>
      )}

      <NextStepButton targetCategory="navigation" label="Navigation" />
    </>
  );
}
