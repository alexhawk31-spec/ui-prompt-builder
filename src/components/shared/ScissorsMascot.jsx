/**
 * Scissors mascot — Pintuck's brand character.
 *
 * Expressions:
 *  - classic: both eyes open, small smile
 *  - winking: upper eye is a wink arc, lower open, bigger smile
 *  - curious: eyes looking sideways, "O" mouth
 *  - celebrating: happy squint arcs, blush, big grin, confetti
 *  - determined: angled brows, focused eyes, smirk
 *  - thinking: eyes upward, flat mouth, thought bubbles
 */
export default function ScissorsMascot({ size = 72, expression = "classic", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      style={style}
    >
      {/* ── Upper handle ring ── */}
      <circle cx="158" cy="36" r="22" stroke="url(#sm-handles)" strokeWidth="3.5" fill="none" />

      {/* ── Upper eye (expression-dependent) ── */}
      <UpperEye expression={expression} />

      {/* ── Upper neck ── */}
      <path d="M142,54 L128,80" stroke="url(#sm-handles)" strokeWidth="6" strokeLinecap="round" />

      {/* ── Lower handle ring ── */}
      <circle cx="62" cy="62" r="24" stroke="url(#sm-handles)" strokeWidth="3.5" fill="none" />

      {/* ── Lower eye (expression-dependent) ── */}
      <LowerEye expression={expression} />

      {/* ── Lower neck ── */}
      <path d="M82,78 L108,96" stroke="url(#sm-handles)" strokeWidth="6" strokeLinecap="round" />

      {/* ── Pivot screw ── */}
      <circle cx="118" cy="100" r="8" fill="url(#sm-blades)" />
      <circle cx="118" cy="100" r="4.5" fill="rgba(255,255,255,0.15)" />
      <circle cx="118" cy="100" r="2" fill="rgba(255,255,255,0.25)" />

      {/* ── Right blade ── */}
      <path
        d="M126,96 L134,90 C144,98 158,114 170,134 L184,160 L192,180 L196,194 C198,200 194,204 188,202 L184,198 L178,184 C168,164 154,140 140,120 L128,106 Z"
        fill="url(#sm-blades)"
      />

      {/* ── Left blade ── */}
      <path
        d="M110,96 L102,90 C92,98 78,114 66,134 L52,160 L44,180 L40,194 C38,200 42,204 48,202 L52,198 L58,184 C68,164 82,140 96,120 L108,106 Z"
        fill="url(#sm-blades)"
        opacity="0.88"
      />

      {/* ── Mouth (expression-dependent) ── */}
      <Mouth expression={expression} />

      {/* ── Extra details (expression-dependent) ── */}
      <ExtraDetails expression={expression} />

      {/* ── Gradients ── */}
      <defs>
        <linearGradient id="sm-handles" x1="40" y1="14" x2="160" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
        <linearGradient id="sm-blades" x1="40" y1="90" x2="196" y2="204" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4338ca" />
          <stop offset="0.4" stopColor="#6366f1" />
          <stop offset="0.75" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Eye sub-components ── */

function UpperEye({ expression }) {
  switch (expression) {
    case "winking":
      // Wink arc
      return (
        <path d="M148,34 Q158,28 168,34" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" fill="none" />
      );
    case "celebrating":
      // Happy squint arc
      return (
        <path d="M149,34 Q158,28 167,34" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      );
    case "thinking":
      // Eyes looking up
      return (
        <>
          <ellipse cx="158" cy="34" rx="8" ry="9" fill="white" />
          <ellipse cx="158" cy="30" rx="4.5" ry="5.5" fill="#1a1a2e" />
          <circle cx="160" cy="28" r="2.2" fill="white" />
        </>
      );
    case "curious":
      // Looking sideways
      return (
        <>
          <ellipse cx="158" cy="36" rx="8" ry="9" fill="white" />
          <ellipse cx="163" cy="35" rx="4.5" ry="5.5" fill="#1a1a2e" />
          <circle cx="165" cy="33" r="2.2" fill="white" />
        </>
      );
    case "determined":
      // Focused eyes + brow
      return (
        <>
          <line x1="147" y1="22" x2="168" y2="25" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="158" cy="36" rx="8" ry="9" fill="white" />
          <ellipse cx="161" cy="35" rx="5" ry="6" fill="#1a1a2e" />
          <circle cx="163" cy="33" r="2.2" fill="white" />
        </>
      );
    default:
      // Classic — both eyes open
      return (
        <>
          <ellipse cx="158" cy="36" rx="8" ry="9" fill="white" />
          <ellipse cx="161" cy="34" rx="4.5" ry="5.5" fill="#1a1a2e" />
          <circle cx="163" cy="32" r="2.2" fill="white" />
        </>
      );
  }
}

function LowerEye({ expression }) {
  switch (expression) {
    case "celebrating":
      // Happy squint arc (slightly larger)
      return (
        <path d="M52,60 Q62,53 72,60" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      );
    case "thinking":
      // Eyes looking up
      return (
        <>
          <ellipse cx="62" cy="60" rx="10" ry="11" fill="white" />
          <ellipse cx="62" cy="55" rx="5.5" ry="6.5" fill="#1a1a2e" />
          <circle cx="64.5" cy="53" r="2.8" fill="white" />
        </>
      );
    case "curious":
      // Looking sideways, extra large
      return (
        <>
          <ellipse cx="62" cy="62" rx="11" ry="12" fill="white" />
          <ellipse cx="68" cy="61" rx="6" ry="7" fill="#1a1a2e" />
          <circle cx="70.5" cy="58.5" r="3" fill="white" />
        </>
      );
    case "determined":
      // Focused + brow
      return (
        <>
          <line x1="50" y1="48" x2="72" y2="50" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="62" cy="62" rx="10" ry="11" fill="white" />
          <ellipse cx="65" cy="60" rx="5.5" ry="6.5" fill="#1a1a2e" />
          <circle cx="67.5" cy="57" r="2.8" fill="white" />
        </>
      );
    default:
      // Classic + winking — lower eye always open
      return (
        <>
          <ellipse cx="62" cy="62" rx="10" ry="11" fill="white" />
          <ellipse cx="65" cy="60" rx="5.5" ry="6.5" fill="#1a1a2e" />
          <circle cx="67.5" cy="57" r="2.8" fill="white" />
        </>
      );
  }
}

function Mouth({ expression }) {
  switch (expression) {
    case "winking":
      // Bigger smile
      return (
        <path d="M108,114 Q118,126 128,114" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75" />
      );
    case "curious":
      // "O" mouth
      return (
        <ellipse cx="118" cy="118" rx="4" ry="5" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
      );
    case "celebrating":
      // Big grin
      return (
        <path d="M106,113 Q118,130 130,113" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      );
    case "determined":
      // Smirk
      return (
        <path d="M112,116 Q120,120 128,115" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      );
    case "thinking":
      // Flat line
      return (
        <line x1="112" y1="117" x2="124" y2="117" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      );
    default:
      // Classic — small smile
      return (
        <path d="M110,114 Q118,123 126,114" stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7" />
      );
  }
}

function ExtraDetails({ expression }) {
  switch (expression) {
    case "celebrating":
      // Blush circles + confetti dots
      return (
        <>
          <circle cx="45" cy="72" r="5" fill="#f472b6" opacity="0.3" />
          <circle cx="175" cy="44" r="4" fill="#f472b6" opacity="0.3" />
          {/* Confetti */}
          <circle cx="30" cy="30" r="2" fill="#fbbf24" opacity="0.6" />
          <circle cx="200" cy="20" r="2.5" fill="#6ee7b7" opacity="0.6" />
          <circle cx="190" cy="50" r="1.5" fill="#818cf8" opacity="0.6" />
          <circle cx="40" cy="15" r="1.5" fill="#f472b6" opacity="0.6" />
          <circle cx="210" cy="80" r="2" fill="#fbbf24" opacity="0.5" />
          <circle cx="20" cy="80" r="2" fill="#67e8f9" opacity="0.5" />
        </>
      );
    case "thinking":
      // Thought bubble circles
      return (
        <>
          <circle cx="180" cy="22" r="3" fill="white" opacity="0.2" />
          <circle cx="192" cy="12" r="5" fill="white" opacity="0.15" />
          <circle cx="208" cy="4" r="8" fill="white" opacity="0.1" />
        </>
      );
    default:
      return null;
  }
}
