import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export default function Section({ title, subtitle, step, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        marginBottom: 20,
        background: "rgba(26,31,46,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        border: "1px solid rgba(201,168,76,0.1)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#F0EDE6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C9A84C, #a8893a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "#0B0F19",
              flexShrink: 0,
            }}
          >
            {step}
          </span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 12, color: "rgba(240,237,230,0.45)", marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <Icon
          name={open ? "chevronUp" : "chevronDown"}
          size={16}
          color="rgba(201,168,76,0.5)"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 22px 22px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
