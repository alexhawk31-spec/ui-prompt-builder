# Mood Selector v4 — Claude Code Build Instructions

## Overview

We're replacing the current Mood & Feel selector in PromptCraft with a completely redesigned version. The old presets (Professional, Playful, Minimal, Data-Dense, Immersive, Editorial) are too similar — they all live in the same visual neighborhood. The new version has 8 presets that are dramatically different archetypes, each rendering the same base dashboard layout through a completely different design lens.

## Reference Files

Before writing any code, read these files:

1. `mood-presets-v4.jsx` — **THE PRIMARY REFERENCE.** This is the finalized mockup with all 8 presets, the unified mini-preview component, prompt preview panel, fine-tune accordion, and quick combos section. Match the visual design precisely.
2. `option-g-refined.jsx` — The app shell layout. The mood selector lives in the left panel of the content split when the Mood nav step is active.
3. `mood-selector-final.jsx` — The OLD mood selector. Use this to understand how it currently integrates with the Zustand store, but replace the visual design entirely with v4.

## What's Changing

### Old → New Presets

| Old | New | Why |
|-----|-----|-----|
| Professional | **Boardroom** | Same vibe, better name, richer config |
| Playful | **Arcade** | Way more distinct — progress rings, bouncy, neon |
| Minimal | **Raw Cut** | Brutalist zero-radius instead of just "clean" |
| Data-Dense | **War Room** | Multi-panel ops density, not just tighter padding |
| Immersive | **Vapor** | Glassmorphism + orbs, dreamy instead of generic |
| Editorial | **Front Page** | Serif + magazine layout, actually editorial |
| _(new)_ | **Hack Mode** | Dense monospace terminal aesthetic |
| _(new)_ | **Midnight Luxe** | Premium dark with gold accents |

### New Preset Data

Each preset maps to the same 4 fine-tune dimensions:

```javascript
const moodPresets = [
  {
    id: "boardroom",
    name: "Boardroom",
    tagline: "Polished. Poised. Pitch-ready.",
    icon: "Briefcase", // Lucide icon name
    density: "balanced",
    typography: "clean",
    interaction: "smooth",
    embellishment: "minimal",
    promptText: "Professional, restrained design. Clean sans-serif, balanced whitespace, muted palette with one accent color. No gradients or glow. Enterprise-ready.",
  },
  {
    id: "hackmode",
    name: "Hack Mode",
    tagline: "Dense. Mono. Zero fluff.",
    icon: "Terminal",
    density: "dense",
    typography: "technical",
    interaction: "snappy",
    embellishment: "none",
    promptText: "Dense, monospace-driven interface. JetBrains Mono everywhere, tight 4-6px spacing, no border-radius, uppercase labels with wide letter-spacing. Terminal aesthetic.",
  },
  {
    id: "frontpage",
    name: "Front Page",
    tagline: "Serif headlines. Generous whitespace.",
    icon: "Type",
    density: "spacious",
    typography: "editorial",
    interaction: "smooth",
    embellishment: "moderate",
    promptText: "Editorial, magazine-quality design. Georgia or serif headlines (italic), generous padding 20px+, elegant dividers. Content-first, typography-driven.",
  },
  {
    id: "arcade",
    name: "Arcade",
    tagline: "Bouncy. Bold. Full personality.",
    icon: "Zap",
    density: "balanced",
    typography: "rounded",
    interaction: "dramatic",
    embellishment: "rich",
    promptText: "Playful, energetic design. Rounded font (Nunito 800), 16-20px border-radius, bouncy hover animations with scale(1.06), vibrant gradients, glassmorphism cards.",
  },
  {
    id: "warroom",
    name: "War Room",
    tagline: "Max density. Real-time everything.",
    icon: "Radar",
    density: "dense",
    typography: "technical",
    interaction: "snappy",
    embellishment: "minimal",
    promptText: "Operations/monitoring density. JetBrains Mono, 3-5px spacing, status indicators, amber/red alert colors, multi-panel grid layout. Information overload by design.",
  },
  {
    id: "rawcut",
    name: "Raw Cut",
    tagline: "No radius. No shadows. No apologies.",
    icon: "Slash",
    density: "balanced",
    typography: "clean",
    interaction: "subtle",
    embellishment: "none",
    promptText: "Brutalist design. Zero border-radius, zero box-shadow, hard 2px borders, stark contrast. Heavy uppercase typography. Anti-decoration as the aesthetic.",
  },
  {
    id: "vapor",
    name: "Vapor",
    tagline: "Frosted layers. Soft glow. Dreamy.",
    icon: "Layers",
    density: "spacious",
    typography: "clean",
    interaction: "smooth",
    embellishment: "rich",
    promptText: "Glassmorphism design. Frosted translucent cards with backdrop-filter blur(20px), layered depth with subtle gradients, soft accent glow, rounded 14-18px radius.",
  },
  {
    id: "midnight",
    name: "Midnight Luxe",
    tagline: "Dark. Rich. Gold-trimmed.",
    icon: "Crown",
    density: "balanced",
    typography: "clean",
    interaction: "smooth",
    embellishment: "moderate",
    promptText: "Premium dark design. Near-black backgrounds (#08090d), warm gold accent (#d4a254), subtle gold-tinted borders, refined spacing. Luxury fintech feel.",
  },
];
```

