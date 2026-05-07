import { useState, useEffect, useRef } from "react";

const GAMES = [
  { id: 1, name: "Dragon's Fortune", category: "Slots", img: "🐉", minDeposit: 500, locked: true, players: "2.4K", rtp: "96.8%" },
  { id: 2, name: "Neon Roulette", category: "Table", img: "🎡", minDeposit: 200, locked: true, players: "1.1K", rtp: "97.3%" },
  { id: 3, name: "Cosmic Crash", category: "Crash", img: "🚀", minDeposit: 100, locked: false, players: "5.7K", rtp: "99%" },
  { id: 4, name: "Phantom Poker", category: "Card", img: "🃏", minDeposit: 300, locked: true, players: "890", rtp: "98.1%" },
  { id: 5, name: "Solar Mines", category: "Instant", img: "💎", minDeposit: 150, locked: false, players: "3.2K", rtp: "97.5%" },
  { id: 6, name: "Thunder Strike", category: "Slots", img: "⚡", minDeposit: 500, locked: true, players: "1.8K", rtp: "96.2%" },
];

const NAV_ITEMS = [
  { id: "home", icon: "⊞", label: "Home" },
  { id: "wallet", icon: "◈", label: "Wallet" },
  { id: "games", icon: "◉", label: "Games" },
  { id: "deposit", icon: "↑", label: "Deposit" },
  { id: "profile", icon: "◎", label: "Profile" },
];

