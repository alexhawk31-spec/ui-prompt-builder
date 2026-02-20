# UI Prompt Builder — Claude Code Upgrade Instructions

## Overview

We're overhauling the layout and UX of an existing UI Prompt Builder app. The current app works but has layout problems: the left sidebar nav wastes space, the prompt output is hidden, and the whole thing feels like a settings panel. This upgrade replaces the layout with a three-zone approach — colored nav strip, full-width content, and a terminal-style prompt dock.

## Reference Files

Drop ALL of these into the project root before starting:

- `option-g-refined.jsx` — **THE PRIMARY REFERENCE.** This is the finalized app shell layout. Read this first. It contains the nav strip, content area, terminal prompt, summary overlay, and evolving preview — all working together as a single-file React prototype.
- `theme-selector-final.jsx` — Finalized theme selector (split preview, dark/light toggle, accent color picker)
- `mood-selector-final.jsx` — Finalized mood selector (pills + color-coded fine-tune cards + live structural preview)
- `ui-prompt-builder-v2.jsx` — Original prototype (prompt generation logic, data models, step data)

---

## The New Layout

The app is now a three-zone layout:

```
┌──────┬────────────────────────────────────────────┐
│      │  Header: Section title + "Included" toggle │
│ Nav  ├────────────────────────┬───────────────────┤
│ Strip│                        │                   │
│      │  Section Options       │  Live Preview     │
│ 68px │  (theme picker, mood   │  (evolving mini   │
│      │   cards, etc.)         │   dashboard)      │
│      │                        │                   │
│      ├────────────────────────┴───────────────────┤
│      │  Terminal Prompt Dock                       │
│ [Sum]│  (collapsible, CLI-style output)           │
└──────┴────────────────────────────────────────────┘
```

### Zone 1: Indigo Nav Strip (68px, left)
- Deep indigo gradient background (`#4338ca` → `#3730a3` → `#312e81`)
- Wand icon at top as the app logo
- 9 step icons stacked vertically, each with:
  - Active state: white frosted background (`rgba(255,255,255,0.15)`), white left indicator bar, white icon
  - Configured state: brighter icon (`rgba(255,255,255,0.7)`) + green dot badge (top-right, `#6ee7b7`)
  - Unconfigured: dim icon (`rgba(255,255,255,0.25)`)
- **Summary button at bottom**: list icon with green count badge. Opens a modal overlay showing all 9 sections with status.
- No labels — icon-only. The tooltip on hover shows the name.

### Zone 2: Main Content Area (flex, center-right)
- Background: `#0e1118`
- **Header bar** at top: section title (18px/700) + subtitle + "Included" / "Include in prompt" toggle button (green when active)
- **Content splits horizontally**:
  - Left (flex: 1): The section's configuration UI (theme picker, mood cards, layout options, etc.)
  - Right (280px, fixed): The evolving live preview
- Below the content: the terminal prompt dock

### Zone 3: Terminal Prompt Dock (bottom of main area)
- Visually distinct from the content — lighter background (`#1e2130`), indigo-tinted border, subtle drop shadow, gradient title bar
- **Title bar**: macOS traffic light dots (red/yellow/green), "prompt-output" label in mono, chevron toggle, section count, token estimate, info button, Copy button
- **Expanded state**: CLI-style output with green `$` prompts, colored `--flag` names per section, values indented below. Blinking cursor at the end.
- **Collapsed state**: Single-line command showing all flags inline
- **Info button**: Toggles an explainer panel that says "Each section gives the AI concrete values — hex codes, pixel sizes, font names — instead of vague descriptions..."
- Collapsible via clicking the title bar

### Summary Overlay (modal)
- Triggered by the list button at bottom of nav strip
- Full-screen overlay with backdrop blur
- Centered card (560px max) showing all 9 sections:
  - Configured: checkmark icon in section color, label, value preview, glowing dot
  - Not configured: dimmed, "Not configured" text
- Gradient progress bar at bottom
- Close via X button