### Visual Config Per Preset (for the mini-preview)

Each preset has a `visualConfig` object that controls how the unified mini-preview renders. These are the properties — reference `mood-presets-v4.jsx` for exact values per preset:

```javascript
// Visual config shape
{
  bg, card, accent, text, muted, dimmer,  // colors
  radius,                                  // border-radius (0-18)
  font,                                    // font-family string
  headSize, headWeight,                    // title typography
  valSize, valWeight, valFont,             // value typography
  labelSize, labelCase, labelSpacing,      // label typography
  cardPad, gap,                            // spacing
  cardCount, barCount, barGap,             // density
  showNav, showTabs, tabStyle,             // structure
  border, shadow,                          // decoration
  glass, glow, brutalist, light,           // mode flags
  headText, chartLabel,                    // content text
  barAccentStart,                          // chart highlight
  titleDecor,                              // "italic" or ""
}
```

### Key Differences That Must Be Visually Obvious

The mini-preview renders the SAME base layout (header → tabs → stat cards → chart, optional sidebar nav) but these properties create dramatic differences:

| | Boardroom | Hack Mode | Front Page | Arcade | War Room | Raw Cut | Vapor | Midnight Luxe |
|---|---|---|---|---|---|---|---|---|
| **Font** | DM Sans | JetBrains Mono | Georgia (serif) | Nunito | JetBrains Mono | DM Sans | DM Sans | DM Sans |
| **Radius** | 10px | 0px | 4px | 18px | 2px | 0px | 16px | 12px |
| **Cards** | 3 | 4 | 3 | 3 | 4 | 3 | 2 | 3 |
| **Bars** | 14 | 24 | 10 | 12 | 28 | 12 | 12 | 14 |
| **Padding** | 14px | 6px | 20px | 14px | 5px | 12px | 18px | 14px |
| **Sidebar** | No | Yes | No | No | Yes | No | No | No |
| **Tabs** | Pill | None | Underline | Pill | None | Underline bold | Pill | Pill |
| **Theme** | Dark indigo | Black green | Light cream | Dark purple | Navy amber | Light B&W | Dark gradient cyan | Near-black gold |
| **Glass** | No | No | No | Yes | No | No | Yes | No |
| **Title** | "Dashboard" | "> sys_dashboard" | "Dashboard" (italic) | "Dashboard" | "OPS_DASH" | "DASHBOARD" | "Dashboard" | "Dashboard" |

---

## Component Structure

Create these files:

```
src/features/Mood/
├── MoodSelector.jsx          ← Main section component (replaces old one)
├── components/
│   ├── PresetCard.jsx        ← Single preset card with mini-preview
│   ├── MiniPreview.jsx       ← Unified dashboard preview, config-driven
│   ├── PromptPreview.jsx     ← Terminal-style prompt output for selected mood
│   ├── FineTunePanel.jsx     ← Expandable 4-dimension fine-tune accordion
│   └── QuickCombos.jsx       ← Mood + Purpose combo shortcuts
├── constants.js              ← Preset data, visual configs, dimension options, combo data
└── index.js
```

