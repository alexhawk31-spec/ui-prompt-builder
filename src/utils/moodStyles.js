/**
 * Compute concrete style values from mood dimensions.
 * Returns null if no mood is set.
 * Preview components use these to scale padding, fonts, radius, etc.
 */
export function getMoodStyles(dims) {
  if (!dims) return null;

  const { density, typography, embellishment, interaction } = dims;

  // ── Density → scale factors (wide ranges for dramatic visual differences) ──
  const padScale = { spacious: 2.0, balanced: 1, compact: 0.5, dense: 0.25 }[density] || 1;
  const gapScale = { spacious: 1.8, balanced: 1, compact: 0.45, dense: 0.2 }[density] || 1;
  const fontScale = { spacious: 1.35, balanced: 1, compact: 0.78, dense: 0.62 }[density] || 1;

  // ── Typography ──
  const headFont = {
    clean: "'DM Sans',sans-serif",
    technical: "'JetBrains Mono',monospace",
    editorial: "Georgia,'Times New Roman',serif",
    rounded: "'Nunito','DM Sans',sans-serif",
  }[typography] || "'DM Sans',sans-serif";

  const bodyFont = {
    clean: "'DM Sans',sans-serif",
    technical: "'JetBrains Mono',monospace",
    editorial: "Georgia,'Times New Roman',serif",
    rounded: "'Nunito','DM Sans',sans-serif",
  }[typography] || "'DM Sans',sans-serif";

  const headWeight = { clean: 700, technical: 600, editorial: 400, rounded: 900 }[typography] || 700;

  // Label style — technical gets uppercase + wide spacing, editorial gets italic
  const labelTransform = { clean: "uppercase", technical: "uppercase", editorial: "none", rounded: "none" }[typography] || "uppercase";
  const labelSpacing = { clean: "0.04em", technical: "0.12em", editorial: "0.02em", rounded: "0" }[typography] || "0.04em";
  const headItalic = typography === "editorial";

  // ── Embellishment (dramatic range from brutally flat to lush) ──
  const radius = { none: 0, minimal: 3, moderate: 10, rich: 24 }[embellishment] ?? 10;
  const cardRadius = { none: 0, minimal: 2, moderate: 8, rich: 20 }[embellishment] ?? 8;

  const cardShadow = {
    none: "none",
    minimal: "0 1px 2px rgba(0,0,0,0.06)",
    moderate: "0 6px 24px rgba(0,0,0,0.18)",
    rich: "0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
  }[embellishment] || "none";

  const useBlur = embellishment === "moderate" || embellishment === "rich";
  const useGradient = embellishment === "rich";

  // Glass effect — moderate gets subtle glass, rich gets full glass
  const glassCard = embellishment === "moderate" || embellishment === "rich";
  // Glass transparency: moderate = barely translucent, rich = clearly frosted
  const glassAlpha = { none: "ff", minimal: "ff", moderate: "cc", rich: "55" }[embellishment] || "ff";
  // Backdrop blur: moderate = light, rich = heavy
  const glassBlur = { none: 0, minimal: 0, moderate: 6, rich: 16 }[embellishment] || 0;

  // Accent glow — moderate gets subtle, rich gets pronounced
  const accentGlow = embellishment === "moderate" || embellishment === "rich";
  const glowSize = { none: 0, minimal: 0, moderate: 8, rich: 18 }[embellishment] || 0;

  // Border weight — much more varied across levels
  const borderWeight = { none: 0, minimal: 0.5, moderate: 1.5, rich: 2 }[embellishment] ?? 1;
  const borderStyle = embellishment === "none" ? "none" : "solid";

  // ── Interaction ──
  const transition = {
    subtle: "all 0.5s ease",
    smooth: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    snappy: "all 0.12s ease-out",
    dramatic: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
  }[interaction] || "all 0.3s ease";

  return {
    padScale, gapScale, fontScale,
    headFont, bodyFont, headWeight,
    headItalic, labelTransform, labelSpacing,
    radius, cardRadius, cardShadow,
    useBlur, useGradient,
    glassCard, glassAlpha, glassBlur,
    accentGlow, glowSize,
    borderWeight, borderStyle,
    transition,
  };
}
