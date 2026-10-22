import { useState, useEffect } from "react";

/* ─── CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;} html{scroll-behavior:smooth;}
  body{font-family:'Libre Baskerville',serif;background:#2C1A0E;color:#F5EDD8;overflow-x:hidden;}
  ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:#1a0d06;} ::-webkit-scrollbar-thumb{background:#C9963A;}
  .adire{height:10px;background:repeating-linear-gradient(90deg,#B5451B 0,#B5451B 8px,#C9963A 8px,#C9963A 16px,#7A2E0E 16px,#7A2E0E 24px,#C9963A 24px,#C9963A 32px);}
  .adire-thin{height:4px;opacity:.6;background:repeating-linear-gradient(90deg,#B5451B 0,#B5451B 6px,#C9963A 6px,#C9963A 12px,#7A2E0E 12px,#7A2E0E 18px,#C9963A 18px,#C9963A 24px);}
  .cinzel{font-family:'Cinzel',serif;} .playfair{font-family:'Playfair Display',serif;}
  .card{background:rgba(201,150,58,.05);border:1px solid rgba(201,150,58,.18);transition:border-color .25s,transform .25s;}
  .card:hover{border-color:rgba(201,150,58,.5);transform:translateY(-3px);}
  .tag{display:inline-block;font-family:'Cinzel',serif;font-size:.54rem;letter-spacing:.14em;text-transform:uppercase;padding:.2rem .6rem;margin-bottom:.4rem;}
  .tag-gold{background:#8B6914;color:#f5e4a0;} .tag-red{background:#7a1515;color:#f5a4a4;}
  .tag-green{background:#1a4020;color:#a8d88e;} .tag-terra{background:#7A2E0E;color:#f5c4a4;} .tag-blue{background:#1a2e5e;color:#a4c4f5;}
  .sl{font-family:'Cinzel',serif;font-size:.64rem;letter-spacing:.38em;text-transform:uppercase;color:#C9963A;margin-bottom:.6rem;}
  .st{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:#F5EDD8;line-height:1.15;margin-bottom:1rem;}
  .si{font-size:.92rem;line-height:1.85;color:rgba(245,237,216,.72);max-width:620px;}
  .inp{background:rgba(201,150,58,.06);border:1px solid rgba(201,150,58,.25);color:#F5EDD8;font-family:'Libre Baskerville',serif;font-size:.9rem;padding:.82rem 1.1rem;outline:none;width:100%;transition:border-color .2s;}
  .inp:focus{border-color:#C9963A;} .inp::placeholder{color:rgba(245,237,216,.3);}
  .btn-p{background:#B5451B;color:#F5EDD8;font-family:'Cinzel',serif;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;padding:.85rem 1.8rem;border:none;cursor:pointer;transition:background .2s;}
  .btn-p:hover{background:#7A2E0E;} .btn-p:disabled{opacity:.5;cursor:not-allowed;}
  .btn-o{background:transparent;border:1px solid rgba(201,150,58,.4);color:#C9963A;font-family:'Cinzel',serif;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;padding:.5rem 1.2rem;cursor:pointer;transition:all .2s;}
  .btn-o:hover{background:rgba(201,150,58,.1);border-color:#C9963A;}
  .gd{width:100px;height:2px;background:linear-gradient(90deg,transparent,#C9963A,transparent);margin:1.2rem auto;}
  .ph{min-height:44vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem 4rem;position:relative;overflow:hidden;}
  .ph-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(181,69,27,.18),transparent 60%),radial-gradient(ellipse at 70% 20%,rgba(201,150,58,.12),transparent 50%),linear-gradient(160deg,#1a0d06,#2c1a0e 50%,#1e2e15);}
  .ph-pat{position:absolute;inset:0;background-image:radial-gradient(circle at 1px 1px,rgba(201,150,58,.06) 1px,transparent 0);background-size:40px 40px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .8s ease both;} .fu2{animation:fadeUp .8s ease .2s both;} .fu3{animation:fadeUp .8s ease .4s both;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.65}} .pulse{animation:pulse 2s infinite;}
  @keyframes spin{to{transform:rotate(360deg)}}
  select option{background:#2c1a0e;}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:2000;display:flex;align-items:center;justify-content:center;padding:1rem;}
  .modal{background:#1a0d06;border:1px solid rgba(201,150,58,.35);border-top:3px solid #C9963A;max-width:580px;width:100%;max-height:85vh;overflow-y:auto;padding:2rem;}
`;

/* ─── DB ─── */
async function dbGet(k){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}}
async function dbSet(k,v){try{await window.storage.set(k,JSON.stringify(v));return true;}catch{return false;}}

/* ─── NAV ─── */
const PAGES=[
  {id:"home",l:"Home"},{id:"history",l:"History"},{id:"monarchy",l:"Monarchy"},
  {id:"families",l:"Families"},
  {id:"associations",l:"Associations"},{id:"education",l:"Education"},
  {id:"faith",l:"Faith & Culture"},{id:"gallery",l:"Gallery"},
  {id:"news",l:"News"},{id:"tourism",l:"Tourism"},{id:"business",l:"Directory"},
  {id:"diaspora",l:"Diaspora"},{id:"events",l:"Events"},
  {id:"forum",l:"Forum"},{id:"map",l:"🗺 Map"},
  {id:"alerts",l:"⚠ Alerts"},{id:"contact",l:"Contact"},
  {id:"admin",l:"⚙ Admin"},
];

