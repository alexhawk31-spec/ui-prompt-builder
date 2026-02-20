import { useState } from "react";
import usePromptStore from "../store/usePromptStore";
import { getShellColors } from "../utils/shellColors";
import { generatePrompt } from "../utils/generatePrompt";
import Icon from "./shared/Icon";

export default function PromptViewPanel() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const configuredSections = usePromptStore((s) => s.configuredSections);
  const c = getShellColors(shellMode === "light");
  const [copied, setCopied] = useState(false);

  const state = usePromptStore.getState();
  const prompt = generatePrompt(state);
  const hasContent = configuredSections.length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!hasContent) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <Icon name="terminal" size={32} color={`rgba(167,139,250,0.3)`} />
        <div style={{ fontSize: 14, fontWeight: 500, color: c.muted, marginTop: 12 }}>
          No sections configured yet
        </div>
        <div style={{ fontSize: 12, color: c.dim, marginTop: 4 }}>
          Configure some sections and your prompt will appear here
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Copy bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 12, color: c.muted, fontWeight: 500 }}>
          {prompt.length.toLocaleString()} characters
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            background: copied
              ? "rgba(110,231,183,0.15)"
              : "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.2))",
            color: copied ? "#6ee7b7" : "#c7d2fe",
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            if (!copied)
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(129,140,248,0.3))";
          }}
          onMouseLeave={(e) => {
            if (!copied)
              e.currentTarget.style.background =
                "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.2))";
          }}
        >
          <Icon name={copied ? "check" : "copy"} size={13} color={copied ? "#6ee7b7" : "#c7d2fe"} />
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>

      {/* Prompt text */}
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          border: `1px solid ${c.panelBorder}`,
          borderRadius: 10,
          padding: "16px 18px",
          maxHeight: "calc(100vh - 280px)",
          overflowY: "auto",
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontSize: 12,
            lineHeight: 1.7,
            color: c.text,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {prompt}
        </pre>
      </div>
    </div>
  );
}
