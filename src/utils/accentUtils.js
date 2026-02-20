/**
 * Shared accent color utilities for fine-tune overrides.
 */

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s, l };
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * Math.max(0, Math.min(1, color))).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Apply the accent fine-tune override to the base accent color.
 * Returns the original accent if override is "theme" or absent.
 */
export function resolveAccent(baseAccent, accentOverride) {
  if (!accentOverride || accentOverride === "theme") return baseAccent;
  try {
    const { r, g, b } = hexToRgb(baseAccent);
    const { h, s, l } = rgbToHsl(r, g, b);
    switch (accentOverride) {
      case "warm": return hslToHex(h + 25, s, l);
      case "cool": return hslToHex(h - 25, s, l);
      case "muted": return hslToHex(h, s * 0.6, l);
      case "complementary": return hslToHex(h + 180, s, l);
      default: return baseAccent;
    }
  } catch {
    return baseAccent;
  }
}
