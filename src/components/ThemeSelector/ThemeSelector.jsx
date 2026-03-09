import { useEffect, useRef, useState, useCallback } from "react";
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

/* ── Inline color editor — click a swatch to edit its hex value ── */
function InlineColorEditor({ color, channel, onSave, onClose, shellColors }) {
  const [hex, setHex] = useState(color);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const wrapRef = useRef(null);
  const c = shellColors;

  useEffect(() => {
    inputRef.current?.select();
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const isValid = /^#[0-9a-fA-F]{3,8}$/.test(hex);

  const handleSubmit = () => {
    if (isValid) {
      onSave(hex.toLowerCase());
      onClose();
    }
  };

  return (
    <div ref={wrapRef} style={{
      position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
      marginTop: 6, zIndex: 50,
      background: c.panelBg, border: `1px solid ${c.panelBorder}`,
      borderRadius: 10, padding: 10, minWidth: 160,
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    }}>
      <div style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: c.muted, marginBottom: 6 }}>
        Edit {channel}
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div
          onClick={() => pickerRef.current?.click()}
          style={{
            width: 28, height: 28, borderRadius: 6,
            background: isValid ? hex : color,
            border: `2px solid ${c.panelBorder}`,
            cursor: "pointer", flexShrink: 0,
            position: "relative", overflow: "hidden",
          }}
        >
          <input
            ref={pickerRef}
            type="color"
            value={isValid ? hex : color}
            onChange={(e) => { setHex(e.target.value); onSave(e.target.value); }}
            style={{ position: "absolute", inset: -4, width: "calc(100% + 8px)", height: "calc(100% + 8px)", opacity: 0, cursor: "pointer" }}
          />
        </div>
        <input
          ref={inputRef}
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); if (e.key === "Escape") onClose(); }}
          spellCheck={false}
          style={{
            flex: 1, padding: "5px 8px", borderRadius: 6,
            border: `1px solid ${isValid ? c.panelBorder : "#f87171"}`,
            background: c.dim, color: c.text,
            fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            outline: "none", minWidth: 0,
          }}
        />
      </div>
      {!isValid && <div style={{ fontSize: 9, color: "#f87171", marginTop: 4 }}>Invalid hex</div>}
    </div>
  );
}

