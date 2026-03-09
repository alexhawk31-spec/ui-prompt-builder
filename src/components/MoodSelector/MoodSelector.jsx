import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { PURPOSE_OPTIONS, OUTPUT_TYPES } from "../../constants/outputTypes";
import { MOOD_PRESETS, DEFAULT_MOOD_DIMENSIONS } from "./constants";
import PresetCard from "./PresetCard";
import FineTunePanel from "./FineTunePanel";
import NextStepButton from "../shared/NextStepButton";
import Icon from "../shared/Icon";

export default function MoodSelector() {
  const moodPreset = usePromptStore((s) => s.moodPreset);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const moodCustom = usePromptStore((s) => s.moodCustom);
  const setMoodPreset = usePromptStore((s) => s.setMoodPreset);
  const setMoodDimension = usePromptStore((s) => s.setMoodDimension);
  const outputType = usePromptStore((s) => s.outputType);
  const outputPurpose = usePromptStore((s) => s.outputPurpose);
  const setOutputPurpose = usePromptStore((s) => s.setOutputPurpose);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const dims = moodDimensions || DEFAULT_MOOD_DIMENSIONS;
  const purposes = outputType ? PURPOSE_OPTIONS[outputType] || [] : [];
  const typeColor = OUTPUT_TYPES.find((t) => t.id === outputType)?.color || "#818cf8";

  return (
    <>
      {/* Purpose / Context selector */}
      {purposes.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: c.muted,
              marginBottom: 8,
            }}
          >
            What kind of {outputType === "app" ? "app" : outputType === "presentation" ? "presentation" : "page"}?
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {purposes.map((purpose) => {
              const active = outputPurpose === purpose.id;
              return (
                <button
                  key={purpose.id}
                  onClick={() => setOutputPurpose(active ? null : purpose.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: active
                      ? `1.5px solid ${typeColor}`
                      : `1px solid ${c.panelBorder}`,
                    background: active ? `${typeColor}15` : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon name={purpose.icon} size={11} color={active ? typeColor : c.muted} />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: active ? 700 : 500,
                      color: active ? typeColor : c.muted,
                    }}
                  >
                    {purpose.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Presets grid */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {MOOD_PRESETS.map((p) => (
            <PresetCard
              key={p.id}
              preset={p}
              isSelected={moodPreset === p.id && !moodCustom}
              onClick={() => setMoodPreset(p)}
            />
          ))}
        </div>
      </div>

      {/* Fine-tune sliders */}
      <FineTunePanel
        dimensions={dims}
        onChangeDimension={(dim, val) => setMoodDimension(dim, val)}
        isCustom={moodCustom}
      />

      <NextStepButton targetCategory="cards" label="Card Style" />
    </>
  );
}
