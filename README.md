# 💅 Nail Closet

**A Duolingo-style app that teaches people to do their own nails at home — powered by AI, personalized to what you already own.**

Most at-home nail tutorials assume you already know what you need, what you have, and what to buy. Nail Closet flips that around: it starts from *your* products and *your* skill level, then builds a personalized path to the look you want.

---

## The Vision

Nail Closet is a learning + inventory + AI-assistant app for at-home nail artists. The full idea has a few pillars:

### 🧴 Your Inventory
Scan or add your nail products — polishes, gels, top coats, tools — and the app builds a running inventory of what you own, including each shade's actual color.

### 🤖 AI Nail Assistant
- **Recommends techniques for you.** Scan your natural nails and the AI suggests what suits you best — gel-X vs. builder gel vs. acrylic — and explains why.
- **Turns inspo into steps.** Upload a design you love (or pull it from Pinterest), and the AI breaks it into a step-by-step plan: which base color, which gel, matte vs. glossy top coat, and the order to do it in — with AI-generated images for each step so you can follow along mid-manicure.
- **Works with what you have.** The AI matches a look against your inventory and tells you how to get as close as possible with the products you already own, and what (if anything) you'd need to buy.

### 📚 Personalized Learning Path
A Duolingo-style progression that meets you where you are:
- Tells you the essentials you need to start
- Connects each skill to hand-picked YouTube and TikTok tutorials so you learn one thing at a time
- Mixes in short text tips and tricks between lessons

### 🛒 Shopping & Inspiration Integrations
- **Pinterest** — connect your nail boards so the app learns your style
- **Amazon & other retailers** — buy the products a look or lesson calls for, in a couple of taps

---

## Where This Is Right Now

This is an early-stage project being built one piece at a time. The current focus is the **foundation**: a working inventory plus AI assistance for design inspiration. The learning system, scanning, and shopping integrations come later.

**Built so far**
- ✅ Running React Native (Expo) app on iOS
- ✅ Home screen ("My Nail Closet")

**In progress / next up**
- ⏳ Manual product inventory (add a polish, see it in a list)
- ⏳ Color matching — find your closest shades to a target design
- ⏳ AI inspo assistant — turn a picture into steps using your inventory

**Planned**
- 📋 Product scanning (barcode + label/color recognition)
- 📋 Pinterest style learning
- 📋 Personalized learning path with curated video tutorials
- 📋 AI technique recommendations from a nail scan
- 📋 AI-generated step-by-step design guides
- 📋 Shopping integrations (Amazon and others)

---

## Tech Stack

- **Framework:** React Native via [Expo](https://expo.dev/) (SDK 54)
- **Language:** TypeScript
- **Routing:** Expo Router
- **Platform:** iOS (Android to follow)

---

## Running It Locally

You'll need [Node.js](https://nodejs.org/) (LTS) and the **Expo Go** app on your phone.

```bash
# install dependencies
npm install

# start the development server
npx expo start
```

Then scan the QR code with your iPhone's Camera app to open the project in Expo Go.

---

## Project Structure

```
nailapp/
├── src/
│   └── app/
│       ├── _layout.tsx    # App frame — holds all screens
│       └── index.tsx      # Home screen
├── assets/                # Images, fonts, icons
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

---

## Status

🚧 **Early development** — building the core inventory and AI inspo features first, then expanding toward the full learning app.

---

*Made for at-home nail artists who want to learn, not just follow.*