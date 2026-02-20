import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { MOOD_DIMS, MOOD_PRESETS, DEFAULT_MOOD_DIMENSIONS } from "./constants";

import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

function DimCard({ dim, value, onChange, expanded, onToggle }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const d = MOOD_DIMS[dim];

  return (
    <div style={{
      borderRadius: 12,
      overflow: "hidden",
      background: expanded ? `${d.color}06` : c.dim,
      border: expanded ? `1px solid ${d.color}20` : `1px solid ${c.panelBorder}`,
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
                background: active ? `${d.color}15` : c.dim,
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
                <div style={{ fontSize: 9, color: c.muted, lineHeight: 1.3, textAlign: "left", opacity: 0.7 }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MoodSelector() {
  const moodPreset = usePromptStore((s) => s.moodPreset);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const moodCustom = usePromptStore((s) => s.moodCustom);
  const setMoodPreset = usePromptStore((s) => s.setMoodPreset);
  const setMoodDimension = usePromptStore((s) => s.setMoodDimension);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const [showFineTune, setShowFineTune] = useState(false);
  const [expDim, setExpDim] = useState(null);

  const vals = moodDimensions || DEFAULT_MOOD_DIMENSIONS;

  return (
    <>
      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>Quick Presets</div>
          <div style={{ fontSize: 11, color: c.muted }}>One click sets all four dimensions</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {MOOD_PRESETS.map((p) => {
            const active = moodPreset === p.id && !moodCustom;
            return (
              <button
                key={p.id}
                onClick={() => setMoodPreset(p)}
                style={{
                  padding: "14px 14px 12px",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: active ? `2px solid ${p.color}` : `1px solid ${c.panelBorder}`,
                  background: active ? `${p.color}10` : c.dim,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 6,
                  transition: "all 0.15s",
                  boxShadow: active ? `0 0 20px ${p.color}15` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7, width: "100%" }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: active ? `${p.color}20` : c.dim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${active ? `${p.color}30` : c.panelBorder}`,
                  }}>
                    <Icon name={p.icon} size={14} color={active ? p.color : c.muted} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: active ? c.text : c.muted }}>{p.name}</span>
                </div>
                <div style={{ fontSize: 9, color: c.muted, lineHeight: 1.3, textAlign: "left" }}>{p.desc}</div>
                {active && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
                    {Object.entries(p.v).map(([dm, vl]) => (
                      <span key={dm} style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: 7,
                        fontWeight: 600,
                        background: `${MOOD_DIMS[dm].color}12`,
                        color: MOOD_DIMS[dm].color,
                        border: `1px solid ${MOOD_DIMS[dm].color}20`,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{vl}</span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fine-tune */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setShowFineTune(!showFineTune)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            background: "transparent",
            padding: "0 0 12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="sliders" size={15} color="#a78bfa" />
            <span style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Fine-Tune</span>
            {moodCustom && (
              <span style={{
                padding: "2px 8px",
                borderRadius: 5,
                fontSize: 9,
                fontWeight: 700,
                background: "rgba(167,139,250,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(167,139,250,0.25)",
              }}>Custom</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {!showFineTune && (
              <div style={{ display: "flex", gap: 4 }}>
                {Object.keys(MOOD_DIMS).map((dm) => (
                  <div key={dm} style={{ width: 8, height: 8, borderRadius: "50%", background: MOOD_DIMS[dm].color, opacity: 0.6 }} />
                ))}
              </div>
            )}
            <Icon name={showFineTune ? "chevUp" : "chevDown"} size={14} color={c.muted} />
          </div>
        </button>
        {showFineTune && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 4 }}>
              Adjust individual dimensions — changes override preset values
            </div>
            {Object.keys(MOOD_DIMS).map((dm) => (
              <DimCard
                key={dm}
                dim={dm}
                value={vals[dm]}
                onChange={(v) => setMoodDimension(dm, v)}
                expanded={expDim === dm}
                onToggle={() => setExpDim(expDim === dm ? null : dm)}
              />
            ))}
          </div>
        )}
      </div>

      <NextStepButton targetCategory="cards" label="Card Style" />
    </>
  );
}
