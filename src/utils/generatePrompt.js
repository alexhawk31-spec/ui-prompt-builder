import { THEMES } from "../constants";
import { PROJECT_TYPES } from "../components/ProjectPicker/constants";
import { MOOD_PRESETS, MOOD_PROMPT_MAP } from "../components/MoodSelector/constants";
import { CARD_STYLES, CARD_FINE_TUNE_DIMS, CARD_PROMPT_MAP } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS, NAV_FINE_TUNE_DIMS, NAV_PROMPT_MAP } from "../components/NavigationSelector/constants";
import { BTN_STYLES, BTN_FINE_TUNE_DIMS, BTN_PROMPT_MAP } from "../components/ButtonSelector/constants";
import { DATA_STYLES, DATA_FINE_TUNE_DIMS, DATA_PROMPT_MAP } from "../components/DataDisplaySelector/constants";
import { SLIDE_LAYOUT_PROMPT_MAP } from "../components/SlideLayoutSelector/constants";
import {
  PRESENTATION_CARD_PROMPT_MAP,
  ONE_PAGER_CARD_PROMPT_MAP,
  PRESENTATION_DATA_PROMPT_MAP,
  ONE_PAGER_DATA_PROMPT_MAP,
  PRESENTATION_NAV_PROMPT_MAP,
  ONE_PAGER_NAV_PROMPT_MAP,
  PRESENTATION_ANIMATION_PROMPT_MAP,
} from "../constants/modeOptions";

/**
 * Generate the prompt snippet for a single category.
 * Returns empty string if that category isn't configured.
 */
