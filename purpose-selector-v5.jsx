import { useState } from "react";

const ip = {
  compass:<><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></>,
  barChart:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  film:<><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></>,
  hammer:<><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 010-3L12 9"/><path d="M17.64 15L22 10.64"/><path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V6.5a.5.5 0 01.5-.5c.92 0 1.79.37 2.44 1.02l1.12 1.12"/><path d="M13.04 2.82l1.13 1.12c.6.6.94 1.4.94 2.25V8"/></>,
  users:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  target:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  wind:<><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></>,
  check:<polyline points="20 6 9 17 4 12"/>,
  moon:<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>,
  sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
};
const I=({name,size=18,color="currentColor"})=>(<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ip[name]}</svg>);

const purposes = [
  { id:"learn", name:"Learn & Explore", icon:"compass", color:"#6366f1", desc:"Step-by-step guidance with clear progression" },
  { id:"data", name:"Data-Heavy", icon:"barChart", color:"#16a34a", desc:"Metrics, tables, and charts front and center" },
  { id:"story", name:"Telling a Story", icon:"film", color:"#d97706", desc:"Big visuals, cinematic pacing, narrative flow" },
  { id:"builder", name:"Builder", icon:"hammer", color:"#0284c7", desc:"Workspace with tools, canvas, and panels" },
  { id:"community", name:"Community Based", icon:"users", color:"#db2777", desc:"Feeds, profiles, and real-time conversations" },
  { id:"discover", name:"Discover", icon:"search", color:"#ea580c", desc:"Browse, filter, and explore a catalog" },
  { id:"mission", name:"Mission Control", icon:"target", color:"#dc2626", desc:"Track status, assign work, move things forward" },
  { id:"freestyle", name:"Freestyle", icon:"wind", color:"#64748b", desc:"No specific type — just apply your settings" },
];

/* ═══ PALETTE TOKENS — light vs dark ═══ */
function getP(dark) {
  if (dark) return {
    bg:"#0f1219", card:"#1a1e2e", surface:"#141824", text:"#e5e7eb", muted:"#9ca3af",
    dim:"#4b5563", border:"#2d3348", borderLight:"#232840", accent:"#818cf8", accentBg:"#1e2040",
    green:"#4ade80",greenBg:"#0c2a1a", red:"#f87171",redBg:"#2a0f0f",
    amber:"#fbbf24",amberBg:"#2a2008", blue:"#60a5fa",blueBg:"#0f1a2e",
    pink:"#f472b6",pinkBg:"#2a0f20", orange:"#fb923c",orangeBg:"#2a1808",
    gradA:"#1a1e30",gradB:"#1a2030",
    tagBg:"rgba(255,255,255,0.06)", inputBg:"#1a1e2e", inputBorder:"#2d3348",
  };
  return {
    bg:"#ffffff", card:"#f9fafb", surface:"#f3f4f6", text:"#111827", muted:"#6b7280",
    dim:"#9ca3af", border:"#e5e7eb", borderLight:"#f3f4f6", accent:"#6366f1", accentBg:"#eef2ff",
    green:"#16a34a",greenBg:"#dcfce7", red:"#dc2626",redBg:"#fef2f2",
    amber:"#d97706",amberBg:"#fef9c3", blue:"#0284c7",blueBg:"#e0f2fe",
    pink:"#db2777",pinkBg:"#fce7f3", orange:"#ea580c",orangeBg:"#fff7ed",
    gradA:"#eef2ff",gradB:"#fdf4ff",
    tagBg:"#f3f4f6", inputBg:"#fff", inputBorder:"#e5e7eb",
  };
}

/* ═══ THUMBNAILS ═══ */
function ThumbLearn({c,p}){return(<div style={{height:"100%",padding:7,display:"flex",flexDirection:"column",gap:3,background:p.bg}}>
  <div style={{height:4,borderRadius:2,background:p.border}}><div style={{width:"40%",height:"100%",borderRadius:2,background:c}}/></div>
  <div style={{flex:1,borderRadius:5,background:p.card,border:`1px solid ${p.border}`,padding:5,display:"flex",flexDirection:"column",gap:3}}>
    <div style={{width:"55%",height:4,borderRadius:2,background:p.dim}}/>
    <div style={{width:"85%",height:2,borderRadius:1,background:p.borderLight}}/>
    <div style={{padding:4,borderRadius:4,background:p.accentBg,borderLeft:`2px solid ${c}`}}>
      <div style={{width:"60%",height:2,borderRadius:1,background:`${c}80`}}/>
    </div>
    <div style={{width:"75%",height:2,borderRadius:1,background:p.borderLight}}/>
  </div>
  <div style={{display:"flex",justifyContent:"space-between"}}><div style={{width:20,height:9,borderRadius:4,background:p.surface}}/><div style={{width:20,height:9,borderRadius:4,background:c}}/></div>
</div>);}

