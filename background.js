// Agent brain: persistence, decisions, learning, notifications
importScripts("state.js");

let timer = null;

function clearTimer(){ if (timer){ clearTimeout(timer); timer=null; } }

function getAll(cb){
  chrome.storage.sync.get(DEFAULTS, cb);
}

function set(patch){ chrome.storage.sync.set(patch); }

function adaptiveDelay(site, base, learning){
  const p = learning[site];
  if (!p || p.count < 3) return base;
  // honest adaptation: up to 50% faster after repeated distractions
  const factor = clamp(1 - p.count * 0.12, 0.5, 1);
  return Math.max(1500, Math.round(base * factor));
}

function learn(site, ms){
  getAll(d=>{
    const l = d.learning;
    if (!l[site]) l[site] = { count: 0, avgMs: ms };
    l[site].count += 1;
    l[site].avgMs = Math.round((l[site].avgMs + ms)/2);
    set({ learning: l });
  });
}

function notifyFallback(message){
  chrome.notifications.create({
    type: "basic",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
    title: "StudyQuest",
    message,
    priority: 2,
    buttons: [
      { title: "Go back to study" },
      { title: "Snooze 10 min" },
      { title: "Continue anyway" }
    ]
  });
}

chrome.notifications.onButtonClicked.addListener((_, idx)=>{
  getAll(d=>{
    if (idx === 0) set({ automaticCount: d.automaticCount+1 });
    if (idx === 1) set({ snoozedUntil: Date.now() + 10*60*1000 });
    if (idx === 2) set({ intentionalCount: d.intentionalCount+1 });
  });
});

chrome.runtime.onMessage.addListener((msg)=>{
  if (msg.type === "START"){
    set({
      sessionActive: true,
      sessionStart: Date.now(),
      distractionCount: 0,
      intentionalCount: 0,
      automaticCount: 0
    });
  }
  if (msg.type === "STOP"){
    clearTimer();
    set({ sessionActive: false });
  }
});

// Observe tabs
chrome.tabs.onUpdated.addListener((tabId, info, tab)=>{
  if (info.status !== "complete") return;

  getAll(d=>{
    if (!d.sessionActive) return;
    if (Date.now() < d.snoozedUntil) return;

    clearTimer();

    if (isDistraction(tab.url, d.distractionSites)){
      const modeCfg = MODES[d.mode] || MODES.deep;
      const site = new URL(tab.url).hostname;
      const delay = adaptiveDelay(site, modeCfg.baseDelay, d.learning);

      timer = setTimeout(()=>{
        set({ distractionCount: d.distractionCount+1 });
        // Ask content script first (best UX)
        chrome.tabs.sendMessage(tabId, {
          type: "OVERLAY",
          tone: modeCfg.tone
        }, ()=>{
          // fallback if content script unavailable
          notifyFallback("Mind wandered? Want to refocus together 🌱");
        });
      }, delay);
    }
  });
});

// Learn when leaving a tab
chrome.tabs.onActivated.addListener(async (info)=>{
  getAll(d=>{
    if (!d.sessionActive || !d.sessionStart) return;
    chrome.tabs.get(info.tabId, tab=>{
      if (!tab?.url) return;
      const site = new URL(tab.url).hostname;
      const ms = Date.now() - d.sessionStart;
      learn(site, ms);
    });
  });
});