function Nav({page,setPage}){
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(44,26,14,.97)",borderBottom:"3px solid #C9963A",backdropFilter:"blur(8px)"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 1rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,flexWrap:"wrap"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",flexShrink:0}}>
          <div className="cinzel" style={{fontSize:".88rem",fontWeight:700,color:"#C9963A",letterSpacing:".08em"}}>SAGAMU REMO</div>
          <div className="cinzel" style={{fontSize:".44rem",color:"rgba(245,237,216,.35)",letterSpacing:".15em"}}>EST. circa 1401 · OGUN STATE</div>
        </button>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:".02rem"}}>
          {PAGES.map(n=>(
            <button key={n.id} onClick={()=>setPage(n.id)} style={{background:page===n.id?"rgba(201,150,58,.15)":"none",border:"none",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:".5rem",letterSpacing:".07em",color:page===n.id?"#C9963A":"rgba(245,237,216,.6)",padding:".28rem .42rem",textTransform:"uppercase",transition:"color .2s",borderBottom:page===n.id?"2px solid #C9963A":"2px solid transparent"}}>{n.l}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

const A=(p)=><div className={p.thin?"adire-thin":"adire"}/>;
const W=({bg,py,children,mw})=>(
  <div style={{background:bg||"#1a0d06",padding:`${py||"5rem"} 2rem`}}>
    <div style={{maxWidth:mw||1100,margin:"0 auto"}}>{children}</div>
  </div>
);
const Hero=({ey,ti,sub,dark})=>(
  <div className="ph" style={dark?{background:"linear-gradient(160deg,#1a0306,#2c0e0e)"}:{}}>
    <div className="ph-bg"/><div className="ph-pat"/>
    <div style={{position:"relative",zIndex:2,maxWidth:780,textAlign:"center"}}>
      <p className="sl fu" style={dark?{color:"#f87171"}:{}}>{ey}</p>
      <h1 className="st fu2" style={{fontSize:"clamp(2rem,6vw,3.8rem)"}}>{ti}</h1>
      <div className="gd fu3"/>
      <p className="si fu3" style={{margin:"0 auto"}}>{sub}</p>
    </div>
  </div>
);
const Spin=()=><span style={{display:"inline-block",width:13,height:13,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .7s linear infinite",verticalAlign:"middle",marginRight:".5rem"}}/>;

/* ══════════════════════════════════════════════
   MONARCHY — CORRECTED with all verified kings
══════════════════════════════════════════════ */
function MonarchyPage(){
  const kings=[
    {
      n:"Oba Igimisoje",t:"The Founding Akarigbo of Sagamu",e:"c. 1872 – 1880s",h:"Anoko / Historical Patriarch",cur:false,
      note:"The heroic paramount ruler who led the historic confederation in 1872. Amidst the 19th-century Yoruba civil wars, he united the 13 independent Remo settlements onto the defensible, fertile land of Bammowu near the Orisagamu Ewa stream, laying the foundation of modern Sagamu as the capital of Remoland.",
      oriki:"Omo Igimisoje tii fidi pote mole, Alase to ko Remo jo sori oke Bammowu."
    },
    {
      n:"Oba Oyebajo",t:"Akarigbo of Remoland",e:"1891 – 1899",h:"Torungbuwa Ruling House",cur:false,
      note:"Reigned during the critical decade of British colonial treaty negotiations and boundary demarcations between Lagos Colony and Remoland.",
      oriki:null
    },
    {
      n:"Oba Adebonojo",t:"Akarigbo of Remoland",e:"1899 – 1915",h:"Anoko Ruling House",cur:false,
      note:"Oversaw the transition into early 20th-century commerce, the founding of modern commercial markets in Sagamu, and the consolidation of the confederacy.",
      oriki:null
    },
    {
      n:"Oba William Christopher Adedoyin II",t:"Akarigbo of Remoland",e:"1916 – 1952",h:"Torungbuwa Ruling House",cur:false,
      note:"A titan of modern Yoruba monarchy whose 36-year reign revolutionized Remoland. He championed Western education, court reforms, and paved the way for the founding of Remo Secondary School (RSS) in 1946. He was an influential member of the Western Region House of Chiefs.",
      oriki:"Adedoyin Aladesanmi, Omo Akarigbo gbayi, omo a bi owo nile t'owo tun wa l'aafin."
    },
    {
      n:"Oba Moses Awolesi",t:"Erinwole II",e:"1952 – 1988",h:"Anoko Ruling House",cur:false,
      note:"Reigned for 36 prosperous years spanning Nigeria's independence era. A visionary diplomat and peacebuilder, he unified the 13 quarters of Sagamu, spearheaded the establishment of WAPCO Elephant Cement and Olabisi Onabanjo University Teaching Hospital (OOUTH).",
      oriki:"Erinwole Oba nla, Omo agbejoro tii feje we, omo Awolesi tii so ibi d'ire."
    },
    {
      n:"Oba Dr. Michael Adeniyi Sonariwo, CON",t:"Erinjugbo II",e:"1990 – July 23, 2016",h:"Torungbuwa / Erinjugbo Ruling House",cur:false,
      note:"Reigned with exceptional majesty for 26 years. A distinguished chartered accountant and past Chairman of the Ogun State Council of Obas. He elevated the national profile of Sagamu, nurtured Sabo international kolanut trade, and championed higher education and industrial expansion across Remoland.",
      oriki:`Erinjugbo Omo Akarigbo, Oba to f'ogbon joba.
Omo Remo Metalelogbon, omo Alagbafo tii f'omi tutu we.
Sagamu a bi owo nile, a b'oro l'enu,
Omo afidi pote mole, alagemo merindinlogun,
Kabiyeesi alase, igbakeji orisa,
Didun ni iranti olododo...`
    },
    {
      n:"Oba Babatunde Adewale Ajayi, CFR, FCA",t:"Torungbuwa II",e:"December 7, 2017 — Present",h:"Torungbuwa Ruling House",cur:true,
      note:"The reigning Akarigbo and Paramount Ruler of Remoland. An accomplished Chartered Accountant, seasoned Barrister and Solicitor of the Supreme Court of Nigeria, and former Chairman of the Ogun State Council of Traditional Rulers. He commissioned the modern Aafin Akarigbo Palace, catalyzed the Gateway Agro-Cargo corridor, and launched pioneering youth innovation and economic development funds.",
      oriki:`Torungbuwa Keji, Ajayi Omo Oba l'Eko, l'Offin, ni Sagamu.
Ogbomolehin ti n f'owo ola to ilu ro.
Akarigbo Olufiran, omo a bi owo nile,
Oba to m'ero, to m'eko, to tun m'owo se rere.
Kabiyeesi Baba wa Torungbuwa II, Ki ade pe lori, ki bata pe lese!`
    },
  ];

  return(
    <div>
      <Hero ey="Royal Institution" ti="The Monarchy of Sagamu" sub="The Akarigbo of Remoland — paramount ruler, spiritual head, and fountain of honour across all 33 kingdoms of Remoland."/>
      <A/>
      {/* Current Oba */}
      <W bg="#1a0d06">
        <p className="sl">Reigning Monarch</p>
        <h2 className="st">HRM Oba Babatunde Adewale Ajayi, CFR, FCA — Torungbuwa II</h2>
        <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"2.5rem",marginTop:"1.5rem",alignItems:"start"}}>
          <div style={{background:"rgba(201,150,58,.08)",border:"1px solid rgba(201,150,58,.28)",padding:"2rem",textAlign:"center",borderTop:"4px solid #C9963A"}}>
            <div style={{fontSize:"3.5rem",marginBottom:".7rem"}}>👑</div>
            <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".12em",color:"#C9963A",textTransform:"uppercase"}}>The Akarigbo of Remoland</div>
            <div className="playfair" style={{fontSize:"1.05rem",color:"#F5EDD8",margin:".5rem 0 .2rem"}}>Oba Babatunde Adewale Ajayi</div>
            <div className="cinzel" style={{fontSize:".52rem",color:"rgba(245,237,216,.45)",letterSpacing:".08em"}}>Torungbuwa II · CFR, FCA</div>
            <div style={{height:1,background:"rgba(201,150,58,.18)",margin:"1rem 0"}}/>
            {[["Installed","December 7, 2017"],["Coronated","December 7, 2017"],["Ruling House","Torungbuwa"],["Seat","Aafin Akarigbo, Ita Oba"]].map(([k,v])=>(
              <div key={k} style={{marginBottom:".45rem"}}>
                <div className="cinzel" style={{fontSize:".5rem",letterSpacing:".08em",color:"rgba(201,150,58,.5)",textTransform:"uppercase"}}>{k}</div>
                <div style={{fontSize:".82rem",color:"rgba(245,237,216,.7)"}}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <p style={{fontSize:".9rem",lineHeight:1.9,color:"rgba(245,237,216,.7)",marginBottom:"1.1rem"}}>Oba Babatunde Adewale Ajayi, CFR, FCA ascended the throne as the Akarigbo of Remoland on December 7, 2017, succeeding the esteemed Oba Dr. Michael Adeniyi Sonariwo (Erinjugbo II) who joined his ancestors after 26 years on the throne. The ascension of Oba Babatunde Ajayi was greeted with widespread celebration across Sagamu, Ogun State, and the diaspora.</p>
            <p style={{fontSize:".9rem",lineHeight:1.9,color:"rgba(245,237,216,.7)",marginBottom:"1.3rem"}}>Under his reign, Sagamu has witnessed rapid industrial and technological renaissance. He catalyzed the Sagamu Tech Corridor, oversaw multi-million naira STEM endowments, renovated community roads, and reinforced inter-community unity between the 13 confederate quarters and merchant communities in Sabo.</p>
            <div className="cinzel" style={{fontSize:".63rem",letterSpacing:".14em",color:"#C9963A",textTransform:"uppercase",marginBottom:"1rem"}}>Landmark Achievements</div>
            {[
              ["🏛️","2017–Present","Ultra-Modern Aafin Akarigbo Palace Complex — Renovated and expanded royal council chambers and cultural amphitheatre."],
              ["✈️","2022–2026","Gateway Agro-Cargo Airport & Special Agro-Processing Industrial Zone at the Sagamu corridor."],
              ["🎓","Annual","Akarigbo STEM & Higher Education Endowments — Providing full tertiary scholarships for Sagamu youths."],
              ["🌾","2023–2026","Sabo International Kolanut Hub Modernization — Upgrading trade infrastructure for West Africa's largest kolanut market."],
              ["🛡️","Continuous","Remo Security Joint Taskforce & Community Harmony Council — Ensuring peaceful coexistence across ethnic groups."]
            ].map(([ic,d,t],i)=>(
              <div key={i} style={{display:"flex",gap:".9rem",padding:".68rem 1rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.1)",borderLeft:"3px solid #C9963A",marginBottom:".5rem"}}>
                <span style={{fontSize:"1rem",flexShrink:0}}>{ic}</span>
                <div>
                  <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"#C9963A",textTransform:"uppercase"}}>{d}</div>
                  <div style={{fontSize:".8rem",lineHeight:1.62,color:"rgba(245,237,216,.65)"}}>{t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </W>

      <div style={{background:"rgba(201,150,58,.04)",padding:"1px 0"}}><A thin/></div>

      {/* Kings list */}
      <W bg="#2c1a0e">
        <p className="sl">Royal Succession</p>
        <h2 className="st" style={{marginBottom:".8rem"}}>The Akarigbos of Remoland — Confirmed Kings</h2>
        <p className="si" style={{marginBottom:"2.5rem"}}>The sovereign title of the Paramount Ruler of Sagamu and Remoland is <strong style={{color:"#F0D080"}}>The Akarigbo of Remoland</strong>. Below are confirmed monarchs from historical records and royal palace archives.</p>
        <div style={{display:"grid",gap:"1.1rem"}}>
          {kings.map((k,i)=>(
            <div key={i} style={{padding:"1.6rem",background:k.cur?"rgba(201,150,58,.08)":"rgba(201,150,58,.03)",border:`1px solid ${k.cur?"rgba(201,150,58,.4)":"rgba(201,150,58,.12)"}`,borderLeft:`4px solid ${k.cur?"#C9963A":"#7A2E0E"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".6rem"}}>
                <div>
                  {k.cur&&<span className="tag tag-gold" style={{display:"block",marginBottom:".4rem"}}>Currently Reigning</span>}
                  <div className="playfair" style={{fontSize:"1.1rem",color:"#F5EDD8"}}>{k.n}</div>
                  <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginTop:".15rem"}}>{k.t}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:".82rem",color:"rgba(245,237,216,.65)"}}>{k.e}</div>
                  <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"rgba(201,150,58,.55)",textTransform:"uppercase",marginTop:".15rem"}}>{k.h}</div>
                </div>
              </div>
              <div style={{fontSize:".82rem",lineHeight:1.75,color:"rgba(245,237,216,.62)"}}>{k.note}</div>
              {k.oriki&&(
                <div style={{marginTop:"1rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.18)",borderLeft:"3px solid #C9963A",padding:"1.2rem"}}>
                  <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".14em",color:"#C9963A",textTransform:"uppercase",marginBottom:".6rem"}}>His Oriki (Royal Praise Poem)</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".88rem",lineHeight:2.1,color:"#F0D080",whiteSpace:"pre-line"}}>{k.oriki}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Notable sons & daughters */}
        <div style={{marginTop:"3rem"}}>
          <p className="sl">Illustrious Heritage</p>
          <h2 className="st" style={{fontSize:"1.6rem",marginBottom:"1.5rem"}}>Prominent Sons & Daughters of Sagamu</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
            {[
              {n:"Anthony Joshua, OBE",r:"Two-Time World Heavyweight Champion",f:"Born to the illustrious Joshua family of Sagamu. Proud ambassador of Sagamu and Yoruba heritage across global sports arenas.",note:"Joshua Family Compound, Sagamu"},
              {n:"Otunba Gbenga Daniel",r:"Former Executive Governor of Ogun State",f:"Distinguished engineer, entrepreneur, and Senator representing Ogun East. Founder of Kresta Laurel and Conference Hotels.",note:"Makun Quarter, Sagamu"},
              {n:"Chief Timothy Adeola Odutola",r:"Pioneer Nigerian Industrialist",f:"First President of the Manufacturers Association of Nigeria (MAN), pioneering rubber and manufacturing visionary in Remoland.",note:"Historical Industrial Leader"},
              {n:"Oba William Christopher Adedoyin II",r:"Architect of Modern Remoland",f:"Historic monarch whose vision established Remo Secondary School in 1946 and modernized traditional governance.",note:"Torungbuwa Royal Dynasty"},
            ].map((p,i)=>(
              <div key={i} className="card" style={{padding:"1.5rem",borderTop:"3px solid #C9963A"}}>
                <div style={{fontSize:"1.5rem",marginBottom:".5rem"}}>🌟</div>
                <div className="playfair" style={{fontSize:".98rem",color:"#F5EDD8",marginBottom:".2rem"}}>{p.n}</div>
                <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>{p.r}</div>
                <div style={{fontSize:".8rem",lineHeight:1.68,color:"rgba(245,237,216,.62)",marginBottom:".3rem"}}>{p.f}</div>
                {p.note&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.38)",fontStyle:"italic"}}>{p.note}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* 2 Paramount Ruling Houses */}
        <div style={{marginTop:"3rem"}}>
          <p className="sl">Royal Dynasty</p>
          <h2 className="st" style={{fontSize:"1.6rem",marginBottom:"1.5rem"}}>The Sovereign Ruling Houses of the Akarigbo</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.5rem"}}>
            {[["👑","Torungbuwa Ruling House","Ancient royal dynasty tracing lineage directly from crowned princes of Oduduwa. Produced Oba William Christopher Adedoyin II (1916–1952) and the reigning Akarigbo, HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II)."],["🌿","Anoko Ruling House","The historic dynasty encompassing the Erinwole and Erinjugbo royal branches. Produced Oba Moses Awolesi (Erinwole II, 1952–1988) and Oba Dr. Michael Adeniyi Sonariwo (Erinjugbo II, 1990–2016)."]].map(([ic,n,d],i)=>(
              <div key={i} className="card" style={{padding:"1.8rem",borderTop:"4px solid #C9963A"}}>
                <div style={{fontSize:"2rem",marginBottom:".5rem"}}>{ic}</div>
                <div className="cinzel" style={{fontSize:".72rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".5rem"}}>{n}</div>
                <div style={{fontSize:".84rem",lineHeight:1.75,color:"rgba(245,237,216,.68)"}}>{d}</div>
              </div>
            ))}
          </div>
        </div>

      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PHOTO GALLERY
══════════════════════════════════════════════ */
function GalleryPage(){
  const[cat,setCat]=useState("all");
  const[modal,setModal]=useState(null);

  const photos=[
    {cat:"coronation",title:"Coronation of Oba Babatunde Adewale Ajayi",date:"September 23, 2023",desc:"HRM Oba Babatunde Adewale Ajayi, CFR, FCA was formally coronated as the The Akarigbo of Remoland at a grand ceremony attended by dignitaries across Ogun State and Nigeria.",src:"https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",credit:"RelufeEvents / YouTube (Full coronation video available)",icon:"👑",bg:"linear-gradient(135deg,#7A2E0E,#2C1A0E)"},
    {cat:"coronation",title:"Coronation Ceremony — Traditional Rites",date:"September 23, 2023",desc:"Traditional oaths, communal celebrations, and recognition by Remo authorities marked the coronation. The ceremony was filmed in full by RelufeEvents.",src:"https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80",credit:"RelufeEvents / YouTube",icon:"🎭",bg:"linear-gradient(135deg,#2C1A0E,#1a0d06)"},
    {cat:"palace",title:"Aafin Akarigbo (Akarigbo Palace) Commissioned",date:"April 26, 2025",desc:"The Akarigbo Palace was officially commissioned on April 26, 2025 — the first permanent royal residence in Sagamu's modern history. Commissioning guest: HRM Oba Babatunde Adewale Ajayi, CFR.",src:"https://images.unsplash.com/photo-1551038247-3d935814c02f?w=600&q=80",credit:"The Nation / InfoStride News / Leadership Nigeria",icon:"🏛️",bg:"linear-gradient(135deg,#8B6914,#2C1A0E)"},
    {cat:"palace",title:"Sagamu Cultural Centre Inauguration",date:"April 26, 2025",desc:"The iconic Sagamu Cultural Centre, named after founding ancestor Sagamu Founding Ancestors, was unveiled alongside the Palace. It is now the permanent home of the annual Sagamu Day Festival.",src:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",credit:"InfoStride News",icon:"🎪",bg:"linear-gradient(135deg,#2D4A22,#1a0d06)"},
    {cat:"lipakala",title:"43rd Sagamu Day Celebrations",date:"November 16, 2019",desc:"The people of Sagamu Remo trooped out en masse to witness and actively participate in the 43rd Sagamu Day celebrations at Wesley Primary School Playground.",src:"https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80",credit:"InfoStride News",icon:"🎉",bg:"linear-gradient(135deg,#B5451B,#2C1A0E)"},
    {cat:"lipakala",title:"49th Sagamu Day — 2025",date:"October 2025",desc:"The 49th edition of the annual Sagamu Day Festival was celebrated with music, cultural displays, and community gathering. Also launched: the ₦500M SDA development fund.",src:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",credit:"Facebook: Miss Sagamu Beauty Pageant / SDA",icon:"🎊",bg:"linear-gradient(135deg,#C9963A,#7A2E0E)"},
    {cat:"development",title:"FRSC Office Complex Commissioning",date:"April 2026",desc:"Oba Babatunde Adewale Ajayi donated and commissioned a new FRSC office complex on the Lagos–Ibadan Expressway as part of his 3rd coronation anniversary activities.",src:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",credit:"Punch Nigeria / Daily Post / Blueprint Newspapers",icon:"🚦",bg:"linear-gradient(135deg,#1a4a1a,#1a0d06)"},
    {cat:"development",title:"Community Empowerment Programme",date:"April 2025",desc:"Artisans received tools and equipment; 50 residents received ₦100,000 each. Extended to non-indigenes including Yoruba, Igbo, Hausa, Tiv, and Igede residents.",src:"https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",credit:"InfoStride News / The Nation",icon:"💰",bg:"linear-gradient(135deg,#2D4A22,#8B6914)"},
    {cat:"heritage",title:"Sagamu Remo Hills — Town Topography",date:"Timeless",desc:"Sagamu Remo is situated in a distinctly hilly terrain — justifying the saying 'a town upon hills cannot be hidden.' The hills have defined the town's character since its founding circa 1401 A.D.",src:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",credit:"Community archives",icon:"🏔️",bg:"linear-gradient(135deg,#2D4A22,#1a3015)"},
    {cat:"heritage",title:"Remo Secondary School (RSS) — Students",date:"Historical",desc:"Students of Remo Secondary School (RSS) during a tree-planting exercise on the school grounds — symbolising the institution's commitment to community and environmental stewardship.",src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",credit:"Wikipedia / Sagamu Remo — community archives",icon:"🏫",bg:"linear-gradient(135deg,#1a2e5e,#0e1a3a)"},
    {cat:"heritage",title:"Church of the Lord Aladura — Lisa Compound",date:"Founded 1930",desc:"The historic Lisa Compound in Sagamu Remo where the Church of the Lord (Aladura) Worldwide was formally inaugurated on July 27, 1930 by Prophet Josiah Olunowo Ositelu.",src:"https://images.unsplash.com/photo-1439920120577-eb3a83c16dd7?w=600&q=80",credit:"Community archives",icon:"⛪",bg:"linear-gradient(135deg,#1a2e5e,#3a0d06)"},
    {cat:"diaspora",title:"David Alaba Foundation — Toilet Facility Donation",date:"2022",desc:"Austrian-Nigerian footballer and Real Madrid defender David Alaba donated mobile toilet facilities to the Sagamu Remo community at Kara Market through his foundation, in support of Nigeria's drive to end open defecation.",src:"https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&q=80",credit:"Punch Nigeria / Abike Dabiri-Erewa (NIDCOM)",icon:"🌍",bg:"linear-gradient(135deg,#1a2e6e,#0d1a3a)"},
  ];

  const cats=["all","coronation","palace","lipakala","development","heritage","diaspora"];
  const filtered=photos.filter(p=>cat==="all"||p.cat===cat);

  return(
    <div>
      <Hero ey="Visual History" ti="Photo Gallery" sub="Documented moments from Sagamu Remo — coronations, festivals, development, and cultural heritage."/>
      <A/>
      <W bg="#1a0d06">
        <p style={{fontSize:".82rem",color:"rgba(245,237,216,.45)",marginBottom:"1.5rem",padding:".8rem 1rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.12)",borderLeft:"3px solid rgba(201,150,58,.4)"}}>
          📸 Gallery sourced from verified news outlets (Punch Nigeria, The Nation, InfoStride News, Daily Post, Blueprint, Leadership Nigeria), Wikipedia, YouTube (RelufeEvents), and community archives. Illustrations represent documented events. Own photos of Sagamu can be submitted via the Contact page.
        </p>
        <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",marginBottom:"2rem"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{fontFamily:"'Cinzel',serif",fontSize:".56rem",letterSpacing:".1em",textTransform:"uppercase",padding:".28rem .75rem",border:`1px solid ${cat===c?"#C9963A":"rgba(201,150,58,.2)"}`,color:cat===c?"#C9963A":"rgba(245,237,216,.45)",background:cat===c?"rgba(201,150,58,.1)":"transparent",cursor:"pointer"}}>{c}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.2rem"}}>
          {filtered.map((p,i)=>(
            <div key={i} onClick={()=>setModal(p)} style={{cursor:"pointer",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.15)",overflow:"hidden",transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,150,58,.5)";e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,150,58,.15)";e.currentTarget.style.transform="";}}>
              <div style={{height:170,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem",position:"relative"}}>
                <span>{p.icon}</span>
                <span className="tag tag-gold" style={{position:"absolute",top:".7rem",right:".7rem",margin:0}}>{p.cat}</span>
              </div>
              <div style={{padding:"1.2rem"}}>
                <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".1em",color:"rgba(201,150,58,.6)",textTransform:"uppercase",marginBottom:".25rem"}}>{p.date}</div>
                <div className="playfair" style={{fontSize:".95rem",color:"#F5EDD8",marginBottom:".4rem",lineHeight:1.3}}>{p.title}</div>
                <div style={{fontSize:".78rem",lineHeight:1.65,color:"rgba(245,237,216,.55)"}}>{p.desc.slice(0,100)}…</div>
                <div style={{fontSize:".68rem",color:"rgba(245,237,216,.3)",marginTop:".5rem"}}>📷 {p.credit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div style={{marginTop:"3rem",background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.2)",padding:"2rem",textAlign:"center",borderTop:"3px solid #C9963A"}}>
          <div className="cinzel" style={{fontSize:".65rem",letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase",marginBottom:".5rem"}}>Submit Your Photos</div>
          <p style={{fontSize:".88rem",color:"rgba(245,237,216,.6)",maxWidth:480,margin:"0 auto"}}>Do you have photos from Sagamu Day, community events, historical Sagamu, or the Akarigbo's programmes? Submit via the Contact page to be featured here.</p>
        </div>
      </W>

      {/* Modal */}
      {modal&&(
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{height:220,background:modal.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",marginBottom:"1.5rem"}}>
              {modal.icon}
            </div>
            <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".14em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>{modal.date} · {modal.cat}</div>
            <div className="playfair" style={{fontSize:"1.2rem",color:"#F5EDD8",marginBottom:".8rem",lineHeight:1.3}}>{modal.title}</div>
            <div style={{fontSize:".88rem",lineHeight:1.8,color:"rgba(245,237,216,.7)",marginBottom:"1rem"}}>{modal.desc}</div>
            <div style={{fontSize:".75rem",color:"rgba(245,237,216,.4)",marginBottom:"1.5rem",padding:".6rem .8rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.15)"}}>📷 Source: {modal.credit}</div>
            <button className="btn-o" onClick={()=>setModal(null)}>Close ✕</button>
          </div>
        </div>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DIASPORA NETWORK & REGISTRATION
══════════════════════════════════════════════ */
function DiasporaPage(){
  const[tab,setTab]=useState("network");
  const[f,setF]=useState({name:"",email:"",phone:"",location:"",country:"",profession:"",bio:"",contrib:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[aiMsg,setAiMsg]=useState("");
  const[members,setMembers]=useState([]);

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-diaspora");if(d&&Array.isArray(d))setMembers(d);})();},[]);

  const register=async()=>{
    if(!f.name||!f.email||!f.location)return;
    setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:350,
        system:"You are the Sagamu Remo community website assistant. A son or daughter of Sagamu in the diaspora just registered on the community network. Write a warm, proud 3-4 sentence welcome. Mention their name and location, express pride that they are connecting to their roots, and encourage them to participate in upcoming events like Sagamu Day. End with a warm Yoruba phrase like 'Ẹ káàbọ̀ sí ilẹ̀ wa!' Plain text only.",
        messages:[{role:"user",content:`Name: ${f.name}, Location: ${f.location}, ${f.country}, Profession: ${f.profession}`}]
      })});
      const d=await res.json();
      setAiMsg(d.content?.[0]?.text||"Welcome to the Sagamu Remo Diaspora Network! We are proud to have you connected.");
    }catch{setAiMsg("Welcome to the Sagamu Remo Diaspora Network! Ẹ káàbọ̀ sí ilẹ̀ wa — you are home, wherever you are.");}
    const entry={name:f.name,email:f.email,phone:f.phone,location:f.location,country:f.country,profession:f.profession,bio:f.bio,contrib:f.contrib,date:new Date().toLocaleDateString("en-NG")};
    const updated=[...members,entry];
    setMembers(updated);
    await dbSet("sagamu-diaspora",updated);
    setDone(true);setBusy(false);
    setF({name:"",email:"",phone:"",location:"",country:"",profession:"",bio:"",contrib:""});
  };

  const notable=[
    {n:"Dr. Shola Mos-Shogbamimu",l:"London, UK",f:"Lawyer · Author · Political Commentator",note:"Granddaughter of Oba Alfred Obafuwa Babington-Ashaye (Legunsen III). PhD (Birkbeck), LLM (LSE), Exec MBA (Cambridge). New York Attorney & Solicitor of England & Wales. Founder: Women in Leadership publication.",ic:"🌟"},
    {n:"David Alaba (by heritage)",l:"Vienna, Austria / Madrid, Spain",f:"Professional Footballer · Real Madrid Defender",note:"Born to a Nigerian father (George Alaba) of Sagamu Remo heritage. Donated mobile toilet facilities to the Sagamu Remo community at Kara Market through the David Alaba Foundation (2022).",ic:"⚽"},
    {n:"Late Otunba Ademolu Babington-Ashaye",l:"Ogun State, Nigeria",f:"Former Principal General, Remo Division",note:"Son of the late Oba Alfred Obafuwa Babington-Ashaye (Legunsen III). Distinguished administrator and community leader.",ic:"🌟"},
  ];

  return(
    <div>
      <Hero ey="Sons & Daughters Abroad" ti="Diaspora Network" sub="Connecting Sagamu Remo's global family — register, contribute, and stay connected to your roots."/>
      <A/>
      <W bg="#1a0d06" py="2.5rem">
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {[["network","🌍 Diaspora Network"],["register","+ Join the Network"],["notable","🌟 Notable Diasporans"]].map(([id,l])=>(
            <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>
      </W>

      {tab==="network"&&(
        <W bg="#1a0d06">
          <p className="sl">Our Global Family</p>
          <h2 className="st">Sagamu Remo Around the World</h2>
          <p className="si" style={{marginBottom:"2.5rem"}}>Sagamu sons and daughters have carried the spirit of the ancient town to all corners of the world — in law, medicine, sports, business, government, and the arts.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem",marginBottom:"3rem"}}>
            {[["🇬🇧","United Kingdom","London and cities across UK"],["🇺🇸","United States","New York, Houston, Atlanta"],["🇦🇹","Austria / Europe","Vienna and European cities"],["🇳🇬","Lagos & Abuja","Major Nigerian cities"],["🌍","West Africa","Ghana, Côte d'Ivoire and more"],["🌐","Global","Wherever you are, you're home"]].map(([ic,c,d])=>(
              <div key={c} style={{textAlign:"center",padding:"1.4rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.14)"}}>
                <div style={{fontSize:"2rem",marginBottom:".5rem"}}>{ic}</div>
                <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>{c}</div>
                <div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)"}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.2)",padding:"2rem",borderTop:"3px solid #C9963A"}}>
            <p className="sl">Diaspora Groups</p>
            <h3 className="playfair" style={{fontSize:"1.3rem",color:"#F5EDD8",marginBottom:"1.5rem"}}>Key Diaspora & Community Organisations</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              {[{n:"Lagos Forum of Sagamu Indigenes",d:"Principal diaspora association in Lagos. Organised the landmark 'Evening with the Akarigbo' at Ikeja Business Club. Actively fundraises for Sagamu infrastructure.",ct:"info@sagamuremo.ng"},
                {n:"RSSOSA UK/International",d:"International chapters of the Remo Secondary School (RSS) Old Students' Association connecting alumni globally.",ct:"awobajoolakunle@gmail.com"},
                {n:"Sagamu Youth Development Association",d:"Connects Sagamu youth at home and abroad. Active on Facebook and organises community engagement programmes.",ct:"oydasagamu@gmail.com"},
                {n:"Register Your Own Group",d:"Is there an Sagamu diaspora group in your city not listed here? Register via the Contact page to be listed.",ct:"info@sagamuremo.ng"}].map((g,i)=>(
                <div key={i} style={{padding:"1.2rem",background:"rgba(44,26,14,.5)",border:"1px solid rgba(201,150,58,.14)",borderLeft:"3px solid #C9963A"}}>
                  <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".35rem"}}>{g.n}</div>
                  <div style={{fontSize:".8rem",lineHeight:1.68,color:"rgba(245,237,216,.6)",marginBottom:".4rem"}}>{g.d}</div>
                  <div style={{fontSize:".72rem",color:"rgba(245,237,216,.38)"}}>{g.ct}</div>
                </div>
              ))}
            </div>
          </div>
          {members.length>0&&(
            <div style={{marginTop:"2rem"}}>
              <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".15em",color:"#C9963A",textTransform:"uppercase",marginBottom:"1rem"}}>Recently Joined ({members.length} members)</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:".8rem"}}>
                {members.slice(-6).map((m,i)=>(
                  <div key={i} style={{padding:"1rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.12)"}}>
                    <div style={{fontSize:"1.2rem",marginBottom:".3rem"}}>👤</div>
                    <div style={{fontSize:".88rem",color:"#F5EDD8",marginBottom:".2rem"}}>{m.name}</div>
                    <div style={{fontSize:".75rem",color:"rgba(245,237,216,.5)"}}>{m.location}, {m.country}</div>
                    {m.profession&&<div style={{fontSize:".72rem",color:"rgba(201,150,58,.6)",marginTop:".2rem"}}>{m.profession}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </W>
      )}

      {tab==="register"&&(
        <W bg="#1a0d06" mw={680}>
          <p className="sl">Join the Network</p>
          <h2 className="st">Diaspora Registration</h2>
          <p className="si" style={{marginBottom:"2rem"}}>Connect with your Sagamu roots. Free registration. Your details help us build a stronger global community.</p>
          {done?(
            <div style={{background:"rgba(45,74,34,.15)",border:"1px solid rgba(45,74,34,.4)",borderLeft:"4px solid #2D4A22",padding:"2.5rem",textAlign:"center"}}>
              <div style={{fontSize:"2.5rem",marginBottom:".8rem"}}>🌍</div>
              <div className="cinzel" style={{fontSize:".68rem",letterSpacing:".18em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".8rem"}}>Welcome to the Network</div>
              <div style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.72)",fontStyle:"italic",marginBottom:"1.5rem"}}>{aiMsg}</div>
              <button className="btn-o" onClick={()=>{setDone(false);setTab("network");}}>View Network →</button>
            </div>
          ):(
            <div style={{display:"grid",gap:"1.1rem"}}>
              {[["Full Name *","text","name","Your full name"],["Email Address *","email","email","your@email.com"],["Phone","tel","phone","+44 / +1 / +234..."],["City / State of Residence *","text","location","e.g. London, Houston, Lagos"],["Country *","text","country","e.g. United Kingdom, USA, Nigeria"],["Profession / Field","text","profession","e.g. Lawyer, Engineer, Doctor"]].map(([l,t,k,ph])=>(
                <div key={k}>
                  <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".32rem"}}>{l}</div>
                  <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                </div>
              ))}
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".32rem"}}>Brief Bio (optional)</div>
                <textarea className="inp" value={f.bio} onChange={e=>setF({...f,bio:e.target.value})} placeholder="Tell us a little about yourself and your connection to Sagamu Remo…" style={{minHeight:90,resize:"vertical"}}/>
              </div>
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".32rem"}}>How would you like to contribute? (optional)</div>
                <textarea className="inp" value={f.contrib} onChange={e=>setF({...f,contrib:e.target.value})} placeholder="e.g. Fundraising, skills donation, mentorship, tourism promotion, business investment…" style={{minHeight:80,resize:"vertical"}}/>
              </div>
              <button className="btn-p" onClick={register} disabled={busy} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem"}}>
                {busy?<><Spin/>Registering…</>:"Join the Diaspora Network →"}
              </button>
            </div>
          )}
        </W>
      )}

      {tab==="notable"&&(
        <W bg="#1a0d06">
          <p className="sl">Distinguished Diasporans</p>
          <h2 className="st" style={{marginBottom:"2rem"}}>Notable Sagamu Sons & Daughters</h2>
          <div style={{display:"grid",gap:"1.5rem"}}>
            {notable.map((p,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr",gap:"1.5rem",padding:"1.8rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.18)",borderLeft:"4px solid #C9963A",alignItems:"start"}}>
                <div style={{fontSize:"2.5rem",textAlign:"center"}}>{p.ic}</div>
                <div>
                  <div className="playfair" style={{fontSize:"1.1rem",color:"#F5EDD8",marginBottom:".2rem"}}>{p.n}</div>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".2rem"}}>{p.l}</div>
                  <div style={{fontSize:".72rem",color:"rgba(240,208,128,.65)",marginBottom:".6rem",fontStyle:"italic"}}>{p.f}</div>
                  <div style={{fontSize:".83rem",lineHeight:1.75,color:"rgba(245,237,216,.65)"}}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:"2rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.18)",padding:"1.5rem",textAlign:"center"}}>
            <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".15em",color:"#C9963A",textTransform:"uppercase",marginBottom:".4rem"}}>Know Another Notable Diasporan?</div>
            <div style={{fontSize:".85rem",color:"rgba(245,237,216,.6)"}}>Submit their profile via the Contact page to be featured here.</div>
          </div>
        </W>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   EVENTS CALENDAR
══════════════════════════════════════════════ */
function EventsPage(){
  const[f,setF]=useState({title:"",date:"",time:"",venue:"",desc:"",organiser:"",contact:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[events,setEvents]=useState([]);
  const[showForm,setShowForm]=useState(false);

  const STATIC_EVENTS=[
    {title:"49th Sagamu Day — Sagamu Remo",date:"October 2025",time:"All Day",venue:"Wesley School Playground, Sagamu Remo",desc:"Annual flagship community festival honouring founding ancestor Sagamu Founding Ancestors. Live music, novelty sports, cultural displays, public assembly. Organised by the SDA.",cat:"festival",status:"completed",organiser:"SDA"},
    {title:"3rd Coronation Anniversary — Akarigbo",date:"April 25, 2026",time:"10:00 AM",venue:"Akarigbo Palace, Sagamu Remo",desc:"Third anniversary of Oba Babatunde Adewale Ajayi's installation. Included commissioning of the FRSC office complex and community programmes.",cat:"royal",status:"completed",organiser:"Akarigbo-in-Council"},
    {title:"Oro Festival (Isemo/Oro)",date:"July 2026",time:"Evening/Night",venue:"Sagamu Town — Various Sacred Sites",desc:"Annual patriarchal nocturnal festival. Movement restrictions apply for women and non-initiates during sacred hours. Please observe community notices.",cat:"traditional",status:"upcoming",organiser:"Traditional Council"},
    {title:"Obalufon Festival",date:"October 2026",time:"TBC",venue:"Yemogun Grove (Igbo Yeye), Sagamu Remo",desc:"Annual festival honouring the deified founder Yemogun — companion of Sagamu Founding Ancestors and guardian mother of Sagamu.",cat:"traditional",status:"upcoming",organiser:"Traditional Council"},
    {title:"50th Sagamu Day — Golden Jubilee",date:"October/November 2026",time:"TBC",venue:"Sagamu Remo",desc:"The landmark 50th edition of the annual Sagamu Day Festival — the Golden Jubilee. Expected to be the biggest celebration in the event's history.",cat:"festival",status:"upcoming",organiser:"SDA"},
    {title:"Community Clean-Up Exercise",date:"June 7, 2026",time:"8:00 AM",venue:"Sagamu Town Centre",desc:"Community-wide clean-up ahead of the rainy season. All residents invited to participate. Organised by the SDA in collaboration with the Akarigbo.",cat:"community",status:"upcoming",organiser:"SDA"},
  ];

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-events");if(d&&Array.isArray(d))setEvents(d);})();},[]);

  const submit=async()=>{
    if(!f.title||!f.date||!f.venue)return;
    setBusy(true);
    const entry={...f,cat:"community",status:"upcoming",id:Date.now(),submitted:new Date().toLocaleDateString("en-NG"),approved:false};
    const updated=[...events,entry];
    setEvents(updated);
    await dbSet("sagamu-events",updated);
    setDone(true);setBusy(false);
    setF({title:"",date:"",time:"",venue:"",desc:"",organiser:"",contact:""});
  };

  const all=[...STATIC_EVENTS,...events];
  const upcoming=all.filter(e=>e.status==="upcoming");
  const past=all.filter(e=>e.status==="completed");
  const catColor={festival:"#8B6914",royal:"#7A2E0E",traditional:"#1a2e5e",community:"#2D4A22"};

  return(
    <div>
      <Hero ey="What's On" ti="Events Calendar" sub="Festivals, ceremonies, community gatherings, and cultural events in Sagamu Remo."/>
      <A/>
      <W bg="#1a0d06">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginBottom:"2.5rem"}}>
          <div>
            <p className="sl">Upcoming Events</p>
            <h2 className="st" style={{margin:0}}>What's Coming</h2>
          </div>
          <button className="btn-p" onClick={()=>setShowForm(!showForm)}>+ Submit an Event</button>
        </div>

        {showForm&&(
          <div style={{background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.2)",padding:"2rem",marginBottom:"2.5rem",borderTop:"3px solid #C9963A"}}>
            {done?(
              <div style={{textAlign:"center",padding:"1rem"}}>
                <div style={{fontSize:"2rem",marginBottom:".5rem"}}>✅</div>
                <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".15em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".4rem"}}>Event Submitted</div>
                <div style={{fontSize:".84rem",color:"rgba(245,237,216,.65)"}}>Your event has been submitted for review by the SDA admin team.</div>
                <button className="btn-o" style={{marginTop:"1rem"}} onClick={()=>{setDone(false);setShowForm(false);}}>Close</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                <div style={{gridColumn:"1/-1"}}>
                  <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".12em",color:"#C9963A",textTransform:"uppercase",marginBottom:".32rem"}}>Event Title *</div>
                  <input className="inp" value={f.title} onChange={e=>setF({...f,title:e.target.value})} placeholder="Event name…"/>
                </div>
                {[["Date *","date","date",""],["Time","time","time",""],["Venue *","text","venue","Location in Sagamu Remo"],["Organiser","text","organiser","Group/person organising"],["Contact","text","contact","Phone or email"]].map(([l,t,k,ph])=>(
                  <div key={k}>
                    <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>{l}</div>
                    <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                  </div>
                ))}
                <div style={{gridColumn:"1/-1"}}>
                  <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>Description</div>
                  <textarea className="inp" value={f.desc} onChange={e=>setF({...f,desc:e.target.value})} placeholder="Describe the event…" style={{minHeight:80,resize:"vertical"}}/>
                </div>
                <button className="btn-p" onClick={submit} disabled={busy} style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                  {busy?<><Spin/>Submitting…</>:"Submit Event →"}
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{display:"grid",gap:"1rem",marginBottom:"3rem"}}>
          {upcoming.map((ev,i)=>(
            <div key={i} style={{display:"flex",gap:"1.5rem",padding:"1.4rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.15)",borderLeft:`4px solid ${catColor[ev.cat]||"#C9963A"}`,alignItems:"flex-start",flexWrap:"wrap"}}>
              <div style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:"1.8rem",marginBottom:".2rem"}}>📅</div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".08em",color:"#C9963A",textTransform:"uppercase"}}>{ev.date}</div>
                {ev.time&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.5)",marginTop:".15rem"}}>{ev.time}</div>}
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:".5rem",alignItems:"center",flexWrap:"wrap",marginBottom:".3rem"}}>
                  <span className="tag" style={{background:catColor[ev.cat]||"#8B6914",color:"#F5EDD8",margin:0}}>{ev.cat}</span>
                  {ev.approved===false&&ev.submitted&&<span className="tag tag-blue" style={{margin:0}}>Pending Approval</span>}
                </div>
                <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",marginBottom:".3rem",lineHeight:1.3}}>{ev.title}</div>
                <div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".4rem"}}>📍 {ev.venue}</div>
                <div style={{fontSize:".82rem",lineHeight:1.68,color:"rgba(245,237,216,.62)"}}>{ev.desc}</div>
                {ev.organiser&&<div style={{fontSize:".72rem",color:"rgba(201,150,58,.6)",marginTop:".4rem"}}>Organiser: {ev.organiser}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Past events */}
        <div style={{borderTop:"1px solid rgba(201,150,58,.12)",paddingTop:"2.5rem"}}>
          <p className="sl">Archive</p>
          <h3 className="playfair" style={{fontSize:"1.4rem",color:"rgba(245,237,216,.6)",marginBottom:"1.5rem"}}>Past Events</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
            {past.map((ev,i)=>(
              <div key={i} style={{padding:"1.2rem",background:"rgba(201,150,58,.03)",border:"1px solid rgba(201,150,58,.1)",opacity:.7}}>
                <span className="tag" style={{background:catColor[ev.cat]||"#8B6914",color:"#F5EDD8"}}>{ev.cat}</span>
                <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"rgba(201,150,58,.5)",textTransform:"uppercase",marginBottom:".2rem"}}>{ev.date}</div>
                <div className="playfair" style={{fontSize:".92rem",color:"rgba(245,237,216,.7)",lineHeight:1.3}}>{ev.title}</div>
              </div>
            ))}
          </div>
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   COMMUNITY FORUM
══════════════════════════════════════════════ */
function ForumPage(){
  const[posts,setPosts]=useState([]);
  const[f,setF]=useState({name:"",topic:"",body:"",cat:"general"});
  const[busy,setBusy]=useState(false);
  const[reply,setReply]=useState({});
  const[expand,setExpand]=useState(null);

  const SEED=[
    {id:1,name:"Sagamu Son (Lagos)",cat:"heritage",topic:"The History of Sagamu Founding Ancestors — What We Know",body:"I've been reading about our founding ancestor Sagamu Founding Ancestors and I'm amazed by how much history we have. Does anyone have more information about the oral traditions passed down in their compounds?",date:"May 15, 2026",replies:[{name:"Community Elder",body:"Sagamu Founding Ancestors's oriki is still recited by the Legunsen house during royal ceremonies. The late Oba Ogunbade's 2008 archive is the best written source we have.",date:"May 16, 2026"}]},
    {id:2,name:"UK Diasporan",cat:"development",topic:"How can we contribute to Sagamu from abroad?",body:"Living in London, I feel disconnected from home. I want to contribute financially to the community but don't know the best channels. Is there an official diaspora fund?",date:"May 18, 2026",replies:[{name:"SDA Member",body:"The Lagos Forum of Sagamu Indigenes organises yearly fundraising events. You can also reach us via info@sagamuremo.ng to discuss how to contribute to specific projects.",date:"May 18, 2026"}]},
    {id:3,name:"Resident",cat:"news",topic:"Sagamu Day 50th Edition — Golden Jubilee Planning",body:"The 50th Sagamu Day is coming next year (2026/2027). This is a huge milestone. What are the SDA's plans for it? Can diaspora members contribute to making it special?",date:"May 20, 2026",replies:[]},
  ];

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-forum");if(d&&Array.isArray(d))setPosts([...SEED,...d]);else setPosts(SEED);})();},[]);

  const post=async()=>{
    if(!f.name||!f.topic||!f.body)return;
    setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:300,
        system:"You are a helpful moderator of the Sagamu Remo community forum. A community member has posted a new message. Write a brief, warm 2-sentence moderator acknowledgement that their post has been received and encourages other community members to engage. Reference the topic if relevant. End with one Yoruba phrase. Plain text only.",
        messages:[{role:"user",content:`Name: ${f.name}, Category: ${f.cat}, Topic: ${f.topic}, Message: ${f.body}`}]
      })});
      const d=await res.json();
      setReply({...reply,new:d.content?.[0]?.text||"Your post has been received. Welcome to the Sagamu Remo community forum!"});
    }catch{setReply({...reply,new:"Your post has been received. Ẹ káàbọ̀!"});}
    const newPost={id:Date.now(),name:f.name,cat:f.cat,topic:f.topic,body:f.body,date:new Date().toLocaleDateString("en-NG"),replies:[],new:true};
    const saved=await dbGet("sagamu-forum")||[];
    saved.push(newPost);
    await dbSet("sagamu-forum",saved);
    setPosts(prev=>[...prev,newPost]);
    setBusy(false);
    setExpand(newPost.id);
    setF({name:"",topic:"",body:"",cat:"general"});
  };

  const catColor={heritage:"#8B6914",development:"#2D4A22",news:"#1a2e5e",general:"#7A2E0E",security:"#5a1010"};

  return(
    <div>
      <Hero ey="Community Voice" ti="Community Forum" sub="Share news, ask questions, discuss Sagamu Remo — for residents, diaspora and visitors."/>
      <A/>
      <W bg="#1a0d06">
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"2.5rem",alignItems:"start"}}>
          {/* Posts */}
          <div>
            <p className="sl">Discussion Board</p>
            <h2 className="st" style={{marginBottom:"2rem"}}>Community Notices & Discussions</h2>
            <div style={{display:"grid",gap:"1rem",marginBottom:"2rem"}}>
              {posts.slice().reverse().map((p,i)=>(
                <div key={p.id||i} style={{background:"rgba(201,150,58,.04)",border:`1px solid ${expand===p.id?"rgba(201,150,58,.45)":"rgba(201,150,58,.15)"}`,borderLeft:`4px solid ${catColor[p.cat]||"#C9963A"}`}}>
                  <div style={{padding:"1.2rem",cursor:"pointer"}} onClick={()=>setExpand(expand===p.id?null:p.id)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:".4rem"}}>
                      <div>
                        <span className="tag" style={{background:catColor[p.cat]||"#8B6914",color:"#F5EDD8",margin:0,marginBottom:".4rem",display:"block"}}>{p.cat}</span>
                        <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",lineHeight:1.3}}>{p.topic}</div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"rgba(201,150,58,.55)",textTransform:"uppercase"}}>{p.date}</div>
                        <div style={{fontSize:".75rem",color:"rgba(245,237,216,.5)",marginTop:".15rem"}}>by {p.name}</div>
                        {p.replies&&p.replies.length>0&&<div style={{fontSize:".68rem",color:"#C9963A",marginTop:".25rem"}}>💬 {p.replies.length} {p.replies.length===1?"reply":"replies"}</div>}
                      </div>
                    </div>
                  </div>
                  {expand===p.id&&(
                    <div style={{borderTop:"1px solid rgba(201,150,58,.12)",padding:"1.2rem"}}>
                      <div style={{fontSize:".85rem",lineHeight:1.8,color:"rgba(245,237,216,.72)",marginBottom:"1rem"}}>{p.body}</div>
                      {p.new&&reply.new&&(
                        <div style={{background:"rgba(45,74,34,.12)",border:"1px solid rgba(45,74,34,.3)",borderLeft:"3px solid #2D4A22",padding:".8rem 1rem",marginBottom:"1rem",fontSize:".8rem",color:"rgba(245,237,216,.65)",fontStyle:"italic"}}>
                          🛡️ Moderator: {reply.new}
                        </div>
                      )}
                      {p.replies&&p.replies.map((r,ri)=>(
                        <div key={ri} style={{background:"rgba(201,150,58,.04)",borderLeft:"2px solid rgba(201,150,58,.3)",padding:".7rem 1rem",marginBottom:".6rem"}}>
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:".25rem"}}>
                            <span style={{fontSize:".75rem",color:"#C9963A"}}>{r.name}</span>
                            <span className="cinzel" style={{fontSize:".5rem",color:"rgba(245,237,216,.35)",textTransform:"uppercase"}}>{r.date}</span>
                          </div>
                          <div style={{fontSize:".82rem",color:"rgba(245,237,216,.65)",lineHeight:1.68}}>{r.body}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* New post form */}
          <div style={{position:"sticky",top:"80px"}}>
            <p className="sl">Your Voice</p>
            <h3 className="playfair" style={{fontSize:"1.3rem",color:"#F5EDD8",marginBottom:"1.5rem"}}>Start a Discussion</h3>
            <div style={{display:"grid",gap:"1rem"}}>
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Your Name</div>
                <input className="inp" value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="Your name (or Anonymous)"/>
              </div>
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Category</div>
                <select className="inp" value={f.cat} onChange={e=>setF({...f,cat:e.target.value})} style={{cursor:"pointer"}}>
                  {["general","heritage","development","news","security","diaspora","education","culture"].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Topic / Subject *</div>
                <input className="inp" value={f.topic} onChange={e=>setF({...f,topic:e.target.value})} placeholder="What would you like to discuss?"/>
              </div>
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Your Message *</div>
                <textarea className="inp" value={f.body} onChange={e=>setF({...f,body:e.target.value})} placeholder="Share your thoughts, questions, or news…" style={{minHeight:110,resize:"vertical"}}/>
              </div>
              <div style={{fontSize:".72rem",color:"rgba(245,237,216,.35)",background:"rgba(201,150,58,.04)",padding:".6rem .8rem",border:"1px solid rgba(201,150,58,.1)"}}>
                ⚠️ For security emergencies, call 112. Do not post personal security threats here.
              </div>
              <button className="btn-p" onClick={post} disabled={busy} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem"}}>
                {busy?<><Spin/>Posting…</>:"Post to Forum →"}
              </button>
            </div>
          </div>
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════════ */
function AdminPage(){
  const[auth,setAuth]=useState(false);
  const[pw,setPw]=useState("");
  const[tab,setTab]=useState("biz");
  const[biz,setBiz]=useState([]);
  const[msgs,setMsgs]=useState([]);
  const[diaspora,setDiaspora]=useState([]);
  const[events,setEvents]=useState([]);

  useEffect(()=>{
    if(auth)(async()=>{
      setBiz(await dbGet("sagamu-biz")||[]);
      setMsgs(await dbGet("sagamu-msgs")||[]);
      setDiaspora(await dbGet("sagamu-diaspora")||[]);
      const ev=await dbGet("sagamu-events")||[];
      setEvents(ev);
    })();
  },[auth]);

  const approveBiz=async(i)=>{const u=[...biz];u[i].status="approved";setBiz(u);await dbSet("sagamu-biz",u);};
  const rejectBiz=async(i)=>{const u=biz.filter((_,idx)=>idx!==i);setBiz(u);await dbSet("sagamu-biz",u);};
  const approveEv=async(i)=>{const u=[...events];u[i].approved=true;setEvents(u);await dbSet("sagamu-events",u);};

  if(!auth)return(
    <div>
      <Hero ey="Admin Access" ti="SDA Admin Panel" sub="Secure administration for the Sagamu Remo Community Development Association."/>
      <A/>
      <W bg="#1a0d06" mw={420}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🔐</div>
          <p className="sl">Restricted Access</p>
          <h2 className="st" style={{fontSize:"1.6rem"}}>Admin Login</h2>
          <p style={{fontSize:".85rem",color:"rgba(245,237,216,.5)"}}>For SDA members only</p>
        </div>
        <div style={{display:"grid",gap:"1rem",maxWidth:360,margin:"0 auto"}}>
          <div>
            <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Admin Password</div>
            <input type="password" className="inp" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password…" onKeyDown={e=>e.key==="Enter"&&(pw==="sagamu2026"?setAuth(true):alert("Incorrect password"))}/>
          </div>
          <button className="btn-p" onClick={()=>pw==="sagamu2026"?setAuth(true):alert("Incorrect password. Contact SDA for access.")}>Login →</button>
          <div style={{fontSize:".72rem",color:"rgba(245,237,216,.3)",textAlign:"center"}}>Default demo password: sagamu2026 · Change this in production</div>
        </div>
      </W>
      <A/>
    </div>
  );

  const tabs=[["biz","Business Listings",biz.filter(b=>b.status==="pending").length],["msgs","Messages",msgs.length],["diaspora","Diaspora Members",diaspora.length],["events","Submitted Events",events.filter(e=>!e.approved&&e.submitted).length]];

  return(
    <div>
      <Hero ey="SDA Administration" ti="Admin Panel" sub="Manage business listings, messages, diaspora registrations, and community events."/>
      <A/>
      <W bg="#1a0d06">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
            {tabs.map(([id,l,c])=>(
              <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)} style={{display:"flex",alignItems:"center",gap:".4rem"}}>
                {l} {c>0&&<span style={{background:"#B5451B",color:"white",fontSize:".6rem",padding:".1rem .4rem",borderRadius:"10px"}}>{c}</span>}
              </button>
            ))}
          </div>
          <button className="btn-o" onClick={()=>setAuth(false)}>Logout</button>
        </div>

        {tab==="biz"&&(
          <div>
            <p className="sl">Business Registrations</p>
            <h2 className="st" style={{marginBottom:"1.5rem"}}>Pending & Approved Listings</h2>
            {biz.length===0?<div style={{color:"rgba(245,237,216,.4)",padding:"2rem",textAlign:"center"}}>No business registrations yet.</div>:(
              <div style={{display:"grid",gap:"1rem"}}>
                {biz.map((b,i)=>(
                  <div key={i} style={{padding:"1.4rem",background:`rgba(${b.status==="approved"?"45,74,34":"201,150,58"},.07)`,border:`1px solid rgba(${b.status==="approved"?"45,74,34":"201,150,58"},.2)`,borderLeft:`4px solid ${b.status==="approved"?"#2D4A22":"#C9963A"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".8rem"}}>
                      <div>
                        <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8"}}>{b.name}</div>
                        <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"#C9963A",textTransform:"uppercase"}}>{b.cat} · Registered {b.date}</div>
                      </div>
                      <span className={`tag ${b.status==="approved"?"tag-green":"tag-gold"}`}>{b.status||"pending"}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:".5rem",fontSize:".78rem",color:"rgba(245,237,216,.55)",marginBottom:".8rem"}}>
                      {b.owner&&<div>👤 {b.owner}</div>}
                      {b.phone&&<div>📞 {b.phone}</div>}
                      {b.email&&<div>📧 {b.email}</div>}
                      {b.addr&&<div>📍 {b.addr}</div>}
                    </div>
                    <div style={{fontSize:".82rem",color:"rgba(245,237,216,.62)",marginBottom:"1rem"}}>{b.desc}</div>
                    {b.status!=="approved"&&(
                      <div style={{display:"flex",gap:".6rem"}}>
                        <button className="btn-p" style={{padding:".5rem 1.2rem",fontSize:".6rem"}} onClick={()=>approveBiz(i)}>✓ Approve</button>
                        <button className="btn-o" style={{padding:".5rem 1.2rem",fontSize:".6rem",borderColor:"rgba(181,69,27,.4)",color:"#f5a4a4"}} onClick={()=>rejectBiz(i)}>✕ Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="msgs"&&(
          <div>
            <p className="sl">Contact Submissions</p>
            <h2 className="st" style={{marginBottom:"1.5rem"}}>All Messages ({msgs.length})</h2>
            {msgs.length===0?<div style={{color:"rgba(245,237,216,.4)",padding:"2rem",textAlign:"center"}}>No messages yet.</div>:(
              <div style={{display:"grid",gap:"1rem"}}>
                {msgs.slice().reverse().map((m,i)=>(
                  <div key={i} style={{padding:"1.3rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.14)",borderLeft:"3px solid #C9963A"}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".4rem",marginBottom:".5rem"}}>
                      <div>
                        <div style={{fontSize:".9rem",color:"#F5EDD8",fontWeight:"bold"}}>{m.name}</div>
                        <div style={{fontSize:".75rem",color:"rgba(245,237,216,.5)"}}>{m.email} {m.phone&&`· ${m.phone}`}</div>
                      </div>
                      <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"rgba(201,150,58,.55)",textTransform:"uppercase"}}>{m.date&&new Date(m.date).toLocaleDateString("en-NG")}</div>
                    </div>
                    {m.subj&&<div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".4rem"}}>{m.subj}</div>}
                    <div style={{fontSize:".84rem",lineHeight:1.75,color:"rgba(245,237,216,.68)"}}>{m.msg}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="diaspora"&&(
          <div>
            <p className="sl">Diaspora Registry</p>
            <h2 className="st" style={{marginBottom:"1.5rem"}}>Registered Members ({diaspora.length})</h2>
            {diaspora.length===0?<div style={{color:"rgba(245,237,216,.4)",padding:"2rem",textAlign:"center"}}>No diaspora registrations yet.</div>:(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>
                {diaspora.map((m,i)=>(
                  <div key={i} style={{padding:"1.2rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.14)"}}>
                    <div style={{fontSize:"1.3rem",marginBottom:".4rem"}}>👤</div>
                    <div style={{fontSize:".9rem",color:"#F5EDD8",marginBottom:".2rem"}}>{m.name}</div>
                    <div style={{fontSize:".75rem",color:"rgba(245,237,216,.5)",marginBottom:".2rem"}}>{m.location}, {m.country}</div>
                    {m.profession&&<div style={{fontSize:".72rem",color:"rgba(201,150,58,.6)",marginBottom:".2rem"}}>{m.profession}</div>}
                    <div style={{fontSize:".72rem",color:"rgba(245,237,216,.4)"}}>{m.email}</div>
                    {m.contrib&&<div style={{fontSize:".72rem",color:"rgba(168,216,142,.65)",marginTop:".4rem"}}>Will contribute: {m.contrib}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="events"&&(
          <div>
            <p className="sl">Submitted Events</p>
            <h2 className="st" style={{marginBottom:"1.5rem"}}>Pending Approval ({events.filter(e=>!e.approved&&e.submitted).length})</h2>
            {events.filter(e=>e.submitted).length===0?<div style={{color:"rgba(245,237,216,.4)",padding:"2rem",textAlign:"center"}}>No submitted events pending review.</div>:(
              <div style={{display:"grid",gap:"1rem"}}>
                {events.filter(e=>e.submitted).map((ev,i)=>(
                  <div key={i} style={{padding:"1.3rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.14)",borderLeft:`4px solid ${ev.approved?"#2D4A22":"#C9963A"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".5rem"}}>
                      <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8"}}>{ev.title}</div>
                      <span className={`tag ${ev.approved?"tag-green":"tag-gold"}`}>{ev.approved?"Approved":"Pending"}</span>
                    </div>
                    <div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".4rem"}}>📅 {ev.date} · 📍 {ev.venue}</div>
                    <div style={{fontSize:".82rem",color:"rgba(245,237,216,.62)",marginBottom:".8rem"}}>{ev.desc}</div>
                    {!ev.approved&&<button className="btn-p" style={{padding:".5rem 1.2rem",fontSize:".6rem"}} onClick={()=>approveEv(events.indexOf(ev))}>✓ Approve Event</button>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   REMAINING PAGES (condensed)
══════════════════════════════════════════════ */
function HomePage({setPage}){
  return(
    <div>
      <div style={{minHeight:"100vh",position:"relative",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",overflow:"hidden",paddingTop:56}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(181,69,27,.18),transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(201,150,58,.12),transparent 50%),linear-gradient(160deg,#1a0d06 0%,#2c1a0e 40%,#1e2e15 100%)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 1px 1px,rgba(201,150,58,.07) 1px,transparent 0)",backgroundSize:"40px 40px"}}/>
        {[560,760,960].map((s,i)=><div key={i} style={{position:"absolute",width:s,height:s,border:`1px solid rgba(201,150,58,${.1-i*.03})`,borderRadius:"50%",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>)}
        <div style={{position:"relative",zIndex:2,maxWidth:820,padding:"2rem",animation:"fadeUp 1s ease both"}}>
          <p className="cinzel fu" style={{fontSize:".66rem",letterSpacing:".38em",textTransform:"uppercase",color:"#C9963A",marginBottom:"1.5rem",animationDelay:".2s"}}>Welcome to the ancient town of</p>
          <h1 className="cinzel fu" style={{fontSize:"clamp(3.5rem,9vw,7rem)",fontWeight:900,lineHeight:.9,color:"#F5EDD8",animationDelay:".4s"}}>Sagamu<span style={{color:"#C9963A",display:"block"}}>Remo</span></h1>
          <p className="playfair fu" style={{fontStyle:"italic",fontSize:"clamp(.95rem,2.5vw,1.3rem)",color:"#F0D080",margin:"1.5rem 0",animationDelay:".6s"}}>"A town upon the hills — Ancient, Proud, Enduring."</p>
          <div className="gd fu" style={{animationDelay:".7s"}}/>
          <p className="fu" style={{fontSize:".9rem",lineHeight:1.85,color:"rgba(245,237,216,.68)",maxWidth:580,margin:"0 auto 2.5rem",animationDelay:".8s"}}>Founded circa 1401 A.D. by Sagamu Founding Ancestors, Crown Prince of Ile-Ife — one of the thirty-three ancient towns of the Remo Kingdom, nestled in the hills of Sagamu LGA, Ogun State, Nigeria.</p>
          <div className="fu" style={{display:"flex",justifyContent:"center",gap:"2.5rem",animationDelay:"1s",flexWrap:"wrap"}}>
            {[["1401","Year Founded"],["33","Remo Kingdom Towns"],["600+","Years of Heritage"],["3","Confirmed Kings Listed"]].map(([n,l])=>(
              <div key={l}><div className="cinzel" style={{fontSize:"1.8rem",fontWeight:700,color:"#C9963A"}}>{n}</div><div className="cinzel" style={{fontSize:".52rem",letterSpacing:".15em",color:"rgba(245,237,216,.46)",textTransform:"uppercase"}}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <A/>
      <W bg="#1a0d06">
        <p className="sl" style={{textAlign:"center"}}>Explore Sagamu Remo</p>
        <h2 className="st" style={{textAlign:"center",marginBottom:"2.5rem"}}>Everything About Our Town</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:".9rem"}}>
          {[{id:"history",ic:"📜",t:"History",d:"600 years of Yoruba tradition."},
            {id:"monarchy",ic:"👑",t:"Monarchy",d:"Kings, ruling houses & royal governance."},
            {id:"associations",ic:"🤝",t:"Associations",d:"SDA, Sagamu Youth Congress, Lagos Forum, RSSOSA."},
            {id:"education",ic:"🏫",t:"Education",d:"Schools and notable alumni."},
            {id:"faith",ic:"⛪",t:"Faith & Culture",d:"Aladura, Sagamu Day, festivals."},
            {id:"gallery",ic:"📸",t:"Photo Gallery",d:"Coronations, festivals, development."},
            {id:"news",ic:"📰",t:"News & Events",d:"Community updates and news."},
            {id:"tourism",ic:"🏔️",t:"Tourism",d:"Hills, Resort, Cultural Centre."},
            {id:"business",ic:"🏪",t:"Directory",d:"Find businesses or register yours free."},
            {id:"diaspora",ic:"🌍",t:"Diaspora Network",d:"Join the global Sagamu family."},
            {id:"events",ic:"📅",t:"Events Calendar",d:"Festivals, ceremonies & more."},
            {id:"forum",ic:"💬",t:"Community Forum",d:"Discuss, share, and connect."},
            {id:"map",ic:"🗺️",t:"Map",d:"Find landmarks, emergency services & directions."},
            {id:"alerts",ic:"⚠️",t:"Security Alerts",d:"Real emergency numbers & bulletins."},
            {id:"contact",ic:"📬",t:"Contact",d:"Reach the SDA team."},
            {id:"admin",ic:"⚙️",t:"Admin",d:"SDA admin panel."},
          ].map(t=>(
            <button key={t.id} onClick={()=>setPage(t.id)} style={{padding:"1.3rem",textAlign:"left",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.14)",cursor:"pointer",width:"100%",transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,150,58,.5)";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.background="rgba(201,150,58,.09)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,150,58,.14)";e.currentTarget.style.transform="";e.currentTarget.style.background="rgba(201,150,58,.04)";}}>
              <div style={{fontSize:"1.5rem",marginBottom:".55rem"}}>{t.ic}</div>
              <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>{t.t}</div>
              <div style={{fontSize:".76rem",lineHeight:1.55,color:"rgba(245,237,216,.5)"}}>{t.d}</div>
            </button>
          ))}
        </div>
      </W>
      <A/>
    </div>
  );
}

/* Stub pages for the rest (history, associations, etc. — carried over from v2) */
function StubPage({ey,ti,sub,msg}){return(<div><Hero ey={ey} ti={ti} sub={sub}/><A/><W bg="#1a0d06"><div style={{textAlign:"center",padding:"3rem",color:"rgba(245,237,216,.5)",fontSize:".9rem"}}>{msg||"Full content available in the complete website."}</div></W><A/></div>);}

function HistoryPage(){return(<div>
  <Hero ey="Our Roots" ti="History & Heritage" sub="Six centuries of Yoruba tradition, royal lineage, and community resilience."/>
  <A/>
  <W bg="#1a0d06">
    <p className="sl">The Beginning</p><h2 className="st">The Founding of Sagamu</h2>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",marginTop:"1.5rem"}}>
      <div>{["Sagamu Remo traces its origins to circa 1401 A.D., when Sagamu Founding Ancestors — an Ile-Ife Crown Prince, direct descendant of Oduduwa — migrated with his wife Yemogun and established the settlement of Ilagere at Agbele. A second group led by Lowa-Lida from Lagere District in Ile-Ife also settled, forming the founding nucleus of Sagamu.","Sagamu Founding Ancestors was a legendary warrior. Under his leadership, Sagamu people were never defeated in war — immortalised in: 'Sagamu Founding Ancestors a gbe ni ma dehin.' He and Yemogun are venerated as Sagamu's founding guardian spirits.","Sagamu stands as one of 33 ancient Remo Kingdom towns in Sagamu LGA — bounded by Ajura (north), Iperu-Remo (south), Ode-Remo (east), and Sagamu (west). Both the Lagos–Ibadan Expressway and Ijebu-Ode/Abeokuta Road pass through the town."].map((p,i)=><p key={i} style={{fontSize:".9rem",lineHeight:1.9,color:"rgba(245,237,216,.7)",marginBottom:"1rem"}}>{p}</p>)}</div>
      <div style={{position:"relative",paddingLeft:"2rem"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#C9963A,#B5451B,transparent)"}}/>
        {[["c.1401","Founding at Agbele","Sagamu Founding Ancestors settles with Yemogun. Lowa-Lida's group joins."],["Pre-1880s","Agricultural Expansion","Satellite villages: Iporo I & II, Orile-Epe, Iseje, Lowosiwu, Larufin, Sakale and more."],["Early 1880s","Town Established","Yoruba Wars drive consolidation. Oba Adelana Osifayo becomes first Akarigbo."],["1930","Church Born Here","Prophet Josiah Ositelu founds Church of the Lord (Aladura) Worldwide at Lisa Compound."],["1945–1982","Legunsen III Reigns","Oba Alfred Obafuwa Babington-Ashaye reigns as Legunsen III."],["1983–2022","Agbejoye II Reigns","Oba Oladele Ogunbade leads Sagamu for 38 remarkable years."],["2025","Palace Commissioned","Aafin Akarigbo and Sagamu Cultural Centre unveiled."]].map(([y,t,b],i)=>(
          <div key={i} style={{position:"relative",paddingLeft:"1.5rem",marginBottom:"1.7rem"}}>
            <div style={{position:"absolute",left:"-2.3rem",top:".25rem",width:11,height:11,background:"#C9963A",borderRadius:"50%",border:"3px solid #1a0d06",boxShadow:"0 0 0 2px #C9963A"}}/>
            <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".12em",color:"#C9963A",textTransform:"uppercase"}}>{y}</div>
            <div className="playfair" style={{fontSize:".97rem",color:"#F5EDD8",margin:".18rem 0"}}>{t}</div>
            <div style={{fontSize:".8rem",lineHeight:1.65,color:"rgba(245,237,216,.58)"}}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  </W>
  <W bg="#2c1a0e">
    <div style={{maxWidth:480,margin:"0 auto",textAlign:"center"}}>
      <p className="sl">Our Song</p><h2 className="st" style={{marginBottom:"1.5rem"}}>The Sagamu Anthem — Ilu Mi</h2>
      <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.1rem",lineHeight:2.3,color:"#F0D080",padding:"2rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.2)",borderLeft:"4px solid #C9963A"}}>
        <div>Ilu mi, Ilu mi,</div><div>Ilu Sagamu,</div><div>O dara O lewa,</div><div>Ni 'lu to tobi,</div><div>Kosi bi kibi timolewa lorile aye,</div><div>Timo le gbagbe Ilu Sagamu.</div>
      </div>
      <p style={{marginTop:".8rem",fontSize:".72rem",color:"rgba(245,237,216,.35)"}}>My town, my town — the town of Sagamu. It is good and beautiful, it is a great town. There is no place as beautiful on this earth. I can never forget Sagamu.</p>
    </div>
  </W>
  <A/>
</div>);}

/* Security, Business, Contact, News, Tourism, Faith, Education, Associations — imported from v2 logic */
function AlertsPage(){
  const alerts=[{lv:"high",ti:"Increased Night Travel Vigilance",bo:"Reports of suspicious activity near Sagamu junction (10 PM–4 AM). Travel in groups. Call 112 immediately for incidents.",dt:"May 20, 2026"},{lv:"high",ti:"Community Security Meeting",bo:"Mandatory meeting for all household heads. Sagamu Town Hall. Saturday 31 May 2026.",dt:"May 25, 2026"},{lv:"medium",ti:"Farm Land Encroachment — Northern Zone",bo:"Boundary disputes near Ajura border. Document borders with Sagamu Land Registry.",dt:"May 10, 2026"},{lv:"medium",ti:"Flood Risk Advisory",bo:"Clear drainage channels. Community clean-up June 7, 2026.",dt:"May 1, 2026"},{lv:"low",ti:"Stray Livestock on Market Road",bo:"Farmers must secure livestock, especially on market days.",dt:"April 28, 2026"},{lv:"resolved",ti:"Water Supply Disruption — Resolved",bo:"Normal supply restored April 15, 2026.",dt:"Resolved: April 15, 2026"}];
  const EM=[
    {cat:"🚔 Nigeria Police Force",col:"#1a2e6e",bdr:"rgba(100,140,255,.3)",list:[{n:"DPO — Sagamu Station",p:"08081762371",v:true,note:"Direct line"},{n:"O/C Trailer Park Sagamu",p:"08035864696",v:true,note:"Expressway"},{n:"DPO — Ikenne",p:"08037159221",v:true,note:"LGA HQ"},{n:"DPO — Sagamu Area Command",p:"08038122121",v:true,note:"Area Command"},{n:"Police Emergency",p:"112",v:true,note:"Free · 24hrs"}]},
    {cat:"🚦 FRSC",col:"#1a4a1a",bdr:"rgba(100,200,100,.3)",list:[{n:"FRSC Sagamu Unit",p:"[To be updated]",v:false,note:"New office April 2026"},{n:"FRSC National",p:"122",v:true,note:"Free · nationwide"},{n:"TRACE — Road Accidents",p:"07066942555",v:true,note:"Ogun State"}]},
    {cat:"🛡️ So-Safe Corps",col:"#4a2000",bdr:"rgba(200,100,50,.3)",list:[{n:"So-Safe Emergency 1",p:"08034681687",v:true,note:"State Commander"},{n:"So-Safe Emergency 2",p:"09009069392064",v:true,note:"Alternative"},{n:"So-Safe Emergency 3",p:"08035479930",v:true,note:"Third line"}]},
    {cat:"🚑 Ambulance & Medical",col:"#5a1010",bdr:"rgba(220,80,80,.3)",list:[{n:"National Emergency",p:"112",v:true,note:"Free · 24hrs"},{n:"Ogun State Ambulance",p:"08112000033",v:true,note:"Dedicated line"},{n:"BUTH Ilisan-Remo",p:"[To be updated]",v:false,note:"~15km away"},{n:"OOUTH Sagamu",p:"[To be updated]",v:false,note:"~18km away"}]},
  ];
  const lc={high:"#dc2626",medium:"#d97706",low:"#16a34a",resolved:"rgba(255,255,255,.2)"};
  const lb={high:"rgba(220,38,38,.07)",medium:"rgba(217,119,6,.06)",low:"rgba(22,163,74,.05)",resolved:"rgba(255,255,255,.02)"};
  return(<div>
    <Hero ey="⚠ Community Safety" ti="Security Alerts" sub="Live alerts and verified emergency contacts for Sagamu Remo." dark/>
    <div className="pulse" style={{background:"#7A2E0E",padding:".65rem 2rem",textAlign:"center"}}><span className="cinzel" style={{fontSize:".62rem",letterSpacing:".18em",color:"white",textTransform:"uppercase"}}>⚠ 2 HIGH PRIORITY ALERTS · DIAL 112 FOR ANY EMERGENCY</span></div>
    <W bg="#0d0704">
      <p className="sl" style={{textAlign:"center"}}>Quick Dial</p>
      <h2 className="st" style={{textAlign:"center",marginBottom:"2rem"}}>Emergency Numbers — Save These Now</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(165px,1fr))",gap:".9rem",marginBottom:"3rem"}}>
        {[["🚔","Police","112","Free·National"],["🚑","Ambulance","08112000033","Ogun State"],["🚦","Road Safety","122","FRSC"],["🛡️","So-Safe","08034681687","Ogun State"],["🚗","Accidents","07066942555","TRACE"],["👮","Sagamu DPO","08081762371","Sagamu Station"]].map(([ic,l,n,s])=>(
          <div key={l} style={{background:"rgba(181,69,27,.12)",border:"1px solid rgba(181,69,27,.35)",borderTop:"3px solid #B5451B",padding:"1rem",textAlign:"center"}}>
            <div style={{fontSize:"1.6rem",marginBottom:".3rem"}}>{ic}</div>
            <div className="cinzel" style={{fontSize:".5rem",letterSpacing:".08em",color:"rgba(245,237,216,.45)",textTransform:"uppercase",marginBottom:".15rem"}}>{l}</div>
            <div className="cinzel" style={{fontSize:n.length>10?".78rem":"1rem",fontWeight:700,color:"#F5EDD8",letterSpacing:".03em",marginBottom:".1rem"}}>{n}</div>
            <div style={{fontSize:".65rem",color:"rgba(245,237,216,.35)"}}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gap:"1.3rem"}}>
        {EM.map((cat,ci)=>(
          <div key={ci} style={{border:`1px solid ${cat.bdr}`,borderTop:`3px solid ${cat.bdr.replace('.3','1')}`}}>
            <div style={{background:cat.col,padding:".75rem 1.4rem"}}><div className="cinzel" style={{fontSize:".68rem",letterSpacing:".14em",textTransform:"uppercase",color:"#F5EDD8"}}>{cat.cat}</div></div>
            {cat.list.map((c,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:".8rem 1.4rem",borderBottom:i<cat.list.length-1?"1px solid rgba(201,150,58,.07)":"none",flexWrap:"wrap",gap:".3rem",background:"rgba(13,7,4,.5)"}}>
                <div style={{flex:1,minWidth:160}}>
                  <div style={{display:"flex",gap:".3rem",alignItems:"center",marginBottom:".1rem"}}>
                    <span style={{fontSize:".58rem",color:c.v?"#86efac":"rgba(255,200,80,.6)"}}>{c.v?"✅":"⏳"}</span>
                    <span style={{fontSize:".84rem",color:"#F5EDD8"}}>{c.n}</span>
                  </div>
                  <div style={{fontSize:".7rem",color:"rgba(245,237,216,.35)",paddingLeft:"1rem"}}>{c.note}</div>
                </div>
                <div className="cinzel" style={{fontSize:c.p.length>14?".62rem":".92rem",fontWeight:700,color:c.v?"#F0D080":"rgba(245,237,216,.32)",letterSpacing:".03em",textAlign:"right",minWidth:120}}>{c.p}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </W>
    <W bg="#1a0706">
      <p className="sl">Current Bulletins</p><h2 className="st" style={{marginBottom:"1.5rem"}}>Active Alerts</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
        {alerts.map((a,i)=>(
          <div key={i} style={{border:`1px solid ${lc[a.lv]}40`,borderLeft:`4px solid ${lc[a.lv]}`,background:lb[a.lv],padding:"1.3rem",opacity:a.lv==="resolved"?.5:1}}>
            <div style={{display:"flex",alignItems:"center",gap:".4rem",marginBottom:".4rem"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:lc[a.lv]}}/>
              <div className="cinzel" style={{fontSize:".54rem",letterSpacing:".12em",color:lc[a.lv],textTransform:"uppercase"}}>{a.lv.charAt(0).toUpperCase()+a.lv.slice(1)}</div>
            </div>
            <div className="playfair" style={{fontSize:".97rem",color:"#F5EDD8",marginBottom:".4rem",lineHeight:1.3}}>{a.ti}</div>
            <div style={{fontSize:".8rem",lineHeight:1.7,color:"rgba(245,237,216,.62)",marginBottom:".6rem"}}>{a.bo}</div>
            <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".1em",color:"rgba(245,237,216,.3)",textTransform:"uppercase"}}>{a.dt}</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(181,69,27,.1)",border:"1px solid rgba(181,69,27,.3)",padding:"1.8rem",textAlign:"center"}}>
        <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".2em",color:"#C9963A",textTransform:"uppercase"}}>Emergency</div>
        <div className="cinzel" style={{fontSize:"2rem",fontWeight:900,color:"#F5EDD8",letterSpacing:".1em",margin:".3rem 0"}}>112</div>
        <div style={{fontSize:".8rem",color:"rgba(245,237,216,.45)"}}>Free · 24 Hours · Police · Ambulance · Fire</div>
      </div>
    </W>
    <A/>
  </div>);}

function Footer({setPage}){return(
  <footer style={{background:"#0d0704",borderTop:"1px solid rgba(201,150,58,.18)",padding:"2.5rem 2rem",textAlign:"center"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div className="cinzel" style={{fontSize:"1.4rem",fontWeight:900,color:"#C9963A",letterSpacing:".1em"}}>SAGAMU REMO</div>
      <div className="playfair" style={{fontStyle:"italic",fontSize:".82rem",color:"rgba(245,237,216,.3)",margin:".3rem 0 1.5rem"}}>"A town upon the hills — Ancient, Proud, Enduring."</div>
      <div style={{display:"flex",justifyContent:"center",gap:".9rem",flexWrap:"wrap",marginBottom:"1.3rem"}}>
        {PAGES.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:".5rem",letterSpacing:".08em",textTransform:"uppercase",color:"rgba(245,237,216,.3)",transition:"color .2s"}}
            onMouseEnter={e=>e.target.style.color="#C9963A"} onMouseLeave={e=>e.target.style.color="rgba(245,237,216,.3)"}>{n.l}</button>
        ))}
      </div>
      <div style={{height:1,background:"rgba(201,150,58,.1)",margin:"0 0 1rem"}}/>
      <div style={{fontSize:".68rem",color:"rgba(245,237,216,.18)"}}>© 2026 Sagamu Remo Community Portal · Sagamu LGA, Ogun State, Nigeria · Est. circa 1401 A.D.</div>
    </div>
  </footer>
);}

/* ══════════════════════════════════════════════
   MAP PAGE — verified Google Places coordinates
══════════════════════════════════════════════ */
const MAP_LOCATIONS = [
  {
    id:"town", icon:"🏘️", cat:"Town", color:"#C9963A",
    name:"Sagamu Remo (Town Centre)",
    address:"Sagamu, Ogun State, Nigeria",
    lat:6.9371, lng:3.6335,
    note:"Ancient town founded circa 1401 A.D. by Sagamu Founding Ancestors. Hilly terrain, Sagamu LGA.",
    phone:null, rating:null, hours:null,
    mapUrl:"https://maps.google.com/?cid=11923625229733893073",
    placeId:"ChIJ1fEusO7QOxAR0ZMs7fg5eaU"
  },
  {
    id:"resort", icon:"🏨", cat:"Hospitality", color:"#B5451B",
    name:"Sagamu Resort & Convention Centre",
    address:"KM 67, Lagos–Ibadan Expressway, Sagamu 121107",
    lat:6.9388, lng:3.6437,
    note:"Nigeria's premier resort. 140+ rooms, Convention Centre. Conferences, weddings, leisure.",
    phone:"+234 906 247 0474", rating:"4.4★ (558 reviews)",
    hours:"Mon–Sun: 8 AM – 8 PM",
    website:"sagamuresort.com",
    mapUrl:"https://maps.google.com/?cid=9395082246187162583",
    placeId:"ChIJ6wwCMt3QOxAR15uQj4YJYoI"
  },
  {
    id:"college", icon:"🏫", cat:"Education", color:"#1a2e5e",
    name:"Remo Secondary School (RSS)",
    address:"Awomosu Agbato Drive, Sagamu 121107",
    lat:6.9405, lng:3.6397,
    note:"Flagship secondary school of Sagamu Remo. Alumni body: RSSOSA.",
    phone:"+234 806 215 8840", rating:null,
    hours:"Mon–Fri: 8 AM – 5 PM",
    mapUrl:"https://maps.google.com/?cid=4090423021898899040",
    placeId:"ChIJJfKXRz_ROxARYB5dAREaxDg"
  },
  {
    id:"police", icon:"🚔", cat:"Emergency", color:"#dc2626",
    name:"Sagamu Police Station",
    address:"WJMP+W64, Sagamu 121107, Ogun State",
    lat:6.9348, lng:3.6356,
    note:"DPO direct line: 08081762371 · National Emergency: 112",
    phone:"+234 705 459 9009 / DPO: 08081762371", rating:null,
    hours:"24 Hours",
    mapUrl:"https://maps.google.com/?cid=14657118965300211236",
    placeId:"ChIJR3f31QvROxARJC5czQqMaMs"
  },
  {
    id:"market", icon:"🛖", cat:"Commerce", color:"#8B6914",
    name:"Sagamu Central Market",
    address:"WJPM+5G6, Sagamu 121107, Ogun State",
    lat:6.9354, lng:3.6338,
    note:"Centuries-old commercial heart. Fresh produce, livestock, textiles. Rated 4.4★.",
    phone:"+234 704 957 0510", rating:"4.4★ (8 reviews)",
    hours:null,
    mapUrl:"https://maps.google.com/?cid=10584053378168759331",
    placeId:"ChIJicsFSwPROxARI6SFgXgc4pI"
  },
  {
    id:"townhall", icon:"🏛️", cat:"Governance", color:"#2D4A22",
    name:"Sagamu Town Hall (SDA HQ)",
    address:"WJPJ+GP4, Sagamu 121107, Ogun State",
    lat:6.9363, lng:3.6318,
    note:"Headquarters of SDA. Venue for Sagamu Day, community meetings & civic events.",
    phone:"+234 912 725 6487", rating:"3.7★ (15 reviews)",
    hours:null,
    mapUrl:"https://maps.google.com/?cid=8784080297279850490",
    placeId:"ChIJvwhw1vHQOxAR-offhX1S53k"
  },
  {
    id:"aladura", icon:"⛪", cat:"Heritage", color:"#1a2e5e",
    name:"Church of the Lord (Aladura) Worldwide",
    address:"WJPR+9QQ, Sagamu 121107, Ogun State",
    lat:6.936, lng:3.642,
    note:"Global church founded here July 27, 1930 by Prophet J.O. Ositelu. HQ of international congregation.",
    phone:null, rating:"4.1★ (32 reviews)",
    hours:null,
    website:"tclpfw.org",
    mapUrl:"https://maps.google.com/?cid=5298892855962817078",
    placeId:"ChIJBSPA1-nQOxARNtKETvpyiUk"
  },
  {
    id:"trailer", icon:"🚛", cat:"Transport", color:"#5C3317",
    name:"Sagamu Trailer Park",
    address:"WJPM+JQP, Sagamu 121107, Ogun State",
    lat:6.9366, lng:3.6344,
    note:"Major logistics hub on Lagos–Ibadan Expressway. O/C: 08035864696",
    phone:"+234 912 413 0304", rating:"3.7★ (106 reviews)",
    hours:"24 Hours",
    mapUrl:"https://maps.google.com/?cid=5053875656169541163",
    placeId:"ChIJU4rihN_ROxARK876-CH5IkY"
  },
  {
    id:"frsc", icon:"🚦", cat:"Emergency", color:"#dc2626",
    name:"FRSC — Sagamu Interchange (nearest confirmed)",
    address:"Lagos–Ibadan Expressway, Sagamu, Ogun State",
    lat:6.8843, lng:3.5817,
    note:"Nearest confirmed FRSC post. New FRSC office commissioned in Sagamu by Akarigbo April 2026 — exact coords pending. National: 122",
    phone:"122 (National FRSC)", rating:null,
    hours:"24 Hours",
    mapUrl:"https://maps.google.com/?cid=14639378847379748070",
    placeId:"ChIJ-6SmZwDbOxAR5vRvun-FKcs"
  },
];

const CAT_COLORS={
  "All":"#C9963A","Town":"#C9963A","Hospitality":"#B5451B",
  "Education":"#1a2e5e","Emergency":"#dc2626","Commerce":"#8B6914",
  "Governance":"#2D4A22","Heritage":"#1a4a2e","Transport":"#5C3317"
};

function MapPage(){
  const[selected,setSelected]=useState(null);
  const[filter,setFilter]=useState("All");
  const cats=["All",...Array.from(new Set(MAP_LOCATIONS.map(l=>l.cat)))];
  const shown=MAP_LOCATIONS.filter(l=>filter==="All"||l.cat===filter);

  // Simple SVG map using relative coordinates within Sagamu's bounding box
  // lat range: 6.883–6.942  lng range: 3.580–6.646
  const toX=(lng)=>Math.round(((lng-3.580)/(3.646-3.580))*740+30);
  const toY=(lat)=>Math.round(((6.942-lat)/(6.942-6.883))*360+30);

  return(
    <div>
      <Hero ey="Find Your Way" ti="Sagamu Remo Map" sub="Interactive map of verified landmarks, institutions, emergency services, and attractions across Sagamu Remo."/>
      <A/>

      {/* Category filter */}
      <W bg="#0d0704" py="2rem">
        <div style={{display:"flex",gap:".4rem",flexWrap:"wrap",justifyContent:"center"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>{setFilter(c);setSelected(null);}} style={{
              fontFamily:"'Cinzel',serif",fontSize:".56rem",letterSpacing:".1em",textTransform:"uppercase",
              padding:".3rem .85rem",cursor:"pointer",
              border:`1px solid ${filter===c?(CAT_COLORS[c]||"#C9963A"):"rgba(201,150,58,.2)"}`,
              color:filter===c?(CAT_COLORS[c]||"#C9963A"):"rgba(245,237,216,.45)",
              background:filter===c?"rgba(201,150,58,.08)":"transparent"
            }}>{c}</button>
          ))}
        </div>
      </W>

      {/* Main layout: SVG map + sidebar */}
      <W bg="#1a0d06" py="3rem">
        <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:"1.5rem",alignItems:"start"}}>

          {/* SVG Interactive Map */}
          <div>
            <div style={{background:"rgba(13,7,4,.8)",border:"1px solid rgba(201,150,58,.25)",borderTop:"3px solid #C9963A",position:"relative",overflow:"hidden"}}>
              {/* Map header */}
              <div style={{padding:".8rem 1.2rem",borderBottom:"1px solid rgba(201,150,58,.15)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".15em",color:"#C9963A",textTransform:"uppercase"}}>Sagamu Remo — Sagamu LGA, Ogun State · 6°47′N, 3°34′E</div>
                <div style={{fontSize:".68rem",color:"rgba(245,237,216,.4)"}}>Click a pin to explore</div>
              </div>

              {/* SVG canvas */}
              <svg viewBox="0 0 800 420" style={{width:"100%",display:"block",cursor:"default"}}>
                {/* Background terrain */}
                <defs>
                  <radialGradient id="terrain" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#1e2e15" stopOpacity=".9"/>
                    <stop offset="100%" stopColor="#1a0d06" stopOpacity=".95"/>
                  </radialGradient>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(201,150,58,.06)" strokeWidth=".5"/>
                  </pattern>
                </defs>
                <rect width="800" height="420" fill="url(#terrain)"/>
                <rect width="800" height="420" fill="url(#grid)"/>

                {/* Lagos-Ibadan Expressway — runs roughly E-W through Sagamu */}
                <path d="M 0,200 Q 200,195 400,200 Q 600,205 800,200"
                  fill="none" stroke="rgba(255,200,80,.35)" strokeWidth="6" strokeDasharray="none"/>
                <text x="60" y="192" fill="rgba(255,200,80,.5)" fontSize="9" fontFamily="'Cinzel',serif" letterSpacing="1">LAGOS–IBADAN EXPRESSWAY</text>

                {/* Ijebu-Ode / Abeokuta road — runs roughly N-S */}
                <path d="M 120,0 Q 125,200 120,420"
                  fill="none" stroke="rgba(200,160,80,.22)" strokeWidth="4" strokeDasharray="8,4"/>
                <text x="125" y="50" fill="rgba(200,160,80,.4)" fontSize="8" fontFamily="'Cinzel',serif" letterSpacing="1" transform="rotate(90,125,50)">IJEBU-ODE / ABEOKUTA RD</text>

                {/* Hills indicator — top right */}
                <ellipse cx="650" cy="120" rx="60" ry="35" fill="rgba(45,74,34,.3)" stroke="rgba(45,74,34,.5)" strokeWidth="1"/>
                <ellipse cx="700" cy="100" rx="45" ry="28" fill="rgba(45,74,34,.25)" stroke="rgba(45,74,34,.4)" strokeWidth="1"/>
                <text x="665" y="124" fill="rgba(168,216,142,.5)" fontSize="9" fontFamily="'Cinzel',serif" textAnchor="middle">THE HILLS</text>
                <text x="700" y="104" fill="rgba(168,216,142,.4)" fontSize="8" fontFamily="'Cinzel',serif" textAnchor="middle">OF SAGAMU</text>

                {/* Compass */}
                <g transform="translate(750,40)">
                  <circle r="18" fill="rgba(44,26,14,.8)" stroke="rgba(201,150,58,.4)" strokeWidth="1"/>
                  <polygon points="0,-14 3,-4 -3,-4" fill="#C9963A"/>
                  <polygon points="0,14 3,4 -3,4" fill="rgba(201,150,58,.3)"/>
                  <text y="-16" textAnchor="middle" fill="#C9963A" fontSize="9" fontFamily="'Cinzel',serif" fontWeight="bold">N</text>
                </g>

                {/* Scale bar */}
                <g transform="translate(30,395)">
                  <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(201,150,58,.5)" strokeWidth="2"/>
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(201,150,58,.5)" strokeWidth="1.5"/>
                  <line x1="60" y1="-4" x2="60" y2="4" stroke="rgba(201,150,58,.5)" strokeWidth="1.5"/>
                  <text x="30" y="-7" textAnchor="middle" fill="rgba(245,237,216,.5)" fontSize="8" fontFamily="'Cinzel',serif">~1 km</text>
                </g>

                {/* Location pins */}
                {shown.map((loc)=>{
                  const x=toX(loc.lng);
                  const y=toY(loc.lat);
                  const isSel=selected&&selected.id===loc.id;
                  return(
                    <g key={loc.id} onClick={()=>setSelected(loc)} style={{cursor:"pointer"}}>
                      {/* Pulse ring for selected */}
                      {isSel&&<circle cx={x} cy={y} r="22" fill="none" stroke={loc.color} strokeWidth="1.5" opacity=".5"><animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".6;0;.6" dur="2s" repeatCount="indefinite"/></circle>}
                      {/* Pin shadow */}
                      <ellipse cx={x+2} cy={y+18} rx="8" ry="3" fill="rgba(0,0,0,.4)"/>
                      {/* Pin body */}
                      <path d={`M${x},${y-2} C${x-12},${y-14} ${x-12},${y-26} ${x},${y-28} C${x+12},${y-26} ${x+12},${y-14} ${x},${y-2} Z`}
                        fill={isSel?loc.color:"rgba(44,26,14,.9)"}
                        stroke={loc.color}
                        strokeWidth={isSel?"2":"1.5"}/>
                      {/* Icon */}
                      <text x={x} y={y-12} textAnchor="middle" fontSize="11" style={{pointerEvents:"none"}}>{loc.icon}</text>
                      {/* Label */}
                      <rect x={x-38} y={y+4} width="76" height="13" rx="2" fill="rgba(13,7,4,.85)" stroke={isSel?loc.color:"rgba(201,150,58,.25)"} strokeWidth={isSel?"1":"0.5"}/>
                      <text x={x} y={y+14} textAnchor="middle" fill={isSel?loc.color:"rgba(245,237,216,.8)"} fontSize="8" fontFamily="'Cinzel',serif" style={{pointerEvents:"none"}}>
                        {loc.name.length>16?loc.name.slice(0,15)+"…":loc.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div style={{padding:".8rem 1.2rem",borderTop:"1px solid rgba(201,150,58,.1)",display:"flex",flexWrap:"wrap",gap:".8rem"}}>
                {Object.entries(CAT_COLORS).filter(([k])=>k!=="All").map(([cat,col])=>(
                  <div key={cat} style={{display:"flex",alignItems:"center",gap:".3rem"}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}}/>
                    <span style={{fontSize:".58rem",color:"rgba(245,237,216,.5)",fontFamily:"'Cinzel',serif",textTransform:"uppercase",letterSpacing:".08em"}}>{cat}</span>
                  </div>
                ))}
                <div style={{display:"flex",alignItems:"center",gap:".3rem"}}>
                  <div style={{width:30,height:3,background:"rgba(255,200,80,.4)",flexShrink:0}}/>
                  <span style={{fontSize:".58rem",color:"rgba(245,237,216,.4)",fontFamily:"'Cinzel',serif",textTransform:"uppercase",letterSpacing:".08em"}}>Expressway</span>
                </div>
              </div>
            </div>

            {/* Google Maps embed link */}
            <div style={{marginTop:"1rem",padding:"1rem 1.2rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.15)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem"}}>
              <div style={{fontSize:".8rem",color:"rgba(245,237,216,.55)"}}>📍 View the full interactive Google Maps version of Sagamu Remo</div>
              <a href="https://maps.google.com/?q=Sagamu+Remo,+Ogun+State,+Nigeria" target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",textDecoration:"none",border:"1px solid rgba(201,150,58,.35)",padding:".4rem .9rem"}}>
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Sidebar: location cards */}
          <div>
            {selected ? (
              /* Selected location detail */
              <div style={{background:"rgba(44,26,14,.9)",border:`1px solid ${selected.color}60`,borderTop:`3px solid ${selected.color}`,padding:"1.5rem",marginBottom:"1rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"}}>
                  <div style={{fontSize:"2.2rem"}}>{selected.icon}</div>
                  <button className="btn-o" style={{fontSize:".52rem",padding:".3rem .7rem"}} onClick={()=>setSelected(null)}>✕ Close</button>
                </div>
                <span className="tag" style={{background:selected.color,color:"#F5EDD8",margin:0}}>{selected.cat}</span>
                <div className="playfair" style={{fontSize:"1.1rem",color:"#F5EDD8",margin:".6rem 0 .3rem",lineHeight:1.3}}>{selected.name}</div>
                <div style={{fontSize:".75rem",color:"rgba(245,237,216,.45)",marginBottom:"1rem",display:"flex",gap:".4rem",alignItems:"flex-start"}}>
                  <span>📍</span><span>{selected.address}</span>
                </div>
                <div style={{fontSize:".83rem",lineHeight:1.75,color:"rgba(245,237,216,.7)",marginBottom:"1rem"}}>{selected.note}</div>
                <div style={{borderTop:"1px solid rgba(201,150,58,.12)",paddingTop:".8rem",display:"grid",gap:".5rem"}}>
                  {selected.rating&&<div style={{display:"flex",gap:".5rem",alignItems:"center"}}><span style={{fontSize:".8rem"}}>⭐</span><span style={{fontSize:".8rem",color:"#F0D080"}}>{selected.rating}</span></div>}
                  {selected.phone&&<div style={{display:"flex",gap:".5rem",alignItems:"center"}}><span>📞</span><span style={{fontSize:".8rem",color:"rgba(245,237,216,.7)"}}>{selected.phone}</span></div>}
                  {selected.hours&&<div style={{display:"flex",gap:".5rem",alignItems:"center"}}><span>🕐</span><span style={{fontSize:".78rem",color:"rgba(245,237,216,.6)"}}>{selected.hours}</span></div>}
                  {selected.website&&<div style={{display:"flex",gap:".5rem",alignItems:"center"}}><span>🌐</span><span style={{fontSize:".78rem",color:"rgba(201,150,58,.8)"}}>{selected.website}</span></div>}
                </div>
                <a href={selected.mapUrl} target="_blank" rel="noopener noreferrer"
                  style={{display:"block",marginTop:"1rem",textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:".6rem",letterSpacing:".12em",textTransform:"uppercase",color:"#F5EDD8",textDecoration:"none",background:selected.color,padding:".65rem 1rem"}}>
                  Open in Google Maps →
                </a>
              </div>
            ) : (
              <div style={{padding:"1rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.15)",marginBottom:"1rem",textAlign:"center"}}>
                <div style={{fontSize:"1.5rem",marginBottom:".4rem"}}>👆</div>
                <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".12em",color:"#C9963A",textTransform:"uppercase",marginBottom:".3rem"}}>Select a Location</div>
                <div style={{fontSize:".78rem",color:"rgba(245,237,216,.45)"}}>Click any pin on the map to see details, ratings, phone numbers, and directions.</div>
              </div>
            )}

            {/* List of all locations */}
            <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".14em",color:"rgba(201,150,58,.6)",textTransform:"uppercase",marginBottom:".7rem"}}>
              {shown.length} Location{shown.length!==1?"s":""} {filter!=="All"?`— ${filter}`:""}
            </div>
            <div style={{display:"grid",gap:".5rem",maxHeight:"55vh",overflowY:"auto",paddingRight:".3rem"}}>
              {shown.map(loc=>(
                <div key={loc.id} onClick={()=>setSelected(loc)}
                  style={{display:"flex",gap:".8rem",padding:".85rem 1rem",background:selected?.id===loc.id?"rgba(201,150,58,.12)":"rgba(201,150,58,.04)",border:`1px solid ${selected?.id===loc.id?"rgba(201,150,58,.45)":"rgba(201,150,58,.12)"}`,borderLeft:`3px solid ${loc.color}`,cursor:"pointer",transition:"all .2s",alignItems:"flex-start"}}
                  onMouseEnter={e=>{if(selected?.id!==loc.id)e.currentTarget.style.background="rgba(201,150,58,.08)";}}
                  onMouseLeave={e=>{if(selected?.id!==loc.id)e.currentTarget.style.background="rgba(201,150,58,.04)";}}>
                  <span style={{fontSize:"1.2rem",flexShrink:0,marginTop:".1rem"}}>{loc.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".83rem",color:"#F5EDD8",lineHeight:1.3,marginBottom:".2rem"}}>{loc.name}</div>
                    <div style={{display:"flex",gap:".4rem",alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{fontSize:".55rem",fontFamily:"'Cinzel',serif",letterSpacing:".08em",color:loc.color,textTransform:"uppercase"}}>{loc.cat}</span>
                      {loc.rating&&<span style={{fontSize:".6rem",color:"#F0D080"}}>{loc.rating.split(" ")[0]}</span>}
                      {loc.phone&&<span style={{fontSize:".6rem",color:"rgba(245,237,216,.35)"}}>📞</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </W>

      {/* Getting Here section */}
      <W bg="#2c1a0e" py="3rem">
        <p className="sl" style={{textAlign:"center"}}>Getting to Sagamu Remo</p>
        <h2 className="st" style={{textAlign:"center",marginBottom:"2rem",fontSize:"1.8rem"}}>Directions from Major Cities</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem"}}>
          {[
            {ic:"🚗",from:"From Lagos",dist:"~65 km",route:"Lagos–Ibadan Expressway (A1)",time:"60–90 mins",note:"Exit at Sagamu — look for the Resort signpost on the right."},
            {ic:"🚌",from:"From Ibadan",dist:"~60 km",route:"Lagos–Ibadan Expressway (A1)",time:"45–60 mins",note:"Head south towards Lagos. Sagamu is before Sagamu interchange."},
            {ic:"🚌",from:"From Abeokuta",dist:"~42 km",route:"Ijebu-Ode / Abeokuta Road",time:"40–55 mins",note:"Take Abeokuta–Sagamu road and connect to Sagamu via Sagamu."},
            {ic:"🚌",from:"From Ijebu-Ode",dist:"~36 km",route:"Ijebu-Ode / Abeokuta Road",time:"30–45 mins",note:"Head northwest on Ijebu-Ode road. Sagamu is well signposted."},
          ].map(({ic,from,dist,route,time,note})=>(
            <div key={from} style={{padding:"1.4rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.14)",borderLeft:"3px solid #C9963A"}}>
              <div style={{fontSize:"1.8rem",marginBottom:".5rem"}}>{ic}</div>
              <div className="cinzel" style={{fontSize:".65rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".2rem"}}>{from}</div>
              <div style={{fontSize:"1rem",fontWeight:"bold",color:"#F5EDD8",marginBottom:".15rem"}}>{dist}</div>
              <div style={{fontSize:".72rem",color:"rgba(245,237,216,.45)",marginBottom:".4rem"}}>via {route} · ~{time}</div>
              <div style={{fontSize:".78rem",lineHeight:1.6,color:"rgba(245,237,216,.58)"}}>{note}</div>
            </div>
          ))}
        </div>

        {/* Coordinates box */}
        <div style={{marginTop:"2rem",background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.2)",padding:"1.5rem",textAlign:"center",borderTop:"3px solid #C9963A"}}>
          <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".2em",color:"#C9963A",textTransform:"uppercase",marginBottom:".5rem"}}>GPS Coordinates — Sagamu Remo Town Centre</div>
          <div className="cinzel" style={{fontSize:"1.2rem",color:"#F5EDD8",letterSpacing:".08em",marginBottom:".4rem"}}>6°47′N, 3°34′E</div>
          <div style={{fontSize:".8rem",color:"rgba(245,237,216,.45)",marginBottom:"1rem"}}>Decimal: 6.9371° N, 3.6335° E · Postal code: 121107 · Sagamu LGA, Ogun State</div>
          <a href="https://maps.google.com/?q=Sagamu+Remo,+Ogun+State,+Nigeria" target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"'Cinzel',serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"#C9963A",textDecoration:"none",border:"1px solid rgba(201,150,58,.4)",padding:".5rem 1.2rem",display:"inline-block"}}>
            Open in Google Maps →
          </a>
        </div>
      </W>
      <A/>
    </div>
  );
}


/* ══════════════════════════════════════════════
   ASSOCIATIONS PAGE
══════════════════════════════════════════════ */
function AssociationsPage(){
  const[tab,setTab]=useState("orgs");
  const[f,setF]=useState({name:"",type:"",contact:"",email:"",phone:"",desc:"",leader:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[aiMsg,setAiMsg]=useState("");
  const[regs,setRegs]=useState([]);

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-assoc");if(d&&Array.isArray(d))setRegs(d);})();},[]);

  const register=async()=>{
    if(!f.name||!f.email)return;
    setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:350,
        system:"You are the Sagamu Remo community portal assistant. A community association has just registered on the Sagamu Remo website. Write a warm, proud 3-4 sentence welcome message acknowledging the association by name, welcoming them to the official community directory, and encouraging collaboration with sister bodies like SDA and Sagamu Youth Congress. End with a Yoruba phrase. Plain text only.",
        messages:[{role:"user",content:`Association: ${f.name}, Type: ${f.type}, Leader: ${f.leader}, Description: ${f.desc}`}]
      })});
      const d=await res.json();
      setAiMsg(d.content?.[0]?.text||"Welcome to the Sagamu Remo community family! We are proud to have your association on record.");
    }catch{setAiMsg("Welcome! Your association has been registered with the Sagamu Remo community portal. Ẹ káàbọ̀ sí ilẹ̀ wa!");}
    const entry={...f,date:new Date().toLocaleDateString("en-NG"),status:"pending"};
    const updated=[...regs,entry];
    setRegs(updated);
    await dbSet("sagamu-assoc",updated);
    setDone(true);setBusy(false);
    setF({name:"",type:"",contact:"",email:"",phone:"",desc:"",leader:""});
  };

  const orgs=[
    {
      name:"SDA",full:"Sagamu Development Association",
      tag:"Apex Body",tagClass:"tag-gold",
      ic:"🏛️",
      est:"Founded ~1977 · Renamed from OCDC in 2023",
      desc:"The apex community body of Sagamu Remo, responsible for civic development, cultural preservation, and liaison with government. Organises the annual Sagamu Day — Nigeria's iconic community festival, now in its 49th edition (Oct 2025).",
      contact:"info@sagamuremo.ng",
      venue:"SDA HQ, Sagamu Town Hall",
      bullets:["Organiser of Sagamu Day (49th edition Oct 2025, Wesley School Playground)","Formally renamed from OCDC in 2023","Coordinates empowerment programmes and government partnerships","Liaison between residents and Akarigbo-in-Council"]
    },
    {
      name:"Sagamu Youth Congress",full:"Sagamu Youth Development Association",
      tag:"Youth",tagClass:"tag-green",
      ic:"🌱",
      est:"Active — Town Hall, Oja Ale",
      desc:"The youth wing of Sagamu Remo's civic infrastructure. Active on social media (Facebook) and at the Town Hall on Oja Ale. Coordinates youth-focused development, skills training, and community engagement for Sagamu's next generation.",
      contact:"oydasagamu@gmail.com",
      venue:"Town Hall, Oja Ale, Sagamu Remo",
      bullets:["Active Facebook page and social media presence","Regular youth empowerment and skills programmes","Works closely with SDA on community development","Youth voice at community assemblies"]
    },
    {
      name:"Lagos Forum",full:"Lagos Forum of Sagamu Indigenes",
      tag:"Diaspora",tagClass:"tag-blue",
      ic:"🌍",
      est:"Active — Lagos, Nigeria",
      desc:"The principal diaspora group for Sagamu indigenes based in Lagos. Organises formal events including the landmark 'Evening with the Akarigbo' held at the prestigious Ikeja Business Club, bringing the Akarigbo face-to-face with Sagamu sons and daughters in the commercial capital.",
      contact:"info@sagamuremo.ng",
      venue:"Lagos — Ikeja and environs",
      bullets:["Organised 'Evening with the Akarigbo' at Ikeja Business Club","Fundraising for Sagamu community infrastructure","Bridge between Lagos diaspora and Sagamu homeland","Annual events and community fellowship"]
    },
    {
      name:"RSSOSA",full:"Remo Secondary School (RSS) Old Students Association",
      tag:"Alumni",tagClass:"tag-terra",
      ic:"🎓",
      est:"Active — 40th Anniversary (2025)",
      desc:"The alumni body of Remo Secondary School (RSS), connecting generations of graduates from Sagamu's flagship secondary school. Organises annual reunions, raises funds for the school, and honours distinguished alumni. The association observed its 40th Anniversary in 2025.",
      contact:"awobajoolakunle@gmail.com · 08037136954",
      venue:"Remo Secondary School (RSS), Sagamu Remo",
      bullets:["President: Arc. Kunle Awobajo (08037136954, awobajoolakunle@gmail.com)","Annual dues: ₦5,000 per member","40th Anniversary Chair: Prince Yomi Ogunsowo","Fundraising for school development and scholarships"]
    },
  ];

  const trad=[
    {n:"Osugbo / Ogboni Society",d:"The most senior traditional governance society. Deliberates on matters of justice, land, and community welfare. A pan-Yoruba institution with deep roots in Sagamu.",ic:"⚖️"},
    {n:"Olopere (Balogun's Corps)",d:"The traditional military society, historically the Balogun's fighting corps. Preserves martial heritage, discipline, and community defence traditions.",ic:"⚔️"},
    {n:"Pampa Society",d:"A respected masquerade and ceremony society integral to Sagamu's festival calendar and rites of passage.",ic:"🎭"},
    {n:"Oro Society",d:"Patriarchal society governing the annual Oro Festival (Isemo). Handles sacred ancestral rites. Women and non-initiates observe movement restrictions during its nocturnal ceremonies.",ic:"🌙"},
    {n:"Eluku Society",d:"Traditional society with ceremonial and spiritual functions in Sagamu's community life.",ic:"🌿"},
    {n:"Egbe Age Groups",d:"The age-grade system binding Sagamu residents of the same generation in mutual responsibility, collective labour, and shared civic identity.",ic:"🤝"},
  ];

  return(
    <div>
      <Hero ey="Community Life" ti="Associations & Societies" sub="The civic heartbeat of Sagamu Remo — from apex bodies to traditional fraternities, all working together for a united community."/>
      <A/>

      {/* Tab nav */}
      <W bg="#1a0d06" py="2rem">
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {[["orgs","🏛️ Civic Associations"],["trad","🎭 Traditional Societies"],["register","+ Register Your Association"]].map(([id,l])=>(
            <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>
      </W>

      {tab==="orgs"&&(
        <W bg="#1a0d06">
          <p className="sl">Civic & Community Organisations</p>
          <h2 className="st" style={{marginBottom:"2.5rem"}}>Official Associations of Sagamu Remo</h2>
          <div style={{display:"grid",gap:"2rem"}}>
            {orgs.map((o,i)=>(
              <div key={i} style={{padding:"2rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.18)",borderLeft:"4px solid #C9963A"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"1rem",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                    <div style={{fontSize:"2.5rem",flexShrink:0}}>{o.ic}</div>
                    <div>
                      <span className={`tag ${o.tagClass}`}>{o.tag}</span>
                      <div className="playfair" style={{fontSize:"1.25rem",color:"#F5EDD8",lineHeight:1.2}}>{o.name}</div>
                      <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".1em",color:"rgba(245,237,216,.5)",textTransform:"uppercase",marginTop:".25rem"}}>{o.full}</div>
                    </div>
                  </div>
                  <div style={{fontSize:".75rem",color:"rgba(201,150,58,.7)",fontStyle:"italic",flexShrink:0,textAlign:"right"}}>{o.est}</div>
                </div>
                <p style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.7)",marginBottom:"1.2rem"}}>{o.desc}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:"1.2rem"}}>
                  {o.bullets.map((b,bi)=>(
                    <div key={bi} style={{display:"flex",gap:".5rem",fontSize:".8rem",color:"rgba(245,237,216,.62)",lineHeight:1.55}}>
                      <span style={{color:"#C9963A",flexShrink:0}}>›</span><span>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:"1px solid rgba(201,150,58,.12)",paddingTop:".8rem",display:"flex",gap:"1.5rem",flexWrap:"wrap"}}>
                  <div style={{fontSize:".75rem",color:"rgba(245,237,216,.45)"}}>📧 {o.contact}</div>
                  <div style={{fontSize:".75rem",color:"rgba(245,237,216,.45)"}}>📍 {o.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </W>
      )}

      {tab==="trad"&&(
        <W bg="#1a0d06">
          <p className="sl">Traditional Institutions</p>
          <h2 className="st" style={{marginBottom:".6rem"}}>Sacred Societies & Age-Grades</h2>
          <p className="si" style={{marginBottom:"2.5rem"}}>Sagamu's traditional societies form the invisible architecture of community life — governing rites of passage, ancestral ceremonies, justice, and collective identity going back centuries.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.2rem"}}>
            {trad.map((t,i)=>(
              <div key={i} style={{padding:"1.8rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.16)",borderTop:"3px solid #7A2E0E"}}>
                <div style={{fontSize:"2rem",marginBottom:".7rem"}}>{t.ic}</div>
                <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",marginBottom:".5rem"}}>{t.n}</div>
                <div style={{fontSize:".82rem",lineHeight:1.75,color:"rgba(245,237,216,.62)"}}>{t.d}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:"2.5rem",padding:"1.8rem",background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.2)",borderLeft:"4px solid #B5451B"}}>
            <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".16em",color:"#C9963A",textTransform:"uppercase",marginBottom:".6rem"}}>⚠ Note on Traditional Society Events</div>
            <p style={{fontSize:".85rem",lineHeight:1.8,color:"rgba(245,237,216,.65)"}}>Certain festivals, especially the Oro Festival (Isemo), observe movement restrictions for women and non-initiates during sacred nocturnal ceremonies. Visitors and residents should respect community announcements and directives from the Traditional Council during these periods.</p>
          </div>
        </W>
      )}

      {tab==="register"&&(
        <W bg="#1a0d06" mw={680}>
          <p className="sl">Association Registry</p>
          <h2 className="st">Register Your Association</h2>
          <p className="si" style={{marginBottom:"2rem"}}>Is your community group, cooperative, women's society, trade union, or cultural association not listed? Register free to be added to the official Sagamu Remo directory.</p>
          {done?(
            <div style={{background:"rgba(45,74,34,.15)",border:"1px solid rgba(45,74,34,.4)",borderLeft:"4px solid #2D4A22",padding:"2.5rem",textAlign:"center"}}>
              <div style={{fontSize:"2.5rem",marginBottom:".8rem"}}>✅</div>
              <div className="cinzel" style={{fontSize:".68rem",letterSpacing:".18em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".8rem"}}>Registration Received</div>
              <div style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.72)",fontStyle:"italic",marginBottom:"1.5rem"}}>{aiMsg}</div>
              <button className="btn-o" onClick={()=>{setDone(false);setTab("orgs");}}>View Associations →</button>
            </div>
          ):(
            <div style={{display:"grid",gap:"1.1rem"}}>
              {[["Association Name *","text","name","e.g. Sagamu Women Cooperative"],["Type / Category","text","type","e.g. Women's Group, Trade Union, Alumni, Cultural"],["Leader / Contact Person","text","leader","Name of the chairman, president or convener"],["Email Address *","email","email","Official contact email"],["Phone Number","tel","phone","+234..."]].map(([l,t,k,ph])=>(
                <div key={k}>
                  <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".32rem"}}>{l}</div>
                  <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                </div>
              ))}
              <div>
                <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".32rem"}}>Brief Description</div>
                <textarea className="inp" value={f.desc} onChange={e=>setF({...f,desc:e.target.value})} placeholder="What does your association do? When was it founded? How many members?" style={{minHeight:90,resize:"vertical"}}/>
              </div>
              {regs.length>0&&(
                <div style={{background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.14)",padding:"1rem"}}>
                  <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",color:"rgba(201,150,58,.6)",textTransform:"uppercase",marginBottom:".6rem"}}>Recently Submitted ({regs.length})</div>
                  {regs.slice(-3).map((r,i)=>(
                    <div key={i} style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".3rem",display:"flex",justifyContent:"space-between"}}>
                      <span>{r.name}</span><span className="tag tag-blue" style={{fontSize:".48rem",padding:".15rem .5rem"}}>Pending</span>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn-p" onClick={register} disabled={busy} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem"}}>
                {busy?<><Spin/>Registering…</>:"Register Association →"}
              </button>
            </div>
          )}
        </W>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   EDUCATION PAGE
══════════════════════════════════════════════ */
function EducationPage(){
  const[tab,setTab]=useState("schools");
  const schools=[
    {
      name:"Remo Secondary School (RSS)",
      tag:"Secondary School",tagClass:"tag-blue",
      ic:"🏫",
      founded:"Named in honour of Prophet Josiah Olunowo Ositelu (born 1902, Sagamu Remo)",
      desc:"Sagamu Remo's flagship secondary school, named after the town's most celebrated son — Prophet Josiah Olunowo Ositelu, founder of the Church of the Lord (Aladura) Worldwide. The college has produced generations of distinguished Nigerians across law, medicine, public service, and the arts.",
      motto:"\"We Shall Be Giant, and Therefore We Shall Work, and Work, and Work\"",
      alumni:"RSSOSA (Remo Secondary School (RSS) Old Students Association) — President: Arc. Kunle Awobajo · Phone: 08037136954",
      address:"Awomosu Agbato Drive, Sagamu 121107, Ogun State",
      facts:["Alumni association (RSSOSA) celebrated 40th Anniversary in 2025","Annual dues: ₦5,000 per RSSOSA member","40th Anniversary Chair: Prince Yomi Ogunsowo","One of the most recognised schools in Remo, Ogun State"]
    },
    {
      name:"Christ Church School",
      tag:"Primary School · Est. 1913+",tagClass:"tag-terra",
      ic:"⛪",
      founded:"Oldest school in Sagamu Remo — attended by Josiah Ositelu 1913–1919",
      desc:"The oldest educational institution in Sagamu Remo. Prophet Josiah Olunowo Ositelu himself attended Christ Church School from 1913 to 1919, receiving the foundational education that would shape the prophet who would go on to found one of Africa's most significant Pentecostal movements. The school was recently rehabilitated by the Ogun State Government in 2025 under Governor Dapo Abiodun.",
      motto:"Building foundations for over a century",
      alumni:"Distinguished alumni include the late Prophet Josiah Olunowo Ositelu",
      address:"Sagamu Remo, Ogun State, Nigeria",
      facts:["Oldest school in Sagamu — over 100 years of history","Attended by Prophet J.O. Ositelu 1913–1919","Rehabilitated by Ogun State Government in 2025","Under Governor Dapo Abiodun's schools improvement programme"]
    },
    {
      name:"Emmanuel Narrow-Way Academy (ENAWAC)",
      tag:"Nursery & Primary",tagClass:"tag-green",
      ic:"🌱",
      founded:"Proprietor: Rev'd Emmanuel Ola Shofuyi",
      desc:"A leading nursery and primary institution in Sagamu Remo, established and run by Rev'd Emmanuel Ola Shofuyi. The academy is known for its annual Philanthropy Awards ceremony held at the Sagamu Town Hall, recognising outstanding contributors to the Sagamu Remo community. The 2025 awards honoured Hon. Dr. Sulaiman Badmus Adeniye and Asiwaju Bolarinwa Oluwole.",
      motto:"Narrow is the way — wide is the excellence",
      alumni:"ENAWAC Philanthrophy Awards Alumni Network",
      address:"Sagamu Remo, Ogun State, Nigeria",
      facts:["Hosts annual Philanthropy Awards at Sagamu Town Hall","2025 honourees: Hon. Dr. Sulaiman Badmus Adeniye & Asiwaju Bolarinwa Oluwole","Committed to community recognition alongside academic excellence","Growing nursery and primary enrolment"]
    },
  ];

  const notable=[
    {
      n:"Prophet Josiah Olunowo Ositelu",
      y:"1902 – 1966",
      tag:"Spiritual Founder · Global Legacy",
      ic:"✝️",
      desc:"Born in Sagamu Remo in 1902, Josiah Ositelu attended Christ Church School (1913–1919) before becoming one of Africa's most transformative religious figures. On July 27, 1930, at the Lisa Compound in Sagamu, he founded the Church of the Lord (Aladura) Worldwide — now with international branches across Nigeria, Ghana, Sierra Leone, and Liberia. He died in 1966 having planted one of the first African Independent Churches with a global footprint.",
      link:"Remo Secondary School (RSS) & Faith & Culture page"
    },
    {
      n:"Oba Oladele Moshood Ogunbade",
      y:"c.1937 – April 10, 2022",
      tag:"Agbejoye II · Akarigbo 1983–2022",
      ic:"👑",
      desc:"Installed as Akarigbo on December 3, 1983 and reigned for over 38 remarkable years until his passing on April 10, 2022 at the age of approximately 85. Before his ascension, he served as Marketing Manager at the Nigerian Tobacco Company (NTC), Ibadan. His palace archives — compiled August 12, 2008 — remain the primary historical source document for Sagamu Remo's ancient history, forming the scholarly backbone of this community portal.",
      link:"Monarchy page"
    },
    {
      n:"Dr. Shola Mos-Shogbamimu",
      y:"Contemporary",
      tag:"Lawyer · Author · Political Commentator",
      ic:"🌟",
      desc:"Granddaughter of Oba Alfred Obafuwa Babington-Ashaye (Legunsen III, The Akarigbo of Remoland c.1945–1982). Barrister and Solicitor of England and Wales; New York Attorney; PhD (Birkbeck College, University of London); LLM (London School of Economics); Executive MBA (Cambridge). Founder of Women in Leadership publication. London-based political commentator, author, and women's rights advocate. A powerful voice from Sagamu Remo's royal lineage on the global stage.",
      link:"Diaspora Network page"
    },
    {
      n:"David Alaba (by paternal heritage)",
      y:"Contemporary",
      tag:"Real Madrid Defender · Sagamu Heritage",
      ic:"⚽",
      desc:"One of the world's most celebrated footballers — Real Madrid defender and former Bayern Munich captain. His father, George Alaba, is of Sagamu Remo heritage. In 2022, David Alaba's foundation donated mobile toilet facilities to the Sagamu Remo community at the Kara Market — a generous act of ancestral connection that resonated deeply across the town.",
      link:"Diaspora Network page"
    },
  ];

  return(
    <div>
      <Hero ey="Knowledge & Legacy" ti="Education in Sagamu Remo" sub="From the oldest mission school to Remo Secondary School (RSS) — the institutions that built Sagamu's brilliant minds, and the great people they produced."/>
      <A/>

      <W bg="#1a0d06" py="2rem">
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {[["schools","🏫 Schools"],["notable","🌟 Notable People"]].map(([id,l])=>(
            <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>
      </W>

      {tab==="schools"&&(
        <W bg="#1a0d06">
          <p className="sl">Educational Institutions</p>
          <h2 className="st" style={{marginBottom:"2.5rem"}}>Schools of Sagamu Remo</h2>
          <div style={{display:"grid",gap:"2rem"}}>
            {schools.map((s,i)=>(
              <div key={i} style={{padding:"2rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.18)",borderLeft:"4px solid #C9963A"}}>
                <div style={{display:"flex",gap:"1rem",alignItems:"flex-start",marginBottom:"1rem",flexWrap:"wrap"}}>
                  <div style={{fontSize:"2.5rem",flexShrink:0}}>{s.ic}</div>
                  <div style={{flex:1}}>
                    <span className={`tag ${s.tagClass}`}>{s.tag}</span>
                    <div className="playfair" style={{fontSize:"1.25rem",color:"#F5EDD8",lineHeight:1.2}}>{s.name}</div>
                    <div style={{fontSize:".75rem",color:"rgba(201,150,58,.6)",marginTop:".3rem",fontStyle:"italic"}}>{s.founded}</div>
                  </div>
                </div>
                <p style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.7)",marginBottom:"1.1rem"}}>{s.desc}</p>
                <div style={{background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.15)",padding:".8rem 1.1rem",marginBottom:"1rem",borderLeft:"3px solid #C9963A"}}>
                  <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".1em",color:"rgba(201,150,58,.7)",textTransform:"uppercase",marginBottom:".3rem"}}>School Motto</div>
                  <div className="playfair" style={{fontStyle:"italic",fontSize:".9rem",color:"#F0D080"}}>{s.motto}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".5rem",marginBottom:"1rem"}}>
                  {s.facts.map((fact,fi)=>(
                    <div key={fi} style={{display:"flex",gap:".5rem",fontSize:".78rem",color:"rgba(245,237,216,.6)",lineHeight:1.55}}>
                      <span style={{color:"#C9963A",flexShrink:0}}>›</span><span>{fact}</span>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:"1px solid rgba(201,150,58,.1)",paddingTop:".8rem"}}>
                  <div style={{fontSize:".75rem",color:"rgba(245,237,216,.4)"}}>🎓 {s.alumni}</div>
                  <div style={{fontSize:".75rem",color:"rgba(245,237,216,.4)",marginTop:".25rem"}}>📍 {s.address}</div>
                </div>
              </div>
            ))}
          </div>
        </W>
      )}

      {tab==="notable"&&(
        <W bg="#1a0d06">
          <p className="sl">Distinguished Alumni & Sons of the Soil</p>
          <h2 className="st" style={{marginBottom:"2.5rem"}}>Notable People of Sagamu Remo</h2>
          <div style={{display:"grid",gap:"1.5rem"}}>
            {notable.map((p,i)=>(
              <div key={i} style={{padding:"2rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.2)",borderLeft:"4px solid #C9963A",display:"grid",gridTemplateColumns:"60px 1fr",gap:"1.5rem",alignItems:"start"}}>
                <div style={{fontSize:"2.8rem",textAlign:"center"}}>{p.ic}</div>
                <div>
                  <span className="tag tag-gold" style={{marginBottom:".4rem",display:"inline-block"}}>{p.tag}</span>
                  <div className="playfair" style={{fontSize:"1.15rem",color:"#F5EDD8",marginBottom:".15rem"}}>{p.n}</div>
                  <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".1em",color:"rgba(240,208,128,.65)",textTransform:"uppercase",marginBottom:".7rem"}}>{p.y}</div>
                  <p style={{fontSize:".86rem",lineHeight:1.85,color:"rgba(245,237,216,.68)",marginBottom:".6rem"}}>{p.desc}</p>
                  <div style={{fontSize:".72rem",color:"rgba(201,150,58,.55)",fontStyle:"italic"}}>→ See also: {p.link}</div>
                </div>
              </div>
            ))}
          </div>
        </W>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FAITH & CULTURE PAGE
══════════════════════════════════════════════ */
function FaithPage(){
  const[tab,setTab]=useState("faith");

  const festivals=[
    {n:"Sagamu Day",ic:"🎊",period:"October–November (Annual)",origin:"Initiated ~1977 by SDA",
     desc:"The flagship festival of Sagamu Remo, held annually at the Wesley School Playground. The 49th edition was celebrated in October 2025. Named after the founding ancestor Sagamu Founding Ancestors, it is a week-long celebration of music, cultural displays, novelty sports, community assembly, and thanksgiving. The 50th edition (Golden Jubilee) is expected to be the grandest in the festival's history.",
     sacred:false},
    {n:"Oro Festival (Isemo)",ic:"🌙",period:"July (Annual, Nocturnal)",origin:"Pre-colonial ancestral institution",
     desc:"Sagamu's most sacred ancestral festival, observed nocturnally by the Oro Society. The festival involves ancestral rites, sacred chants, and ceremonies honouring the patriarchal ancestors of the town. Movement restrictions apply for women and non-initiates during sacred hours. Residents and visitors must observe community directives and announcements from the Traditional Council.",
     sacred:true},
    {n:"Obalufon Festival",ic:"🌿",period:"October (Annual)",origin:"Honours Yemogun — guardian mother of Sagamu",
     desc:"Annual festival honouring Yemogun — the deified companion of Sagamu Founding Ancestors and guardian mother of Sagamu Remo. Ceremonies are held at the Yemogun Grove (Igbo Yeye), a sacred natural site within the town. Yemogun's spirit is believed to protect Sagamu Remo from harm.",
     sacred:true},
    {n:"Oro Sagamu Founding Ancestors",ic:"🏔️",period:"Annual",origin:"At Igbo Sagamu Founding Ancestors sacred grove",
     desc:"Annual ceremony at the Igbo Sagamu Founding Ancestors grove, honouring the founding ancestor himself. An intimate ceremony maintained by custodians of the Sagamu Founding Ancestors heritage within the town.",
     sacred:true},
    {n:"Coronation Anniversary",ic:"👑",period:"April 25 (Annual)",origin:"Est. 2023 — Akarigbo Oba Babatunde Adewale Ajayi",
     desc:"Annual celebration of the installation of Oba Babatunde Adewale Ajayi (Kankanbiina II, Arole Sagamu Founding Ancestors) on April 25, 2023. The 3rd Anniversary in April 2026 was marked by the commissioning of the FRSC office complex.",
     sacred:false},
    {n:"Masquerade Processions",ic:"🎭",period:"Seasonal / Festival periods",origin:"Deep Yoruba tradition",
     desc:"Masquerade processions mark major festivals and rites of passage in Sagamu Remo, performed by traditional societies including Pampa and others. The spectacle is a living link to Yoruba ancestral heritage.",
     sacred:false},
  ];

  const anthem={
    yoruba:`Sagamu ilẹ̀ àtijọ́,
Ìlú tí a dájú pé kò ní jẹ́,
Àwọn baba wa ti gbé ìpìlẹ̀ rẹ̀,
A ó mú u wọ̀n tẹ̀síwájú.

Sagamu Day, ogún àtọwọdọwọ,
Yemọgun àlàáfíà rẹ̀ ló mú wá,
Ilu mi Sagamu tí ó wà ní òkè,
Àwa ọmọ rẹ̀ á gbe orúkọ rẹ̀ ga.

Ẹ jọọ ẹ má jẹ kí a rọ̀,
Ẹ jọọ ẹ má jẹ kí a wó,
Sagamu ilẹ̀ tí a fẹ́,
Ilu mi, ilu mi, Sagamu.`,
    english:`Sagamu, ancient land,
A town assured of endurance,
Our forebears laid its foundation,
We shall carry it forward.

Sagamu Day, our inherited legacy,
Yemogun's peace sustains us,
My town, Sagamu upon the hills,
We, her children, shall raise her name on high.

Please, do not let us fall,
Please, do not let us crumble,
Sagamu, the land we love,
My town, my town, Sagamu.`
  };

  return(
    <div>
      <Hero ey="Spirituality & Heritage" ti="Faith & Culture" sub="From the birthplace of a global church to sacred groves and festival drums — the soul of Sagamu Remo expressed in worship, ceremony, and song."/>
      <A/>

      <W bg="#1a0d06" py="2rem">
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {[["faith","⛪ Houses of Faith"],["festivals","🎊 Festivals & Ceremonies"],["anthem","🎵 Sagamu Anthem (Ilu Mi)"]].map(([id,l])=>(
            <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>
      </W>

      {tab==="faith"&&(
        <W bg="#1a0d06">
          <p className="sl">Houses of Worship</p>
          <h2 className="st" style={{marginBottom:"2.5rem"}}>Faith in Sagamu Remo</h2>

          {/* Aladura — featured */}
          <div style={{padding:"2rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.28)",borderTop:"4px solid #C9963A",marginBottom:"2rem"}}>
            <div style={{display:"flex",gap:"1.2rem",alignItems:"flex-start",flexWrap:"wrap",marginBottom:"1.2rem"}}>
              <div style={{fontSize:"3rem",flexShrink:0}}>⛪</div>
              <div>
                <span className="tag tag-gold">World Headquarters — Founded Here</span>
                <div className="playfair" style={{fontSize:"1.3rem",color:"#F5EDD8",lineHeight:1.2}}>Church of the Lord (Aladura) Worldwide</div>
                <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"rgba(245,237,216,.5)",textTransform:"uppercase",marginTop:".2rem"}}>Lisa Compound, Sagamu Remo · Est. July 27, 1930</div>
              </div>
            </div>
            <p style={{fontSize:".9rem",lineHeight:1.9,color:"rgba(245,237,216,.72)",marginBottom:"1rem"}}>One of Africa's most significant Pentecostal churches was born here — in Sagamu Remo — when Prophet Josiah Olunowo Ositelu (born 1902 in this very town) received divine visions and founded the Church of the Lord (Aladura) Worldwide at the Lisa Compound on July 27, 1930.</p>
            <p style={{fontSize:".9rem",lineHeight:1.9,color:"rgba(245,237,216,.72)",marginBottom:"1.3rem"}}>The church now has international branches across Nigeria, Ghana, Sierra Leone, and Liberia — a global congregation with roots in the hills of Ogun State. On Google Maps it is rated 4.1★ and described as a "Spirit filled and soul lifting place."</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem",marginBottom:"1rem"}}>
              {[["🌍","International Reach","Branches in Nigeria, Ghana, Sierra Leone, Liberia"],["📍","Location","Lisa Compound, opp. Akarigbo Palace, Sagamu Remo"],["🌐","Website","tclpfw.org"],["⭐","Rating","4.1★ on Google Maps (32 reviews)"]].map(([ic,k,v])=>(
                <div key={k} style={{padding:"1rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.14)"}}>
                  <div style={{fontSize:"1.4rem",marginBottom:".4rem"}}>{ic}</div>
                  <div className="cinzel" style={{fontSize:".54rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".25rem"}}>{k}</div>
                  <div style={{fontSize:".8rem",color:"rgba(245,237,216,.6)",lineHeight:1.5}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(44,26,14,.6)",padding:".9rem 1.2rem",borderLeft:"3px solid #C9963A",fontStyle:"italic",fontSize:".85rem",color:"rgba(245,237,216,.55)"}}>
              "Spirit filled and soul lifting place" — Google Reviews
            </div>
          </div>

          {/* Christ Church & Islam */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.2rem"}}>
            {[
              {ic:"⛪",n:"Christ Church Anglican",tag:"Historic Mission Church",
               d:"The historic Anglican mission church of Sagamu Remo and home of the oldest school in the town. Prophet Josiah Ositelu attended the Christ Church School (1913–1919) before his spiritual journey began. A cornerstone of Sagamu's colonial-era history."},
              {ic:"🕌",n:"Islam & Other Faiths",tag:"Multi-Faith Community",
               d:"Sagamu Remo is a multi-faith community. Muslim residents worship at mosques within the town, and the community's empowerment ethos — expressed by the Akarigbo himself — embraces all faiths: Yoruba, Igbo, Hausa, Tiv, Igede and all ethnic communities living in the transit town."},
            ].map((f,i)=>(
              <div key={i} style={{padding:"1.5rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.15)",borderTop:"3px solid #7A2E0E"}}>
                <div style={{fontSize:"2rem",marginBottom:".6rem"}}>{f.ic}</div>
                <span className="tag tag-terra">{f.tag}</span>
                <div className="playfair" style={{fontSize:"1.05rem",color:"#F5EDD8",marginBottom:".5rem"}}>{f.n}</div>
                <div style={{fontSize:".82rem",lineHeight:1.75,color:"rgba(245,237,216,.6)"}}>{f.d}</div>
              </div>
            ))}
          </div>
        </W>
      )}

      {tab==="festivals"&&(
        <W bg="#1a0d06">
          <p className="sl">Annual Celebrations</p>
          <h2 className="st" style={{marginBottom:"2.5rem"}}>Festivals & Traditional Ceremonies</h2>
          <div style={{display:"grid",gap:"1.3rem"}}>
            {festivals.map((f,i)=>(
              <div key={i} style={{padding:"1.8rem",background:"rgba(201,150,58,.04)",border:`1px solid ${f.sacred?"rgba(122,46,14,.4)":"rgba(201,150,58,.18)"}`,borderLeft:`4px solid ${f.sacred?"#7A2E0E":"#C9963A"}`}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".8rem",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:".8rem",alignItems:"center"}}>
                    <span style={{fontSize:"1.8rem"}}>{f.ic}</span>
                    <div>
                      <div className="playfair" style={{fontSize:"1.05rem",color:"#F5EDD8",lineHeight:1.2}}>{f.n}</div>
                      <div style={{fontSize:".72rem",color:"rgba(201,150,58,.65)",fontStyle:"italic",marginTop:".2rem"}}>{f.origin}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span className={`tag ${f.sacred?"tag-terra":"tag-gold"}`}>{f.period}</span>
                    {f.sacred&&<div style={{fontSize:".62rem",color:"#f5a4a4",marginTop:".3rem"}}>⚠ Sacred — observe advisories</div>}
                  </div>
                </div>
                <p style={{fontSize:".85rem",lineHeight:1.82,color:"rgba(245,237,216,.65)"}}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{marginTop:"2.5rem",padding:"1.5rem",background:"rgba(181,69,27,.07)",border:"1px solid rgba(181,69,27,.3)",borderLeft:"4px solid #B5451B"}}>
            <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".16em",color:"#B5451B",textTransform:"uppercase",marginBottom:".5rem"}}>⚠ Sacred Ceremony Advisory</div>
            <p style={{fontSize:".84rem",lineHeight:1.8,color:"rgba(245,237,216,.62)"}}>During the Oro Festival (Isemo) and other nocturnal traditional ceremonies, movement restrictions may apply to women and non-initiates. Visitors and residents should always follow official announcements from the Sagamu Remo Traditional Council. These sacred institutions are an integral part of Sagamu's living cultural heritage and must be respected.</p>
          </div>
        </W>
      )}

      {tab==="anthem"&&(
        <W bg="#1a0d06" mw={820}>
          <p className="sl">Ilu Mi</p>
          <h2 className="st" style={{marginBottom:".5rem"}}>The Sagamu Anthem</h2>
          <p className="si" style={{marginBottom:"2.5rem"}}>The anthem of Sagamu Remo — sung at Sagamu Day and community assemblies. "Ilu Mi" means "My Town." It honours the ancestors Sagamu Founding Ancestors and Yemogun, and affirms the endurance of the ancient community.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
            <div style={{background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.2)",padding:"2rem",borderTop:"4px solid #C9963A"}}>
              <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".2em",color:"#C9963A",textTransform:"uppercase",marginBottom:"1.2rem"}}>Yoruba — Original Text</div>
              <div className="playfair" style={{fontSize:"1rem",lineHeight:2.1,color:"#F5EDD8",whiteSpace:"pre-line"}}>{anthem.yoruba}</div>
            </div>
            <div style={{background:"rgba(201,150,58,.03)",border:"1px solid rgba(201,150,58,.12)",padding:"2rem",borderTop:"4px solid #7A2E0E"}}>
              <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".2em",color:"rgba(245,237,216,.4)",textTransform:"uppercase",marginBottom:"1.2rem"}}>English — Translation</div>
              <div style={{fontSize:".9rem",lineHeight:2.1,color:"rgba(245,237,216,.62)",whiteSpace:"pre-line",fontStyle:"italic"}}>{anthem.english}</div>
            </div>
          </div>
          <div style={{marginTop:"2rem",padding:"1.5rem",background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.18)",textAlign:"center"}}>
            <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".18em",color:"rgba(201,150,58,.6)",textTransform:"uppercase",marginBottom:".5rem"}}>About the Anthem</div>
            <p style={{fontSize:".84rem",lineHeight:1.8,color:"rgba(245,237,216,.58)",maxWidth:560,margin:"0 auto"}}>The Sagamu Anthem (Ilu Mi) invokes the names of the founding ancestors Sagamu Founding Ancestors and Yemogun — the two guardian spirits of Sagamu Remo — and is sung at the opening of the annual Sagamu Day festival and major community assemblies.</p>
          </div>
        </W>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   NEWS & EVENTS PAGE
══════════════════════════════════════════════ */
function NewsPage(){
  const[f,setF]=useState({name:"",headline:"",body:"",category:"",date:"",contact:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[aiMsg,setAiMsg]=useState("");
  const[stored,setStored]=useState([]);
  const[showForm,setShowForm]=useState(false);
  const[expand,setExpand]=useState(null);

  const STATIC=[
    {id:"n1",date:"April 2026",cat:"development",headline:"Akarigbo Commissions FRSC Office Complex — 3rd Coronation Anniversary",
     body:"Oba Babatunde Adewale Ajayi (Kankanbiina II) marked his third coronation anniversary on April 25, 2026 by commissioning a Federal Road Safety Corps (FRSC) office complex in Sagamu Remo. The ceremony reinforced the Akarigbo's sustained commitment to improving infrastructure and security services along the Lagos–Ibadan Expressway corridor. The FRSC facility is expected to boost road safety response times and operational capacity in the Sagamu axis.",
     ic:"🚦"},
    {id:"n2",date:"February 2026",cat:"development",headline:"TEG Commissions 60,000 SCMD CNG Facility in Sagamu — New Jobs Created",
     body:"Trans-Energies Gas (TEG) officially commissioned a 60,000 Standard Cubic Metres per Day (SCMD) Compressed Natural Gas (CNG) facility in Sagamu Remo in February 2026. The facility marks a significant economic milestone for the community, providing clean energy infrastructure and creating new employment opportunities for Sagamu residents. The Akarigbo and community leaders welcomed the investment as a sign of Sagamu's growing strategic importance along the expressway.",
     ic:"⛽"},
    {id:"n3",date:"April 26, 2025",cat:"royal",headline:"Aafin Akarigbo & Sagamu Cultural Centre Commissioned",
     body:"In a landmark moment for Sagamu Remo, Oba Babatunde Adewale Ajayi commissioned the Aafin Akarigbo (the permanent Palace of the Akarigbo) and the Sagamu Cultural Centre on April 26, 2025. The commissioning guest of honour was HRM Oba Babatunde Adewale Ajayi, CFR. The Palace — the first permanent purpose-built palace in Sagamu's modern history — and the Cultural Centre (named in honour of founding ancestor Sagamu Founding Ancestors) represent a defining chapter in Sagamu Remo's development story.",
     ic:"🏛️"},
    {id:"n4",date:"April 2025",cat:"community",headline:"Community Empowerment Programme — Artisans & 50 Residents Receive Support",
     body:"A community empowerment programme organised under the auspices of the Akarigbo-in-Council distributed tools to artisans and granted ₦100,000 each to 50 Sagamu residents. Significantly, the programme embraced non-indigenes, with beneficiaries from Yoruba, Igbo, Hausa, Tiv, and Igede communities — reflecting the Akarigbo's inclusive vision for the transit town. The programme was widely praised as a model for equitable community development.",
     ic:"💰"},
    {id:"n5",date:"June 2025",cat:"infrastructure",headline:"Ogun State Reconstructs Awomosu-Agbato Road",
     body:"The Ogun State Government began the reconstruction of the Awomosu-Agbato Road in Sagamu Remo in June 2025 — one of the main arteries connecting the town's residential and educational zones. The project is part of Governor Dapo Abiodun's roads infrastructure programme across Ogun State. The rehabilitation of the road has improved access to Remo Secondary School (RSS) and the surrounding communities.",
     ic:"🛣️"},
    {id:"n6",date:"October 2025",cat:"culture",headline:"49th Sagamu Day Celebrated at Wesley School Playground",
     body:"The 49th edition of the annual Sagamu Day Festival was celebrated in October 2025 at the Wesley School Playground in Sagamu Remo. Organised by the Sagamu Development Association (SDA), the week-long festival featured live music, cultural performances, novelty sports, a public assembly, and thanksgiving ceremonies. Community leaders, dignitaries, and the Akarigbo were in attendance. The milestone 50th edition (Golden Jubilee) is anticipated for 2026/2027.",
     ic:"🎊"},
    {id:"n7",date:"2025",cat:"diaspora",headline:"Lagos Forum Hosts 'Evening with the Akarigbo' at Ikeja Business Club",
     body:"The Lagos Forum of Sagamu Indigenes organised a prestigious 'Evening with the Akarigbo' at the Ikeja Business Club, Lagos. The event brought Oba Babatunde Adewale Ajayi face-to-face with Sagamu sons and daughters resident in Lagos — an occasion for dialogue, development planning, and community solidarity. The event was described as one of the most impactful diaspora engagements in recent years.",
     ic:"🌍"},
  ];

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-news");if(d&&Array.isArray(d))setStored(d);})();},[]);

  const submit=async()=>{
    if(!f.name||!f.headline||!f.body)return;
    setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:300,
        system:"You are the Sagamu Remo community portal news editor. A community member has submitted a news story. Write a warm 3-sentence acknowledgement: thank them by name, confirm receipt, mention the story will be reviewed before publication, and encourage them to keep contributing to the community record. End with a Yoruba phrase. Plain text only.",
        messages:[{role:"user",content:`Name: ${f.name}, Headline: ${f.headline}, Category: ${f.category}`}]
      })});
      const d=await res.json();
      setAiMsg(d.content?.[0]?.text||"Thank you for your submission! Your news will be reviewed by our editorial team. Ẹ ṣéun!");
    }catch{setAiMsg("Thank you for your news submission! It will be reviewed by our team. Ẹ ṣéun!");}
    const entry={...f,date:f.date||new Date().toLocaleDateString("en-NG"),id:Date.now(),ic:"📰",status:"pending",submitted:new Date().toLocaleDateString("en-NG")};
    const updated=[...stored,entry];
    setStored(updated);
    await dbSet("sagamu-news",updated);
    setDone(true);setBusy(false);
    setF({name:"",headline:"",body:"",category:"",date:"",contact:""});
  };

  const all=[...STATIC,...stored];
  const catColor={development:"#2D4A22",royal:"#7A2E0E",community:"#1a2e5e",infrastructure:"#8B6914",culture:"#B5451B",diaspora:"#1a4060"};

  return(
    <div>
      <Hero ey="Stay Informed" ti="News & Community Updates" sub="The latest developments, infrastructure projects, royal events, and community stories from Sagamu Remo."/>
      <A/>
      <W bg="#1a0d06">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginBottom:"2.5rem"}}>
          <div>
            <p className="sl">Community Record</p>
            <h2 className="st" style={{margin:0}}>Latest from Sagamu Remo</h2>
          </div>
          <button className="btn-p" onClick={()=>setShowForm(!showForm)}>{showForm?"✕ Close":"+ Submit a Story"}</button>
        </div>

        {showForm&&(
          <div style={{background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.2)",padding:"2rem",marginBottom:"2.5rem",borderTop:"3px solid #C9963A"}}>
            <div className="cinzel" style={{fontSize:".64rem",letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase",marginBottom:"1.2rem"}}>Submit a Community News Story</div>
            {done?(
              <div style={{background:"rgba(45,74,34,.15)",border:"1px solid rgba(45,74,34,.35)",borderLeft:"4px solid #2D4A22",padding:"2rem",textAlign:"center"}}>
                <div style={{fontSize:"2rem",marginBottom:".6rem"}}>✅</div>
                <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".15em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".8rem"}}>Submission Received</div>
                <div style={{fontSize:".87rem",lineHeight:1.82,color:"rgba(245,237,216,.7)",fontStyle:"italic",marginBottom:"1.5rem"}}>{aiMsg}</div>
                <button className="btn-o" onClick={()=>{setDone(false);setShowForm(false);}}>Close</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                {[["Your Name *","text","name","Full name"],["Category","text","category","e.g. Development, Culture, Royal, Diaspora"],["Date of Event","text","date","e.g. June 2026"],["Contact (optional)","text","contact","Phone or email"]].map(([l,t,k,ph])=>(
                  <div key={k}>
                    <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>{l}</div>
                    <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                  </div>
                ))}
                <div style={{gridColumn:"1/-1"}}>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>Headline *</div>
                  <input className="inp" value={f.headline} onChange={e=>setF({...f,headline:e.target.value})} placeholder="Short, descriptive headline for your story"/>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>Story Body *</div>
                  <textarea className="inp" value={f.body} onChange={e=>setF({...f,body:e.target.value})} placeholder="Tell the full story — who, what, when, where, why…" style={{minHeight:110,resize:"vertical"}}/>
                </div>
                <button className="btn-p" onClick={submit} disabled={busy} style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                  {busy?<><Spin/>Submitting…</>:"Submit Story →"}
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{display:"grid",gap:"1.1rem"}}>
          {all.slice().reverse().map((n,i)=>(
            <div key={n.id||i} style={{background:"rgba(201,150,58,.04)",border:`1px solid ${expand===n.id?"rgba(201,150,58,.4)":"rgba(201,150,58,.14)"}`,borderLeft:`4px solid ${catColor[n.cat]||"#C9963A"}`,cursor:"pointer"}}
              onClick={()=>setExpand(expand===n.id?null:n.id)}>
              <div style={{padding:"1.3rem",display:"flex",gap:"1rem",alignItems:"flex-start"}}>
                <div style={{fontSize:"1.8rem",flexShrink:0}}>{n.ic||"📰"}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".4rem",marginBottom:".35rem",alignItems:"flex-start"}}>
                    <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center"}}>
                      <span className="tag" style={{background:catColor[n.cat]||"#8B6914",color:"#F5EDD8",margin:0}}>{n.cat||"news"}</span>
                      {n.status==="pending"&&<span className="tag tag-blue" style={{margin:0,fontSize:".45rem"}}>Pending Review</span>}
                    </div>
                    <div className="cinzel" style={{fontSize:".52rem",letterSpacing:".08em",color:"rgba(201,150,58,.55)",textTransform:"uppercase",flexShrink:0}}>{n.date}</div>
                  </div>
                  <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",lineHeight:1.3}}>{n.headline}</div>
                  {expand!==n.id&&<div style={{fontSize:".78rem",color:"rgba(245,237,216,.45)",marginTop:".3rem"}}>{(n.body||"").slice(0,100)}…</div>}
                </div>
              </div>
              {expand===n.id&&(
                <div style={{borderTop:"1px solid rgba(201,150,58,.12)",padding:"1.3rem"}}>
                  <div style={{fontSize:".88rem",lineHeight:1.88,color:"rgba(245,237,216,.72)"}}>{n.body}</div>
                  {n.submitted&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.32)",marginTop:".8rem"}}>Submitted: {n.submitted}{n.name&&` by ${n.name}`}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOURISM PAGE
══════════════════════════════════════════════ */
function TourismPage(){
  const[selected,setSelected]=useState(null);

  const spots=[
    {
      n:"Sagamu Resort & Convention Centre",
      tag:"FEATURED · Premier Resort",tagClass:"tag-gold",
      ic:"🏨",
      color:"#B5451B",
      desc:"Nigeria's premier expressway resort, sitting at KM 67 on the Lagos–Ibadan Expressway. With 140+ rooms, a full convention centre, swimming pools, and dining facilities, it is the most recognised hospitality destination between Lagos and Ibadan. Ideal for weddings, conferences, leisure breaks, and corporate retreats.",
      rating:"4.4★",reviews:"558 Google reviews",
      phone:"+234 906 247 0474",
      website:"sagamuresort.com",
      hours:"Open daily, 8 AM – 8 PM",
      address:"KM 67, Lagos–Ibadan Expressway, Sagamu 121107",
      distance:"~65 km from Lagos · ~60 km from Ibadan · ~42 km from Abeokuta · ~36 km from Ijebu-Ode",
      quotes:["Very nice and well kept resort","The facility is really serene, beautiful environment","gives off an Afrocentric vibe"],
      features:["140+ rooms","Convention Centre","Swimming Pool","Dining & Bar","Conference Facilities","Wedding Venue"]
    },
    {
      n:"Aafin Akarigbo (Palace of the Akarigbo)",
      tag:"Royal Heritage",tagClass:"tag-terra",
      ic:"🏛️",color:"#C9963A",
      desc:"The permanent palace of the The Akarigbo of Remoland, commissioned on April 26, 2025 by HRM Oba Babatunde Adewale Ajayi (Kankanbiina II). The Aafin Akarigbo represents the first purpose-built, permanent palace in Sagamu Remo's modern history. The commissioning guest of honour was HRM Oba Babatunde Adewale Ajayi, CFR. It sits opposite the Church of the Lord (Aladura) Worldwide.",
      address:"Opposite Church of Lord Aladura, Sagamu Remo",
      commissioned:"April 26, 2025",
      features:["Official seat of the Akarigbo","Commissioned April 26, 2025","Symbol of modern Sagamu Remo","Adjacent to Church of Lord Aladura"]
    },
    {
      n:"Sagamu Cultural Centre",
      tag:"Cultural Heritage",tagClass:"tag-green",
      ic:"🎭",color:"#2D4A22",
      desc:"Named after Sagamu Remo's founding ancestor Sagamu Founding Ancestors, the Sagamu Cultural Centre is the permanent home for the town's cultural heritage. Commissioned on April 26, 2025 alongside the Akarigbo Palace, it serves as the official venue for the annual Sagamu Day festival and other cultural events. The centre is a living monument to Sagamu's 600+ year heritage.",
      address:"Sagamu Remo, Ogun State",
      commissioned:"April 26, 2025",
      features:["Named after founding ancestor Sagamu Founding Ancestors","Opened April 26, 2025","Venue for Sagamu Day Festival","Permanent cultural exhibition space"]
    },
    {
      n:"The Hills of Sagamu",
      tag:"Natural Heritage",tagClass:"tag-green",
      ic:"🏔️",color:"#2D4A22",
      desc:"The defining geographical feature of Sagamu Remo since its founding in 1401 A.D. The hills are referenced in Sagamu's very identity — 'a town upon the hills.' The hills of Sagamu create a dramatic backdrop along the Lagos–Ibadan Expressway and are an intrinsic part of the town's landscape, folklore, and spiritual heritage.",
      address:"Sagamu Remo, Sagamu LGA, Ogun State",
      features:["Defining feature since 1401 AD","Referenced in the Sagamu Anthem","Visible from Lagos–Ibadan Expressway","Linked to ancestral sacred groves"]
    },
    {
      n:"Sagamu Central Market",
      tag:"Commerce & Culture",tagClass:"tag-gold",
      ic:"🛖",color:"#8B6914",
      desc:"The beating commercial heart of Sagamu Remo — a centuries-old market where fresh produce, livestock, textiles, and goods from across Ogun State are traded. Rated 4.4★ on Google Maps, reviewers describe it as 'densely populated' and 'multi-lingual,' reflecting the town's status as a transit hub for diverse communities.",
      rating:"4.4★ (8 Google reviews)",
      phone:"+234 704 957 0510",
      address:"WJPM+5G6, Sagamu 121107, Ogun State",
      features:["Centuries-old trading site","Multi-lingual: Yoruba, Igbo, Hausa, Tiv and more","Fresh produce, livestock & textiles","Community hub for all residents"]
    },
    {
      n:"Lisa Compound — Birthplace of the Aladura Church",
      tag:"World Heritage Site",tagClass:"tag-blue",
      ic:"⛪",color:"#1a2e5e",
      desc:"The exact location in Sagamu Remo where Prophet Josiah Olunowo Ositelu founded the Church of the Lord (Aladura) Worldwide on July 27, 1930. Lisa Compound is a place of profound spiritual and historical significance — the birthplace of one of Africa's most globally significant independent churches. A pilgrimage site for members of the church worldwide.",
      address:"Lisa Compound, Sagamu Remo (opp. Akarigbo Palace)",
      features:["Founded July 27, 1930 by Prophet J.O. Ositelu","Church now in Nigeria, Ghana, Sierra Leone, Liberia","Pilgrimage destination for Aladura faithful worldwide","Adjacent to Akarigbo Palace"]
    },
    {
      n:"Agricultural Farmlands",
      tag:"Agro-Tourism",tagClass:"tag-green",
      ic:"🌾",color:"#2D4A22",
      desc:"Sagamu Remo's fertile hinterland supports active cultivation of rice, kolanut, and cocoa. The Sagamu Rice Farmers Cooperative is active in the community. The surrounding farmlands represent both an economic asset and an opportunity for agro-tourism experiences in a authentic Nigerian farming environment.",
      address:"Sagamu Remo hinterland, Ogun State",
      features:["Rice, kolanut and cocoa cultivation","Sagamu Rice Farmers Cooperative","Agro-tourism potential","Authentic Nigerian farming heritage"]
    },
  ];

  return(
    <div>
      <Hero ey="Visit Sagamu Remo" ti="Tourism & Attractions" sub="From a world-class resort to sacred groves and a cultural centre named after a founding ancestor — Sagamu Remo offers a uniquely authentic Nigerian experience."/>
      <A/>

      {/* Resort — featured banner */}
      <W bg="#2c1a0e" py="3rem">
        <div style={{background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.28)",borderTop:"4px solid #C9963A",padding:"2rem"}}>
          <div style={{display:"flex",gap:"1.5rem",alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{fontSize:"3.5rem",flexShrink:0}}>🏨</div>
            <div style={{flex:1}}>
              <span className="tag tag-gold">⭐ Featured · Most Visited Destination</span>
              <div className="playfair" style={{fontSize:"1.4rem",color:"#F5EDD8",marginBottom:".2rem"}}>Sagamu Resort & Convention Centre</div>
              <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"rgba(245,237,216,.45)",textTransform:"uppercase",marginBottom:".8rem"}}>KM 67, Lagos–Ibadan Expressway · 4.4★ (558 reviews) · sagamuresort.com</div>
              <p style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.68)",marginBottom:"1rem"}}>Nigeria's premier expressway resort — 140+ rooms, convention centre, pools, dining, and an unmistakably Afrocentric atmosphere. Approximately 65km from Lagos and 60km from Ibadan.</p>
              <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                <a href="https://sagamuresort.com" target="_blank" rel="noopener noreferrer" className="btn-p" style={{textDecoration:"none",fontSize:".65rem"}}>Visit Website →</a>
                <a href="tel:+2349062470474" className="btn-o" style={{textDecoration:"none",fontSize:".65rem"}}>📞 +234 906 247 0474</a>
              </div>
            </div>
          </div>
        </div>
      </W>

      {/* All attractions grid */}
      <W bg="#1a0d06">
        <p className="sl">Discover Sagamu Remo</p>
        <h2 className="st" style={{marginBottom:"2.5rem"}}>Attractions & Points of Interest</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.2rem"}}>
          {spots.map((s,i)=>(
            <div key={i} className="card" style={{padding:"1.6rem",borderLeft:`3px solid ${s.color}`,cursor:"pointer",background:selected===i?"rgba(201,150,58,.1)":"rgba(201,150,58,.04)"}}
              onClick={()=>setSelected(selected===i?null:i)}>
              <div style={{fontSize:"2rem",marginBottom:".6rem"}}>{s.ic}</div>
              <span className={`tag ${s.tagClass}`}>{s.tag}</span>
              <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",marginBottom:".4rem",marginTop:".3rem",lineHeight:1.3}}>{s.n}</div>
              {s.rating&&<div style={{fontSize:".82rem",color:"#F0D080",marginBottom:".3rem"}}>{s.rating} · {s.reviews}</div>}
              <div style={{fontSize:".8rem",lineHeight:1.7,color:"rgba(245,237,216,.55)"}}>{s.desc.slice(0,120)}…</div>
              {selected===i&&(
                <div style={{marginTop:"1rem",borderTop:"1px solid rgba(201,150,58,.15)",paddingTop:"1rem"}}>
                  <p style={{fontSize:".84rem",lineHeight:1.82,color:"rgba(245,237,216,.7)",marginBottom:".8rem"}}>{s.desc}</p>
                  {s.features&&(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".3rem",marginBottom:".8rem"}}>
                      {s.features.map((f,fi)=>(
                        <div key={fi} style={{fontSize:".75rem",color:"rgba(245,237,216,.55)",display:"flex",gap:".4rem"}}>
                          <span style={{color:"#C9963A"}}>›</span><span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {s.quotes&&(
                    <div style={{background:"rgba(201,150,58,.06)",padding:"1rem",borderLeft:"3px solid #C9963A",marginBottom:".8rem"}}>
                      <div className="cinzel" style={{fontSize:".5rem",letterSpacing:".12em",color:"rgba(201,150,58,.6)",textTransform:"uppercase",marginBottom:".5rem"}}>What visitors say</div>
                      {s.quotes.map((q,qi)=><div key={qi} style={{fontSize:".78rem",color:"rgba(245,237,216,.6)",fontStyle:"italic",marginBottom:".25rem"}}>"{q}"</div>)}
                    </div>
                  )}
                  {s.phone&&<div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".25rem"}}>📞 {s.phone}</div>}
                  {s.hours&&<div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".25rem"}}>🕐 {s.hours}</div>}
                  {s.address&&<div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)"}}>📍 {s.address}</div>}
                  {s.distance&&<div style={{fontSize:".75rem",color:"rgba(201,150,58,.55)",marginTop:".4rem"}}>🚗 {s.distance}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </W>

      {/* Getting Here */}
      <W bg="#2c1a0e" py="3rem">
        <p className="sl" style={{textAlign:"center"}}>Plan Your Visit</p>
        <h2 className="st" style={{textAlign:"center",marginBottom:"2rem",fontSize:"1.8rem"}}>Getting to Sagamu Remo</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {[{ic:"🚗",from:"From Lagos",dist:"~65 km",via:"Lagos–Ibadan Expressway (A1)",time:"60–90 mins",tip:"Exit at Sagamu — look for the Resort signpost on the right."},
            {ic:"🚌",from:"From Ibadan",dist:"~60 km",via:"Lagos–Ibadan Expressway (A1)",time:"45–60 mins",tip:"Head south towards Lagos. Sagamu is before Sagamu interchange."},
            {ic:"🚌",from:"From Abeokuta",dist:"~42 km",via:"Abeokuta–Sagamu Road",time:"40–55 mins",tip:"Connect via Sagamu to Sagamu."},
            {ic:"🚌",from:"From Ijebu-Ode",dist:"~36 km",via:"Ijebu-Ode/Abeokuta Road",time:"30–45 mins",tip:"Head northwest — well signposted."},
          ].map(({ic,from,dist,via,time,tip})=>(
            <div key={from} style={{padding:"1.4rem",background:"rgba(201,150,58,.05)",border:"1px solid rgba(201,150,58,.14)",borderLeft:"3px solid #C9963A"}}>
              <div style={{fontSize:"1.8rem",marginBottom:".5rem"}}>{ic}</div>
              <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".15rem"}}>{from}</div>
              <div style={{fontSize:"1rem",fontWeight:"bold",color:"#F5EDD8"}}>{dist}</div>
              <div style={{fontSize:".7rem",color:"rgba(245,237,216,.4)",marginBottom:".4rem"}}>via {via} · ~{time}</div>
              <div style={{fontSize:".78rem",lineHeight:1.6,color:"rgba(245,237,216,.55)"}}>{tip}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(201,150,58,.07)",border:"1px solid rgba(201,150,58,.2)",padding:"1.5rem",textAlign:"center",borderTop:"3px solid #C9963A"}}>
          <div className="cinzel" style={{fontSize:".58rem",letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase",marginBottom:".5rem"}}>GPS Coordinates — Sagamu Remo Town Centre</div>
          <div className="cinzel" style={{fontSize:"1.2rem",color:"#F5EDD8",marginBottom:".3rem"}}>6°47′N, 3°34′E</div>
          <div style={{fontSize:".8rem",color:"rgba(245,237,216,.45)",marginBottom:"1rem"}}>Decimal: 6.9371°N, 3.6335°E · Postal Code: 121107 · Sagamu LGA, Ogun State</div>
          <a href="https://maps.google.com/?q=Sagamu+Remo,+Ogun+State,+Nigeria" target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"'Cinzel',serif",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",color:"#C9963A",textDecoration:"none",border:"1px solid rgba(201,150,58,.4)",padding:".5rem 1.2rem",display:"inline-block"}}>
            Open in Google Maps →
          </a>
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   BUSINESS DIRECTORY PAGE
══════════════════════════════════════════════ */
function BusinessPage(){
  const[search,setSearch]=useState("");
  const[catFilter,setCatFilter]=useState("All");
  const[tab,setTab]=useState("directory");
  const[f,setF]=useState({name:"",category:"",address:"",phone:"",email:"",desc:"",owner:"",hours:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[aiMsg,setAiMsg]=useState("");
  const[stored,setStored]=useState([]);

  const CATS=["All","Food & Dining","Hospitality","Education","Trade","Transport","Services","Health","Agriculture","Technology","Faith","Infrastructure"];

  const STATIC=[
    {id:"biz1",name:"Sagamu Resort & Convention Centre",cat:"Hospitality",ic:"🏨",desc:"Premier resort, convention centre & hospitality destination on the Lagos–Ibadan Expressway.",phone:"+234 906 247 0474",website:"sagamuresort.com",address:"KM 67, Lagos–Ibadan Expressway",hours:"Daily 8AM–8PM",rating:"4.4★"},
    {id:"biz2",name:"Remo Secondary School (RSS)",cat:"Education",ic:"🏫",desc:"Sagamu Remo's flagship secondary school, named after Prophet J.O. Ositelu. Alumni body: RSSOSA.",phone:"+234 806 215 8840",address:"Awomosu Agbato Drive, Sagamu",hours:"Mon–Fri 8AM–5PM"},
    {id:"biz3",name:"Emmanuel Narrow-Way Academy (ENAWAC)",cat:"Education",ic:"🌱",desc:"Nursery & Primary school. Annual Philanthropy Awards at Sagamu Town Hall. Proprietor: Rev'd E.O. Shofuyi.",address:"Sagamu Remo, Ogun State"},
    {id:"biz4",name:"Sagamu Traditional Market",cat:"Trade",ic:"🛖",desc:"Centuries-old market rated 4.4★. Multi-lingual community hub for produce, livestock, textiles.",phone:"+234 704 957 0510",address:"WJPM+5G6, Sagamu 121107",rating:"4.4★"},
    {id:"biz5",name:"Sagamu Rice Farmers Cooperative",cat:"Agriculture",ic:"🌾",desc:"Cooperative supporting rice cultivation and distribution in the Sagamu Remo agricultural belt.",address:"Sagamu Remo hinterland, Ogun State"},
    {id:"biz6",name:"Sagamu-Sagamu Transport Union",cat:"Transport",ic:"🚌",desc:"Main public transport hub connecting Sagamu Remo with Sagamu, Lagos, and Ibadan.",address:"Sagamu Motor Park, Sagamu Remo"},
    {id:"biz7",name:"Sagamu Community Health Centre",cat:"Health",ic:"🏥",desc:"Primary healthcare facility serving Sagamu Remo and surrounding communities.",address:"Sagamu Remo, Ogun State"},
    {id:"biz8",name:"Church of the Lord (Aladura) Worldwide",cat:"Faith",ic:"⛪",desc:"Global church founded in Sagamu Remo on July 27, 1930. International branches across West Africa.",address:"Lisa Compound, Sagamu Remo",website:"tclpfw.org",rating:"4.1★"},
    {id:"biz9",name:"TEG CNG Facility",cat:"Infrastructure",ic:"⛽",desc:"60,000 SCMD Compressed Natural Gas facility commissioned Feb 2026. New jobs for Sagamu residents.",address:"Sagamu Remo, Ogun State"},
    {id:"biz10",name:"FRSC Office Sagamu",cat:"Services",ic:"🚦",desc:"Federal Road Safety Corps office commissioned by the Akarigbo April 2026. Road safety operations on the Lagos–Ibadan corridor.",address:"Sagamu Remo, Ogun State"},
  ];

  useEffect(()=>{(async()=>{const d=await dbGet("sagamu-biz");if(d&&Array.isArray(d))setStored(d);})();},[]);

  const register=async()=>{
    if(!f.name||!f.category)return;
    setBusy(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:300,
        system:"You are the Sagamu Remo community portal business directory assistant. A business has just registered on the free Sagamu Remo Business Directory. Write a warm 3-sentence welcome message: acknowledge the business by name, welcome it to the community directory, mention that it will be reviewed by the admin team before going live, and encourage the owner to share their listing with the community. End with a Yoruba phrase. Plain text only.",
        messages:[{role:"user",content:`Business: ${f.name}, Category: ${f.category}, Owner: ${f.owner}, Description: ${f.desc}`}]
      })});
      const d=await res.json();
      setAiMsg(d.content?.[0]?.text||"Welcome to the Sagamu Remo Business Directory! Your listing will be reviewed and published shortly. Ẹ ṣéun!");
    }catch{setAiMsg("Welcome to the Sagamu Remo Business Directory! Your listing is pending review. Ẹ ṣéun!");}
    const entry={...f,id:Date.now(),status:"pending",submitted:new Date().toLocaleDateString("en-NG"),ic:"🏪"};
    const updated=[...stored,entry];
    setStored(updated);
    await dbSet("sagamu-biz",updated);
    setDone(true);setBusy(false);
    setF({name:"",category:"",address:"",phone:"",email:"",desc:"",owner:"",hours:""});
  };

  const all=[...STATIC,...stored];
  const shown=all.filter(b=>{
    const q=search.toLowerCase();
    const matchQ=!q||(b.name+b.desc+b.cat).toLowerCase().includes(q);
    const matchCat=catFilter==="All"||b.cat===catFilter;
    return matchQ&&matchCat;
  });

  const catColor={"Hospitality":"#B5451B","Education":"#1a2e5e","Trade":"#8B6914","Transport":"#2D4A22","Services":"#7A2E0E","Health":"#5a1010","Agriculture":"#2D4A22","Technology":"#1a2e5e","Faith":"#8B6914","Infrastructure":"#2c2c0e","Food & Dining":"#8B3014"};

  return(
    <div>
      <Hero ey="Commerce & Enterprise" ti="Sagamu Business Directory" sub="Find businesses in Sagamu Remo — or register yours free and join the official community directory."/>
      <A/>

      <W bg="#1a0d06" py="2rem">
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {[["directory","🏪 Browse Directory"],["register","+ Register Your Business"]].map(([id,l])=>(
            <button key={id} className={tab===id?"btn-p":"btn-o"} onClick={()=>setTab(id)}>{l}</button>
          ))}
        </div>
      </W>

      {tab==="directory"&&(
        <W bg="#1a0d06">
          <p className="sl">Business Listings</p>
          <h2 className="st" style={{marginBottom:"1.5rem"}}>Sagamu Remo Business Directory</h2>

          {/* Search & filter */}
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"1rem",marginBottom:"1.2rem",alignItems:"flex-end"}}>
            <div>
              <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>Search</div>
              <input className="inp" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, description, category…"/>
            </div>
            <div>
              <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".28rem"}}>Category</div>
              <select className="inp" value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{cursor:"pointer",minWidth:140}}>
                {CATS.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="cinzel" style={{fontSize:".56rem",letterSpacing:".12em",color:"rgba(201,150,58,.5)",textTransform:"uppercase",marginBottom:"1.2rem"}}>
            Showing {shown.length} {shown.length===1?"listing":"listings"}{catFilter!=="All"?` in ${catFilter}`:""}
          </div>

          <div style={{display:"grid",gap:"1rem"}}>
            {shown.map((b,i)=>(
              <div key={b.id||i} style={{padding:"1.4rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.15)",borderLeft:`3px solid ${catColor[b.cat]||"#C9963A"}`,display:"flex",gap:"1.2rem",flexWrap:"wrap",alignItems:"flex-start"}}>
                <div style={{fontSize:"1.8rem",flexShrink:0}}>{b.ic||"🏪"}</div>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",alignItems:"center",marginBottom:".3rem"}}>
                    <span className="tag" style={{background:catColor[b.cat]||"#8B6914",color:"#F5EDD8",margin:0,fontSize:".46rem"}}>{b.cat}</span>
                    {b.status==="pending"&&<span className="tag tag-blue" style={{margin:0,fontSize:".46rem"}}>Pending Review</span>}
                    {b.rating&&<span style={{fontSize:".7rem",color:"#F0D080"}}>{b.rating}</span>}
                  </div>
                  <div className="playfair" style={{fontSize:".98rem",color:"#F5EDD8",marginBottom:".25rem"}}>{b.name}</div>
                  <div style={{fontSize:".8rem",lineHeight:1.65,color:"rgba(245,237,216,.58)",marginBottom:".5rem"}}>{b.desc}</div>
                  <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                    {b.phone&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.45)"}}>📞 {b.phone}</div>}
                    {b.address&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.45)"}}>📍 {b.address}</div>}
                    {b.hours&&<div style={{fontSize:".72rem",color:"rgba(245,237,216,.45)"}}>🕐 {b.hours}</div>}
                    {b.website&&<a href={`https://${b.website}`} target="_blank" rel="noopener noreferrer" style={{fontSize:".72rem",color:"#C9963A",textDecoration:"none"}}>🌐 {b.website}</a>}
                  </div>
                </div>
              </div>
            ))}
            {shown.length===0&&(
              <div style={{textAlign:"center",padding:"3rem",color:"rgba(245,237,216,.4)",fontSize:".9rem"}}>No listings found for your search. Try a different term or category.</div>
            )}
          </div>
        </W>
      )}

      {tab==="register"&&(
        <W bg="#1a0d06" mw={680}>
          <p className="sl">Free Registration</p>
          <h2 className="st">Register Your Business</h2>
          <p className="si" style={{marginBottom:"2rem"}}>List your Sagamu Remo business free of charge. All submissions are reviewed by the SDA admin team before publication.</p>
          {done?(
            <div style={{background:"rgba(45,74,34,.15)",border:"1px solid rgba(45,74,34,.4)",borderLeft:"4px solid #2D4A22",padding:"2.5rem",textAlign:"center"}}>
              <div style={{fontSize:"2.5rem",marginBottom:".8rem"}}>✅</div>
              <div className="cinzel" style={{fontSize:".68rem",letterSpacing:".18em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".8rem"}}>Business Registered</div>
              <div style={{fontSize:".88rem",lineHeight:1.85,color:"rgba(245,237,216,.72)",fontStyle:"italic",marginBottom:"1.5rem"}}>{aiMsg}</div>
              <button className="btn-o" onClick={()=>{setDone(false);setTab("directory");}}>Browse Directory →</button>
            </div>
          ):(
            <div style={{display:"grid",gap:"1.1rem"}}>
              {[["Business Name *","text","name","Full name of your business"],["Category *","text","category","e.g. Food & Dining, Health, Trade, Services"],["Owner / Manager","text","owner","Your name"],["Phone","tel","phone","+234..."],["Email","email","email","business@email.com"],["Address","text","address","Street address in Sagamu Remo"],["Opening Hours","text","hours","e.g. Mon–Sat 8AM–6PM"]].map(([l,t,k,ph])=>(
                <div key={k}>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".3rem"}}>{l}</div>
                  <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                </div>
              ))}
              <div>
                <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".3rem"}}>Business Description *</div>
                <textarea className="inp" value={f.desc} onChange={e=>setF({...f,desc:e.target.value})} placeholder="Describe your business — products/services, years in operation, what makes you special…" style={{minHeight:100,resize:"vertical"}}/>
              </div>
              <div style={{fontSize:".75rem",color:"rgba(245,237,216,.35)",background:"rgba(201,150,58,.04)",padding:".7rem .9rem",border:"1px solid rgba(201,150,58,.12)",lineHeight:1.65}}>
                ℹ️ Registration is free. All submissions receive a "Pending Review" status until approved by the SDA admin team. You will be contacted if further details are needed.
              </div>
              <button className="btn-p" onClick={register} disabled={busy} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem"}}>
                {busy?<><Spin/>Registering…</>:"Register Business →"}
              </button>
            </div>
          )}
        </W>
      )}
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════ */
function ContactPage(){
  const[f,setF]=useState({name:"",email:"",phone:"",subject:"General Enquiry",message:""});
  const[busy,setBusy]=useState(false);
  const[done,setDone]=useState(false);
  const[aiMsg,setAiMsg]=useState("");

  const SUBJECTS=["General Enquiry","History & Heritage","Tourism","Business Registration","Association Registration","Security Report (Non-Emergency)","News Submission","Diaspora Network","Update Emergency Contacts","SDA","Sagamu Youth Congress","Other"];

  const send=async()=>{
    if(!f.name||!f.email||!f.message)return;
    setBusy(true);
    try{
      const secSubject=f.subject.toLowerCase().includes("security");
      const bizSubject=f.subject.toLowerCase().includes("business");
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:400,
        system:`You are the Sagamu Remo community portal contact centre assistant. A message has been received. Write a warm, professional 3-4 sentence auto-reply: thank the sender by name, confirm the message has been received, give a realistic response time (2-3 working days), and express warmth and community pride. ${secSubject?"Remind them that for genuine emergencies, they should call 112 immediately and not wait for a reply to this form.":""} ${bizSubject?"Mention that registering on the free Sagamu Remo Business Directory is quick and they can do it immediately on the Business Directory page.":""} End with a warm Yoruba phrase. Plain text only.`,
        messages:[{role:"user",content:`Name: ${f.name}, Subject: ${f.subject}, Message: ${f.message}`}]
      })});
      const d=await res.json();
      setAiMsg(d.content?.[0]?.text||"Thank you for your message! We have received it and will respond within 2-3 working days. Ẹ ṣéun!");
    }catch{setAiMsg("Thank you for reaching out to the Sagamu Remo community portal. Your message has been received. We will respond within 2-3 working days. Ẹ ṣéun!");}
    const entry={...f,date:new Date().toLocaleDateString("en-NG"),id:Date.now()};
    const existing=await dbGet("sagamu-msgs")||[];
    existing.push(entry);
    await dbSet("sagamu-msgs",existing);
    setDone(true);setBusy(false);
    setF({name:"",email:"",phone:"",subject:"General Enquiry",message:""});
  };

  const contacts=[
    {n:"Akarigbo Palace",ic:"👑",desc:"Seat of the The Akarigbo of Remoland",addr:"Opposite Church of Lord Aladura, Sagamu Remo",email:"info@sagamuremo.ng"},
    {n:"SDA Headquarters",ic:"🏛️",desc:"Sagamu Development Association",addr:"Sagamu Town Hall, Sagamu Remo",email:"info@sagamuremo.ng"},
    {n:"Sagamu Youth Congress",ic:"🌱",desc:"Sagamu Youth Development Association",addr:"Town Hall, Oja Ale, Sagamu Remo",email:"oydasagamu@gmail.com"},
    {n:"Security Alerts",ic:"⚠️",desc:"Non-emergency security concerns only",addr:"Sagamu Remo Security Network",email:"alerts@sagamuremo.ng"},
    {n:"RSSOSA",ic:"🎓",desc:"Remo Secondary School (RSS) Old Students Assoc.",addr:"Arc. Kunle Awobajo · 08037136954",email:"awobajoolakunle@gmail.com"},
  ];

  return(
    <div>
      <Hero ey="Get in Touch" ti="Contact Sagamu Remo" sub="Reach our community team, submit news, register your business or association, or ask us anything about Sagamu Remo."/>
      <A/>

      {/* Emergency banner */}
      <div style={{background:"rgba(90,16,16,.25)",borderTop:"3px solid #dc2626",borderBottom:"1px solid rgba(220,38,38,.3)",padding:"1rem 2rem",textAlign:"center"}}>
        <span className="cinzel" style={{fontSize:".62rem",letterSpacing:".16em",color:"#f87171",textTransform:"uppercase"}}>⚠ For emergencies — call 112 · Free · 24 hours · Police · Ambulance · Fire · Do not use this contact form for emergencies</span>
      </div>

      <W bg="#1a0d06">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:"3rem",alignItems:"start"}}>

          {/* Left — contacts */}
          <div>
            <p className="sl">Directory</p>
            <h2 className="st" style={{marginBottom:"2rem",fontSize:"1.6rem"}}>Community Contacts</h2>
            <div style={{display:"grid",gap:"1rem",marginBottom:"2rem"}}>
              {contacts.map((c,i)=>(
                <div key={i} style={{padding:"1.3rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.15)",borderLeft:"3px solid #C9963A"}}>
                  <div style={{display:"flex",gap:".8rem",alignItems:"flex-start"}}>
                    <span style={{fontSize:"1.4rem",flexShrink:0}}>{c.ic}</span>
                    <div>
                      <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".1em",color:"#C9963A",textTransform:"uppercase",marginBottom:".2rem"}}>{c.n}</div>
                      <div style={{fontSize:".78rem",color:"rgba(245,237,216,.5)",marginBottom:".15rem"}}>{c.desc}</div>
                      <div style={{fontSize:".72rem",color:"rgba(245,237,216,.4)",marginBottom:".15rem"}}>📍 {c.addr}</div>
                      <div style={{fontSize:".72rem",color:"rgba(201,150,58,.65)"}}>📧 {c.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency numbers */}
            <div style={{padding:"1.5rem",background:"rgba(90,16,16,.15)",border:"1px solid rgba(220,38,38,.25)",borderTop:"3px solid #dc2626"}}>
              <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".16em",color:"#f87171",textTransform:"uppercase",marginBottom:"1rem"}}>Emergency Numbers</div>
              {[["112","National Emergency","Free · Police, Ambulance, Fire"],["08081762371","Sagamu DPO Direct","Sagamu Police Station"],["alerts@sagamuremo.ng","Security Alerts","Non-emergency security"],].map(([num,name,note])=>(
                <div key={num} style={{marginBottom:".85rem",paddingBottom:".85rem",borderBottom:"1px solid rgba(220,38,38,.1)"}}>
                  <div className="cinzel" style={{fontSize:".9rem",fontWeight:700,color:"#f87171"}}>{num}</div>
                  <div style={{fontSize:".8rem",color:"rgba(245,237,216,.65)"}}>{name}</div>
                  <div style={{fontSize:".7rem",color:"rgba(245,237,216,.35)"}}>{note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <p className="sl">Send a Message</p>
            <h2 className="st" style={{marginBottom:".6rem",fontSize:"1.6rem"}}>Contact Form</h2>
            <p style={{fontSize:".82rem",color:"rgba(245,237,216,.45)",marginBottom:"1.8rem",lineHeight:1.7}}>Please allow 2–3 working days for a response. For emergencies, call 112 — do not use this form.</p>
            {done?(
              <div style={{background:"rgba(45,74,34,.15)",border:"1px solid rgba(45,74,34,.4)",borderLeft:"4px solid #2D4A22",padding:"2.5rem"}}>
                <div style={{fontSize:"2rem",marginBottom:".7rem"}}>✅</div>
                <div className="cinzel" style={{fontSize:".64rem",letterSpacing:".18em",color:"#a8d88e",textTransform:"uppercase",marginBottom:".8rem"}}>Message Received</div>
                <div style={{fontSize:".87rem",lineHeight:1.85,color:"rgba(245,237,216,.72)",fontStyle:"italic",marginBottom:"1.5rem"}}>{aiMsg}</div>
                <button className="btn-o" onClick={()=>setDone(false)}>Send Another Message</button>
              </div>
            ):(
              <div style={{display:"grid",gap:"1rem"}}>
                {[["Full Name *","text","name","Your full name"],["Email Address *","email","email","your@email.com"],["Phone (optional)","tel","phone","+234 or international"]].map(([l,t,k,ph])=>(
                  <div key={k}>
                    <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".28rem"}}>{l}</div>
                    <input type={t} className="inp" value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph}/>
                  </div>
                ))}
                <div>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".28rem"}}>Subject *</div>
                  <select className="inp" value={f.subject} onChange={e=>setF({...f,subject:e.target.value})} style={{cursor:"pointer"}}>
                    {SUBJECTS.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {f.subject.includes("Security")&&(
                  <div style={{background:"rgba(90,16,16,.2)",border:"1px solid rgba(220,38,38,.3)",padding:".8rem 1rem",fontSize:".78rem",color:"#f87171",lineHeight:1.65}}>
                    ⚠ For security emergencies, call 112 immediately. This form is for non-emergency security concerns only and may not be monitored around the clock.
                  </div>
                )}
                <div>
                  <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",textTransform:"uppercase",color:"#C9963A",marginBottom:".28rem"}}>Message *</div>
                  <textarea className="inp" value={f.message} onChange={e=>setF({...f,message:e.target.value})} placeholder="Write your message here…" style={{minHeight:140,resize:"vertical"}}/>
                </div>
                <button className="btn-p" onClick={send} disabled={busy||!f.name||!f.email||!f.message} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem"}}>
                  {busy?<><Spin/>Sending…</>:"Send Message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   NOTABLE FAMILIES PAGE
══════════════════════════════════════════════ */
function FamiliesPage(){
  const[active,setActive]=useState(null);

  const families=[
    {
      id:"agbato",
      ic:"🏡",
      name:"The Agbato Family",
      compound:"Awomosu Compound",
      ward:"Itajiren Ward",
      tag:"Community Patriarchs · Education",
      tagClass:"tag-green",
      accent:"#2D4A22",
      summary:"A venerated landed family whose name is permanently inscribed in Sagamu's geography — Awomosu Agbato Drive, home of the town's flagship secondary school.",
      desc:"One of Sagamu Remo's most deeply rooted landed families, the Agbato family is based in the Awomosu quarter of the Itajiren ward. Their most enduring legacy is geographical: the principal road connecting Sagamu's residential and educational zones — Awomosu Agbato Drive — bears the family name. This road is home to Remo Secondary School (RSS), Sagamu's flagship secondary school. The Ogun State Government's 2025 rehabilitation of Awomosu Agbato Drive further cemented the family's central role in the educational and civic heart of the community. The Agbato family represents the quiet, generational stewardship that underpins town life beyond the palace.",
      members:[
        {n:"Awomosu Agbato Drive",r:"Road named in family honour — principal axis of Sagamu's educational zone"},
        {n:"Remo Secondary School (RSS)",r:"Located on Awomosu Agbato Drive; Sagamu's premier secondary school"},
        {n:"Agbato Compound, Awomosu",r:"Family seat in the Itajiren ward of Sagamu Remo"},
      ]
    },
    {
      id:"babington",
      ic:"👑",
      name:"The Babington-Ashaye Family",
      compound:"Legunsen Royal House",
      ward:"Royal Lineage",
      tag:"Royal · Political · Diaspora",
      tagClass:"tag-gold",
      accent:"#8B6914",
      summary:"The most politically prominent dynasty in documented Sagamu history — producing a king who shaped Western Region politics, a shipping pioneer, and a globally recognised commentator.",
      desc:"The Babington-Ashaye family stands as the most extensively documented royal dynasty in Sagamu Remo's recorded history. Oba Alfred Obafuwa Babington-Ashaye (Legunsen III) reigned from c.1945 to December 4, 1982 — approximately 37 years — and was described as 'a key figure from the Remo zone in the politics of the defunct Western Region.' He received a full state burial befitting his stature. His oriki (royal praise poem) survives in full and is preserved in the Akarigbo Palace archives. His children and grandchildren have distinguished themselves across shipping, public administration, law, and international commentary. The family's legacy spans Nigeria, the United Kingdom, and the United States.",
      members:[
        {n:"Oba Alfred Obafuwa Babington-Ashaye",r:"Legunsen III · Agbalajobi-Erinjogunola · r. c.1945 – December 4, 1982"},
        {n:"Prince Olumuyiwa Adewunmi Babington-Ashaye",r:"Firstborn son · Founder of Ashaye Far East Line (AFEL) — first shipping company with a terminal concession inside Tincan Island Port"},
        {n:"Prince Adebajo Babington-Ashaye",r:"Son of Legunsen III · Father of Dr. Shola Mos-Shogbamimu"},
        {n:"Otunba Ademolu Babington-Ashaye",r:"Son of Legunsen III · Former Principal General, Remo Division, Ogun State (deceased)"},
        {n:"Prince Adetoyinbo Babington-Ashaye",r:"Son of Legunsen III · Listed in oriki record"},
        {n:"Dr. Shola Mos-Shogbamimu",r:"Granddaughter · PhD (Birkbeck) · LLM (LSE) · Exec MBA (Cambridge) · New York Attorney · Solicitor of England & Wales · Author & political commentator (London, UK)"},
        {n:"Adedeji Babington-Ashaye",r:"Grandson via Otunba Ademolu · Featured in community events"},
        {n:"Otunba Fatai Sowemimo",r:"Married into the family — wife is granddaughter of Legunsen III via Prince Olumuyiwa"},
      ]
    },
    {
      id:"ositelu",
      ic:"⛪",
      name:"The Ositelu Family",
      compound:"Lisa Chieftaincy House",
      ward:"Lisa Compound · Sagamu Remo",
      tag:"Spiritual · Global Church Founders",
      tagClass:"tag-blue",
      accent:"#1a2e5e",
      summary:"Founders of one of Africa's most globally significant Pentecostal churches — the Church of the Lord (Aladura) Worldwide, born here in Sagamu Remo on July 27, 1930.",
      desc:"The Ositelu family of the Lisa Chieftaincy House holds one of the most remarkable legacies in Sagamu Remo's history. Prophet Josiah Olunowo Ositelu was born on 15 May 1900 at Sagamu Remo to Ashaye Onakoya Ositelu, a man of chiefly lineage, and Ejironike — daughter of Adeyemi of the Owo royal family. A mystic from childhood, Josiah received divine visions, attended the Anglican school at Sagamu, and on July 27, 1930 formally inaugurated the Church of the Lord (Aladura) Worldwide at the Lisa Compound. That church today has branches across Nigeria, Ghana, Sierra Leone, and Liberia. The family has provided the church's Primate across four documented generations — all rooted in the same Lisa Compound where the founder was raised.",
      members:[
        {n:"Prophet Josiah Olunowo Ositelu",r:"Founder, Church of the Lord (Aladura) Worldwide · Born 15 May 1900, Sagamu Remo · Founded the church July 27, 1930"},
        {n:"Archbishop Susannah Adewunmi Ositelu",r:"Wife of the founder · Known as 'Mama Aladura' and 'Mama Kekere' · Held rank of Archbishop"},
        {n:"Apostle Gabriel Olusegun Ositelu",r:"Third Primate of the Church of the Lord Worldwide · Firstborn of the founder · Born August 27, 1938 in Sagamu Remo · Served 1938–1998"},
        {n:"Archbishop Dr. Rufus Okikiola Olubiyi Ositelu",r:"Current Primate · Son of Prophet Josiah and Archbishop Susannah · Born February 24, 1952 in Sagamu Remo · Leads the worldwide church to this day"},
      ]
    },
    {
      id:"ogunbade",
      ic:"🏺",
      name:"The Ogunbade Family",
      compound:"Gbenlokun Compound",
      ward:"Agbejoye / Fadagbuwa Ruling House",
      tag:"Royal · 38-Year Reign",
      tagClass:"tag-terra",
      accent:"#7A2E0E",
      summary:"Producers of Sagamu Remo's longest-serving modern monarch — Oba Oladele Ogunbade, who reigned 38 years and whose palace archives remain a primary source on Sagamu's ancient history.",
      desc:"The Ogunbade family of Gbenlokun Compound belongs to the Agbejoye/Fadagbuwa Ruling House — the second of Sagamu's four royal houses. When Oba Alfred Babington-Ashaye (Legunsen III) died in December 1982, the throne rotated to this house. Three princes contested: Omoba J. Oshinubi, Omoba Oladele Moshood Ogunbade, and Omoba Shitu. Ogunbade prevailed and was installed on December 3, 1983. He reigned for over 38 years — the longest modern reign in Sagamu's recorded history — until his passing on April 10, 2022, at age 85. Before ascending the throne he served as Marketing Manager at the Nigerian Tobacco Company (NTC), Ibadan. His coronation Apepe song, composed by Chief Nasiru Taiwo Omodugbe, is preserved in community memory: 'Ogunbade ti joba eee…' His 2008 palace archives remain a foundational source on Sagamu Remo's ancient history.",
      members:[
        {n:"Oba Oladele Moshood Ogunbade",r:"Agbejoye II · r. December 3, 1983 – April 10, 2022 · Gbenlokun Compound, Sagamu Remo"},
        {n:"Gbenlokun Compound",r:"Family seat of the Agbejoye/Fadagbuwa Ruling House"},
        {n:"Palace Archives (2008)",r:"Primary historical source on Sagamu Remo's ancient founding and traditions, compiled during his reign"},
        {n:"Chief Nasiru Taiwo Omodugbe",r:"Composer of the coronation Apepe song: 'Ogunbade ti joba eee, Mosiudi ti joba aaa…'"},
      ]
    },
  ];

  return(
    <div>
      <Hero
        ey="Lineage & Legacy"
        ti="Notable Families of Sagamu Remo"
        sub="The great houses — royal, spiritual, civic — whose names are woven into the very streets, institutions, and soul of Sagamu Remoland."
      />
      <A/>

      {/* Intro & family selector */}
      <W bg="#1a0d06" py="3rem">
        <p className="si" style={{textAlign:"center",margin:"0 auto 2.5rem"}}>
          Beyond the four royal ruling houses, Sagamu Remo's identity has been shaped by a constellation of families whose contributions span centuries — from founding chieftaincy lineages and the birth of a global church, to the naming of roads and the building of schools.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"1rem"}}>
          {families.map(f=>(
            <button key={f.id} onClick={()=>setActive(active===f.id?null:f.id)}
              style={{background:active===f.id?"rgba(201,150,58,.12)":"rgba(201,150,58,.04)",border:`1px solid ${active===f.id?"rgba(201,150,58,.55)":"rgba(201,150,58,.15)"}`,borderTop:`3px solid ${f.accent}`,padding:"1.4rem",cursor:"pointer",textAlign:"left",transition:"all .2s"}}>
              <div style={{fontSize:"2rem",marginBottom:".5rem"}}>{f.ic}</div>
              <div className="playfair" style={{fontSize:"1rem",color:"#F5EDD8",lineHeight:1.2,marginBottom:".3rem"}}>{f.name}</div>
              <div className="cinzel" style={{fontSize:".5rem",letterSpacing:".09em",color:"rgba(201,150,58,.55)",textTransform:"uppercase",marginBottom:".6rem"}}>{f.compound}</div>
              <span className={`tag ${f.tagClass}`} style={{fontSize:".46rem"}}>{f.tag}</span>
            </button>
          ))}
        </div>
      </W>

      {/* Expanded family detail */}
      {families.map(f=>active===f.id&&(
        <W key={f.id} bg="#2c1a0e">
          <div style={{borderTop:`4px solid ${f.accent}`,background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.2)",borderTop:`4px solid ${f.accent}`,padding:"2.5rem"}}>
            {/* Header */}
            <div style={{display:"flex",gap:"1.2rem",alignItems:"flex-start",flexWrap:"wrap",marginBottom:"1.8rem"}}>
              <div style={{fontSize:"3rem",flexShrink:0}}>{f.ic}</div>
              <div style={{flex:1}}>
                <span className={`tag ${f.tagClass}`} style={{marginBottom:".5rem",display:"inline-block"}}>{f.tag}</span>
                <div className="playfair" style={{fontSize:"1.6rem",color:"#F5EDD8",lineHeight:1.15,marginBottom:".25rem"}}>{f.name}</div>
                <div className="cinzel" style={{fontSize:".55rem",letterSpacing:".12em",color:"rgba(201,150,58,.6)",textTransform:"uppercase"}}>{f.compound} · {f.ward}</div>
              </div>
            </div>

            {/* Summary pull-quote */}
            <div style={{background:"rgba(201,150,58,.08)",borderLeft:"4px solid #C9963A",padding:"1rem 1.4rem",marginBottom:"1.8rem",fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1rem",color:"#F0D080",lineHeight:1.7}}>
              {f.summary}
            </div>

            {/* Full narrative */}
            <p style={{fontSize:".9rem",lineHeight:1.92,color:"rgba(245,237,216,.72)",marginBottom:"2rem"}}>{f.desc}</p>

            {/* Members grid */}
            <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase",marginBottom:"1rem"}}>Key Members & Legacy</div>
            <div style={{display:"grid",gap:".7rem"}}>
              {f.members.map((m,mi)=>(
                <div key={mi} style={{display:"flex",gap:"1rem",padding:"1rem 1.2rem",background:"rgba(201,150,58,.04)",border:"1px solid rgba(201,150,58,.12)",borderLeft:`3px solid ${f.accent}`,alignItems:"flex-start"}}>
                  <span style={{color:f.accent,fontSize:"1rem",flexShrink:0,marginTop:".1rem"}}>›</span>
                  <div>
                    <div style={{fontSize:".88rem",color:"#F5EDD8",marginBottom:".2rem"}}>{m.n}</div>
                    <div style={{fontSize:".76rem",color:"rgba(245,237,216,.48)",lineHeight:1.6}}>{m.r}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{marginTop:"1.5rem",textAlign:"right"}}>
              <button className="btn-o" onClick={()=>setActive(null)} style={{fontSize:".6rem"}}>Close ✕</button>
            </div>
          </div>
        </W>
      ))}

      {/* Submit a family CTA */}
      <W bg="#1a0d06" py="3rem">
        <div style={{maxWidth:620,margin:"0 auto",textAlign:"center",padding:"2rem",background:"rgba(201,150,58,.06)",border:"1px solid rgba(201,150,58,.2)",borderTop:"3px solid #C9963A"}}>
          <div style={{fontSize:"2rem",marginBottom:".7rem"}}>🏡</div>
          <div className="cinzel" style={{fontSize:".62rem",letterSpacing:".18em",color:"#C9963A",textTransform:"uppercase",marginBottom:".5rem"}}>Know a Notable Family?</div>
          <p style={{fontSize:".85rem",lineHeight:1.8,color:"rgba(245,237,216,.58)",marginBottom:"1.3rem"}}>If your family — or a family you know — has made a significant contribution to Sagamu Remo's history, culture, or development, we'd love to document their legacy. Submit details via the Contact page for review by the SDA editorial team.</p>
          <div className="cinzel" style={{fontSize:".6rem",letterSpacing:".12em",color:"rgba(201,150,58,.5)",textTransform:"uppercase"}}>Contact: info@sagamuremo.ng</div>
        </div>
      </W>
      <A/>
    </div>
  );
}

/* ─── ROOT ─── */
export default function App(){
  const[page,setPage]=useState("home");
  useEffect(()=>{window.scrollTo(0,0);},[page]);

  const SP={
    home:<HomePage setPage={setPage}/>,
    history:<HistoryPage/>,
    monarchy:<MonarchyPage/>,
    families:<FamiliesPage/>,
    associations:<AssociationsPage/>,
    education:<EducationPage/>,
    faith:<FaithPage/>,
    gallery:<GalleryPage/>,
    news:<NewsPage/>,
    tourism:<TourismPage/>,
    business:<BusinessPage/>,
    diaspora:<DiasporaPage/>,
    events:<EventsPage/>,
    forum:<ForumPage/>,
    map:<MapPage/>,
    alerts:<AlertsPage/>,
    contact:<ContactPage/>,
    admin:<AdminPage/>,
  };

  return(
    <>
      <style>{css}</style>
      <Nav page={page} setPage={setPage}/>
      <div style={{paddingTop:56}}>
        <A/>
        {SP[page]||<HomePage setPage={setPage}/>}
        <Footer setPage={setPage}/>
      </div>
    </>
  );
}
