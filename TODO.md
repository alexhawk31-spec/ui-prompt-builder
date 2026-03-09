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
- [ ] Template library doesn't yet filter templates by output type
