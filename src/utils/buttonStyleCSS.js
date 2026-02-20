import { resolveAccent } from "./accentUtils";

/**
 * Converts a buttonStyle selection into concrete CSS properties
 * for primary, secondary, and tertiary button tiers.
 *
 * Returns null if no button style is selected.
 * Returns { primary: {…}, secondary: {…}, tertiary: {…} } when active.
 */
export function getButtonStyleCSS(buttonStyle, p) {
  if (!buttonStyle) return null;

  const ft = buttonStyle.fineTune || {};
  const accent = resolveAccent(p.accent, ft.accent);

  // Shared computed values
  const cornerMap = { sharp: 0, slight: 4, rounded: 8, soft: 12, pill: 9999 };
  const weightMap = { regular: 400, semibold: 600, bold: 700, heavy: 800 };
  const fontWeight = weightMap[ft.labelWeight] ?? 600;

  const shadowMap = {
    none: "none",
    subtle: "0 1px 3px rgba(0,0,0,0.12)",
    accentGlow: `0 2px 12px ${accent}40`,
    hardOffset: `3px 3px 0 ${accent}`,
  };
  const boxShadow = shadowMap[ft.shadow] ?? "none";

  // Style-specific corner overrides
  let borderRadius;
  if (buttonStyle.styleId === "slab") {
    borderRadius = 0;
  } else if (buttonStyle.styleId === "capsule") {
    borderRadius = 9999;
  } else {
    borderRadius = cornerMap[ft.corners] ?? 8;
  }

  const shared = { borderRadius, fontWeight, transition: "all 0.15s" };

  switch (buttonStyle.styleId) {
    case "stamp":
      return {
        primary: { ...shared, background: accent, color: "#fff", border: "none", boxShadow },
        secondary: { ...shared, background: "transparent", color: accent, border: `1px solid ${accent}`, boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "traced":
      return {
        primary: { ...shared, background: "transparent", color: accent, border: `1.5px solid ${accent}`, boxShadow },
        secondary: { ...shared, background: "transparent", color: `${accent}99`, border: `1px solid ${accent}40`, boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "wash":
      return {
        primary: { ...shared, background: `${accent}22`, color: accent, border: "none", boxShadow },
        secondary: { ...shared, background: `${accent}10`, color: `${accent}cc`, border: "none", boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "ombre":
      return {
        primary: { ...shared, background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: "#fff", border: "none", boxShadow },
        secondary: { ...shared, background: `${accent}15`, color: accent, border: "none", boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "neon":
      return {
        primary: { ...shared, background: `${accent}08`, color: accent, border: `1px solid ${accent}`, boxShadow: `0 0 8px ${accent}40` },
        secondary: { ...shared, background: "transparent", color: accent, border: `1px solid ${accent}50`, boxShadow: `0 0 4px ${accent}20` },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "slab":
      return {
        primary: { ...shared, background: accent, color: "#fff", border: `2px solid ${p.text || "#fff"}`, boxShadow, textTransform: "uppercase", letterSpacing: "0.05em" },
        secondary: { ...shared, background: "transparent", color: accent, border: `2px solid ${accent}`, boxShadow, textTransform: "uppercase", letterSpacing: "0.05em" },
        tertiary: { ...shared, background: "transparent", color: p.text, border: "none", boxShadow: "none", textTransform: "uppercase", letterSpacing: "0.05em" },
      };

    case "capsule":
      return {
        primary: { ...shared, background: accent, color: "#fff", border: "none", boxShadow },
        secondary: { ...shared, background: `${accent}15`, color: accent, border: "none", boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    case "toggle":
      return {
        primary: { ...shared, background: accent, color: "#fff", border: "none", boxShadow },
        secondary: { ...shared, background: `${accent}10`, color: p.muted, border: "none", boxShadow: "none" },
        tertiary: { ...shared, background: "transparent", color: accent, border: "none", boxShadow: "none" },
      };

    default:
      return null;
  }
}
