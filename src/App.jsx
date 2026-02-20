import usePromptStore from "./store/usePromptStore";
import { getShellColors } from "./utils/shellColors";
import TitleBar from "./components/layout/TitleBar";
import NavStrip from "./components/layout/NavStrip";
import MainPanel from "./components/layout/MainPanel";
import EvolvingPreview from "./components/layout/EvolvingPreview";
import TerminalPrompt from "./components/layout/TerminalPrompt";
import SummaryOverlay from "./components/layout/SummaryOverlay";
import WelcomeScreen from "./components/layout/WelcomeScreen";
import IntroPage from "./components/layout/IntroPage";

export default function App() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const onboarded = usePromptStore((s) => s.onboarded);
  const showIntro = usePromptStore((s) => s.showIntro);
  const dismissIntro = usePromptStore((s) => s.dismissIntro);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  // Show intro landing page first
  if (showIntro) {
    return <IntroPage onStart={dismissIntro} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: c.page,
        color: c.text,
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
        transition: "all 0.3s ease",
      }}
    >
      {/* App Title Bar */}
      <TitleBar />

      {/* App Frame */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 12px 40px" }}>
        <div
          style={{
            width: "100%",
            height: 740,
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            border: `1px solid ${c.panelBorder}`,
            boxShadow: isLight
              ? "0 4px 24px rgba(0,0,0,0.08)"
              : "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          {onboarded ? (
            <>
              {/* Summary overlay */}
              <SummaryOverlay />

              {/* Nav Strip */}
              <NavStrip />

              {/* Main column */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: c.appBg,
                  minWidth: 0,
                  transition: "background 0.3s",
                }}
              >
                {/* Content: config 60% + preview 40% */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    overflow: "hidden",
                    minHeight: 0,
                  }}
                >
                  {/* Config panel — 60% */}
                  <div
                    style={{
                      flex: 3,
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
                    }}
                  >
                    <MainPanel />
                  </div>

                  {/* Preview — 40% */}
                  <div
                    style={{
                      flex: 2,
                      padding: 14,
                      paddingLeft: 0,
                      display: "flex",
                      flexDirection: "column",
                      flexShrink: 0,
                    }}
                  >
                    <EvolvingPreview />
                  </div>
                </div>

                {/* Terminal prompt dock */}
                <div style={{ padding: "10px 14px 14px", flexShrink: 0 }}>
                  <TerminalPrompt />
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                background: c.appBg,
                transition: "background 0.3s",
              }}
            >
              <WelcomeScreen />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
