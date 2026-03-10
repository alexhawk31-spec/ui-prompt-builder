import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";

const ACCENT = "#94a3b8";

export default function TemplateLibrary() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const c = getShellColors(shellMode === "light");

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 4 }}>
          Templates
        </div>
        <div style={{ fontSize: 11, color: c.muted, lineHeight: 1.5 }}>
          Curated starting points — real examples with the prompt that built them, ready to copy or use as a jumping-off point.
        </div>
      </div>

      {/* Empty state */}
      <div
        style={{
          padding: "48px 24px",
          borderRadius: 14,
          border: `1px dashed ${c.panelBorder}`,
          background: `${ACCENT}06`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${ACCENT}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="grid" size={22} color={`${ACCENT}60`} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>
          No templates yet
        </div>
        <div style={{ fontSize: 11, color: c.muted, maxWidth: 280, lineHeight: 1.5 }}>
          Templates are being curated — real presentations, one-pagers, and app mockups with the prompts that built them. Check back soon.
        </div>
      </div>
    </>
  );
}
