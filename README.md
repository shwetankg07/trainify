# Trainify ⚡

![Gym Vibes](https://img.shields.io/badge/Status-Gains_Loading...-success)
![Tech Stack](https://img.shields.io/badge/Stack-HTML_|_CSS_|_JS-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> "The only bad workout is the one that didn't happen... or the one you didn't log."

**Trainify** is a lightweight, premium-styled workout tracker designed for lifters who are tired of complicated apps and monthly subscriptions. It replaces your Notes app with a sleek, glassmorphism UI that tracks your routines, logs your lifts, and compares your stats against global benchmarks.

---

# Problem Statement

Many fitness apps are bloated with features you don't need or locked behind paywalls and logins. On the other hand, using a simple Notes app lacks structure and data visualization.

**The Solution:** I built a tool for lifters who want to stop guessing and start tracking. No logins, no cloud subscriptions—just a sleek interface to track the gains.

---

# Features Implemented

### 1. **Plan Your Split 📝**
Create custom routines (e.g., "Push Day", "Leg Day (Pain)").
* **Dynamic:** Add as many exercises as you want.
* **Persistent:** Saves everything to Local Storage (no login required).

### 2. **Track the Gains 🏋️‍♂️**
Log your weights and reps in real-time.
* **Smart Inputs:** Prevents negative numbers (because negative gains aren't real).
* **Visual Feedback:** Smooth animations and clean layouts.

### 3. **The Analytics Dashboard 📊**
Visualize your progress with **Chart.js**.
* **Comparison Engine:** Compare your BMI, Duration, and Frequency against 900+ real gym members.
* **Glow-Up Charts:** Neon gradients and bouncing animations because data should look cool.
---

# DOM Concepts Used

To bring this app to life, we utilized the following Core DOM & Web APIs:

* **`document.createElement` & `appendChild`:** Used to dynamically generate exercise cards and inputs when you select a routine.
* **`localStorage` API:** Used to save your Routines and History so they persist after a refresh.
* **`addEventListener`:** Handles user interactions like the "Finish Workout" button and Input validation.
* **`canvas` Context (2D):** Used to render the Chart.js visualizations.

*(Original Tech Stack Context)*:
* **HTML5:** The skeleton (strong bones).
* **CSS3:** Custom Variables, Glassmorphism, Animations, Responsive Grid.
* **JavaScript (ES6):** LocalStorage logic, DOM manipulation, Charting logic.
* **Chart.js:** For the beautiful data visualization.

---

# Steps to run the project

1.  **Clone the repo:**(just use the deployed link)
    ```bash
    git clone [https://github.com/yourusername/trainify.git](https://github.com/yourusername/trainify.git)
    ```
2.  **Navigate to the folder:**
    ```bash
    cd trainify
    ```
3.  **Open the App:**
    * Open `index.html` in your browser.
    * *Pro Tip:* use the deployed link, ugh

---

# Known limitations (if any)

1.  **Device Sync:** Since we use `localStorage` for privacy and speed, your data lives on your device. It won't sync between your phone and laptop.
2.  **Browser Cache:** If you clear your browser history/cache, you will lose your gains (data-wise, not muscle-wise).

---

# 🧬 Gym Culture & Lore (Bonus)

We believe in the fundamentals:
1.  **Monday is International Chest Day.** (The code knows this).
2.  **Cardio?** We track it, but we don't have to like it.
3.  **The "Pre-Workout" Bug:** If the code crashes, it just needs more caffeine.

> *"Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights."* — Ronnie Coleman

---

# 🤝 Contributing

Pull Requests (PRs) are welcome.
* **Found a bug?** Open an issue.
* **Hit a new Personal Record (PR)?** Put it in the comments, we'll hype you up.

---

Made with ❤️ and ☕ by **Shwetank**
