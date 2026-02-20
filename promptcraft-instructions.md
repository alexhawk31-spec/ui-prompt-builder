# PromptCraft — Claude Code Upgrade Instructions

## Overview

We're overhauling the layout and UX of an existing UI Prompt Builder app. The app gets a proper identity ("PromptCraft"), a light/dark shell mode toggle, a 60/40 config-to-preview split where neither overlaps the other, and a terminal-style prompt dock at the bottom.

## Reference Files

Drop ALL of these into the project root before starting:

- `promptcraft-layout.jsx` — **THE PRIMARY REFERENCE.** The complete finalized layout. Read this first and match it exactly. It has the app branding, light/dark shell toggle, nav strip, 60/40 config/preview split, section headers, terminal prompt, and all color tokens for both modes.
- `mood-selector-final.jsx` — Finalized mood selector (pills + color-coded fine-tune cards + tooltips)
- `theme-selector-final.jsx` — Finalized theme selector (split preview concept — but NOTE: the theme section no longer has its own preview. It only has controls. The single evolving preview on the right replaces all section-specific previews.)
- `ui-prompt-builder-v2.jsx` — Original prototype (prompt generation logic, data models, step data)

---

## The Layout

```
┌─────────────────────────────────────────────────────────┐
│  [icon] PromptCraft                    [☀ Light Mode]  │
│         Build UI prompts visually                       │
├──────┬──────────────────────────┬───────────────────────┤
│      │ [🎨] Theme               │                       │
│ Nav  │  Colors & palette   [✓] │  ┌─ LIVE PREVIEW ──┐  │
│ Strip│─────────────────────────│  │                   │  │
│      │                          │  │   Dashboard       │  │
│ 58px │  Config controls         │  │   with real       │  │
│      │  (theme pills, mood      │  │   theme colors    │  │
│      │   cards, accent picker)  │  │   applied         │  │
│      │                          │  │                   │  │
│      │  Scrolls independently   │  │  Indigo border    │  │
│      │                          │  │  matching nav     │  │
│      │         60%              │  └───────────────────┘  │
│      │                          │          40%            │
│ [≡]  ├──────────────────────────┴───────────────────────┤
│  1   │ ●●● prompt-output  ^   1 section · ~140   [Copy]│
│      │ $ --visual-theme                                  │
│      │   Neon Cyber, accent: "#00f5d4"                  │
└──────┴──────────────────────────────────────────────────┘
```

