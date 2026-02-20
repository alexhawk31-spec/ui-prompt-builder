import { create } from "zustand";
import { THEMES } from "../constants/themes";
import { MOOD_PRESETS } from "../components/MoodSelector/constants";
import { CARD_STYLES } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS } from "../components/NavigationSelector/constants";
import { BTN_STYLES } from "../components/ButtonSelector/constants";

const usePromptStore = create((set, get) => ({
  // Shell mode (light/dark app chrome — independent of theme selection)
  shellMode: "dark",
  toggleShellMode: () =>
    set((state) => ({ shellMode: state.shellMode === "dark" ? "light" : "dark" })),

  // Preview mode (light/dark for purpose previews — controlled by theme section)
  previewMode: "dark",
  togglePreviewMode: () =>
    set((state) => ({ previewMode: state.previewMode === "dark" ? "light" : "dark" })),

  // Intro / landing page
  showIntro: true,
  dismissIntro: () => set({ showIntro: false, onboarded: true }),

  // Onboarding
  onboarded: false,
  completeOnboarding: (mode) => {
    if (mode === "dark" || mode === "light") {
      set({ onboarded: true, modeFilter: mode, previewMode: mode });
    } else {
      set({ onboarded: true });
    }
  },

  // Navigation
  activeCategory: "appType",
  setActiveCategory: (val) => set({ activeCategory: val }),

  // App type — what are you building?
  appType: null,
  setAppType: (val) => {
    set({ appType: val });
    get().autoInclude("appType");
  },
  clearAppType: () =>
    set((state) => ({
      appType: null,
      selectedPurpose: null,
      configuredSections: state.configuredSections.filter((id) => id !== "appType"),
    })),

  // Purpose — what are you building?
  selectedPurpose: null,
  setPurpose: (id) => {
    set({ selectedPurpose: id });
    get().autoInclude("appType");
  },

  // Configured sections — which are "included in prompt"
  configuredSections: [],
  toggleConfigured: (sectionId) =>
    set((state) => ({
      configuredSections: state.configuredSections.includes(sectionId)
        ? state.configuredSections.filter((id) => id !== sectionId)
        : [...state.configuredSections, sectionId],
    })),
  autoInclude: (sectionId) =>
    set((state) => ({
      configuredSections: state.configuredSections.includes(sectionId)
        ? state.configuredSections
        : [...state.configuredSections, sectionId],
    })),

  // Summary overlay
  showSummary: false,
  setShowSummary: (val) => set({ showSummary: val }),

  // App description & naming
  appDescription: "",
  appName: "",
  nameOptions: [],
  loadingNames: false,
  nameError: "",

  // Theme selections
  theme: null,
  modeFilter: "dark",
  customAccents: {},

  // Mood & Feel — 4-dimension system with preset shortcuts
  moodPreset: null,
  moodDimensions: null,
  moodCustom: false,
  cardStyle: null,
  navStyle: null,
  buttonStyle: null,
  animation: null,
  customNotes: "",
  awsGuidelines: false,

  // Output state
  copied: false,

  // App description actions
  setAppDescription: (val) => {
    set({ appDescription: val });
    if (val.trim()) get().autoInclude("appDescription");
  },
  setAppName: (val) => set({ appName: val }),
  setNameOptions: (val) => set({ nameOptions: val }),
  setLoadingNames: (val) => set({ loadingNames: val }),
  setNameError: (val) => set({ nameError: val }),

  // Theme actions
  setTheme: (id) => {
    set({ theme: id });
    get().autoInclude("theme");
  },
  setModeFilter: (mode) => {
    set({ modeFilter: mode, previewMode: mode });
    get().autoInclude("theme");
  },
  setAccent: (themeId, color) =>
    set((state) => ({
      customAccents: { ...state.customAccents, [themeId]: color },
    })),

  // Returns the base theme object with the custom accent applied
  getEffectiveTheme: () => {
    const { theme, customAccents } = get();
    const base = THEMES.find((t) => t.id === theme);
    if (!base) return null;
    const accent = customAccents[theme] || base.preview.accent;
    return {
      ...base,
      preview: { ...base.preview, accent },
    };
  },

  // Mood actions
  setMoodPreset: (preset) => {
    set({
      moodPreset: preset.id,
      moodDimensions: { ...preset.v },
      moodCustom: false,
    });
    get().autoInclude("mood");
  },
  setMoodDimension: (dim, val) => {
    const { moodDimensions } = get();
    const base = moodDimensions || { density: "balanced", typography: "clean", interaction: "smooth", embellishment: "minimal" };
    const next = { ...base, [dim]: val };
    // Check if next matches any preset
    const match = MOOD_PRESETS.find((p) =>
      Object.keys(p.v).every((k) => p.v[k] === next[k])
    );
    set({
      moodDimensions: next,
      moodPreset: match ? match.id : null,
      moodCustom: !match,
    });
    get().autoInclude("mood");
  },

  // Card style actions
  setCardStyle: (styleObj) => {
    set({
      cardStyle: {
        styleId: styleObj.id,
        fineTune: { ...styleObj.defaults },
        custom: false,
      },
    });
    get().autoInclude("cards");
  },
  setCardFineTune: (dimId, value) => {
    const { cardStyle } = get();
    if (!cardStyle) return;
    const style = CARD_STYLES.find((s) => s.id === cardStyle.styleId);
    const nextFineTune = { ...cardStyle.fineTune, [dimId]: value };
    const isCustom = style
      ? Object.keys(style.defaults).some((k) => nextFineTune[k] !== style.defaults[k])
      : true;
    set({
      cardStyle: {
        ...cardStyle,
        fineTune: nextFineTune,
        custom: isCustom,
      },
    });
    get().autoInclude("cards");
  },

  // Nav style actions
  setNavStyle: (patternObj) => {
    set({
      navStyle: {
        patternId: patternObj.id,
        fineTune: { ...patternObj.defaults },
        custom: false,
      },
    });
    get().autoInclude("navigation");
  },
  setNavFineTune: (dimId, value) => {
    const { navStyle } = get();
    if (!navStyle) return;
    const pattern = NAV_PATTERNS.find((p) => p.id === navStyle.patternId);
    const nextFineTune = { ...navStyle.fineTune, [dimId]: value };
    const isCustom = pattern
      ? Object.keys(pattern.defaults).some((k) => nextFineTune[k] !== pattern.defaults[k])
      : true;
    set({
      navStyle: {
        ...navStyle,
        fineTune: nextFineTune,
        custom: isCustom,
      },
    });
    get().autoInclude("navigation");
  },

  // Button style actions
  setButtonStyle: (styleObj) => {
    set({
      buttonStyle: {
        styleId: styleObj.id,
        fineTune: { ...styleObj.defaults },
        custom: false,
      },
    });
    get().autoInclude("buttons");
  },
  setButtonFineTune: (dimId, value) => {
    const { buttonStyle } = get();
    if (!buttonStyle) return;
    const style = BTN_STYLES.find((s) => s.id === buttonStyle.styleId);
    const nextFineTune = { ...buttonStyle.fineTune, [dimId]: value };
    const isCustom = style
      ? Object.keys(style.defaults).some((k) => nextFineTune[k] !== style.defaults[k])
      : true;
    set({
      buttonStyle: {
        ...buttonStyle,
        fineTune: nextFineTune,
        custom: isCustom,
      },
    });
    get().autoInclude("buttons");
  },

  // Simple setters (with auto-include)
  setAnimation: (val) => {
    set({ animation: val });
    get().autoInclude("animation");
  },
  setCustomNotes: (val) => {
    set({ customNotes: val });
    if (val.trim()) get().autoInclude("customNotes");
  },
  setAwsGuidelines: (val) => {
    set({ awsGuidelines: val });
    if (val) get().autoInclude("awsGuidelines");
  },

  // Clear actions (reset a single category and remove from configured)
  clearTheme: () =>
    set((state) => ({
      theme: null,
      customAccents: {},
      configuredSections: state.configuredSections.filter((id) => id !== "theme"),
    })),
  clearMood: () =>
    set((state) => ({
      moodPreset: null,
      moodDimensions: null,
      moodCustom: false,
      configuredSections: state.configuredSections.filter((id) => id !== "mood"),
    })),
  clearCardStyle: () =>
    set((state) => ({
      cardStyle: null,
      configuredSections: state.configuredSections.filter((id) => id !== "cards"),
    })),
  clearNavStyle: () =>
    set((state) => ({
      navStyle: null,
      configuredSections: state.configuredSections.filter((id) => id !== "navigation"),
    })),
  clearButtonStyle: () =>
    set((state) => ({
      buttonStyle: null,
      configuredSections: state.configuredSections.filter((id) => id !== "buttons"),
    })),
  clearAnimation: () =>
    set((state) => ({
      animation: null,
      configuredSections: state.configuredSections.filter((id) => id !== "animation"),
    })),
  clearAppDescription: () =>
    set((state) => ({
      appDescription: "",
      appName: "",
      nameOptions: [],
      nameError: "",
      configuredSections: state.configuredSections.filter((id) => id !== "appDescription"),
    })),
  clearAwsGuidelines: () =>
    set((state) => ({
      awsGuidelines: false,
      configuredSections: state.configuredSections.filter((id) => id !== "awsGuidelines"),
    })),
  clearCustomNotes: () =>
    set((state) => ({
      customNotes: "",
      configuredSections: state.configuredSections.filter((id) => id !== "customNotes"),
    })),

  // Reset everything
  resetAll: () =>
    set({
      appType: null,
      selectedPurpose: null,
      previewMode: "dark",
      theme: null,
      modeFilter: "dark",
      customAccents: {},
      moodPreset: null,
      moodDimensions: null,
      moodCustom: false,
      cardStyle: null,
      navStyle: null,
      buttonStyle: null,
      animation: null,
      customNotes: "",
      awsGuidelines: false,
      appDescription: "",
      appName: "",
      nameOptions: [],
      nameError: "",
      configuredSections: [],
    }),

  // Output actions
  setCopied: (val) => set({ copied: val }),
}));

export default usePromptStore;
