import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";

// ── Individual nav control renderers ──

function ArrowKeys({ p, m }) {
  return (
    <>
      {/* Left arrow key */}
      <div style={{ position: "absolute", left: m.pad, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${p.text}10`, border: `1.5px solid ${p.text}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: m.fs(14), fontWeight: 700, color: `${p.text}50`,
          backdropFilter: "blur(4px)",
        }}>←</div>
      </div>
      {/* Right arrow key */}
      <div style={{ position: "absolute", right: m.pad, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${p.text}10`, border: `1.5px solid ${p.text}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: m.fs(14), fontWeight: 700, color: `${p.text}50`,
          backdropFilter: "blur(4px)",
        }}>→</div>
      </div>
      {/* Hint */}
      <div style={{ position: "absolute", bottom: m.pad, left: "50%", transform: "translateX(-50%)", fontSize: m.fs(7), color: p.muted, whiteSpace: "nowrap" }}>
        Use ← → arrow keys to navigate
      </div>
    </>
  );
}

function ClickAnywhere({ p, m }) {
  return (
    <>
      {/* Cursor icon in center */}
      <div style={{ position: "absolute", top: "48%", left: "55%", transform: "translate(-50%, -50%)" }}>
        <svg width={m.fs(22)} height={m.fs(22)} viewBox="0 0 24 24" fill="none">
          <path d="M7 2l10 10h-6l4 9-2 1-4-9-2 5z" fill={`${p.accent}60`} stroke={p.accent} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Ripple rings */}
      <div style={{ position: "absolute", top: "48%", left: "55%", transform: "translate(-50%, -50%)", width: 50, height: 50, borderRadius: "50%", border: `1.5px solid ${p.accent}20` }} />
      <div style={{ position: "absolute", top: "48%", left: "55%", transform: "translate(-50%, -50%)", width: 80, height: 80, borderRadius: "50%", border: `1px solid ${p.accent}10` }} />
      <div style={{ position: "absolute", bottom: m.pad, left: "50%", transform: "translateX(-50%)", fontSize: m.fs(7), color: p.muted, whiteSpace: "nowrap" }}>
        Click anywhere to advance
      </div>
    </>
  );
}

