import { useState, useRef, useCallback } from "react";
import usePromptStore from "../../store/usePromptStore";
import { getShellColors } from "../../utils/shellColors";
import Icon from "../shared/Icon";
import ScissorsMascot from "../shared/ScissorsMascot";

const ADMIN_PASSWORD = "craft";
const CLICK_THRESHOLD = 3;
const CLICK_WINDOW = 800;

export default function TitleBar() {
  const shellMode = usePromptStore((s) => s.shellMode);
  const toggleShellMode = usePromptStore((s) => s.toggleShellMode);
  const resetAll = usePromptStore((s) => s.resetAll);
  const setActiveCategory = usePromptStore((s) => s.setActiveCategory);
  const setAdminMode = usePromptStore((s) => s.setAdminMode);
  const isLight = shellMode === "light";
  const c = getShellColors(isLight);

  // Easter egg: rapid clicks on mascot → password prompt
  const clickTimestamps = useRef([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const inputRef = useRef(null);

  const handleMascotClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current
      .filter((t) => now - t < CLICK_WINDOW)
      .concat(now);

    if (clickTimestamps.current.length >= CLICK_THRESHOLD) {
      clickTimestamps.current = [];
      setShowPasswordModal(true);
      setPasswordValue("");
      setPasswordError(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, []);

  const handlePasswordSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (passwordValue.toLowerCase().trim() === ADMIN_PASSWORD) {
        setShowPasswordModal(false);
        setPasswordValue("");
        setAdminMode(true);
      } else {
        setPasswordError(true);
        setPasswordValue("");
        setTimeout(() => setPasswordError(false), 1500);
      }
    },
    [passwordValue, setAdminMode]
  );

  return (
    <>
      <div
        style={{
          padding: "16px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            onClick={handleMascotClick}
            style={{ cursor: "default", userSelect: "none" }}
          >
            <ScissorsMascot size={32} expression="classic" />
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "'Outfit',sans-serif",
                color: c.text,
                letterSpacing: "-0.02em",
              }}
            >
              Pintuck
            </div>
            <div style={{ fontSize: 10, color: c.muted, marginTop: -1 }}>
              Craft the vibe. Copy the prompt.
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Reset all */}
          <button
            onClick={() => { resetAll(); setActiveCategory("appType"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${c.panelBorder}`,
              background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
              cursor: "pointer",
              fontFamily: "inherit",
              color: c.muted,
              fontSize: 10,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            <Icon name="refresh" size={13} color={c.muted} />
            Reset All
          </button>

          {/* Shell light/dark toggle */}
          <button
            onClick={toggleShellMode}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${c.panelBorder}`,
              background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
              cursor: "pointer",
              fontFamily: "inherit",
              color: c.muted,
              fontSize: 10,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            <Icon
              name={isLight ? "sun" : "moon"}
              size={13}
              color={isLight ? "#f59e0b" : "#818cf8"}
            />
            {isLight ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Password modal overlay */}
      {showPasswordModal && (
        <div
          onClick={() => setShowPasswordModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handlePasswordSubmit}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isLight ? "#fff" : "#1a1d25",
              border: `1px solid ${isLight ? "#e5e7eb" : "#2d3348"}`,
              borderRadius: 14,
              padding: "28px 32px",
              width: 320,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>
                Access Required
              </div>
              <div style={{ fontSize: 11, color: c.muted, marginTop: 4 }}>
                Enter the password to continue
              </div>
            </div>
            <input
              ref={inputRef}
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Password"
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: `1.5px solid ${passwordError ? "#ef4444" : isLight ? "#e5e7eb" : "#2d3348"}`,
                background: isLight ? "#f9fafb" : "#111318",
                color: c.text,
                fontSize: 13,
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
              }}
            />
            {passwordError && (
              <div style={{ fontSize: 11, color: "#ef4444", textAlign: "center", marginTop: -8 }}>
                Wrong password
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 8,
                  border: `1px solid ${isLight ? "#e5e7eb" : "#2d3348"}`,
                  background: "transparent",
                  color: c.muted,
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 8,
                  border: "none",
                  background: "#818cf8",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