---

## Build Prompts

### Prompt 1: Set Up Structure and Constants

```
As a principal engineer, I'm rebuilding the Mood & Feel selector for PromptCraft. Read the mockup file `mood-presets-v4.jsx` in the project root — this is the exact visual design to match.

First, set up the component structure and constants. Create:
1. `src/features/Mood/constants.js` — All 8 preset definitions (id, name, tagline, icon, 4 dimension values, promptText), all 8 visual config objects, the 4 fine-tune dimensions with their options and colors, and the 6 quick combo definitions
2. `src/features/Mood/index.js` — barrel export
3. Update the Zustand store's mood state to support the new preset IDs and add a `moodPromptText` field

Reference `mood-presets-v4.jsx` for exact data values. Don't write any UI components yet — just the data layer and store integration.
```

### Prompt 2: Build the Mini Preview

```
As a principal UX designer, build the MiniPreview component at `src/features/Mood/components/MiniPreview.jsx`. This is a unified dashboard layout that renders dramatically differently based on a `visualConfig` prop.

Read `mood-presets-v4.jsx` — look at the MiniPreview function. It renders:
- Header row (title + live badge)
- Optional tabs (pill style, underline style, or hidden)
- Optional sidebar nav (for dense modes only)
- Stat cards (2-4 count based on config)
- Bar chart (10-28 bars based on config)

The SAME structure must look completely different between presets. Key visual differences:
- Hack Mode: monospace everything, 0 radius, green on black, 4 cards, 24 bars, sidebar nav, no tabs
- Front Page: serif italic headlines, cream background, generous padding, 10 bars, underline tabs
- Arcade: Nunito bold, 18px radius, purple neon, glassmorphism cards, glow shadows
- War Room: tiny padding, amber accent, 28 packed bars, sidebar, uppercase everything
- Raw Cut: 0 radius, 2px solid black borders, light background, 900 weight uppercase text

Match the exact colors, spacing, and font choices from the mockup. Keep the component clean — it receives one `config` prop and renders everything from that.
```

### Prompt 3: Build the Preset Cards Grid

```
As a principal UX designer, build the PresetCard component at `src/features/Mood/components/PresetCard.jsx` and wire up the preset grid in `src/features/Mood/MoodSelector.jsx`.

Read `mood-presets-v4.jsx` — each preset card contains:
- A mini-preview thumbnail (140px tall) showing that preset's visual config
- Icon + name + tagline below the preview
- Selected state: indigo border, indigo checkmark badge top-right, brighter text
- Unselected state: subtle border, dimmed text

The grid is 4 columns. Clicking a card:
1. Updates the Zustand store's mood preset selection
2. Sets all 4 fine-tune dimension values to match the preset
3. Updates the moodPromptText in the store

Match the panel background (`rgba(28,32,52,0.7)`), section header ("Quick Presets" / "One click sets all four dimensions"), and card styling from the mockup exactly. Use Framer Motion for the selection transition.
```

### Prompt 4: Build the Prompt Preview Panel

```
As a principal engineer, build the PromptPreview component at `src/features/Mood/components/PromptPreview.jsx`.

Read `mood-presets-v4.jsx` — the PromptPreview section. It's a terminal-style panel that shows what the selected mood will generate in the final prompt. It has:
- macOS traffic light dots (red/yellow/green)
- "prompt preview" label in JetBrains Mono
- Copy button (copies the mood prompt text to clipboard)
- CLI-style output:
  $ --mood-feel
    [preset's promptText value]
  
  $ --dimensions
    density: "[value]", typography: "[value]"
    interaction: "[value]", embellishment: "[value]"

Colors: green `$` prompt, purple `#a78bfa` flag names, muted text for values. Background: `#1e2130` with indigo-tinted border matching the terminal dock style.

This panel reads from the Zustand store and updates live when the user changes presets or fine-tunes dimensions. Wire up the copy button with a brief "Copied!" feedback state.
```

### Prompt 5: Build the Fine-Tune Accordion

```
As a principal UX designer, build the FineTunePanel component at `src/features/Mood/components/FineTunePanel.jsx`.

