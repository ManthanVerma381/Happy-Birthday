# ✨ Interactive Birthday Experience Website ✨

A private, interactive digital birthday storybook, love letter, and celebration website crafted with React, Vite, Framer Motion, and Web Audio API.

---

## 🌟 Features Included

- **Magical Intro Screen**: Starry animated background with a mysterious teaser & particle burst button.
- **Cinematic Typewriter Sequence**: Softly typed birthday note with a blinking cursor and skip controls.
- **Interactive 3D Birthday Cake**: Layered cake with candles that light up on tap, blow out via microphone or tap fallback, smoke particles, and confetti!
- **Scroll-Driven Timeline**: Relationship story and memory cards with vertical spine animation and image glassmorphism.
- **Masonry Photo Gallery & Lightbox**: Responsive photo layout with full-screen zoom, keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`), and missing photo SVG fallback support.
- **Open When... Envelopes**: Interactive gift envelopes that open with 3D sliding paper letters and romantic notes.
- **Catch The Hearts Mini-Game**: Interactive falling heart game with timer, score tracking, celebration bursts, and unlockable custom rewards.
- **Reasons I Love You**: 3D flip cards revealing reasons, numbers, and custom icons.
- **Final Handwritten Letter**: Parchment card aesthetic with handwritten typography and soft ambient glow.
- **Surprise Reveal Gift Box**: Glowing 3D gift box with particle light burst on click to reveal real-world gift clues.
- **Seamless Replay**: Instantly resets the entire experience state while maintaining audio mute preferences.
- **Audio Synthesizer Engine**: Web Audio API sound generator that plays chimes, pops, and fanfares automatically even if external audio files are missing!

---

## 🚀 Quick Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ⚙️ How To Customize Everything

ALL personalized content is centrally configured in a single file:

```
src/config/birthdayConfig.js
```

### What You Can Edit:

1. **Her Details**:
   - `girlfriendName`: Her name or nickname.
   - `myName`: Your name or what she calls you.
   - `birthday`: Her birthday date (e.g. `"October 15"`).
   - `age`: The age she is turning.

2. **Colors & Visual Theme**:
   - `theme.favoriteColors`: Hex codes matching her favorite colors.
   - `theme.primaryColor`, `accentColor`, `backgroundColor`, etc.

3. **Memories & Story**:
   - `story`: Paragraph describing how you met or your story together.
   - `memories`: Array of 3 core inside jokes or special memories.
   - `personality`: 3 words describing her personality.

4. **Relationship Timeline**:
   - Add as many timeline objects as you like inside the `timeline` array:
     ```js
     {
       title: "The Rainy Car Conversation",
       date: "October 2023",
       description: "We talked for 4 hours until the windows fogged up...",
       image: "/assets/photos/photo3.jpg",
       caption: "Best conversation ever 🌧️"
     }
     ```

5. **Open When... Letters**:
   - Customize or add new envelopes inside `openWhenMessages`.

6. **Reasons I Love You**:
   - Customize cards inside `reasonsILoveYou`.

7. **Final Letter & Surprise**:
   - Edit `finalLetter` text for your handwritten note.
   - Edit `surpriseReveal` for the final gift box message.

---

## 🖼️ Adding Photos & Music Assets

Place your media files in the `public/assets/` directory:

- **Photos**: Place image files inside `/public/assets/photos/` (e.g., `photo1.jpg`, `photo2.jpg`).
- **Background Music**: Place an MP3 file inside `/public/assets/music/birthday.mp3`.
- **Automatic Fallbacks**: If photos or music are missing, the website automatically generates aesthetic SVG cards and Web Audio synthesized sound effects so it never looks broken!

---

## 🌐 Deploying To Netlify or Vercel

### Option 1: Netlify (Free & Fast)
1. Push your project code to a [GitHub](https://github.com) repository.
2. Log into [Netlify](https://www.netlify.com/) and click **Add New Site** -> **Import an existing project**.
3. Connect to GitHub and choose your birthday repository.
4. Set **Build command**: `npm run build`
5. Set **Publish directory**: `dist`
6. Click **Deploy Site**! Copy the generated link and share it with her! ✨

### Option 2: Vercel (Free & Instant)
1. Push your project code to GitHub.
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository. Vercel automatically detects Vite.
4. Click **Deploy**!

---

Made with ❤️ for a unforgettable birthday surprise!
