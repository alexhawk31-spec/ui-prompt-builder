import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { CATEGORIES } from "../../constants/categories";
import { isStepAvailable, getDisabledTooltip } from "../../constants/outputTypes";
import { getShellColors } from "../../utils/shellColors";
import { generatePrompt } from "../../utils/generatePrompt";
import Icon from "../shared/Icon";

export default function NavStrip() {
  const activeCategory = usePromptStore((s) => s.activeCategory);
  const setActiveCategory = usePromptStore((s) => s.setActiveCategory);
  const configuredSections = usePromptStore((s) => s.configuredSections);
  const setShowSummary = usePromptStore((s) => s.setShowSummary);
  const shellMode = usePromptStore((s) => s.shellMode);
  const outputType = usePromptStore((s) => s.outputType);
  const c = getShellColors(shellMode === "light");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const state = usePromptStore.getState();
    const prompt = generatePrompt(state);
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <nav
      style={{
        width: 150,
        display: "flex",
        flexDirection: "column",
        padding: "12px 8px 10px",
        gap: 2,
        background: c.navGrad,
        flexShrink: 0,
      }}
    >
      {/* Step items — customization steps only (exclude templates + prompt) */}
      {CATEGORIES.filter((cat) => cat.id !== "templates" && cat.id !== "prompt").map((cat) => {
        const isActive = activeCategory === cat.id;
        const isConfigured = configuredSections.includes(cat.id);
        const alwaysOpen = cat.id === "appType";
        const available = alwaysOpen || isStepAvailable(outputType, cat.id);
        const isDisabled = !alwaysOpen && !available;
        const tooltip = isDisabled ? getDisabledTooltip(outputType, cat.id) : null;
        const isLocked = !alwaysOpen && !outputType;

        return (
          <button
            key={cat.id}
            onClick={() => {
              if (isDisabled || isLocked) return;
              setActiveCategory(cat.id);
            }}
            title={isDisabled ? (tooltip || "Doesn't apply to this project type") : isLocked ? "Select a project type first" : undefined}
            style={{
              width: "100%",
              height: 34,
              borderRadius: 8,
              border: "none",
              cursor: isDisabled || isLocked ? "default" : "pointer",
              background: isActive
                ? "rgba(255,255,255,0.15)"
                : isConfigured && !isDisabled
                  ? "rgba(110,231,183,0.06)"
                  : "transparent",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
              position: "relative",
              transition: "all 0.15s",
              fontFamily: "inherit",
              opacity: isDisabled ? 0.25 : isLocked ? 0.3 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive && !isDisabled && !isLocked)
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              if (!isActive && !isDisabled && !isLocked)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {/* Active indicator bar */}
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 16,
                  borderRadius: "0 3px 3px 0",
                  background: "#fff",
                }}
              />
            )}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Icon
                name={cat.icon}
                size={14}
                color={
                  isDisabled
                    ? "rgba(255,255,255,0.15)"
                    : isActive
                      ? "#fff"
                      : isConfigured
                        ? "#6ee7b7"
                        : "rgba(255,255,255,0.5)"
                }
              />
              {isConfigured && !isActive && !isDisabled && (
                <div
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -5,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#6ee7b7",
                    border: "1.5px solid #3730a3",
                    boxShadow: "0 0 4px rgba(110,231,183,0.5)",
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 700 : 600,
                color: isDisabled
                  ? "rgba(255,255,255,0.15)"
                  : isActive
                    ? "#fff"
                    : isConfigured
                      ? "#6ee7b7"
                      : "rgba(255,255,255,0.55)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.01em",
              }}
            >
              {cat.navLabel || cat.label}
            </span>
          </button>
        );
      })}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 10px" }} />

      {/* Bottom items — Templates & Prompt as standout buttons */}
      {CATEGORIES.filter((cat) => cat.id === "templates" || cat.id === "prompt").map((cat) => {
        const isActive = activeCategory === cat.id;
        const isPrompt = cat.id === "prompt";
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              width: "100%",
              height: 36,
              borderRadius: 8,
              border: isActive ? `1.5px solid ${cat.color}` : `1px solid ${cat.color}50`,
              cursor: "pointer",
              background: isActive
                ? `${cat.color}35`
                : `${cat.color}20`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 10px",
              position: "relative",
              transition: "all 0.15s",
              fontFamily: "inherit",
              marginTop: isPrompt ? 4 : 0,
              boxShadow: isActive ? `0 0 12px ${cat.color}30` : `0 0 8px ${cat.color}10`,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = `${cat.color}30`;
                e.currentTarget.style.borderColor = `${cat.color}80`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = `${cat.color}20`;
                e.currentTarget.style.borderColor = `${cat.color}50`;
              }
            }}
          >
            <Icon
              name={cat.icon}
              size={14}
              color={cat.color}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: cat.color,
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              {cat.navLabel || cat.label}
            </span>
          </button>
        );
      })}

      {/* Summary button */}
      <button
        onClick={() => setShowSummary(true)}
        style={{
          width: "100%",
          height: 34,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 10px",
          position: "relative",
          transition: "all 0.15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
      >
        <Icon name="list" size={14} color="rgba(255,255,255,0.7)" />
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            whiteSpace: "nowrap",
          }}
        >
          Summary
        </span>
        {configuredSections.length > 0 && (
          <div
            style={{
              marginLeft: "auto",
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              background: "#6ee7b7",
              color: "#0c0e14",
              fontSize: 8,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {configuredSections.length}
          </div>
        )}
      </button>

      {/* Copy Prompt button */}
      <button
        onClick={handleCopy}
        style={{
          width: "100%",
          height: 36,
          borderRadius: 8,
          border: "none",
          cursor: configuredSections.length > 0 ? "pointer" : "default",
          background: configuredSections.length > 0
            ? copied
              ? "rgba(110,231,183,0.2)"
              : "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.2))"
            : "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "0 10px",
          transition: "all 0.15s",
          fontFamily: "inherit",
          opacity: configuredSections.length > 0 ? 1 : 0.4,
          marginTop: 4,
        }}
        onMouseEnter={(e) => {
          if (configuredSections.length > 0 && !copied)
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(129,140,248,0.3))";
        }}
        onMouseLeave={(e) => {
          if (configuredSections.length > 0 && !copied)
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(129,140,248,0.2))";
        }}
        disabled={configuredSections.length === 0}
      >
        <Icon name={copied ? "check" : "copy"} size={13} color={copied ? "#6ee7b7" : "#c7d2fe"} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: copied ? "#6ee7b7" : "#c7d2fe",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "Copied!" : "Copy Prompt"}
        </span>
      </button>
    </nav>
  );
}
