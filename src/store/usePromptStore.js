import { create } from "zustand";
import { THEMES } from "../constants/themes";
import { MOOD_PRESETS } from "../components/MoodSelector/constants";
import { CARD_STYLES } from "../components/ComponentStyleSelector/constants";
import { NAV_PATTERNS } from "../components/NavigationSelector/constants";
import { BTN_STYLES } from "../components/ButtonSelector/constants";
import { DATA_STYLES } from "../components/DataDisplaySelector/constants";

const usePromptStore = create((set, get) => ({
  // Shell mode (light/dark app chrome — independent of theme selection)
  shellMode: "dark",
  toggleShellMode: () =>
    set((state) => ({ shellMode: state.shellMode === "dark" ? "light" : "dark" })),

  // Admin portal (hidden behind easter egg)
  adminMode: false,
  setAdminMode: (val) => set({ adminMode: val }),

  // Preview mode (light/dark for purpose previews — controlled by theme section)
  previewMode: "dark",
  togglePreviewMode: () =>
    set((state) => ({ previewMode: state.previewMode === "dark" ? "light" : "dark" })),

  // Intro / landing page
  showIntro: true,
  dismissIntro: () => {
    set({ showIntro: false, onboarded: true });
    window.location.hash = get().activeCategory;
  },

  // Onboarding
  onboarded: false,
  completeOnboarding: (mode) => {
    if (mode === "dark" || mode === "light") {
      set({ onboarded: true, modeFilter: mode, previewMode: mode });
    } else {
      set({ onboarded: true });
    }
    window.location.hash = get().activeCategory;
  },

  // Navigation
  activeCategory: "appType",
  setActiveCategory: (val) => {
    set({ activeCategory: val });
    window.location.hash = val;
  },

  // ── Output Type (Project step) ──
  outputType: null, // "app" | "presentation" | "one-pager" | null
  outputPurpose: null, // string — purpose within the output type
  buildMode: "new-build", // "new-build" | "upgrade" (Presentation + One Pager only)
  appStarterEnabled: false, // App only — include vibe coding starter prompt

  setOutputType: (type) => {
    const current = get().outputType;
    if (current && current !== type) {
      // Reset all configured steps when changing output type
      set({
        outputType: type,
        outputPurpose: null,
        buildMode: "new-build",
        appStarterEnabled: false,
        selectedPurpose: null,
        theme: null,
        modeFilter: "dark",
        previewMode: "dark",
        customAccents: {},
        customColors: {},
        moodPreset: null,
        moodDimensions: null,
        moodCustom: false,
        cardStyle: null,
        navStyle: null,
        navSelections: null,
        buttonStyle: null,
        dataStyle: null,
        animation: null,
        faviconDesc: "",
        configuredSections: [],
      });
    } else {
      set({ outputType: type });
    }
    get().autoInclude("appType");
  },
  setOutputPurpose: (purpose) => {
    set({ outputPurpose: purpose });
    get().autoInclude("appType");
  },
  setBuildMode: (mode) => set({ buildMode: mode }),
  setAppStarterEnabled: (val) => set({ appStarterEnabled: val }),

  // Multi-select navigation for Presentation & One Pager
  navSelections: null, // string[] — selected nav option IDs

  setNavSelections: (selections) => {
    set({ navSelections: selections });
    if (selections && selections.length > 0) {
      get().autoInclude("navigation");
    }
  },
  clearNavSelections: () =>
    set((state) => ({
      navSelections: null,
      configuredSections: state.configuredSections.filter((id) => id !== "navigation"),
    })),

  // App type — what are you building? (legacy compat)
  appType: null,
  setAppType: (val) => {
    set({ appType: val });
    get().autoInclude("appType");
  },
  clearAppType: () =>
    set((state) => ({
      appType: null,
      outputType: null,
      outputPurpose: null,
      selectedPurpose: null,
      buildMode: "new-build",
      appStarterEnabled: false,
      configuredSections: state.configuredSections.filter((id) => id !== "appType"),
    })),

  // Purpose — what are you building? (legacy compat, used by ProjectPicker)
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

  // Theme selections
  theme: null,
  modeFilter: "dark",
  customAccents: {},
  customColors: {}, // { [themeId]: { bg?, card?, secondary?, text? } }

  // Mood & Feel — 4-dimension system with preset shortcuts
  moodPreset: null,
  moodDimensions: null,
  moodCustom: false,
  cardStyle: null,
  navStyle: null,
  buttonStyle: null,
  dataStyle: null,
  animation: null,
  faviconDesc: "",

  // Templates
  templates: [],
  pendingSubmissions: [],
  templateLoading: false,

  // Output state
  copied: false,

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
  setCustomColor: (themeId, channel, color) =>
    set((state) => {
      if (channel === "accent") {
        return { customAccents: { ...state.customAccents, [themeId]: color } };
      }
      return {
        customColors: {
          ...state.customColors,
          [themeId]: { ...(state.customColors[themeId] || {}), [channel]: color },
        },
      };
    }),

  // Returns the base theme object with all custom colors applied
  getEffectiveTheme: () => {
    const { theme, customAccents, customColors } = get();
    const base = THEMES.find((t) => t.id === theme);
    if (!base) return null;
    const overrides = customColors[theme] || {};
    const accent = customAccents[theme] || base.preview.accent;
    return {
      ...base,
      preview: { ...base.preview, ...overrides, accent },
    };
  },

  // Mood actions
  setMoodPreset: (preset) => {
    set({
      moodPreset: preset.id,
      moodDimensions: {
        density: preset.density,
        typography: preset.typography,
        interaction: preset.interaction,
        embellishment: preset.embellishment,
      },
      moodCustom: false,
    });
    get().autoInclude("mood");
  },
  setMoodDimension: (dim, val) => {
    const { moodDimensions } = get();
    const base = moodDimensions || { density: "balanced", typography: "clean", interaction: "smooth", embellishment: "minimal" };
    const next = { ...base, [dim]: val };
    const dimKeys = ["density", "typography", "interaction", "embellishment"];
    const match = MOOD_PRESETS.find((p) =>
      dimKeys.every((k) => p[k] === next[k])
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

  // Data display style actions
  setDataStyle: (styleObj) => {
    set({
      dataStyle: {
        styleId: styleObj.id,
        fineTune: { ...styleObj.defaults },
        custom: false,
      },
    });
    get().autoInclude("data");
  },
  setDataFineTune: (dimId, value) => {
    const { dataStyle } = get();
    if (!dataStyle) return;
    const style = DATA_STYLES.find((s) => s.id === dataStyle.styleId);
    const nextFineTune = { ...dataStyle.fineTune, [dimId]: value };
    const isCustom = style
      ? Object.keys(style.defaults).some((k) => nextFineTune[k] !== style.defaults[k])
      : true;
    set({
      dataStyle: {
        ...dataStyle,
        fineTune: nextFineTune,
        custom: isCustom,
      },
    });
    get().autoInclude("data");
  },

  // Simple setters (with auto-include)
  setAnimation: (val) => {
    set({ animation: val });
    get().autoInclude("animation");
  },
  setFaviconDesc: (val) => set({ faviconDesc: val }),

  // Clear actions (reset a single category and remove from configured)
  clearTheme: () =>
    set((state) => ({
      theme: null,
      customAccents: {},
      customColors: {},
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
      navSelections: null,
      configuredSections: state.configuredSections.filter((id) => id !== "navigation"),
    })),
  clearButtonStyle: () =>
    set((state) => ({
      buttonStyle: null,
      configuredSections: state.configuredSections.filter((id) => id !== "buttons"),
    })),
  clearDataStyle: () =>
    set((state) => ({
      dataStyle: null,
      configuredSections: state.configuredSections.filter((id) => id !== "data"),
    })),
  clearAnimation: () =>
    set((state) => ({
      animation: null,
      configuredSections: state.configuredSections.filter((id) => id !== "animation"),
    })),
  // Reset everything
  resetAll: () =>
    set({
      appType: null,
      selectedPurpose: null,
      outputType: null,
      outputPurpose: null,
      buildMode: "new-build",
      appStarterEnabled: false,
      previewMode: "dark",
      theme: null,
      modeFilter: "dark",
      customAccents: {},
      customColors: {},
      moodPreset: null,
      moodDimensions: null,
      moodCustom: false,
      cardStyle: null,
      navStyle: null,
      navSelections: null,
      buttonStyle: null,
      dataStyle: null,
      animation: null,
      faviconDesc: "",
      configuredSections: [],
    }),

  // Template actions
  loadTemplates: async () => {
    set({ templateLoading: true });
    try {
      const [tRes, pRes] = await Promise.all([
        fetch("/data/templates.json").then((r) => r.json()),
        fetch("/data/pending-submissions.json").then((r) => r.json()),
      ]);
      set({ templates: tRes, pendingSubmissions: pRes, templateLoading: false });
    } catch {
      set({ templateLoading: false });
    }
  },
  applyTemplate: (template) => {
    const cfg = template.config;
    const keyMap = {
      selectedPurpose: "appType",
      theme: "theme",
      moodPreset: "mood",
      moodDimensions: "mood",
      cardStyle: "cards",
      navStyle: "navigation",
      buttonStyle: "buttons",
      dataStyle: "data",
      animation: "animation",
    };
    const sections = Object.entries(cfg)
      .filter(([, v]) => v != null && v !== false)
      .map(([k]) => keyMap[k])
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);
    set({
      appType: cfg.appType || null,
      selectedPurpose: cfg.selectedPurpose || null,
      outputType: cfg.outputType || null,
      outputPurpose: cfg.outputPurpose || null,
      buildMode: cfg.buildMode || "new-build",
      appStarterEnabled: cfg.appStarterEnabled || false,
      theme: cfg.theme || null,
      modeFilter: cfg.modeFilter || "dark",
      previewMode: cfg.modeFilter || "dark",
      customAccents: cfg.customAccents || {},
      customColors: cfg.customColors || {},
      moodPreset: cfg.moodPreset || null,
      moodDimensions: cfg.moodDimensions || null,
      moodCustom: false,
      cardStyle: cfg.cardStyle || null,
      navStyle: cfg.navStyle || null,
      navSelections: cfg.navSelections || null,
      buttonStyle: cfg.buttonStyle || null,
      dataStyle: cfg.dataStyle || null,
      animation: cfg.animation || null,
      configuredSections: sections,
    });
  },
  captureCurrentConfig: () => {
    const s = get();
    return {
      appType: s.appType,
      selectedPurpose: s.selectedPurpose,
      theme: s.theme,
      modeFilter: s.modeFilter,
      customAccents: s.customAccents,
      customColors: s.customColors,
      moodPreset: s.moodPreset,
      moodDimensions: s.moodDimensions,
      cardStyle: s.cardStyle,
      navStyle: s.navStyle,
      buttonStyle: s.buttonStyle,
      dataStyle: s.dataStyle,
      animation: s.animation,
    };
  },
  submitTemplate: (name, description, tags) => {
    const config = get().captureCurrentConfig();
    const submission = {
      id: `sub-${Date.now()}`,
      name,
      description,
      author: "community",
      tags,
      createdAt: new Date().toISOString().split("T")[0],
      config,
      status: "pending",
    };
    set((state) => ({
      pendingSubmissions: [...state.pendingSubmissions, submission],
    }));
    return submission;
  },
  approveSubmission: (submissionId) => {
    const submission = get().pendingSubmissions.find((s) => s.id === submissionId);
    if (!submission) return;
    const { status, ...template } = submission;
    set((state) => ({
      templates: [...state.templates, template],
      pendingSubmissions: state.pendingSubmissions.filter((s) => s.id !== submissionId),
    }));
  },
  rejectSubmission: (submissionId) => {
    set((state) => ({
      pendingSubmissions: state.pendingSubmissions.filter((s) => s.id !== submissionId),
    }));
  },
  deleteTemplate: (templateId) => {
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== templateId),
    }));
  },

  // Output actions
  setCopied: (val) => set({ copied: val }),
}));

export default usePromptStore;
