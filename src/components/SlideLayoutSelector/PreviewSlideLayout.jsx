import usePromptStore from "../../store/usePromptStore";
import { SLIDE_LAYOUT_CATEGORIES } from "./constants";

// Find which category an option belongs to
function getCatForOption(optId) {
  for (const cat of SLIDE_LAYOUT_CATEGORIES) {
    if (cat.options.some((o) => o.id === optId)) return cat;
  }
  return null;
}

// ── Individual slide renderers ──

function TitleMinimalCentered({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 2, textAlign: "center", gap: m.gap }}>
      <div style={{ width: 36, height: 3, borderRadius: 2, background: p.accent }} />
      <div style={{ fontSize: m.fs(22), fontWeight: 800, fontFamily: m.hFont, color: p.text, lineHeight: 1.15, marginTop: m.gap * 0.5 }}>{label || "Minimal Centered"}</div>
      <div style={{ fontSize: m.fs(9), color: p.muted, maxWidth: "70%" }}>A subtitle that supports the main idea</div>
    </div>
  );
}

function TitleLeftAnchored({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 2 }}>
      <div style={{ width: 4, height: "55%", borderRadius: 2, background: p.accent, flexShrink: 0 }} />
      <div style={{ paddingLeft: m.pad * 1.2, display: "flex", flexDirection: "column", gap: m.gap * 0.6 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Keynote 2025</div>
        <div style={{ fontSize: m.fs(20), fontWeight: 800, fontFamily: m.hFont, color: p.text, lineHeight: 1.15 }}>{label || "Left Anchored"}</div>
        <div style={{ fontSize: m.fs(7), color: p.muted }}>Alex Chen · March 2025 · Board Meeting</div>
      </div>
    </div>
  );
}

function TitleSplitPanel({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex" }}>
      <div style={{ width: "38%", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 1.5, gap: m.gap * 0.6 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".08em" }}>Annual Review</div>
        <div style={{ fontSize: m.fs(16), fontWeight: 800, fontFamily: m.hFont, color: p.text, lineHeight: 1.15 }}>{label || "Split Panel"}</div>
        <div style={{ fontSize: m.fs(8), color: p.muted, marginTop: m.gap * 0.3 }}>Where we are and where we're going</div>
      </div>
    </div>
  );
}

function TitleFullBleedDark({ p, m, label }) {
  return (
    <div style={{ height: "100%", position: "relative", background: `radial-gradient(ellipse at 20% 80%, ${p.accent}25 0%, transparent 60%), ${p.bg}` }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: m.pad * 2, gap: m.gap * 0.5 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Q4 Results</div>
        <div style={{ fontSize: m.fs(22), fontWeight: 900, fontFamily: m.hFont, color: p.text, lineHeight: 1.1 }}>{label || "Full Bleed Dark"}</div>
        <div style={{ width: 30, height: 3, borderRadius: 2, background: p.accent, marginTop: m.gap * 0.3 }} />
      </div>
    </div>
  );
}

function TitleHeadlineOnly({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: m.pad * 2, textAlign: "center" }}>
      <div>
        <div style={{ fontSize: m.fs(26), fontWeight: 900, fontFamily: m.hFont, color: p.text, lineHeight: 1.1 }}>{label || "The Future"}</div>
        <div style={{ fontSize: m.fs(26), fontWeight: 900, fontFamily: m.hFont, color: p.accent, lineHeight: 1.1 }}>Starts Now</div>
      </div>
    </div>
  );
}

function TitleLayeredCard({ p, m, label }) {
  return (
    <div style={{
      height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: m.pad * 1.5,
      background: `radial-gradient(circle at 25% 25%, ${p.accent}06 1px, transparent 1px), radial-gradient(circle at 75% 75%, ${p.accent}06 1px, transparent 1px)`,
      backgroundSize: "16px 16px",
    }}>
      <div style={{
        width: "82%", padding: `${m.pad * 2}px ${m.pad * 1.5}px`,
        borderRadius: m.cRad + 4, background: `${p.card}cc`,
        border: `1px solid ${p.border}`,
        backdropFilter: "blur(12px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap, textAlign: "center",
      }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Strategy Deck</div>
        <div style={{ fontSize: m.fs(16), fontWeight: 700, fontFamily: m.hFont, color: p.text, lineHeight: 1.15 }}>{label || "Layered Card"}</div>
        <div style={{ fontSize: m.fs(8), color: p.muted }}>A frosted card holding your opening statement</div>
      </div>
    </div>
  );
}

function DividerNumberTitle({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: `${m.pad * 2}px ${m.pad * 2.5}px`, background: p.bg }}>
      <div style={{ fontSize: m.fs(36), fontWeight: 900, fontFamily: m.hFont, color: `${p.accent}33`, lineHeight: 1 }}>02</div>
      <div style={{ fontSize: m.fs(16), fontWeight: 800, fontFamily: m.hFont, color: p.text, marginTop: m.gap * 0.5 }}>{label || "Market Analysis"}</div>
      <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accent, marginTop: m.gap * 0.5 }} />
    </div>
  );
}

