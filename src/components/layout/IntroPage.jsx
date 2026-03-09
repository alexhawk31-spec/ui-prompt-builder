import { useState } from "react";
import ScissorsMascot from "../shared/ScissorsMascot";

const FADE_UP = {
  opacity: 0,
  transform: "translateY(12px)",
  animation: "pintuckFadeUp 0.5s ease-out forwards",
};

function delay(ms) {
  return { ...FADE_UP, animationDelay: `${ms}s` };
}

export default function IntroPage({ onStart }) {
  const [hoverCta, setHoverCta] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#06060a",
        color: "#f0ede6",
        fontFamily: "'DM Sans',sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes pintuckFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pintuckBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes pintuckWiggle {
          0%, 100% { transform: translateY(0) rotate(0); }
          25%      { transform: translateY(-4px) rotate(-0.8deg); }
          75%      { transform: translateY(-2px) rotate(0.4deg); }
        }
      `}</style>

      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          mask: "radial-gradient(ellipse at 50% 35%, black 15%, transparent 65%)",
          WebkitMask: "radial-gradient(ellipse at 50% 35%, black 15%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ═══ HERO ═══ */}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 32px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Terminal intro bar */}
        <div
          style={{
            background: "rgba(30,33,48,0.5)",
            border: "1px solid rgba(99,102,241,0.12)",
            borderRadius: 8,
            padding: "7px 18px",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            color: "rgba(240,237,230,0.6)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            ...delay(0),
          }}
        >
          <span style={{ color: "#6ee7b7", fontWeight: 700 }}>$</span>
          <span style={{ color: "rgba(240,237,230,0.75)" }}>pintuck --start-crafting</span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 13,
              background: "#818cf8",
              marginLeft: 3,
              animation: "pintuckBlink 1s step-end infinite",
            }}
          />
        </div>

        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 4,
            ...delay(0.1),
          }}
        >
          <ScissorsMascot
            size={72}
            expression="winking"
            style={{
              filter: "drop-shadow(0 8px 30px rgba(99,102,241,0.2))",
              animation: "pintuckWiggle 4s ease-in-out 1.2s infinite",
            }}
          />
          <div
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontWeight: 800,
              fontSize: 52,
              letterSpacing: -1.5,
              color: "#e0e7ff",
              lineHeight: 1,
            }}
          >
            Pintuck
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 15,
            fontStyle: "italic",
            color: "rgba(240,237,230,0.7)",
            marginBottom: 16,
            letterSpacing: 0.3,
            ...delay(0.2),
          }}
        >
          Craft the vibe. Copy the prompt.
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          onMouseEnter={() => setHoverCta(true)}
          onMouseLeave={() => setHoverCta(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg,#4338ca,#6366f1)",
            color: "#e0e7ff",
            border: "none",
            padding: "12px 30px",
            borderRadius: 12,
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: hoverCta
              ? "0 8px 28px rgba(99,102,241,0.4)"
              : "0 4px 20px rgba(67,56,202,0.3)",
            letterSpacing: 0.3,
            position: "relative",
            overflow: "hidden",
            transform: hoverCta ? "translateY(-2px)" : "none",
            ...delay(0.3),
          }}
        >
          Start Crafting →
        </button>
      </div>

      {/* ═══ HOW IT WORKS DIVIDER ═══ */}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 32px",
          position: "relative",
          zIndex: 1,
          ...delay(0.4),
        }}
      >
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.12), transparent)" }} />
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#c7d2fe",
            whiteSpace: "nowrap",
          }}
        >
          How It Works
        </div>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.12), transparent)" }} />
      </div>

      {/* ═══ STEPS ═══ */}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
          gap: 8,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            ...delay(0.5),
          }}
        >
          {/* Step 01 */}
          <StepCard num="01" title="Configure your design" desc="Walk through 9 sections — pick from 19 palettes, set density, dial embellishment from brutalist to glass. A live preview updates with every choice.">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {[
                { label: "Theme", color: "#818cf8" },
                { label: "Mood", color: "#a78bfa" },
                { label: "Layout", color: "#67e8f9" },
                { label: "Components", color: "#6ee7b7" },
                { label: "Animation", color: "#fbbf24" },
              ].map((p) => (
                <span
                  key={p.label}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    padding: "3px 8px",
                    borderRadius: 5,
                    border: `1px solid ${p.color}40`,
                    background: `${p.color}12`,
                    color: p.color,
                  }}
                >
                  {p.label}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(240,237,230,0.45)",
                }}
              >
                +4 more
              </span>
            </div>
          </StepCard>

          {/* Step 02 */}
          <StepCard num="02" title="Watch the prompt build" desc="A terminal dock generates a structured prompt with concrete values — hex codes, pixel sizes, font names, easing curves.">
            <div
              style={{
                background: "rgba(30,33,48,0.4)",
                border: "1px solid rgba(99,102,241,0.15)",
                borderRadius: 7,
                padding: "8px 12px",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10,
                lineHeight: 1.6,
                marginTop: 8,
              }}
            >
              <div><span style={{ color: "#6ee7b7", fontWeight: 700 }}>$</span> <span style={{ color: "#818cf8" }}>--theme</span> <span style={{ color: "rgba(240,237,230,0.7)" }}>"neon-cyber"</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "rgba(240,237,230,0.7)" }}>bg: #0a0e1a, accent: #00f5d4</span></div>
              <div><span style={{ color: "#6ee7b7", fontWeight: 700 }}>$</span> <span style={{ color: "#818cf8" }}>--mood</span> <span style={{ color: "rgba(240,237,230,0.7)" }}>"professional"</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "rgba(240,237,230,0.7)" }}>density: balanced, embellish: minimal</span></div>
              <div><span style={{ color: "rgba(240,237,230,0.4)" }}>// 7 more sections...</span></div>
            </div>
          </StepCard>

          {/* Step 03 */}
          <StepCard num="03" title="Copy and build" desc="Hit copy, paste into your AI coding tool. It gets precise specs ready to become real code.">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  borderRadius: 7,
                  padding: "6px 12px",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#818cf8",
                  letterSpacing: 0.5,
                }}
              >
                ✂ Copy Prompt
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(240,237,230,0.4)" }}>→</span>
              <div style={{ display: "flex", gap: 5 }}>
                {["Claude", "Q Dev", "Cursor"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 8,
                      fontWeight: 600,
                      color: "rgba(240,237,230,0.4)",
                      padding: "4px 7px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 5,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </StepCard>
        </div>
      </div>

      {/* ═══ CALLOUT ═══ */}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          maxWidth: 900,
          padding: "12px 32px 14px",
          position: "relative",
          zIndex: 1,
          ...delay(0.6),
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,58,237,0.06))",
            border: "1px solid rgba(99,102,241,0.12)",
            borderRadius: 12,
            padding: "14px 20px",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: "linear-gradient(180deg, #6366f1, #a855f7)",
              borderRadius: "3px 0 0 3px",
            }}
          />
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              width: 28,
              height: 28,
              background: "linear-gradient(135deg, #4338ca, #7c3aed)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              boxShadow: "0 2px 8px rgba(99,102,241,0.25)",
            }}
          >
            ✂
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#e0e7ff",
                marginBottom: 3,
              }}
            >
              A strong starting point — not a finished product
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "rgba(240,237,230,0.7)" }}>
              AI coding tools don't always translate prompts perfectly. Think of Pintuck's output as a foundation to iterate on — it gets you 80% of the way there, then you fine-tune the rest. The more specific your configuration, the closer the result. Use it as a jumping off point, not the final answer.
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div
        style={{
          flex: "0 0 auto",
          textAlign: "center",
          padding: 8,
          fontSize: 10,
          color: "rgba(240,237,230,0.2)",
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: 0.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        crafted by Alex Head
      </div>
    </div>
  );
}

function StepCard({ num, title, desc, children }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(14,17,24,0.5)",
        border: `1px solid ${hover ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 14,
        padding: "18px 18px 14px",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, border-color 0.3s ease",
        overflow: "hidden",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 5 }}>
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 800,
            fontSize: 26,
            lineHeight: 1,
            color: "rgba(129,140,248,0.5)",
          }}
        >
          {num}
        </div>
        <div
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "#e0e7ff",
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(240,237,230,0.75)", marginBottom: 10 }}>
        {desc}
      </div>
      {children}
    </div>
  );
}
