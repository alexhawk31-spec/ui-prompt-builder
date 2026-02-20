import { useState, useEffect } from "react";

const dims = {
  density: { label:"Density", desc:"How packed is the UI", color:"#3b82f6", opts:[
    {id:"spacious",label:"Spacious",desc:"Generous whitespace, large touch targets"},
    {id:"balanced",label:"Balanced",desc:"Standard padding, comfortable reading"},
    {id:"compact",label:"Compact",desc:"Tighter spacing, more content visible"},
    {id:"dense",label:"Dense",desc:"Maximum info density, minimal padding"},
  ]},
  typography: { label:"Typography", desc:"Font personality", color:"#a855f7", opts:[
    {id:"clean",label:"Clean",desc:"Modern sans-serif, neutral and professional"},
    {id:"technical",label:"Technical",desc:"Monospace-heavy, code-like precision"},
    {id:"editorial",label:"Editorial",desc:"Serif accents, magazine-quality hierarchy"},
    {id:"rounded",label:"Rounded",desc:"Soft, friendly fonts with personality"},
  ]},
  interaction: { label:"Interaction", desc:"Hover and transition energy", color:"#f59e0b", opts:[
    {id:"subtle",label:"Subtle",desc:"Gentle opacity shifts, understated"},
    {id:"smooth",label:"Smooth",desc:"Fluid easing, polished transitions"},
    {id:"snappy",label:"Snappy",desc:"Quick, responsive, satisfying clicks"},
    {id:"dramatic",label:"Dramatic",desc:"Bold transforms, scale shifts, glows"},
  ]},
  embellishment: { label:"Embellishment", desc:"Visual extras", color:"#10b981", opts:[
    {id:"none",label:"None",desc:"Pure content, zero decoration"},
    {id:"minimal",label:"Minimal",desc:"Subtle borders and light shadows"},
    {id:"moderate",label:"Moderate",desc:"Gradients, shadows, accent borders"},
    {id:"rich",label:"Rich",desc:"Glows, glass effects, layered textures"},
  ]},
};

const presets = [
  {id:"professional",name:"Professional",icon:"briefcase",color:"#3b82f6",desc:"Clean, trustworthy, enterprise-ready",
    v:{density:"balanced",typography:"clean",interaction:"smooth",embellishment:"minimal"}},
  {id:"playful",name:"Playful",icon:"sparkle",color:"#f59e0b",desc:"Fun, energetic, approachable",
    v:{density:"spacious",typography:"rounded",interaction:"snappy",embellishment:"moderate"}},
  {id:"minimal",name:"Minimal",icon:"minus",color:"#94a3b8",desc:"Stripped back, content-first, quiet",
    v:{density:"spacious",typography:"clean",interaction:"subtle",embellishment:"none"}},
  {id:"data-dense",name:"Data-Dense",icon:"chart",color:"#22c55e",desc:"Maximum info, dashboard-optimized",
    v:{density:"dense",typography:"technical",interaction:"snappy",embellishment:"minimal"}},
  {id:"immersive",name:"Immersive",icon:"layers",color:"#8b5cf6",desc:"Full-screen, atmospheric, cinematic",
    v:{density:"spacious",typography:"editorial",interaction:"dramatic",embellishment:"rich"}},
  {id:"editorial",name:"Editorial",icon:"type",color:"#e63946",desc:"Magazine-quality, typography-driven",
    v:{density:"balanced",typography:"editorial",interaction:"smooth",embellishment:"moderate"}},
];