function DividerFullAccent({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)` }}>
      <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: ".12em" }}>Section Two</div>
      <div style={{ fontSize: m.fs(18), fontWeight: 800, fontFamily: m.hFont, color: "#fff" }}>{label || "Market Analysis"}</div>
    </div>
  );
}

function DividerHorizontalRule({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ width: "100%", height: 1, background: `${p.text}20` }} />
      <div style={{ padding: `${m.gap * 1.5}px 0`, display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap * 0.5 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Section Two</div>
        <div style={{ fontSize: m.fs(14), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Market Analysis"}</div>
      </div>
      <div style={{ width: "100%", height: 1, background: `${p.text}20` }} />
    </div>
  );
}

function DividerLeftBar({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", background: p.bg }}>
      <div style={{ width: 6, background: p.accent, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: `${m.pad * 2}px ${m.pad * 2.5}px`, gap: m.gap * 0.4 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em" }}>Chapter Two</div>
        <div style={{ fontSize: m.fs(14), fontWeight: 800, fontFamily: m.hFont, color: p.text }}>{label || "Market Analysis"}</div>
        <div style={{ fontSize: m.fs(7), color: p.muted, lineHeight: 1.4, maxWidth: "80%" }}>Key findings from Q4 research</div>
      </div>
    </div>
  );
}

function DividerCenteredMinimal({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, background: p.bg }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${p.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.accent }} />
      </div>
      <div style={{ fontSize: m.fs(14), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Market Analysis"}</div>
      <div style={{ fontSize: m.fs(7), color: p.muted }}>3 of 5</div>
    </div>
  );
}

function DividerSplitPanel({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", background: p.bg }}>
      <div style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: m.fs(36), fontWeight: 900, fontFamily: m.hFont, color: `${p.accent}33`, lineHeight: 1 }}>02</div>
      </div>
      <div style={{ width: "55%", display: "flex", flexDirection: "column", justifyContent: "center", padding: `${m.pad * 2}px ${m.pad * 1.5}px`, borderLeft: `1px solid ${p.border}`, background: p.card, gap: m.gap * 0.4 }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Section Two</div>
        <div style={{ fontSize: m.fs(12), fontWeight: 800, fontFamily: m.hFont, color: p.text }}>{label || "Market Analysis"}</div>
      </div>
    </div>
  );
}

function ChartBar({ p, m, label }) {
  const labels = ["Q1", "Q2", "Q3", "Q4", "Q5"];
  const heights = [0.4, 0.6, 0.45, 0.8, 0.95];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Revenue by Quarter"}</div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, padding: "0 4px" }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: "100%", height: `${h * 100}%`, borderRadius: "3px 3px 0 0", background: p.accent }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, padding: "0 4px" }}>
        {labels.map((l) => (
          <div key={l} style={{ flex: 1, fontSize: m.fs(6), color: p.muted, textAlign: "center" }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function ChartLine({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Growth Trend"}</div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={p.accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q30,70 50,60 T100,40 T150,25 T200,15 L200,100 L0,100 Z" fill="url(#lineFill)" />
          <path d="M0,80 Q30,70 50,60 T100,40 T150,25 T200,15" fill="none" stroke={p.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function ChartDonut({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 1.5, gap: m.gap * 2, background: p.bg }}>
      <div style={{ position: "relative", width: "50%", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke={`${p.muted}20`} strokeWidth="12" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={p.accent} strokeWidth="12" strokeDasharray={`${0.62 * 239} ${239}`} />
          <circle cx="50" cy="50" r="38" fill="none" stroke={`${p.accent}70`} strokeWidth="12" strokeDasharray={`${0.23 * 239} ${239}`} strokeDashoffset={`${-0.62 * 239}`} />
        </svg>
        <div style={{ position: "absolute", fontSize: m.fs(14), fontWeight: 900, color: p.text }}>62%</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: m.gap * 0.6 }}>
        {[{ c: p.accent, l: "Primary" }, { c: `${p.accent}70`, l: "Secondary" }, { c: `${p.muted}30`, l: "Other" }].map((item) => (
          <div key={item.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.c }} />
            <div style={{ fontSize: m.fs(7), color: p.muted }}>{item.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartStatGrid({ p, m, label }) {
  const stats = [
    { val: "$4.2M", lbl: "Revenue", c: p.accent },
    { val: "12.4K", lbl: "Users", c: "#a78bfa" },
    { val: "+24%", lbl: "Growth", c: "#22c55e" },
    { val: "96%", lbl: "Retention", c: "#f59e0b" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Key Metrics"}</div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: m.gap }}>
        {stats.map((s) => (
          <div key={s.lbl} style={{ borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <div style={{ fontSize: m.fs(14), fontWeight: 900, color: s.c }}>{s.val}</div>
            <div style={{ fontSize: m.fs(6), color: p.muted }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCallout({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: m.gap }}>
        <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Performance"}</div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4 }}>
          {[0.4, 0.6, 0.5, 0.85, 0.7, 0.95].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: "3px 3px 0 0", background: i === 5 ? p.accent : `${p.accent}40` }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap }}>
        {[{ val: "+24%", lbl: "YoY Growth", c: p.accent }, { val: "$4.2M", lbl: "Total Rev", c: "#a78bfa" }].map((s) => (
          <div key={s.lbl} style={{ flex: 1, borderRadius: m.cRad, background: p.card, borderLeft: `3px solid ${s.c}`, padding: m.pad * 0.8, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: m.fs(12), fontWeight: 900, color: s.c }}>{s.val}</div>
            <div style={{ fontSize: m.fs(6), color: p.muted, marginTop: 2 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartTable({ p, m, label }) {
  const rows = [["Feature A", "Yes", "No"], ["Feature B", "Yes", "Yes"], ["Feature C", "Yes", "No"], ["Pricing", "$29", "$49"]];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Comparison"}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ display: "flex", gap: 1 }}>
          <div style={{ flex: 1 }} />
          <div style={{ flex: 1, background: p.accent, borderRadius: "4px 4px 0 0", padding: `${m.fs(4)}px`, textAlign: "center", fontSize: m.fs(7), fontWeight: 700, color: "#fff" }}>Us</div>
          <div style={{ flex: 1, background: p.card, borderRadius: "4px 4px 0 0", padding: `${m.fs(4)}px`, textAlign: "center", fontSize: m.fs(7), color: p.muted }}>Them</div>
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 1 }}>
            <div style={{ flex: 1, padding: `${m.fs(3)}px ${m.fs(4)}px`, fontSize: m.fs(6), color: p.muted }}>{row[0]}</div>
            <div style={{ flex: 1, background: `${p.accent}10`, padding: `${m.fs(3)}px`, textAlign: "center", fontSize: m.fs(7), fontWeight: 700, color: p.accent }}>{row[1]}</div>
            <div style={{ flex: 1, background: p.card, padding: `${m.fs(3)}px`, textAlign: "center", fontSize: m.fs(7), color: p.muted }}>{row[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartProgress({ p, m, label }) {
  const bars = [
    { lbl: "Awareness", pct: 85, c: p.accent },
    { lbl: "Consideration", pct: 62, c: "#a78bfa" },
    { lbl: "Conversion", pct: 38, c: "#22c55e" },
    { lbl: "Retention", pct: 91, c: "#f59e0b" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Funnel Metrics"}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: m.gap * 1.2 }}>
        {bars.map((b) => (
          <div key={b.lbl}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <div style={{ fontSize: m.fs(7), color: p.text }}>{b.lbl}</div>
              <div style={{ fontSize: m.fs(7), fontWeight: 700, color: b.c }}>{b.pct}%</div>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: `${p.border}` }}>
              <div style={{ width: `${b.pct}%`, height: "100%", borderRadius: 3, background: b.c }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartBeforeAfter({ p, m, label }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>{label || "Impact"}</div>
      <div style={{ flex: 1, display: "flex", gap: m.gap }}>
        <div style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em" }}>Before</div>
          <div style={{ fontSize: m.fs(16), fontWeight: 900, color: p.muted }}>2.1%</div>
          <div style={{ fontSize: m.fs(6), color: p.muted }}>Conversion rate</div>
        </div>
        <div style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1.5px solid ${p.accent}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>After</div>
          <div style={{ fontSize: m.fs(16), fontWeight: 900, color: p.accent }}>8.7%</div>
          <div style={{ fontSize: m.fs(6), color: p.muted }}>Conversion rate</div>
        </div>
      </div>
    </div>
  );
}

function ChartBigStat({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, background: p.bg, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".12em" }}>Annual Revenue</div>
      <div style={{ fontSize: m.fs(36), fontWeight: 900, color: p.accent, lineHeight: 1 }}>$4.2M</div>
      <div style={{ fontSize: m.fs(7), color: p.muted, textAlign: "center", lineHeight: 1.4, maxWidth: "70%" }}>Up 24% year over year, driven by enterprise expansion</div>
    </div>
  );
}

function QuoteBigMark({ p, m }) {
  return (
    <div style={{ height: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 2, textAlign: "center", gap: m.gap, background: p.bg }}>
      <div style={{ position: "absolute", top: m.pad, left: m.pad * 1.5, fontSize: m.fs(48), color: `${p.accent}25`, fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
      <div style={{ fontSize: m.fs(12), fontStyle: "italic", fontWeight: 600, color: p.text, lineHeight: 1.5, maxWidth: "80%" }}>The only way to do great work is to love what you do.</div>
      <div style={{ fontSize: m.fs(7), color: p.muted }}>— Steve Jobs</div>
    </div>
  );
}

function QuoteAccentBorder({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ width: 4, borderRadius: 2, background: p.accent, alignSelf: "stretch", maxHeight: "50%", marginTop: "auto", marginBottom: "auto", flexShrink: 0 }} />
      <div style={{ paddingLeft: m.pad * 1.2, display: "flex", flexDirection: "column", gap: m.gap }}>
        <div style={{ fontSize: m.fs(12), fontStyle: "italic", fontWeight: 600, color: p.text, lineHeight: 1.5 }}>Innovation distinguishes between a leader and a follower.</div>
        <div style={{ fontSize: m.fs(7), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".08em" }}>Steve Jobs</div>
      </div>
    </div>
  );
}

function QuoteFullAccent({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`, padding: m.pad * 2, textAlign: "center", gap: m.gap }}>
      <div style={{ fontSize: m.fs(24), color: "rgba(255,255,255,0.15)", fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
      <div style={{ fontSize: m.fs(12), fontStyle: "italic", fontWeight: 600, color: "#fff", lineHeight: 1.5, maxWidth: "80%" }}>Stay hungry, stay foolish.</div>
      <div style={{ fontSize: m.fs(7), color: "rgba(255,255,255,0.5)" }}>— Stewart Brand</div>
    </div>
  );
}

