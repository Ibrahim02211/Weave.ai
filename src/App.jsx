import { useState } from "react";

const PLANS = [
  { id: "starter", name: "Starter", price: 9, sites: 3, desc: "Perfect to get started" },
  { id: "pro",     name: "Pro",     price: 29, sites: 20, desc: "For growing businesses" },
  { id: "agency",  name: "Agency",  price: 79, sites: 999, desc: "Unlimited power" },
];

const SITE_TEMPLATES = [
  "Portfolio", "Landing Page", "Blog", "E-commerce", "SaaS", "Restaurant",
  "Agency", "Personal Brand", "Startup", "Event Page",
];

const LOADING_MSGS = [
  "Analyzing your prompt…",
  "Crafting the layout…",
  "Generating components…",
  "Styling your design…",
  "Almost done…",
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function generateWebsite(type, prompt) {
  const name = prompt.split(" ").slice(0,3).join(" ");
  if (type === "Restaurant") return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;background:#0d0d0d;color:#f0ede8}nav{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;background:rgba(0,0,0,0.9);position:fixed;width:100%;z-index:100;border-bottom:1px solid rgba(255,200,100,0.2)}.logo{font-size:24px;color:#f5c842;font-weight:bold}nav a{color:#f0ede8;text-decoration:none;margin-left:24px;font-family:sans-serif;font-size:14px}.hero{height:100vh;background:linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200') center/cover;display:flex;align-items:center;justify-content:center;text-align:center}.hero h1{font-size:72px;font-style:italic;margin-bottom:16px;color:#f5c842}.hero p{font-size:20px;opacity:0.8;margin-bottom:32px;font-family:sans-serif}.btn{background:linear-gradient(135deg,#f5c842,#ff9a3c);color:#0d0d0d;padding:14px 36px;border:none;border-radius:4px;font-size:16px;cursor:pointer;font-weight:bold}.menu{padding:100px 48px;text-align:center}.menu h2{font-size:48px;font-style:italic;margin-bottom:64px;color:#f5c842}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;max-width:1000px;margin:0 auto}.card{background:#1a1a1a;padding:32px;border-radius:8px;border:1px solid rgba(245,200,66,0.1)}.card h3{font-size:20px;margin-bottom:8px;color:#f5c842}.card p{opacity:0.6;font-family:sans-serif;font-size:14px;margin-bottom:12px}.price{color:#f5c842;font-size:18px;font-weight:bold}footer{padding:48px;text-align:center;background:#0a0a0a;opacity:0.6;font-family:sans-serif;font-size:14px}</style></head><body><nav><div class="logo">✦ ${name}</div><div><a href="#">Menu</a><a href="#">About</a><a href="#">Reserve</a></div></nav><section class="hero"><div><h1>${name}</h1><p>Fine dining experience in the heart of the city</p><button class="btn">Reserve a Table</button></div></section><section class="menu"><h2>Our Menu</h2><div class="grid"><div class="card"><h3>Grilled Salmon</h3><p>Fresh Atlantic salmon with herbs and lemon butter</p><div class="price">£28</div></div><div class="card"><h3>Beef Tenderloin</h3><p>Premium cut with truffle sauce and vegetables</p><div class="price">£42</div></div><div class="card"><h3>Pasta Carbonara</h3><p>House-made pasta with pancetta and pecorino</p><div class="price">£22</div></div><div class="card"><h3>Caesar Salad</h3><p>Romaine lettuce, parmesan and classic dressing</p><div class="price">£14</div></div><div class="card"><h3>Chocolate Fondant</h3><p>Warm chocolate cake with vanilla ice cream</p><div class="price">£12</div></div><div class="card"><h3>Tiramisu</h3><p>Classic Italian dessert with espresso</p><div class="price">£10</div></div></div></section><footer><p>© 2024 ${name} · Fine Dining · London</p></footer></body></html>`;
  
  if (type === "Portfolio") return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} Portfolio</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;background:#0f0f0f;color:#f0ede8}nav{display:flex;justify-content:space-between;align-items:center;padding:24px 48px;position:fixed;width:100%;z-index:100}.logo{font-size:20px;font-weight:bold}nav a{color:rgba(240,237,232,0.6);text-decoration:none;margin-left:24px;font-size:14px;font-family:sans-serif}.hero{height:100vh;display:flex;align-items:center;padding:0 48px}.tag{font-family:sans-serif;font-size:13px;opacity:0.4;letter-spacing:2px;margin-bottom:24px}.hero h1{font-size:80px;font-weight:normal;font-style:italic;line-height:1;margin-bottom:24px}.hero h1 span{color:#f5c842}.hero p{font-size:18px;opacity:0.55;line-height:1.7;font-family:sans-serif;max-width:500px;margin-bottom:40px}.btn{display:inline-block;background:transparent;border:1px solid rgba(240,237,232,0.3);color:#f0ede8;padding:12px 28px;border-radius:4px;font-family:Georgia,serif;cursor:pointer;font-size:15px}.work{padding:120px 48px}.work h2{font-size:48px;font-style:italic;margin-bottom:64px;opacity:0.3}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}.project{background:#1a1a1a;border-radius:12px;overflow:hidden;cursor:pointer}.img{height:280px;display:flex;align-items:center;justify-content:center;font-size:64px}.info{padding:28px}.info h3{font-size:22px;margin-bottom:8px}.info p{opacity:0.5;font-family:sans-serif;font-size:14px}.contact{padding:120px 48px;text-align:center}.contact h2{font-size:48px;font-style:italic;margin-bottom:16px}.contact p{opacity:0.5;font-family:sans-serif;margin-bottom:40px}a.email{font-size:32px;color:#f5c842;text-decoration:none}</style></head><body><nav><div class="logo">✦ ${name}</div><div><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a></div></nav><section class="hero"><div><div class="tag">DESIGNER & DEVELOPER</div><h1>Creating <span>digital</span> experiences</h1><p>${prompt}. Passionate about creating beautiful, functional products.</p><button class="btn">View My Work →</button></div></section><section class="work"><h2>Selected Work</h2><div class="grid"><div class="project"><div class="img" style="background:linear-gradient(135deg,#1a1a2e,#16213e)">🎨</div><div class="info"><h3>Brand Identity</h3><p>Complete visual identity for a tech startup</p></div></div><div class="project"><div class="img" style="background:linear-gradient(135deg,#0f3460,#533483)">💻</div><div class="info"><h3>Web Platform</h3><p>Full-stack web application with modern UI</p></div></div><div class="project"><div class="img" style="background:linear-gradient(135deg,#1b4332,#2d6a4f)">📱</div><div class="info"><h3>Mobile App</h3><p>iOS and Android app for fitness tracking</p></div></div><div class="project"><div class="img" style="background:linear-gradient(135deg,#370617,#6a040f)">🚀</div><div class="info"><h3>SaaS Dashboard</h3><p>Analytics dashboard for enterprise clients</p></div></div></div></section><section class="contact"><h2>Let's Work Together</h2><p>Have a project in mind? I'd love to hear about it.</p><a href="mailto:hello@portfolio.com" class="email">hello@portfolio.com</a></section></body></html>`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#f0ede8}nav{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;border-bottom:1px solid rgba(255,255,255,0.08)}.logo{font-size:20px;font-weight:bold;color:#f5c842}nav a{color:rgba(240,237,232,0.6);text-decoration:none;margin-left:24px;font-size:14px}.btn{background:linear-gradient(135deg,#f5c842,#ff9a3c);color:#0a0a0f;padding:8px 20px;border:none;border-radius:6px;cursor:pointer;font-weight:bold;font-size:14px}.hero{padding:120px 48px;text-align:center;max-width:900px;margin:0 auto}.badge{display:inline-block;background:rgba(245,200,66,0.12);border:1px solid rgba(245,200,66,0.3);border-radius:999px;padding:6px 18px;font-size:13px;color:#f5c842;margin-bottom:32px}.hero h1{font-size:72px;line-height:1.05;margin-bottom:24px;font-weight:800}.hero h1 span{background:linear-gradient(135deg,#f5c842,#ff9a3c);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.hero p{font-size:20px;opacity:0.55;max-width:560px;margin:0 auto 40px;line-height:1.7}.cta{display:flex;gap:16px;justify-content:center}.btn-primary{background:linear-gradient(135deg,#f5c842,#ff9a3c);color:#0a0a0f;padding:16px 36px;border:none;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer}.btn-secondary{background:transparent;color:#f0ede8;padding:16px 36px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;font-size:16px;cursor:pointer}.features{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding:100px 48px;max-width:1200px;margin:0 auto}.feature{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 32px}.icon{font-size:40px;margin-bottom:20px}.feature h3{font-size:20px;margin-bottom:12px}.feature p{opacity:0.5;line-height:1.6;font-size:15px}footer{padding:48px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);opacity:0.4;font-size:14px}</style></head><body><nav><div class="logo">⚡ ${name}</div><div><a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a><button class="btn">Get Started</button></div></nav><section class="hero"><div class="badge">✦ ${type}</div><h1><span>${name}</span><br/>that works for you</h1><p>${prompt}. Built for modern teams who want to move fast and build great things.</p><div class="cta"><button class="btn-primary">Start for Free →</button><button class="btn-secondary">Learn More</button></div></section><section class="features"><div class="feature"><div class="icon">⚡</div><h3>Lightning Fast</h3><p>Optimized for performance from day one.</p></div><div class="feature"><div class="icon">🔒</div><h3>Secure by Default</h3><p>Enterprise-grade security built in.</p></div><div class="feature"><div class="icon">📊</div><h3>Powerful Analytics</h3><p>Deep insights into your business.</p></div></section><footer><p>© 2024 ${name} · All rights reserved</p></footer></body></html>`;
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [sitesLeft, setSitesLeft] = useState(0);

  const handleSelectPlan = (p) => { setPlan(p); setSitesLeft(p.sites); setScreen("builder"); };
  const handleLogin = () => { setUser({ name: "Alex", email: "alex@example.com" }); setScreen("plans"); };
  const handleGenerate = () => { if (sitesLeft > 0) setSitesLeft(s => s - 1); };

  if (screen === "landing") return <Landing onGetStarted={() => setScreen("login")} />;
  if (screen === "login")   return <Login onLogin={handleLogin} />;
  if (screen === "plans")   return <Plans plans={PLANS} onSelect={handleSelectPlan} />;
  if (screen === "builder") return <Builder user={user} plan={plan} sitesLeft={sitesLeft} onGenerate={handleGenerate} onUpgrade={() => setScreen("plans")} />;
}

