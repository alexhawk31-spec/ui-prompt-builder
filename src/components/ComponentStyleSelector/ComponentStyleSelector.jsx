import { useState, useMemo, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { THEMES } from "../../constants/themes";
import { getPreviewPalette } from "../PurposeSelector/constants";
import { CARD_STYLES, CARD_FINE_TUNE_DIMS } from "./constants";
import {
  PRESENTATION_CARD_OPTIONS,
  ONE_PAGER_CARD_OPTIONS,
} from "../../constants/modeOptions";
import SimpleMultiSelect from "../shared/SimpleMultiSelect";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

import ThumbFrosted from "./thumbnails/ThumbFrosted";
import ThumbBlueprint from "./thumbnails/ThumbBlueprint";
import ThumbFloat from "./thumbnails/ThumbFloat";
import ThumbWireframe from "./thumbnails/ThumbWireframe";
import ThumbNeon from "./thumbnails/ThumbNeon";
import ThumbSoftClay from "./thumbnails/ThumbSoftClay";
import ThumbRaw from "./thumbnails/ThumbRaw";
import ThumbWatercolor from "./thumbnails/ThumbWatercolor";

const THUMB_MAP = {
  frosted: ThumbFrosted,
  blueprint: ThumbBlueprint,
  float: ThumbFloat,
  wireframe: ThumbWireframe,
  neon: ThumbNeon,
  "soft-clay": ThumbSoftClay,
  raw: ThumbRaw,
  watercolor: ThumbWatercolor,
};

function DimCard({ dim, value, onChange, expanded, onToggle }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const d = CARD_FINE_TUNE_DIMS[dim];

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
                minWidth: 120,
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

export default function CardStyleSelector() {
  const cardStyle = usePromptStore((s) => s.cardStyle);
  const setCardStyle = usePromptStore((s) => s.setCardStyle);
  const setCardFineTune = usePromptStore((s) => s.setCardFineTune);
  const clearCardStyle = usePromptStore((s) => s.clearCardStyle);
  const shellMode = usePromptStore((s) => s.shellMode);
  const previewMode = usePromptStore((s) => s.previewMode);
  const themeId = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const customColors = usePromptStore((s) => s.customColors);
  const outputType = usePromptStore((s) => s.outputType);
  const c = getShellColors(shellMode === "light");

  // ── Presentation / One Pager: simple multi-select ──
  if (outputType === "presentation" || outputType === "one-pager") {
    const options = outputType === "presentation" ? PRESENTATION_CARD_OPTIONS : ONE_PAGER_CARD_OPTIONS;
    const SECTION_COLOR = "#818cf8";
    // Store selections as cardStyle.styleId = comma-separated IDs
    const selections = cardStyle?.styleId?.split(",").filter(Boolean) || [];

    const handleToggle = (id) => {
      const next = selections.includes(id)
        ? selections.filter((s) => s !== id)
        : [...selections, id];
      if (next.length === 0) {
        clearCardStyle();
      } else {
        usePromptStore.setState({
          cardStyle: { styleId: next.join(","), fineTune: {}, custom: false },
        });
        usePromptStore.getState().autoInclude("cards");
      }
    };

    return (
      <>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
            {outputType === "presentation" ? "Slide Types" : "Content Blocks"}
          </div>
          <div style={{ fontSize: 11, color: c.muted }}>
            {outputType === "presentation"
              ? "Select the slide layouts to include in your deck"
              : "Select the content block types to include"}
          </div>
        </div>
        <SimpleMultiSelect
          options={options}
          selections={selections}
          onToggle={handleToggle}
          color={SECTION_COLOR}
        />
        <NextStepButton targetCategory="data" label="Data Display" />
      </>
    );
  }

  const effectiveTheme = useMemo(() => {
    const base = THEMES.find((t) => t.id === themeId);
    if (!base) return null;
    const overrides = customColors[themeId] || {};
    const accent = customAccents[themeId] || base.preview.accent;
    return { ...base, preview: { ...base.preview, ...overrides, accent } };
  }, [themeId, customAccents, customColors]);

  const p = useMemo(() => getPreviewPalette(previewMode === "dark", effectiveTheme), [previewMode, effectiveTheme]);

  const [expDim, setExpDim] = useState(null);

  const selectedStyle = cardStyle
    ? CARD_STYLES.find((s) => s.id === cardStyle.styleId)
    : null;
  const fineTune = cardStyle?.fineTune || {};

  const selectedIndex = selectedStyle
    ? CARD_STYLES.findIndex((s) => s.id === selectedStyle.id)
    : -1;
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / 3) : -1;
  const insertAfterIndex = selectedRow >= 0 ? Math.min((selectedRow + 1) * 3 - 1, CARD_STYLES.length - 1) : -1;

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Card Style</div>
        <div style={{ fontSize: 11, color: c.muted }}>How your card surfaces look and feel</div>
      </div>

      {/* Style grid with inline fine-tune */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {CARD_STYLES.map((style, i) => {
          const active = selectedStyle?.id === style.id;
          const Thumb = THUMB_MAP[style.id];

          return (
            <Fragment key={style.id}>
              <button
                onClick={() => active ? clearCardStyle() : setCardStyle(style)}
                style={{
                  padding: 0,
                  borderRadius: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: active ? `2px solid ${style.color}` : `1px solid ${c.panelBorder}`,
                  background: active ? `${style.color}08` : "rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "all 0.15s",
                  boxShadow: active ? `0 4px 20px ${style.color}20` : "none",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                {/* Styled card with label + description as content */}
                <div style={{ height: 110, overflow: "hidden" }}>
                  {Thumb && <Thumb accent={style.color} p={p} label={style.label} desc={style.desc} />}
                </div>

                {/* Check badge */}
                {active && (
                  <div style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: style.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Icon name="check" size={10} color="#fff" />
                  </div>
                )}
              </button>

              {/* Inline fine-tune expansion — appears after the last card in the selected row */}
              {i === insertAfterIndex && selectedStyle && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={"ft-" + selectedStyle.id}
                    style={{ gridColumn: "1 / -1", overflow: "hidden" }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div style={{
                      padding: "16px 14px",
                      borderRadius: 12,
                      background: `${selectedStyle.color}06`,
                      border: `1px solid ${selectedStyle.color}18`,
                      marginTop: 4,
                    }}>
                      {/* Fine-tune header */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}>
                        <Icon name="sliders" size={14} color={selectedStyle.color} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>Fine-Tune</span>
                        {cardStyle?.custom && (
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: 5,
                            fontSize: 9,
                            fontWeight: 700,
                            background: `${selectedStyle.color}15`,
                            color: selectedStyle.color,
                            border: `1px solid ${selectedStyle.color}25`,
                          }}>Custom</span>
                        )}
                        <div style={{ flex: 1 }} />
                        <div style={{ display: "flex", gap: 4 }}>
                          {selectedStyle.dims.map((dimId) => (
                            <div key={dimId} style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: CARD_FINE_TUNE_DIMS[dimId].color,
                              opacity: 0.6,
                            }} />
                          ))}
                        </div>
                      </div>

                      {/* Dim cards */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {selectedStyle.dims.map((dimId) => (
                          <DimCard
                            key={dimId}
                            dim={dimId}
                            value={fineTune[dimId]}
                            onChange={(v) => setCardFineTune(dimId, v)}
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

      <NextStepButton targetCategory="data" label="Data Display" />
    </>
  );
}
