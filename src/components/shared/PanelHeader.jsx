import { useState, useCallback } from "react";
import { CATEGORIES } from "../../constants/categories";
import { generateCategorySnippet } from "../../utils/generatePrompt";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "./Icon";

export default function PanelHeader({ title, subtitle, isConfigured, onClear, categoryId }) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const catColor = cat?.color || "#6366f1";
  const guidance = cat?.guidance;
  const [copied, setCopied] = useState(false);

  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const handleCopySection = useCallback(() => {
    const state = usePromptStore.getState();
    const snippet = generateCategorySnippet(state, categoryId);
    if (!snippet) return;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [categoryId]);

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: guidance ? 10 : 0,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: c.text,
              marginBottom: 4,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
        </div>
        {isConfigured && (
          <div style={{
            display: "flex", gap: 4, flexShrink: 0,
            padding: "3px 4px",
            borderRadius: 8,
            background: c.dim,
            border: `1px solid ${c.panelBorder}`,
          }}>
            <button
              onClick={handleCopySection}
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "inherit",
                border: "none",
                background: copied ? `${catColor}30` : `${catColor}15`,
                color: copied ? "#4ade80" : catColor,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "all 0.15s",
              }}
            >
              <Icon name={copied ? "check" : "copy"} size={11} color={copied ? "#4ade80" : catColor} />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={onClear}
              style={{
                padding: "5px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "inherit",
                border: "none",
                background: "transparent",
                color: c.muted,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                transition: "all 0.15s",
              }}
            >
              <Icon name="x" size={11} color={c.muted} />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Guidance callout */}
      {guidance && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 10,
            background: `${catColor}10`,
            border: `1px solid ${catColor}18`,
          }}
        >
          <Icon name="wand" size={14} color={`${catColor}90`} />
          <p style={{
            fontSize: 12,
            color: c.muted,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {guidance}
          </p>
        </div>
      )}
    </div>
  );
}