function ThumbData({c,p}){return(<div style={{height:"100%",padding:5,display:"flex",flexDirection:"column",gap:3,background:p.bg}}>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:2}}>
    {[1,2,3,4].map(i=>(<div key={i} style={{borderRadius:3,padding:2,background:p.card,border:`1px solid ${p.border}`}}>
      <div style={{width:10,height:1,borderRadius:1,background:p.dim}}/>
      <div style={{width:14,height:4,borderRadius:1,background:i===1?c:p.dim,marginTop:1}}/>
    </div>))}
  </div>
  <div style={{flex:1,borderRadius:4,background:p.card,border:`1px solid ${p.border}`,padding:3,display:"flex",alignItems:"flex-end",gap:1}}>
    {[30,50,35,65,45,70,40,60,55,75,50,80,65,90].map((h,i)=>(<div key={i} style={{flex:1,height:`${h}%`,borderRadius:1,background:i>=12?c:`${c}30`}}/>))}
  </div>
  <div style={{borderRadius:3,background:p.card,border:`1px solid ${p.border}`,overflow:"hidden"}}>
    {[0,1,2].map(r=>(<div key={r} style={{height:5,borderBottom:r<2?`1px solid ${p.borderLight}`:"none"}}/>))}
  </div>
</div>);}

function ThumbStory({c,p}){return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:p.bg}}>
  <div style={{flex:2,background:`linear-gradient(135deg,${p.gradA},${p.gradB})`,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:3,padding:5}}>
    <div style={{width:"50%",height:5,borderRadius:2,background:p.dim}}/>
    <div style={{width:22,height:8,borderRadius:4,background:c}}/>
  </div>
  <div style={{flex:1,padding:5,display:"flex",gap:3}}>
    {[1,2,3].map(i=>(<div key={i} style={{flex:1,borderRadius:4,background:p.card,border:`1px solid ${p.border}`,padding:3}}>
      <div style={{width:10,height:10,borderRadius:4,background:p.accentBg,marginBottom:2}}/>
      <div style={{width:"70%",height:2,borderRadius:1,background:p.dim}}/>
    </div>))}
  </div>
</div>);}

function ThumbBuilder({c,p}){return(<div style={{height:"100%",display:"flex",background:p.bg}}>
  <div style={{width:16,background:p.card,borderRight:`1px solid ${p.border}`,padding:2,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
    {[1,2,3,4].map(i=>(<div key={i} style={{width:9,height:9,borderRadius:2,background:i===1?p.accentBg:p.surface,border:`1px solid ${i===1?c:p.border}`}}/>))}
  </div>
  <div style={{flex:1,padding:5,display:"flex",alignItems:"center",justifyContent:"center",background:p.surface}}>
    <div style={{width:"65%",height:"55%",borderRadius:4,border:`1.5px dashed ${c}60`}}/>
  </div>
  <div style={{width:20,background:p.card,borderLeft:`1px solid ${p.border}`,padding:2}}>
    {[1,2,3].map(i=>(<div key={i} style={{height:7,borderRadius:2,background:p.surface,border:`1px solid ${p.border}`,marginBottom:2}}/>))}
  </div>
</div>);}

function ThumbCommunity({c,p}){return(<div style={{height:"100%",padding:5,display:"flex",flexDirection:"column",gap:3,background:p.bg}}>
  {[1,2].map(n=>(<div key={n} style={{borderRadius:5,background:p.card,border:`1px solid ${p.border}`,padding:4}}>
    <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:2}}>
      <div style={{width:10,height:10,borderRadius:"50%",background:n===1?`${c}30`:p.amberBg}}/>
      <div style={{width:20,height:2,borderRadius:1,background:p.dim}}/>
    </div>
    <div style={{width:"80%",height:2,borderRadius:1,background:p.borderLight}}/>
    {n===1&&<div style={{height:14,borderRadius:3,background:p.accentBg,border:`1px solid ${c}30`,marginTop:2}}/>}
  </div>))}
</div>);}