function QuoteHighlightCard({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ width: "85%", borderRadius: 10, background: p.card, border: `1px solid ${p.border}`, padding: m.pad * 1.5, display: "flex", flexDirection: "column", gap: m.gap }}>
        <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Featured Quote</div>
        <div style={{ fontSize: m.fs(11), fontWeight: 700, color: p.text, lineHeight: 1.5 }}>Design is not just what it looks like. Design is how it works.</div>
        <div style={{ fontSize: m.fs(7), color: p.muted }}>— Steve Jobs</div>
      </div>
    </div>
  );
}

function QuoteSplit({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", background: p.bg }}>
      <div style={{ width: "40%", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 0.5 }}>
        <div style={{ width: m.fs(24), height: m.fs(24), borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        <div style={{ fontSize: m.fs(8), fontWeight: 700, color: "#fff" }}>Jane Smith</div>
        <div style={{ fontSize: m.fs(6), color: "rgba(255,255,255,0.5)" }}>CEO, Acme Inc.</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 1.5, gap: m.gap }}>
        <div style={{ fontSize: m.fs(20), color: `${p.accent}20`, fontFamily: "Georgia, serif", lineHeight: 1 }}>"</div>
        <div style={{ fontSize: m.fs(10), fontStyle: "italic", fontWeight: 600, color: p.text, lineHeight: 1.5 }}>This changed how we think about our entire product strategy.</div>
      </div>
    </div>
  );
}

