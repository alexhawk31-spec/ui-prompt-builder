import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import { PURPOSES, getPreviewPalette } from "./constants";
import PurposeCard from "./PurposeCard";
import NextStepButton from "../shared/NextStepButton";

import ThumbLearn from "./thumbnails/ThumbLearn";
import ThumbData from "./thumbnails/ThumbData";
import ThumbStory from "./thumbnails/ThumbStory";
import ThumbBuilder from "./thumbnails/ThumbBuilder";
import ThumbCommunity from "./thumbnails/ThumbCommunity";
import ThumbDiscover from "./thumbnails/ThumbDiscover";
import ThumbMission from "./thumbnails/ThumbMission";
import ThumbFreestyle from "./thumbnails/ThumbFreestyle";

const THUMB_MAP = {
  learn: ThumbLearn,
  data: ThumbData,
  story: ThumbStory,
  builder: ThumbBuilder,
  community: ThumbCommunity,
  discover: ThumbDiscover,
  mission: ThumbMission,
  freestyle: ThumbFreestyle,
};

export default function PurposeSelector() {
  const selectedPurpose = usePromptStore((s) => s.selectedPurpose);
  const setPurpose = usePromptStore((s) => s.setPurpose);
  const previewMode = usePromptStore((s) => s.previewMode);

  const p = getPreviewPalette(previewMode === "dark");

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
        }}
      >
        {PURPOSES.map((purpose) => (
          <PurposeCard
            key={purpose.id}
            purpose={purpose}
            selected={selectedPurpose}
            onSelect={setPurpose}
            p={p}
            Thumb={THUMB_MAP[purpose.id]}
          />
        ))}
      </div>

      <NextStepButton targetCategory="theme" label="Theme" />
    </>
  );
}