function Landing({ onGetStarted }) {
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",color:"#f0ede8",fontFamily:"Georgia,serif"}}>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 48px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontSize:"22px",fontWeight:"bold"}}>✦ <span style={{color:"#f5c842"}}>Weave</span>AI</div>
        <button onClick={onGetStarted} style={btnStyle("outline")}>Sign in →</button>
      </nav>
      <div style={{textAlign:"center",padding:"120px 24px 80px",maxWidth:"860px",margin:"0 auto"}}>
        <h1 style={{fontSize:"clamp(48px,8vw,88px)",lineHeight:1.05,fontWeight:"normal",fontStyle:"italic",letterSpacing:"-2px",margin:"0 0 28px"}}>
          Build websites<br/>
          <span style={{background:"linear-gradient(135deg,#f5c842,#ff9a3c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>without limits.</span>
        </h1>
        <p style={{fontSize:"19px",opacity:0.55,lineHeight:1.7,maxWidth:"560px",margin:"0 auto 48px",fontFamily:"sans-serif"}}>
          Describe any website. WeaveAI generates stunning websites instantly.
        </p>
        <button onClick={onGetStarted} style={{...btnStyle("primary"),padding:"18px 48px",fontSize:"17px"}}>Start Building Free →</button>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => { if (!email.includes("@")) return; setLoading(true); await sleep(1000); onLogin(); };
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",color:"#f0ede8",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif"}}>
      <div style={{width:"100%",maxWidth:"400px",padding:"0 24px"}}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <div style={{fontSize:"22px",fontWeight:"bold"}}>✦ <span style={{color:"#f5c842"}}>Weave</span>AI</div>
          <h2 style={{fontSize:"28px",fontWeight:"normal",fontStyle:"italic",margin:"24px 0 8px"}}>Welcome back</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <input placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
          <input placeholder="Password" type="password" style={inputStyle}/>
          <button onClick={handleSubmit} disabled={loading} style={{...btnStyle("primary"),padding:"14px",opacity:loading?0.6:1}}>{loading?"Signing in…":"Sign In →"}</button>
        </div>
        <p style={{textAlign:"center",marginTop:"24px",fontSize:"13px",opacity:0.4,fontFamily:"sans-serif"}}>Don't have an account? <span style={{color:"#f5c842",cursor:"pointer"}} onClick={onLogin}>Sign up free</span></p>
      </div>
    </div>
  );
}

function Plans({ plans, onSelect }) {
  const [selected, setSelected] = useState("pro");
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",color:"#f0ede8",fontFamily:"Georgia,serif",padding:"64px 24px"}}>
      <div style={{textAlign:"center",marginBottom:"64px"}}>
        <div style={{fontSize:"22px",fontWeight:"bold",marginBottom:"40px"}}>✦ <span style={{color:"#f5c842"}}>Weave</span>AI</div>
        <h1 style={{fontSize:"46px",fontWeight:"normal",fontStyle:"italic"}}>Choose your plan</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"16px",maxWidth:"900px",margin:"0 auto 48px"}}>
        {plans.map(p=>(
          <div key={p.id} onClick={()=>setSelected(p.id)} style={{border:selected===p.id?"1.5px solid #f5c842":"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"36px 32px",cursor:"pointer",background:selected===p.id?"rgba(245,200,66,0.04)":"rgba(255,255,255,0.02)",position:"relative"}}>
            {p.id==="pro"&&<div style={{position:"absolute",top:"-12px",left:"50%",transform:"translateX(-50%)",background:"#f5c842",color:"#0a0a0f",borderRadius:"999px",padding:"4px 14px",fontSize:"11px",fontWeight:"bold"}}>MOST POPULAR</div>}
            <div style={{fontSize:"24px",marginBottom:"4px"}}>{p.name}</div>
            <div style={{marginBottom:"24px"}}><span style={{fontSize:"48px",fontWeight:"bold"}}>${p.price}</span><span style={{opacity:0.4,fontSize:"14px"}}>/mo</span></div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px",fontFamily:"sans-serif",fontSize:"14px"}}>
              {[`${p.sites===999?"Unlimited":p.sites} websites/month`,"AI generation","Export code"].map(f=>(
                <div key={f} style={{display:"flex",gap:"10px"}}><span style={{color:"#f5c842"}}>✓</span><span style={{opacity:0.7}}>{f}</span></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
        <button onClick={()=>onSelect(plans.find(p=>p.id===selected))} style={{...btnStyle("primary"),padding:"16px 48px",fontSize:"16px"}}>Start with {plans.find(p=>p.id===selected)?.name} →</button>
      </div>
    </div>
  );
}

function Builder({ user, plan, sitesLeft, onGenerate, onUpgrade }) {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("Landing Page");
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [paywalled, setPaywalled] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (sitesLeft<=0) { setPaywalled(true); return; }
    setLoading(true); setResult(null); setPaywalled(false);
    for (let i=0;i<LOADING_MSGS.length;i++) { setLoadMsg(LOADING_MSGS[i]); await sleep(500); }
    const html = generateWebsite(type, prompt);
    onGenerate();
    setHistory(h=>[{prompt,type,html,ts:Date.now()},...h.slice(0,9)]);
    setResult(html);
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",color:"#f0ede8",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column"}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(10,10,15,0.95)",position:"sticky",top:0,zIndex:100}}>
        <div style={{fontSize:"19px",fontWeight:"bold"}}>✦ <span style={{color:"#f5c842"}}>Weave</span>AI</div>
        <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
          <div style={{background:sitesLeft>0?"rgba(245,200,66,0.12)":"rgba(255,80,80,0.12)",border:`1px solid ${sitesLeft>0?"rgba(245,200,66,0.3)":"rgba(255,80,80,0.3)"}`,borderRadius:"999px",padding:"5px 14px",fontSize:"13px",color:sitesLeft>0?"#f5c842":"#ff6b6b",fontFamily:"sans-serif"}}>
            {sitesLeft===999?"∞":sitesLeft} sites left · {plan.name}
          </div>
          <button onClick={onUpgrade} style={{...btnStyle("outline"),padding:"6px 16px",fontSize:"13px"}}>Upgrade</button>
        </div>
      </header>
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <aside style={{width:"200px",borderRight:"1px solid rgba(255,255,255,0.07)",padding:"24px 16px",flexShrink:0,overflowY:"auto"}}>
          <div style={{fontSize:"11px",opacity:0.35,letterSpacing:"1px",fontFamily:"sans-serif",marginBottom:"8px"}}>RECENT</div>
          {history.length===0&&<div style={{fontSize:"13px",opacity:0.3,fontFamily:"sans-serif"}}>Generated sites appear here</div>}
          {history.map(h=>(
            <div key={h.ts} onClick={()=>setResult(h.html)} style={{padding:"10px 12px",borderRadius:"8px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",fontSize:"13px",fontFamily:"sans-serif",marginBottom:"8px"}}>
              <div style={{opacity:0.8,fontWeight:500}}>{h.type}</div>
              <div style={{opacity:0.4,fontSize:"11px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.prompt}</div>
            </div>
          ))}
        </aside>
        <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"24px 32px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
              {SITE_TEMPLATES.map(t=>(
                <button key={t} onClick={()=>setType(t)} style={{padding:"5px 14px",borderRadius:"999px",fontSize:"13px",fontFamily:"sans-serif",cursor:"pointer",border:"none",background:type===t?"#f5c842":"rgba(255,255,255,0.07)",color:type===t?"#0a0a0f":"rgba(240,237,232,0.6)",fontWeight:type===t?"bold":"normal"}}>{t}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:"12px",alignItems:"flex-end"}}>
              <textarea placeholder={`Describe your ${type.toLowerCase()}…`} value={prompt} onChange={e=>setPrompt(e.target.value)} rows={3} style={{...inputStyle,flex:1,resize:"none",lineHeight:1.5}}/>
              <button onClick={handleGenerate} disabled={loading||!prompt.trim()} style={{...btnStyle("primary"),padding:"12px 24px",whiteSpace:"nowrap",alignSelf:"stretch",opacity:(loading||!prompt.trim())?0.5:1}}>{loading?"⏳":"Generate ✦"}</button>
            </div>
          </div>
          <div style={{flex:1,position:"relative",overflow:"hidden"}}>
            {loading&&(
              <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(10,10,15,0.92)"}}>
                <div style={{width:"48px",height:"48px",borderRadius:"50%",border:"3px solid rgba(245,200,66,0.2)",borderTopColor:"#f5c842",animation:"spin 0.8s linear infinite",marginBottom:"24px"}}/>
                <div style={{fontSize:"18px"}}>{loadMsg}</div>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            )}
            {paywalled&&!loading&&(
              <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(10,10,15,0.96)",textAlign:"center",padding:"40px"}}>
                <div style={{fontSize:"56px",marginBottom:"16px"}}>🔒</div>
                <h2 style={{fontSize:"32px",fontWeight:"normal",fontStyle:"italic"}}>You've used all your sites</h2>
                <button onClick={onUpgrade} style={{...btnStyle("primary"),padding:"14px 36px",marginTop:"24px"}}>View Plans →</button>
              </div>
            )}
            {!result&&!loading&&!paywalled&&(
              <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.25,textAlign:"center"}}>
                <div><div style={{fontSize:"64px"}}>✦</div><div style={{fontSize:"20px",fontStyle:"italic"}}>Your website preview will appear here</div></div>
              </div>
            )}
            {result&&!loading&&(
              <div style={{height:"100%",display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 24px",borderBottom:"1px solid rgba(255,255,255,0.07)",fontFamily:"sans-serif",fontSize:"13px"}}>
                  <div style={{opacity:0.4}}>Live Preview</div>
                  <div style={{display:"flex",gap:"10px"}}>
                    <button onClick={()=>{const b=new Blob([result],{type:"text/html"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="website.html";a.click();}} style={{...btnStyle("outline"),padding:"6px 16px",fontSize:"13px"}}>↓ Export HTML</button>
                    <button onClick={handleGenerate} style={{...btnStyle("ghost"),padding:"6px 16px",fontSize:"13px"}}>↺ Regenerate</button>
                  </div>
                </div>
                <iframe srcDoc={result} style={{flex:1,border:"none",width:"100%"}} title="Preview"/>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const inputStyle={background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"12px 16px",color:"#f0ede8",fontSize:"15px",fontFamily:"Georgia,serif",outline:"none",width:"100%",boxSizing:"border-box"};

function btnStyle(variant){
  const base={borderRadius:"8px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:"15px",transition:"all 0.15s",border:"none"};
  if(variant==="primary")return{...base,background:"linear-gradient(135deg,#f5c842,#ff9a3c)",color:"#0a0a0f",fontWeight:"bold"};
  if(variant==="outline")return{...base,background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"#f0ede8"};
  if(variant==="ghost")return{...base,background:"rgba(255,255,255,0.05)",color:"#f0ede8"};
  return base;
                                        }
