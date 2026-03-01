# StudyQuest

**StudyQuest** is a privacy-first adaptive study companion designed to help students stay focused in highly distracting digital environments.

Instead of blocking websites or passively tracking time, StudyQuest intervenes **at the exact moment distraction occurs** — directly inside the distracting application — and helps the user make a conscious decision about what to do next.

Built as part of the **Airia AI Agents Hackathon**.

---

## ✨ What StudyQuest Does

- Runs autonomously during focus sessions
- Detects visits to user-defined distracting websites
- Shows an **in-context popup inside the distraction**
- Lets the user choose:
  - Go back to studying
  - Snooze the reminder
  - Continue intentionally
- Adapts intervention timing based on repeated behavior
- Keeps humans in the loop at all times

All learning and state management happen **locally on-device**.  
No data is collected, transmitted, or stored externally.

---

## 🧠 Why It’s Different

Traditional productivity tools:
- Block content aggressively
- Rely on guilt or rigid rules
- Focus on time tracking instead of outcomes

StudyQuest:
- Intervenes gently, not forcefully
- Respects user autonomy
- Treats distraction as human, not a failure
- Focuses on awareness and outcomes rather than punishment

---

## 🛠️ How It Works (High Level)

StudyQuest is implemented as a Chrome extension:

- **Background service worker** monitors active tabs during focus sessions
- **Content scripts** inject interactive overlays into distracting pages
- **Popup UI** allows session control, mode selection, and customization
- **Local browser storage** maintains session state and adaptive behavior

The Airia platform is used to **register and publish the agent** for the hackathon, while the actual runtime behavior is demonstrated through a live demo video.

---

## 🔐 Privacy-First by Design

- No accounts
- No cloud services
- No external databases
- No data collection
- No tracking beyond local device storage

All behavior adaptation is simple, explainable, and transparent.

---

## 🧪 Tech Stack

- JavaScript (ES6+)
- HTML5 & CSS3
- Chrome Extensions API (Manifest V3)
- Browser Local Storage (Chrome Storage API)
- Airia Platform (Agent registration & community submission)

---

## 🎥 Demo

A full demonstration video showing real-time agent behavior is included in the hackathon submission.

---

## 📌 Hackathon Context

This project was built for the **Airia AI Agents Hackathon** to explore how AI agents can operate beyond chat interfaces — as autonomous, environment-aware systems that support users in real-world workflows.

---

## 📄 License

This project is provided for educational and hackathon purposes.
