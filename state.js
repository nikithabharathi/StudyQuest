// state.js — shared constants (NO exports)

const MODES = {
  exam:  { baseDelay: 2000, tone: "strict" },
  deep:  { baseDelay: 4000, tone: "mentor" },
  chill: { baseDelay: 7000, tone: "friend" }
};

const DEFAULTS = {
  sessionActive: false,
  mode: "deep",
  distractionSites: ["youtube.com", "instagram.com", "twitter.com"],
  snoozedUntil: 0,
  goalText: "",
  sessionStart: null,
  distractionCount: 0,
  intentionalCount: 0,
  automaticCount: 0,
  learning: {}
};

const TONES = {
  strict: [
    "Focus. This matters.",
    "Back to task. You’ve got this.",
    "Short break later. Focus now."
  ],
  mentor: [
    "Hey—small drift happens. Let’s refocus 🌱",
    "You’re doing well. Back to the task?",
    "One more stretch of focus 🌱"
  ],
  friend: [
    "Heyyy 👀 mind wandered?",
    "No stress—wanna go back together?",
    "Tiny refocus = big win ✨"
  ]
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isDistraction(url, sites) {
  if (!url) return false;
  return sites.some(s => url.includes(s));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}