# Purpose Selector — Claude Code Implementation Instructions

## Overview

Replace the existing "What are you building?" placeholder with the finalized Purpose Selector. This is the first step in the app — it sets the app type, which changes the evolving preview to show the right kind of layout. The user then customizes theme, mood, layout, etc. while watching those settings applied to their chosen purpose.

## Reference File

Drop this into the project root before starting:

- `purpose-selector-v5.jsx` — **THE PRIMARY REFERENCE.** Complete working mockup with all 8 purposes, light/dark toggle, card thumbnails, full previews, and the token system. Read this first and match it exactly.

---

## What This Section Does

1. User picks a purpose (Learn & Explore, Data-Heavy, etc.)
2. The evolving preview on the right switches to show that app type
3. The light/dark toggle in the theme section controls whether the preview renders in light or dark mode
4. Card thumbnails also reflect the current light/dark selection
5. The purpose feeds into prompt generation as context

---

## The 8 Purposes

Each purpose has: `id`, `name`, `icon`, `color`, `description`, and a unique preview component.

| ID | Name | Icon | Color | What the preview shows |
|---|---|---|---|---|
| learn | Learn & Explore | compass | #6366f1 | Progress bar, content with callout annotation, quiz/options area, Back/Continue nav |
| data | Data-Heavy | barChart | #16a34a | 4 KPI cards, time range selector, dual bar chart with legend, data table with columns |
| story | Telling a Story | film | #d97706 | Gradient hero with CTA, three feature cards with icons, bottom CTA bar |
| builder | Builder | hammer | #0284c7 | Left toolbar, center canvas with dashed artboard, right property panel with inputs |
| community | Community Based | users | #db2777 | Feed with 2 posts — avatars, timestamps, text, image, heart/comment/share reactions |
| discover | Discover | search | #ea580c | Search bar, filter chips, 2×2 card grid with colored image areas, ratings, prices |
| mission | Mission Control | target | #dc2626 | Sprint header with deadline badge, status row, 3 kanban columns with task cards |
| freestyle | Freestyle | wind | #64748b | Empty state — dashed circle, wind icon, "Pick your settings" message |

---

## Token System for Light/Dark Previews

All preview components (both thumbnails and full previews) read from a shared palette object. NOTHING is hardcoded.

```js
function getPreviewPalette(isDark) {
  if (isDark) return {
    bg: "#0f1219",
    card: "#1a1e2e",
    surface: "#141824",
    text: "#e5e7eb",
    muted: "#9ca3af",
    dim: "#4b5563",
    border: "#2d3348",
    borderLight: "#232840",
    accent: "#818cf8",
    accentBg: "#1e2040",
    green: "#4ade80", greenBg: "#0c2a1a",
    red: "#f87171", redBg: "#2a0f0f",
    amber: "#fbbf24", amberBg: "#2a2008",
    blue: "#60a5fa", blueBg: "#0f1a2e",
    pink: "#f472b6", pinkBg: "#2a0f20",
    orange: "#fb923c", orangeBg: "#2a1808",
    gradA: "#1a1e30", gradB: "#1a2030",
    tagBg: "rgba(255,255,255,0.06)",
    inputBg: "#1a1e2e", inputBorder: "#2d3348",
  };
  return {
    bg: "#ffffff",
    card: "#f9fafb",
    surface: "#f3f4f6",
    text: "#111827",
    muted: "#6b7280",
    dim: "#9ca3af",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    accent: "#6366f1",
    accentBg: "#eef2ff",
    green: "#16a34a", greenBg: "#dcfce7",
    red: "#dc2626", redBg: "#fef2f2",
    amber: "#d97706", amberBg: "#fef9c3",
    blue: "#0284c7", blueBg: "#e0f2fe",
    pink: "#db2777", pinkBg: "#fce7f3",
    orange: "#ea580c", orangeBg: "#fff7ed",
    gradA: "#eef2ff", gradB: "#fdf4ff",
    tagBg: "#f3f4f6",
    inputBg: "#fff", inputBorder: "#e5e7eb",
  };
}
```

Every preview component receives `p` (the palette) as a prop and uses ONLY these tokens for colors. No hex values in preview components — ever.

---

## Zustand Store Updates

Add to the existing store:

