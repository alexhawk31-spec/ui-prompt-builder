import { THEMES, ANIMATIONS } from "../constants";
import { PROJECT_TYPES } from "../components/ProjectPicker/constants";
import { MOOD_PRESETS } from "../components/MoodSelector/constants";
import { CARD_STYLES } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS } from "../components/NavigationSelector/constants";
import { BTN_STYLES } from "../components/ButtonSelector/constants";
import { DATA_STYLES } from "../components/DataDisplaySelector/constants";
import { OUTPUT_TYPES, PURPOSE_OPTIONS } from "../constants/outputTypes";

export function isCategoryConfigured(state, categoryId) {
  switch (categoryId) {
    case "appType":
      return !!state.outputType || !!state.selectedPurpose;
    case "theme":
      return state.theme !== null || state.configuredSections?.includes("theme");
    case "mood":
      return state.moodDimensions !== null;
    case "layouts":
      return state.slideLayouts?.length > 0;
    case "cards":
      return state.cardStyle !== null;
    case "data":
      return state.dataStyle !== null;
    case "navigation":
      // Multi-select mode for presentation/one-pager
      if (state.outputType === "presentation" || state.outputType === "one-pager") {
        return state.navSelections?.length > 0;
      }
      return state.navStyle !== null;
    case "buttons":
      return state.buttonStyle !== null;
    case "animation":
      return state.animation !== null;
    case "templates":
      return false;
    case "prompt":
      return state.configuredSections?.length > 0;
    default:
      return false;
  }
}

export function getSelectionSummary(state, categoryId) {
  switch (categoryId) {
    case "appType": {
      // New output type system
      if (state.outputType) {
        const type = OUTPUT_TYPES.find((t) => t.id === state.outputType);
        const purposes = PURPOSE_OPTIONS[state.outputType];
        const purpose = purposes?.find((p) => p.id === state.outputPurpose);
        const text = purpose ? `${type?.label} · ${purpose.label}` : type?.label;
        return { text };
      }
      // Legacy
      if (!state.selectedPurpose) return null;
      const project = PROJECT_TYPES.find((x) => x.id === state.selectedPurpose);
      if (!project) return null;
      return { text: project.name, detail: project.tagline };
    }
    case "theme": {
      const t = THEMES.find((x) => x.id === state.theme);
      if (!t) {
        const mode = state.modeFilter || "dark";
        return state.configuredSections?.includes("theme")
          ? { text: `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode` }
          : null;
      }
      const co = state.customColors?.[state.theme] || {};
      const accent = state.customAccents?.[state.theme] || t.preview.accent;
      const colors = [co.bg || t.preview.bg, co.card || t.preview.card, accent];
      const sec = co.secondary || t.preview.secondary;
      if (sec) colors.push(sec);
      colors.push(co.text || t.preview.text);
      return { text: t.name, colors };
    }
    case "mood": {
      if (!state.moodDimensions) return null;
      if (state.moodCustom) return { text: "Custom" };
      const preset = MOOD_PRESETS.find((x) => x.id === state.moodPreset);
      return preset ? { text: preset.name } : { text: "Custom" };
    }
    case "layouts": {
      const count = state.slideLayouts?.length || 0;
      return count > 0 ? { text: `${count} layout${count !== 1 ? "s" : ""}` } : null;
    }
    case "cards": {
      if (!state.cardStyle) return null;
      // Multi-select mode for one-pager
      if (state.outputType === "one-pager") {
        const count = state.cardStyle.styleId?.split(",").filter(Boolean).length || 0;
        return { text: `${count} selected` };
      }
      const style = CARD_STYLES.find((s) => s.id === state.cardStyle.styleId);
      if (!style) return null;
      return { text: state.cardStyle.custom ? `${style.label} (custom)` : style.label };
    }
    case "data": {
      if (!state.dataStyle) return null;
      if (state.outputType === "presentation" || state.outputType === "one-pager") {
        const count = state.dataStyle.styleId?.split(",").filter(Boolean).length || 0;
        return { text: `${count} selected` };
      }
      const ds = DATA_STYLES.find((s) => s.id === state.dataStyle.styleId);
      if (!ds) return null;
      return { text: state.dataStyle.custom ? `${ds.label} (custom)` : ds.label };
    }
    case "navigation": {
      if (state.outputType === "presentation" || state.outputType === "one-pager") {
        const count = state.navSelections?.length || 0;
        return count > 0 ? { text: `${count} selected` } : null;
      }
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
      if (!state.animation) return null;
      // Presentation multi-select
      if (state.outputType === "presentation" && state.animation.includes(",")) {
        const count = state.animation.split(",").filter(Boolean).length;
        return { text: `${count} selected` };
      }
      const a = ANIMATIONS.find((x) => x.id === state.animation);
      return a ? { text: a.name } : { text: state.animation };
    }
    case "templates":
      return null;
    case "prompt": {
      const count = state.configuredSections?.length || 0;
      return count > 0 ? { text: `${count} section${count === 1 ? "" : "s"}` } : null;
    }
    default:
      return null;
  }
}