Read `mood-presets-v4.jsx` — the FineTuneSection. It's a collapsible accordion with:
- Toggle bar: sliders icon + "Fine-Tune" label + 4 color dots (one per dimension) + chevron
- Expanded: 4 color-coded dimension cards, each with pill-style option buttons

Dimension colors:
- Density: blue #3b82f6
- Typography: purple #a855f7
- Interaction: amber #f59e0b
- Embellishment: green #10b981

Each dimension card has a tinted background at 6% opacity of its color, with a matching tinted border.

When the user changes a fine-tune value:
1. Update that dimension in the Zustand store
2. Check if the current combination matches any preset — if yes, highlight that preset in the grid. If no match, show a "Custom" badge
3. Update the prompt preview text

Use Framer Motion for the expand/collapse animation. Match the pill button styling from the mockup: 6px 12px padding, 8px radius, 11px font, 600 weight.
```

### Prompt 6: Build Quick Combos

```
As a principal UX designer, build the QuickCombos component at `src/features/Mood/components/QuickCombos.jsx`.

Read `mood-presets-v4.jsx` — the QuickCombos section. It shows 6 pre-paired mood + purpose combinations:

1. Corporate Deck — Boardroom + Telling a Story
2. Team Rally — Arcade + Community Based
3. Ops Dashboard — War Room + Mission Control
4. Product Launch — Vapor + Discover
5. Knowledge Base — Front Page + Learn & Explore
6. Executive Intel — Midnight Luxe + Data-Heavy

Each combo card has:
- A tiny (30x30px) mini-preview thumbnail using that mood's visual config
- Label + short description
- 3-column grid layout

Clicking a combo should:
1. Set the mood to the paired preset
2. Set the purpose/app-info section to the paired purpose category
3. Both sections should be marked as "configured" in the store

This section has a sparkle icon header with "Quick Combos" title and subtitle "Mood + Purpose paired together — sets multiple sections at once". Match the card styling from the mockup.
```

### Prompt 7: Integration and Polish

```
As a principal engineer and UX designer, integrate the new Mood selector into the app and do a polish pass.

1. Make sure the mood selector renders in the left panel when the Mood nav step is active
2. Wire the mood selection to the evolving preview — the preview should dramatically change based on which mood is selected (density restructures layout, typography changes fonts, embellishment adds/removes glass effects)
3. Wire the mood selection to the terminal prompt dock — mood section should output the promptText and dimension values
4. Test all 8 presets — click through each one and verify:
   - Mini-preview looks dramatically different for each
   - Prompt preview updates with the correct text
   - Fine-tune values match the preset
   - Evolving preview reflects the mood choice
5. Test fine-tune customization — changing one dimension should:
   - Update the prompt preview
   - Show "Custom" if it doesn't match a preset
   - Re-highlight a preset if you manually match its values
6. Test quick combos — clicking one should set both mood and purpose
7. Add Framer Motion transitions for: section entrance, preset selection, fine-tune expand/collapse, prompt preview text changes
8. Verify dark mode and light mode both work
9. Update the README with the new mood presets

Commit and push when done.
```

---

## Design Tokens to Match

These come from the app's existing design system:

- Panel background: `rgba(28,32,52,0.7)`
- Panel border: `rgba(255,255,255,0.08)`
- Text primary: `#F0EDE6`
- Text muted: `rgba(240,237,230,0.35)`
- Section color for Mood: `#a78bfa`
- Terminal background: `#1e2130`
- Terminal border: `rgba(129,140,248,0.15)`
- Selection pill: `borderRadius: 10`, `padding: 9px 16px`, `fontSize: 12`, `fontWeight: 600`
- Indigo accent: `#818cf8`
- Green configured: `#6ee7b7`

---

## Reminders

- Keep files componentized and relatively small
- Reference the mockup file for exact visual design — match colors, spacing, and patterns precisely
- Use Framer Motion for all transitions and animations
- Don't over-engineer — the mockup is the spec
- The evolving preview in the right panel and the terminal dock at the bottom both need to respond to mood changes
- After each prompt: check integration, test all 8 presets, verify dark/light mode