function ThumbDiscover({c,p}){return(<div style={{height:"100%",padding:5,display:"flex",flexDirection:"column",gap:3,background:p.bg}}>
  <div style={{height:12,borderRadius:6,background:p.card,border:`1px solid ${p.border}`}}/>
  <div style={{display:"flex",gap:2}}>{[1,2,3].map(i=>(<div key={i} style={{padding:"1px 5px",borderRadius:5,height:8,background:i===1?c:p.card,border:`1px solid ${i===1?c:p.border}`}}/>))}</div>
  <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:3}}>
    {[p.blueBg,p.amberBg,p.greenBg,p.accentBg].map((bg,i)=>(<div key={i} style={{borderRadius:4,overflow:"hidden",background:p.card,border:`1px solid ${p.border}`}}>
      <div style={{height:14,background:bg}}/>
      <div style={{padding:2}}><div style={{width:"60%",height:2,borderRadius:1,background:p.dim}}/></div>
    </div>))}
  </div>
</div>);}

function ThumbMission({c,p}){return(<div style={{height:"100%",padding:4,display:"flex",flexDirection:"column",gap:2,background:p.bg}}>
  <div style={{display:"flex",gap:2}}>{[p.surface,p.accentBg,p.greenBg].map((bg,i)=>(<div key={i} style={{flex:1,height:8,borderRadius:3,background:bg}}/>))}</div>
  <div style={{flex:1,display:"flex",gap:2}}>
    {[3,2,3].map((n,ci)=>(<div key={ci} style={{flex:1,borderRadius:4,background:p.surface,border:`1px solid ${p.border}`,padding:2,display:"flex",flexDirection:"column",gap:1}}>
      {Array(n).fill(0).map((_,ri)=>(<div key={ri} style={{borderRadius:3,padding:3,background:ci===1&&ri===0?p.accentBg:p.bg,border:`1px solid ${ci===1&&ri===0?`${c}40`:p.border}`,flexShrink:0}}>
        <div style={{width:"70%",height:2,borderRadius:1,background:p.dim}}/>
      </div>))}
    </div>))}
  </div>
</div>);}

