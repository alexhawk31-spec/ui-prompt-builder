import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { OUTPUT_TYPES, USAGE_TIPS } from "../../constants/outputTypes";
import Icon from "../shared/Icon";
import NextStepButton from "../shared/NextStepButton";

export default function ProjectPicker() {
  const outputType = usePromptStore((s) => s.outputType);
  const buildMode = usePromptStore((s) => s.buildMode);
  const appStarterEnabled = usePromptStore((s) => s.appStarterEnabled);
  const setOutputType = usePromptStore((s) => s.setOutputType);
  const setBuildMode = usePromptStore((s) => s.setBuildMode);
  const setAppStarterEnabled = usePromptStore((s) => s.setAppStarterEnabled);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const [pendingType, setPendingType] = useState(null);

  const handleTypeSelect = (typeId) => {
    if (outputType === typeId) return;
    if (outputType && outputType !== typeId) {
      setPendingType(typeId);
      return;
    }
    setOutputType(typeId);
  };

  const confirmSwitch = () => {
    if (pendingType) {
      setOutputType(pendingType);
      setPendingType(null);
    }
  };

  const cancelSwitch = () => setPendingType(null);

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
          What are you building?
        </div>
        <div style={{ fontSize: 11, color: c.muted }}>
          This shapes everything — which steps are available, what options appear, and how your prompt is structured.
        </div>
      </div>

      {/* Output Type Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {OUTPUT_TYPES.map((type) => {
          const active = outputType === type.id;
          const locked = type.locked;
          const tip = USAGE_TIPS[type.id];

          return (
            <div key={type.id} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <button
                onClick={() => handleTypeSelect(type.id)}
                disabled={locked}
                style={{
                  padding: "16px 14px",
                  borderRadius: tip ? "14px 14px 0 0" : 14,
                  border: active
                    ? `2px solid ${type.color}`
                    : `1px solid ${c.panelBorder}`,
                  background: active
                    ? `${type.color}08`
                    : locked
                      ? `${c.dim}80`
                      : c.dim,
                  cursor: locked ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition: "all 0.2s",
                  position: "relative",
                  opacity: locked ? 0.4 : 1,
                  boxShadow: active ? `0 4px 20px ${type.color}20` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: `${type.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={type.icon} size={14} color={type.color} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: active ? c.text : c.muted,
                      }}
                    >
                      {type.label}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: c.muted,
                    opacity: 0.7,
                    lineHeight: 1.4,
                  }}
                >
                  {type.subtitle}
                </div>

                {/* Check badge */}
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: type.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="check" size={9} color="#fff" />
                  </div>
                )}
              </button>

              {/* Tip underneath each card */}
              {tip && (
                <div
                  style={{
                    padding: "8px 10px",
                    borderRadius: "0 0 14px 14px",
                    background: `${type.color}06`,
                    border: active
                      ? `2px solid ${type.color}`
                      : `1px solid ${c.panelBorder}`,
                    borderTop: "none",
                  }}
                >
                  {tip.lines.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 9,
                        color: c.muted,
                        lineHeight: 1.5,
                        marginBottom: i < tip.lines.length - 1 ? 4 : 0,
                      }}
                    >
                      <strong style={{ color: `${type.color}cc` }}>{line.bold}</strong>{" "}
                      {line.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* "Don't know?" helper */}
      {!outputType && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 10,
            background: c.dim,
            border: `1px solid ${c.panelBorder}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon name="helpCircle" size={14} color={c.muted} />
          <div style={{ fontSize: 11, color: c.muted }}>
            Not sure? Pick{" "}
            <span
              style={{ color: c.text, fontWeight: 600, cursor: "pointer", textDecoration: "underline", textDecorationColor: `${c.text}40` }}
              onClick={() => setOutputType("app")}
            >
              App / UI Interface
            </span>
            {" "} — it's the most flexible option and you can always switch later.
          </div>
        </div>
      )}

      {/* Modal overlay for switch confirmation */}
      <AnimatePresence>
        {pendingType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={cancelSwitch}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 360,
                padding: 24,
                borderRadius: 16,
                background: c.panelBg,
                border: `1px solid ${c.panelBorder}`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(251,146,60,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="alertTriangle" size={18} color="#fb923c" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>
                    Switch project type?
                  </div>
                  <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>
                    This resets your current prompt settings.
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button
                  onClick={cancelSwitch}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: `1px solid ${c.panelBorder}`,
                    background: "transparent",
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
                  onClick={confirmSwitch}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: "none",
                    background: "#fb923c",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Switch
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options revealed after type selection */}
      <AnimatePresence>
        {outputType && !pendingType && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* From Scratch / Upgrade Buttons (Presentation + One Pager) */}
            {(outputType === "presentation" || outputType === "one-pager") && (
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                {[
                  { id: "new-build", label: "Starting from scratch", icon: "wand", color: "#22c55e" },
                  { id: "upgrade", label: "Upgrading existing", icon: "refresh", color: "#818cf8" },
                ].map((opt) => {
                  const active = buildMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setBuildMode(opt.id)}
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: active
                          ? `2px solid ${opt.color}`
                          : `1px solid ${c.panelBorder}`,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        background: active ? `${opt.color}15` : c.dim,
                        color: active ? opt.color : c.muted,
                        boxShadow: active ? `0 2px 12px ${opt.color}25` : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      <Icon name={opt.icon} size={13} color={active ? opt.color : c.muted} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* App Starter Toggle (App only) */}
            {outputType === "app" && (
              <div style={{ marginTop: 14 }}>
                <button
                  onClick={() => setAppStarterEnabled(!appStarterEnabled)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: appStarterEnabled
                      ? "rgba(129,140,248,0.08)"
                      : c.dim,
                    border: appStarterEnabled
                      ? "1px solid rgba(129,140,248,0.2)"
                      : `1px solid ${c.panelBorder}`,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    width: "100%",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon
                    name="code"
                    size={14}
                    color={appStarterEnabled ? "#818cf8" : c.muted}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: appStarterEnabled ? "#818cf8" : c.muted,
                    }}
                  >
                    Include app starter prompt
                  </span>
                  <div style={{ flex: 1 }} />
                  <div
                    style={{
                      width: 32,
                      height: 18,
                      borderRadius: 9,
                      background: appStarterEnabled
                        ? "#818cf8"
                        : "rgba(255,255,255,0.1)",
                      position: "relative",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        background: "#fff",
                        position: "absolute",
                        top: 2,
                        left: appStarterEnabled ? 16 : 2,
                        transition: "left 0.2s",
                      }}
                    />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {outputType && <NextStepButton targetCategory="theme" label="Colors" />}
    </>
  );
}
