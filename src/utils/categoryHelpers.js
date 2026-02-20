import { THEMES, ANIMATIONS } from "../constants";
import { PURPOSES, PURPOSE_PROMPT_DESC } from "../components/PurposeSelector/constants";
import { MOOD_PRESETS } from "../components/MoodSelector/constants";
import { CARD_STYLES } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS } from "../components/NavigationSelector/constants";
import { BTN_STYLES } from "../components/ButtonSelector/constants";

export function isCategoryConfigured(state, categoryId) {
  switch (categoryId) {
    case "appType":
      return !!state.selectedPurpose;
    case "theme":
      return state.theme !== null || state.configuredSections?.includes("theme");
    case "mood":
      return state.moodDimensions !== null;
    case "cards":
      return state.cardStyle !== null;
    case "data":
      return false;
    case "navigation":
      return state.navStyle !== null;
    case "buttons":
      return state.buttonStyle !== null;
    case "animation":
      return state.animation !== null;
    case "appDescription":
      return state.appDescription.trim() !== "";
    case "awsGuidelines":
      return state.awsGuidelines === true;
    case "customNotes":
      return state.customNotes.trim() !== "";
    case "prompt":
      return state.configuredSections?.length > 0;
    default:
      return false;
  }
}

export function getSelectionSummary(state, categoryId) {
  switch (categoryId) {
    case "appType": {
      if (!state.selectedPurpose) return null;
      const purpose = PURPOSES.find((x) => x.id === state.selectedPurpose);
      if (!purpose) return null;
      const desc = PURPOSE_PROMPT_DESC[state.selectedPurpose];
      return { text: purpose.name, detail: desc || purpose.desc };
    }
    case "theme": {
      const t = THEMES.find((x) => x.id === state.theme);
      if (!t) {
        const mode = state.modeFilter || "dark";
        return state.configuredSections?.includes("theme")
          ? { text: `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode` }
          : null;
      }
      const accent = state.customAccents?.[state.theme] || t.preview.accent;
      const colors = [t.preview.bg, t.preview.card, accent];
      if (t.preview.secondary) colors.push(t.preview.secondary);
      colors.push(t.preview.text);
      return { text: t.name, colors };
    }
    case "mood": {
      if (!state.moodDimensions) return null;
      if (state.moodCustom) return { text: "Custom" };
      const preset = MOOD_PRESETS.find((x) => x.id === state.moodPreset);
      return preset ? { text: preset.name } : { text: "Custom" };
    }
    case "cards": {
      if (!state.cardStyle) return null;
      const style = CARD_STYLES.find((s) => s.id === state.cardStyle.styleId);
      if (!style) return null;
      return { text: state.cardStyle.custom ? `${style.label} (custom)` : style.label };
    }
    case "data":
      return null;
    case "navigation": {
      if (!state.navStyle) return null;
      const np = NAV_PATTERNS.find((n) => n.id === state.navStyle.patternId);
      if (!np) return null;
      return { text: state.navStyle.custom ? `${np.label} (custom)` : np.label };
    }
    case "buttons": {
      if (!state.buttonStyle) return null;
      const bs = BTN_STYLES.find((s) => s.id === state.buttonStyle.styleId);
      if (!bs) return null;
      return { text: state.buttonStyle.custom ? `${bs.label} (custom)` : bs.label };
    }
    case "animation": {
      const a = ANIMATIONS.find((x) => x.id === state.animation);
      return a ? { text: a.name } : null;
    }
    case "appDescription":
      return state.appDescription.trim()
        ? { text: state.appName || "Described" }
        : null;
    case "awsGuidelines":
      return state.awsGuidelines ? { text: "Enabled" } : null;
    case "customNotes":
      return state.customNotes.trim() ? { text: "Added" } : null;
    case "prompt": {
      const count = state.configuredSections?.length || 0;
      return count > 0 ? { text: `${count} section${count === 1 ? "" : "s"}` } : null;
    }
    default:
      return null;
  }
}