```js
{
  // Purpose
  selectedPurpose: 'freestyle', // default — no opinion
  setPurpose: (id) => set({ selectedPurpose: id }),

  // This may already exist from the theme section:
  previewMode: 'light', // 'light' | 'dark' — controls preview palette
  togglePreviewMode: () => set(s => ({ previewMode: s.previewMode === 'light' ? 'dark' : 'light' })),
}
```

The `previewMode` value feeds into `getPreviewPalette()` and is toggled by the dark/light switch in the theme section. The purpose section itself doesn't have its own toggle — it reads from the store.

---

## Component Structure

```
src/components/PurposeSelector/
├── index.jsx              # Main component — grid of cards
├── PurposeCard.jsx        # Individual card with thumbnail
├── constants.js           # purposes array, getPreviewPalette()
├── thumbnails/
│   ├── ThumbLearn.jsx
│   ├── ThumbData.jsx
│   ├── ThumbStory.jsx
│   ├── ThumbBuilder.jsx
│   ├── ThumbCommunity.jsx
│   ├── ThumbDiscover.jsx
│   ├── ThumbMission.jsx
│   └── ThumbFreestyle.jsx
└── previews/
    ├── PreviewLearn.jsx
    ├── PreviewData.jsx
    ├── PreviewStory.jsx
    ├── PreviewBuilder.jsx
    ├── PreviewCommunity.jsx
    ├── PreviewDiscover.jsx
    ├── PreviewMission.jsx
    └── PreviewFreestyle.jsx
```

---

## Claude Code Prompts

### Prompt 1: Read Reference and Set Up Data

```
Read the file purpose-selector-v5.jsx in the project root. This is the complete working reference for the purpose selector feature.

Create the data layer first:
1. Create src/components/PurposeSelector/constants.js with:
   - The purposes array (8 items, each with id, name, icon, color, desc)
   - The getPreviewPalette(isDark) function with full light and dark token objects
2. Add selectedPurpose and setPurpose to the Zustand store
3. Make sure previewMode already exists in the store (from the theme section) — if not, add it

Don't build any UI yet. Just the data and store.
```

### Prompt 2: Build the Card Thumbnails

```
Read purpose-selector-v5.jsx and build all 8 card thumbnail components. These are the small wireframe previews that sit inside each purpose card.

Each thumbnail:
- Receives `c` (the purpose color) and `p` (the palette from getPreviewPalette)
- Uses ONLY palette tokens for colors — no hardcoded hex values
- Shows a simplified wireframe of that app type
- Has a white or dark background matching the current preview mode

Create each as a separate file in src/components/PurposeSelector/thumbnails/. Match the layouts from the reference file exactly:
- ThumbLearn: progress bar, content block with callout, back/next buttons
- ThumbData: 4 KPI boxes, bar chart, table rows
- ThumbStory: gradient hero, CTA button, 3 feature cards
- ThumbBuilder: toolbar, canvas with dashed border, property panel
- ThumbCommunity: 2 post cards with avatars and reactions
- ThumbDiscover: search bar, filter chips, 2x2 card grid
- ThumbMission: status row, 3 kanban columns with task cards
- ThumbFreestyle: dashed circle with wind icon
```

### Prompt 3: Build the Full Previews

```
Read purpose-selector-v5.jsx and build all 8 full preview components. These are what render in the evolving preview panel (right 40%) when a purpose is selected.

Each full preview:
- Receives `p` (the palette) as a prop
- Is a detailed, realistic mockup of that app type
- Uses real text labels, real values, real structure — not just shapes
- Uses ONLY palette tokens — zero hardcoded colors

Create each in src/components/PurposeSelector/previews/. Match the reference exactly:
- PreviewLearn: "Getting Started" header, step 2/5, progress bar, content with annotation callout, Option A/B quiz, Back/Continue
- PreviewData: "Analytics" header, 1D/1W/1M/1Y selector, 4 KPI cards with values and % changes, dual bar chart with legend, data table with 4 columns
- PreviewStory: gradient hero with "Introducing", centered CTA, 3 feature cards (Fast/Secure/Simple), bottom CTA bar
- PreviewBuilder: 6-tool toolbar, dashed canvas artboard, property panel with Width/Height/Color/Radius inputs
- PreviewCommunity: "Feed" header, 2 posts from Sarah Chen and Mike Torres with real text, avatars, timestamps, image, reactions with counts
- PreviewDiscover: "Explore" header, search bar, filter chips (All/Popular/New/Trending), 2x2 cards with names/prices/ratings
- PreviewMission: "Sprint 24" with "7 days left" badge, status row (To Do/In Progress/Review/Done), 3 kanban columns with task cards showing names, assignees, priority badges
- PreviewFreestyle: centered wind icon in dashed circle, "Pick your settings" text
```

