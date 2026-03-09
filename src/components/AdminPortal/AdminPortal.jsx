import { useState, useEffect } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import TemplateQueue from "./TemplateQueue";
import TemplateManager from "./TemplateManager";

export default function AdminPortal() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const templates = usePromptStore((s) => s.templates);
  const templateLoading = usePromptStore((s) => s.templateLoading);
  const loadTemplates = usePromptStore((s) => s.loadTemplates);
  const setAdminMode = usePromptStore((s) => s.setAdminMode);

  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  const [activeTab, setActiveTab] = useState("queue");

  useEffect(() => {
    if (templates.length === 0 && !templateLoading) {
      loadTemplates();
    }
  }, []);

  const tabs = [
    { id: "queue", label: "Submission Queue" },
    { id: "library", label: "Template Library" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: c.page,
        fontFamily: "'DM Sans', sans-serif",
        color: c.text,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: `1px solid ${c.panelBorder}`,
          background: c.headerBg,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: c.text,
          }}
        >
          Admin Portal
        </div>
        <button
          onClick={() => setAdminMode(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: `1px solid ${c.panelBorder}`,
            background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
            cursor: "pointer",
            fontFamily: "inherit",
            color: c.muted,
            fontSize: 13,
            fontWeight: 500,
            transition: "all 0.2s",
          }}
        >
          <Icon name="chevronLeft" size={14} color={c.muted} />
          Back to App
        </button>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${c.panelBorder}`,
          background: c.headerBg,
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "inherit",
                color: isActive ? c.text : c.muted,
                background: "transparent",
                border: "none",
                borderBottom: isActive
                  ? "2px solid #f59e0b"
                  : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 24,
        }}
      >
        {activeTab === "queue" ? <TemplateQueue /> : <TemplateManager />}
      </div>
    </div>
  );
}
