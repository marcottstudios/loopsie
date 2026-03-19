# Loopsie - Build Steps (DEPRECATED)

> **This document is deprecated.** All 15 MVP steps and post-MVP enhancements have been completed. This file is kept for historical reference only. Do not use it to guide future development.

---

## All Steps Complete — MVP DONE

---

## Build Rules

- Do not move to the next step until the current step works
- Do not add extra features outside the current step
- Keep mobile-first layout throughout
- Test on a real phone early, not just desktop browser
- Verify the current step on mobile viewport before committing
- Commit after every completed step
- If a step reveals a missing dependency, update this doc before continuing

---

## Non-Goals for MVP

- No accounts or login
- No cross-device sync
- No speech scoring or pronunciation AI
- No social features or leaderboards
- No grammar drills
- No human recordings yet (using AI TTS)
- No chatbot or conversation simulation

---

## Testing Strategy

Manual QA only for MVP.

Do not add a test framework or write automated tests.

---

## Tech Stack (pinned versions)

- React 19
- Vite 6
- TypeScript 5.x
- Tailwind CSS 4 (uses CSS-based config via @theme in src/index.css, NOT tailwind.config.js)
- Zustand 5
- Dexie 4
- React Router 7
- Lucide React (latest)
- vite-plugin-pwa (latest)

---

## Folder Structure

```
src/
  components/     # Reusable UI components (PhraseCard, AudioPlayer, etc.)
  pages/          # Route-level page components (one per route)
  data/           # Phrase data, lesson definitions, categories, situations
  stores/         # Zustand stores (runtime state only)
  hooks/          # Custom React hooks
  lib/            # AudioEngine, Dexie db setup, utilities
  types/          # TypeScript type definitions

public/
  audio/en/       # English MP3s (filename = phrase ID)
  audio/pt/       # Portuguese MP3s — masculine voice for gendered phrases (filename = phrase ID)
  audio/pt-fem/   # Portuguese feminine variant MP3s — female voice (filename = phrase ID)
  icons/          # PWA icons

scripts/          # Audio generation script
```

---

## Routes

```
/                 → HomePage (dashboard)
/lesson/:id       → LessonPlayerPage
/lesson/:id/complete → LessonCompletePage
/loop             → LoopSetupPage
/loop/play        → LoopPlayerPage
/browse           → BrowsePage (filter + list)
/review           → ReviewPage
/favorites        → FavoritesPage
/settings         → SettingsPage
```

---

## Type Shapes

These are the exact field names to use everywhere.

### Phrase (static, read-only, in src/data/)

```
id:              string        "greet-001"
en:              string        "Good morning"
pt:              string        "Bom dia"
ptPhonetic:      string?       "bohm DEE-ah"
ptFem:           string?       "Obrigada" (feminine variant, only for gendered phrases)
ptFemPhonetic:   string?       "oh-bree-GAH-dah"
lengthBand:      LengthBand    "1-word" | "2-word" | "3-word" | "short-phrase" | "pattern"
category:        Category      (see taxonomy below)
situations:      Situation[]   (see taxonomy below)
difficulty:      Difficulty    "beginner" | "beginner-plus" | "intermediate"
lessonId:        string?
sortOrder:       number
```

**Audio filename rule:** Audio filename always equals the phrase `id`.

- English: `public/audio/en/{id}.mp3`
- Portuguese (masculine / default): `public/audio/pt/{id}.mp3`
- Portuguese (feminine variant): `public/audio/pt-fem/{id}.mp3` (only exists when `ptFem` is set)

No separate audioKey fields. The id IS the audio key.

**Gendered phrases:** Some Portuguese phrases change based on the speaker's gender (e.g. "obrigado" vs "obrigada"). These are stored with both forms and played with distinct voices:

