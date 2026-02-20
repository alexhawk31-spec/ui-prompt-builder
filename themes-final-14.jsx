import { useState } from "react";

/*
  14 NEW themes to ADD to the existing theme collection.
  Each has: bg, card, primary accent (a1), secondary accent (a2), text,
  and 6 swappable accent colors so users can add vibe.
*/
const newThemes = [
  // DARKS (4)
  {id:"neon-cyber",name:"Neon Cyber",cat:"Dark",
    bg:"#0a0e1a",card:"#121830",a1:"#00f5d4",a2:"#e44d6e",text:"#e0f0ff",
    accents:["#00f5d4","#e44d6e","#818cf8","#fbbf24","#f472b6","#22d3ee"]},
  {id:"midnight-ocean",name:"Midnight Ocean",cat:"Dark",
    bg:"#0e1e38",card:"#142848",a1:"#38bdf8",a2:"#5eead4",text:"#e0f2fe",
    accents:["#38bdf8","#5eead4","#a78bfa","#f472b6","#fbbf24","#34d399"]},
  {id:"aurora",name:"Aurora",cat:"Dark",
    bg:"#0e1e28",card:"#142c38",a1:"#34d399",a2:"#c084fc",text:"#ecfdf5",
    accents:["#34d399","#c084fc","#38bdf8","#f472b6","#fbbf24","#e44d6e"]},
  {id:"mahogany",name:"Mahogany",cat:"Dark",
    bg:"#2c1a18",card:"#3a2422",a1:"#e07850",a2:"#c4a060",text:"#fce8e0",
    accents:["#e07850","#c4a060","#e8456b","#34d399","#fbbf24","#818cf8"]},

  // NEUTRALS (3)
  {id:"storm-cloud",name:"Storm Cloud",cat:"Neutral",
    bg:"#22252e",card:"#2c3038",a1:"#94a3b8",a2:"#475569",text:"#e2e8f0",
    accents:["#94a3b8","#60a5fa","#f472b6","#34d399","#fbbf24","#e44d6e"]},
  {id:"cool-concrete",name:"Cool Concrete",cat:"Neutral",
    bg:"#202228",card:"#2a2c34",a1:"#22d3ee",a2:"#818cf8",text:"#e2e8f0",
    accents:["#22d3ee","#818cf8","#f472b6","#34d399","#fbbf24","#fb923c"]},
  {id:"ink-wash",name:"Ink Wash",cat:"Neutral",
    bg:"#141418",card:"#1e1e24",a1:"#b0b0c0",a2:"#55556a",text:"#d0d0e0",
    accents:["#b0b0c0","#818cf8","#22d3ee","#f472b6","#34d399","#fbbf24"]},

  // LIGHTS (7)
  {id:"clean-white",name:"Clean White",cat:"Light",
    bg:"#ffffff",card:"#f8fafc",a1:"#3b82f6",a2:"#60a5fa",text:"#0f172a",
    accents:["#3b82f6","#7c3aed","#059669","#e11d48","#d97706","#0284c7"]},
  {id:"ice-gray",name:"Ice Gray",cat:"Light",
    bg:"#eef0f4",card:"#e2e5ec",a1:"#4f46e5",a2:"#818cf8",text:"#1e1b4b",
    accents:["#4f46e5","#0284c7","#059669","#e11d48","#d97706","#7c3aed"]},
  {id:"soft-lavender",name:"Soft Lavender",cat:"Light",
    bg:"#f0ecff",card:"#e8e2ff",a1:"#7c3aed",a2:"#a78bfa",text:"#1e1b4b",
    accents:["#7c3aed","#e11d48","#0284c7","#059669","#d97706","#4f46e5"]},
  {id:"mint-fresh",name:"Mint Fresh",cat:"Light",
    bg:"#e8faf4",card:"#d8f2ea",a1:"#059669",a2:"#34d399",text:"#064e3b",
    accents:["#059669","#0284c7","#7c3aed","#e11d48","#d97706","#4f46e5"]},
  {id:"blush-pink",name:"Blush Pink",cat:"Light",
    bg:"#fef0f4",card:"#fce4ec",a1:"#e11d48",a2:"#fb7185",text:"#4c0519",
    accents:["#e11d48","#7c3aed","#0284c7","#059669","#d97706","#4f46e5"]},
  {id:"sky-blue",name:"Sky Blue",cat:"Light",
    bg:"#e8f4ff",card:"#d6ecff",a1:"#0369a1",a2:"#38bdf8",text:"#0c4a6e",
    accents:["#0369a1","#7c3aed","#059669","#e11d48","#d97706","#4f46e5"]},
  {id:"peach-glow",name:"Peach Glow",cat:"Light",
    bg:"#fff5ec",card:"#fee8d6",a1:"#ea580c",a2:"#f97316",text:"#431407",
    accents:["#ea580c","#e11d48","#0284c7","#059669","#7c3aed","#4f46e5"]},
];

