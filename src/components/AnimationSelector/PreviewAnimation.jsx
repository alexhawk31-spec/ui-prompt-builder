import { useState, useEffect } from "react";
import usePromptStore from "../../store/usePromptStore";

// ── Slide transition renderers ──

function TransitionFade({ p, m }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((v) => (v + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const slides = [
    { title: "Introduction", color: p.accent },
    { title: "Key Findings", color: `${p.accent}cc` },
    { title: "Next Steps", color: `${p.accent}99` },
  ];
  const slide = slides[phase];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div
        key={phase}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap,
          animation: "animFade 0.5s ease-out",
        }}
      >
        <div style={{ fontSize: m.fs(16), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>{slide.title}</div>
        <div style={{ width: 60, height: 3, borderRadius: 2, background: slide.color }} />
        <div style={{ display: "flex", gap: 4, marginTop: m.gap }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: i === phase ? 14 : 6, height: 6, borderRadius: 3, background: i === phase ? p.accent : `${p.muted}30`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes animFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function TransitionSlide({ p, m }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((v) => (v + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const slides = [
    { title: "Introduction", color: p.accent },
    { title: "Key Findings", color: `${p.accent}cc` },
    { title: "Next Steps", color: `${p.accent}99` },
  ];
  const slide = slides[phase];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div
        key={phase}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap,
          animation: "animSlide 0.45s ease-out",
        }}
      >
        <div style={{ fontSize: m.fs(16), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>{slide.title}</div>
        <div style={{ width: 60, height: 3, borderRadius: 2, background: slide.color }} />
        <div style={{ display: "flex", gap: 4, marginTop: m.gap }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: i === phase ? 14 : 6, height: 6, borderRadius: 3, background: i === phase ? p.accent : `${p.muted}30`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes animSlide {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function TransitionScale({ p, m }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((v) => (v + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const slides = [
    { title: "Introduction", color: p.accent },
    { title: "Key Findings", color: `${p.accent}cc` },
    { title: "Next Steps", color: `${p.accent}99` },
  ];
  const slide = slides[phase];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div
        key={phase}
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap,
          animation: "animScale 0.45s ease-out",
        }}
      >
        <div style={{ fontSize: m.fs(16), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>{slide.title}</div>
        <div style={{ width: 60, height: 3, borderRadius: 2, background: slide.color }} />
        <div style={{ display: "flex", gap: 4, marginTop: m.gap }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: i === phase ? 14 : 6, height: 6, borderRadius: 3, background: i === phase ? p.accent : `${p.muted}30`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes animScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function TransitionNone({ p, m }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(14), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>Instant Cut</div>
      <div style={{ fontSize: m.fs(8), color: p.muted, textAlign: "center", maxWidth: "70%" }}>Slides swap instantly — no transition</div>
      <div style={{ display: "flex", gap: 6, marginTop: m.gap }}>
        {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
          <div key={i} style={{ width: m.fs(14), height: `${h * 40}px`, borderRadius: "3px 3px 0 0", background: i === 3 ? p.accent : `${p.accent}35`, alignSelf: "flex-end" }} />
        ))}
      </div>
    </div>
  );
}

// ── Element build renderers ──

function BuildStagger({ p, m }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const cycle = () => {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    };
    cycle();
    const t = setInterval(cycle, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, padding: m.pad * 2 }}>
      <div style={{
        fontSize: m.fs(16), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text, textAlign: "center",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.4s ease-out",
      }}>Quarterly Results</div>
      <div style={{
        fontSize: m.fs(8), color: p.muted, textAlign: "center", maxWidth: "75%",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.4s ease-out 0.15s",
      }}>Revenue grew 24% year over year</div>
      <div style={{
        display: "flex", gap: 6, marginTop: m.gap,
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.4s ease-out 0.3s",
      }}>
        {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
          <div key={i} style={{
            width: m.fs(14), height: `${h * 40}px`, borderRadius: "3px 3px 0 0",
            background: i === 3 ? p.accent : `${p.accent}35`, alignSelf: "flex-end",
          }} />
        ))}
      </div>
      <div style={{
        fontSize: m.fs(7), color: `${p.muted}80`, fontStyle: "italic",
        opacity: show ? 1 : 0, transition: "opacity 0.4s ease-out 0.5s",
      }}>Title → Body → Visuals (staggered)</div>
    </div>
  );
}

function BuildFadeUp({ p, m }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const cycle = () => {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    };
    cycle();
    const t = setInterval(cycle, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, padding: m.pad * 2,
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(14px)",
      transition: "all 0.4s ease-out",
    }}>
      <div style={{ fontSize: m.fs(16), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text, textAlign: "center" }}>
        Quarterly Results
      </div>
      <div style={{ fontSize: m.fs(8), color: p.muted, textAlign: "center", maxWidth: "75%" }}>
        Revenue grew 24% year over year
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: m.gap }}>
        {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
          <div key={i} style={{
            width: m.fs(14), height: `${h * 40}px`, borderRadius: "3px 3px 0 0",
            background: i === 3 ? p.accent : `${p.accent}35`, alignSelf: "flex-end",
          }} />
        ))}
      </div>
      <div style={{ fontSize: m.fs(7), color: `${p.muted}80`, fontStyle: "italic" }}>
        Everything fades up together
      </div>
    </div>
  );
}