function ClickHalves({ p, m }) {
  return (
    <>
      {/* Left half */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: "50%", height: "100%",
        background: `${p.accent}06`, borderRight: `1px dashed ${p.accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: m.fs(18), fontWeight: 700, color: `${p.accent}30` }}>←</div>
      </div>
      {/* Right half */}
      <div style={{
        position: "absolute", right: 0, top: 0, width: "50%", height: "100%",
        background: `${p.accent}10`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: m.fs(18), fontWeight: 700, color: `${p.accent}40` }}>→</div>
      </div>
      <div style={{ position: "absolute", bottom: m.pad, left: "50%", transform: "translateX(-50%)", fontSize: m.fs(7), color: p.muted, whiteSpace: "nowrap", zIndex: 1 }}>
        Click left half or right half
      </div>
    </>
  );
}

function OnscreenArrows({ p, m }) {
  return (
    <>
      <div style={{ position: "absolute", left: m.pad, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          width: 28, height: 40, borderRadius: m.fs(6),
          background: `${p.accent}15`, border: `1px solid ${p.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: m.fs(16), fontWeight: 700, color: p.accent,
          cursor: "pointer",
        }}>‹</div>
      </div>
      <div style={{ position: "absolute", right: m.pad, top: "50%", transform: "translateY(-50%)" }}>
        <div style={{
          width: 28, height: 40, borderRadius: m.fs(6),
          background: `${p.accent}15`, border: `1px solid ${p.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: m.fs(16), fontWeight: 700, color: p.accent,
          cursor: "pointer",
        }}>›</div>
      </div>
    </>
  );
}

function SlideCounter({ p, m }) {
  return (
    <div style={{ position: "absolute", bottom: m.pad, right: m.pad * 1.5 }}>
      <div style={{
        padding: `${m.fs(3)}px ${m.fs(8)}px`,
        borderRadius: m.fs(4),
        background: `${p.text}08`,
        fontSize: m.fs(10), fontWeight: 600, color: p.muted,
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: ".05em",
      }}>3 / 7</div>
    </div>
  );
}

function ProgressBar({ p, m }) {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: m.fs(3), background: `${p.text}08` }}>
      <div style={{ width: "42%", height: "100%", background: p.accent, borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

function SectionDots({ p, m }) {
  return (
    <div style={{ position: "absolute", bottom: m.pad, left: "50%", transform: "translateX(-50%)", display: "flex", gap: m.fs(4), alignItems: "center" }}>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <div key={n} style={{
          width: n === 3 ? m.fs(12) : m.fs(6), height: m.fs(6), borderRadius: m.fs(3),
          background: n === 3 ? p.accent : `${p.muted}30`,
          transition: "all 0.2s",
        }} />
      ))}
    </div>
  );
}

function ThumbnailGrid({ p, m }) {
  return (
    <div style={{
      position: "absolute", top: m.pad, right: m.pad, bottom: m.pad,
      width: "30%", borderRadius: m.fs(6),
      background: `${p.bg}ee`, border: `1px solid ${p.border}`,
      backdropFilter: "blur(8px)", padding: m.fs(6),
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: m.fs(4),
    }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} style={{
          borderRadius: m.fs(3),
          background: n === 3 ? `${p.accent}20` : p.card,
          border: n === 3 ? `1.5px solid ${p.accent}` : `1px solid ${p.border}`,
        }} />
      ))}
    </div>
  );
}

function SideOutline({ p, m }) {
  const items = ["Introduction", "Market Analysis", "Our Solution", "Pricing", "Next Steps"];
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, bottom: 0,
      width: "32%", background: `${p.bg}f5`, borderRight: `1px solid ${p.border}`,
      backdropFilter: "blur(8px)", padding: `${m.pad * 1.5}px ${m.pad}px`,
      display: "flex", flexDirection: "column", gap: m.fs(3),
    }}>
      <div style={{ fontSize: m.fs(8), fontWeight: 700, color: p.accent, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: m.fs(4) }}>Outline</div>
      {items.map((item, i) => (
        <div key={item} style={{
          padding: `${m.fs(4)}px ${m.fs(6)}px`, borderRadius: m.fs(4),
          background: i === 1 ? `${p.accent}12` : "transparent",
          display: "flex", alignItems: "center", gap: m.fs(5),
        }}>
          <div style={{ fontSize: m.fs(7), fontWeight: 700, color: i === 1 ? p.accent : p.muted, minWidth: m.fs(10) }}>{i + 1}</div>
          <div style={{ fontSize: m.fs(7), fontWeight: i === 1 ? 700 : 500, color: i === 1 ? p.text : p.muted }}>{item}</div>
        </div>
      ))}
    </div>
  );
}

function FloatingTOC({ p, m }) {
  const sections = ["Intro", "Problem", "Solution", "Data", "CTA"];
  return (
    <div style={{
      position: "absolute", top: m.pad, right: m.pad,
      borderRadius: m.fs(8), background: `${p.bg}f0`,
      border: `1px solid ${p.border}`, backdropFilter: "blur(10px)",
      padding: `${m.fs(8)}px ${m.fs(10)}px`,
      display: "flex", flexDirection: "column", gap: m.fs(2),
      boxShadow: `0 4px 16px ${p.text}10`,
    }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 700, color: p.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: m.fs(2) }}>Contents</div>
      {sections.map((s, i) => (
        <div key={s} style={{
          fontSize: m.fs(7), fontWeight: i === 2 ? 700 : 400,
          color: i === 2 ? p.accent : p.muted,
          padding: `${m.fs(2)}px 0`,
        }}>{s}</div>
      ))}
    </div>
  );
}

function Minimap({ p, m }) {
  return (
    <div style={{
      position: "absolute", right: m.pad * 0.5, top: "50%", transform: "translateY(-50%)",
      width: m.fs(18), display: "flex", flexDirection: "column", gap: m.fs(3),
      padding: `${m.fs(4)}px ${m.fs(2)}px`,
      background: `${p.bg}e0`, borderRadius: m.fs(4), border: `1px solid ${p.border}`,
    }}>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <div key={n} style={{
          width: "100%", height: m.fs(10), borderRadius: m.fs(2),
          background: n === 3 ? `${p.accent}35` : `${p.muted}15`,
          border: n === 3 ? `1px solid ${p.accent}` : `1px solid ${p.border}40`,
        }} />
      ))}
    </div>
  );
}

// One-pager controls
function StickyHeader({ p, m }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: m.fs(28),
      background: `${p.bg}ee`, borderBottom: `1px solid ${p.border}`,
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", padding: `0 ${m.pad}px`, gap: m.fs(10),
    }}>
      <div style={{ width: m.fs(8), height: m.fs(8), borderRadius: m.fs(3), background: p.accent }} />
      {["Overview", "Features", "Pricing", "Contact"].map((item, i) => (
        <div key={item} style={{ fontSize: m.fs(7), fontWeight: i === 0 ? 700 : 500, color: i === 0 ? p.accent : p.muted }}>{item}</div>
      ))}
    </div>
  );
}

function BackToTop({ p, m }) {
  return (
    <div style={{
      position: "absolute", bottom: m.pad * 1.5, right: m.pad * 1.5,
      width: m.fs(24), height: m.fs(24), borderRadius: m.fs(6),
      background: p.accent, boxShadow: `0 2px 8px ${p.accent}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: m.fs(12), fontWeight: 700, color: "#fff",
    }}>↑</div>
  );
}

