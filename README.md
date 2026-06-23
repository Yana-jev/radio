# Focus Room 🎧✨

A minimalist focus ambience website built with **Angular**. It features a beautiful, audio-reactive particle sphere on an HTML5 Canvas and a custom background noise mixer.

Designed to help users relax, study, or lock into deep focus with cozy sounds and smooth visuals.

---

## 🚀 Live Demo
*Link your deployed website here (e.g., Vercel / Netlify)*
> **Live Link:** 
---

## 🛠️ Tech Stack

* **Framework:** Angular (v17+)
* **State Management:** Angular Signals (for fast and modern reactive updates)
* **Graphics:** HTML5 Canvas API (2D)
* **Styling:** CSS Variables (for smooth Light/Dark theme switching)

---

## 🌟 Key Features

### 1. Audio-Reactive Particle Animation
The central sphere has 250 small particles ("atoms") animated at 60 FPS using `requestAnimationFrame`.
* **Pause Mode:** Particles move very slowly and lazy in random directions.
* **Music Mode (Vortex Effect):** When music plays, particles are pulled toward the center. By swapping X and Y values in the speed formula, they turn 90 degrees and start spinning, creating a beautiful whirlpool effect.
* **Smart Speed:** Particles spin much faster when they get closer to the center, making the vortex look alive and natural.
* **Screen Borders:** If a particle flies outside the 135px circle, the code smoothly teleports it back and bounces it inward like a soft rubber ball.

### 2. Audio Engine & Lazy Loading
The sound dashboard lets you mix different background ambient noises (like Rain, Campfire, or White Noise).
* **Traffic Saving (Lazy Loading):** Audio files are downloaded *only* when the user moves that specific sound slider for the first time. This saves the user's internet data and computer memory.
* **Angular Signals:** Volume changes are perfectly synchronized between the UI sliders and the browser audio player.

### 3. Light & Dark Themes
You can easily switch between Light and Dark modes. The particles instantly change their color (Slate-Grey for light mode, Neon-Purple for dark mode) while keeping their smooth twinkling effect.

---

## 📦 How to Run Locally

Make sure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/focus-room.git](https://github.com/your-username/focus-room.git)
   cd focus-room
   npm install
   ng serve
   ng build
