import { useState } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import ScissorsMascot from "../shared/ScissorsMascot";

function MiniPreview({ mode }) {
  const isDark = mode === "dark";
  const bg = isDark ? "#0f1219" : "#ffffff";
  const card = isDark ? "#1a1e2e" : "#f3f4f6";
  const text = isDark ? "#e5e7eb" : "#111827";
  const muted = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)";
  const accent = "#818cf8";
  const bars = [65, 40, 80, 55, 70, 45, 90, 60];

  return (
    <div style={{ background: bg, borderRadius: 10, padding: 10, height: "100%", display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 24, height: 4, borderRadius: 2, background: muted }} />
      </div>

      {/* Stat row */}
      <div style={{ display: "flex", gap: 4 }}>
        {[accent, "#34d399", "#f59e0b"].map((color, i) => (
          <div key={i} style={{ flex: 1, padding: "6px 6px 4px", borderRadius: 6, background: card, border: `1px solid ${muted}` }}>
            <div style={{ width: 16, height: 3, borderRadius: 1, background: muted, marginBottom: 4 }} />
            <div style={{ fontSize: 10, fontWeight: 800, color: text, fontFamily: "'DM Sans',sans-serif" }}>
              {["$2.4M", "18.2K", "99.9%"][i]}
            </div>
            <div style={{ fontSize: 6, color, fontWeight: 600, marginTop: 1 }}>
              {["+12.4%", "+8.1%", "+0.1%"][i]}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ flex: 1, background: card, borderRadius: 6, padding: "6px 6px 4px", border: `1px solid ${muted}`, display: "flex", flexDirection: "column" }}>
        <div style={{ width: 28, height: 3, borderRadius: 1, background: muted, marginBottom: 6 }} />
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: i >= 6 ? accent : `${accent}30`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ padding: "3px 10px", borderRadius: 4, background: accent, fontSize: 6, fontWeight: 700, color: bg }}>Primary</div>
        <div style={{ padding: "3px 10px", borderRadius: 4, background: card, border: `1px solid ${muted}`, fontSize: 6, fontWeight: 600, color: text }}>Secondary</div>
      </div>
    </div>
  );
}

export default function WelcomeScreen() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const completeOnboarding = usePromptStore((s) => s.completeOnboarding);
  const c = getShellColors(shellMode === "light");
  const [hovering, setHovering] = useState(null);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 30% 40%, rgba(67,56,202,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(129,140,248,0.05) 0%, transparent 50%)`,
        pointerEvents: "none",
      }} />

      {/* Left column — visual showcase */}
      <div style={{
        flex: "0 0 340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 0 40px 40px",
        position: "relative",
      }}>
        {/* Floating color chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["#818cf8", "#f472b6", "#6ee7b7", "#fbbf24", "#67e8f9", "#a78bfa"].map((color) => (
            <div key={color} style={{
              width: 18, height: 18, borderRadius: 5, background: color,
              boxShadow: `0 2px 8px ${color}40`,
            }} />
          ))}
        </div>

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <ScissorsMascot size={44} expression="classic" />
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: c.text, letterSpacing: "-0.03em", lineHeight: 1 }}>
              Pintuck
            </div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>
              Craft the vibe. Copy the prompt.
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 15, color: c.text, lineHeight: 1.5, margin: "0 0 6px", fontWeight: 500 }}>
          Design your UI visually, then paste the prompt into{" "}
          <span style={{ color: "#f59e0b", fontWeight: 700 }}>Kiro</span>,{" "}
          <span style={{ color: "#818cf8", fontWeight: 700 }}>Claude Code</span>,{" "}
          <span style={{ color: "#22c55e", fontWeight: 700 }}>Cursor</span>,{" "}
          or any AI coding tool.
        </p>
        <p style={{ fontSize: 12, color: c.muted, lineHeight: 1.5, margin: "0 0 24px" }}>
          Pick colors, mood, layout, components — watch the preview update live — then copy the generated prompt.
        </p>

        {/* Step pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { num: "1", icon: "palette", color: "#818cf8", text: "Choose your theme & accent colors" },
            { num: "2", icon: "sparkles", color: "#a78bfa", text: "Set the mood — density, typography, feel" },
            { num: "3", icon: "grid", color: "#6ee7b7", text: "Style components & set animations" },
            { num: "4", icon: "copy", color: "#6ee7b7", text: "Copy the prompt & build with AI" },
          ].map((step) => (
            <div key={step.num} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 12px", borderRadius: 10,
              background: c.dim, border: `1px solid ${c.panelBorder}`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: `${step.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 800, color: step.color,
              }}>
                {step.num}
              </div>
              <span style={{ fontSize: 11, color: c.text, fontWeight: 500 }}>{step.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — mode selection */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 40px 40px 30px",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 4, textAlign: "center" }}>
          First things first
        </div>
        <div style={{ fontSize: 11, color: c.muted, marginBottom: 20, textAlign: "center" }}>
          Pick your starting palette — you can always switch later
        </div>

        {/* Dark / Light cards */}
        <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
          {[
            { mode: "dark", label: "Dark Mode", icon: "moon", iconColor: "#818cf8", border: "rgba(129,140,248,0.25)" },
            { mode: "light", label: "Light Mode", icon: "sun", iconColor: "#f59e0b", border: "rgba(0,0,0,0.1)" },
          ].map((opt) => {
            const isHovered = hovering === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => completeOnboarding(opt.mode)}
                onMouseEnter={() => setHovering(opt.mode)}
                onMouseLeave={() => setHovering(null)}
                style={{
                  flex: 1,
                  padding: 0,
                  borderRadius: 14,
                  border: isHovered ? `2px solid ${opt.iconColor}` : `1.5px solid ${opt.border}`,
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  overflow: "hidden",
                  transition: "all 0.2s",
                  boxShadow: isHovered ? `0 8px 32px ${opt.iconColor}25` : "0 2px 12px rgba(0,0,0,0.1)",
                  transform: isHovered ? "translateY(-2px)" : "none",
                }}
              >
                {/* Mini preview */}
                <div style={{ height: 160, padding: 6 }}>
                  <MiniPreview mode={opt.mode} />
                </div>
                {/* Label */}
                <div style={{
                  padding: "10px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  borderTop: `1px solid ${opt.border}`,
                  background: c.dim,
                }}>
                  <Icon name={opt.icon} size={14} color={opt.iconColor} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip */}
        <button
          onClick={() => completeOnboarding("skip")}
          style={{
            marginTop: 16,
            padding: "8px 20px",
            borderRadius: 8,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 500,
            color: c.muted,
            transition: "all 0.15s",
          }}
        >
          Skip — I'll decide later
        </button>
      </div>
    </div>
  );
}
