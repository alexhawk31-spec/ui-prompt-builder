import { THEMES, AWS_GUIDELINES } from "../constants";
import { PURPOSE_PROMPT_DESC } from "../components/PurposeSelector/constants";
import { MOOD_PRESETS, MOOD_PROMPT_MAP } from "../components/MoodSelector/constants";
import { CARD_STYLES, CARD_FINE_TUNE_DIMS, CARD_PROMPT_MAP } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS, NAV_FINE_TUNE_DIMS, NAV_PROMPT_MAP } from "../components/NavigationSelector/constants";
import { BTN_STYLES, BTN_FINE_TUNE_DIMS, BTN_PROMPT_MAP } from "../components/ButtonSelector/constants";

/**
 * Generate the prompt snippet for a single category.
 * Returns empty string if that category isn't configured.
 */
export function generateCategorySnippet(config, categoryId) {
  const { configuredSections = [], selectedPurpose, theme, customAccents, modeFilter, moodPreset, moodDimensions, moodCustom, cardStyle, navStyle, buttonStyle, animation, customNotes, appName, appDescription, awsGuidelines } = config;

  // If configuredSections is populated, only include sections that are toggled on
  if (configuredSections.length > 0 && !configuredSections.includes(categoryId)) return "";

  switch (categoryId) {
    case "appType": {
      if (!selectedPurpose) return "";
      const desc = PURPOSE_PROMPT_DESC[selectedPurpose];
      return `${desc}\n`;
    }
    case "theme": {
      const mode = modeFilter || "dark";
      if (!theme) return `Use ${mode} mode.\n`;
      const t = THEMES.find((x) => x.id === theme);
      const accent = customAccents?.[theme] || t?.preview.accent;
      const sec = t?.preview.secondary ? `\n- Secondary accent: \`${t.preview.secondary}\` — supporting color for charts, badges, subtle highlights` : "";
      return `## Color Palette\n${t?.name} theme (${mode} mode) — ${t?.desc}.\n- Background: \`${t?.preview.bg}\`\n- Cards / surfaces: \`${t?.preview.card}\`\n- Primary accent: \`${accent}\` — use sparingly (CTAs, active states, key data)${sec}\n- Text: \`${t?.preview.text}\`\n`;
    }
    case "mood": {
      if (!moodDimensions) return "";
      const preset = MOOD_PRESETS.find((x) => x.id === moodPreset);
      let s = `## Mood & Feel\n`;
      if (preset && !moodCustom) s += `${preset.name} preset — ${preset.desc}.\n`;
      s += `- Density: ${MOOD_PROMPT_MAP.density[moodDimensions.density]}\n`;
      s += `- Typography: ${MOOD_PROMPT_MAP.typography[moodDimensions.typography]}\n`;
      s += `- Interaction: ${MOOD_PROMPT_MAP.interaction[moodDimensions.interaction]}\n`;
      s += `- Embellishment: ${MOOD_PROMPT_MAP.embellishment[moodDimensions.embellishment]}\n`;
      return s;
    }
    case "cards": {
      if (!cardStyle) return "";
      const style = CARD_STYLES.find((s) => s.id === cardStyle.styleId);
      if (!style) return "";
      let s = `## Card Style — ${style.label}\n${style.basePrompt}\n`;
      const ft = cardStyle.fineTune || {};
      for (const dimId of style.dims) {
        const optId = ft[dimId];
        if (optId && CARD_PROMPT_MAP[dimId]?.[optId]) {
          s += `- ${CARD_FINE_TUNE_DIMS[dimId].label}: ${CARD_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      return s;
    }
    case "data":
      return "";
    case "navigation": {
      if (!navStyle) return "";
      const np = NAV_PATTERNS.find((n) => n.id === navStyle.patternId);
      if (!np) return "";
      let s = `## Navigation — ${np.label}\n${np.basePrompt}\n`;
      const ft = navStyle.fineTune || {};
      for (const dimId of np.dims) {
        const optId = ft[dimId];
        if (optId && NAV_PROMPT_MAP[dimId]?.[optId]) {
          s += `- ${NAV_FINE_TUNE_DIMS[dimId].label}: ${NAV_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      return s;
    }
    case "buttons": {
      if (!buttonStyle) return "";
      const bs = BTN_STYLES.find((s) => s.id === buttonStyle.styleId);
      if (!bs) return "";
      let s = `## Button Style — ${bs.label}\n${bs.basePrompt}\n`;
      const ft = buttonStyle.fineTune || {};
      for (const dimId of bs.dims) {
        const optId = ft[dimId];
        if (optId && BTN_PROMPT_MAP[dimId]?.[optId]) {
          s += `- ${BTN_FINE_TUNE_DIMS[dimId].label}: ${BTN_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      return s;
    }
    case "animation": {
      if (!animation) return "";
      if (animation === "none") return `## Animation\nKeep the UI completely static — render all elements immediately.\n`;
      if (animation === "subtle") return `## Animation\nKeep motion minimal: soft opacity transitions (200-300ms ease) and gentle hover state changes. Elements appear instantly, only state changes animate.\n`;
      if (animation === "smooth") return `## Animation\nAdd polished transitions: fade-in on mount, slide-in for new content, smooth hover states. Use CSS transitions or Framer Motion. Keep durations under 400ms.\n`;
      if (animation === "dynamic") return `## Animation\nGo bold with motion: staggered entrance animations, hover scale effects, scroll-triggered reveals, and smooth page transitions. Use Framer Motion. Make the UI feel alive.\n`;
      return "";
    }
    case "appDescription": {
      if (!appDescription || !appDescription.trim()) return "";
      let s = "";
      if (appName) s += `"${appName}" — `;
      s += `${appDescription}\n`;
      return s;
    }
    case "awsGuidelines": {
      if (!awsGuidelines) return "";
      return `## AWS Branding\n- ${AWS_GUIDELINES.colors}\n- ${AWS_GUIDELINES.font}\n- ${AWS_GUIDELINES.spacing}\n- ${AWS_GUIDELINES.components}\n- ${AWS_GUIDELINES.patterns}\n- ${AWS_GUIDELINES.icons}\n`;
    }
    case "customNotes": {
      if (!customNotes || !customNotes.trim()) return "";
      return `## Notes\n${customNotes}\n`;
    }
    default:
      return "";
  }
}

export function generatePrompt(config) {
  const {
    configuredSections = [],
    selectedPurpose,
    theme,
    customAccents,
    modeFilter,
    moodPreset,
    moodDimensions,
    moodCustom,
    cardStyle,
    navStyle,
    buttonStyle,
    animation,
    customNotes,
    appName,
    appDescription,
    awsGuidelines,
  } = config;

  // Helper: check if a section is included in the prompt
  const included = (id) => configuredSections.length === 0 || configuredSections.includes(id);

  // ── Opener: short role + what to build ──
  let p = `Design this as a senior frontend engineer would`;
  if (appName && included("appDescription")) p += ` — build "${appName}"`;
  p += `. Write clean, production-ready React code with real attention to visual detail.\n\n`;

  // App description (inline, not labeled)
  if (appDescription && appDescription.trim() && included("appDescription")) {
    p += `${appDescription}\n\n`;
  }

  // ── App Purpose — inline the directive, not a labeled section ──
  if (selectedPurpose && included("appType")) {
    const desc = PURPOSE_PROMPT_DESC[selectedPurpose];
    p += `${desc}\n\n`;
  }

  // ── Color Palette — exact values, not narrative ──
  if (included("theme")) {
    const mode = modeFilter || "dark";
    if (theme) {
      const t = THEMES.find((x) => x.id === theme);
      const effectiveAccent = customAccents?.[theme] || t?.preview.accent;
      p += `## Color Palette\n`;
      p += `${t?.name} theme (${mode} mode) — ${t?.desc}.\n`;
      p += `- Background: \`${t?.preview.bg}\`\n`;
      p += `- Cards / surfaces: \`${t?.preview.card}\`\n`;
      p += `- Primary accent: \`${effectiveAccent}\` — use sparingly (CTAs, active states, key data)\n`;
      if (t?.preview.secondary) p += `- Secondary accent: \`${t.preview.secondary}\` — supporting color for charts, badges, subtle highlights\n`;
      p += `- Text: \`${t?.preview.text}\`\n\n`;
    } else if (configuredSections.includes("theme")) {
      p += `Use ${mode} mode.\n\n`;
    }
  }

  // ── Mood & Feel — 4-dimension system ──
  if (moodDimensions && included("mood")) {
    const preset = MOOD_PRESETS.find((x) => x.id === moodPreset);
    p += `## Mood & Feel\n`;
    if (preset && !moodCustom) p += `${preset.name} preset — ${preset.desc}.\n`;
    p += `- Density: ${MOOD_PROMPT_MAP.density[moodDimensions.density]}\n`;
    p += `- Typography: ${MOOD_PROMPT_MAP.typography[moodDimensions.typography]}\n`;
    p += `- Interaction: ${MOOD_PROMPT_MAP.interaction[moodDimensions.interaction]}\n`;
    p += `- Embellishment: ${MOOD_PROMPT_MAP.embellishment[moodDimensions.embellishment]}\n`;
    p += `\n`;
  }

  // ── Card Style ──
  if (cardStyle && included("cards")) {
    const style = CARD_STYLES.find((cs) => cs.id === cardStyle.styleId);
    if (style) {
      p += `## Card Style — ${style.label}\n`;
      p += `${style.basePrompt}\n`;
      const ft = cardStyle.fineTune || {};
      for (const dimId of style.dims) {
        const optId = ft[dimId];
        if (optId && CARD_PROMPT_MAP[dimId]?.[optId]) {
          p += `- ${CARD_FINE_TUNE_DIMS[dimId].label}: ${CARD_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      p += `\n`;
    }
  }

  // ── Navigation ──
  if (navStyle && included("navigation")) {
    const np = NAV_PATTERNS.find((n) => n.id === navStyle.patternId);
    if (np) {
      p += `## Navigation — ${np.label}\n`;
      p += `${np.basePrompt}\n`;
      const ft = navStyle.fineTune || {};
      for (const dimId of np.dims) {
        const optId = ft[dimId];
        if (optId && NAV_PROMPT_MAP[dimId]?.[optId]) {
          p += `- ${NAV_FINE_TUNE_DIMS[dimId].label}: ${NAV_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      p += `\n`;
    }
  }

  // ── Buttons ──
  if (buttonStyle && included("buttons")) {
    const bs = BTN_STYLES.find((b) => b.id === buttonStyle.styleId);
    if (bs) {
      p += `## Button Style — ${bs.label}\n`;
      p += `${bs.basePrompt}\n`;
      const ft = buttonStyle.fineTune || {};
      for (const dimId of bs.dims) {
        const optId = ft[dimId];
        if (optId && BTN_PROMPT_MAP[dimId]?.[optId]) {
          p += `- ${BTN_FINE_TUNE_DIMS[dimId].label}: ${BTN_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      p += `\n`;
    }
  }

  // ── Animation — specific implementation guidance ──
  if (animation && included("animation")) {
    p += `## Animation\n`;
    if (animation === "none") {
      p += `Keep the UI completely static — render all elements immediately.\n`;
    } else if (animation === "subtle") {
      p += `Keep motion minimal: soft opacity transitions (200-300ms ease) and gentle hover state changes. Elements appear instantly, only state changes animate.\n`;
    } else if (animation === "smooth") {
      p += `Add polished transitions: fade-in on mount, slide-in for new content, smooth hover states. Use CSS transitions or Framer Motion. Keep durations under 400ms.\n`;
    } else if (animation === "dynamic") {
      p += `Go bold with motion: staggered entrance animations, hover scale effects, scroll-triggered reveals, and smooth page transitions. Use Framer Motion. Make the UI feel alive.\n`;
    }
    p += `\n`;
  }

  // ── AWS Guidelines ──
  if (awsGuidelines && included("awsGuidelines")) {
    p += `## AWS Branding\n`;
    p += `- ${AWS_GUIDELINES.colors}\n`;
    p += `- ${AWS_GUIDELINES.font}\n`;
    p += `- ${AWS_GUIDELINES.spacing}\n`;
    p += `- ${AWS_GUIDELINES.components}\n`;
    p += `- ${AWS_GUIDELINES.patterns}\n`;
    p += `- ${AWS_GUIDELINES.icons}\n\n`;
  }

  // ── Style Rules — concrete, actionable (replaces "Design Principles") ──
  p += `## Style Rules\n`;
  p += `- Icons: use Lucide React exclusively\n`;
  p += `- Cards: use \`backdrop-filter: blur(12px)\` with semi-transparent backgrounds for depth\n`;
  p += `- Spacing: 16-24px padding inside cards, 12-16px gaps between elements\n`;
  p += `- Hierarchy: clear font-size contrast — headings 28-36px, body 14-16px, captions 11-12px\n`;
  p += `- Accent color only on: primary buttons, active nav, key metrics, links\n`;
  if (!awsGuidelines || !included("awsGuidelines")) {
    p += `- Font: choose a distinctive typeface like Geist, DM Sans, or Plus Jakarta Sans\n`;
  }

  // ── Custom notes ──
  if (customNotes && customNotes.trim() && included("customNotes")) {
    p += `\n## Notes\n${customNotes}\n`;
  }

  return p;
}