function BuildChart({ p, m }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const cycle = () => {
      setProgress(0);
      let frame = 0;
      const animate = () => {
        frame++;
        setProgress(Math.min(frame / 40, 1));
        if (frame < 40) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };
    cycle();
    const t = setInterval(cycle, 3000);
    return () => clearInterval(t);
  }, []);

  const bars = [0.4, 0.7, 0.55, 0.9, 0.65];
  const value = Math.round(progress * 4.2 * 10) / 10;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, padding: m.pad * 2 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: m.fs(3) }}>
        <div style={{ fontSize: m.fs(24), fontWeight: 900, fontFamily: m.hFont, color: p.accent, lineHeight: 1 }}>
          ${value}M
        </div>
        <div style={{
          fontSize: m.fs(9), fontWeight: 700, color: "#22c55e", marginBottom: m.fs(3),
          opacity: progress > 0.5 ? 1 : 0, transition: "opacity 0.3s",
        }}>↑ 24%</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 40 }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            width: m.fs(12),
            height: `${h * progress * 100}%`,
            borderRadius: "3px 3px 0 0",
            background: i === 3 ? p.accent : `${p.accent}40`,
            transition: "height 0.05s linear",
          }} />
        ))}
      </div>
      <div style={{ fontSize: m.fs(7), color: p.muted }}>Revenue by Quarter</div>
    </div>
  );
}

function BuildNone({ p, m }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(14), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>Instant</div>
      <div style={{ fontSize: m.fs(8), color: p.muted, textAlign: "center", maxWidth: "70%" }}>All content renders immediately — no build animation</div>
      <div style={{ display: "flex", gap: 6, marginTop: m.gap }}>
        {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
          <div key={i} style={{ width: m.fs(14), height: `${h * 40}px`, borderRadius: "3px 3px 0 0", background: i === 3 ? p.accent : `${p.accent}35`, alignSelf: "flex-end" }} />
        ))}
      </div>
    </div>
  );
}

const ANIM_RENDERERS = {
  // Slide transitions
  "transition-fade": TransitionFade,
  "transition-slide": TransitionSlide,
  "transition-scale": TransitionScale,
  "transition-none": TransitionNone,
  // Element builds
  "build-stagger": BuildStagger,
  "build-fade-up": BuildFadeUp,
  "build-chart": BuildChart,
  "build-none": BuildNone,
};

const ANIM_LABELS = {
  "transition-fade": "Fade",
  "transition-slide": "Slide",
  "transition-scale": "Scale",
  "transition-none": "Cut",
  "build-stagger": "Stagger",
  "build-fade-up": "Fade Up",
  "build-chart": "Chart Animate",
  "build-none": "Instant",
};

// ── Main Preview ──

export default function PreviewAnimation({ p, mood }) {
  const m = mood || {};
  const hoveredAnimation = usePromptStore((s) => s.hoveredAnimation);
  const animation = usePromptStore((s) => s.animation);

  const selections = animation ? animation.split(",").filter(Boolean) : [];

  // Show hovered, or last selected, or default
  const activeId = hoveredAnimation
    || (selections.length > 0 ? selections[selections.length - 1] : null)
    || "transition-fade";

  const scales = {
    pad: Math.round((m.padScale || 1) * 14),
    gap: Math.round((m.gapScale || 1) * 8),
    fs: (base) => Math.round((m.fontScale || 1) * base),
    cRad: m.cardRadius ?? 8,
    hWt: m.headWeight || 700,
    hFont: m.headFont || "'DM Sans',sans-serif",
    bFont: m.bodyFont || "'DM Sans',sans-serif",
  };

  const Renderer = ANIM_RENDERERS[activeId];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: scales.bFont }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${scales.gap}px ${scales.pad}px`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ fontSize: scales.fs(8), fontWeight: 600, color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>
          Animation
        </div>
        <div style={{ fontSize: scales.fs(7), color: p.muted }}>
          {ANIM_LABELS[activeId] || "Preview"}
        </div>
      </div>

      {/* Animated content */}
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
        {Renderer ? <Renderer p={p} m={scales} /> : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: scales.fs(9), color: p.muted }}>Select an animation to preview</div>
          </div>
        )}
      </div>

      {/* Bottom indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${scales.gap}px`, borderTop: `1px solid ${p.border}`, gap: 4 }}>
        {selections.length > 0 ? (
          selections.map((id) => (
            <div key={id} style={{
              width: id === activeId ? 16 : 6, height: 6, borderRadius: 3,
              background: id === activeId ? p.accent : `${p.muted}40`,
              transition: "all 0.2s",
            }} />
          ))
        ) : (
          <div style={{ fontSize: scales.fs(7), color: p.muted }}>Hover or select animations</div>
        )}
      </div>
    </div>
  );
}

export { ANIM_RENDERERS };
