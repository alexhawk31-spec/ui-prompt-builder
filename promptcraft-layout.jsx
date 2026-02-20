import { useState } from "react";

const steps = [
  { id: "theme", icon: "palette", label: "Theme", sub: "Colors & palette" },
  { id: "mood", icon: "sparkles", label: "Mood", sub: "Density & feel" },
  { id: "layout", icon: "layout", label: "Layout", sub: "Page structure" },
  { id: "components", icon: "grid", label: "Components", sub: "UI blocks" },
  { id: "animation", icon: "zap", label: "Animation", sub: "Motion" },
  { id: "border", icon: "circle", label: "Borders", sub: "Rounding" },
  { id: "app-desc", icon: "edit", label: "App Info", sub: "Name & desc" },
  { id: "aws", icon: "aws", label: "AWS", sub: "Brand" },
  { id: "notes", icon: "note", label: "Notes", sub: "Extra" },
];
const themeData = [
  { id: "neon-cyber", name: "Neon Cyber", sw: ["#0a0e1a","#121830","#00f5d4","#e0f0ff"] },
  { id: "dark-luxury", name: "Dark Luxury", sw: ["#0B0F19","#1a1f2e","#C9A84C","#F0EDE6"] },
  { id: "noir-crimson", name: "Noir Crimson", sw: ["#0d0a0a","#1a1214","#dc2626","#fce4ec"] },
  { id: "charcoal", name: "Charcoal Ember", sw: ["#1a1a1a","#2d2d2d","#e8632b","#f5f0eb"] },
  { id: "ocean", name: "Deep Ocean", sw: ["#0a1628","#132040","#0ea5e9","#e0f2fe"] },
];
const ip = {
  palette:<><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12" r="1.5"/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.66 0 3-1.34 3-3 0-.79-.31-1.5-.81-2.03-.49-.52-.79-1.21-.79-2.02 0-1.66 1.34-3 3-3h3.03c3.32 0 6.02-2.69 6.02-6.01A9.99 9.99 0 0012 2z"/></>,
  sparkles:<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>,
  layout:<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  grid:<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  zap:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  circle:<circle cx="12" cy="12" r="10"/>,
  edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  aws:<><path d="M6 12l2 2 4-4"/><rect x="2" y="6" width="20" height="12" rx="2"/></>,
  note:<><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></>,
  copy:<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
  check:<polyline points="20 6 9 17 4 12"/>,
  wand:<><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="M11 6.2L9.7 5"/><path d="M11 11.8L9.7 13"/><path d="M2 21l9-9"/></>,
  list:<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  chevUp:<polyline points="18 15 12 9 6 15"/>,
  chevDown:<polyline points="6 9 12 15 18 9"/>,
  moon:<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
  sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
  expand:<><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>,
};
const I=({name,size=18,color="currentColor"})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ip[name]}</svg>);

/* ═══ color tokens for light/dark shell mode ═══ */
function getShellColors(light) {
  if (light) return {
    page: "#f0f1f5", appBg: "#ffffff", panelBg: "rgba(235,237,245,0.9)", panelBorder: "rgba(0,0,0,0.08)",
    headerBg: "#ffffff", headerBorder: "rgba(0,0,0,0.06)", text: "#1a1a2e", muted: "rgba(26,26,46,0.45)",
    dim: "rgba(26,26,46,0.12)", termBg: "#f5f6fa", termBorder: "rgba(67,56,202,0.15)", termBarBg: "rgba(67,56,202,0.04)",
    includedBg: "rgba(16,185,129,0.08)", includedColor: "#059669",
    navGrad: "linear-gradient(180deg,#4f46e5,#4338ca,#3730a3)",
  };
  return {
    page: "#080b14", appBg: "#0e1118", panelBg: "rgba(28,32,52,0.7)", panelBorder: "rgba(255,255,255,0.08)",
    headerBg: "#0e1118", headerBorder: "rgba(255,255,255,0.04)", text: "#F0EDE6", muted: "rgba(240,237,230,0.35)",
    dim: "rgba(240,237,230,0.12)", termBg: "#1e2130", termBorder: "rgba(129,140,248,0.15)", termBarBg: "linear-gradient(180deg,rgba(129,140,248,0.06),rgba(129,140,248,0.02))",
    includedBg: "rgba(110,231,183,0.1)", includedColor: "#6ee7b7",
    navGrad: "linear-gradient(180deg,#4338ca,#3730a3,#312e81)",
  };
}