### Prompt 4: Build the Purpose Card and Wire It Up

```
Read purpose-selector-v5.jsx and build the PurposeCard component and the main PurposeSelector index.

PurposeCard:
- Shows the thumbnail at top (80px tall, uses the matching thumbnail component)
- Below: icon in colored square + purpose name + description
- Active state: colored border (2px solid purpose.color), subtle glow shadow, check badge top-right
- Inactive: subtle border (1px solid rgba), dimmer text
- Receives the palette `p` and passes it to the thumbnail

PurposeSelector index:
- 4-column grid of PurposeCards
- Reads selectedPurpose and previewMode from the store
- Computes palette via getPreviewPalette(previewMode === 'dark')
- Passes palette to all cards

Wire the evolving preview panel:
- Import all 8 full preview components
- Map selectedPurpose to the correct preview component
- Pass the computed palette as `p` prop
- When purpose changes, the preview swaps (use AnimatePresence for fade transition)
- When previewMode changes (from theme section toggle), all previews re-render with new palette
```

### Prompt 5: Wire Purpose to Prompt Generation

```
Add purpose to the prompt generator output. When "What are you building?" is configured:

Terminal output should show:
$ --app-purpose
  learn-and-explore: "Step-by-step educational interface with progress tracking, 
  callout annotations, interactive quiz elements, and guided navigation"

Each purpose maps to a descriptive prompt string that gives the AI context about what kind of UI to generate. Here are the mappings:

- learn: "Step-by-step educational interface with progress tracking, callout annotations, interactive quiz elements, and guided navigation"
- data: "Data-dense analytics dashboard with KPI cards, time-series charts, data tables, and metric comparisons"
- story: "Narrative-driven landing page with hero section, cinematic pacing, feature highlights, and conversion CTAs"
- builder: "Creator workspace with toolbar, canvas area, property panel, and tool-based interactions"
- community: "Social feed interface with user profiles, posts, media attachments, reactions, and real-time conversations"
- discover: "Browse and discovery interface with search, filter chips, card grid, ratings, and category navigation"
- mission: "Project management interface with kanban boards, status tracking, task cards, priority levels, and team assignments"
- freestyle: (omit from prompt — no purpose context)

Purpose should be the FIRST section in the generated prompt since it sets the foundation for everything else.
```

---

## Integration Notes

- The purpose selector renders when the first nav icon is active (it should be the first step)
- The evolving preview panel already exists — you're swapping what renders inside it based on selectedPurpose
- The dark/light toggle in the theme section controls previewMode in the store, which feeds into getPreviewPalette() — the purpose section reads this, it doesn't have its own toggle
- When no purpose is selected (freestyle), the preview shows the generic freestyle placeholder
- Card thumbnails update when previewMode changes — they should always match the full preview

## Common Mistakes to Avoid

- **Don't hardcode colors in preview components.** Every single color comes from the palette `p`. If you see a hex value that isn't a purpose color, it should be a token.
- **Don't create a separate dark/light toggle in the purpose section.** It reads from previewMode in the store, which is set by the theme section.
- **Don't skip the real content in previews.** The Data-Heavy preview needs actual values ($2.4M, +12.4%), actual column headers (Page, Views, Bounce, Avg Time), actual page paths (/dashboard, /pricing). Same for all others — use the exact content from the reference file.
- **Don't make thumbnails too detailed.** They're 80px tall. They should suggest the layout, not reproduce every element. The full previews are where the detail lives.
- **Don't forget the freestyle purpose.** It's intentionally empty. No wireframe, just the wind icon and message. This is the default.
- **Don't put the purpose section behind a config panel.** It should take the full config area width — no extra wrapper panel needed since the cards themselves provide visual structure.
