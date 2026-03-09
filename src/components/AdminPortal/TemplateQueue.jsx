import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";

const CONFIG_LABELS = {
  selectedPurpose: "Purpose",
  theme: "Theme",
  modeFilter: "Mode",
  moodPreset: "Mood Preset",
  moodDimensions: "Mood Dimensions",
  cardStyle: "Cards",
  navStyle: "Navigation",
  buttonStyle: "Buttons",
  dataStyle: "Data Display",
  animation: "Animation",
  customAccents: "Custom Accents",
};

function formatConfigValue(key, value) {
  if (value == null || value === false) return null;
  if (typeof value === "object" && !Array.isArray(value)) {
    if (value.styleId) return value.styleId;
    if (value.patternId) return value.patternId;
    return JSON.stringify(value);
  }
  return String(value);
}

export default function TemplateQueue() {
  const pendingSubmissions = usePromptStore((s) => s.pendingSubmissions);
  const approveSubmission = usePromptStore((s) => s.approveSubmission);
  const rejectSubmission = usePromptStore((s) => s.rejectSubmission);
  const shellMode = usePromptStore((s) => s.shellMode);

  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [expanded, setExpanded] = useState(new Set());

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (pendingSubmissions.length === 0) {
    return (
      <div
        style={{
          background: c.panelBg,
          border: `1px solid ${c.panelBorder}`,
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: c.text,
            marginBottom: 8,
          }}
        >
          No pending submissions
        </div>
        <div style={{ fontSize: 13, color: c.muted }}>
          Community submissions will appear here for review.
        </div>
      </div>
    );
  }

  return (
    <div>
      {pendingSubmissions.map((sub) => {
        const isExpanded = expanded.has(sub.id);
        const configEntries = sub.config
          ? Object.entries(sub.config)
              .map(([key, value]) => {
                const formatted = formatConfigValue(key, value);
                if (!formatted) return null;
                return { label: CONFIG_LABELS[key] || key, value: formatted };
              })
              .filter(Boolean)
          : [];

        return (
          <div
            key={sub.id}
            style={{
              background: c.panelBg,
              border: `1px solid ${c.panelBorder}`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name and date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: c.text,
                    }}
                  >
                    {sub.name}
                  </span>
                  {sub.author && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 10,
                        background: "#f59e0b20",
                        color: "#f59e0b",
                      }}
                    >
                      {sub.author}
                    </span>
                  )}
                </div>

                {/* Description */}
                {sub.description && (
                  <div
                    style={{
                      fontSize: 12,
                      color: c.muted,
                      lineHeight: 1.4,
                      marginBottom: 6,
                    }}
                  >
                    {sub.description}
                  </div>
                )}

                {/* Date */}
                {sub.createdAt && (
                  <div style={{ fontSize: 10, color: c.dim, marginBottom: 8 }}>
                    {sub.createdAt}
                  </div>
                )}

                {/* Tags */}
                {sub.tags && sub.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    {sub.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: isLight
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.06)",
                          color: c.muted,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expand toggle */}
                <button
                  onClick={() => toggleExpanded(sub.id)}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    color: "#f59e0b",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {isExpanded ? "Hide config details" : "Show config details"}
                </button>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => approveSubmission(sub.id)}
                  style={{
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    borderRadius: 8,
                    border: "none",
                    background: "#22c55e",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectSubmission(sub.id)}
                  style={{
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    borderRadius: 8,
                    border: "none",
                    background: "#ef4444",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Expanded config details */}
            {isExpanded && configEntries.length > 0 && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  background: isLight
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${c.panelBorder}`,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: c.muted,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Configuration
                </div>
                {configEntries.map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 0",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: c.text }}>
                      {label}:
                    </span>
                    <span style={{ color: c.muted }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
