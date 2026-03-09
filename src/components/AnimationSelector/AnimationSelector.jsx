import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { ANIMATIONS } from "../../constants";
import { PRESENTATION_ANIMATION_OPTIONS } from "../../constants/modeOptions";
import SimpleMultiSelect from "../shared/SimpleMultiSelect";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

export default function AnimationSelector() {
  const animation = usePromptStore((s) => s.animation);
  const setAnimation = usePromptStore((s) => s.setAnimation);
  const clearAnimation = usePromptStore((s) => s.clearAnimation);
  const outputType = usePromptStore((s) => s.outputType);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const SECTION_COLOR = "#fbbf24";

  // ── Presentation mode: multi-select animation options ──
  if (outputType === "presentation") {
    // Store as comma-separated IDs in animation field (reuse as string)
    const selections = animation ? animation.split(",").filter(Boolean) : [];

    const handleToggle = (id) => {
      // "none" is exclusive
      if (id === "none") {
        if (selections.includes("none")) {
          clearAnimation();
        } else {
          setAnimation("none");
        }
        return;
      }
      // Remove "none" if selecting other options
      let next = selections.filter((s) => s !== "none");
      if (next.includes(id)) {
        next = next.filter((s) => s !== id);
      } else {
        next.push(id);
      }
      if (next.length === 0) {
        clearAnimation();
      } else {
        setAnimation(next.join(","));
      }
    };

    return (
      <>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
            Animation
          </div>
          <div style={{ fontSize: 11, color: c.muted }}>
            Motion and transitions for your presentation. CSS @keyframes only, no JS animation libraries. Keep under 600ms.
          </div>
        </div>
        <SimpleMultiSelect
          options={PRESENTATION_ANIMATION_OPTIONS}
          selections={selections}
          onToggle={handleToggle}
          color={SECTION_COLOR}
          columns={2}
        />
        <NextStepButton targetCategory="templates" label="Templates" />
      </>
    );
  }

  // ── App mode: simple 4-option single-select ──
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
          Animation
        </div>
        <div style={{ fontSize: 11, color: c.muted }}>
          Motion & transitions
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

      <NextStepButton targetCategory="awsGuidelines" label="AWS" />
    </>
  );
}