/* ═══ Dashboard Preview ═══ */
function Dash({theme}){
  const[bg,card,accent,text]=theme.sw;
  return(
    <div style={{background:bg,borderRadius:12,height:"100%",padding:16,fontFamily:"'DM Sans',sans-serif",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:18,fontWeight:700,color:text}}>Dashboard</div>
        <div style={{padding:"5px 10px",borderRadius:7,background:accent,color:bg,fontSize:9,fontWeight:700}}>New</div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:10}}>
        {["Dashboard","Analytics","Settings"].map((t,i)=>(<div key={t} style={{padding:"4px 10px",borderRadius:6,fontSize:9,fontWeight:i===0?600:400,background:i===0?`${accent}15`:"transparent",color:i===0?accent:`${text}25`}}>{t}</div>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {[{l:"Revenue",v:"$2.4M",c:"+12.4%"},{l:"Active Users",v:"18.2K",c:"+8.1%"},{l:"Latency",v:"42ms",c:"-3.2%"}].map(s=>(
          <div key={s.l} style={{borderRadius:10,padding:10,background:card,border:`1px solid ${accent}10`}}>
            <div style={{fontSize:7,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",color:`${text}45`,marginBottom:3}}>{s.l}</div>
            <div style={{fontSize:16,fontWeight:700,color:text,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:9,color:accent,marginTop:2}}>{s.c}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:8,flex:1,minHeight:0}}>
        <div style={{borderRadius:10,padding:8,background:card,border:`1px solid ${accent}10`,display:"flex",flexDirection:"column",gap:2}}>
          {["Home","Stats","Reports","Team","Settings"].map((n,i)=>(<div key={n} style={{padding:"4px 6px",borderRadius:5,fontSize:8,fontWeight:i===0?600:400,color:i===0?accent:`${text}20`,background:i===0?`${accent}12`:"transparent",borderLeft:i===0?`2px solid ${accent}`:"2px solid transparent"}}>{n}</div>))}
        </div>
        <div style={{borderRadius:10,padding:10,background:card,border:`1px solid ${accent}10`,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
          <div style={{fontSize:6,fontWeight:600,textTransform:"uppercase",color:`${text}15`,marginBottom:6}}>Performance</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,flex:1,minHeight:0}}>
            {[30,45,38,60,52,70,48,55,62,75,58,82,68,90].map((h,i)=>(<div key={i} style={{flex:1,height:`${h}%`,borderRadius:2,background:i>=12?accent:`${accent}20`}}/>))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Theme Controls ═══ */
function TC({theme,setTheme,c}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{padding:"10px 14px",borderRadius:10,background:"rgba(129,140,248,0.04)",border:"1px solid rgba(129,140,248,0.08)",fontSize:11,color:c.muted,display:"flex",alignItems:"center",gap:8}}><span>✨</span>Your theme controls background, card, accent, and text colors. Watch the preview update as you pick.</div>
      <div style={{display:"flex",gap:4}}><div style={{display:"flex",borderRadius:9,overflow:"hidden",border:`1px solid ${c.panelBorder}`}}>
        {["dark","light"].map(m=>(<button key={m} style={{padding:"7px 13px",border:"none",cursor:"pointer",fontFamily:"inherit",background:m==="dark"?`${c.dim}`:"transparent",color:m==="dark"?c.text:c.muted,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><I name={m==="dark"?"moon":"sun"} size={12} color={m==="dark"?c.text:c.muted}/>{m.charAt(0).toUpperCase()+m.slice(1)}</button>))}
      </div></div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {themeData.map(t=>(<button key={t.id} onClick={()=>setTheme(t)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 14px",borderRadius:10,cursor:"pointer",fontFamily:"inherit",border:theme.id===t.id?`1.5px solid ${t.sw[2]}60`:`1px solid ${c.panelBorder}`,background:theme.id===t.id?`${t.sw[2]}10`:"rgba(0,0,0,0.08)",color:theme.id===t.id?c.text:c.muted,fontSize:11,fontWeight:600,transition:"all 0.15s"}}><div style={{display:"flex",gap:2}}>{t.sw.map((cl,i)=><div key={i} style={{width:9,height:9,borderRadius:2,background:cl,border:"0.5px solid rgba(128,128,128,0.2)"}}/>)}</div>{t.name}</button>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
        {["Background","Card","Accent","Text"].map((l,i)=>(<div key={l}><div style={{width:"100%",height:36,borderRadius:8,background:theme.sw[i],border:`1px solid ${c.panelBorder}`,marginBottom:5}}/><div style={{fontSize:8,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",color:c.muted}}>{l}</div><div style={{fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:c.muted,marginTop:1}}>{theme.sw[i]}</div></div>))}
      </div>
      <div style={{padding:14,borderRadius:12,background:"rgba(128,128,128,0.04)",border:`1px solid ${c.panelBorder}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:c.muted}}>Accent Color</div><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:3,background:theme.sw[2]}}/><span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:c.muted}}>{theme.sw[2]}</span></div></div>
        <div style={{height:12,borderRadius:6,background:"linear-gradient(90deg,#00f5d4,#818cf8,#e44d6e,#C9A84C,#10b981,#0ea5e9)",opacity:0.7,cursor:"pointer",marginBottom:10}}/>
        <div style={{display:"flex",gap:7,justifyContent:"center"}}>{["#00f5d4","#e44d6e","#C9A84C","#0ea5e9","#10b981","#f59e0b","#ec4899"].map(cl=>(<div key={cl} style={{width:22,height:22,borderRadius:"50%",background:cl,border:`2px solid ${c.panelBorder}`,cursor:"pointer"}}/>))}</div>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function PromptCraft(){
  const[theme,setTheme]=useState(themeData[0]);
  const[activeStep,setActiveStep]=useState("theme");
  const[configured,setConfigured]=useState(["theme"]);
  const[expanded,setExpanded]=useState(false);
  const[light,setLight]=useState(false);
  const c = getShellColors(light);
  const toggleConfig=(id)=>setConfigured(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const currentStep = steps.find(s=>s.id===activeStep);

  return(
    <div style={{minHeight:"100vh",background:c.page,color:c.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",transition:"all 0.3s ease"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(129,140,248,0.2);border-radius:4px}
      `}</style>

      {/* ═══ APP TITLE BAR ═══ */}
      <div style={{padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#4338ca,#6366f1)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 8px rgba(67,56,202,0.3)"}}>
            <I name="wand" size={16} color="#fff"/>
          </div>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:c.text,letterSpacing:"-0.02em"}}>PromptCraft</div>
            <div style={{fontSize:10,color:c.muted,marginTop:-1}}>Build UI prompts visually</div>
          </div>
        </div>
        {/* Shell light/dark toggle */}
        <button onClick={()=>setLight(!light)} style={{
          display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:20,
          border:`1px solid ${c.panelBorder}`,background:light?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.04)",
          cursor:"pointer",fontFamily:"inherit",color:c.muted,fontSize:10,fontWeight:600,transition:"all 0.2s",
        }}>
          <I name={light?"sun":"moon"} size={13} color={light?"#f59e0b":"#818cf8"}/>
          {light?"Light Mode":"Dark Mode"}
        </button>
      </div>

      {/* ═══ APP FRAME ═══ */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px 60px"}}>
        <div style={{width:"100%",height:740,borderRadius:16,overflow:"hidden",display:"flex",border:`1px solid ${c.panelBorder}`,boxShadow:light?"0 4px 24px rgba(0,0,0,0.08)":"0 4px 24px rgba(0,0,0,0.3)"}}>

          {/* NAV */}
          <div style={{width:58,display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 0 10px",gap:2,background:c.navGrad,flexShrink:0}}>
            {steps.map(s=>{const a=activeStep===s.id;const d=configured.includes(s.id);return(
              <button key={s.id} onClick={()=>setActiveStep(s.id)} title={s.label} style={{width:38,height:38,borderRadius:10,border:"none",cursor:"pointer",background:a?"rgba(255,255,255,0.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",transition:"all 0.15s"}}>
                <I name={s.icon} size={15} color={a?"#fff":d?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.25)"}/>
                {d&&!a&&<div style={{position:"absolute",top:4,right:4,width:5,height:5,borderRadius:"50%",background:"#6ee7b7",border:"1.5px solid #3730a3"}}/>}
                {a&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:16,borderRadius:"0 3px 3px 0",background:"#fff"}}/>}
              </button>);})}
            <div style={{flex:1}}/>
            <button style={{width:38,height:38,borderRadius:10,border:"none",cursor:"pointer",background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              <I name="list" size={14} color="rgba(255,255,255,0.7)"/>
              <div style={{position:"absolute",top:2,right:2,minWidth:13,height:13,borderRadius:7,background:"#6ee7b7",color:"#0c0e14",fontSize:7,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{configured.length}</div>
            </button>
          </div>

          {/* MAIN */}
          <div style={{flex:1,display:"flex",flexDirection:"column",background:c.appBg,minWidth:0,transition:"background 0.3s"}}>

            {/* CONTENT: config 60% + preview 40% */}
            <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0}}>

              {/* CONFIG PANEL — 60% */}
              <div style={{flex:3,overflowY:"auto",display:"flex",flexDirection:"column",minWidth:0}}>
                {/* Section header inside config */}
                <div style={{padding:"14px 20px 10px",flexShrink:0}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:30,height:30,borderRadius:9,background:"rgba(129,140,248,0.08)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <I name={currentStep?.icon||"palette"} size={15} color="#818cf8"/>
                      </div>
                      <div>
                        <div style={{fontSize:17,fontWeight:700,color:c.text}}>{currentStep?.label}</div>
                        <div style={{fontSize:10,color:c.muted,marginTop:1}}>{currentStep?.sub}</div>
                      </div>
                    </div>
                    <button onClick={()=>toggleConfig(activeStep)} style={{padding:"6px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",background:configured.includes(activeStep)?c.includedBg:"rgba(128,128,128,0.06)",color:configured.includes(activeStep)?c.includedColor:c.muted,fontSize:10,fontWeight:600,display:"flex",alignItems:"center",gap:4,transition:"all 0.15s"}}>
                      {configured.includes(activeStep)?<><I name="check" size={11}/>Included</>:"Include in prompt"}
                    </button>
                  </div>
                </div>
                {/* Config content */}
                <div style={{flex:1,padding:"0 14px 14px",overflowY:"auto"}}>
                  <div style={{background:c.panelBg,border:`1px solid ${c.panelBorder}`,borderRadius:14,padding:20,minHeight:"100%",transition:"all 0.3s"}}>
                    <TC theme={theme} setTheme={setTheme} c={c}/>
                  </div>
                </div>
              </div>

              {/* PREVIEW — 40%, own space */}
              <div style={{flex:2,padding:14,paddingLeft:0,display:"flex",flexDirection:"column",flexShrink:0}}>
                <div style={{flex:1,borderRadius:14,overflow:"hidden",border:"2px solid #4338ca",boxShadow:"0 4px 24px rgba(67,56,202,0.2), 0 0 0 1px rgba(67,56,202,0.08)",display:"flex",flexDirection:"column"}}>
                  <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,#4338ca,#3730a3)",flexShrink:0}}>
                    <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:".06em"}}>Live Preview</span>
                    <div style={{width:18,height:18,borderRadius:5,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><I name="expand" size={9} color="rgba(255,255,255,0.6)"/></div>
                  </div>
                  <div style={{flex:1,minHeight:0}}><Dash theme={theme}/></div>
                </div>
              </div>
            </div>

            {/* TERMINAL */}
            <div style={{padding:"0 14px 14px",flexShrink:0}}>
              <div onClick={()=>setExpanded(!expanded)} style={{borderRadius:12,background:c.termBg,border:`1px solid ${c.termBorder}`,overflow:"hidden",cursor:"pointer",transition:"all 0.3s"}}>
                <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:c.termBarBg}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{display:"flex",gap:4}}><div style={{width:7,height:7,borderRadius:"50%",background:"#ff5f57"}}/><div style={{width:7,height:7,borderRadius:"50%",background:"#febc2e"}}/><div style={{width:7,height:7,borderRadius:"50%",background:"#28c840"}}/></div>
                    <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"rgba(129,140,248,0.7)"}}>prompt-output</span>
                    <I name={expanded?"chevUp":"chevDown"} size={11} color="rgba(129,140,248,0.3)"/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:8,fontFamily:"'JetBrains Mono',monospace",color:c.muted}}>{configured.length} sections · ~{configured.length*140} tokens</span>
                    <button onClick={e=>e.stopPropagation()} style={{padding:"4px 10px",borderRadius:5,border:"none",background:"#818cf8",color:"#0c0e14",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:3}}><I name="copy" size={10} color="#0c0e14"/>Copy</button>
                  </div>
                </div>
                {expanded&&<div style={{padding:"8px 12px 12px",fontFamily:"'JetBrains Mono',monospace",borderTop:`1px solid ${c.termBorder}`}}>
                  <div style={{fontSize:10}}><span style={{color:"#28c840"}}>$</span><span style={{color:c.dim}}> --</span><span style={{color:"#818cf8",fontWeight:600}}>visual-theme</span></div>
                  <div style={{fontSize:9,color:c.muted,paddingLeft:14,marginTop:2}}>{theme.name}, accent: "{theme.sw[2]}"</div>
                  <div style={{marginTop:6,fontSize:9,color:c.dim}}><span style={{color:"#28c840"}}>$</span> ready<span style={{display:"inline-block",width:6,height:12,background:"rgba(129,140,248,0.4)",marginLeft:3,animation:"blink 1s step-end infinite",verticalAlign:"text-bottom"}}/></div>
                </div>}
                {!expanded&&<div style={{padding:"4px 12px 8px",fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:c.dim}}><span style={{color:"#28c840"}}>$</span> generate <span style={{color:"#818cf8"}}>--visual-theme</span></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink{50%{opacity:0}}`}</style>
    </div>
  );
}