function MiniPreview({t}){
  return(
    <div style={{height:"100%",display:"flex",flexDirection:"column",padding:8,gap:4,background:t.bg,fontFamily:"'DM Sans',sans-serif",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:10,fontWeight:700,color:t.text}}>Dashboard</div>
        <div style={{padding:"2px 6px",borderRadius:4,background:t.a1,color:t.bg,fontSize:6,fontWeight:700}}>New</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
        {[{v:"$2.4M"},{v:"18.2K"},{v:"42ms"}].map((s,i)=>(
          <div key={i} style={{borderRadius:5,padding:4,background:t.card,border:`1px solid ${t.a1}10`}}>
            <div style={{width:14,height:2,borderRadius:1,background:`${t.text}25`,marginBottom:2}}/>
            <div style={{fontSize:8,fontWeight:700,color:t.text,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:5,color:t.a1,fontWeight:600,marginTop:1}}>+8.1%</div>
          </div>
        ))}
      </div>
      <div style={{flex:1,borderRadius:5,background:t.card,border:`1px solid ${t.a1}10`,padding:4,display:"flex",flexDirection:"column",justifyContent:"flex-end",minHeight:0}}>
        <div style={{display:"flex",alignItems:"flex-end",gap:2,height:"70%"}}>
          {[30,50,35,65,45,70,40,60,55,75,50,82].map((h,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",gap:1,justifyContent:"flex-end",height:"100%"}}>
              <div style={{height:`${h*0.3}%`,borderRadius:1,background:`${t.a2}50`}}/>
              <div style={{height:`${h}%`,borderRadius:1,background:i>=10?t.a1:`${t.a1}25`}}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{borderRadius:4,background:t.card,border:`1px solid ${t.a1}08`,padding:3}}>
        {[0,1].map(r=>(<div key={r} style={{display:"flex",gap:4,marginBottom:r===0?2:0}}>
          <div style={{flex:2,height:2,borderRadius:1,background:r===0?`${t.text}20`:`${t.text}10`}}/>
          <div style={{flex:1,height:2,borderRadius:1,background:r===0?`${t.a1}30`:`${t.a1}15`}}/>
          <div style={{flex:1,height:2,borderRadius:1,background:`${t.text}08`}}/>
        </div>))}
      </div>
    </div>
  );
}

function BigPreview({t}){
  return(
    <div style={{background:t.bg,padding:14,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:18,fontWeight:700,color:t.text}}>Dashboard</div>
        <div style={{padding:"5px 12px",borderRadius:7,background:t.a1,color:t.bg,fontSize:9,fontWeight:700}}>New</div>
      </div>
      <div style={{display:"flex",gap:3,marginBottom:10}}>
        {["Overview","Analytics","Settings"].map((tab,i)=>(<div key={tab} style={{padding:"4px 10px",borderRadius:6,fontSize:9,fontWeight:i===0?600:400,background:i===0?`${t.a1}15`:"transparent",color:i===0?t.a1:`${t.text}30`}}>{tab}</div>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:10}}>
        {[{l:"Revenue",v:"$2.4M",c:"+12.4%"},{l:"Users",v:"18.2K",c:"+8.1%"},{l:"Sessions",v:"142K",c:"+3.7%"},{l:"Bounce",v:"24%",c:"-2.1%"}].map((s,i)=>(
          <div key={s.l} style={{borderRadius:8,padding:8,background:t.card,border:`1px solid ${t.a1}10`}}>
            <div style={{fontSize:6,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",color:`${t.text}40`,marginBottom:2}}>{s.l}</div>
            <div style={{fontSize:13,fontWeight:700,color:t.text,fontFamily:"'JetBrains Mono',monospace"}}>{s.v}</div>
            <div style={{fontSize:7,fontWeight:600,color:i===3?t.a2:t.a1,marginTop:1}}>{s.c}</div>
          </div>
        ))}
      </div>
      <div style={{borderRadius:8,background:t.card,border:`1px solid ${t.a1}10`,padding:10,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <div style={{fontSize:7,fontWeight:600,textTransform:"uppercase",color:`${t.text}30`}}>Performance</div>
          <div style={{display:"flex",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:3,borderRadius:2,background:t.a1}}/><span style={{fontSize:6,color:`${t.text}35`}}>Primary</span></div>
            <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:3,borderRadius:2,background:t.a2}}/><span style={{fontSize:6,color:`${t.text}35`}}>Secondary</span></div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",gap:3,height:60}}>
          {[25,40,30,55,45,65,35,50,42,62,48,72,55,80,60,85,65,92].map((h,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",gap:1,justifyContent:"flex-end",height:"100%"}}>
              <div style={{height:`${h*0.35}%`,borderRadius:2,background:`${t.a2}60`}}/>
              <div style={{height:`${h}%`,borderRadius:2,background:i>=16?t.a1:`${t.a1}25`}}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:6}}>
        <div style={{padding:"6px 14px",borderRadius:7,background:t.a1,color:t.bg,fontSize:9,fontWeight:700}}>Primary Action</div>
        <div style={{padding:"6px 14px",borderRadius:7,background:`${t.a2}20`,border:`1px solid ${t.a2}40`,color:t.a2,fontSize:9,fontWeight:600}}>Secondary</div>
        <div style={{padding:"6px 14px",borderRadius:7,background:"transparent",border:`1px solid ${t.text}15`,color:`${t.text}50`,fontSize:9,fontWeight:500}}>Tertiary</div>
      </div>
    </div>
  );
}

function ThemeCard({t,selected,onSelect}){
  const active=selected===t.id;
  return(
    <button onClick={()=>onSelect(t.id)} style={{
      border:active?`2px solid ${t.a1}`:"1px solid rgba(255,255,255,0.06)",
      borderRadius:12,cursor:"pointer",fontFamily:"inherit",textAlign:"left",
      padding:0,overflow:"hidden",display:"flex",flexDirection:"column",
      transition:"all 0.2s",position:"relative",
      background:active?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.015)",
      boxShadow:active?`0 4px 16px ${t.a1}20`:"none",
    }}>
      <div style={{height:100,overflow:"hidden"}}><MiniPreview t={t}/></div>
      <div style={{padding:"8px 10px",borderTop:`1px solid ${active?`${t.a1}30`:"rgba(255,255,255,0.04)"}`}}>
        <div style={{fontSize:10,fontWeight:700,color:active?"#F0EDE6":"rgba(240,237,230,0.6)",marginBottom:4}}>{t.name}</div>
        <div style={{display:"flex",gap:3}}>
          {[t.bg,t.card,t.a1,t.a2,t.text].map((c,i)=>(
            <div key={i} style={{width:14,height:14,borderRadius:4,background:c,border:"1px solid rgba(128,128,128,0.2)"}}/>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function FinalThemes(){
  const[selected,setSelected]=useState("neon-cyber");
  const[customAccent,setCustomAccent]=useState(null);
  const st=newThemes.find(t=>t.id===selected);
  // apply custom accent if picked
  const display=st&&customAccent?{...st,a1:customAccent}:st;

  return(
    <div style={{minHeight:"100vh",background:"#080b14",color:"#F0EDE6",fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif",padding:"40px 24px 80px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(129,140,248,0.2);border-radius:4px}
      `}</style>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:22,fontWeight:800,marginBottom:4}}>14 New Themes</div>
          <div style={{fontSize:12,color:"rgba(240,237,230,0.4)"}}>Additions to the existing collection. Each with swappable accent colors.</div>
        </div>
        {/* Category pills */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {["Dark","Neutral","Light"].map(cat=>{
            const n=newThemes.filter(t=>t.cat===cat).length;
            return(<div key={cat} style={{fontSize:10,fontWeight:600,color:"rgba(240,237,230,0.3)",display:"flex",alignItems:"center",gap:4}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:cat==="Dark"?"#38bdf8":cat==="Neutral"?"#94a3b8":"#fbbf24"}}/>
              {cat} ({n})
            </div>);
          })}
        </div>

        <div style={{display:"flex",gap:16}}>
          {/* Grid */}
          <div style={{flex:3}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {newThemes.map(t=>(<ThemeCard key={t.id} t={t} selected={selected} onSelect={(id)=>{setSelected(id);setCustomAccent(null);}}/>))}
            </div>
          </div>

          {/* Preview + accent picker */}
          <div style={{flex:2,position:"sticky",top:40,alignSelf:"flex-start"}}>
            {display&&(<div style={{borderRadius:14,overflow:"hidden",border:"2px solid #4338ca",boxShadow:"0 4px 24px rgba(67,56,202,0.25)"}}>
              <div style={{padding:"7px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,#4338ca,#3730a3)"}}>
                <span style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:".06em"}}>Preview</span>
                <span style={{fontSize:8,color:"rgba(255,255,255,0.5)"}}>{display.name}{customAccent?" · Custom Accent":""}</span>
              </div>
              <BigPreview t={display}/>
              {/* Accent picker */}
              <div style={{padding:"12px 14px",background:display.card,borderTop:`1px solid ${display.a1}10`}}>
                <div style={{fontSize:7,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:`${display.text}30`,marginBottom:8}}>Swap Primary Accent</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  {st.accents.map(c=>(
                    <button key={c} onClick={()=>setCustomAccent(c===st.a1?null:c)} style={{
                      width:26,height:26,borderRadius:"50%",background:c,border:`2px solid ${(customAccent===c||(customAccent===null&&c===st.a1))?display.text+"80":"transparent"}`,
                      cursor:"pointer",transition:"all 0.15s",
                      boxShadow:(customAccent===c||(customAccent===null&&c===st.a1))?`0 0 0 2px ${display.bg}, 0 0 0 4px ${c}60`:"none",
                    }}/>
                  ))}
                </div>
              </div>
              {/* Palette strip */}
              <div style={{padding:"10px 14px",background:display.card,borderTop:`1px solid ${display.a1}06`,display:"flex",alignItems:"center",gap:10}}>
                {[{l:"BG",c:display.bg},{l:"Card",c:display.card},{l:"Primary",c:display.a1},{l:"Secondary",c:display.a2},{l:"Text",c:display.text}].map(s=>(
                  <div key={s.l} style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:16,height:16,borderRadius:4,background:s.c,border:"1px solid rgba(128,128,128,0.2)"}}/>
                    <div>
                      <div style={{fontSize:6,fontWeight:600,textTransform:"uppercase",color:`${display.text}30`}}>{s.l}</div>
                      <div style={{fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:`${display.text}50`}}>{s.c}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
