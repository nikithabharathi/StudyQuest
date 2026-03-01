const $ = id => document.getElementById(id);

chrome.storage.sync.get(
  {
    sessionActive:false, mode:"deep", distractionSites:[],
    goalText:"", sessionStart:null,
    distractionCount:0, intentionalCount:0, automaticCount:0, learning:{}
  },
  d=>{
    $("status").textContent = d.sessionActive ? "Active" : "Idle";
    $("mode").value = d.mode;
    $("sites").value = d.distractionSites.join(", ");
    $("goal").value = d.goalText;

    if (d.sessionStart){
      const mins = Math.max(1, Math.floor((Date.now()-d.sessionStart)/60000));
      const top = Object.entries(d.learning)[0];
      $("summary").textContent =
        `You showed up today. ${mins} min focused.
Distractions: ${d.distractionCount}.
${top ? `Most distracting: ${top[0]} (~${Math.floor(top[1].avgMs/60000)} min)` : ""}`;
    }
  }
);

$("start").onclick = ()=>{
  chrome.runtime.sendMessage({ type:"START" });
  $("status").textContent = "Active";
};

$("stop").onclick = ()=>{
  chrome.runtime.sendMessage({ type:"STOP" });
  $("status").textContent = "Idle";
};

$("save").onclick = ()=>{
  chrome.storage.sync.set({
    mode: $("mode").value,
    distractionSites: $("sites").value.split(",").map(s=>s.trim()).filter(Boolean),
    goalText: $("goal").value
  });
  alert("Saved");
};