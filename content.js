// In-page, cute, interactive overlay (non-blocking but prominent)
let mounted = false;

chrome.runtime.onMessage.addListener((msg)=>{
  if (msg.type === "OVERLAY") show(msg.tone || "mentor");
});

function show(tone){
  if (mounted) return;
  mounted = true;

  const wrap = document.createElement("div");
  wrap.id = "sq-overlay";
  wrap.innerHTML = `
    <div class="sq-card">
      <h3>👀 Hey</h3>
      <p id="sq-msg"></p>
      <button id="sq-back">Go back to study</button>
      <button id="sq-snooze">Remind me later</button>
      <button id="sq-stay">It’s okay, continue</button>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #sq-overlay{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:999999;
      display:flex;align-items:center;justify-content:center}
    .sq-card{background:#fff;border-radius:16px;padding:18px;width:260px;
      font-family:system-ui;box-shadow:0 12px 30px rgba(0,0,0,.25);text-align:center}
    .sq-card h3{margin:0 0 6px}
    .sq-card p{margin:0 0 10px}
    .sq-card button{width:100%;margin-top:8px;padding:8px;border-radius:10px;border:0;cursor:pointer}
    #sq-back{background:#7c3aed;color:#fff}
    #sq-snooze{background:#fde68a}
    #sq-stay{background:#e5e7eb}
  `;
  document.head.appendChild(style);
  document.body.appendChild(wrap);

  const copy = {
    strict: "Back to task. This matters.",
    mentor: "Small drift happens. Let’s refocus 🌱",
    friend: "Heyyy 👋 wanna go back together?"
  };
  document.getElementById("sq-msg").textContent = copy[tone] || copy.mentor;

  document.getElementById("sq-back").onclick = ()=>{
    chrome.runtime.sendMessage({ type:"BACK" });
    window.location.href = "https://www.google.com";
    cleanup();
  };
  document.getElementById("sq-snooze").onclick = ()=>{
    chrome.runtime.sendMessage({ type:"SNOOZE" });
    cleanup();
  };
  document.getElementById("sq-stay").onclick = ()=>{
    chrome.runtime.sendMessage({ type:"STAY" });
    cleanup();
  };
}

function cleanup(){
  const el = document.getElementById("sq-overlay");
  if (el) el.remove();
  mounted = false;
}