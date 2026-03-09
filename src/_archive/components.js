export const COMPONENTS = [
  {
    id: "cards",
    name: "Cards",
    icon: "\u25a1",
    subOptions: [
      { id: "stat-card", name: "Stat Cards", desc: "Big number + label + status" },
      { id: "content-card", name: "Content Cards", desc: "Image, title, description" },
      { id: "action-card", name: "Action Cards", desc: "Clickable, CTA-driven" },
      { id: "profile-card", name: "Profile Cards", desc: "Avatar, name, details" },
    ],
  },
  {
    id: "tables",
    name: "Tables",
    icon: "\u25a6",
    subOptions: [
      { id: "data-table", name: "Data Table", desc: "Sortable, filterable rows" },
      { id: "comparison", name: "Comparison", desc: "Side-by-side feature grid" },
      { id: "timeline-table", name: "Schedule", desc: "Time-based row layout" },
    ],
  },
  {
    id: "charts",
    name: "Charts",
    icon: "\u25d0",
    subOptions: [
      { id: "line", name: "Line Charts", desc: "Trends over time" },
      { id: "bar", name: "Bar Charts", desc: "Category comparison" },
      { id: "donut", name: "Donut/Pie", desc: "Part-of-whole breakdown" },
      { id: "area", name: "Area Charts", desc: "Volume and fill" },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    icon: "\u2610",
    subOptions: [
      { id: "input-fields", name: "Input Fields", desc: "Text, number, date" },
      { id: "selectors", name: "Selectors", desc: "Dropdowns, toggles, radios" },
      { id: "multi-step", name: "Multi-Step", desc: "Wizard / step-by-step" },
    ],
  },
  {
    id: "modals",
    name: "Modals",
    icon: "\u25fb",
    subOptions: [
      { id: "dialog", name: "Dialog", desc: "Confirmation, alert" },
      { id: "drawer", name: "Drawer", desc: "Slide-in side panel" },
      { id: "fullscreen-modal", name: "Full Screen", desc: "Overlay takeover" },
    ],
  },
  {
    id: "nav",
    name: "Navigation",
    icon: "\u2261",
    subOptions: [
      { id: "top-bar", name: "Top Bar", desc: "Horizontal, fixed header" },
      { id: "sidebar-nav", name: "Sidebar", desc: "Vertical, collapsible" },
      { id: "tabs-nav", name: "Tabs", desc: "Segmented content switching" },
      { id: "breadcrumb", name: "Breadcrumbs", desc: "Hierarchical path" },
    ],
  },
  {
    id: "hero",
    name: "Hero Section",
    icon: "\u25a3",
    subOptions: [
      { id: "split-hero", name: "Split", desc: "Text left, visual right" },
      { id: "centered-hero", name: "Centered", desc: "Full-width centered" },
      { id: "video-hero", name: "Video BG", desc: "Background video or animation" },
    ],
  },
  {
    id: "timeline",
    name: "Timeline",
    icon: "\u2502",
    subOptions: [
      { id: "vertical-tl", name: "Vertical", desc: "Top-to-bottom flow" },
      { id: "horizontal-tl", name: "Horizontal", desc: "Left-to-right scroll" },
      { id: "alternating", name: "Alternating", desc: "Zigzag left/right" },
    ],
  },
  {
    id: "maps",
    name: "Maps & Geo",
    icon: "\u25ce",
    subOptions: [
      { id: "interactive-map", name: "Interactive Map", desc: "Pins, tooltips, zoom" },
      { id: "heatmap", name: "Heat Map", desc: "Density visualization" },
      { id: "route-map", name: "Route Map", desc: "Path + waypoints" },
    ],
  },
  {
    id: "feed",
    name: "Activity Feed",
    icon: "\u25bc",
    subOptions: [
      { id: "social-feed", name: "Social Style", desc: "Posts, likes, comments" },
      { id: "log-feed", name: "Event Log", desc: "Timestamped entries" },
      { id: "notification-feed", name: "Notifications", desc: "Alert-style items" },
    ],
  },
];
