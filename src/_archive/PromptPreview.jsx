import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";

export default function PromptPreview({ preset, dimensions }) {
  const [copied, setCopied] = useState(false);
  const shellMode = usePromptStore((s) => s.shellMode);
  const colors = getShellColors(shellMode === "light");

  if (!preset) {
    return (
      <div
        style={{
          background: "#1e2130",
          border: "1px solid rgba(129,140,248,0.15)",
          borderRadius: 10,
          padding: "24px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(240,237,230,0.3)",
          textAlign: "center",
        }}
      >
        Select a mood preset to see the prompt preview
      </div>
    );
  }

  const density = dimensions?.density ?? preset.density;
  const typography = dimensions?.typography ?? preset.typography;
  const interaction = dimensions?.interaction ?? preset.interaction;
  const embellishment = dimensions?.embellishment ?? preset.embellishment;

  const fullText = [
    `--mood-feel`,
    `  ${preset.promptText}`,
    ``,
    `--dimensions`,
    `  density: "${density}", typography: "${typography}"`,
    `  interaction: "${interaction}", embellishment: "${embellishment}"`,
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      style={{
        background: "#1e2130",
        border: "1px solid rgba(129,140,248,0.15)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {/* Terminal chrome bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(129,140,248,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
          <span
            style={{
              fontSize: 8,
              fontFamily: "'JetBrains Mono', monospace",
              color: colors.muted,
              marginLeft: 6,
            }}
          >
            prompt preview
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            background: "rgba(129,140,248,0.1)",
            color: "#818cf8",
            fontSize: 7,
            fontFamily: "'JetBrains Mono', monospace",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Icon name="copy" size={9} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: "10px 14px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          lineHeight: 1.6,
        }}
      >
        {/* Line 1: --mood-feel */}
        <div>
          <span style={{ color: "#22c55e" }}>$ </span>
          <span style={{ color: "#a78bfa" }}>--mood-feel</span>
        </div>

        {/* Line 2: prompt text */}
        <div style={{ paddingLeft: 12, color: "rgba(240,237,230,0.5)" }}>
          {preset.promptText}
        </div>

        {/* Blank line */}
        <div style={{ height: 8 }} />

        {/* Line 3: --dimensions */}
        <div>
          <span style={{ color: "#22c55e" }}>$ </span>
          <span style={{ color: "#a78bfa" }}>--dimensions</span>
        </div>

        {/* Line 4: density + typography */}
        <div style={{ paddingLeft: 12, color: "rgba(240,237,230,0.35)" }}>
          density: "{density}", typography: "{typography}"
        </div>

        {/* Line 5: interaction + embellishment */}
        <div style={{ paddingLeft: 12, color: "rgba(240,237,230,0.35)" }}>
          interaction: "{interaction}", embellishment: "{embellishment}"
        </div>
      </div>
    </div>
  );
}
