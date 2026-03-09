import { useState, useEffect } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";

const ACCENT = "#f59e0b";

export default function SubmitTemplate({ open, onClose }) {
  const shellMode = usePromptStore((s) => s.shellMode);
  const submitTemplate = usePromptStore((s) => s.submitTemplate);
  const configuredSections = usePromptStore((s) => s.configuredSections);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setTagsInput("");
      setSuccess(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    submitTemplate(name.trim(), description.trim(), tagsArray);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const inputStyle = {
    background: c.dim,
    border: `1px solid ${c.panelBorder}`,
    color: c.text,
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: c.panelBg,
          border: `1px solid ${c.panelBorder}`,
          borderRadius: 16,
          padding: 24,
          maxWidth: 440,
          width: "90%",
          backdropFilter: "blur(12px)",
        }}
      >
        {success ? (
          /* ── Success state ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "32px 0",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `${ACCENT}20`,
                border: `2px solid ${ACCENT}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: ACCENT,
              }}
            >
              &#10003;
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: c.text,
              }}
            >
              Submitted!
            </div>
            <div
              style={{
                fontSize: 11,
                color: c.muted,
              }}
            >
              Your config has been added to pending submissions.
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: c.text,
                marginBottom: 6,
              }}
            >
              Submit Your Config
            </div>
            <div
              style={{
                fontSize: 11,
                color: c.muted,
                lineHeight: 1.4,
                marginBottom: 16,
              }}
            >
              Doesn't need to be complete — even a theme + one or two sections
              makes a useful starting point for someone else.
            </div>

            {/* Name */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: c.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. My SaaS Dashboard"
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: c.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the look and feel of your config"
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: c.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Tags
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="dark, saas, dashboard (comma-separated)"
                style={inputStyle}
              />
              <div
                style={{
                  fontSize: 9,
                  color: c.dim,
                  marginTop: 4,
                }}
              >
                Separate tags with commas
              </div>
            </div>

            {/* Configured sections preview */}
            {configuredSections.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.muted,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  What you've set so far
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {configuredSections.map((section) => (
                    <span
                      key={section}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 5,
                        fontSize: 9,
                        fontWeight: 600,
                        background: `${ACCENT}15`,
                        color: ACCENT,
                        border: `1px solid ${ACCENT}25`,
                      }}
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: `1px solid ${c.panelBorder}`,
                  background: c.dim,
                  color: c.muted,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim()}
                style={{
                  padding: "8px 18px",
                  borderRadius: 8,
                  border: "none",
                  background: name.trim() ? ACCENT : `${ACCENT}40`,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: name.trim() ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  transition: "opacity 0.15s",
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
