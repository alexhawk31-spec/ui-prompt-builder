import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";

export default function TemplateManager() {
  const templates = usePromptStore((s) => s.templates);
  const deleteTemplate = usePromptStore((s) => s.deleteTemplate);
  const shellMode = usePromptStore((s) => s.shellMode);

  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleExport = (template) => {
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      deleteTemplate(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  if (templates.length === 0) {
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
          No templates yet
        </div>
        <div style={{ fontSize: 13, color: c.muted }}>
          Approved submissions will appear here as templates.
        </div>
      </div>
    );
  }

  return (
    <div>
      {templates.map((template) => {
        const isConfirming = confirmDelete === template.id;

        return (
          <div
            key={template.id}
            style={{
              background: c.panelBg,
              border: `1px solid ${c.panelBorder}`,
              borderRadius: 12,
              padding: 16,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {/* Template info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Name and author */}
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
                    {template.name}
                  </span>
                  {template.author && (
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
                      {template.author}
                    </span>
                  )}
                </div>

                {/* Description */}
                {template.description && (
                  <div
                    style={{
                      fontSize: 12,
                      color: c.muted,
                      lineHeight: 1.4,
                      marginBottom: 6,
                    }}
                  >
                    {template.description}
                  </div>
                )}

                {/* Date */}
                {template.createdAt && (
                  <div style={{ fontSize: 10, color: c.dim, marginBottom: 8 }}>
                    {template.createdAt}
                  </div>
                )}

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    {template.tags.map((tag) => (
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
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                {/* Export button */}
                <button
                  onClick={() => handleExport(template)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    borderRadius: 8,
                    border: `1px solid ${c.panelBorder}`,
                    background: isLight
                      ? "rgba(0,0,0,0.04)"
                      : "rgba(255,255,255,0.04)",
                    color: c.muted,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon name="download" size={13} color={c.muted} />
                  Export
                </button>

                {/* Delete / Confirm */}
                {isConfirming ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#ef4444",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Are you sure?
                    </span>
                    <button
                      onClick={() => handleDelete(template.id)}
                      style={{
                        padding: "6px 12px",
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
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      style={{
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "inherit",
                        borderRadius: 8,
                        border: `1px solid ${c.panelBorder}`,
                        background: "transparent",
                        color: c.muted,
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDelete(template.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "inherit",
                      borderRadius: 8,
                      border: "none",
                      background: "#ef444420",
                      color: "#ef4444",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon name="trash" size={13} color="#ef4444" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
