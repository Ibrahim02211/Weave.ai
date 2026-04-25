import { useState, useEffect, useRef } from "react";

// ── Simulated auth/payment state ──────────────────────────────────────────────
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

// ── Tiny helper ───────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function cn(...classes) { return classes.filter(Boolean).join(" "); }

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | plans | builder
  const [user, setUser]     = useState(null);
  const [plan, setPlan]     = useState(null);
  const [sitesLeft, setSitesLeft] = useState(0);

  const handleSelectPlan = (p) => {
    setPlan(p);
    setSitesLeft(p.sites);
    setScreen("builder");
  };

  const handleLogin = () => {
    setUser({ name: "Alex", email: "alex@example.com" });
    setScreen("plans");
  };

  const handleGenerate = () => {
    if (sitesLeft > 0) setSitesLeft(s => s - 1);
  };

  if (screen === "landing") return <Landing onGetStarted={() => setScreen("login")} />;
  if (screen === "login")   return <Login onLogin={handleLogin} />;
  if (screen === "plans")   return <Plans plans={PLANS} onSelect={handleSelectPlan} />;
  if (screen === "builder") return (
    <Builder
      user={user}
      plan={plan}
      sitesLeft={sitesLeft}
      onGenerate={handleGenerate}
      onUpgrade={() => setScreen("plans")}
    />
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────────
function Landing({ onGetStarted }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0ede8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Ambient blobs */}
      <div style={{
        position: "fixed", top: "-20%", left: "-10%", width: "60vw", height: "60vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,200,80,0.07), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(200,130,255,0.06), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
          ✦ <span style={{ color: "#f5c842" }}>Weave</span>AI
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "15px", opacity: 0.7 }}>
          <span style={{ cursor: "pointer" }}>Pricing</span>
          <span style={{ cursor: "pointer" }}>Examples</span>
          <span style={{ cursor: "pointer" }}>Docs</span>
        </div>
        <button onClick={onGetStarted} style={btnStyle("outline")}>Sign in →</button>
      </nav>

      {/* Hero */}
      <div style={{
        textAlign: "center", padding: "120px 24px 80px",
        maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 5,
      }}>
        <div style={{
          display: "inline-block", background: "rgba(245,200,66,0.12)",
          border: "1px solid rgba(245,200,66,0.3)", borderRadius: "999px",
          padding: "6px 18px", fontSize: "13px", color: "#f5c842",
          marginBottom: "32px", letterSpacing: "0.5px",
        }}>
          ✦ AI-Powered Website Generation
        </div>
        <h1 style={{
          fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 1.05,
          fontWeight: "normal", margin: "0 0 28px",
          fontStyle: "italic", letterSpacing: "-2px",
        }}>
          Build websites<br />
          <span style={{
            background: "linear-gradient(135deg, #f5c842, #ff9a3c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>without limits.</span>
        </h1>
        <p style={{
          fontSize: "19px", opacity: 0.55, lineHeight: 1.7,
          maxWidth: "560px", margin: "0 auto 48px",
          fontFamily: "'Helvetica Neue', sans-serif", fontStyle: "normal",
        }}>
          Describe any website. WeaveAI generates stunning, production-ready code in seconds.
          No design skills needed.
        </p>
        <button onClick={onGetStarted} style={{
          ...btnStyle("primary"),
          padding: "18px 48px", fontSize: "17px",
        }}>
          Start Building Free →
        </button>
        <p style={{ marginTop: "16px", fontSize: "13px", opacity: 0.35 }}>
          No credit card required to try
        </p>
      </div>

      {/* Feature grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px", background: "rgba(255,255,255,0.06)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        margin: "0 48px",
      }}>
        {[
          { icon: "⚡", title: "Instant Generation", desc: "Full websites in under 10 seconds" },
          { icon: "🎨", title: "Beautiful by Default", desc: "Professional designs, every time" },
          { icon: "📦", title: "Export Anywhere", desc: "Clean HTML, React, or Next.js code" },
        ].map(f => (
          <div key={f.title} style={{
            padding: "48px 40px", background: "#0a0a0f",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>{f.icon}</div>
            <div style={{ fontSize: "18px", marginBottom: "8px", fontWeight: "bold" }}>{f.title}</div>
            <div style={{ fontSize: "14px", opacity: 0.45, fontFamily: "sans-serif", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* CTA bottom */}
      <div style={{ textAlign: "center", padding: "100px 24px", position: "relative", zIndex: 5 }}>
        <h2 style={{ fontSize: "42px", fontWeight: "normal", fontStyle: "italic", marginBottom: "24px" }}>
          Ready to weave something?
        </h2>
        <button onClick={onGetStarted} style={{ ...btnStyle("primary"), padding: "16px 40px" }}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    setLoading(true);
    await sleep(1000);
    onLogin();
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f", color: "#f0ede8",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{
        width: "100%", maxWidth: "400px", padding: "0 24px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px" }}>
            ✦ <span style={{ color: "#f5c842" }}>Weave</span>AI
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: "normal", fontStyle: "italic", margin: "24px 0 8px" }}>
            Welcome back
          </h2>
          <p style={{ opacity: 0.45, fontSize: "14px", fontFamily: "sans-serif" }}>
            Sign in to your account
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            style={inputStyle}
          />
          <button onClick={handleSubmit} disabled={loading} style={{
            ...btnStyle("primary"), padding: "14px",
            opacity: loading ? 0.6 : 1,
          }}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </div>

        <div style={{
          margin: "24px 0", display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          <span style={{ opacity: 0.3, fontSize: "12px", fontFamily: "sans-serif" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        <button onClick={handleSubmit} style={{ ...btnStyle("outline"), width: "100%", padding: "13px" }}>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", opacity: 0.4, fontFamily: "sans-serif" }}>
          Don't have an account? <span style={{ color: "#f5c842", cursor: "pointer" }} onClick={onLogin}>Sign up free</span>
        </p>
      </div>
    </div>
  );
}

// ── PLANS ─────────────────────────────────────────────────────────────────────
function Plans({ plans, onSelect }) {
  const [selected, setSelected] = useState("pro");

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f", color: "#f0ede8",
      fontFamily: "Georgia, serif", padding: "64px 24px",
    }}>
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 64px" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "40px" }}>
          ✦ <span style={{ color: "#f5c842" }}>Weave</span>AI
        </div>
        <h1 style={{ fontSize: "46px", fontWeight: "normal", fontStyle: "italic", marginBottom: "16px" }}>
          Choose your plan
        </h1>
        <p style={{ opacity: 0.45, fontSize: "16px", fontFamily: "sans-serif", lineHeight: 1.6 }}>
          Unlock AI website generation. Cancel anytime.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px", maxWidth: "900px", margin: "0 auto 48px",
      }}>
        {plans.map(p => {
          const isSelected = selected === p.id;
          const isPro = p.id === "pro";
          return (
            <div
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                border: isSelected
                  ? "1.5px solid #f5c842"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "36px 32px",
                cursor: "pointer",
                background: isSelected ? "rgba(245,200,66,0.04)" : "rgba(255,255,255,0.02)",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              {isPro && (
                <div style={{
                  position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                  background: "#f5c842", color: "#0a0a0f", borderRadius: "999px",
                  padding: "4px 14px", fontSize: "11px", fontWeight: "bold",
                  fontFamily: "sans-serif", letterSpacing: "0.5px",
                }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ fontSize: "14px", opacity: 0.5, fontFamily: "sans-serif", marginBottom: "8px" }}>{p.desc}</div>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{p.name}</div>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "48px", fontWeight: "bold" }}>${p.price}</span>
                <span style={{ opacity: 0.4, fontSize: "14px", fontFamily: "sans-serif" }}>/mo</span>
              </div>
              <div style={{
                display: "flex", flexDirection: "column", gap: "10px",
                fontFamily: "sans-serif", fontSize: "14px",
              }}>
                {[
                  `${p.sites === 999 ? "Unlimited" : p.sites} websites/month`,
                  "AI generation",
                  "Export code",
                  p.id !== "starter" ? "Custom domain" : null,
                  p.id === "agency" ? "Priority support" : null,
                ].filter(Boolean).map(f => (
                  <div key={f} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ color: "#f5c842" }}>✓</span>
                    <span style={{ opacity: 0.7 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => onSelect(plans.find(p => p.id === selected))}
          style={{ ...btnStyle("primary"), padding: "16px 48px", fontSize: "16px" }}
        >
          Start with {plans.find(p => p.id === selected)?.name} →
        </button>
        <p style={{ marginTop: "12px", fontSize: "12px", opacity: 0.3, fontFamily: "sans-serif" }}>
          Secure payment · Cancel anytime
        </p>
      </div>
    </div>
  );
}

// ── BUILDER ───────────────────────────────────────────────────────────────────
function Builder({ user, plan, sitesLeft, onGenerate, onUpgrade }) {
  const [prompt, setPrompt]     = useState("");
  const [type, setType]         = useState("Landing Page");
  const [loading, setLoading]   = useState(false);
  const [loadMsg, setLoadMsg]   = useState("");
  const [result, setResult]     = useState(null);
  const [history, setHistory]   = useState([]);
  const [paywalled, setPaywalled] = useState(false);
  const textareaRef = useRef(null);

  const canGenerate = sitesLeft > 0;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!canGenerate) { setPaywalled(true); return; }

    setLoading(true);
    setResult(null);
    setPaywalled(false);

    for (let i = 0; i < LOADING_MSGS.length; i++) {
      setLoadMsg(LOADING_MSGS[i]);
      await sleep(700);
    }

    // Call Claude API
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an expert web developer. Generate a complete, self-contained single-file HTML website for the following request.

Website type: ${type}
User prompt: ${prompt}

Requirements:
- Single HTML file with embedded CSS and JS
- Modern, beautiful design with a professional color scheme
- Responsive layout
- Include realistic placeholder content relevant to the prompt
- Use CSS animations/transitions for polish
- NO external dependencies except Google Fonts

Return ONLY the raw HTML code, nothing else. No markdown, no explanation.`,
          }],
        }),
      });

      const data = await response.json();
      const html = data.content?.map(b => b.text || "").join("") || "";

      onGenerate();
      setHistory(h => [{ prompt, type, html, ts: Date.now() }, ...h.slice(0, 9)]);
      setResult(html);
    } catch (err) {
      setResult(`<html><body style="font-family:sans-serif;padding:40px;background:#0a0a0f;color:#f0ede8">
        <h2>⚠️ Generation failed</h2><p>Could not reach the AI. Please try again.</p>
      </body></html>`);
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0f", color: "#f0ede8",
      fontFamily: "Georgia, serif", display: "flex", flexDirection: "column",
    }}>

      {/* Top bar */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(10,10,15,0.95)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ fontSize: "19px", fontWeight: "bold" }}>
          ✦ <span style={{ color: "#f5c842" }}>Weave</span>AI
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", fontFamily: "sans-serif" }}>
          <div style={{
            background: sitesLeft > 0 ? "rgba(245,200,66,0.12)" : "rgba(255,80,80,0.12)",
            border: `1px solid ${sitesLeft > 0 ? "rgba(245,200,66,0.3)" : "rgba(255,80,80,0.3)"}`,
            borderRadius: "999px", padding: "5px 14px", fontSize: "13px",
            color: sitesLeft > 0 ? "#f5c842" : "#ff6b6b",
          }}>
            {sitesLeft === 999 ? "∞" : sitesLeft} sites left · {plan.name}
          </div>
          <button onClick={onUpgrade} style={{ ...btnStyle("outline"), padding: "6px 16px", fontSize: "13px" }}>
            Upgrade
          </button>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "linear-gradient(135deg,#f5c842,#ff9a3c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", color: "#0a0a0f", fontWeight: "bold",
          }}>
            {user?.name?.[0] || "A"}
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar: history */}
        <aside style={{
          width: "220px", borderRight: "1px solid rgba(255,255,255,0.07)",
          padding: "24px 16px", flexShrink: 0, overflowY: "auto",
          display: "flex", flexDirection: "column", gap: "8px",
        }}>
          <div style={{ fontSize: "11px", opacity: 0.35, letterSpacing: "1px", fontFamily: "sans-serif", marginBottom: "8px" }}>
            RECENT
          </div>
          {history.length === 0 && (
            <div style={{ fontSize: "13px", opacity: 0.3, fontFamily: "sans-serif", lineHeight: 1.5 }}>
              Your generated sites will appear here
            </div>
          )}
          {history.map((h, i) => (
            <div
              key={h.ts}
              onClick={() => setResult(h.html)}
              style={{
                padding: "10px 12px", borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer", fontSize: "13px", fontFamily: "sans-serif",
                lineHeight: 1.4,
              }}
            >
              <div style={{ opacity: 0.8, marginBottom: "2px", fontWeight: 500 }}>{h.type}</div>
              <div style={{ opacity: 0.4, fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {h.prompt}
              </div>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Prompt bar */}
          <div style={{
            padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(10,10,15,0.8)",
          }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
              {SITE_TEMPLATES.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: "5px 14px", borderRadius: "999px", fontSize: "13px",
                    fontFamily: "sans-serif", cursor: "pointer", border: "none",
                    background: type === t ? "#f5c842" : "rgba(255,255,255,0.07)",
                    color: type === t ? "#0a0a0f" : "rgba(240,237,232,0.6)",
                    fontWeight: type === t ? "bold" : "normal",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
              <textarea
                ref={textareaRef}
                placeholder={`Describe your ${type.toLowerCase()}… e.g. "A modern SaaS landing page for a project management tool with a dark theme"`}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleGenerate(); }}
                rows={3}
                style={{
                  ...inputStyle,
                  flex: 1, resize: "none", lineHeight: 1.5, fontSize: "15px",
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                style={{
                  ...btnStyle("primary"),
                  padding: "12px 24px", whiteSpace: "nowrap", alignSelf: "stretch",
                  opacity: (loading || !prompt.trim()) ? 0.5 : 1,
                  fontSize: "15px",
                }}
              >
                {loading ? "⏳" : "Generate ✦"}
              </button>
            </div>
            <div style={{ fontSize: "12px", opacity: 0.3, marginTop: "8px", fontFamily: "sans-serif" }}>
              ⌘ + Enter to generate
            </div>
          </div>

          {/* Preview area */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            {loading && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 10,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "rgba(10,10,15,0.92)", backdropFilter: "blur(8px)",
              }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  border: "3px solid rgba(245,200,66,0.2)",
                  borderTopColor: "#f5c842",
                  animation: "spin 0.8s linear infinite",
                  marginBottom: "24px",
                }} />
                <div style={{ fontSize: "18px", marginBottom: "8px" }}>{loadMsg}</div>
                <div style={{ fontSize: "13px", opacity: 0.4, fontFamily: "sans-serif" }}>
                  Powered by Claude AI
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {paywalled && !loading && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 10,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "rgba(10,10,15,0.96)", backdropFilter: "blur(8px)",
                textAlign: "center", padding: "40px",
              }}>
                <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔒</div>
                <h2 style={{ fontSize: "32px", fontWeight: "normal", fontStyle: "italic", marginBottom: "12px" }}>
                  You've used all your sites
                </h2>
                <p style={{ opacity: 0.5, fontFamily: "sans-serif", maxWidth: "400px", lineHeight: 1.6, marginBottom: "32px" }}>
                  Upgrade your plan to generate more websites. Your work is saved.
                </p>
                <button onClick={onUpgrade} style={{ ...btnStyle("primary"), padding: "14px 36px" }}>
                  View Plans →
                </button>
              </div>
            )}

            {!result && !loading && !paywalled && (
              <div style={{
                height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: 0.25, textAlign: "center",
              }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>✦</div>
                <div style={{ fontSize: "20px", fontStyle: "italic" }}>Your website preview will appear here</div>
                <div style={{ fontSize: "14px", fontFamily: "sans-serif", marginTop: "8px" }}>
                  Describe what you want and hit Generate
                </div>
              </div>
            )}

            {result && !loading && (
              <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Preview toolbar */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(10,10,15,0.9)", fontFamily: "sans-serif", fontSize: "13px",
                }}>
                  <div style={{ opacity: 0.4 }}>Live Preview</div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        const blob = new Blob([result], { type: "text/html" });
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = "website.html";
                        a.click();
                      }}
                      style={{ ...btnStyle("outline"), padding: "6px 16px", fontSize: "13px" }}
                    >
                      ↓ Export HTML
                    </button>
                    <button
                      onClick={handleGenerate}
                      style={{ ...btnStyle("ghost"), padding: "6px 16px", fontSize: "13px" }}
                    >
                      ↺ Regenerate
                    </button>
                  </div>
                </div>
                <iframe
                  srcDoc={result}
                  style={{ flex: 1, border: "none", width: "100%" }}
                  title="Generated Website Preview"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#f0ede8",
  fontSize: "15px",
  fontFamily: "Georgia, serif",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function btnStyle(variant) {
  const base = {
    borderRadius: "8px", cursor: "pointer", fontFamily: "Georgia, serif",
    fontSize: "15px", transition: "all 0.15s", border: "none",
  };
  if (variant === "primary") return {
    ...base,
    background: "linear-gradient(135deg, #f5c842, #ff9a3c)",
    color: "#0a0a0f", fontWeight: "bold",
  };
  if (variant === "outline") return {
    ...base,
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#f0ede8",
  };
  if (variant === "ghost") return {
    ...base,
    background: "rgba(255,255,255,0.05)",
    color: "#f0ede8",
  };
  return base;
}
