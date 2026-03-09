/**
 * Converts a dataStyle selection into concrete CSS properties
 * for table headers, rows, dividers, and numbers in preview.
 *
 * Returns null if no data style is selected.
 */
export function getDataStyleCSS(dataStyle, p) {
  if (!dataStyle) return null;

  const ft = dataStyle.fineTune || {};

  // Row density → padding
  const rowPadMap = { compact: "3px 10px", standard: "6px 10px", spacious: "10px 12px", expansive: "16px 14px" };
  const rowPad = rowPadMap[ft.rowDensity] || "6px 10px";

  // Header style
  const headerBase = { padding: rowPad, fontSize: "inherit" };
  const headerMap = {
    subtle: { ...headerBase, fontWeight: 500, color: p.dim, borderBottom: `1px solid ${p.border}`, background: "transparent", textTransform: "none" },
    bold: { ...headerBase, fontWeight: 800, color: p.text, borderBottom: `2px solid ${p.border}`, background: "transparent", textTransform: "uppercase", letterSpacing: "0.05em" },
    sticky: { ...headerBase, fontWeight: 600, color: p.text, borderBottom: `1px solid ${p.border}`, background: `${p.surface}ee`, backdropFilter: "blur(8px)" },
    colored: { ...headerBase, fontWeight: 700, color: p.accent, borderBottom: `1px solid ${p.accent}30`, background: `${p.accent}10` },
  };
  const header = headerMap[ft.headerStyle] || headerMap.subtle;

  // Dividers
  const dividerMap = {
    none: "none",
    hairline: `1px solid ${p.text}0a`,
    solid: `1px solid ${p.text}25`,
    zebra: "none",
  };
  const divider = dividerMap[ft.dividers] || `1px solid ${p.text}0a`;
  const zebraStripe = ft.dividers === "zebra";

  // Number style
  const numberMap = {
    proportional: { fontFamily: "inherit", fontWeight: "inherit", color: p.muted },
    tabularMono: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: p.muted },
    highlighted: { fontFamily: "inherit", fontWeight: 700, color: p.text },
    colorCoded: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: p.accent },
  };
  const number = numberMap[ft.numberStyle] || numberMap.proportional;

  return {
    rowPad,
    header,
    divider,
    zebraStripe,
    zebraBg: `${p.text}05`,
    number,
  };
}