function SectionIndicators({ p, m }) {
  return (
    <div style={{
      position: "absolute", right: m.pad, top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: m.fs(4), alignItems: "center",
    }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} style={{
          width: m.fs(4), height: n === 2 ? m.fs(14) : m.fs(8), borderRadius: m.fs(2),
          background: n === 2 ? p.accent : `${p.muted}30`,
          transition: "all 0.2s",
        }} />
      ))}
    </div>
  );
}

function NoNav({ p, m }) {
  return (
    <div style={{ position: "absolute", bottom: m.pad, left: "50%", transform: "translateX(-50%)", fontSize: m.fs(7), color: `${p.muted}60`, whiteSpace: "nowrap", fontStyle: "italic" }}>
      Pure scroll — no navigation aids
    </div>
  );
}

const NAV_CONTROL_RENDERERS = {
  "arrow-keys": ArrowKeys,
  "click-anywhere": ClickAnywhere,
  "click-halves": ClickHalves,
  "onscreen-arrows": OnscreenArrows,
  "slide-counter": SlideCounter,
  "progress-bar": ProgressBar,
  "section-dots": SectionDots,
  "thumbnail-grid": ThumbnailGrid,
  "side-outline": SideOutline,
  "floating-toc": FloatingTOC,
  "minimap": Minimap,
  "sticky-header": StickyHeader,
  "back-to-top": BackToTop,
  "section-indicators": SectionIndicators,
  "none": NoNav,
};

// ── Main Preview Component ──

