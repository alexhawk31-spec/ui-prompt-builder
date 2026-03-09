import { useState, useEffect, useMemo } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import TemplateCard from "./TemplateCard";
import SubmitTemplate from "./SubmitTemplate";

const ACCENT = "#f59e0b";

export default function TemplateLibrary() {
  const templates = usePromptStore((s) => s.templates);
  const templateLoading = usePromptStore((s) => s.templateLoading);
  const loadTemplates = usePromptStore((s) => s.loadTemplates);
  const applyTemplate = usePromptStore((s) => s.applyTemplate);
  const setActiveCategory = usePromptStore((s) => s.setActiveCategory);
  const shellMode = usePromptStore((s) => s.shellMode);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [activeTag, setActiveTag] = useState("All");
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Load templates on mount if empty
  useEffect(() => {
    if (templates.length === 0 && !templateLoading) {
      loadTemplates();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Derive unique tags from all templates
  const allTags = useMemo(() => {
    const tagSet = new Set();
    templates.forEach((t) => {
      t.tags.forEach((tag) => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, [templates]);

  // Filter templates by active tag
  const filtered =
    activeTag === "All"
      ? templates
      : templates.filter((t) => t.tags.includes(activeTag));

  // Preview a template — applies it to the store so EvolvingPreview updates
  const handlePreview = (template) => {
    if (selectedId === template.id) {
      // Already selected, go explore
      setActiveCategory("theme");
      return;
    }
    setSelectedId(template.id);
    applyTemplate(template);
  };

  // Confirm and navigate
  const handleExplore = () => {
    setActiveCategory("theme");
  };

  return (
    <>
      {/* Intro blurb */}
      <div
        style={{
          fontSize: 12,
          color: c.muted,
          lineHeight: 1.5,
          marginBottom: 16,
          padding: "0 2px",
        }}
      >
        Templates are just starting points — pick one to pre-fill your config,
        then tweak whatever you want, remove sections you don't need, or ignore
        templates entirely and build from scratch. Nothing here is required.
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 16,
        }}
      >
        {allTags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: "5px 12px",
                borderRadius: 999,
                border: isActive
                  ? `1.5px solid ${ACCENT}`
                  : `1px solid ${c.panelBorder}`,
                background: isActive ? ACCENT : c.dim,
                color: isActive ? "#fff" : c.muted,
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Selected template banner */}
      {selectedId && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderRadius: 10,
            background: `${ACCENT}12`,
            border: `1px solid ${ACCENT}30`,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 8px ${ACCENT}80`,
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>
              Previewing{" "}
              <span style={{ color: ACCENT }}>
                {templates.find((t) => t.id === selectedId)?.name}
              </span>{" "}
              — check the live preview. You can change everything after.
            </span>
          </div>
          <button
            onClick={handleExplore}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              background: ACCENT,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s",
            }}
          >
            Apply & Explore
          </button>
        </div>
      )}

      {/* Loading state */}
      {templateLoading && (
        <div
          style={{
            textAlign: "center",
            padding: 32,
            fontSize: 12,
            color: c.muted,
          }}
        >
          Loading templates...
        </div>
      )}

      {/* Template grid */}
      {!templateLoading && filtered.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handlePreview}
              isSelected={selectedId === template.id}
              accent={ACCENT}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!templateLoading && filtered.length === 0 && templates.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 32,
            fontSize: 12,
            color: c.muted,
          }}
        >
          No templates match the selected tag.
        </div>
      )}

      {/* Submit Your Config section */}
      <div
        style={{
          background: c.panelBg,
          border: `1px solid ${c.panelBorder}`,
          borderRadius: 12,
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: c.text,
              marginBottom: 4,
            }}
          >
            Submit Your Config
          </div>
          <div
            style={{
              fontSize: 11,
              color: c.muted,
              lineHeight: 1.4,
            }}
          >
            Have a config you love? Share it with the community. Even
            partial configs work great — you don't need every section filled out.
          </div>
        </div>
        <button
          onClick={() => setShowSubmit(true)}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            border: "none",
            background: ACCENT,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
        >
          Submit
        </button>
      </div>

      {/* Submit modal */}
      <SubmitTemplate open={showSubmit} onClose={() => setShowSubmit(false)} />
    </>
  );
}
