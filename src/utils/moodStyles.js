/**
 * Compute concrete style values from mood dimensions.
 * Returns null if no mood is set.
 * Preview components use these to scale padding, fonts, radius, etc.
 */
export function getMoodStyles(dims) {
  if (!dims) return null;

  const { density, typography, embellishment, interaction } = dims;

  // ── Density → scale factors ──
  const padScale = { spacious: 1.5, balanced: 1, compact: 0.7, dense: 0.45 }[density] || 1;
  const gapScale = { spacious: 1.4, balanced: 1, compact: 0.6, dense: 0.35 }[density] || 1;
  const fontScale = { spacious: 1.15, balanced: 1, compact: 0.88, dense: 0.78 }[density] || 1;

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
    editorial: "'DM Sans',sans-serif",
    rounded: "'Nunito','DM Sans',sans-serif",
  }[typography] || "'DM Sans',sans-serif";

  const headWeight = { clean: 700, technical: 600, editorial: 400, rounded: 800 }[typography] || 700;

  // ── Embellishment ──
  const radius = { none: 0, minimal: 4, moderate: 10, rich: 16 }[embellishment] ?? 10;
  const cardRadius = { none: 0, minimal: 3, moderate: 8, rich: 14 }[embellishment] ?? 8;

  const cardShadow = {
    none: "none",
    minimal: "0 1px 3px rgba(0,0,0,0.08)",
    moderate: "0 4px 16px rgba(0,0,0,0.15)",
    rich: "0 8px 32px rgba(0,0,0,0.25)",
  }[embellishment] || "none";

  const useBlur = embellishment === "moderate" || embellishment === "rich";
  const useGradient = embellishment === "rich";

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
    radius, cardRadius, cardShadow,
    useBlur, useGradient,
    transition,
  };
}