export function generateCategorySnippet(config, categoryId) {
  const { configuredSections = [], selectedPurpose, theme, customAccents, customColors, modeFilter, moodPreset, moodDimensions, moodCustom, slideLayouts, cardStyle, dataStyle, navStyle, navSelections, buttonStyle, animation, faviconDesc, outputType, outputPurpose, buildMode, appStarterEnabled } = config;

  // If configuredSections is populated, only include sections that are toggled on
  if (configuredSections.length > 0 && !configuredSections.includes(categoryId)) return "";

  switch (categoryId) {
    case "appType": {
      // New output type system — project context is folded into the opener in generatePrompt()
      if (outputType) return "";
      // Legacy fallback
      if (!selectedPurpose) return "";
      const pt = PROJECT_TYPES.find((x) => x.id === selectedPurpose);
      if (!pt) return "";
      let s = `## Project Type — ${pt.name}\n${pt.promptContext}\n`;
      if (faviconDesc) s += `- Favicon / App Icon: ${faviconDesc}\n`;
      return s;
    }
    case "theme": {
      const mode = modeFilter || "dark";
      if (!theme) return `Use ${mode} mode.\n`;
      const t = THEMES.find((x) => x.id === theme);
      const co = customColors?.[theme] || {};
      const accent = customAccents?.[theme] || t?.preview.accent;
      const bg = co.bg || t?.preview.bg;
      const card = co.card || t?.preview.card;
      const text = co.text || t?.preview.text;
      const sec = (co.secondary || t?.preview.secondary);
      const secLine = sec ? `\n- Secondary accent: \`${sec}\` — supporting color for charts, badges, subtle highlights` : "";
      return `## Color Palette\n${t?.name} theme (${mode} mode) — ${t?.desc}.\n- Background: \`${bg}\`\n- Cards / surfaces: \`${card}\`\n- Primary accent: \`${accent}\` — use sparingly (CTAs, active states, key data)${secLine}\n- Text: \`${text}\`\n`;
    }
    case "mood": {
      if (!moodDimensions) return "";
      const preset = MOOD_PRESETS.find((x) => x.id === moodPreset);
      let s = `## Mood & Feel\n`;
      if (preset && !moodCustom) s += `${preset.name} — ${preset.promptText}\n`;
      s += `- Density: ${MOOD_PROMPT_MAP.density[moodDimensions.density]}\n`;
      s += `- Typography: ${MOOD_PROMPT_MAP.typography[moodDimensions.typography]}\n`;
      s += `- Interaction: ${MOOD_PROMPT_MAP.interaction[moodDimensions.interaction]}\n`;
      s += `- Embellishment: ${MOOD_PROMPT_MAP.embellishment[moodDimensions.embellishment]}\n`;
      return s;
    }
    case "layouts": {
      if (!slideLayouts || slideLayouts.length === 0) return "";
      let s = `## Slide Layouts\nInclude the following slide types in this deck. Choose which content goes on which slide type based on the material provided:\n`;
      for (const id of slideLayouts) {
        if (SLIDE_LAYOUT_PROMPT_MAP[id]) s += `${SLIDE_LAYOUT_PROMPT_MAP[id]}\n`;
      }
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
    case "data": {
      if (!dataStyle) return "";
      if (outputType === "presentation" || outputType === "one-pager") {
        return _generateModeData(outputType, dataStyle);
      }
      const ds = DATA_STYLES.find((s) => s.id === dataStyle.styleId);
      if (!ds) return "";
      let s = `## Data Display — ${ds.label}\n${ds.basePrompt}\n`;
      const ft = dataStyle.fineTune || {};
      for (const dimId of ds.dims) {
        const optId = ft[dimId];
        if (optId && DATA_PROMPT_MAP[dimId]?.[optId]) {
          s += `- ${DATA_FINE_TUNE_DIMS[dimId].label}: ${DATA_PROMPT_MAP[dimId][optId]}\n`;
        }
      }
      return s;
    }
    case "navigation": {
      // Presentation / One Pager: multi-select
      if ((outputType === "presentation" || outputType === "one-pager") && navSelections?.length > 0) {
        return _generateModeNav(outputType, navSelections);
      }
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
      if (outputType === "presentation") {
        return _generateModeAnimation(animation);
      }
      if (animation === "none") return `## Animation\nKeep the UI completely static — render all elements immediately.\n`;
      if (animation === "subtle") return `## Animation\nKeep motion minimal: soft opacity transitions (200-300ms ease) and gentle hover state changes. Elements appear instantly, only state changes animate.\n`;
      if (animation === "smooth") return `## Animation\nAdd polished transitions: fade-in on mount, slide-in for new content, smooth hover states. Use CSS transitions or Framer Motion. Keep durations under 400ms.\n`;
      if (animation === "dynamic") return `## Animation\nGo bold with motion: staggered entrance animations, hover scale effects, scroll-triggered reveals, and smooth page transitions. Use Framer Motion. Make the UI feel alive.\n`;
      return "";
    }
    default:
      return "";
  }
}

// ── Technical block for Presentation / One Pager ──
function _generateTechnicalBlock(config) {
  const { outputType, buildMode } = config;
  let s = `## Technical Requirements\n`;

  if (outputType === "presentation") {
    s += `- Format: Single self-contained HTML file — all CSS, JS, and Google Font imports inline. No external dependencies.\n`;
    s += `- Viewport: Full viewport slides — 100vw x 100vh.\n`;
    s += `- Output: Return only raw HTML starting with <!DOCTYPE html>. No explanation, no markdown.\n`;
    s += `- Print: Include @media print styles so the deck works when saved as PDF.\n`;
    if (buildMode === "new-build") {
      s += `- Content: Turn the content I give you into a complete deck — one idea per slide, 5-10 slides depending on content.\n`;
    } else {
      s += `- Content: Keep all existing content intact — redesign the visuals, not the substance.\n`;
    }
  } else if (outputType === "one-pager") {
    s += `- Format: Single self-contained HTML file — all CSS and JS inline. No external dependencies.\n`;
    s += `- Viewport: Single scrollable page — not slides. Condensed and scannable at screen width.\n`;
    s += `- Output: Return only raw HTML starting with <!DOCTYPE html>. No explanation, no markdown.\n`;
    s += `- Print: Include @media print styles so it works when saved as PDF.\n`;
    s += `- Density: Condensed. If content is short, keep it tight — do not pad or stretch. Every element should earn its space.\n`;
    if (buildMode === "new-build") {
      s += `- Content: Turn the content I give you into a polished one-pager.\n`;
    } else {
      s += `- Content: Keep all existing content intact — redesign the layout and visuals, not the substance.\n`;
    }
  }

  return s;
}

function _generateModeCards(outputType, cardStyle) {
  const ids = cardStyle.styleId?.split(",").filter(Boolean) || [];
  if (ids.length === 0) return "";
  const promptMap = outputType === "presentation" ? PRESENTATION_CARD_PROMPT_MAP : ONE_PAGER_CARD_PROMPT_MAP;
  const heading = outputType === "presentation" ? "Slide Types" : "Content Blocks";
  let s = `## ${heading}\n`;
  for (const id of ids) {
    if (promptMap[id]) s += `${promptMap[id]}\n`;
  }
  return s;
}

function _generateModeData(outputType, dataStyle) {
  const ids = dataStyle.styleId?.split(",").filter(Boolean) || [];
  if (ids.length === 0) return "";
  const promptMap = outputType === "presentation" ? PRESENTATION_DATA_PROMPT_MAP : ONE_PAGER_DATA_PROMPT_MAP;
  const heading = outputType === "presentation" ? "Data Visualizations" : "Data Elements";
  let s = `## ${heading}\n`;
  for (const id of ids) {
    if (promptMap[id]) s += `${promptMap[id]}\n`;
  }
  return s;
}

function _generateModeNav(outputType, navSelections) {
  if (!navSelections || navSelections.length === 0) return "";
  const promptMap = outputType === "presentation" ? PRESENTATION_NAV_PROMPT_MAP : ONE_PAGER_NAV_PROMPT_MAP;
  let s = `## Navigation\n`;
  for (const id of navSelections) {
    if (promptMap[id]) s += `- ${promptMap[id]}\n`;
  }
  return s;
}

function _generateModeAnimation(animation) {
  if (!animation) return "";
  const ids = animation.split(",").filter(Boolean);
  if (ids.length === 0) return "";
  let s = `## Animation\n`;
  for (const id of ids) {
    if (PRESENTATION_ANIMATION_PROMPT_MAP[id]) s += `${PRESENTATION_ANIMATION_PROMPT_MAP[id]}\n`;
  }
  return s;
}

export function generatePrompt(config) {
  const {
    configuredSections = [],
    selectedPurpose,
    theme,
    customAccents,
    customColors,
    modeFilter,
    moodPreset,
    moodDimensions,
    moodCustom,
    cardStyle,
    dataStyle,
    navStyle,
    navSelections,
    buttonStyle,
    animation,
    faviconDesc,
    outputType,
    outputPurpose,
    buildMode,
    appStarterEnabled,
  } = config;

  // Helper: check if a section is included in the prompt
  const included = (id) => configuredSections.length === 0 || configuredSections.includes(id);

  let p = "";

  // ── Opener ──
  if (outputType === "app" || !outputType) {
    if (appStarterEnabled) {
      p += `I would like to make [idea]. Build this as a Vite, React, JavaScript, and Framer Motion app. As a principal engineer, create feature component folders with constant files and sub-components, a store folder for Zustand, and a services folder for API calls. Keep code clean and components relatively small. Create the basic app structure and one feature folder to start. Fill out the README with a feature list and future directory structure. Ask all your questions in a single list before starting — once I respond, proceed without further interruption.\n\n`;
    } else {
      p += `Design this as a senior frontend engineer would. Write clean, production-ready React code with real attention to visual detail.\n\n`;
    }

    // Legacy project type
    if (!outputType && selectedPurpose && included("appType")) {
      const pt = PROJECT_TYPES.find((x) => x.id === selectedPurpose);
      if (pt) {
        p += `## Project Type — ${pt.name}\n`;
        p += `${pt.promptContext}\n\n`;
      }
    }
  } else if (outputType === "presentation") {
    if (buildMode === "new-build") {
      p += `I want to create a presentation. Respond to me with: "Love what you've designed with Pintuck! Paste in your content, notes, or outline — or just describe what you want to cover — and I'll take the look and feel you've crafted and build it." Once I respond, create a single self-contained HTML file as a polished slide deck. Design it as a senior frontend engineer would — production-quality, with real attention to visual detail.\n\n`;
    } else {
      p += `I want to upgrade the look and feel of the presentation we've been building together. Apply the design direction below to create a polished slide deck — keep all the content but redesign the visuals, layout, and structure to match. Each slide should be full viewport (100vw x 100vh), with clear visual hierarchy and professional typography. Design it as a senior frontend engineer would — production-quality, with real attention to visual detail.\n\n`;
    }
    p += _generateTechnicalBlock(config);
    p += `\n`;
  } else if (outputType === "one-pager") {
    if (buildMode === "new-build") {
      p += `I want to create a one-pager. Respond to me with: "Love what you've designed with Pintuck! Paste in your content, notes, or key points — or just describe what you need — and I'll take the look and feel you've crafted and build it." Once I respond, create a single self-contained HTML file as a polished one-pager. Design it as a senior frontend engineer would — clean, professional, with real attention to visual detail.\n\n`;
    } else {
      p += `I want to upgrade the look and feel of the one-pager we've been building together. Apply the design direction below to create a polished, scannable single-page document — keep all the content but redesign the layout, typography, and visuals to match. Every element should earn its space. Design it as a senior frontend engineer would — clean, professional, with real attention to visual detail.\n\n`;
    }
    p += _generateTechnicalBlock(config);
    p += `\n`;
  }

  // ── Color Palette ──
  if (included("theme")) {
    const mode = modeFilter || "dark";
    if (theme) {
      const t = THEMES.find((x) => x.id === theme);
      const co = customColors?.[theme] || {};
      const effectiveAccent = customAccents?.[theme] || t?.preview.accent;
      const eBg = co.bg || t?.preview.bg;
      const eCard = co.card || t?.preview.card;
      const eText = co.text || t?.preview.text;
      const eSec = co.secondary || t?.preview.secondary;
      p += `## Color Palette\n`;
      p += `${t?.name} theme (${mode} mode) — ${t?.desc}.\n`;
      p += `- Background: \`${eBg}\`\n`;
      p += `- Cards / surfaces: \`${eCard}\`\n`;
      p += `- Primary accent: \`${effectiveAccent}\` — use sparingly (CTAs, active states, key data)\n`;
      if (eSec) p += `- Secondary accent: \`${eSec}\` — supporting color for charts, badges, subtle highlights\n`;
      p += `- Text: \`${eText}\`\n\n`;
    } else if (configuredSections.includes("theme")) {
      p += `Use ${mode} mode.\n\n`;
    }
  }

  // ── Mood & Feel ──
  if (moodDimensions && included("mood")) {
    const preset = MOOD_PRESETS.find((x) => x.id === moodPreset);
    p += `## Mood & Feel\n`;
    if (preset && !moodCustom) p += `${preset.name} — ${preset.promptText}\n`;
    p += `- Density: ${MOOD_PROMPT_MAP.density[moodDimensions.density]}\n`;
    p += `- Typography: ${MOOD_PROMPT_MAP.typography[moodDimensions.typography]}\n`;
    p += `- Interaction: ${MOOD_PROMPT_MAP.interaction[moodDimensions.interaction]}\n`;
    p += `- Embellishment: ${MOOD_PROMPT_MAP.embellishment[moodDimensions.embellishment]}\n`;
    p += `\n`;
  }

  // ── Slide Layouts (Presentation only) ──
  if (config.slideLayouts?.length > 0 && included("layouts")) {
    p += `## Slide Layouts\nInclude the following slide types in this deck. Choose which content goes on which slide type based on the material provided:\n`;
    for (const id of config.slideLayouts) {
      if (SLIDE_LAYOUT_PROMPT_MAP[id]) p += `${SLIDE_LAYOUT_PROMPT_MAP[id]}\n`;
    }
    p += `\n`;
  }

  // ── Cards (App / One Pager) ──
  if (cardStyle && included("cards")) {
    if (outputType === "one-pager") {
      const snippet = _generateModeCards(outputType, cardStyle);
      if (snippet) p += snippet + `\n`;
    } else if (!outputType || outputType === "app") {
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
  }

  // ── Data Display ──
  if (dataStyle && included("data")) {
    if (outputType === "presentation" || outputType === "one-pager") {
      const snippet = _generateModeData(outputType, dataStyle);
      if (snippet) p += snippet + `\n`;
    } else {
      const ds = DATA_STYLES.find((d) => d.id === dataStyle.styleId);
      if (ds) {
        p += `## Data Display — ${ds.label}\n`;
        p += `${ds.basePrompt}\n`;
        const ft = dataStyle.fineTune || {};
        for (const dimId of ds.dims) {
          const optId = ft[dimId];
          if (optId && DATA_PROMPT_MAP[dimId]?.[optId]) {
            p += `- ${DATA_FINE_TUNE_DIMS[dimId].label}: ${DATA_PROMPT_MAP[dimId][optId]}\n`;
          }
        }
        p += `\n`;
      }
    }
  }

  // ── Navigation ──
  if (included("navigation")) {
    if ((outputType === "presentation" || outputType === "one-pager") && navSelections?.length > 0) {
      p += _generateModeNav(outputType, navSelections) + `\n`;
    } else if (navStyle) {
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
  }

  // ── Buttons (App only) ──
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

  // ── Animation ──
  if (animation && included("animation")) {
    if (outputType === "presentation") {
      p += _generateModeAnimation(animation) + `\n`;
    } else {
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
  }

  // ── Style Rules ──
  p += `## Style Rules\n`;
  p += `- No emojis — use icons instead (Lucide React for apps, inline SVG for HTML)\n`;
  if (!outputType || outputType === "app") {
    p += `- Icons: use Lucide React exclusively\n`;
    p += `- Cards: use \`backdrop-filter: blur(12px)\` with semi-transparent backgrounds for depth\n`;
    p += `- Spacing: 16-24px padding inside cards, 12-16px gaps between elements\n`;
    p += `- Hierarchy: clear font-size contrast — headings 28-36px, body 14-16px, captions 11-12px\n`;
    p += `- Accent color only on: primary buttons, active nav, key metrics, links\n`;
    p += `- Font: choose a distinctive typeface like Geist, DM Sans, or Plus Jakarta Sans\n`;
    if (faviconDesc) {
      p += `- Favicon / App Icon: ${faviconDesc}\n`;
    }
  } else {
    p += `- Typography: use a clean, professional typeface via Google Fonts\n`;
    p += `- Hierarchy: clear font-size contrast between headings, body, and captions\n`;
    p += `- Accent color only on: key headings, callouts, data highlights\n`;
  }

  p += `\n<!-- crafted by pintuck -->\n`;

  return p;
}
