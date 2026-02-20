/**
 * Shell color token system.
 * Every component reads its colors from here — no hardcoded values.
 *
 * Shell mode (light/dark) controls the app chrome.
 * Theme selection controls the user's output preview colors.
 * These are independent concepts.
 */
export function getShellColors(isLight) {
  if (isLight) {
    return {
      page: "#eef0f4",
      appBg: "#ffffff",
      panelBg: "rgba(230,232,242,0.95)",
      panelBorder: "rgba(0,0,0,0.12)",
      headerBg: "#ffffff",
      headerBorder: "rgba(0,0,0,0.08)",
      text: "#111827",
      muted: "rgba(17,24,39,0.78)",
      dim: "rgba(17,24,39,0.42)",
      termBg: "#eef0f6",
      termBorder: "rgba(67,56,202,0.2)",
      termBarBg: "rgba(67,56,202,0.06)",
      includedBg: "rgba(16,185,129,0.12)",
      includedColor: "#047857",
      navGrad: "linear-gradient(180deg,#4f46e5,#4338ca,#3730a3)",
    };
  }
  return {
    page: "#080b14",
    appBg: "#0e1118",
    panelBg: "rgba(28,32,52,0.7)",
    panelBorder: "rgba(255,255,255,0.08)",
    headerBg: "#0e1118",
    headerBorder: "rgba(255,255,255,0.04)",
    text: "#F0EDE6",
    muted: "rgba(240,237,230,0.72)",
    dim: "rgba(240,237,230,0.38)",
    termBg: "#1e2130",
    termBorder: "rgba(129,140,248,0.15)",
    termBarBg: "linear-gradient(180deg,rgba(129,140,248,0.06),rgba(129,140,248,0.02))",
    includedBg: "rgba(110,231,183,0.1)",
    includedColor: "#6ee7b7",
    navGrad: "linear-gradient(180deg,#4338ca,#3730a3,#312e81)",
  };
}