function ThumbFreestyle({c,p}){return(<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:p.bg}}>
  <div style={{width:22,height:22,borderRadius:"50%",border:`1.5px dashed ${p.dim}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <I name="wind" size={10} color={p.dim}/>
  </div>
</div>);}

const thumbMap={learn:ThumbLearn,data:ThumbData,story:ThumbStory,builder:ThumbBuilder,community:ThumbCommunity,discover:ThumbDiscover,mission:ThumbMission,freestyle:ThumbFreestyle};

/* ═══ FULL PREVIEWS ═══ */

function FullLearn({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:16,gap:10,background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{fontSize:15,fontWeight:700,color:p.text}}>Getting Started</div>
      <div style={{fontSize:9,fontWeight:600,color:p.muted}}>Step 2 of 5</div>
    </div>
    <div style={{height:6,borderRadius:3,background:p.surface}}><div style={{width:"40%",height:"100%",borderRadius:3,background:p.accent}}/></div>
    <div style={{flex:1,borderRadius:12,background:p.card,border:`1px solid ${p.border}`,padding:16,display:"flex",flexDirection:"column",gap:8,overflow:"hidden"}}>
      <div style={{width:"55%",height:8,borderRadius:4,background:p.dim}}/>
      <div style={{width:"92%",height:4,borderRadius:2,background:p.borderLight}}/>
      <div style={{width:"80%",height:4,borderRadius:2,background:p.borderLight}}/>
      <div style={{padding:12,borderRadius:10,background:p.accentBg,borderLeft:`3px solid ${p.accent}`}}>
        <div style={{width:"65%",height:5,borderRadius:2,background:`${p.accent}80`}}/>
        <div style={{width:"45%",height:4,borderRadius:2,background:`${p.accent}50`,marginTop:5}}/>
      </div>
      <div style={{width:"88%",height:4,borderRadius:2,background:p.borderLight}}/>
      <div style={{borderRadius:10,background:p.bg,border:`1px solid ${p.border}`,padding:10,marginTop:2}}>
        <div style={{width:"40%",height:5,borderRadius:3,background:p.dim,marginBottom:6}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <div style={{height:28,borderRadius:8,background:p.card,border:`1px solid ${p.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:500,color:p.muted}}>Option A</div>
          <div style={{height:28,borderRadius:8,background:p.accentBg,border:`2px solid ${p.accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:p.accent}}>Option B ✓</div>
        </div>
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{padding:"8px 16px",borderRadius:8,background:p.surface,border:`1px solid ${p.border}`,fontSize:10,fontWeight:600,color:p.muted}}>Back</div>
      <div style={{padding:"8px 16px",borderRadius:8,background:p.accent,fontSize:10,fontWeight:700,color:"#fff"}}>Continue</div>
    </div>
  </div>
);}

function FullData({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:6,background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 4px"}}>
      <div style={{fontSize:15,fontWeight:700,color:p.text}}>Analytics</div>
      <div style={{display:"flex",gap:2,background:p.surface,borderRadius:6,padding:2}}>
        {["1D","1W","1M","1Y"].map((t,i)=>(<div key={t} style={{padding:"3px 8px",borderRadius:4,fontSize:8,fontWeight:600,background:i===2?p.green:"transparent",color:i===2?"#fff":p.muted}}>{t}</div>))}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6}}>
      {[{l:"Revenue",v:"$2.4M",c:"+12.4%"},{l:"Users",v:"18.2K",c:"+8.1%"},{l:"Sessions",v:"142K",c:"+3.7%"},{l:"Bounce",v:"24%",c:"-2.1%"}].map(s=>(
        <div key={s.l} style={{borderRadius:10,padding:8,background:p.card,border:`1px solid ${p.border}`}}>
          <div style={{fontSize:7,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",color:p.dim,marginBottom:3}}>{s.l}</div>
          <div style={{fontSize:14,fontWeight:700,color:p.text,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
          <div style={{fontSize:8,fontWeight:600,color:s.c.startsWith("+")?p.green:p.red,marginTop:2}}>{s.c}</div>
        </div>
      ))}
    </div>
    <div style={{flex:1,borderRadius:10,background:p.card,border:`1px solid ${p.border}`,padding:10,display:"flex",flexDirection:"column",minHeight:0}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:8,fontWeight:600,textTransform:"uppercase",color:p.dim}}>Performance</div>
        <div style={{display:"flex",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:3,borderRadius:2,background:p.green}}/><span style={{fontSize:7,color:p.muted}}>Revenue</span></div>
          <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:3,borderRadius:2,background:`${p.green}60`}}/><span style={{fontSize:7,color:p.muted}}>Users</span></div>
        </div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"flex-end",gap:3,minHeight:0}}>
        {[25,40,30,55,45,65,35,50,42,62,48,72,55,80,60,85,65,92].map((h,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",gap:1,justifyContent:"flex-end",height:"100%"}}>
            <div style={{height:`${h*0.4}%`,borderRadius:2,background:`${p.green}40`}}/>
            <div style={{height:`${h}%`,borderRadius:2,background:i>=16?p.green:`${p.green}25`}}/>
          </div>
        ))}
      </div>
    </div>
    <div style={{borderRadius:10,background:p.card,border:`1px solid ${p.border}`,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr .8fr",padding:"6px 10px",borderBottom:`1px solid ${p.border}`,background:p.surface}}>
        {["Page","Views","Bounce","Time",""].map(h=>(<div key={h||"x"} style={{fontSize:7,fontWeight:700,textTransform:"uppercase",letterSpacing:".04em",color:p.dim}}>{h}</div>))}
      </div>
      {[{pg:"/dashboard",v:"12.4K",b:"18%",t:"4:32"},{pg:"/pricing",v:"8.2K",b:"32%",t:"2:15"},{pg:"/docs",v:"6.8K",b:"12%",t:"6:41"}].map((r,i)=>(
        <div key={r.pg} style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr .8fr",padding:"5px 10px",borderBottom:i<2?`1px solid ${p.borderLight}`:"none",alignItems:"center"}}>
          <div style={{fontSize:9,color:p.text,fontWeight:500}}>{r.pg}</div>
          <div style={{fontSize:9,color:p.muted,fontFamily:"'JetBrains Mono',monospace"}}>{r.v}</div>
          <div style={{fontSize:9,color:p.muted,fontFamily:"'JetBrains Mono',monospace"}}>{r.b}</div>
          <div style={{fontSize:9,color:p.muted,fontFamily:"'JetBrains Mono',monospace"}}>{r.t}</div>
          <div style={{width:18,height:8,borderRadius:4,background:p.greenBg,border:`1px solid ${p.green}30`}}/>
        </div>
      ))}
    </div>
  </div>
);}

function FullStory({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{flex:2,background:`linear-gradient(160deg, ${p.amberBg}, ${p.gradA})`,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:24,gap:8}}>
      <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:p.amber}}>Introducing</div>
      <div style={{width:"65%",height:10,borderRadius:5,background:p.dim}}/>
      <div style={{width:"40%",height:5,borderRadius:3,background:`${p.dim}80`}}/>
      <div style={{padding:"8px 22px",borderRadius:20,background:p.amber,color:"#fff",fontSize:10,fontWeight:700,marginTop:6}}>Get Started</div>
    </div>
    <div style={{flex:1,padding:16,display:"flex",gap:12}}>
      {[{t:"Fast"},{t:"Secure"},{t:"Simple"}].map(f=>(
        <div key={f.t} style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
          <div style={{width:28,height:28,borderRadius:10,background:p.amberBg,border:`1px solid ${p.amber}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:p.amber}}>✦</div>
          <div style={{fontSize:11,fontWeight:700,color:p.text}}>{f.t}</div>
          <div style={{fontSize:9,color:p.muted,lineHeight:1.4}}>Built for the modern web</div>
        </div>
      ))}
    </div>
    <div style={{height:44,background:p.surface,display:"flex",alignItems:"center",justifyContent:"center",gap:8,borderTop:`1px solid ${p.border}`}}>
      <div style={{padding:"6px 14px",borderRadius:7,background:p.bg,border:`1px solid ${p.border}`,fontSize:9,fontWeight:600,color:p.muted}}>Learn More</div>
      <div style={{padding:"6px 14px",borderRadius:7,background:p.amber,fontSize:9,fontWeight:700,color:"#fff"}}>Sign Up Free</div>
    </div>
  </div>
);}

