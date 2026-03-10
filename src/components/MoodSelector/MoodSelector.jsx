import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { MOOD_PRESETS, DEFAULT_MOOD_DIMENSIONS } from "./constants";
import PresetCard from "./PresetCard";
import FineTunePanel from "./FineTunePanel";
import NextStepButton from "../shared/NextStepButton";

export default function MoodSelector() {
  const moodPreset = usePromptStore((s) => s.moodPreset);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const moodCustom = usePromptStore((s) => s.moodCustom);
  const setMoodPreset = usePromptStore((s) => s.setMoodPreset);
  const setMoodDimension = usePromptStore((s) => s.setMoodDimension);
  const outputType = usePromptStore((s) => s.outputType);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const dims = moodDimensions || DEFAULT_MOOD_DIMENSIONS;

  return (
    <>
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

      {outputType === "presentation" ? (
        <NextStepButton targetCategory="layouts" label="Slide Layouts" />
      ) : (
        <NextStepButton targetCategory="cards" label="Card Style" />
      )}
    </>
  );
}
