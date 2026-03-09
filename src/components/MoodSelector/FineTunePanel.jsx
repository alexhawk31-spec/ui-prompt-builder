import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { MOOD_DIMS } from "./constants";
import Icon from "../shared/Icon";

const DOT_COLORS = ["#3b82f6", "#a855f7", "#f59e0b", "#10b981"];

export default function FineTunePanel({ dimensions, onChangeDimension, isCustom }) {
  const [expanded, setExpanded] = useState(false);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  return (
    <div>
      {/* Toggle bar */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          padding: "8px 0",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="sliders" size={14} color={c.muted} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: c.text,
            }}
          >
            Fine-Tune
          </span>
          {isCustom && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: 6,
                background: "rgba(167,139,250,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
            >
              Custom
            </span>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {DOT_COLORS.map((color) => (
            <div
              key={color}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
          <Icon
            name={expanded ? "chevronUp" : "chevronDown"}
            size={14}
            color={c.muted}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
              {Object.entries(MOOD_DIMS).map(([dimKey, dim]) => (
                <div
                  key={dimKey}
                  style={{
                    background: `${dim.color}08`,
                    border: `1px solid ${dim.color}15`,
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  {/* Dimension label */}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: dim.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 6,
                    }}
                  >
                    {dim.label}
                  </div>

                  {/* Options row */}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {dim.opts.map((opt) => {
                      const isActive = dimensions[dimKey] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => onChangeDimension(dimKey, opt.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "capitalize",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            border: isActive
                              ? `1px solid ${dim.color}50`
                              : `1px solid ${c.panelBorder}`,
                            background: isActive ? `${dim.color}18` : c.dim,
                            color: isActive ? c.text : c.muted,
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
