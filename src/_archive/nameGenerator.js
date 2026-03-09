const FALLBACK_NAMES = [
  { name: "Vibe Forge", vibe: "creative energy" },
  { name: "PixelCraft", vibe: "precision building" },
  { name: "LaunchPad", vibe: "ready for takeoff" },
  { name: "NeonFrame", vibe: "glowing structure" },
  { name: "BuildFlow", vibe: "smooth creation" },
];

/**
 * Generate app name suggestions using the Anthropic API.
 * Currently marked as "Coming Soon" — returns fallback names.
 */
export async function generateAppNames(appDescription) {
  if (!appDescription.trim()) return [];

  // Coming Soon: API integration
  // For now, return themed fallback names
  return FALLBACK_NAMES;
}
