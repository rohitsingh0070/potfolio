# Royal · Strike Flow Portfolio (React + Vite)

A high-fidelity personal portfolio web application inspired by the iconic aesthetic and interactive experience of **[strike.uno](https://strike.uno/)**.

Built with **React**, **Vite**, **Vanilla CSS**, and **Web Audio API**.

---

## 🎧 Features & Highlights

- **Street & Vinyl Culture Design**: Authentic dark mode (`#0b0d12`), ribbed garage roller shutter textures, neon tape strips (`#e9ff2e`, `#22d3ff`, `#ff3d8b`, `#3dff8a`, `#ff3b24`), and vintage paper cards.
- **Custom Typography**: Handcrafted typography pairing Google's **Bungee** (bold display), **Permanent Marker** (street tags), **Archivo** (clean body), and **Space Grotesk** (technical data).
- **Web Audio Engine**: 100% self-contained synthesized sounds using the Web Audio API (zero external audio files or network lag):
  - Vinyl needle drop & crackle
  - DJ scratch & scrub effects
  - Mechanical clunk for the rolling shutter menu
  - Tactile button clicks & spray can rattle
  - FX toggle with live status indicator
- **Interactive DJ Turntable Deck (A2 · Trayectoria)**:
  - Spinning vinyl platter with center label synchronized with active track
  - Animated tonearm that moves onto the record on Play
  - 33 / 45 RPM speed selectors, pitch fader, and playback controls
  - 6 career tracks (Cassette layout: A1 to B4) with detailed achievements and KPI inspector
- **Draggable Stickers Wall (B1 · Skills)**:
  - 15 skill stickers with real HTML5 / Pointer Drag & Drop physics
  - Pick up stickers, drag them anywhere across the graffiti wall, and stack them
  - One-click "Reordenar stickers" reset button
- **Diggin' in the Crates (B2 · Formación)**:
  - Interactive vinyl record crate browser
  - Vintage LP jackets where the vinyl disc slides out of the cardboard sleeve
- **Three Singles, Side A (B3 · Artículos)**:
  - 45 RPM vinyl single format for Medium articles
- **Street Tag Wall & Contact (Outro · Contacto)**:
  - Quick-copy email with toast notification & celebratory confetti
  - WhatsApp direct link
  - Interactive **"Deja tu tag en el muro"**: Visitors can type their handle, pick a spray color, and spray their tag onto the wall with real audio effects!
- **Floating Controls**:
  - Miniature spinning vinyl disc with conic scroll progress and active track identifier in bottom-left
  - Floating back-to-top yellow sticker button in bottom-right
  - Bilingual switcher (**ES** / **EN**) in navbar

---

## 🚀 Getting Started

The development server is already set up and running:

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application runs locally at `http://localhost:5173/`.

---

## 🛠️ How to Customize Your Details

All portfolio content is centralized and cleanly organized in:
👉 [`src/data/portfolioData.js`](file:///c:/Users/royal/Desktop/Potfolio/src/data/portfolioData.js)

You can easily modify:
- **`hero`**: Your name, moniker, title, subtitle, bio, and LED ticker metrics
- **`previa`**: Your executive philosophy, pillars, and consulting services
- **`trayectoria`**: Your work history tracks (roles, companies, dates, achievements, and tags)
- **`portafolio`**: Featured projects, Behance/GitHub URLs, and metrics
- **`skills`**: Your core competencies and sticker colors
- **`formacion`**: Your degrees, certifications, and institutions
- **`articulos`**: Your articles and publications
- **`contacto`**: Your email, phone, and social handles