function QuoteOversized({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: m.gap }}>Key Insight</div>
      <div style={{ fontSize: m.fs(18), fontWeight: 900, color: p.text, lineHeight: 1.3 }}>
        We don't need more features.{" "}
        <span style={{ color: p.accent }}>We need better defaults.</span>
      </div>
    </div>
  );
}

function QuoteCenteredMinimal({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 2, gap: m.gap, background: p.bg, textAlign: "center" }}>
      <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accent }} />
      <div style={{ fontSize: m.fs(11), fontStyle: "italic", fontWeight: 500, color: p.text, lineHeight: 1.6, maxWidth: "80%" }}>Simplicity is the ultimate sophistication.</div>
      <div style={{ width: 32, height: 3, borderRadius: 2, background: p.accent }} />
      <div style={{ fontSize: m.fs(7), color: p.muted }}>— Leonardo da Vinci</div>
    </div>
  );
}

function QuoteStat({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 2, gap: m.gap * 2, background: p.bg }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ fontSize: m.fs(22), fontWeight: 900, color: p.accent }}>94%</div>
        <div style={{ fontSize: m.fs(6), color: p.muted, textAlign: "center", lineHeight: 1.3, maxWidth: 60 }}>customer satisfaction</div>
      </div>
      <div style={{ width: 1, alignSelf: "stretch", background: p.border, margin: `${m.pad}px 0` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap }}>
        <div style={{ fontSize: m.fs(9), fontStyle: "italic", fontWeight: 500, color: p.text, lineHeight: 1.5 }}>The platform transformed our workflow overnight.</div>
        <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent }}>— Head of Product</div>
      </div>
    </div>
  );
}