export default function ThemeSelector() {
  const theme = usePromptStore((s) => s.theme);
  const modeFilter = usePromptStore((s) => s.modeFilter);
  const customAccents = usePromptStore((s) => s.customAccents);
  const customColors = usePromptStore((s) => s.customColors);
  const setTheme = usePromptStore((s) => s.setTheme);
  const setModeFilter = usePromptStore((s) => s.setModeFilter);
  const setAccent = usePromptStore((s) => s.setAccent);
  const setCustomColor = usePromptStore((s) => s.setCustomColor);
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");
  const [editingChannel, setEditingChannel] = useState(null);
  const [pickerChannel, setPickerChannel] = useState("accent"); // "accent" or "secondary"

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
  const overrides = customColors[effectiveSelected] || {};
  const currentAccent = customAccents[effectiveSelected] || baseTheme?.preview.accent;
  // Build effective preview with all custom color overrides
  const effectivePreview = baseTheme ? { ...baseTheme.preview, ...overrides, accent: currentAccent } : null;

  const closeEditor = useCallback(() => setEditingChannel(null), []);

  // Reset editors when switching themes
  useEffect(() => { setEditingChannel(null); setPickerChannel("accent"); }, [effectiveSelected]);

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
        /* ══════ EXPANDED GRID — immersive palette cards ══════ */
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <AnimatePresence mode="popLayout">
            {filteredThemes.map((t) => {
              const co = customColors[t.id] || {};
              const accent = customAccents[t.id] || t.preview.accent;
              const secondary = co.secondary || t.preview.secondary || accent;
              const eBg = co.bg || t.preview.bg;
              const eCard = co.card || t.preview.card;
              const eText = co.text || t.preview.text;
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
                    borderRadius: 12,
                    border: `1.5px solid ${accent}30`,
                    background: eBg,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    overflow: "hidden",
                    textAlign: "left",
                    transition: "all 0.25s",
                    position: "relative",
                  }}
                >
                  {/* Ambient accent glow at top */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 40,
                    background: `linear-gradient(180deg, ${accent}18 0%, transparent 100%)`,
                    pointerEvents: "none",
                  }} />
                  {/* Card surface strip */}
                  <div style={{
                    margin: "10px 10px 0",
                    borderRadius: 6,
                    background: eCard,
                    padding: "8px 10px",
                    border: `1px solid ${eText}08`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: eText }}>
                        {t.name}
                      </div>
                      <div style={{ display: "flex", gap: 3 }}>
                        {[accent, secondary, eText].map((col, i) => (
                          <div key={i} style={{
                            width: i === 0 ? 10 : 7, height: i === 0 ? 10 : 7,
                            borderRadius: "50%", background: col,
                            border: `1px solid ${col}40`,
                            boxShadow: i === 0 ? `0 0 6px ${col}50` : "none",
                          }} />
                        ))}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 9, color: `${eText}90`, marginTop: 3,
                      lineHeight: 1.3,
                    }}>
                      {t.desc}
                    </div>
                  </div>
                  {/* Accent bar at bottom */}
                  <div style={{
                    margin: "8px 10px 10px", display: "flex", gap: 3,
                    borderRadius: 4, overflow: "hidden", height: 4,
                  }}>
                    <div style={{ flex: 3, background: accent, borderRadius: 4 }} />
                    <div style={{ flex: 2, background: secondary, borderRadius: 4, opacity: 0.7 }} />
                    <div style={{ flex: 1, background: eText, borderRadius: 4, opacity: 0.2 }} />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* ══════ CONDENSED — theme is selected ══════ */
        <>
          {/* Back to grid + selected name */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <button
              onClick={() => setTheme(null)}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                padding: "5px 10px", borderRadius: 8,
                border: `1px solid ${c.panelBorder}`,
                background: c.dim, color: c.muted,
                fontSize: 10, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              <Icon name="chevronLeft" size={10} color={c.muted} />
              All palettes
            </button>
            <div style={{ fontSize: 10, color: c.dim }}>|</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: c.text }}>
              {baseTheme?.name}
            </div>
          </div>
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
              const tco = customColors[t.id] || {};
              const accent = customAccents[t.id] || t.preview.accent;
              const sBg = tco.bg || t.preview.bg;
              const sCard = tco.card || t.preview.card;
              const sSec = tco.secondary || t.preview.secondary;
              const sText = tco.text || t.preview.text;
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
                    <div style={{ flex: 1, background: sBg }} />
                    <div style={{ flex: 1, background: sCard }} />
                    <div style={{ flex: 1, background: accent }} />
                    {sSec && <div style={{ flex: 1, background: sSec }} />}
                    <div style={{ flex: 1, background: sText }} />
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
                {/* Theme name + description */}
                <div style={{
                  borderRadius: 10, overflow: "hidden",
                  border: `1px solid ${effectivePreview.accent}25`,
                  marginBottom: 16,
                }}>
                  <ColorSwatch t={{ ...baseTheme, preview: effectivePreview }} accent={effectivePreview.accent} height={40} />
                  <div style={{
                    padding: "10px 12px",
                    background: c.dim,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>
                      {baseTheme.name}
                    </div>
                    <div style={{ fontSize: 10, color: c.muted, marginTop: 1 }}>
                      {baseTheme.desc}
                    </div>
                  </div>
                </div>

                {/* ── Editable color channels ── */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: effectivePreview.secondary ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
                  gap: 6, marginBottom: 16,
                }}>
                  {[
                    { label: "Background", channel: "bg", color: effectivePreview.bg },
                    { label: "Surface", channel: "card", color: effectivePreview.card },
                    { label: "Primary", channel: "accent", color: effectivePreview.accent },
                    ...(effectivePreview.secondary ? [{ label: "Secondary", channel: "secondary", color: effectivePreview.secondary }] : []),
                    { label: "Text", channel: "text", color: effectivePreview.text },
                  ].map((item) => {
                    const isEditing = editingChannel === item.channel;
                    return (
                      <div key={item.channel} style={{ position: "relative" }}>
                        <button
                          onClick={() => setEditingChannel(isEditing ? null : item.channel)}
                          style={{
                            width: "100%", padding: "8px 0", borderRadius: 8,
                            border: isEditing ? `2px solid ${c.text}` : `1.5px solid ${c.panelBorder}`,
                            background: isEditing ? `${item.color}12` : c.dim,
                            cursor: "pointer", fontFamily: "inherit",
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                            transition: "all 0.15s",
                          }}
                        >
                          <div style={{
                            width: 24, height: 24, borderRadius: 6,
                            background: item.color,
                            border: "1.5px solid rgba(128,128,128,0.2)",
                            boxShadow: `0 2px 6px ${item.color}30`,
                          }} />
                          <div style={{ fontSize: 9, fontWeight: 600, color: c.text, lineHeight: 1 }}>
                            {item.label}
                          </div>
                          <div style={{
                            fontSize: 8, fontFamily: "'JetBrains Mono', monospace",
                            color: c.muted, lineHeight: 1,
                          }}>
                            {item.color}
                          </div>
                        </button>
                        {isEditing && (
                          <InlineColorEditor
                            color={item.color}
                            channel={item.label}
                            onSave={(color) => setCustomColor(effectiveSelected, item.channel, color)}
                            onClose={closeEditor}
                            shellColors={c}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* CTA button demos */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{
                    padding: "8px 18px", borderRadius: 8, background: effectivePreview.accent,
                    color: effectivePreview.bg, fontSize: 11, fontWeight: 700,
                    boxShadow: `0 3px 12px ${effectivePreview.accent}30`,
                  }}>Primary CTA</div>
                  {effectivePreview.secondary && (
                    <div style={{
                      padding: "8px 18px", borderRadius: 8,
                      background: `${effectivePreview.secondary}20`,
                      border: `1px solid ${effectivePreview.secondary}40`,
                      color: effectivePreview.secondary,
                      fontSize: 11, fontWeight: 600,
                    }}>Secondary</div>
                  )}
                  <div style={{
                    padding: "8px 18px", borderRadius: 8, background: effectivePreview.card,
                    border: `1px solid ${effectivePreview.text}15`, color: effectivePreview.text,
                    fontSize: 11, fontWeight: 600,
                  }}>Tertiary</div>
                </div>

                {/* Accent picker with Primary / Secondary toggle */}
                {effectivePreview.secondary && (
                  <div style={{
                    display: "flex", gap: 4, marginBottom: -6,
                    borderBottom: `1px solid ${c.panelBorder}`, paddingBottom: 0,
                  }}>
                    {[
                      { id: "accent", label: "Primary", color: effectivePreview.accent },
                      { id: "secondary", label: "Secondary", color: effectivePreview.secondary },
                    ].map((tab) => {
                      const active = pickerChannel === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setPickerChannel(tab.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: 5,
                            padding: "6px 12px 8px",
                            border: "none",
                            borderBottom: active ? `2px solid ${tab.color}` : "2px solid transparent",
                            background: "transparent",
                            cursor: "pointer", fontFamily: "inherit",
                            transition: "all 0.15s",
                          }}
                        >
                          <div style={{
                            width: 10, height: 10, borderRadius: 3,
                            background: tab.color,
                            border: "1px solid rgba(128,128,128,0.2)",
                          }} />
                          <span style={{
                            fontSize: 10, fontWeight: active ? 700 : 500,
                            color: active ? c.text : c.muted,
                          }}>
                            {tab.label}
                          </span>
                        </button>
                      );
                    })}
                    <div style={{ flex: 1 }} />
                    <div style={{
                      fontSize: 8, color: c.muted, alignSelf: "center", paddingRight: 4,
                      fontStyle: "italic",
                    }}>
                      {pickerChannel === "accent" ? "CTAs, active states, key data" : "Charts, badges, subtle highlights"}
                    </div>
                  </div>
                )}
                <AccentColorPicker
                  options={baseTheme.accentOptions}
                  value={pickerChannel === "secondary" ? effectivePreview.secondary : effectivePreview.accent}
                  onChange={(color) => setCustomColor(effectiveSelected, pickerChannel, color)}
                  themeBg={effectivePreview.bg}
                  label={effectivePreview.secondary ? (pickerChannel === "accent" ? "Primary Color" : "Secondary Color") : undefined}
                />

              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <NextStepButton targetCategory="mood" label="Mood & Feel" />
    </>
  );
}