### App Title Bar (above the frame)
- PromptCraft logo: 32px square, gradient (#4338ca → #6366f1), wand icon inside, rounded corners, subtle shadow
- App name: "PromptCraft" — 16px, weight 800, tight letter spacing
- Tagline: "Build UI prompts visually" — 10px, muted
- Right side: Light/Dark shell toggle — pill button with sun/moon icon, border radius 20

### Nav Strip (58px, left)
- Gradient: `linear-gradient(180deg, #4338ca, #3730a3, #312e81)` (dark mode) or `linear-gradient(180deg, #4f46e5, #4338ca, #3730a3)` (light mode — slightly brighter)
- 9 step icons stacked, 38×38px buttons with 10px radius
- Active: frosted white bg + white left indicator bar (3px × 16px)
- Configured: green dot badge (#6ee7b7, top-right)
- Summary button at bottom with green count badge

### Config Panel (flex: 3, left ~60%)
- **Section header at top of config column** (not in a separate header bar):
  - Icon in indigo-tinted square (30×30, rounded 9px, `rgba(129,140,248,0.08)` bg)
  - Section name (17px/700) + subtitle (10px, muted)
  - "Included" / "Include in prompt" toggle button on the right
- Config content below in a visible panel:
  - Background: `rgba(28,32,52,0.7)` dark / `rgba(235,237,245,0.9)` light
  - Border: `rgba(255,255,255,0.08)` dark / `rgba(0,0,0,0.08)` light
  - Border radius: 14px, padding: 20px
- Scrolls independently (overflowY: auto)

### Preview Panel (flex: 2, right ~40%)
- Its own dedicated space — NOT overlapping config, NOT a floating element
- Indigo border: `2px solid #4338ca`
- Shadow: `0 4px 24px rgba(67,56,202,0.2)`
- Title bar: indigo gradient matching nav, "LIVE PREVIEW" label, expand icon button
- Dashboard content fills the rest and updates reactively from the Zustand store
- Border radius: 14px

### Terminal Prompt Dock (bottom, full width)
- Background: `#1e2130` dark / `#f5f6fa` light
- Border: `rgba(129,140,248,0.15)`
- Title bar: traffic light dots, "prompt-output" in mono, chevron toggle, section count, token count, Copy button
- Expanded: CLI-style output with colored flags
- Collapsed: one-liner command
- Collapsible via title bar click

### CRITICAL: No Duplicate Previews
- There is ONE preview in the entire app — the persistent panel on the right
- Individual sections (Theme, Mood, Layout, etc.) do NOT have their own preview cards
- The Theme section only has: dark/light toggle, theme pills, color breakdown with hex values, accent color picker
- The Mood section only has: mood pills, fine-tune toggle, tuning cards
- Every section is controls only — the preview on the right reflects all selections

---

## Light/Dark Shell Mode

The app has TWO concepts of light/dark:
1. **Shell mode** — controls the app chrome (nav, config panel, terminal, backgrounds). Toggled by the user via the pill button in the title bar. This is for accessibility — people who struggle with dark mode.
2. **Theme selection** — the user's design choice for their output UI. Selected via the theme pills inside the config. This ONLY affects the preview dashboard.

These are independent. You can have a light shell with a dark preview, or a dark shell with a light preview.

### Shell Color Tokens

**Dark shell:**
- Page: `#080b14`
- App background: `#0e1118`
- Config panel: `rgba(28,32,52,0.7)` with `rgba(255,255,255,0.08)` border
- Text: `#F0EDE6`
- Muted text: `rgba(240,237,230,0.35)`
- Terminal bg: `#1e2130`
- Terminal border: `rgba(129,140,248,0.15)`

**Light shell:**
- Page: `#f0f1f5`
- App background: `#ffffff`
- Config panel: `rgba(235,237,245,0.9)` with `rgba(0,0,0,0.08)` border
- Text: `#1a1a2e`
- Muted text: `rgba(26,26,46,0.45)`
- Terminal bg: `#f5f6fa`
- Terminal border: `rgba(67,56,202,0.15)`
- Included button: `rgba(16,185,129,0.08)` bg, `#059669` text

Store the shell mode in Zustand. Create a `getShellColors(isLight)` utility that returns all tokens. Every component reads from these tokens — no hardcoded colors.

---

## Upgrade Prompts

### Prompt 1: Read References and Plan

```
I need to overhaul this app's layout. Read these files in the project root before doing anything:

1. promptcraft-layout.jsx — The finalized layout with everything: app branding, light/dark shell toggle, 60/40 split, section headers, terminal. Match this exactly.
2. mood-selector-final.jsx — Mood selector design reference
3. theme-selector-final.jsx — Theme selector design reference (note: the theme section NO LONGER has its own preview — only controls)

The app is being renamed to "PromptCraft" with a proper title bar and branding.

Key changes from the current app:
- App title bar with PromptCraft branding + light/dark shell toggle
- Nav strip stays but loses the wand icon at top (it moves to the title bar)
- Content area becomes a 60/40 split: config left (scrollable), preview right (fixed, own space)
- Preview has indigo border matching the nav strip — it's the ONLY preview in the app
- All section-specific previews are removed — sections only have controls
- Terminal stays at the bottom
- The entire shell supports light and dark mode via a color token system

As a principal engineer, tell me the plan: what files change, what's new, what gets deleted, and the updated directory structure. Don't write code yet.
```

### Prompt 2: Shell Color Token System

```
Before touching any components, create the shell color token system. This is the foundation everything else builds on.

Create a utility function getShellColors(isLight) that returns an object with every color token the app needs:
- page, appBg, panelBg, panelBorder, headerBg, headerBorder
- text, muted, dim
- termBg, termBorder, termBarBg
- includedBg, includedColor
- navGrad

Add shellMode (boolean) to the Zustand store with a toggleShellMode action.

Read promptcraft-layout.jsx for the exact color values for both modes. Every component will import these tokens — no hardcoded colors anywhere.
```

### Prompt 3: Replace the App Shell

```
Replace the current app shell with the new layout from promptcraft-layout.jsx. This means:

1. Add the PromptCraft title bar above the app frame — logo icon (32px, gradient square, wand inside), app name, tagline, and the light/dark shell toggle pill button on the right
2. Replace the content area with a 60/40 flex split (config flex:3, preview flex:2)
3. The config panel has the section header INSIDE it — icon in indigo square + section name + subtitle + Included toggle. Below that is the scrollable config content in a visible panel (rounded, bordered, padded)
4. The preview panel is its own space on the right — indigo border (2px solid #4338ca), gradient title bar, expand button, dashboard content
5. Terminal stays at the bottom, full width

Every surface should read its colors from getShellColors. The light/dark toggle should instantly swap the entire shell.

CRITICAL: The preview is the ONLY preview. Remove any preview components that exist inside individual sections (theme preview, mood preview, etc.). Sections are controls only.

Keep files componentized and small. The title bar, config panel wrapper, preview panel, and terminal should each be their own component.
```

### Prompt 4: Wire Preview to Store

```
The evolving preview dashboard in the right panel needs to read real values from the Zustand store and reflect them visually.

- Theme selection → preview uses that theme's background, card, accent, and text colors
- Mood tuning → preview density (padding/gap), typography (font weight/size), interaction (hover behavior), embellishment (blur/glow)
- Layout selection → show/hide sidebar nav in preview
- Components → change number of stat card columns
- Animation → toggle CSS transitions
- Border → apply border radius

The preview should feel alive — every change the user makes in the config panel should immediately show in the preview. Read the EvolvingPreview and Dash components in promptcraft-layout.jsx for the exact property mapping.

IMPORTANT: The preview color palette comes ONLY from theme selection. Mood, layout, components, etc. only change structural properties — not colors.
```

### Prompt 5: Integrate Section Components

```
Integrate the existing section components into the new config panel layout. Each section renders in the left 60% when its nav icon is active.

Rules:
- Theme section: dark/light toggle, theme pills with swatch previews, color breakdown (4 hex values with blocks), accent color gradient picker + quick-pick circles. NO preview card inside.
- Mood section: mood pills, fine-tune toggle, expandable panel with 4 color-coded TuningCards. NO preview inside.
- All other sections: their existing controls. NO previews inside any of them.
- Use Framer Motion AnimatePresence for smooth section swaps

Read mood-selector-final.jsx for the mood section design. The theme section design is in promptcraft-layout.jsx (the TC component).
```

### Prompt 6: Wire Terminal to Prompt Generator

```
Connect the terminal prompt dock to the real prompt generation logic.

Each configured section appears as:
$ --section-flag
  actual generated prompt text

Section flags use the section's color from the step data. The prompt text comes from the existing prompt generator reading from the Zustand store.

Wire up:
- Token count estimate (character count / 4)
- Section count from configured sections
- Copy button copies the full markdown prompt to clipboard
- Info button toggles an explainer about how the prompt works
- Expanded/collapsed state with smooth transition

The terminal must look visually distinct from the config panel — different background color in both light and dark modes.
```

### Prompt 7: Polish Pass

```
As a principal UI designer, do a final polish pass:

1. Light mode: make sure every surface has enough contrast. The config panel should be clearly distinct from the app background. The terminal should feel different from the config.
2. Nav strip: smooth hover states, tooltip on hover
3. Section transitions: Framer Motion slide + fade when switching sections
4. Preview: smooth color/property transitions when values change (0.3s ease)
5. Terminal: blinking cursor animation, smooth expand/collapse
6. Summary overlay: Framer Motion entrance/exit (backdrop fade, card slide up)
7. Shell mode toggle: smooth 0.3s transition on all surfaces when switching light/dark
8. Test every theme — make sure the preview looks good with all 5+ color palettes

Commit and push when done.
```

---

## Architecture Notes

### Zustand Store Shape
```js
{
  // Shell
  shellMode: 'dark', // 'light' | 'dark'

  // Navigation
  activeStep: 'theme',
  configuredSections: ['theme'], // which sections are included in prompt

  // Theme
  selectedTheme: { id, name, swatches },
  themeMode: 'dark', // the user's OUTPUT theme mode, not shell mode

  // Mood
  selectedMood: 'professional',
  moodTuning: { density, typography, interaction, embellishment },
  moodCustomized: {},

  // Layout, Components, Animation, Border, etc.
  // ... each section's state

  // Actions
  toggleShellMode(),
  setActiveStep(id),
  toggleConfigured(id),
  selectTheme(theme),
  selectMood(id),
  updateTuning(key, val),
  // etc.
}
```

### Component Structure
```
src/
├── components/
│   ├── Shell/
│   │   ├── TitleBar.jsx          # PromptCraft branding + light/dark toggle
│   │   ├── NavStrip.jsx          # Indigo gradient nav
│   │   ├── ConfigPanel.jsx       # Left 60% wrapper with section header
│   │   ├── PreviewPanel.jsx      # Right 40% with indigo border
│   │   ├── TerminalDock.jsx      # Bottom terminal
│   │   └── SummaryOverlay.jsx    # Modal with all selections
│   ├── ThemeSelector/
│   │   ├── index.jsx             # Controls only — NO preview
│   │   └── constants.js
│   ├── MoodSelector/
│   │   ├── index.jsx
│   │   ├── MoodPills.jsx
│   │   ├── FineTunePanel.jsx
│   │   ├── TuningCard.jsx
│   │   └── constants.js
│   ├── Preview/
│   │   └── EvolvingDashboard.jsx # The single persistent preview
│   └── shared/
│       ├── Tooltip.jsx
│       ├── PillButton.jsx
│       └── Icons.jsx
├── store/
│   ├── index.js                  # Combined store
│   └── slices/
│       ├── shellSlice.js
│       ├── themeSlice.js
│       ├── moodSlice.js
│       └── ...
├── utils/
│   ├── shellColors.js            # getShellColors(isLight)
│   └── promptGenerator.js
└── App.jsx
```

### Key Rules
- `getShellColors()` is the single source of truth for all shell colors
- Every component destructures colors from this utility — zero hardcoded color values
- The preview panel reads from the store and reflects real selections
- Shell mode (light/dark) and theme selection (user's output theme) are completely independent
- There is exactly ONE preview component in the entire app
- Sections render controls only — no embedded previews

---

## Common Mistakes to Avoid

- **Don't put a preview inside the theme section.** The old design had one. The new design does not. The single preview on the right replaces it.
- **Don't confuse shell mode with theme mode.** Shell mode = app chrome accessibility. Theme mode = user's design choice for their output.
- **Don't hardcode colors.** Use getShellColors() everywhere. If you see a hex value in a component that isn't a section-specific accent color, it should be coming from the token system.
- **Don't make the config panel the same shade as the app background.** It needs a visible, distinct surface — especially in light mode.
- **Don't let the preview overlap the config.** They're siblings in a flex row, each with their own space.
- **Don't forget the indigo border on the preview.** It's `2px solid #4338ca` — this visually connects it to the nav strip.
- **Don't skip the section header inside the config panel.** The icon + name + subtitle + Included toggle should be at the top of the config column, not in a separate app-level header bar.
