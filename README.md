# UI Prompt Builder

A web app that helps people visually configure UI design preferences (color themes, mood, layout, components, animations, etc.) and generates a ready-to-paste prompt for Claude Code, Kiro, or any AI coding tool.

## Tech Stack

- **Vite** — fast dev server and build tool
- **React** (JavaScript) — UI framework
- **Framer Motion** — animations and transitions
- **Zustand** — lightweight state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture

The app uses a **sidebar + main panel** layout. Users click any category in the sidebar to jump directly to it — only categories they explicitly configure are included in the generated prompt (opt-in model).

### Layout

```
+-----------------------------------------------+
|          |                                    |
| Sidebar  |        Main Panel                  |
| (nav)    |   (active category content)        |
|          |   with expanding color box         |
+----------+------------------------------------+
|        Sticky Prompt Output Bar               |
+-----------------------------------------------+
```

- **Sidebar** (260px, light `#f5f3ee`) — Category navigation with unique accent colors per item, a dark "Your prompt includes" tag strip, and Reset All
- **Main Panel** (dark `#0e1117`) — Active category content with an animated expanding color box that bridges from the sidebar, using the category's accent color
- **Prompt Output** (sticky bottom) — Preview toggle and Copy Full Prompt button

On mobile (<768px), the sidebar becomes a horizontal scrollable tab bar.

### Directory Structure

```
ui-prompt-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── ThemeSelector/          # Color theme picker (implemented)
│   │   │   ├── AccentColorPicker.jsx  # Gradient slider + dot picker
│   │   │   ├── PreviewDashboard.jsx   # Dashboard preview view
│   │   │   ├── PreviewMarketing.jsx   # Marketing page preview view
│   │   │   ├── PreviewSocial.jsx      # Social feed preview view
│   │   │   ├── ThemePreview.jsx       # Full-width preview card with view toggle
│   │   │   ├── ThemeSelector.jsx      # Mode toggle + horizontal pill strip
│   │   │   ├── constants.js
│   │   │   └── index.js
│   │   ├── layout/
│   │   │   ├── MainPanel.jsx       # Active category panel with expanding color box
│   │   │   ├── PromptOutput.jsx    # Sticky bottom bar (Preview + Copy)
│   │   │   └── Sidebar.jsx         # Category nav with colored items + tag strip
│   │   └── shared/
│   │       ├── Icon.jsx            # SVG icon component
│   │       ├── PanelHeader.jsx     # Title + subtitle + Copy/Clear buttons
│   │       └── Section.jsx         # Collapsible section wrapper (legacy)
│   ├── constants/
│   │   ├── animations.js
│   │   ├── awsGuidelines.js
│   │   ├── borderStyles.js
│   │   ├── categories.js          # 9 sidebar categories with unique colors
│   │   ├── components.js
│   │   ├── index.js
│   │   ├── layouts.js
│   │   ├── moods.js
│   │   └── themes.js
│   ├── hooks/
│   │   ├── useDrag.js             # Drag interaction hook
│   │   └── useMediaQuery.js       # useIsMobile() responsive hook
│   ├── services/
│   │   └── nameGenerator.js       # AI name generation (Coming Soon)
│   ├── store/
│   │   └── usePromptStore.js      # Zustand store with opt-in defaults
│   ├── utils/
│   │   ├── categoryHelpers.js     # isCategoryConfigured, getSelectionSummary
│   │   └── generatePrompt.js      # Pure prompt generation + per-category snippets
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Key Design Decisions

### Opt-In Model
All store defaults are `null` or empty. A category only appears in the generated prompt when the user explicitly configures it. Each category has a Clear button to reset it back to unconfigured.

### Category Color System
Each of the 9 sidebar categories has a unique accent color:
- **Theme** — `#6366f1` (indigo)
- **Mood & Feel** — `#8b5cf6` (purple)
- **Layout** — `#3b82f6` (blue)
- **Components** — `#10b981` (green)
- **Animation** — `#f59e0b` (amber)
- **Border Style** — `#ec4899` (pink)
- **App Description** — `#06b6d4` (cyan)
- **AWS Guidelines** — `#f97316` (orange)
- **Custom Notes** — `#a78bfa` (violet)

When a sidebar item is selected, its color fills the sidebar item background and expands into the main panel as an animated color box overlay.

### Expanding Color Box Animation
When switching categories, a colored box animates from the left (sidebar edge) into the main panel using a `clipPath` reveal animation. A rounded inner panel and a soft glow blob provide depth. Content fades in on top.

### Theme Selector
The theme picker uses a horizontal pill strip with mini color swatches (replacing the older column-based ThemeList). A Dark/Light mode toggle filters available themes. The full-width ThemePreview card below includes three view modes (Dashboard, Marketing, Social), an accent color gradient picker, and a hex readout.

## Features

### Implemented
- **ThemeSelector** — 6+ themes across dark and light modes, each with accent color customization, 3 preview views (Dashboard, Marketing, Social), gradient accent picker
- **Sidebar Navigation** — Color-coded category items, dark "Your prompt includes" tag strip with Reset All, mobile horizontal tab bar
- **Main Panel** — Expanding color box animation, category-tinted content area
- **Prompt Output** — Preview/Hide toggle, Copy Full Prompt button, sticky bottom bar
- **Per-Section Actions** — Copy individual category snippet, Clear category

### Planned
- **MoodSelector** — 5 moods with expandable style variants
- **ComponentSelector** — Multi-select with 10 component types and drill-down sub-options
- **LayoutSelector** — 6 layout options with visual previews
- **AnimationSelector** — 4 animation levels
- **BorderStyleSelector** — Corner radius picker with visual preview
- **AppDescriptionAndNaming** — App description textarea + AI name generation
- **AWSGuidelinesToggle** — Brand compliance toggle with preview
- **CustomNotes** — Free-text additional instructions

## Key Architecture Notes

- **All selectable data** lives in `src/constants/`
- **Zustand store** tracks all user selections with opt-in defaults (`null`/empty) and exposes per-category clear actions + `resetAll`
- **Prompt generation** is a pure utility in `src/utils/generatePrompt.js` — only configured categories are included
- **Category helpers** in `src/utils/categoryHelpers.js` derive configured status and selection summaries from store state
- **Framer Motion** powers panel transitions (clipPath reveal, fade/slide), tag strip animations, and theme pill strip
- **Feature folders** under `src/components/` contain their own sub-components and barrel `index.js`