const ANNOUNCEMENTS = [
  "🔥 New game DROP: Dragon's Fortune — Available after ₹500 deposit",
  "🎉 Weekend Bonus: 20% extra on all deposits above ₹1000",
  "⚡ Flash Offer: Cosmic Crash FREE plays — Login now!",
];

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function NeonText({ children, color = "#ff6b00" }) {
  return (
    <span style={{
      color,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 40px ${color}40`,
    }}>
      {children}
    </span>
  );
}

function GlassCard({ children, className = "", style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,107,0,0.06) 0%, rgba(20,20,35,0.8) 100%)",
        border: "1px solid rgba(255,107,0,0.2)",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        ...style
      }}
    >
      {children}
    </div>
  );
}

function OrangeBtn({ children, onClick, size = "md", variant = "solid", style = {} }) {
  const pad = size === "sm" ? "8px 16px" : size === "lg" ? "14px 32px" : "10px 22px";
  const fs = size === "sm" ? "12px" : size === "lg" ? "16px" : "14px";
  return (
    <button
      onClick={onClick}
      style={{
        padding: pad,
        fontSize: fs,
        fontWeight: 700,
        fontFamily: "'Exo 2', sans-serif",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: "10px",
        border: variant === "outline" ? "1.5px solid #ff6b00" : "none",
        background: variant === "outline"
          ? "transparent"
          : "linear-gradient(135deg, #ff6b00 0%, #ff9a00 100%)",
        color: "#fff",
        cursor: "pointer",
        boxShadow: variant === "outline"
          ? "0 0 12px rgba(255,107,0,0.3)"
          : "0 0 20px rgba(255,107,0,0.5), 0 4px 15px rgba(255,107,0,0.3)",
        transition: "all 0.2s ease",
        ...style
      }}
      onMouseEnter={e => {
        e.target.style.transform = "translateY(-1px)";
        e.target.style.boxShadow = variant === "outline"
          ? "0 0 20px rgba(255,107,0,0.5)"
          : "0 0 30px rgba(255,107,0,0.7), 0 6px 20px rgba(255,107,0,0.4)";
      }}
      onMouseLeave={e => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = variant === "outline"
          ? "0 0 12px rgba(255,107,0,0.3)"
          : "0 0 20px rgba(255,107,0,0.5), 0 4px 15px rgba(255,107,0,0.3)";
      }}
    >
      {children}
    </button>
  );
}

function HomePage({ setPage }) {
  const [annIdx, setAnnIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAnnIdx(i => (i + 1) % ANNOUNCEMENTS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ padding: "0 0 100px" }}>
      {/* Hero */}
      <div style={{
        position: "relative",
        padding: "40px 20px 30px",
        overflow: "hidden",
        textAlign: "center"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.18) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{ fontSize: "11px", color: "#ff6b00", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px", opacity: 0.8 }}>
          ◈ WELCOME BACK, PLAYER
        </div>
        <h1 style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "clamp(2rem, 8vw, 3rem)",
          fontWeight: 900,
          margin: "0 0 8px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em"
        }}>
          <NeonText>MOON</NeonText>
          <span style={{ color: "#e0e0e0" }}>PAY</span>
        </h1>
        <p style={{ color: "#888", fontSize: "13px", margin: "0 0 24px" }}>Premium Gaming Portal</p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <OrangeBtn onClick={() => setPage("deposit")} size="lg">Deposit Now</OrangeBtn>
          <OrangeBtn onClick={() => setPage("games")} size="lg" variant="outline">Play Games</OrangeBtn>
        </div>
      </div>

      {/* Announcement ticker */}
      <div style={{ margin: "0 16px 20px" }}>
        <GlassCard style={{ padding: "12px 16px", borderColor: "rgba(255,107,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "10px", background: "#ff6b00", color: "#fff", padding: "3px 8px", borderRadius: "4px", fontWeight: 700, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>LIVE</span>
            <span style={{ color: "#ccc", fontSize: "13px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {ANNOUNCEMENTS[annIdx]}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", margin: "0 16px 24px" }}>
        {[
          { label: "Active Players", value: "12.4K", icon: "👥" },
          { label: "Total Payouts", value: "₹2.1CR", icon: "💰" },
          { label: "Games Live", value: "48", icon: "🎮" },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ color: "#ff6b00", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "16px" }}>{s.value}</div>
            <div style={{ color: "#666", fontSize: "10px", marginTop: "2px" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Access */}
      <div style={{ margin: "0 16px 24px" }}>
        <h3 style={{ color: "#aaa", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Quick Access</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            { label: "My Wallet", sub: "Balance: ₹2,450", icon: "◈", page: "wallet" },
            { label: "Deposit", sub: "Via UPI / QR", icon: "↑", page: "deposit" },
            { label: "Game Lobby", sub: "6 Games Available", icon: "◉", page: "games" },
            { label: "Profile", sub: "ID: #MN7821", icon: "◎", page: "profile" },
          ].map(item => (
            <GlassCard key={item.label} onClick={() => setPage(item.page)} style={{ padding: "16px", cursor: "pointer" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ color: "#e0e0e0", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: "14px" }}>{item.label}</div>
              <div style={{ color: "#666", fontSize: "11px", marginTop: "3px" }}>{item.sub}</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Featured game */}
      <div style={{ margin: "0 16px" }}>
        <h3 style={{ color: "#aaa", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Featured Tonight</h3>
        <GlassCard style={{
          padding: "20px",
          background: "linear-gradient(135deg, rgba(255,107,0,0.15) 0%, rgba(20,20,35,0.9) 100%)",
          borderColor: "rgba(255,107,0,0.4)",
          cursor: "pointer"
        }} onClick={() => setPage("games")}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "48px", filter: "drop-shadow(0 0 12px rgba(255,107,0,0.6))" }}>🚀</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#ff6b00", fontSize: "10px", letterSpacing: "0.2em", marginBottom: "4px" }}>TRENDING NOW</div>
              <div style={{ color: "#fff", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "20px" }}>Cosmic Crash</div>
              <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>5.7K players • 99% RTP • FREE to play</div>
            </div>
            <OrangeBtn size="sm">Play</OrangeBtn>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function WalletPage() {
  const txns = [
    { type: "deposit", amount: "+₹1,000", date: "Today, 2:30 PM", status: "approved", id: "TXN8821" },
    { type: "deposit", amount: "+₹500", date: "Yesterday, 6:12 PM", status: "pending", id: "TXN8756" },
    { type: "deposit", amount: "+₹2,000", date: "May 4, 11:40 AM", status: "approved", id: "TXN8690" },
    { type: "deposit", amount: "+₹300", date: "May 2, 9:15 AM", status: "rejected", id: "TXN8601" },
  ];
  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", color: "#e0e0e0", fontWeight: 800, fontSize: "22px", marginBottom: "20px" }}>
        <NeonText>MY</NeonText> WALLET
      </h2>

      <GlassCard style={{
        padding: "28px 20px",
        background: "linear-gradient(135deg, rgba(255,107,0,0.2) 0%, rgba(20,20,35,0.95) 100%)",
        borderColor: "rgba(255,107,0,0.5)",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>Available Balance</div>
        <div style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "42px",
          fontWeight: 900,
          color: "#ff6b00",
          textShadow: "0 0 30px rgba(255,107,0,0.6)",
          letterSpacing: "-0.02em"
        }}>₹2,450</div>
        <div style={{ color: "#555", fontSize: "12px", marginTop: "6px" }}>Player ID: #MN7821</div>
        <div style={{ marginTop: "20px" }}>
          <OrangeBtn size="lg">+ Add Funds</OrangeBtn>
        </div>
      </GlassCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        {[
          { label: "Total Deposited", value: "₹3,800", icon: "↑" },
          { label: "Bonus Earned", value: "₹150", icon: "⭐" },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: "16px", textAlign: "center" }}>
            <div style={{ color: "#ff6b00", fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
            <div style={{ color: "#e0e0e0", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: "18px" }}>{s.value}</div>
            <div style={{ color: "#555", fontSize: "11px", marginTop: "3px" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <h3 style={{ color: "#aaa", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Transaction History</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {txns.map(t => (
          <GlassCard key={t.id} style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "#e0e0e0", fontSize: "13px", fontWeight: 600 }}>{t.id}</div>
                <div style={{ color: "#555", fontSize: "11px", marginTop: "2px" }}>{t.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#ff6b00", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "15px" }}>{t.amount}</div>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: t.status === "approved" ? "#00ff88" : t.status === "pending" ? "#ffaa00" : "#ff4444",
                  marginTop: "2px"
                }}>
                  {t.status.toUpperCase()}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function DepositPage() {
  const [step, setStep] = useState(1);
  const [txnId, setTxnId] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const presets = [100, 200, 500, 1000, 2000, 5000];

  const handleSubmit = () => {
    if (!txnId || !amount) return;
    setSubmitted(true);
    setTimeout(() => setStep(3), 500);
  };

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", color: "#e0e0e0", fontWeight: 800, fontSize: "22px", marginBottom: "20px" }}>
        <NeonText>DEPOSIT</NeonText> FUNDS
      </h2>

      {/* Steps */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px", gap: "0" }}>
        {["Amount", "Pay", "Confirm"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: step > i ? "#ff6b00" : step === i + 1 ? "rgba(255,107,0,0.3)" : "rgba(255,255,255,0.05)",
                border: step === i + 1 ? "2px solid #ff6b00" : "2px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: step > i ? "#fff" : step === i + 1 ? "#ff6b00" : "#555",
                fontSize: "12px", fontWeight: 700,
                boxShadow: step === i + 1 ? "0 0 12px rgba(255,107,0,0.5)" : "none",
                transition: "all 0.3s"
              }}>{step > i ? "✓" : i + 1}</div>
              <div style={{ color: step === i + 1 ? "#ff6b00" : "#555", fontSize: "10px", marginTop: "4px" }}>{s}</div>
            </div>
            {i < 2 && <div style={{ height: "1px", flex: 1, background: step > i + 1 ? "#ff6b00" : "rgba(255,255,255,0.1)", marginBottom: "16px" }} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ color: "#888", fontSize: "13px", marginBottom: "12px" }}>Select Amount (₹)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
            {presets.map(p => (
              <button key={p} onClick={() => setAmount(String(p))} style={{
                padding: "12px",
                background: amount === String(p) ? "rgba(255,107,0,0.3)" : "rgba(255,255,255,0.04)",
                border: amount === String(p) ? "1.5px solid #ff6b00" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: amount === String(p) ? "#ff6b00" : "#999",
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: amount === String(p) ? "0 0 12px rgba(255,107,0,0.3)" : "none",
              }}>₹{p}</button>
            ))}
          </div>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Or enter custom amount"
            style={{
              width: "100%",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: "10px",
              color: "#e0e0e0",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "20px",
              fontFamily: "'Exo 2', sans-serif"
            }}
          />
          <OrangeBtn onClick={() => amount && setStep(2)} size="lg" style={{ width: "100%" }}>
            Continue →
          </OrangeBtn>
        </div>
      )}

      {step === 2 && (
        <div>
          <GlassCard style={{ padding: "24px", textAlign: "center", marginBottom: "16px", borderColor: "rgba(255,107,0,0.4)" }}>
            <div style={{ color: "#888", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>PAY VIA UPI</div>
            {/* QR Code SVG */}
            <div style={{
              width: "160px", height: "160px", margin: "0 auto 16px",
              background: "#fff",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px",
              boxShadow: "0 0 30px rgba(255,107,0,0.4)"
            }}>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                {/* QR code pattern */}
                {[
                  [0,0,7,7],[10,0,7,7],[20,0,7,7],[0,10,7,7],[6,6,8,8],[20,10,7,7],[0,20,7,7],[10,20,7,7],[20,20,7,7],
                  [0,30,3,3],[4,30,3,3],[8,30,3,3],[12,30,3,3],[16,28,3,8],[20,30,3,3],[24,30,3,3],[0,34,10,3],[12,34,3,3],
                  [0,38,3,3],[8,38,3,3],[12,38,3,3],[20,38,3,3],[24,38,3,3],[4,42,3,3],[8,42,3,3],[16,40,3,3],[20,42,3,3],
                  [28,0,3,3],[32,0,3,3],[36,0,3,3],[40,2,3,3],[28,6,3,3],[36,4,3,3],[40,8,3,3],[28,10,3,3],[32,8,3,3],[36,10,3,3],
                  [0,46,3,3],[8,44,3,3],[12,46,3,3],[16,46,3,3],[20,46,3,3],[24,44,3,3],
                ].map(([x, y, w, h], i) => (
                  <rect key={i} x={x * 2} y={y * 2} width={w * 2} height={h * 2} fill="#1a1a2e" />
                ))}
                <rect x="0" y="0" width="100" height="100" fill="none" stroke="#1a1a2e" strokeWidth="4" />
              </svg>
            </div>
            <div style={{ color: "#ff6b00", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "16px", marginBottom: "4px" }}>
              riteshhazra@fam
            </div>
            <div style={{ color: "#e0e0e0", fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: "24px" }}>
              ₹{amount}
            </div>
            <div style={{ color: "#555", fontSize: "11px", marginTop: "6px" }}>Send this exact amount via UPI</div>
          </GlassCard>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>Enter Transaction / UTR ID</div>
            <input
              value={txnId}
              onChange={e => setTxnId(e.target.value)}
              placeholder="12-digit UTR ID (e.g. 402812345678)"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,107,0,0.2)",
                borderRadius: "10px",
                color: "#e0e0e0",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Exo 2', sans-serif"
              }}
            />
          </div>
          <OrangeBtn onClick={handleSubmit} size="lg" style={{ width: "100%", marginBottom: "10px" }}>
            Submit Request
          </OrangeBtn>
          <OrangeBtn onClick={() => setStep(1)} size="md" variant="outline" style={{ width: "100%" }}>
            ← Back
          </OrangeBtn>
        </div>
      )}

      {step === 3 && (
        <GlassCard style={{ padding: "40px 24px", textAlign: "center", borderColor: "rgba(0,255,136,0.3)" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px", filter: "drop-shadow(0 0 20px #00ff88)" }}>✓</div>
          <h3 style={{ fontFamily: "'Exo 2', sans-serif", color: "#00ff88", fontWeight: 900, fontSize: "22px", marginBottom: "8px" }}>
            Request Submitted!
          </h3>
          <p style={{ color: "#888", fontSize: "13px", marginBottom: "8px" }}>
            Your deposit of <span style={{ color: "#ff6b00", fontWeight: 700 }}>₹{amount}</span> is under review.
          </p>
          <p style={{ color: "#555", fontSize: "12px", marginBottom: "24px" }}>
            UTR: <span style={{ color: "#aaa" }}>{txnId}</span><br />
            Admin will approve within 30 mins.
          </p>
          <OrangeBtn onClick={() => { setStep(1); setTxnId(""); setAmount(""); }} variant="outline">
            New Deposit
          </OrangeBtn>
        </GlassCard>
      )}
    </div>
  );
}

function GamesPage() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Slots", "Table", "Crash", "Card", "Instant"];
  const filtered = filter === "All" ? GAMES : GAMES.filter(g => g.category === filter);

  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", color: "#e0e0e0", fontWeight: 800, fontSize: "22px", marginBottom: "16px" }}>
        <NeonText>GAME</NeonText> LOBBY
      </h2>

      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "16px", scrollbarWidth: "none" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "8px 16px",
            background: filter === c ? "#ff6b00" : "rgba(255,255,255,0.05)",
            border: filter === c ? "none" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            color: filter === c ? "#fff" : "#888",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: filter === c ? "0 0 16px rgba(255,107,0,0.5)" : "none",
            transition: "all 0.2s"
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filtered.map(game => (
          <GlassCard key={game.id} style={{
            padding: "0",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
            border: game.locked ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,107,0,0.3)",
          }}>
            {/* Game art */}
            <div style={{
              height: "100px",
              background: game.locked
                ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                : "linear-gradient(135deg, rgba(255,107,0,0.25) 0%, #16213e 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              fontSize: "44px",
              filter: game.locked ? "grayscale(0.5) brightness(0.5)" : "none"
            }}>
              {game.img}
              {game.locked && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(2px)"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "24px" }}>🔒</div>
                    <div style={{ color: "#ff6b00", fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", marginTop: "4px" }}>
                      LOCKED
                    </div>
                  </div>
                </div>
              )}
              {!game.locked && (
                <div style={{
                  position: "absolute", top: "8px", right: "8px",
                  background: "#00ff88",
                  color: "#000",
                  fontSize: "9px",
                  fontWeight: 800,
                  padding: "2px 6px",
                  borderRadius: "4px",
                  letterSpacing: "0.05em"
                }}>LIVE</div>
              )}
            </div>
            <div style={{ padding: "12px" }}>
              <div style={{ color: "#e0e0e0", fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{game.name}</div>
              <div style={{ color: "#555", fontSize: "10px", marginBottom: "8px" }}>{game.players} players</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#ff6b00", fontSize: "11px", fontWeight: 700 }}>RTP {game.rtp}</span>
                {game.locked
                  ? <span style={{ color: "#555", fontSize: "10px" }}>₹{game.minDeposit} min</span>
                  : <OrangeBtn size="sm">Play</OrangeBtn>
                }
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard style={{ margin: "20px 0 0", padding: "16px", borderColor: "rgba(255,107,0,0.3)", textAlign: "center" }}>
        <div style={{ color: "#888", fontSize: "12px", marginBottom: "8px" }}>
          🔒 Locked games require a minimum deposit & admin approval
        </div>
        <OrangeBtn size="sm" variant="outline">Request Access</OrangeBtn>
      </GlassCard>
    </div>
  );
}

function ProfilePage() {
  return (
    <div style={{ padding: "24px 16px 100px" }}>
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", color: "#e0e0e0", fontWeight: 800, fontSize: "22px", marginBottom: "20px" }}>
        <NeonText>MY</NeonText> PROFILE
      </h2>

      <GlassCard style={{ padding: "24px", textAlign: "center", marginBottom: "16px", borderColor: "rgba(255,107,0,0.4)" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "linear-gradient(135deg, #ff6b00, #ff9a00)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px",
          fontSize: "28px",
          boxShadow: "0 0 30px rgba(255,107,0,0.5)"
        }}>👤</div>
        <div style={{ color: "#e0e0e0", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "18px" }}>PLAYER_7821</div>
        <div style={{ color: "#ff6b00", fontSize: "12px", fontWeight: 700, marginTop: "4px", letterSpacing: "0.1em" }}>
          ◈ SILVER MEMBER
        </div>
        <div style={{
          display: "inline-block",
          background: "rgba(255,107,0,0.15)",
          border: "1px solid rgba(255,107,0,0.3)",
          borderRadius: "6px",
          padding: "4px 12px",
          color: "#ff6b00",
          fontSize: "11px",
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 700,
          marginTop: "10px",
          letterSpacing: "0.15em"
        }}>ID: #MN7821</div>
      </GlassCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
        {[
          { label: "Days Active", value: "42" },
          { label: "Total Deposits", value: "7" },
          { label: "Games Played", value: "156" },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: "14px 8px", textAlign: "center" }}>
            <div style={{ color: "#ff6b00", fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: "20px" }}>{s.value}</div>
            <div style={{ color: "#555", fontSize: "10px", marginTop: "3px" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          { icon: "🔔", label: "Notifications", sub: "Manage alerts" },
          { icon: "🔐", label: "Security", sub: "Password & 2FA" },
          { icon: "🎁", label: "Referral Program", sub: "Earn ₹100 per referral" },
          { icon: "🏆", label: "Leaderboard", sub: "Rank #247 this week" },
          { icon: "📞", label: "Support", sub: "24/7 chat support" },
        ].map(item => (
          <GlassCard key={item.label} style={{ padding: "14px 16px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e0e0e0", fontSize: "14px", fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#555", fontSize: "11px" }}>{item.sub}</div>
              </div>
              <span style={{ color: "#555" }}>›</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <OrangeBtn variant="outline" style={{ width: "100%", color: "#ff4444", borderColor: "rgba(255,68,68,0.4)" }}>
          Sign Out
        </OrangeBtn>
      </div>
    </div>
  );
}

export default function MoonPayPortal() {
  const [page, setPage] = useState("home");
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }))
  );

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "wallet": return <WalletPage />;
      case "deposit": return <DepositPage />;
      case "games": return <GamesPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d1a; }
        .particle {
          position: absolute;
          background: #ff6b00;
          border-radius: 50%;
          opacity: 0.15;
          animation: float linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0; }
          20% { opacity: 0.2; }
          80% { opacity: 0.1; }
          100% { transform: translateY(-80px) scale(0.5); opacity: 0; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a16 100%)",
        fontFamily: "'Exo 2', sans-serif",
        color: "#e0e0e0",
        position: "relative",
        maxWidth: "480px",
        margin: "0 auto",
        overflow: "hidden",
      }}>
        {/* Background particles */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {particles.map((p, i) => <Particle key={i} style={p} />)}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,107,0,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,107,0,0.03) 0%, transparent 50%)",
          }} />
        </div>

        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(13,13,26,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,107,0,0.1)",
          padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "32px", height: "32px",
              background: "linear-gradient(135deg, #ff6b00, #ff9a00)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px",
              boxShadow: "0 0 16px rgba(255,107,0,0.6)"
            }}>🌙</div>
            <span style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: "18px",
              letterSpacing: "0.05em"
            }}>
              <NeonText>MOON</NeonText>
              <span style={{ color: "#e0e0e0" }}>PAY</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              background: "rgba(255,107,0,0.15)",
              border: "1px solid rgba(255,107,0,0.3)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#ff6b00"
            }}>₹2,450</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {renderPage()}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: "480px",
          background: "rgba(13,13,26,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,107,0,0.15)",
          display: "flex",
          zIndex: 100,
          padding: "8px 0 12px"
        }}>
          {NAV_ITEMS.map(item => {
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                flex: 1,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "4px 0",
              }}>
                <div style={{
                  width: "36px", height: "36px",
                  borderRadius: "10px",
                  background: active ? "rgba(255,107,0,0.2)" : "transparent",
                  border: active ? "1px solid rgba(255,107,0,0.4)" : "1px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                  color: active ? "#ff6b00" : "#555",
                  boxShadow: active ? "0 0 12px rgba(255,107,0,0.3)" : "none",
                  transition: "all 0.2s"
                }}>{item.icon}</div>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: active ? "#ff6b00" : "#444",
                  transition: "color 0.2s"
                }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