export default function PreviewNavControls({ p, mood }) {
  const m = mood || {};
  const hoveredNavSelection = usePromptStore((s) => s.hoveredNavSelection);
  const navSelections = usePromptStore((s) => s.navSelections);
  const outputType = usePromptStore((s) => s.outputType);

  const isPres = outputType === "presentation";

  // Show hovered, or last selected, or a default
  const activeId = hoveredNavSelection
    || (navSelections && navSelections.length > 0 ? navSelections[navSelections.length - 1] : null)
    || (isPres ? "arrow-keys" : "sticky-header");

  const scales = {
    pad: Math.round((m.padScale || 1) * 14),
    gap: Math.round((m.gapScale || 1) * 8),
    fs: (base) => Math.round((m.fontScale || 1) * base),
    cRad: m.cardRadius ?? 8,
    hWt: m.headWeight || 700,
    hFont: m.headFont || "'DM Sans',sans-serif",
    bFont: m.bodyFont || "'DM Sans',sans-serif",
  };

  // Collect all active controls to render
  const controlIds = hoveredNavSelection
    ? [hoveredNavSelection]
    : (navSelections || []);

  // Label map for header
  const labelMap = {
    "arrow-keys": "Arrow Keys",
    "click-anywhere": "Click Anywhere",
    "click-halves": "Click Halves",
    "onscreen-arrows": "On-screen Arrows",
    "slide-counter": "Slide Counter",
    "progress-bar": "Progress Bar",
    "section-dots": "Section Dots",
    "thumbnail-grid": "Thumbnail Grid",
    "side-outline": "Side Outline",
    "floating-toc": "Floating TOC",
    "minimap": "Minimap Strip",
    "sticky-header": "Sticky Header",
    "back-to-top": "Back to Top",
    "section-indicators": "Section Indicators",
    "none": "No Navigation",
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: scales.bFont }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${scales.gap}px ${scales.pad}px`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ fontSize: scales.fs(8), fontWeight: 600, color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>
          {isPres ? "Slide Controls" : "Page Nav"}
        </div>
        <div style={{ fontSize: scales.fs(7), color: p.muted, transition: "opacity 0.15s" }}>
          {hoveredNavSelection ? labelMap[hoveredNavSelection] : controlIds.length > 0 ? `${controlIds.length} active` : "Preview"}
        </div>
      </div>

      {/* Slide/page mockup with controls overlaid */}
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
        {/* Background slide content mockup */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: scales.gap, padding: scales.pad * 3 }}>
          {isPres ? (
            <>
              <div style={{ fontSize: scales.fs(16), fontWeight: scales.hWt, fontFamily: scales.hFont, color: p.text, textAlign: "center" }}>Market Analysis</div>
              <div style={{ fontSize: scales.fs(8), color: p.muted, textAlign: "center", maxWidth: "70%", lineHeight: 1.5 }}>Key findings from Q4 research across three segments</div>
              <div style={{ display: "flex", gap: scales.gap, marginTop: scales.gap }}>
                {[0.4, 0.65, 0.5, 0.85].map((h, i) => (
                  <div key={i} style={{ width: scales.fs(16), height: `${h * 50}px`, borderRadius: "3px 3px 0 0", background: i === 3 ? p.accent : `${p.accent}30`, alignSelf: "flex-end" }} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ width: "80%", display: "flex", flexDirection: "column", gap: scales.gap * 0.6, marginTop: scales.pad * 2 }}>
                <div style={{ fontSize: scales.fs(12), fontWeight: scales.hWt, fontFamily: scales.hFont, color: p.text }}>Project Overview</div>
                {[90, 75, 85, 60, 70, 80].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}20` }} />
                ))}
                <div style={{ height: scales.gap }} />
                <div style={{ fontSize: scales.fs(10), fontWeight: scales.hWt, color: p.text }}>Features</div>
                {[80, 65, 75, 55].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}15` }} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Render all active controls overlaid */}
        <AnimatePresence mode="sync">
          {(controlIds.length > 0 ? controlIds : [activeId]).map((id) => {
            const Renderer = NAV_CONTROL_RENDERERS[id];
            if (!Renderer) return null;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                <Renderer p={p} m={scales} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${scales.gap}px`, borderTop: `1px solid ${p.border}`, gap: 4 }}>
        {controlIds.length > 0 ? (
          controlIds.map((id) => (
            <div key={id} style={{
              width: id === activeId ? 16 : 6, height: 6, borderRadius: 3,
              background: id === activeId ? p.accent : `${p.muted}40`,
              transition: "all 0.2s",
            }} />
          ))
        ) : (
          <div style={{ fontSize: scales.fs(7), color: p.muted }}>Hover or select controls</div>
        )}
      </div>
    </div>
  );
}