function FullBuilder({p}){return(
  <div style={{height:"100%",display:"flex",background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{width:42,background:p.card,borderRight:`1px solid ${p.border}`,padding:"10px 5px",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
      {["□","○","△","⬡","T","⊞"].map((t,i)=>(
        <div key={i} style={{width:26,height:26,borderRadius:7,background:i===1?p.blueBg:p.bg,border:`1.5px solid ${i===1?p.blue:p.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:i===1?p.blue:p.dim}}>{t}</div>
      ))}
    </div>
    <div style={{flex:1,padding:14,display:"flex",alignItems:"center",justifyContent:"center",background:p.surface}}>
      <div style={{width:"78%",height:"72%",borderRadius:10,border:`2px dashed ${p.blue}50`,padding:14,display:"flex",flexDirection:"column",gap:8}}>
        <div style={{width:"50%",height:7,borderRadius:4,background:p.dim}}/>
        <div style={{flex:1,borderRadius:8,background:p.bg,border:`1px solid ${p.border}`,padding:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,height:"100%"}}>
            <div style={{borderRadius:6,background:p.surface,border:`1px solid ${p.border}`}}/>
            <div style={{borderRadius:6,background:p.blueBg,border:`1.5px solid ${p.blue}50`}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <div style={{padding:"6px 14px",borderRadius:7,background:p.blue,fontSize:9,fontWeight:700,color:"#fff"}}>Save</div>
          <div style={{padding:"6px 14px",borderRadius:7,background:p.surface,border:`1px solid ${p.border}`,fontSize:9,fontWeight:600,color:p.muted}}>Preview</div>
        </div>
      </div>
    </div>
    <div style={{width:72,background:p.card,borderLeft:`1px solid ${p.border}`,padding:10,display:"flex",flexDirection:"column",gap:8}}>
      <div style={{fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:".04em",color:p.dim}}>Properties</div>
      {[{l:"Width",v:"320px"},{l:"Height",v:"auto"},{l:"Color"},{l:"Radius",v:"12px"}].map(pr=>(
        <div key={pr.l}>
          <div style={{fontSize:7,color:p.dim,marginBottom:3,fontWeight:500}}>{pr.l}</div>
          <div style={{height:20,borderRadius:6,background:p.inputBg,border:`1px solid ${p.inputBorder}`,paddingLeft:7,display:"flex",alignItems:"center",fontSize:8,color:p.text}}>{pr.v||""}</div>
        </div>
      ))}
    </div>
  </div>
);}

function FullCommunity({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:12,gap:10,background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{fontSize:15,fontWeight:700,color:p.text}}>Feed</div>
      <div style={{width:28,height:28,borderRadius:"50%",background:p.pinkBg,border:`1px solid ${p.pink}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:p.pink}}>S</div>
    </div>
    {[
      {name:"Sarah Chen",time:"2m ago",text:"Just shipped the new onboarding flow — three weeks and it's finally live!",hasImg:true,likes:12,comments:4,ibg:`${p.accent}30`,ic:p.accent},
      {name:"Mike Torres",time:"18m ago",text:"Anyone have thoughts on the new API changes? Found some edge cases.",hasImg:false,likes:5,comments:8,ibg:p.amberBg,ic:p.amber},
    ].map((post,pi)=>(
      <div key={pi} style={{borderRadius:12,background:p.card,border:`1px solid ${p.border}`,padding:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:post.ibg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:post.ic}}>{post.name[0]}</div>
          <div>
            <div style={{fontSize:10,fontWeight:600,color:p.text}}>{post.name}</div>
            <div style={{fontSize:7,color:p.dim}}>{post.time}</div>
          </div>
        </div>
        <div style={{fontSize:9,color:p.muted,lineHeight:1.6,marginBottom:post.hasImg?8:0}}>{post.text}</div>
        {post.hasImg&&<div style={{height:50,borderRadius:8,background:`linear-gradient(135deg,${p.accentBg},${p.greenBg})`,border:`1px solid ${p.border}`,marginBottom:4}}/>}
        <div style={{display:"flex",gap:14,marginTop:8,paddingTop:8,borderTop:`1px solid ${p.borderLight}`}}>
          {[{ic:"♡",n:post.likes,a:pi===0},{ic:"💬",n:post.comments},{ic:"↗",n:"Share"}].map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:9,color:a.a?p.pink:p.dim,fontWeight:a.a?600:400}}><span style={{fontSize:11}}>{a.ic}</span>{a.n}</div>
          ))}
        </div>
      </div>
    ))}
  </div>
);}

function FullDiscover({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:12,gap:10,background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{fontSize:15,fontWeight:700,color:p.text}}>Explore</div>
    <div style={{height:30,borderRadius:15,background:p.card,border:`1px solid ${p.border}`,display:"flex",alignItems:"center",paddingLeft:12,gap:6}}>
      <div style={{width:13,height:13,borderRadius:"50%",border:`1.5px solid ${p.dim}`}}/>
      <div style={{fontSize:9,color:p.dim}}>Search anything...</div>
    </div>
    <div style={{display:"flex",gap:5}}>
      {["All","Popular","New","Trending"].map((f,i)=>(<div key={f} style={{padding:"4px 10px",borderRadius:12,fontSize:8,fontWeight:600,background:i===0?p.orange:p.tagBg,color:i===0?"#fff":p.muted,border:`1px solid ${i===0?p.orange:p.border}`}}>{f}</div>))}
    </div>
    <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,overflow:"hidden"}}>
      {[{n:"Alpine Retreat",pr:"$240/night",r:"4.9",bg:p.blueBg},{n:"City Loft",pr:"$180/night",r:"4.7",bg:p.amberBg},{n:"Beach House",pr:"$320/night",r:"4.8",bg:p.greenBg},{n:"Mountain View",pr:"$195/night",r:"4.6",bg:p.accentBg}].map(item=>(
        <div key={item.n} style={{borderRadius:10,overflow:"hidden",background:p.card,border:`1px solid ${p.border}`}}>
          <div style={{height:50,background:item.bg}}/>
          <div style={{padding:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2}}>
              <div style={{fontSize:10,fontWeight:600,color:p.text}}>{item.n}</div>
              <div style={{fontSize:8,color:p.amber,fontWeight:600}}>★ {item.r}</div>
            </div>
            <div style={{fontSize:9,color:p.muted}}>{item.pr}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);}

function FullMission({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",padding:10,gap:6,background:p.bg,fontFamily:"'DM Sans',sans-serif"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{fontSize:15,fontWeight:700,color:p.text}}>Sprint 24</div>
      <div style={{padding:"4px 10px",borderRadius:6,background:p.redBg,border:`1px solid ${p.red}30`,fontSize:8,fontWeight:600,color:p.red}}>7 days left</div>
    </div>
    <div style={{display:"flex",gap:4}}>
      {[{l:"To Do",n:4,bg:p.surface,c:p.muted},{l:"In Progress",n:3,bg:p.accentBg,c:p.accent},{l:"Review",n:2,bg:p.amberBg,c:p.amber},{l:"Done",n:7,bg:p.greenBg,c:p.green}].map(s=>(
        <div key={s.l} style={{flex:1,padding:"5px 8px",borderRadius:6,background:s.bg,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:7,fontWeight:600,color:s.c}}>{s.l}</div>
          <div style={{fontSize:9,fontWeight:700,color:s.c}}>{s.n}</div>
        </div>
      ))}
    </div>
    <div style={{flex:1,display:"flex",gap:6,minHeight:0}}>
      {[
        {title:"To Do",cards:[{t:"API auth",a:"SC",p:"high"},{t:"Error states",a:"MT",p:"med"},{t:"Tests",a:"",p:"low"}]},
        {title:"In Progress",cards:[{t:"Dashboard v2",a:"SC",p:"high",active:true},{t:"Search",a:"JL",p:"med"}]},
        {title:"Done",cards:[{t:"Onboarding",a:"MT",p:"med"},{t:"Dark mode",a:"SC",p:"low"},{t:"Export",a:"JL",p:"low"}]},
      ].map(col=>(
        <div key={col.title} style={{flex:1,borderRadius:10,background:p.surface,border:`1px solid ${p.border}`,padding:6,display:"flex",flexDirection:"column",gap:4,overflow:"hidden"}}>
          <div style={{fontSize:7,fontWeight:700,textTransform:"uppercase",letterSpacing:".04em",color:p.dim,padding:"0 2px"}}>{col.title}</div>
          {col.cards.map(c=>(
            <div key={c.t} style={{borderRadius:8,padding:8,background:c.active?p.accentBg:p.bg,border:`1.5px solid ${c.active?p.accent:p.border}`,flexShrink:0}}>
              <div style={{fontSize:9,fontWeight:600,color:p.text,marginBottom:4}}>{c.t}</div>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                {c.a&&<div style={{width:16,height:16,borderRadius:"50%",background:c.active?`${p.accent}30`:p.surface,fontSize:6,fontWeight:700,color:c.active?p.accent:p.dim,display:"flex",alignItems:"center",justifyContent:"center"}}>{c.a}</div>}
                <div style={{padding:"2px 6px",borderRadius:4,fontSize:7,fontWeight:600,background:c.p==="high"?p.redBg:c.p==="med"?p.amberBg:p.surface,color:c.p==="high"?p.red:c.p==="med"?p.amber:p.dim}}>{c.p}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);}

function FullFreestyle({p}){return(
  <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:p.bg,fontFamily:"'DM Sans',sans-serif",gap:10}}>
    <div style={{width:50,height:50,borderRadius:"50%",border:`2px dashed ${p.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <I name="wind" size={22} color={p.dim}/>
    </div>
    <div style={{fontSize:12,fontWeight:600,color:p.dim,textAlign:"center",lineHeight:1.6}}>Pick your settings<br/>and watch it come together</div>
  </div>
);}

const fullMap={learn:FullLearn,data:FullData,story:FullStory,builder:FullBuilder,community:FullCommunity,discover:FullDiscover,mission:FullMission,freestyle:FullFreestyle};

/* ═══ CARD ═══ */
function PurposeCard({purpose,selected,onSelect,p}){
  const active=selected===purpose.id;
  const Thumb=thumbMap[purpose.id];
  return(
    <button onClick={()=>onSelect(purpose.id)} style={{
      background:active?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.015)",
      border:active?`2px solid ${purpose.color}`:"1px solid rgba(255,255,255,0.06)",
      borderRadius:14,cursor:"pointer",fontFamily:"inherit",textAlign:"left",
      padding:0,overflow:"hidden",display:"flex",flexDirection:"column",
      transition:"all 0.2s",position:"relative",
      boxShadow:active?`0 4px 20px ${purpose.color}20`:"none",
    }}>
      <div style={{height:80,overflow:"hidden",borderRadius:"12px 12px 0 0"}}><Thumb c={purpose.color} p={p}/></div>
      <div style={{padding:"10px 12px",borderTop:`1px solid ${active?`${purpose.color}30`:"rgba(255,255,255,0.04)"}`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <div style={{width:22,height:22,borderRadius:6,background:`${purpose.color}15`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <I name={purpose.icon} size={12} color={purpose.color}/>
          </div>
          <div style={{fontSize:12,fontWeight:700,color:active?"#F0EDE6":"rgba(240,237,230,0.6)"}}>{purpose.name}</div>
        </div>
        <div style={{fontSize:9,color:"rgba(240,237,230,0.3)",lineHeight:1.4}}>{purpose.desc}</div>
      </div>
      {active&&<div style={{position:"absolute",top:6,right:6,width:18,height:18,borderRadius:5,background:purpose.color,display:"flex",alignItems:"center",justifyContent:"center"}}><I name="check" size={10} color="#fff"/></div>}
    </button>
  );
}

/* ═══ PAGE ═══ */
export default function PurposeSelectorV5(){
  const[selected,setSelected]=useState("data");
  const[dark,setDark]=useState(false);
  const p=getP(dark);
  const Preview=fullMap[selected];
  const current=purposes.find(pr=>pr.id===selected);

  return(
    <div style={{minHeight:"100vh",background:"#080b14",color:"#F0EDE6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",padding:"40px 24px 80px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(129,140,248,0.2);border-radius:4px}
      `}</style>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:20}}>
          <div>
            <div style={{fontSize:22,fontWeight:800,color:"#F0EDE6",marginBottom:4}}>What are you building?</div>
            <div style={{fontSize:12,color:"rgba(240,237,230,0.4)"}}>Pick your purpose — the preview adapts to show your app type in {dark?"dark":"light"} mode.</div>
          </div>
          {/* Light/Dark mode toggle for the OUTPUT preview */}
          <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.06)",borderRadius:10,padding:3}}>
            <button onClick={()=>setDark(false)} style={{
              display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",
              background:!dark?"rgba(255,255,255,0.12)":"transparent",
              color:!dark?"#F0EDE6":"rgba(240,237,230,0.3)",fontSize:10,fontWeight:600,
            }}><I name="sun" size={12} color={!dark?"#fbbf24":"rgba(240,237,230,0.25)"}/>Light</button>
            <button onClick={()=>setDark(true)} style={{
              display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",
              background:dark?"rgba(255,255,255,0.12)":"transparent",
              color:dark?"#F0EDE6":"rgba(240,237,230,0.3)",fontSize:10,fontWeight:600,
            }}><I name="moon" size={12} color={dark?"#818cf8":"rgba(240,237,230,0.25)"}/>Dark</button>
          </div>
        </div>
        <div style={{display:"flex",gap:16}}>
          <div style={{flex:3}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {purposes.map(pr=>(<PurposeCard key={pr.id} purpose={pr} selected={selected} onSelect={setSelected} p={p}/>))}
            </div>
          </div>
          <div style={{flex:2,position:"sticky",top:40,alignSelf:"flex-start"}}>
            <div style={{borderRadius:14,overflow:"hidden",border:"2px solid #4338ca",boxShadow:"0 4px 24px rgba(67,56,202,0.25)",height:480,transition:"all 0.3s"}}>
              <div style={{padding:"7px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,#4338ca,#3730a3)"}}>
                <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:".06em"}}>Live Preview</span>
                <span style={{fontSize:8,color:"rgba(255,255,255,0.5)"}}>{current?.name} · {dark?"Dark":"Light"}</span>
              </div>
              <div style={{height:"calc(100% - 30px)",transition:"background 0.3s",background:p.bg}}><Preview p={p}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
