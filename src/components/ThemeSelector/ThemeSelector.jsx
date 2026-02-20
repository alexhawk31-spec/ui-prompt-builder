import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { THEMES } from "../../constants/themes";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import AccentColorPicker from "./AccentColorPicker";
import NextStepButton from "../shared/NextStepButton";

/* ── Color swatch bar — shows palette colors as horizontal bands ── */
function ColorSwatch({ t, accent, height = 28 }) {
  const colors = [t.preview.bg, t.preview.card, accent];
  if (t.preview.secondary) colors.push(t.preview.secondary);
  colors.push(t.preview.text);

  return (
    <div style={{
      display: "flex", borderRadius: 6, overflow: "hidden",
      width: "100%", height,
      border: "1px solid rgba(128,128,128,0.15)",
    }}>
      {colors.map((col, i) => (
        <div key={i} style={{ flex: 1, background: col }} />
      ))}
    </div>
  );
}

export default function ThemeSelector() {
  const theme = usePromptStore((s) => s.theme);
  const modeFilter = usePromptStore((s) => s.modeFilter);
  const customAccents = usePromptStore((s) => s.customAccents);
  const setTheme = usePromptStore((s) => s.setTheme);
  const setModeFilter = usePromptStore((s) => s.setModeFilter);
  const setAccent = usePromptStore((s) => s.setAccent);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  const filteredThemes = THEMES.filter((t) => t.mode === modeFilter);
  const visibleIds = filteredThemes.map((t) => t.id);

  const effectiveSelected = theme === null
    ? null
    : visibleIds.includes(theme) ? theme : filteredThemes[0]?.id;
  useEffect(() => {
    if (effectiveSelected && effectiveSelected !== theme) {
      setTheme(effectiveSelected);
    }
  }, [effectiveSelected, theme, setTheme]);

  const hasSelection = effectiveSelected !== null;
  const baseTheme = THEMES.find((t) => t.id === effectiveSelected);
  const currentAccent = customAccents[effectiveSelected] || baseTheme?.preview.accent;

  const scrollRef = useRef(null);
  useEffect(() => {
    if (!scrollRef.current || !hasSelection) return;
    const active = scrollRef.current.querySelector("[data-active='true']");
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [effectiveSelected, hasSelection]);

  return (
    <>
      {/* Dark / Light toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          display: "inline-flex", borderRadius: 10, overflow: "hidden", flexShrink: 0,
          border: `1px solid ${c.panelBorder}`, background: c.dim,
        }}>
          {[
            { mode: "dark", label: "Dark", icon: "moon" },
            { mode: "light", label: "Light", icon: "sun" },
          ].map(({ mode, label, icon }) => (
            <button key={mode} onClick={() => setModeFilter(mode)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
              border: "none", cursor: "pointer",
              background: modeFilter === mode ? c.panelBg : "transparent",
              color: modeFilter === mode ? c.text : c.muted,
              fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              borderRight: mode === "dark" ? `1px solid ${c.panelBorder}` : "none",
              transition: "all 0.2s",
              borderRadius: modeFilter === mode ? 8 : 0,
            }}>
              <Icon name={icon} size={13} color={modeFilter === mode ? c.text : c.muted} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {!hasSelection ? (
        /* ══════ EXPANDED GRID — no theme selected yet ══════ */
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <AnimatePresence mode="popLayout">
            {filteredThemes.map((t) => {
              const accent = customAccents[t.id] || t.preview.accent;
              return (
                <motion.button
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setTheme(t.id)}
                  style={{
                    width: "calc(33.333% - 6px)",
                    padding: 0,
                    borderRadius: 10,
                    border: `1px solid ${c.panelBorder}`,
                    background: c.dim,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    overflow: "hidden",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Color swatch */}
                  <div style={{ padding: "8px 8px 0" }}>
                    <ColorSwatch t={t} accent={accent} height={28} />
                  </div>
                  {/* Label */}
                  <div style={{ padding: "8px 10px 10px" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: c.text }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 9, color: c.muted, marginTop: 1, lineHeight: 1.3 }}>
                      {t.desc}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* ══════ CONDENSED — theme is selected ══════ */
        <>
          {/* Scrollable theme strip */}
          <div
            ref={scrollRef}
            style={{
              display: "flex", gap: 6, overflowX: "auto",
              paddingBottom: 6, marginBottom: 16,
              scrollbarWidth: "thin",
            }}
          >
            {filteredThemes.map((t) => {
              const isActive = effectiveSelected === t.id;
              const accent = customAccents[t.id] || t.preview.accent;
              return (
                <button
                  key={t.id}
                  data-active={isActive}
                  onClick={() => setTheme(t.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "6px 12px 6px 7px",
                    borderRadius: 999,
                    border: isActive
                      ? `2px solid ${accent}`
                      : `1.5px solid ${c.panelBorder}`,
                    background: isActive ? `${accent}12` : c.dim,
                    boxShadow: isActive ? `0 2px 8px ${accent}25` : "none",
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    display: "flex", borderRadius: 3, overflow: "hidden",
                    width: 28, height: 12, flexShrink: 0,
                    border: `1px solid ${c.panelBorder}`,
                  }}>
                    <div style={{ flex: 1, background: t.preview.bg }} />
                    <div style={{ flex: 1, background: t.preview.card }} />
                    <div style={{ flex: 1, background: accent }} />
                    {t.preview.secondary && <div style={{ flex: 1, background: t.preview.secondary }} />}
                    <div style={{ flex: 1, background: t.preview.text }} />
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: isActive ? 600 : 500,
                    color: isActive ? c.text : c.muted,
                    whiteSpace: "nowrap",
                  }}>
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected theme detail */}
          <AnimatePresence mode="wait">
            {baseTheme && (
              <motion.div
                key={effectiveSelected}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {/* Large color swatch with theme info */}
                <div style={{
                  borderRadius: 10, overflow: "hidden",
                  border: `1px solid ${currentAccent}25`,
                  marginBottom: 16,
                }}>
                  <ColorSwatch t={baseTheme} accent={currentAccent} height={40} />
                  <div style={{
                    padding: "10px 12px",
                    background: c.dim,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>
                        {baseTheme.name}
                      </div>
                      <div style={{ fontSize: 10, color: c.muted, marginTop: 1 }}>
                        {baseTheme.desc}
                      </div>
                    </div>
                    {/* Color dots with labels */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {[
                        { label: "bg", color: baseTheme.preview.bg },
                        { label: "card", color: baseTheme.preview.card },
                        { label: "accent", color: currentAccent },
                        ...(baseTheme.preview.secondary ? [{ label: "2nd", color: baseTheme.preview.secondary }] : []),
                        { label: "text", color: baseTheme.preview.text },
                      ].map((item) => (
                        <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <div style={{
                            width: 16, height: 16, borderRadius: 4,
                            background: item.color, border: "1.5px solid rgba(128,128,128,0.2)",
                          }} />
                          <span style={{ fontSize: 7, color: c.muted, fontWeight: 600, textTransform: "uppercase" }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA button demos */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{
                    padding: "8px 18px", borderRadius: 8, background: currentAccent,
                    color: baseTheme.preview.bg, fontSize: 11, fontWeight: 700,
                    boxShadow: `0 3px 12px ${currentAccent}30`,
                  }}>Primary CTA</div>
                  {baseTheme.preview.secondary && (
                    <div style={{
                      padding: "8px 18px", borderRadius: 8,
                      background: `${baseTheme.preview.secondary}20`,
                      border: `1px solid ${baseTheme.preview.secondary}40`,
                      color: baseTheme.preview.secondary,
                      fontSize: 11, fontWeight: 600,
                    }}>Secondary</div>
                  )}
                  <div style={{
                    padding: "8px 18px", borderRadius: 8, background: baseTheme.preview.card,
                    border: `1px solid ${baseTheme.preview.text}15`, color: baseTheme.preview.text,
                    fontSize: 11, fontWeight: 600,
                  }}>Tertiary</div>
                </div>

                {/* Accent picker */}
                <AccentColorPicker
                  options={baseTheme.accentOptions}
                  value={currentAccent}
                  onChange={(color) => setAccent(effectiveSelected, color)}
                  themeBg={baseTheme.preview.bg}
                />

                {/* Hex readout */}
                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 14, marginTop: 14, paddingTop: 14,
                  borderTop: `1px solid ${c.panelBorder}`,
                }}>
                  {Object.entries({ ...baseTheme.preview, accent: currentAccent }).map(([key, color]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: 4, background: color,
                        border: "1px solid rgba(128,128,128,0.2)",
                      }} />
                      <div>
                        <div style={{
                          fontSize: 8, textTransform: "uppercase", fontWeight: 700,
                          letterSpacing: "0.08em", color: c.muted,
                        }}>{key}</div>
                        <div style={{
                          fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                          color: c.text,
                        }}>{color}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <NextStepButton targetCategory="mood" label="Mood & Feel" />
    </>
  );
}
