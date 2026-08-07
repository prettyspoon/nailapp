# 📝 Decisions, Compromises & Things to Revisit

A running list of shortcuts, workarounds, and "good enough for now" choices made while building Nail Closet. Each one is fine for the current stage — this file just makes sure none of them get forgotten when it's time to level up.

Format: what we did → why → what to revisit later.

---

## 🎨 Color Picker

**What we did:** Using `reanimated-color-picker` (a pure-JavaScript spectrum picker).

**Why:** It works inside Expo Go with no development build required, so we stay in the easy live-preview workflow.

**Revisit later:** Swap in Apple's native iOS color picker (`react-native-color-picker-ios` / `UIColorPickerViewController`, the one with Grid / Spectrum / Sliders tabs + eyedropper). It's a native module, so it requires switching from Expo Go to a **development build** first. Both pickers return a hex, so the swap itself is small once we're on dev builds.

---

## 📷 Camera Color Capture (photo → color)

**What we did:** Deferred. Plan is: snap/pick a photo → crop to the polish → extract the dominant color.

**Why:** Exact "tap one pixel" eyedropper libraries are native modules that don't run in Expo Go. The pure-JS dominant-color approach (`react-native-image-colors`) may also need testing to confirm it runs in Expo Go.

**Revisit later:** Build the photo + crop + dominant-color flow. Confirm whether the color-extraction library runs in Expo Go or needs a dev build. This shares the camera work with barcode scanning.

---

## 🔎 Barcode Scanning → Product Lookup

**What we did:** Planned to use the free **Open Beauty Facts** API to turn a scanned barcode into brand + product name.

**Why:** It's free, needs no API key, and is beauty-specific.

**Revisit later:** Coverage is community-built and patchy for nail polish — expect frequent "product not found," especially on smaller brands. Consider: (a) building/scraping our own polish barcode list over time, or (b) using AI to read the *label text* (brand + shade name) off the bottle instead of relying on the barcode number, which is more reliable.

---

## 💾 Data Storage

**What we did:** Inventory saves on-device using **AsyncStorage** (local to the phone).

**Why:** Simple, free, offline, no accounts needed — enough to make the app usable for one person.

**Revisit later:** Move to a real cloud database (planned: **Supabase**, which also provides login). Needed for user accounts, syncing across devices, and anything involving AI or multiple users. When we build the database schema, make sure the "polish" shape is final first (brand, shade, type, color, + whatever else) so we don't have to restructure the table.

---

## 👤 Login / Accounts

**What we did:** Deferred. No login yet.

**Why:** Chose to nail down the inventory + color foundation first, since login is tied to the cloud database and the "polish" data shape.

**Revisit later:** Set up Supabase Auth (login) alongside the Supabase database, as one focused session.

---

## 🤖 AI Features (the big vision pieces)

**What we did:** Deferred all of them — technique recommendations from a nail scan, turning inspo photos into step-by-step guides, AI-generated step images, personalized learning path, Pinterest style-learning, shopping integrations.

**Why:** These sit on top of the foundation (inventory, color, accounts) and need that in place first.

**Revisit later:** Build once the foundation is solid. The "inspo photo → steps using your inventory" feature is the core differentiator and a good first AI feature to tackle.

---

## 🚀 Deployment

**What we did:** Running in Expo Go for development only.

**Why:** Fastest way to build and test.

**Revisit later:** To ship to the App Store: (1) move to a **development build**, (2) use **EAS** to make a production build and submit, (3) get an **Apple Developer account ($99/year)**, (4) add a privacy policy and pass Apple's App Review. The dev-build switch also unlocks the native Apple color picker, so these graduations happen together.

---

## 🧹 Housekeeping / Misc

- **SDK version:** Locked to Expo **SDK 54** (not the newest 57) because the App Store version of Expo Go only supports 54 right now. Revisit when Expo Go catches up.
- Removed stray macOS duplicate folders (`app 2`, `components 2`, etc.) — watch for these reappearing after Finder copies.

---

*Add to this list whenever we take a shortcut or say "we'll do the nicer version later."*