function SideTwoColumnText({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 1.5, background: p.bg }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap, paddingRight: m.pad }}>
        <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Overview</div>
        {[90, 70, 85, 60].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}25` }} />
        ))}
      </div>
      <div style={{ width: 1, alignSelf: "stretch", background: p.border, margin: `${m.pad}px 0` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap, paddingLeft: m.pad }}>
        <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Details</div>
        {[85, 75, 65, 80].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}25` }} />
        ))}
      </div>
    </div>
  );
}

function SideTextVisual({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", background: p.bg }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 1.5, gap: m.gap }}>
        <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>Feature</div>
        <div style={{ fontSize: m.fs(14), fontWeight: 800, fontFamily: m.hFont, color: p.text, lineHeight: 1.2 }}>Key Point</div>
        {[90, 70, 80, 50].map((w, i) => (
          <div key={i} style={{ width: `${w}%`, height: 3, borderRadius: 2, background: `${p.muted}20` }} />
        ))}
      </div>
      <div style={{ flex: 1, background: `repeating-linear-gradient(45deg, ${p.accent}10, ${p.accent}10 8px, ${p.accent}05 8px, ${p.accent}05 16px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={m.fs(24)} height={m.fs(24)} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" stroke={`${p.accent}40`} strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2" fill={`${p.accent}40`} />
          <path d="M2 16l5-5 4 4 3-3 8 8H2z" fill={`${p.accent}20`} />
        </svg>
      </div>
    </div>
  );
}

function SideProCon({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      {[{ label: "Pros", color: "#22c55e", items: ["Fast setup", "Low cost", "Scalable"] }, { label: "Cons", color: "#f87171", items: ["Limited API", "No mobile", "Beta only"] }].map((col) => (
        <div key={col.label} style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, padding: m.pad, display: "flex", flexDirection: "column", gap: m.gap }}>
          <div style={{ fontSize: m.fs(10), fontWeight: m.hWt, color: col.color }}>{col.label}</div>
          {col.items.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
              <div style={{ fontSize: m.fs(7), color: p.muted }}>{item}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SideTwoStats({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      {[{ val: "$4.2M", lbl: "Annual Revenue", c: p.accent }, { val: "12.4K", lbl: "Active Users", c: "#a78bfa" }].map((s) => (
        <div key={s.lbl} style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 1.5, gap: 4 }}>
          <div style={{ fontSize: m.fs(18), fontWeight: 900, color: s.c }}>{s.val}</div>
          <div style={{ fontSize: m.fs(7), color: p.muted }}>{s.lbl}</div>
        </div>
      ))}
    </div>
  );
}

function SideOptionVs({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 1.5, gap: 0, background: p.bg }}>
      <div style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1px solid ${p.border}`, padding: m.pad, display: "flex", flexDirection: "column", gap: m.gap * 0.6 }}>
        <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>Basic</div>
        {["5 projects", "1 GB storage", "Email support"].map((f) => (
          <div key={f} style={{ fontSize: m.fs(6), color: p.muted }}>• {f}</div>
        ))}
      </div>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: p.card, border: `1px solid ${p.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, margin: `0 -6px` }}>
        <div style={{ fontSize: m.fs(7), fontWeight: 800, color: p.muted }}>vs</div>
      </div>
      <div style={{ flex: 1, borderRadius: m.cRad, background: p.card, border: `1.5px solid ${p.accent}`, padding: m.pad, display: "flex", flexDirection: "column", gap: m.gap * 0.6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>Pro</div>
          <div style={{ fontSize: m.fs(5), fontWeight: 700, color: "#fff", background: p.accent, borderRadius: 3, padding: "1px 4px", textTransform: "uppercase" }}>Best</div>
        </div>
        {["Unlimited projects", "100 GB storage", "Priority support"].map((f) => (
          <div key={f} style={{ fontSize: m.fs(6), color: p.muted }}>• {f}</div>
        ))}
      </div>
    </div>
  );
}

function SideImageCaption({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ flex: 1, display: "flex", gap: m.gap }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ flex: 1, borderRadius: m.cRad, background: `repeating-linear-gradient(45deg, ${p.accent}10, ${p.accent}10 8px, ${p.accent}05 8px, ${p.accent}05 16px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={m.fs(20)} height={m.fs(20)} viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="3" stroke={`${p.accent}40`} strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" fill={`${p.accent}40`} />
              <path d="M2 16l5-5 4 4 3-3 8 8H2z" fill={`${p.accent}20`} />
            </svg>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: m.gap }}>
        {["Figure 1 — Overview of the system", "Figure 2 — Detail of key component"].map((cap) => (
          <div key={cap} style={{ flex: 1, fontSize: m.fs(6), color: p.muted, textAlign: "center" }}>{cap}</div>
        ))}
      </div>
    </div>
  );
}

