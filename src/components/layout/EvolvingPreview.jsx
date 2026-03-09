import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { THEMES } from "../../constants/themes";
import { getPreviewPalette } from "../PurposeSelector/constants";
import { PROJECT_TYPES } from "../ProjectPicker/constants";
import { getMoodStyles } from "../../utils/moodStyles";
import { getCardStyleCSS } from "../../utils/cardStyleCSS";
import { getButtonStyleCSS } from "../../utils/buttonStyleCSS";
import { getDataStyleCSS } from "../../utils/dataStyleCSS";
import NavIndicator from "../PurposeSelector/previews/NavIndicator";

import PreviewLearn from "../PurposeSelector/previews/PreviewLearn";
import PreviewData from "../PurposeSelector/previews/PreviewData";
import PreviewStory from "../PurposeSelector/previews/PreviewStory";
import PreviewBuilder from "../PurposeSelector/previews/PreviewBuilder";
import PreviewCommunity from "../PurposeSelector/previews/PreviewCommunity";
import PreviewDiscover from "../PurposeSelector/previews/PreviewDiscover";
import PreviewMission from "../PurposeSelector/previews/PreviewMission";
import PreviewFreestyle from "../PurposeSelector/previews/PreviewFreestyle";
import PreviewKeynote from "../PurposeSelector/previews/PreviewKeynote";
import PreviewStorefront from "../PurposeSelector/previews/PreviewStorefront";
import PreviewPortfolio from "../PurposeSelector/previews/PreviewPortfolio";
import PreviewBackOffice from "../PurposeSelector/previews/PreviewBackOffice";

// Legacy map — keyed by old selectedPurpose IDs
const PREVIEW_MAP = {
  "handbook": PreviewLearn,
  "number-cruncher": PreviewData,
  "main-stage": PreviewStory,
  "workbench": PreviewBuilder,
  "hangout": PreviewCommunity,
  "showroom": PreviewDiscover,
  "command-center": PreviewMission,
  "off-the-pattern": PreviewFreestyle,
  "keynote": PreviewKeynote,
  "storefront": PreviewStorefront,
  "portfolio": PreviewPortfolio,
  "back-office": PreviewBackOffice,
};

// New outputPurpose → preview mapping
const PURPOSE_PREVIEW_MAP = {
  // App purposes
  "dashboard": PreviewData,
  "mission-control": PreviewMission,
  "builder": PreviewBuilder,
  "learn": PreviewLearn,
  "community": PreviewCommunity,
  "discover": PreviewDiscover,
  "freestyle": PreviewFreestyle,
  // Presentation purposes
  "executive-briefing": PreviewKeynote,
  "product-demo": PreviewKeynote,
  "storytelling": PreviewStory,
  "sales-deck": PreviewKeynote,
  "workshop": PreviewLearn,
  // One-pager purposes
  "summary-brief": PreviewStorefront,
  "research-analysis": PreviewData,
  "announcement": PreviewStory,
  "reference-cheat-sheet": PreviewBackOffice,
};

// Default preview per output type (when no purpose selected)
const TYPE_DEFAULT_PREVIEW = {
  "app": PreviewFreestyle,
  "presentation": PreviewKeynote,
  "one-pager": PreviewStorefront,
};

const TYPE_LABELS = {
  "app": "App",
  "presentation": "Presentation",
  "one-pager": "One Pager",
};

export default function EvolvingPreview() {
  const selectedPurpose = usePromptStore((s) => s.selectedPurpose);
  const outputType = usePromptStore((s) => s.outputType);
  const outputPurpose = usePromptStore((s) => s.outputPurpose);
  const previewMode = usePromptStore((s) => s.previewMode);
  const themeId = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const customColors = usePromptStore((s) => s.customColors);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const cardStyleState = usePromptStore((s) => s.cardStyle);
  const buttonStyleState = usePromptStore((s) => s.buttonStyle);
  const navStyleState = usePromptStore((s) => s.navStyle);
  const dataStyleState = usePromptStore((s) => s.dataStyle);
  const animationSetting = usePromptStore((s) => s.animation);

  const effectiveTheme = useMemo(() => {
    const base = THEMES.find((t) => t.id === themeId);
    if (!base) return null;
    const overrides = customColors[themeId] || {};
    const accent = customAccents[themeId] || base.preview.accent;
    return { ...base, preview: { ...base.preview, ...overrides, accent } };
  }, [themeId, customAccents, customColors]);

  const p = getPreviewPalette(previewMode === "dark", effectiveTheme);
  const mood = useMemo(() => getMoodStyles(moodDimensions), [moodDimensions]);
  const cardCSS = useMemo(() => getCardStyleCSS(cardStyleState, p), [cardStyleState, p]);
  const buttonCSS = useMemo(() => getButtonStyleCSS(buttonStyleState, p), [buttonStyleState, p]);
  const dataCSS = useMemo(() => getDataStyleCSS(dataStyleState, p), [dataStyleState, p]);

  // Merge animation setting into mood — overrides transition timing
  const effectiveMood = useMemo(() => {
    const base = mood || {};
    if (!animationSetting) return base;
    const animTransition = {
      none: "none",
      subtle: "all 0.5s ease",
      smooth: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      dynamic: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    }[animationSetting];
    return animTransition ? { ...base, transition: animTransition } : base;
  }, [mood, animationSetting]);

  // Resolve which preview to show: new system takes priority over legacy
  const Preview = useMemo(() => {
    if (outputType) {
      if (outputPurpose && PURPOSE_PREVIEW_MAP[outputPurpose]) {
        return PURPOSE_PREVIEW_MAP[outputPurpose];
      }
      return TYPE_DEFAULT_PREVIEW[outputType] || PreviewFreestyle;
    }
    // Legacy fallback
    return PREVIEW_MAP[selectedPurpose] || PreviewFreestyle;
  }, [outputType, outputPurpose, selectedPurpose]);

  const previewKey = outputPurpose || outputType || selectedPurpose || "freestyle";
  const current = PROJECT_TYPES.find((pr) => pr.id === selectedPurpose);
  const titleLabel = outputType
    ? TYPE_LABELS[outputType] || "Preview"
    : current?.name || "Preview";
  const isLeftNav = navStyleState && ["rail", "shelf"].includes(navStyleState.patternId);

  return (
    <div
      style={{
        flex: 1,
        borderRadius: 14,
        overflow: "hidden",
        border: "2px solid #4338ca",
        boxShadow: "0 4px 24px rgba(67,56,202,0.2), 0 0 0 1px rgba(67,56,202,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Indigo gradient title bar */}
      <div
        style={{
          padding: "7px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(180deg,#4338ca,#3730a3)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            textTransform: "uppercase",
            letterSpacing: ".06em",
          }}
        >
          Live Preview
        </span>
        <span
          style={{
            fontSize: 8,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {titleLabel} · {previewMode === "dark" ? "Dark" : "Light"}
        </span>
      </div>

      {/* Preview content */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={previewKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ height: "100%" }}
          >
            <div style={{ height: "100%", display: "flex", flexDirection: isLeftNav ? "row" : "column" }}>
              <NavIndicator navStyle={navStyleState} p={p} />
              <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: "hidden" }}>
                <Preview p={p} mood={effectiveMood} cardCSS={cardCSS} buttonCSS={buttonCSS} dataCSS={dataCSS} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