const iP={
  briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
  sparkle:<path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>,
  minus:<line x1="5" y1="12" x2="19" y2="12"/>,
  chart:<><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/></>,
  layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
  type:<><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,
  chevDown:<polyline points="6 9 12 15 18 9"/>,
  chevUp:<polyline points="18 15 12 9 6 15"/>,
  check:<polyline points="20 6 9 17 4 12"/>,
  sliders:<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
};
const Ic=({name,size=18,color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{iP[name]}</svg>
);

/* ═══════════════════ PREVIEW ═══════════════════ */

function Preview({values}){
  const [hov,setHov]=useState(null);
  const {density:d,typography:t,embellishment:e,interaction:inter}=values;
  const ac="#818cf8";

  // DENSITY — dramatically different structure
  const pad={spacious:22,balanced:14,compact:8,dense:5}[d];
  const gap={spacious:14,balanced:10,compact:5,dense:3}[d];
  const headSz={spacious:24,balanced:17,compact:13,dense:11}[d];
  const statCols={spacious:2,balanced:3,compact:3,dense:4}[d];
  const valSz={spacious:24,balanced:16,compact:12,dense:10}[d];
  const lblSz={spacious:10,balanced:8,compact:6,dense:5}[d];
  const cardPd={spacious:16,balanced:10,compact:6,dense:4}[d];
  const barCt={spacious:7,balanced:10,compact:14,dense:20}[d];
  const barH={spacious:70,balanced:48,compact:30,dense:22}[d];
  const showChange=d!=="dense";
  const showNav=d==="compact"||d==="dense";
  const showTable=d==="compact"||d==="dense";
  const showTabs=d==="spacious"||d==="balanced";

  // TYPOGRAPHY — completely different character
  const hFont={clean:"'DM Sans',sans-serif",technical:"'JetBrains Mono',monospace",editorial:"Georgia,'Times New Roman',serif",rounded:"'Nunito','DM Sans',sans-serif"}[t];
  const bFont={clean:"'DM Sans',sans-serif",technical:"'JetBrains Mono',monospace",editorial:"'DM Sans',sans-serif",rounded:"'Nunito','DM Sans',sans-serif"}[t];
  const hWt={clean:700,technical:600,editorial:400,rounded:800}[t];
  const vFont={clean:"'DM Sans',sans-serif",technical:"'JetBrains Mono',monospace",editorial:"Georgia,serif",rounded:"'Nunito',sans-serif"}[t];
  const vWt={clean:700,technical:500,editorial:300,rounded:800}[t];
  const lblTx={clean:"uppercase",technical:"uppercase",editorial:"capitalize",rounded:"none"}[t];
  const lblLs={clean:".06em",technical:".1em",editorial:".02em",rounded:".01em"}[t];
  const hItalic=t==="editorial";
  const prefix=t==="technical"?"> ":"";
  const titleText=t==="editorial"?"The Dashboard":t==="rounded"?"Dashboard":"Dashboard";

  // EMBELLISHMENT — from brutalist to full glass
  const rad={none:0,minimal:6,moderate:12,rich:18}[e];
  const cRad={none:0,minimal:4,moderate:10,rich:14}[e];
  const bgCol={none:"#111318",minimal:"#0e1118",moderate:"#0c0f1a",rich:"#080c1a"}[e];
  const cBg={none:"transparent",minimal:"rgba(255,255,255,0.025)",moderate:"rgba(255,255,255,0.04)",rich:"rgba(255,255,255,0.07)"}[e];
  const cBd={none:"1px solid rgba(255,255,255,0.08)",minimal:"1px solid rgba(255,255,255,0.08)",moderate:`1px solid ${ac}18`,rich:`1px solid ${ac}30`}[e];
  const cSh={none:"none",minimal:"0 1px 3px rgba(0,0,0,0.15)",moderate:`0 4px 16px rgba(0,0,0,0.25)`,rich:`0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${ac}12, inset 0 1px 0 rgba(255,255,255,0.08)`}[e];
  const btnSh={none:"none",minimal:"none",moderate:`0 2px 8px ${ac}25`,rich:`0 4px 20px ${ac}35, 0 0 40px ${ac}15`}[e];
  const showGrad=e==="rich"||e==="moderate";
  const showDots=e==="rich";
  const showGlow=e==="rich";

  // INTERACTION — transition speed + hover behavior
  const tr={subtle:"all 0.6s ease",smooth:"all 0.35s cubic-bezier(0.4,0,0.2,1)",snappy:"all 0.1s ease-out",dramatic:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)"}[inter];
  const hvScale={subtle:1,smooth:1.015,snappy:1.03,dramatic:1.06}[inter];
  const hvGlow={subtle:"none",smooth:"none",snappy:`0 0 8px ${ac}20`,dramatic:`0 0 24px ${ac}40, 0 0 60px ${ac}15`}[inter];

  const stats=[
    {l:"Revenue",v:"$2.4M",c:"+12.4%"},{l:"Users",v:"18.2K",c:"+8.1%"},
    {l:"Latency",v:"42ms",c:"-3.2%"},{l:"Uptime",v:"99.9%",c:"+0.1%"},
  ].slice(0,statCols);

  const bars=Array.from({length:barCt},(_,i)=>30+Math.sin(i*0.7)*20+Math.cos(i*1.2)*25);

  const tableRows=[
    {name:"API Gateway",status:"Active",val:"1.2ms"},
    {name:"Auth Service",status:"Active",val:"3.4ms"},
    {name:"Data Pipeline",status:"Warn",val:"89ms"},
  ];

  return(
    <div style={{background:bgCol,borderRadius:rad,height:"100%",padding:pad,fontFamily:bFont,overflow:"hidden",position:"relative",transition:tr}}>
      {showGrad&&<div style={{position:"absolute",top:0,left:0,right:0,height:e==="rich"?140:80,background:`linear-gradient(180deg, ${ac}${e==="rich"?"15":"08"}, transparent)`,borderRadius:`${rad}px ${rad}px 0 0`,pointerEvents:"none"}}/>}
      {showDots&&<div style={{position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",backgroundImage:`radial-gradient(${ac} 1px, transparent 1px)`,backgroundSize:"14px 14px"}}/>}

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:gap,position:"relative"}}>
        <div style={{fontSize:headSz,fontWeight:hWt,color:"#F0EDE6",fontFamily:hFont,fontStyle:hItalic?"italic":"normal",letterSpacing:t==="technical"?"-.03em":"-.01em",transition:tr,lineHeight:1}}>
          {prefix}{titleText}
        </div>
        <div style={{padding:`${d==="dense"?2:5}px ${d==="dense"?6:12}px`,borderRadius:cRad,background:e==="rich"?`linear-gradient(135deg,${ac},#a78bfa)`:ac,color:bgCol,fontSize:d==="dense"?6:9,fontWeight:700,fontFamily:bFont,boxShadow:btnSh,transition:tr,textTransform:t==="technical"?"uppercase":"none",letterSpacing:t==="technical"?".08em":"0"}}>
          {t==="technical"?"[NEW]":"New"}
        </div>
      </div>

      {/* Tabs */}
      {showTabs&&(
        <div style={{display:"flex",gap:d==="spacious"?8:4,marginBottom:gap,position:"relative"}}>
          {(t==="editorial"?["Overview","Insights","Archive"]:["Overview","Analytics","Settings"]).map((tab,i)=>(
            <div key={tab} style={{padding:`${d==="spacious"?7:4}px ${d==="spacious"?16:10}px`,borderRadius:e==="none"?0:cRad,fontSize:d==="spacious"?11:9,fontWeight:i===0?700:400,fontFamily:t==="editorial"?"Georgia,serif":bFont,fontStyle:t==="editorial"&&i===0?"italic":"normal",background:i===0?(e==="none"?"transparent":`${ac}12`):"transparent",color:i===0?ac:"rgba(240,237,230,0.2)",borderBottom:e==="none"&&i===0?`2px solid ${ac}`:"none",transition:tr}}>{tab}</div>
          ))}
        </div>
      )}

      {/* Stat cards */}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${statCols},1fr)`,gap:d==="dense"?2:gap,marginBottom:gap,position:"relative"}}>
        {stats.map((s,idx)=>(
          <div key={s.l}
            onMouseEnter={()=>setHov(idx)} onMouseLeave={()=>setHov(null)}
            style={{borderRadius:cRad,padding:cardPd,background:hov===idx?`${ac}10`:cBg,border:hov===idx?`1px solid ${ac}40`:cBd,boxShadow:hov===idx?[cSh,hvGlow].filter(x=>x!=="none").join(","):cSh,transition:tr,transform:hov===idx?`scale(${hvScale})`:"scale(1)",cursor:"default"}}>
            <div style={{fontSize:lblSz,fontWeight:600,textTransform:lblTx,letterSpacing:lblLs,color:"rgba(240,237,230,0.3)",marginBottom:d==="dense"?0:3,fontFamily:bFont}}>{s.l}</div>
            <div style={{fontSize:valSz,fontWeight:vWt,color:"#F0EDE6",fontFamily:vFont,lineHeight:1.1,transition:tr}}>{s.v}</div>
            {showChange&&<div style={{fontSize:d==="spacious"?10:8,color:s.c.startsWith("+")?"#34d399":"#f87171",marginTop:d==="spacious"?6:2,fontFamily:"'JetBrains Mono',monospace",fontWeight:500}}>{s.c}</div>}
          </div>
        ))}
      </div>

      {/* Main area */}
      <div style={{display:"grid",gridTemplateColumns:showNav?(d==="dense"?"44px 1fr":"60px 1fr"):"1fr",gap:d==="dense"?2:gap,flex:1,position:"relative"}}>
        {showNav&&(
          <div style={{borderRadius:cRad,padding:d==="dense"?3:6,background:cBg,border:cBd,boxShadow:cSh,display:"flex",flexDirection:"column",gap:d==="dense"?1:2}}>
            {(d==="dense"?["Home","Stats","API","Logs","Team","Cfg"]:["Home","Stats","Reports","Team"]).map((n,i)=>(
              <div key={n} style={{padding:`${d==="dense"?2:3}px ${d==="dense"?3:5}px`,borderRadius:Math.max(cRad-2,1),fontSize:d==="dense"?5:7,fontWeight:i===0?700:400,fontFamily:t==="technical"?"'JetBrains Mono',monospace":bFont,color:i===0?ac:"rgba(240,237,230,0.15)",background:i===0?`${ac}${showGlow?"18":"10"}`:"transparent",borderLeft:`2px solid ${i===0?ac:"transparent"}`,transition:tr}}>
                {t==="technical"&&i===0?`> ${n}`:n}
              </div>
            ))}
          </div>
        )}

        <div style={{display:"flex",flexDirection:"column",gap:d==="dense"?2:gap,minHeight:0}}>
          <div style={{borderRadius:cRad,padding:d==="dense"?4:8,background:cBg,border:cBd,boxShadow:cSh,flex:showTable?"none":"1",height:showTable?(d==="dense"?44:60):undefined}}>
            <div style={{fontSize:d==="dense"?4:7,fontWeight:600,textTransform:lblTx,letterSpacing:lblLs,color:"rgba(240,237,230,0.15)",marginBottom:d==="dense"?2:4,fontFamily:bFont,fontStyle:t==="editorial"?"italic":"normal"}}>
              {t==="editorial"?"Performance Trends":t==="technical"?"SYS::PERF_METRICS":"Performance"}
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:d==="dense"?1:d==="spacious"?4:2,height:barH}}>
              {bars.map((h,i)=>{
                const hi=i>=barCt-2;
                return(<div key={i} style={{flex:1,height:`${Math.min(h+15,95)}%`,borderRadius:e==="none"?0:e==="rich"?6:e==="moderate"?3:1,background:hi?(e==="rich"?`linear-gradient(180deg,${ac},#a78bfa)`:ac):`${ac}${e==="none"?"12":"20"}`,boxShadow:hi&&showGlow?`0 0 10px ${ac}50`:"none",transition:tr}}/>);
              })}
            </div>
          </div>

          {showTable&&(
            <div style={{borderRadius:cRad,overflow:"hidden",background:cBg,border:cBd,boxShadow:cSh}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 52px 44px",padding:`${d==="dense"?2:4}px ${d==="dense"?4:6}px`,borderBottom:"1px solid rgba(255,255,255,0.04)",background:showGlow?`${ac}06`:"transparent"}}>
                {["Service","Status","Latency"].map(h=>(
                  <div key={h} style={{fontSize:d==="dense"?4:5,fontWeight:700,textTransform:lblTx,letterSpacing:lblLs,color:"rgba(240,237,230,0.2)",fontFamily:bFont}}>{h}</div>
                ))}
              </div>
              {tableRows.map(row=>(
                <div key={row.name} style={{display:"grid",gridTemplateColumns:"1fr 52px 44px",padding:`${d==="dense"?1:3}px ${d==="dense"?4:6}px`,borderBottom:"1px solid rgba(255,255,255,0.02)"}}>
                  <div style={{fontSize:d==="dense"?5:7,color:"rgba(240,237,230,0.45)",fontFamily:t==="technical"?"'JetBrains Mono',monospace":bFont}}>{row.name}</div>
                  <div style={{fontSize:d==="dense"?4:6,fontWeight:600,color:row.status==="Active"?"#34d399":"#fbbf24"}}>{row.status}</div>
                  <div style={{fontSize:d==="dense"?5:6,color:"rgba(240,237,230,0.3)",fontFamily:"'JetBrains Mono',monospace"}}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ DIMENSION CARD ═══════════════════ */

function DimCard({dim,value,onChange,expanded,onToggle}){
  const d=dims[dim];
  return(
    <div style={{borderRadius:12,overflow:"hidden",background:expanded?`${d.color}06`:"rgba(255,255,255,0.015)",border:expanded?`1px solid ${d.color}20`:"1px solid rgba(255,255,255,0.04)",transition:"all 0.2s"}}>
      <button onClick={onToggle} style={{width:"100%",padding:"12px 14px",border:"none",cursor:"pointer",fontFamily:"inherit",background:"transparent",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:d.color,boxShadow:`0 0 6px ${d.color}40`}}/>
          <span style={{fontSize:12,fontWeight:700,color:d.color}}>{d.label}</span>
          <span style={{fontSize:10,color:"rgba(240,237,230,0.25)"}}>{d.desc}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:600,background:`${d.color}15`,color:d.color,border:`1px solid ${d.color}25`,fontFamily:"'JetBrains Mono',monospace"}}>{d.opts.find(o=>o.id===value)?.label}</span>
          <Ic name={expanded?"chevUp":"chevDown"} size={13} color="rgba(240,237,230,0.2)"/>
        </div>
      </button>
      {expanded&&(
        <div style={{padding:"0 14px 14px",display:"flex",gap:6,flexWrap:"wrap"}}>
          {d.opts.map(opt=>{
            const active=value===opt.id;
            return(
              <button key={opt.id} onClick={()=>onChange(opt.id)} style={{padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",border:active?`1.5px solid ${d.color}`:"1px solid rgba(255,255,255,0.06)",background:active?`${d.color}15`:"rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",gap:2,transition:"all 0.15s",flex:"1 1 calc(50% - 3px)",minWidth:120}}>
                <div style={{fontSize:11,fontWeight:700,color:active?d.color:"rgba(240,237,230,0.5)",display:"flex",alignItems:"center",gap:5}}>
                  {active&&<Ic name="check" size={11} color={d.color}/>}{opt.label}
                </div>
                <div style={{fontSize:9,color:"rgba(240,237,230,0.25)",lineHeight:1.3,textAlign:"left"}}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ MAIN ═══════════════════ */

export default function MoodFeelMockup(){
  const [sel,setSel]=useState("professional");
  const [vals,setVals]=useState({...presets[0].v});
  const [showFT,setShowFT]=useState(false);
  const [expDim,setExpDim]=useState(null);
  const [custom,setCustom]=useState(false);

  const pick=(id)=>{const p=presets.find(x=>x.id===id);setSel(id);setVals({...p.v});setCustom(false);};
  const upd=(dim,val)=>{
    const nv={...vals,[dim]:val};setVals(nv);
    const m=presets.find(p=>Object.keys(p.v).every(k=>p.v[k]===nv[k]));
    if(m){setSel(m.id);setCustom(false);}else{setCustom(true);setSel(null);}
  };

  return(
    <div style={{minHeight:"100vh",background:"#080b14",backgroundImage:"radial-gradient(ellipse at 30% 50%,rgba(129,140,248,0.03) 0%,transparent 60%)",color:"#F0EDE6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",padding:"40px 24px 80px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500&family=Nunito:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(129,140,248,0.2);border-radius:4px}
      `}</style>

      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{marginBottom:32}}>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",color:"#a78bfa",marginBottom:6}}>Mood & Feel</div>
          <div style={{fontSize:22,fontWeight:700,marginBottom:6}}>Design the Vibe</div>
          <div style={{fontSize:12,color:"rgba(240,237,230,0.4)",maxWidth:600,lineHeight:1.5}}>Pick a preset for a quick starting point, or fine-tune individual dimensions. The preview updates live.</div>
        </div>

        <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
          {/* LEFT: Controls */}
          <div style={{flex:"1 1 55%",minWidth:0,display:"flex",flexDirection:"column",gap:20}}>
            {/* Presets */}
            <div style={{background:"rgba(20,24,38,0.6)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:20}}>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Quick Presets</div>
                <div style={{fontSize:11,color:"rgba(240,237,230,0.3)"}}>One click sets all four dimensions</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {presets.map(p=>{
                  const active=sel===p.id&&!custom;
                  return(
                    <button key={p.id} onClick={()=>pick(p.id)} style={{padding:"14px 14px 12px",borderRadius:12,cursor:"pointer",fontFamily:"inherit",border:active?`2px solid ${p.color}`:"1px solid rgba(255,255,255,0.06)",background:active?`${p.color}10`:"rgba(0,0,0,0.25)",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:6,transition:"all 0.15s",boxShadow:active?`0 0 20px ${p.color}15`:"none"}}>
                      <div style={{display:"flex",alignItems:"center",gap:7,width:"100%"}}>
                        <div style={{width:28,height:28,borderRadius:8,background:active?`${p.color}20`:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${active?`${p.color}30`:"rgba(255,255,255,0.06)"}`}}>
                          <Ic name={p.icon} size={14} color={active?p.color:"rgba(240,237,230,0.3)"}/>
                        </div>
                        <span style={{fontSize:12,fontWeight:700,color:active?"#F0EDE6":"rgba(240,237,230,0.45)"}}>{p.name}</span>
                      </div>
                      <div style={{fontSize:9,color:"rgba(240,237,230,0.25)",lineHeight:1.3,textAlign:"left"}}>{p.desc}</div>
                      {active&&(
                        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:2}}>
                          {Object.entries(p.v).map(([dm,vl])=>(
                            <span key={dm} style={{padding:"2px 6px",borderRadius:4,fontSize:7,fontWeight:600,background:`${dims[dm].color}12`,color:dims[dm].color,border:`1px solid ${dims[dm].color}20`,fontFamily:"'JetBrains Mono',monospace"}}>{vl}</span>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fine-tune */}
            <div style={{background:"rgba(20,24,38,0.6)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:20}}>
              <button onClick={()=>setShowFT(!showFT)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",border:"none",cursor:"pointer",fontFamily:"inherit",background:"transparent",padding:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <Ic name="sliders" size={15} color="#a78bfa"/>
                  <span style={{fontSize:15,fontWeight:700,color:"#F0EDE6"}}>Fine-Tune</span>
                  {custom&&<span style={{padding:"2px 8px",borderRadius:5,fontSize:9,fontWeight:700,background:"rgba(167,139,250,0.15)",color:"#a78bfa",border:"1px solid rgba(167,139,250,0.25)"}}>Custom</span>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {!showFT&&<div style={{display:"flex",gap:4}}>{Object.keys(vals).map(dm=><div key={dm} style={{width:8,height:8,borderRadius:"50%",background:dims[dm].color,opacity:0.6}}/>)}</div>}
                  <Ic name={showFT?"chevUp":"chevDown"} size={14} color="rgba(240,237,230,0.25)"/>
                </div>
              </button>
              {showFT&&(
                <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{fontSize:11,color:"rgba(240,237,230,0.3)",marginBottom:4}}>Adjust individual dimensions — changes override preset values</div>
                  {Object.keys(dims).map(dm=><DimCard key={dm} dim={dm} value={vals[dm]} onChange={v=>upd(dm,v)} expanded={expDim===dm} onToggle={()=>setExpDim(expDim===dm?null:dm)}/>)}
                </div>
              )}
            </div>

            {/* Terminal */}
            <div style={{borderRadius:12,overflow:"hidden",background:"#1e2130",border:"1px solid rgba(129,140,248,0.15)"}}>
              <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,rgba(129,140,248,0.06),rgba(129,140,248,0.02))",borderBottom:"1px solid rgba(129,140,248,0.08)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{display:"flex",gap:4}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:"#ff5f57"}}/>
                    <div style={{width:7,height:7,borderRadius:"50%",background:"#febc2e"}}/>
                    <div style={{width:7,height:7,borderRadius:"50%",background:"#28c840"}}/>
                  </div>
                  <span style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"rgba(129,140,248,0.6)"}}>prompt-output</span>
                </div>
              </div>
              <div style={{padding:"10px 12px",fontFamily:"'JetBrains Mono',monospace"}}>
                <div style={{fontSize:10}}><span style={{color:"#28c840"}}>$</span><span style={{color:"rgba(240,237,230,0.2)"}}> --</span><span style={{color:"#a78bfa",fontWeight:600}}>mood-feel</span></div>
                <div style={{fontSize:9,color:"rgba(240,237,230,0.35)",paddingLeft:14,marginTop:3,lineHeight:1.6}}>
                  {custom?"custom":sel} preset{"\n"}
                  density: "{vals.density}", typography: "{vals.typography}"{"\n"}
                  interaction: "{vals.interaction}", embellishment: "{vals.embellishment}"
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Preview */}
          <div style={{flex:"1 1 45%",position:"sticky",top:40,minWidth:0}}>
            <div style={{borderRadius:14,overflow:"hidden",border:"2px solid #4338ca",boxShadow:"0 4px 24px rgba(67,56,202,0.2)"}}>
              <div style={{padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,#4338ca,#3730a3)"}}>
                <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:".06em"}}>Live Preview</span>
                <div style={{display:"flex",gap:6}}>
                  {Object.entries(vals).map(([dm,vl])=>(
                    <div key={dm} style={{display:"flex",alignItems:"center",gap:3}}>
                      <div style={{width:5,height:5,borderRadius:"50%",background:dims[dm].color,opacity:0.8}}/>
                      <span style={{fontSize:7,color:"rgba(255,255,255,0.5)",fontFamily:"'JetBrains Mono',monospace"}}>{vl.slice(0,3)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{height:400}}><Preview values={vals} presetId={sel}/></div>
            </div>

            <div style={{marginTop:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {Object.entries(vals).map(([dm,vl])=>(
                <div key={dm} style={{padding:"8px 10px",borderRadius:8,background:"rgba(20,24,38,0.6)",border:"1px solid rgba(255,255,255,0.04)",display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:dims[dm].color,boxShadow:`0 0 4px ${dims[dm].color}30`}}/>
                  <div>
                    <div style={{fontSize:8,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",color:"rgba(240,237,230,0.25)"}}>{dims[dm].label}</div>
                    <div style={{fontSize:10,fontWeight:700,color:dims[dm].color,fontFamily:"'JetBrains Mono',monospace"}}>{vl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
