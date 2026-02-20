import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePromptStore from "../../store/usePromptStore";
import { THEMES } from "../../constants/themes";
import { PURPOSES, getPreviewPalette } from "../PurposeSelector/constants";
import { getMoodStyles } from "../../utils/moodStyles";
import { getCardStyleCSS } from "../../utils/cardStyleCSS";
import { getButtonStyleCSS } from "../../utils/buttonStyleCSS";
import NavIndicator from "../PurposeSelector/previews/NavIndicator";

import PreviewLearn from "../PurposeSelector/previews/PreviewLearn";
import PreviewData from "../PurposeSelector/previews/PreviewData";
import PreviewStory from "../PurposeSelector/previews/PreviewStory";
import PreviewBuilder from "../PurposeSelector/previews/PreviewBuilder";
import PreviewCommunity from "../PurposeSelector/previews/PreviewCommunity";
import PreviewDiscover from "../PurposeSelector/previews/PreviewDiscover";
import PreviewMission from "../PurposeSelector/previews/PreviewMission";
import PreviewFreestyle from "../PurposeSelector/previews/PreviewFreestyle";

const PREVIEW_MAP = {
  learn: PreviewLearn,
  data: PreviewData,
  story: PreviewStory,
  builder: PreviewBuilder,
  community: PreviewCommunity,
  discover: PreviewDiscover,
  mission: PreviewMission,
  freestyle: PreviewFreestyle,
};

export default function EvolvingPreview() {
  const selectedPurpose = usePromptStore((s) => s.selectedPurpose);
  const previewMode = usePromptStore((s) => s.previewMode);
  const themeId = usePromptStore((s) => s.theme);
  const customAccents = usePromptStore((s) => s.customAccents);
  const moodDimensions = usePromptStore((s) => s.moodDimensions);
  const cardStyleState = usePromptStore((s) => s.cardStyle);
  const buttonStyleState = usePromptStore((s) => s.buttonStyle);
  const navStyleState = usePromptStore((s) => s.navStyle);

  const effectiveTheme = useMemo(() => {
    const base = THEMES.find((t) => t.id === themeId);
    if (!base) return null;
    const accent = customAccents[themeId] || base.preview.accent;
    return { ...base, preview: { ...base.preview, accent } };
  }, [themeId, customAccents]);

  const p = getPreviewPalette(previewMode === "dark", effectiveTheme);
  const mood = useMemo(() => getMoodStyles(moodDimensions), [moodDimensions]);
  const cardCSS = useMemo(() => getCardStyleCSS(cardStyleState, p), [cardStyleState, p]);
  const buttonCSS = useMemo(() => getButtonStyleCSS(buttonStyleState, p), [buttonStyleState, p]);
  const current = PURPOSES.find((pr) => pr.id === selectedPurpose);
  const Preview = PREVIEW_MAP[selectedPurpose] || PreviewFreestyle;
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
          {current?.name} · {previewMode === "dark" ? "Dark" : "Light"}
        </span>
      </div>

      {/* Preview content */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPurpose || "freestyle"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ height: "100%" }}
          >
            <div style={{ height: "100%", display: "flex", flexDirection: isLeftNav ? "row" : "column" }}>
              <NavIndicator navStyle={navStyleState} p={p} />
              <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: "hidden" }}>
                <Preview p={p} mood={mood} cardCSS={cardCSS} buttonCSS={buttonCSS} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