function CTASingle({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, textAlign: "center", background: p.bg, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em" }}>Ready?</div>
      <div style={{ fontSize: m.fs(16), fontWeight: 800, fontFamily: m.hFont, color: p.text }}>Start building today</div>
      <div style={{ padding: `${m.gap}px ${m.pad * 2}px`, borderRadius: 999, background: p.accent, fontSize: m.fs(9), fontWeight: 700, color: "#fff" }}>Get Started →</div>
    </div>
  );
}

function CTATakeawaysList({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 2, gap: m.gap * 1.5, background: p.bg }}>
      <div style={{ fontSize: m.fs(12), fontWeight: m.hWt, fontFamily: m.hFont, color: p.text }}>Key Takeaways</div>
      {["Market growing 3x year-over-year", "Product-market fit confirmed", "Ready for Series B"].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ fontSize: m.fs(7), fontWeight: 800, color: "#fff" }}>{i + 1}</div>
          </div>
          <div style={{ fontSize: m.fs(8), color: p.text }}>{item}</div>
        </div>
      ))}
    </div>
  );
}

function CTANextSteps({ p, m }) {
  const steps = [
    { n: "1", h: "Sign Up", d: "Create your free account" },
    { n: "2", h: "Configure", d: "Set up your workspace" },
    { n: "3", h: "Launch", d: "Go live in minutes" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>Next Steps</div>
      <div style={{ flex: 1, display: "flex", gap: m.gap }}>
        {steps.map((s) => (
          <div key={s.n} style={{ flex: 1, borderRadius: 8, background: p.card, border: `1px solid ${p.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: m.pad * 0.8 }}>
            <div style={{ fontSize: m.fs(14), fontWeight: 900, color: p.accent }}>{s.n}</div>
            <div style={{ fontSize: m.fs(8), fontWeight: 700, color: p.text }}>{s.h}</div>
            <div style={{ fontSize: m.fs(6), color: p.muted, textAlign: "center" }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTAFullAccent({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, textAlign: "center", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: ".1em" }}>Limited Time</div>
      <div style={{ fontSize: m.fs(18), fontWeight: 900, fontFamily: m.hFont, color: "#fff" }}>Join the Waitlist</div>
      <div style={{ padding: `${m.gap}px ${m.pad * 2}px`, borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)", fontSize: m.fs(9), fontWeight: 700, color: "#fff" }}>Reserve Your Spot →</div>
    </div>
  );
}

function CTAThankYou({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, background: p.bg, padding: m.pad * 2 }}>
      <div style={{ fontSize: m.fs(22), fontWeight: 900, fontFamily: m.hFont, color: p.text }}>Thank You.</div>
      <div style={{ fontSize: m.fs(8), color: p.muted }}>We'd love to hear from you</div>
      {[{ t: "hello@company.com" }, { t: "linkedin.com/in/presenter" }].map((row) => (
        <div key={row.t} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 6, background: p.card, border: `1px solid ${p.border}`, padding: `${m.gap * 0.6}px ${m.pad}px`, width: "70%" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
          <div style={{ fontSize: m.fs(7), color: p.muted }}>{row.t}</div>
        </div>
      ))}
    </div>
  );
}

function CTASummary({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", padding: m.pad * 1.5, background: p.bg }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: m.gap, paddingRight: m.pad }}>
        <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>Summary</div>
        {["3x faster deployment", "50% cost reduction", "99.9% uptime SLA"].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
            <div style={{ fontSize: m.fs(7), color: p.muted }}>{item}</div>
          </div>
        ))}
      </div>
      <div style={{ width: 1, alignSelf: "stretch", background: p.border, margin: `${m.pad}px 0` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap, paddingLeft: m.pad }}>
        <div style={{ fontSize: m.fs(11), fontWeight: 700, fontFamily: m.hFont, color: p.text, textAlign: "center" }}>Ready to scale?</div>
        <div style={{ padding: `${m.gap * 0.8}px ${m.pad * 1.5}px`, borderRadius: 999, background: p.accent, fontSize: m.fs(8), fontWeight: 700, color: "#fff" }}>Let's Talk →</div>
      </div>
    </div>
  );
}

function CTABigQuestion({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: m.pad * 2, textAlign: "center", background: p.bg, gap: m.gap }}>
      <div style={{ fontSize: m.fs(20), fontWeight: 900, fontFamily: m.hFont, color: p.text, lineHeight: 1.2 }}>
        What if you could<br />
        <span style={{ color: p.accent }}>ship 10x faster?</span>
      </div>
      <div style={{ fontSize: m.fs(7), color: p.muted }}>The tools exist. The question is when.</div>
    </div>
  );
}

function CTAThreeTakeaways({ p, m }) {
  const colors = [p.accent, "#a78bfa", "#22c55e"];
  const items = ["Users want speed, not features", "Mobile-first drives 3x engagement", "Simplicity wins every time"];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: m.pad * 1.5, gap: m.gap, background: p.bg }}>
      <div style={{ fontSize: m.fs(10), fontWeight: 700, fontFamily: m.hFont, color: p.text }}>Takeaways</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: m.gap }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: m.gap, borderRadius: 8, background: p.card, borderLeft: `3px solid ${colors[i]}`, padding: `${m.gap}px ${m.pad}px` }}>
            <div style={{ fontSize: m.fs(14), fontWeight: 900, color: colors[i] }}>{i + 1}</div>
            <div style={{ fontSize: m.fs(8), color: p.text }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTAQR({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: m.gap * 2, padding: m.pad * 2, background: p.bg }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: m.gap * 0.5 }}>
        <div style={{ width: m.fs(48), height: m.fs(48), borderRadius: 8, background: p.card, border: `1px solid ${p.border}`, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(5,1fr)", gap: 2, padding: 4 }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{ borderRadius: 1, background: [0,1,2,5,6,10,12,14,18,19,20,23,24].includes(i) ? p.accent : `${p.accent}15` }} />
          ))}
        </div>
        <div style={{ fontSize: m.fs(6), color: p.muted }}>Scan to visit</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: m.gap * 0.5 }}>
        <div style={{ fontSize: m.fs(12), fontWeight: 800, fontFamily: m.hFont, color: p.text }}>Try it free</div>
        <div style={{ fontSize: m.fs(7), color: p.muted, lineHeight: 1.4 }}>Scan the code or visit<br />company.com/start</div>
      </div>
    </div>
  );
}

function CTAClosing({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ fontSize: m.fs(6), fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: p.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: m.gap }}>Final Thought</div>
      <div style={{ fontSize: m.fs(16), fontWeight: 900, fontFamily: m.hFont, color: p.text, lineHeight: 1.3 }}>
        The future belongs to those who{" "}
        <span style={{ color: p.accent }}>build it today.</span>
      </div>
      <div style={{ width: 28, height: 3, borderRadius: 2, background: p.accent, marginTop: m.gap * 1.5 }} />
      <div style={{ fontSize: m.fs(6), color: p.muted, marginTop: m.gap * 0.5 }}>Presented by Alex Chen · Q4 2025</div>
    </div>
  );
}

function CTATwoCTAs({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: m.gap * 1.5, padding: m.pad * 1.5, background: p.bg }}>
      <div style={{ fontSize: m.fs(12), fontWeight: 800, fontFamily: m.hFont, color: p.text }}>Choose your path</div>
      <div style={{ display: "flex", gap: m.gap, width: "100%" }}>
        <div style={{ flex: 1, borderRadius: 8, background: p.accent, padding: m.pad, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: m.fs(9), fontWeight: 700, color: "#fff" }}>Start Free</div>
          <div style={{ fontSize: m.fs(6), color: "rgba(255,255,255,0.6)" }}>No credit card needed</div>
        </div>
        <div style={{ flex: 1, borderRadius: 8, background: p.card, border: `1.5px solid ${p.accent}`, padding: m.pad, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: m.fs(9), fontWeight: 700, color: p.accent }}>Book a Demo</div>
          <div style={{ fontSize: m.fs(6), color: p.muted }}>Talk to our team</div>
        </div>
      </div>
    </div>
  );
}

function CTAContactCard({ p, m }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: m.pad * 2, background: p.bg }}>
      <div style={{ display: "flex", alignItems: "center", gap: m.gap * 1.5, borderRadius: 12, background: p.card, border: `1px solid ${p.border}`, padding: m.pad * 1.5 }}>
        <div style={{ width: m.fs(28), height: m.fs(28), borderRadius: "50%", background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`, flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ fontSize: m.fs(10), fontWeight: 700, color: p.text }}>Alex Chen</div>
          <div style={{ fontSize: m.fs(6), color: p.muted }}>CEO, Acme Inc.</div>
          <div style={{ fontSize: m.fs(6), color: p.accent, marginTop: 2 }}>alex@acme.com</div>
          <div style={{ fontSize: m.fs(6), color: p.muted }}>linkedin.com/in/alexchen</div>
        </div>
      </div>
    </div>
  );
}

// ── Map option IDs to render functions ──

const SLIDE_RENDERERS = {
  "title-minimal-centered": TitleMinimalCentered,
  "title-left-anchored": TitleLeftAnchored,
  "title-split-panel": TitleSplitPanel,
  "title-full-bleed-dark": TitleFullBleedDark,
  "title-headline-only": TitleHeadlineOnly,
  "title-layered-card": TitleLayeredCard,
  "divider-number-title": DividerNumberTitle,
  "divider-full-accent": DividerFullAccent,
  "divider-horizontal-rule": DividerHorizontalRule,
  "divider-left-bar": DividerLeftBar,
  "divider-centered-minimal": DividerCenteredMinimal,
  "divider-split-panel": DividerSplitPanel,
  "chart-bar": ChartBar,
  "chart-line": ChartLine,
  "chart-donut": ChartDonut,
  "chart-stat-grid": ChartStatGrid,
  "chart-callout": ChartCallout,
  "chart-table": ChartTable,
  "chart-progress": ChartProgress,
  "chart-before-after": ChartBeforeAfter,
  "chart-big-stat": ChartBigStat,
  "quote-big-mark": QuoteBigMark,
  "quote-accent-border": QuoteAccentBorder,
  "quote-full-accent": QuoteFullAccent,
  "quote-highlight-card": QuoteHighlightCard,
  "quote-split": QuoteSplit,
  "quote-oversized": QuoteOversized,
  "quote-centered-minimal": QuoteCenteredMinimal,
  "quote-stat": QuoteStat,
  "side-two-column-text": SideTwoColumnText,
  "side-text-visual": SideTextVisual,
  "side-pro-con": SideProCon,
  "side-two-stats": SideTwoStats,
  "side-option-vs": SideOptionVs,
  "side-image-caption": SideImageCaption,
  "cta-single": CTASingle,
  "cta-takeaways-list": CTATakeawaysList,
  "cta-next-steps": CTANextSteps,
  "cta-full-accent": CTAFullAccent,
  "cta-thank-you": CTAThankYou,
  "cta-summary": CTASummary,
  "cta-big-question": CTABigQuestion,
  "cta-three-takeaways": CTAThreeTakeaways,
  "cta-qr": CTAQR,
  "cta-closing": CTAClosing,
  "cta-two-ctas": CTATwoCTAs,
  "cta-contact-card": CTAContactCard,
};

// ── Main Preview Component ──

export default function PreviewSlideLayout({ p, mood }) {
  const m = mood || {};
  const hoveredSlideLayout = usePromptStore((s) => s.hoveredSlideLayout);
  const slideLayouts = usePromptStore((s) => s.slideLayouts);

  // Show hovered, or last selected, or default
  const activeId = hoveredSlideLayout
    || (slideLayouts && slideLayouts.length > 0 ? slideLayouts[slideLayouts.length - 1] : null)
    || "title-minimal-centered";

  const cat = getCatForOption(activeId);
  const opt = cat?.options.find((o) => o.id === activeId);
  const Renderer = SLIDE_RENDERERS[activeId];

  const scales = {
    pad: Math.round((m.padScale || 1) * 14),
    gap: Math.round((m.gapScale || 1) * 8),
    fs: (base) => Math.round((m.fontScale || 1) * base),
    cRad: m.cardRadius ?? 8,
    hWt: m.headWeight || 700,
    hFont: m.headFont || "'DM Sans',sans-serif",
    bFont: m.bodyFont || "'DM Sans',sans-serif",
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: p.bg, fontFamily: scales.bFont }}>
      {/* Slide toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${scales.gap}px ${scales.pad}px`, borderBottom: `1px solid ${p.border}` }}>
        <div style={{ fontSize: scales.fs(8), fontWeight: 600, color: p.accent, textTransform: "uppercase", letterSpacing: ".1em" }}>
          {cat?.label || "Slide"}
        </div>
        <div style={{ fontSize: scales.fs(7), color: p.muted }}>
          {opt?.label || "Preview"}
        </div>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {Renderer ? <Renderer p={p} m={scales} /> : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: scales.fs(9), color: p.muted }}>Select a layout to preview</div>
          </div>
        )}
      </div>

      {/* Slide indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: `${scales.gap}px`, borderTop: `1px solid ${p.border}`, gap: 4 }}>
        {(slideLayouts || []).map((id, i) => (
          <div key={id} style={{ width: id === activeId ? 16 : 6, height: 6, borderRadius: 3, background: id === activeId ? p.accent : `${p.dim}40`, transition: "all 0.2s" }} />
        ))}
        {(!slideLayouts || slideLayouts.length === 0) && (
          <div style={{ fontSize: scales.fs(7), color: p.muted }}>Hover or select layouts</div>
        )}
      </div>
    </div>
  );
}

// Export renderers for inline mini-previews
export { SLIDE_RENDERERS };