- Masculine form (`pt`) uses male voice: `pt-PT-Wavenet-B`
- Feminine form (`ptFem`) uses female voice: `pt-PT-Wavenet-A`
- PhraseCard displays both forms side by side with masc./fem. labels
- Audio sequence includes both: EN → PT (male) → PT-FEM (female)
- Non-gendered phrases use the female voice by default

**Current gendered phrases:**

- polite-002: Obrigado / Obrigada (Thank you)
- polite-008: Muito obrigado / Muito obrigada (Thank you very much)
- greet-006: Estou bem, obrigado / Estou bem, obrigada (I'm fine, thank you)
- feel-011: Estou perdido / Estou perdida (I'm lost)
- feel-012: Estou cansado / Estou cansada (I'm tired)

### Lesson (static, read-only, in src/data/)

```
id:              string        "lesson-001"
unitId:          string        "unit-1"
title:           string        "Greeting Phrases"
description:     string
phraseIds:       string[]      ordered list of phrase IDs
category:        Category
difficulty:      Difficulty
lengthBandFocus: LengthBand
sortOrder:       number
```

### PhraseProgress (persisted in Dexie/IndexedDB)

```
phraseId:        string
timesPlayed:     number        incremented each time audio plays in lesson or single mode
isFavorite:      boolean
lastPracticedAt: number | null    (unix timestamp)
reviewDueAt:     number | null    (unix timestamp, null = no review scheduled)
```

**Review logic uses only `reviewDueAt`:**

- `reviewDueAt` is null → phrase has no review scheduled
- `reviewDueAt` is in the past or today → phrase appears in review page
- `reviewDueAt` is in the future → phrase is scheduled but not due yet

No separate `needsReview` boolean. One source of truth.

### UserSettings (persisted in Dexie/IndexedDB)

```
playbackTemplate: "full" | "standard" | "pt-only"
speed:            0.75 | 1.0        (exactly two options, no others)
pauseDuration:    "short" | "medium" | "long"
showPhonetics:    boolean
darkMode:         boolean
onboardingDone:   boolean
```

**Speed options are exactly 0.75 and 1.0. Do not add 0.5 or 1.25.**

---

## State Management Boundaries

**Dexie (IndexedDB) - persisted across sessions:**

- PhraseProgress (per-phrase learning state)
- UserSettings (playback prefs, dark mode, onboarding flag)

**Zustand (runtime only - lost on refresh is OK):**

- Current lesson state (active lesson ID, current phrase index)
- Audio playback state (playing, paused, current template step)
- Active browse filters
- Loop queue and position

**Static imports (read-only, baked into bundle):**

- Phrases (src/data/content.ts)
- Lessons (src/data/lessons.ts)
- Categories (src/data/categories.ts)
- Situations (src/data/situations.ts)

---

## Content Taxonomy

### Categories

- greetings
- politeness
- numbers
- food-drink
- family
- directions
- shopping
- travel
- home
- feelings-needs
- emergency
- time-dates

### Situations

- at-a-cafe
- at-a-restaurant
- in-a-shop
- meeting-people
- asking-directions
- at-the-airport
- at-home
- at-the-doctor
- emergency-help
- general

### Length Bands

- 1-word
- 2-word
- 3-word
- short-phrase
- pattern

### Difficulty Levels

- beginner
- beginner-plus
- intermediate

---

## Empty States

Every page that can be empty must show a clear message. No blank screens.

```
Review page (0 items):     "No phrases to review yet. Complete a lesson to get started."
Favorites page (0 items):  "No favorites yet. Tap the heart icon on any phrase to save it."
Loop setup (empty source):  "No phrases in this set. Choose a different source."
Browse (0 filter results):  "No phrases match these filters. Try removing a filter."
Home (no progress yet):     Hide "Continue lesson" card. Show "Start your first lesson" instead.
```

---

## Design Tokens

### Colors (Tailwind classes)

```
primary:     slate-700
accent:      teal-500
background:  stone-50   (light)  /  slate-900  (dark)
card:        white      (light)  /  slate-800  (dark)
text:        slate-800  (light)  /  stone-100  (dark)
muted text:  slate-400  (light)  /  slate-500  (dark)
success:     emerald-500
warning:     amber-500
border:      slate-200  (light)  /  slate-700  (dark)
```

### Sizing

```
card border radius:   rounded-xl (12px)
button border radius: rounded-lg (8px)
bottom nav height:    64px (h-16)
header height:        56px (h-14)
page padding:         px-4
card padding:         p-4
gap between cards:    gap-3
```

### Typography

```
page title:      text-xl font-semibold
card title:      text-lg font-medium
portuguese text: text-2xl font-semibold (large, prominent)
english text:    text-base text-slate-500 (smaller, muted)
phonetic text:   text-sm italic text-slate-400
button text:     text-sm font-medium
```

---

---

## Step 1 - Project Setup — COMPLETED

**What we did:**

- Created the Vite + React + TypeScript project
- Installed all pinned dependencies (see Tech Stack above)
- Set up Tailwind CSS 4 with the design tokens above (CSS-based @theme in src/index.css)
- Set up the PWA config via vite-plugin-pwa
- Created .gitignore (includes .env, node_modules, dist)
- Created .env.example with API key placeholders

---

---

## Step 2 - Data Layer — COMPLETED

**What we did:**

- Created all TypeScript types in src/types/ using the exact Type Shapes above
- Created 208 phrases across 12 categories, 24 lessons, 5 units in src/data/content.ts
- Created lesson definitions in src/data/lessons.ts
- Created category and situation metadata in src/data/categories.ts and src/data/situations.ts

---

---

## Step 3 - Layout and Routing — COMPLETED

**What we did:**

- Created the AppShell (main wrapper with header + bottom nav + content area)
- Created the BottomNav (mobile navigation bar)
- Created the Header
- Set up React Router with all routes
- Created stub pages for every route

---

---

## Step 4 - Home Screen — COMPLETED

**What we did:**

- Built the home dashboard in HomePage
- Added entry point cards: Continue Lesson, Loop Mode, Browse, Review, Favorites
- Wired up navigation from home to each section
- Handled empty state for first-time users

---

---

## Step 5 - Phrase Card and Lesson Player UI — COMPLETED

**What we did:**

- Built the PhraseCard component (shows English + Portuguese text, with gendered variant support)
- Built audio control buttons (play, slow, next, previous)
- Built the lesson progress bar
- Wired up with lesson phrase data
- PhraseCard shows both masculine/feminine forms side by side for gendered phrases

---

---

## Step 6 - Audio Generation Script — COMPLETED

**What we did:**

- Wrote scripts/generate-audio.ts using **Google Cloud TTS** (not OpenAI — switched due to rate limits)
- Generated 416 base audio files (208 EN + 208 PT) plus 5 feminine variant files (421 total)
- Uses pt-PT-Wavenet-B (male) for masculine gendered phrases, pt-PT-Wavenet-A (female) for feminine and non-gendered
- English voice: en-US-Wavenet-F
- Script supports `--force` flag to regenerate all files
- Script auto-detects `ptFem` field for feminine variant generation
- Requires GOOGLE_TTS_API_KEY in .env file

---

---

## Step 7 - Audio Engine — COMPLETED

**What we did:**

- Built the AudioEngine in src/lib/AudioEngine.ts
- Supports configurable playback templates: full, standard, pt-only
- Uses singleton Audio element to maintain user-gesture permission on mobile (iOS Safari fix)
- Supports gendered phrase playback: EN → PT (male) → PT-FEM (female) when `hasFemVariant` is set
- Connected audio to lesson player UI
- Set up the Zustand player store for runtime audio state

---

---

## Step 8 - Lesson Player Complete — COMPLETED

**What we did:**

- Wired up lesson flow: start → progress → complete
- Added easy/practice-more/favorite buttons
- Set up Dexie database in src/lib/db.ts
- Saved PhraseProgress to Dexie
- Built the lesson complete screen at /lesson/:id/complete
- Review scheduling: Easy → 7 days, Practice more → tomorrow

---

---

## Step 9 - Loop Mode — COMPLETED

**What we did:**

- Built the loop setup screen at /loop
- Built the loop player at /loop/play
- Auto-advance through phrases, cycles back to start
- Added repeat count and pause length settings
- 5 loop sources: lesson, category, favorites, review, all phrases

---

---

## Step 10 - Review and Favorites — COMPLETED

**What we did:**

- Built the review page at /review
- Built the favorites page at /favorites
- Review page shows phrases where reviewDueAt is today or earlier
- "Loop these" button to loop review or favorite items
- Review cycling rules working (Easy → 7 days, Practice more → tomorrow)

---

---

## Step 11 - Browse and Filter — COMPLETED

**What we did:**

- Built the browse page at /browse
- Added filters: length band, category, situation, difficulty
- Heart icon on each card for instant favorite toggle
- Long press on a card for loop-from-here
- "Loop these" button for filtered results
- Tap a phrase to play it (with gendered variant support)

---

---

## Step 12 - Onboarding and Settings — COMPLETED

**What we did:**

- Built the first-time welcome screen
- Built the settings page at /settings
- Playback template, speed, pause duration, dark mode, phonetics toggles
- Settings saved to Dexie UserSettings table
- Dark mode support throughout the app

---

---

## Step 13 - Content Expansion — COMPLETED

**What we did:**

- Expanded to 208 phrases across 24 lessons in 5 units (12 categories)
- Generated audio for all phrases via Google Cloud TTS
- Added 5 gendered phrase variants with male/female voice distinction

---

---

## Step 14 - PWA Polish — COMPLETED

**What we did:**

- Created PWA icons at all sizes (SVG-based)
- Finalized the manifest via vite-plugin-pwa
- Offline audio caching via Workbox
- Text content fully browsable offline
- Progress tracking works offline

---

---

## Step 15 - Lock Screen Experiments — COMPLETED

**What we did:**

- Added Media Session API (lock screen metadata + controls)
- Lock screen shows current phrase + play/pause/next/previous
- App degrades gracefully where not supported

---

---

## MVP Is Done When

- [x] User can complete a lesson with real audio
- [x] Loop mode works continuously
- [x] Favorites and review persist locally
- [x] Browse filters work
- [x] App installs as a PWA
- [x] Cached audio works offline
- [x] Unsupported lock-screen behavior does not break playback

---

---

## Post-MVP Changes

### Gendered Phrase Variants (completed)

Portuguese phrases that change based on speaker gender now show both forms.

- Added `ptFem` and `ptFemPhonetic` fields to the Phrase type
- PhraseCard displays both forms side by side with masc./fem. labels
- Male voice (pt-PT-Wavenet-B) for masculine, female voice (pt-PT-Wavenet-A) for feminine
- Audio sequence: EN → PT (male voice) → PT-FEM (female voice)
- 5 phrases currently have variants (see Type Shapes section for full list)

**Future gendered phrases to add:** Any new phrase where the speaker describes themselves with an adjective ending in -o/-a should include ptFem. Examples: "Estou ocupado/a", "Estou chateado/a", "Fui roubado/a", "Estou sozinho/a".

### Mobile Audio Fix (completed)

- Switched to singleton Audio element to maintain iOS Safari user-gesture permission
- Fixes issue where only the first phrase would play in loop mode on mobile

---

---

## What's Next

After Step 15, the MVP is complete.

Future work:

- Human voice recordings
- Cross-device sync (Supabase)
- More content packs (expand gendered variants across all applicable phrases)
- Voice recording + playback
- Pronunciation comparison
- Additional gendered phrases (see list in Post-MVP section)
