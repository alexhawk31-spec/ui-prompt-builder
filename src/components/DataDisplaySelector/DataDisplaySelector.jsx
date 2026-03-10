import { useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { DATA_STYLES, DATA_FINE_TUNE_DIMS } from "./constants";
import {
  PRESENTATION_DATA_OPTIONS,
  ONE_PAGER_DATA_OPTIONS,
} from "../../constants/modeOptions";
import SimpleMultiSelect from "../shared/SimpleMultiSelect";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";
import DataPreview from "./DataPreview";

import ThumbLedger from "./thumbnails/ThumbLedger";
import ThumbPulse from "./thumbnails/ThumbPulse";
import ThumbLinen from "./thumbnails/ThumbLinen";
import ThumbEmber from "./thumbnails/ThumbEmber";
import ThumbTicker from "./thumbnails/ThumbTicker";
import ThumbLineup from "./thumbnails/ThumbLineup";
import ThumbMosaic from "./thumbnails/ThumbMosaic";
import ThumbTeletype from "./thumbnails/ThumbTeletype";
import {
  ThumbCompactStat,
  ThumbMiniTable,
  ThumbSimpleBar,
  ThumbComparisonList,
} from "./thumbnails/onePager";

const OP_THUMB_MAP = {
  "compact-stat": ThumbCompactStat,
  "mini-table": ThumbMiniTable,
  "simple-bar": ThumbSimpleBar,
  "comparison-list": ThumbComparisonList,
};

const THUMB_MAP = {
  ledger: ThumbLedger,
  pulse: ThumbPulse,
  linen: ThumbLinen,
  ember: ThumbEmber,
  ticker: ThumbTicker,
  lineup: ThumbLineup,
  mosaic: ThumbMosaic,
  teletype: ThumbTeletype,
};

function DimCard({ dim, value, onChange, expanded, onToggle }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const d = DATA_FINE_TUNE_DIMS[dim];

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

export default function DataDisplaySelector() {
  const dataStyle = usePromptStore((s) => s.dataStyle);
  const setDataStyle = usePromptStore((s) => s.setDataStyle);
  const setDataFineTune = usePromptStore((s) => s.setDataFineTune);
  const clearDataStyle = usePromptStore((s) => s.clearDataStyle);
  const shellMode = usePromptStore((s) => s.shellMode);
  const outputType = usePromptStore((s) => s.outputType);
  const c = getShellColors(shellMode === "light");

  // ── Presentation / One Pager: simple multi-select ──
  if (outputType === "presentation" || outputType === "one-pager") {
    const options = outputType === "presentation" ? PRESENTATION_DATA_OPTIONS : ONE_PAGER_DATA_OPTIONS;
    const SECTION_COLOR = "#22c55e";
    const selections = dataStyle?.styleId?.split(",").filter(Boolean) || [];

    const handleToggle = (id) => {
      const next = selections.includes(id)
        ? selections.filter((s) => s !== id)
        : [...selections, id];
      if (next.length === 0) {
        clearDataStyle();
      } else {
        usePromptStore.setState({
          dataStyle: { styleId: next.join(","), fineTune: {}, custom: false },
        });
        usePromptStore.getState().autoInclude("data");
      }
    };

    // One-pager gets visual thumbnail grid
    if (outputType === "one-pager") {
      return (
        <>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Data Elements</div>
            <div style={{ fontSize: 11, color: c.muted }}>How data appears in your one-pager</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {options.map((opt) => {
              const active = selections.includes(opt.id);
              const Thumb = OP_THUMB_MAP[opt.id];
              return (
                <button
                  key={opt.id}
                  onClick={() => handleToggle(opt.id)}
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
                  <div style={{ height: 110, overflow: "hidden" }}>
                    {Thumb && <Thumb accent={SECTION_COLOR} />}
                  </div>
                  {active && (
                    <div style={{
                      position: "absolute", top: 4, right: 4, width: 16, height: 16, borderRadius: 4,
                      background: SECTION_COLOR, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name="check" size={9} color="#0c0e14" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <NextStepButton targetCategory="navigation" label="Navigation" />
        </>
      );
    }

    // Presentation keeps SimpleMultiSelect
    return (
      <>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Data Visualizations</div>
          <div style={{ fontSize: 11, color: c.muted }}>How data is presented in your slides</div>
        </div>
        <SimpleMultiSelect
          options={options}
          selections={selections}
          onToggle={handleToggle}
          color={SECTION_COLOR}
        />
        <NextStepButton targetCategory="navigation" label="Navigation" />
      </>
    );
  }

  const [expDim, setExpDim] = useState(null);

  const selectedStyle = dataStyle
    ? DATA_STYLES.find((s) => s.id === dataStyle.styleId)
    : null;
  const fineTune = dataStyle?.fineTune || {};

  const selectedIndex = selectedStyle
    ? DATA_STYLES.findIndex((s) => s.id === selectedStyle.id)
    : -1;
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / 4) : -1;
  const insertAfterIndex = selectedRow >= 0 ? (selectedRow + 1) * 4 - 1 : -1;

  const SECTION_COLOR = "#22c55e";

  const effectiveAccent = selectedStyle?.color || "#22c55e";

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Data Display</div>
        <div style={{ fontSize: 11, color: c.muted }}>Tables & charts</div>
      </div>

      {/* Style grid with inline fine-tune */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {DATA_STYLES.map((style, i) => {
          const active = selectedStyle?.id === style.id;
          const Thumb = THUMB_MAP[style.id];

          return (
            <Fragment key={style.id}>
              <button
                onClick={() => active ? clearDataStyle() : setDataStyle(style)}
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
                        {dataStyle?.custom && (
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
                              background: DATA_FINE_TUNE_DIMS[dimId].color,
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
                              onChange={(v) => setDataFineTune(dimId, v)}
                              expanded={expDim === dimId}
                              onToggle={() => setExpDim(expDim === dimId ? null : dimId)}
                            />
                          ))}
                        </div>
                        {/* Right: live data preview */}
                        <div style={{ flex: 1 }}>
                          <DataPreview style={selectedStyle} fineTune={fineTune} accent={selectedStyle.color} />
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

      <NextStepButton targetCategory="navigation" label="Navigation" />
    </>
  );
}
