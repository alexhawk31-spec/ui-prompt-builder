# Pintuck — TODO

## Deferred Features
- [ ] **Favicon / App Icon input** — text field in the Project step (App only) where users describe their app icon. Gets included in the generated prompt. Was implemented then pulled to reduce clutter; store already has `faviconDesc` / `setFaviconDesc` wired up.
- [ ] **Wiki output type** — fourth output type card for internal docs / knowledge bases. Constants and step availability need defining. Was stubbed as "coming soon" then removed.
- [ ] **AWS Guidelines section** — brand compliance toggle that injects AWS branding rules (orange accents, Ember font, 8px spacing grid). Was fully implemented then removed to reduce clutter. Store had `awsGuidelines` / `setAwsGuidelines`, categories had the entry, prompt generation had `## AWS Branding` block. File `src/constants/awsGuidelines.js` still exists with the constant data.

## Polish
- [ ] Light-mode pass on all new components (ProjectPicker, MoodSelector purpose pills, build-mode toggle)
- [ ] Keyboard accessibility for output type cards and purpose pills
- [ ] Mobile / narrow-viewport layout for the 3-column output type grid

## Known Gaps
- [ ] EvolvingPreview reuses existing preview components for Presentation/One Pager purposes — could benefit from purpose-specific previews later

---

## Backend — Templates & Admin Portal (Make It Live)

Full spec lives in `templates-admin-spec.md`. Summary of what needs building:

### Templates Step (User-Facing Gallery)
- [ ] **Template cards with live iframe previews** — scaled-down iframe (`srcdoc`, `pointer-events: none`, `transform: scale(0.22)`) showing actual rendered HTML, not screenshots
- [ ] **Filter pills** — All / App / Presentation / One Pager. Pre-filter to user's selected output type on first open
- [ ] **Preview panel** — full-size iframe render of selected template + two tabs: "The Prompt" (CLI-style, copyable) and "About" (name, type, description, real-project badge)
- [ ] **"Use this template" CTA** — applies `storeConfig` JSON to Zustand store, navigates to Colors step. Confirmation dialog if user has already configured steps

### Admin Portal (Hidden)
- [ ] **Access trigger** — 3 rapid clicks on scissors logo (800ms window) → passphrase input → type `craft` → portal opens
- [ ] **Portal shell** — full-screen overlay (`rgba(8,10,18,0.85)` + blur), max-width 960px card, left sidebar (220px) with 3 nav items
- [ ] **Templates CRUD** — sortable list + editor with: name, output type, purpose, description, isRealProject toggle, mockup HTML (with live preview), prompt text, step config JSON
- [ ] **Prompt Copy Log** — read-only table logging every terminal copy event (timestamp, output type, purpose, sections, char count). Filterable, exportable as CSV
- [ ] **Capture Prompts library** — expandable cards with copyable prompts for generating mockup HTML from real projects. 4 defaults pre-loaded (Default, Dashboard, Presentation, One Pager captures)

### Prompt Saving (User-Facing)
- [ ] **Save button in Prompt step** — next to the existing Copy button, add a "Save" button. On click, show a small inline input for the user to name their prompt, then save it
- [ ] **Saved prompts list** — let users see their previously saved prompts (expandable section or tab in the Prompt step)
- [ ] **Backend storage** — save named prompts to `public/data/saved-prompts.json` with: id, name, timestamp, outputType, purpose, sectionsIncluded, promptText, promptCharCount

### Admin Portal — Saved Prompts Visibility
- [ ] **Saved Prompts section in Admin Portal** — add a 4th nav item "Saved Prompts" to the admin sidebar
- [ ] **Saved prompts table** — read-only view of all user-saved prompts: name, timestamp, output type, purpose, sections included, char count. Filterable by date range and output type
- [ ] **Prompt detail view** — click a row to expand and see the full prompt text (read-only)

### Data Layer
- [ ] `public/data/templates.json` — template objects with id, name, outputType, purpose, description, isRealProject, mockupHtml, prompt, storeConfig, order
- [ ] `public/data/prompt-log.json` — append-only log of copy events
- [ ] `public/data/saved-prompts.json` — user-saved named prompts with full prompt text and metadata
- [ ] `public/data/capture-prompts.json` — pre-populated with 4 default capture prompts
- [ ] `src/hooks/useTemplates.js` — CRUD hook for templates (read/add/update/delete/reorder)
- [ ] `src/utils/promptLogger.js` — `logPromptCopy()` wired to terminal Copy button
- [ ] `src/utils/promptSaver.js` — `savePrompt(name, promptText, metadata)` writes to saved-prompts.json
- [ ] `src/store/adminStore.js` — `adminPortalOpen`, `activeAdminSection`
