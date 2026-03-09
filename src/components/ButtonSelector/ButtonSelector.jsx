import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { BTN_STYLES, BTN_FINE_TUNE_DIMS } from "./constants";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";
import ButtonPreview from "./ButtonPreview";

import ThumbStamp from "./thumbnails/ThumbStamp";
import ThumbTraced from "./thumbnails/ThumbTraced";
import ThumbWash from "./thumbnails/ThumbWash";
import ThumbOmbre from "./thumbnails/ThumbOmbre";
import ThumbNeon from "./thumbnails/ThumbNeon";
import ThumbSlab from "./thumbnails/ThumbSlab";
import ThumbCapsule from "./thumbnails/ThumbCapsule";
import ThumbToggle from "./thumbnails/ThumbToggle";
import ThumbFrost from "./thumbnails/ThumbFrost";
import ThumbInk from "./thumbnails/ThumbInk";
import ThumbBrick from "./thumbnails/ThumbBrick";
import ThumbDuo from "./thumbnails/ThumbDuo";

const THUMB_MAP = {
  stamp: ThumbStamp,
  traced: ThumbTraced,
  wash: ThumbWash,
  ombre: ThumbOmbre,
  neon: ThumbNeon,
  slab: ThumbSlab,
  capsule: ThumbCapsule,
  toggle: ThumbToggle,
  frost: ThumbFrost,
  ink: ThumbInk,
  brick: ThumbBrick,
  duo: ThumbDuo,
};

function DimCard({ dim, value, onChange, expanded, onToggle }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const d = BTN_FINE_TUNE_DIMS[dim];

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

export default function ButtonSelector() {
  const buttonStyle = usePromptStore((s) => s.buttonStyle);
  const setButtonStyle = usePromptStore((s) => s.setButtonStyle);
  const setButtonFineTune = usePromptStore((s) => s.setButtonFineTune);
  const clearButtonStyle = usePromptStore((s) => s.clearButtonStyle);
  const shellMode = usePromptStore((s) => s.shellMode);
  const theme = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const c = getShellColors(shellMode === "light");

  const [expDim, setExpDim] = useState(null);

  const selectedStyle = buttonStyle
    ? BTN_STYLES.find((s) => s.id === buttonStyle.styleId)
    : null;
  const fineTune = buttonStyle?.fineTune || {};

  const selectedIndex = selectedStyle
    ? BTN_STYLES.findIndex((s) => s.id === selectedStyle.id)
    : -1;
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / 4) : -1;
  const insertAfterIndex = selectedRow >= 0 ? (selectedRow + 1) * 4 - 1 : -1;

  const SECTION_COLOR = "#f9a8d4";

  // Use the style's own color as accent for the preview
  const effectiveAccent = selectedStyle?.color || "#818cf8";

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Buttons</div>
        <div style={{ fontSize: 11, color: c.muted }}>Actions & CTAs</div>
      </div>

      {/* Style grid with inline fine-tune */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {BTN_STYLES.map((style, i) => {
          const active = selectedStyle?.id === style.id;
          const Thumb = THUMB_MAP[style.id];

          return (
            <Fragment key={style.id}>
              <button
                onClick={() => active ? clearButtonStyle() : setButtonStyle(style)}
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
                  {Thumb && <Thumb accent={style.color} label={style.label} desc={style.tagline} />}
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
                          <span style={{ color: SECTION_COLOR }}>{selectedStyle.label}</span>
                        </span>
                        {buttonStyle?.custom && (
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
                          {selectedStyle.dims.map((dimId) => (
                            <div key={dimId} style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: BTN_FINE_TUNE_DIMS[dimId].color,
                              opacity: 0.6,
                            }} />
                          ))}
                        </div>
                      </div>

                      {/* Split layout: dim cards + live preview */}
                      <div style={{ display: "flex", gap: 16 }}>
                        {/* Left: fine-tune dim cards */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                          {selectedStyle.dims.map((dimId) => (
                            <DimCard
                              key={dimId}
                              dim={dimId}
                              value={fineTune[dimId]}
                              onChange={(v) => setButtonFineTune(dimId, v)}
                              expanded={expDim === dimId}
                              onToggle={() => setExpDim(expDim === dimId ? null : dimId)}
                            />
                          ))}
                        </div>
                        {/* Right: live button preview */}
                        <div style={{ flex: 1 }}>
                          <ButtonPreview style={selectedStyle} fineTune={fineTune} accent={selectedStyle.color} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </Fragment>
          );
        })}
      </div>

      <NextStepButton targetCategory="animation" label="Animation" />
    </>
  );
}