### Evolving Preview
- A single persistent mini-dashboard that changes structurally as sections are configured:
  - **No config**: Gray wireframe with "Start configuring to watch it evolve" text
  - **+Theme**: Background goes dark (#0B0F19), cards get dark surfaces, accent color appears
  - **+Mood**: Font weight increases to 700, padding tightens
  - **+Layout**: Sidebar nav appears in the preview
  - **+Components**: Stat cards go from 2 to 3 columns
  - **+Animation**: All transitions become smooth (0.3s ease)
  - **+Border**: Corner radius jumps from 3px to 12px
- Uses a fixed neutral color palette (no mood colors) — structural changes only

---

## Upgrade Prompts

### Prompt 1: Read References and Plan

```
I need to overhaul the layout of this existing UI Prompt Builder app. Read these reference files in the project root before doing anything:

1. option-g-refined.jsx — This is the new app shell layout. Study the three-zone structure (indigo nav strip, main content area, terminal prompt dock), the summary overlay, and the evolving preview component.
2. theme-selector-final.jsx — The finalized theme selector design
3. mood-selector-final.jsx — The finalized mood/feel selector design

The current app has a left sidebar navigator and a hidden prompt output. We're replacing that with:
- A 68px indigo gradient nav strip (icon-only, with summary button at bottom)
- A full-width content area that splits horizontally (section options left, evolving preview right)
- A terminal-style prompt dock at the bottom that looks like a real terminal with traffic lights, CLI-style output, and a collapsible title bar
- A summary overlay modal triggered from the nav strip

As a principal engineer, plan the upgrade. Tell me what files need to change, what new components need to be created, and what the updated directory structure should look like. Don't write any code yet — just give me the plan.
```

### Prompt 2: Replace the App Shell

```
As a principal engineer, replace the current app shell layout with the new three-zone layout from option-g-refined.jsx. This means:

1. Replace the current sidebar navigator with the indigo gradient nav strip (68px, icon-only)
2. Replace the current content area with the new split layout (options left, evolving preview right)  
3. Create the terminal prompt dock component and place it at the bottom of the main area
4. Create the summary overlay modal component
5. Create the evolving preview component
6. Wire up the Zustand store so clicking nav icons changes the active section, and the "Included" toggle adds/removes sections from the prompt

Keep the existing section components (ThemeSelector, MoodSelector, etc.) — just change how they're laid out in the shell. Read option-g-refined.jsx for the exact visual design — match the colors, spacing, and interaction patterns precisely.

Remember to keep files componentized and relatively small. The terminal prompt, summary overlay, evolving preview, and nav strip should each be their own component.
```

### Prompt 3: Wire Terminal to Prompt Generator

```
Connect the terminal prompt dock to the actual prompt generation logic. Right now the terminal shows placeholder text — it should show the real generated prompt output, formatted as CLI-style sections.

Each configured section should appear as:
$ --section-flag
  actual generated prompt text for that section

The section flags should use the section colors from the nav step data. The prompt text should come from the existing prompt generator utility that reads from the Zustand store.

Also wire up:
- The token count estimate (rough character count / 4)
- The section count (from configured sections in store)
- The Copy button (copies the full markdown prompt to clipboard)
- The info button explainer text
```

### Prompt 4: Integrate Existing Section Components

```
Now integrate the existing section components (ThemeSelector, MoodSelector, LayoutSelector, etc.) into the new layout. Each section's content should render in the left panel of the content split when its nav icon is active.

Make sure:
- The theme selector still has its split preview layout (it replaces the evolving preview when the theme step is active, or sits inside the options panel — use your judgment on which feels better)
- The mood selector still has its pills + fine-tune cards + live preview
- All other sections keep their existing functionality
- The "Included" toggle in the header correctly adds/removes each section from the prompt output
- Sections that haven't been touched yet show a friendly empty state in the options panel

As a principal UX designer, make sure the transition between sections feels smooth — use Framer Motion for the content swap animation.
```

### Prompt 5: Evolving Preview Logic

```
Enhance the evolving preview so it actually reads from the Zustand store and reflects real selections, not just boolean on/off. Specifically:

- Theme: Apply the user's selected theme colors (background, card, accent, text)
- Mood: Apply the selected density (padding/gap changes), typography weight, and interaction style
- Layout: Show/hide the sidebar nav in the preview based on layout selection
- Components: Change the number of stat cards based on component selections
- Animation: Toggle CSS transitions on/off
- Border: Apply the selected border radius

The preview should be a real reflection of what their generated UI will look like — not just a rough approximation.
```

### Prompt 6: Polish Pass

```
As a principal UI designer, do a polish pass on the entire app:

1. Nav strip: Add hover states (subtle white background), tooltip on hover showing the step name, smooth transitions on the active indicator bar
2. Terminal: Add a subtle typing animation when new sections appear, make the blinking cursor pulse smoothly
3. Summary overlay: Add Framer Motion entrance/exit animations (backdrop fade, card slide-up)
4. Evolving preview: Add smooth cross-fade transitions when properties change
5. Content area: Add Framer Motion AnimatePresence for section swaps (slide + fade)
6. Overall: Make sure the indigo nav strip gradient looks great, the terminal feels like a real terminal, and everything has consistent border radius, spacing, and shadow depth

Commit and push when done.
```

---

## Design Consistency Guide

### Color Palette
- **Nav strip**: `linear-gradient(180deg, #4338ca, #3730a3, #312e81)` — deep indigo
- **Main background**: `#0e1118` — near-black
- **Terminal background**: `#1e2130` — noticeably lighter than content, reads as its own zone
- **Terminal title bar**: `rgba(129,140,248,0.06)` gradient tint
- **Terminal border**: `rgba(129,140,248,0.15)` — indigo tint, clearly visible
- **Cards/panels in content**: `rgba(26,31,46,0.3)` with `rgba(255,255,255,0.04)` border
- **Text primary**: `#F0EDE6`
- **Text muted**: `rgba(240,237,230,0.3)`
- **Accent (configured indicator)**: `#6ee7b7` (green)
- **Accent (prompt/terminal)**: `#818cf8` (indigo)
- **Page background (behind app frame)**: `#080b14`

### Section Colors (used in nav dots, terminal flags, summary)
- Theme: `#818cf8`
- Mood: `#a78bfa`
- Layout: `#67e8f9`
- Components: `#6ee7b7`
- Animation: `#fbbf24`
- Borders: `#f9a8d4`
- App Info: `#5eead4`
- AWS: `#fdba74`
- Notes: `#94a3b8`

### Nav Strip Patterns
- Icon-only, 42x42px buttons with 12px border radius
- Active: `rgba(255,255,255,0.15)` background + white left bar (3px wide, 20px tall, rounded)
- Configured (not active): green dot badge (6px, top-right, `#6ee7b7` with indigo border)
- Unconfigured: dim icon at 25% white
- Summary button: at very bottom, separated by flex spacer, has green count badge

### Terminal Patterns
- macOS traffic light dots: `#ff5f57`, `#febc2e`, `#28c840` (8px circles)
- Mono font: `JetBrains Mono` throughout terminal
- CLI prompt: green `$` + `--flag-name` in section color + indented values in dim text
- Blinking cursor: indigo-tinted (`rgba(129,140,248,0.4)`), 1s step-end blink
- Collapsed: single line with inline flags
- Info explainer: indigo-tinted card inside terminal

### Interactive Element Patterns (carried from theme/mood selectors)
- **Selection pills**: `borderRadius: 10`, `padding: 9px 16px`, `fontSize: 12`, `fontWeight: 600`
- **Fine-tune toggle**: "Fine-tune" with sliders icon + chevron, expands a lighter panel
- **Fine-tune cards**: Color-coded per category (blue, purple, amber, green), tinted background at 6% opacity, option pills with hover tooltips
- **Hover tooltips**: Light background (`rgba(240,237,230,0.95)`), dark text, `borderRadius: 8`, `fontSize: 11`, max-width 200px

### Summary Overlay Patterns
- Full-screen backdrop: `rgba(8,10,18,0.85)` with `backdrop-filter: blur(12px)`
- Centered card: 560px max, `borderRadius: 18`, dark gradient background
- Section rows: 10px 14px padding, rounded, color-coded left border when configured
- Progress bar: gradient from indigo to cyan

---

## Key Architecture Notes

- **Zustand store** needs a new `configuredSections` set (or array) tracking which sections are included in the prompt. This is separate from "which section has the user edited" — a user might configure theme but choose not to include it.
- **The prompt generator** should only include sections that are in `configuredSections`
- **The terminal prompt component** reads from the store and formats each configured section as CLI-style output
- **The evolving preview** reads from the store and maps real values to visual properties
- **The summary overlay** reads from the store and shows status for all 9 sections
- **Shared components**: Tooltip, SectionHeader, PillSelector, TuningCard, ColorCodedCard should be in a `shared/` folder
- **Framer Motion** for: nav icon hover states, content section transitions (AnimatePresence), summary overlay entrance, terminal expand/collapse

---

## Tips

- The most important reference file is `option-g-refined.jsx` — it has the exact layout, colors, spacing, and interaction patterns for the app shell. Match it precisely.
- The theme and mood selectors have their own reference files with much more detail than option-g shows. Use those for the actual section content.
- When debugging, only include code from files you recognize. Don't chase node_modules stack traces.
- Right click a file → "Copy Relative Path" to be specific in prompts.
- If the conversation gets long, remind Claude Code: "you are a principal engineer / UX designer", "keep code relatively small", "don't over engineer."
- The terminal prompt must look visually distinct from the content area — if it blends in, the background isn't light enough or the border isn't strong enough.
- Test by toggling sections on/off and watching the terminal, summary, and evolving preview all update.
