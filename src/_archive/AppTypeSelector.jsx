import { motion } from "framer-motion";
import usePromptStore from "../store/usePromptStore";
import { APP_TYPES } from "../constants/categories";
import { getShellColors } from "../utils/shellColors";
import Icon from "./shared/Icon";

// Each app type gets its own accent color and mini wireframe
const TYPE_VISUALS = {
  dashboard: {
    color: "#818cf8",
    wireframe: (c, a) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 16, borderRadius: 3, background: c, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 4px" }}>
              <div style={{ width: "60%", height: 2, borderRadius: 1, background: `${a}40`, marginBottom: 2 }} />
              <div style={{ width: "80%", height: 4, borderRadius: 1, background: `${a}25` }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          <div style={{ width: 20, height: 22, borderRadius: 3, background: c, display: "flex", flexDirection: "column", gap: 2, padding: 3 }}>
            {[1, 2, 3].map((i) => <div key={i} style={{ width: "100%", height: 2, borderRadius: 1, background: i === 1 ? a : `${a}20` }} />)}
          </div>
          <div style={{ flex: 1, height: 22, borderRadius: 3, background: c, display: "flex", alignItems: "flex-end", gap: 2, padding: "0 3px 3px" }}>
            {[30, 50, 35, 65, 55, 75, 45, 60].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 1, background: i >= 6 ? a : `${a}25` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  marketing: {
    color: "#f472b6",
    wireframe: (c, a) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        <div style={{ height: 22, borderRadius: 3, background: c, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <div style={{ width: "50%", height: 3, borderRadius: 1, background: `${a}40` }} />
          <div style={{ width: "35%", height: 2, borderRadius: 1, background: `${a}20` }} />
          <div style={{ width: 20, height: 6, borderRadius: 3, background: a, marginTop: 1 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: 18, borderRadius: 3, background: c, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: `${a}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: a }} />
              </div>
              <div style={{ width: "60%", height: 2, borderRadius: 1, background: `${a}25` }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  social: {
    color: "#a78bfa",
    wireframe: (c, a) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        <div style={{ height: 14, borderRadius: 3, background: c, display: "flex", alignItems: "center", gap: 4, padding: "0 5px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: a, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: "40%", height: 2, borderRadius: 1, background: `${a}50`, marginBottom: 2 }} />
            <div style={{ width: "25%", height: 2, borderRadius: 1, background: `${a}20` }} />
          </div>
        </div>
        {[1, 2].map((i) => (
          <div key={i} style={{ height: 16, borderRadius: 3, background: c, padding: "3px 5px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ width: `${60 + i * 15}%`, height: 2, borderRadius: 1, background: `${a}25` }} />
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 12, height: 2, borderRadius: 1, background: `${a}20` }} />
              <div style={{ width: 10, height: 2, borderRadius: 1, background: a }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  ecommerce: {
    color: "#34d399",
    wireframe: (c, a) => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: "100%" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ borderRadius: 3, background: c, overflow: "hidden" }}>
            <div style={{ height: 14, background: `${a}10` }} />
            <div style={{ padding: "3px 4px" }}>
              <div style={{ width: "70%", height: 2, borderRadius: 1, background: `${a}30`, marginBottom: 2 }} />
              <div style={{ width: "50%", height: 3, borderRadius: 1, background: a }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  portfolio: {
    color: "#fb923c",
    wireframe: (c, a) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        <div style={{ height: 14, borderRadius: 3, background: c, display: "flex", alignItems: "center", gap: 4, padding: "0 5px" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: a, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ width: "45%", height: 3, borderRadius: 1, background: `${a}50`, marginBottom: 2 }} />
            <div style={{ width: "30%", height: 2, borderRadius: 1, background: `${a}20` }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ borderRadius: 3, background: c, overflow: "hidden" }}>
              <div style={{ height: 12, background: `${a}12` }} />
              <div style={{ padding: "2px 3px" }}>
                <div style={{ width: "80%", height: 2, borderRadius: 1, background: `${a}25` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  saas: {
    color: "#67e8f9",
    wireframe: (c, a) => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: "100%" }}>
        {["Starter", "Pro"].map((plan) => (
          <div key={plan} style={{ borderRadius: 3, background: c, padding: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ width: "60%", height: 2, borderRadius: 1, background: `${a}30` }} />
            <div style={{ width: "40%", height: 4, borderRadius: 1, background: a }} />
            {[1, 2].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: a }} />
                <div style={{ width: 16, height: 2, borderRadius: 1, background: `${a}20` }} />
              </div>
            ))}
            <div style={{ width: 20, height: 6, borderRadius: 3, background: plan === "Pro" ? a : "transparent", border: `1px solid ${a}`, marginTop: 1 }} />
          </div>
        ))}
      </div>
    ),
  },
  blog: {
    color: "#fbbf24",
    wireframe: (c, a) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 3, borderRadius: 3, background: c, overflow: "hidden" }}>
            <div style={{ width: 18, flexShrink: 0, background: `${a}12` }} />
            <div style={{ flex: 1, padding: "3px 4px 3px 0" }}>
              <div style={{ width: `${50 + i * 10}%`, height: 2, borderRadius: 1, background: `${a}35`, marginBottom: 2 }} />
              <div style={{ width: "30%", height: 2, borderRadius: 1, background: `${a}15` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

export default function AppTypeSelector() {
  const appType = usePromptStore((s) => s.appType);
  const setAppType = usePromptStore((s) => s.setAppType);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {APP_TYPES.map((type) => {
          const isActive = appType === type.id;
          const visual = TYPE_VISUALS[type.id];
          const color = visual?.color || "#f472b6";
          const cardBg = isActive ? `${color}06` : c.dim;
          const borderClr = isActive ? color : c.panelBorder;

          return (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAppType(type.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 0,
                borderRadius: 14,
                border: `${isActive ? 2 : 1.5}px solid ${borderClr}`,
                background: cardBg,
                boxShadow: isActive
                  ? `0 4px 20px ${color}20, inset 0 1px 0 ${color}10`
                  : "none",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all 0.2s",
                overflow: "hidden",
              }}
            >
              {/* Mini wireframe preview */}
              <div
                style={{
                  padding: 10,
                  background: isActive
                    ? `${color}08`
                    : c.dim,
                  borderBottom: `1px solid ${isActive ? `${color}15` : c.panelBorder}`,
                }}
              >
                <div
                  style={{
                    height: 52,
                    borderRadius: 6,
                    background: isActive ? `${color}08` : c.dim,
                    border: `1px solid ${isActive ? `${color}12` : c.panelBorder}`,
                    padding: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {visual?.wireframe(
                    isActive ? `${color}12` : c.dim,
                    isActive ? color : c.muted
                  )}
                </div>
              </div>

              {/* Label + description */}
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: isActive ? `${color}18` : c.dim,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon
                      name={type.icon}
                      size={14}
                      color={isActive ? color : c.muted}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: isActive ? c.text : c.muted,
                      transition: "color 0.2s",
                    }}
                  >
                    {type.label}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: c.muted,
                    lineHeight: 1.5,
                    paddingLeft: 36,
                  }}
                >
                  {type.desc}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
