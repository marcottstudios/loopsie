# Loopsie - Build Steps

We will go through these one at a time.

Each step says what we build and what you should see when it's done.

---

## Current Step: 15 (complete) — MVP DONE

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
  audio/pt/       # Portuguese MP3s (filename = phrase ID)
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
id:           string        "greet-001"
en:           string        "Good morning"
pt:           string        "Bom dia"
ptPhonetic:   string?       "bohm DEE-ah"
lengthBand:   LengthBand    "1-word" | "2-word" | "3-word" | "short-phrase" | "pattern"
category:     Category      (see taxonomy below)
situations:   Situation[]   (see taxonomy below)
difficulty:   Difficulty    "beginner" | "beginner-plus" | "intermediate"
lessonId:     string?
sortOrder:    number
```

**Audio filename rule:** Audio filename always equals the phrase `id`.

- English: `public/audio/en/{id}.mp3`
- Portuguese: `public/audio/pt/{id}.mp3`

No separate audioKey fields. The id IS the audio key.

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

## Step 1 - Project Setup

**What we do:**

- Create the Vite + React + TypeScript project
- Install all pinned dependencies (see Tech Stack above)
- Set up Tailwind CSS 4 with the design tokens above (CSS-based @theme in src/index.css)
- Set up the PWA config via vite-plugin-pwa
- Create .gitignore (include .env, node_modules, dist)
- Create .env.example with OPENAI_API_KEY placeholder (for Step 6)
- Confirm dev server runs and app renders without console errors

**Do NOT:**

- Add any page content or components
- Set up routing
- Create data files

**When it's done, you should see:**

- A blank page that loads in the browser
- No errors in the console
- Dev server runs cleanly
- .gitignore includes .env

---

---

## Step 2 - Data Layer

**What we do:**

- Create all TypeScript types in src/types/ using the exact Type Shapes above
- Create the first 30 phrases in src/data/content.ts covering greetings, politeness, and cafe
- Create 4 starter lesson definitions in src/data/lessons.ts
- Create category and situation metadata in src/data/categories.ts and src/data/situations.ts
- Use the exact taxonomy listed above

**Do NOT:**

- Create any UI components
- Set up routing
- Set up Zustand or Dexie stores

**When it's done, you should see:**

- No visible change yet (this is data only)
- TypeScript compiles with no errors

---

---

## Step 3 - Layout and Routing

**What we do:**

- Create the AppShell (main wrapper with header + bottom nav + content area)
- Create the BottomNav (mobile navigation bar)
- Create the Header
- Set up React Router with the exact routes listed above
- Create stub pages (empty placeholders) for every route

**Do NOT:**

- Build any page content — stubs only
- Add any state management
- Build any reusable components beyond layout

**When it's done, you should see:**

- A header at the top
- A bottom nav bar with icons
- Tapping nav items switches between blank pages
- The URL changes as you navigate

---

---

## Step 4 - Home Screen

**What we do:**

- Build the home dashboard in HomePage
- Add entry point cards: Continue Lesson, Loop Mode, Browse, Review, Favorites
- Wire up navigation from home to each section
- Handle empty state: no progress yet shows "Start your first lesson" instead of "Continue lesson"

**Do NOT:**

- Build content for any other page
- Add audio functionality
- Add state persistence

**When it's done, you should see:**

- A clean home screen with tappable cards
- Each card navigates to its section (still blank stub pages)

---

---

## Step 5 - Phrase Card and Lesson Player UI

**What we do:**

- Build the PhraseCard component (shows English + Portuguese text)
- Build the audio control buttons (play, slow, repeat, next, previous)
- Build the lesson progress bar
- Wire it up with the first lesson's phrase data
- UI-only lesson playback scaffold with phrase navigation and progress state

**Do NOT:**

- Implement audio playback — UI scaffold only
- Add progress persistence
- Build the lesson complete screen

**When it's done, you should see:**

- A lesson screen showing one phrase at a time
- English text and Portuguese text displayed
- Control buttons visible (they won't play sound yet)
- Next/previous buttons step through phrases
- Progress bar shows position in lesson

---

---

## Step 6 - Audio Generation Script

**What we do:**

- Write a build script in scripts/generate-audio.ts that calls OpenAI TTS API
- Generate audio using stable filenames based on phrase ID
- Requires OPENAI_API_KEY in .env file

**OpenAI TTS settings:**

- Model: `tts-1` (standard quality, faster)
- English voice: `nova` (clear, neutral female)
- Portuguese voice: `nova` (same voice for consistency — verify it sounds European Portuguese, not Brazilian; if not, try `alloy` or `shimmer`)
- Output format: `mp3`
- Speed: `1.0` for normal, generate a second set at `0.85` for slow mode if needed later

**Filename convention:**

- `public/audio/en/{id}.mp3`
- `public/audio/pt/{id}.mp3`
- Filenames always match the phrase `id` field, never the text content

**Audio QA checks:**

- Pronunciation matches European Portuguese (not Brazilian)
- Pacing is natural
- Volume is consistent across all files
- No clipped starts or ends
- English and Portuguese voices are distinct and clear

**Do NOT:**

- Build the audio engine
- Connect audio to the UI
- Modify any app code

**When it's done, you should see:**

- MP3 files in public/audio/en/ and public/audio/pt/
- Every phrase has exactly two files: one EN, one PT
- You can play them manually and confirm pronunciation quality

---

---

## Step 7 - Audio Engine

**What we do:**

- Build the AudioEngine in src/lib/AudioEngine.ts
- Support configurable playback templates:
  - Full: EN → PT → PT → pause
  - Standard: EN → PT → pause
  - Portuguese only: PT → pause
- Connect audio to the lesson player UI
- Set up the Zustand player store for runtime audio state

**Interruption behavior:**

- Starting a new phrase stops any current playback before beginning the new sequence
- Tapping next/previous during playback cancels the current sequence and starts the selected phrase
- No overlapping audio ever

**Do NOT:**

- Add progress persistence — playback only
- Build loop mode
- Add favorite/review functionality

**When it's done, you should see:**

- Pressing play on a phrase plays the English audio, then Portuguese
- The full playback sequence works
- Next/previous changes which phrase plays
- Tapping next mid-playback cleanly stops current audio and starts the next phrase

---

---

## Step 8 - Lesson Player Complete

**What we do:**

- Wire up lesson flow: start → progress → complete
- Add easy/practice-more/favorite buttons
- Set up Dexie database in src/lib/db.ts
- Save PhraseProgress to Dexie
- Build the lesson complete screen at /lesson/:id/complete

**Lesson completion rule:**

- A lesson is complete when the user reaches the last phrase and taps "Complete"
- All phrases in the lesson must have been played at least once

**Review scheduling rules:**

- Easy → set `reviewDueAt` to 7 days from now
- Practice more → set `reviewDueAt` to tomorrow
- Favorite → does not affect review schedule (favorites are separate from review)

**Do NOT:**

- Build loop mode
- Build the review or favorites pages
- Build the browse page

**When it's done, you should see:**

- A full working lesson from start to finish
- Marking phrases as favorite or needs-practice works
- Finishing a lesson shows a summary
- Progress survives a page refresh

---

---

## Step 9 - Loop Mode

**What we do:**

- Build the loop setup screen at /loop
- Build the loop player at /loop/play (minimal UI, continuous playback)
- Auto-advance through phrases
- Cycle back to the start after the last phrase
- Add repeat count and pause length settings

**Loop mode sources for this step (4 sources):**

- One specific lesson
- One specific category
- Favorites list
- Review list

The 5th source (filtered browse results) is added in Step 11 when browse is built.

**Empty source handling:**

- If a source has 0 phrases, show: "No phrases in this set. Choose a different source."

**Do NOT:**

- Build the browse page
- Add Media Session / lock screen controls
- Add background audio keep-alive

**When it's done, you should see:**

- Choose any of the 4 sources above to loop
- Audio plays continuously through all phrases in the set
- After the last phrase, it starts over
- Pause/resume works
- Repeat count (2x/3x/5x) and pause length (short/medium/long) work

---

---

## Step 10 - Review and Favorites

**What we do:**

- Build the review page at /review (shows practice-more phrases)
- Build the favorites page at /favorites
- Review page shows phrases where `reviewDueAt` is today or earlier
- "Loop these" button to loop review or favorite items

**Review cycling rules (after practicing a review item):**

- Practiced and marked Easy → set `reviewDueAt` to 7 days ahead
- Practiced and marked Practice more → set `reviewDueAt` to tomorrow again
- This keeps items cycling until the user knows them

**Empty states:**

- Review page with 0 items: "No phrases to review yet. Complete a lesson to get started."
- Favorites page with 0 items: "No favorites yet. Tap the heart icon on any phrase to save it."

**Do NOT:**

- Build the browse page
- Add new content
- Modify the lesson player

**When it's done, you should see:**

- Phrases marked "practice more" appear in review
- Favorites appear in the favorites page
- Practicing a review item updates its next review date
- Can start a loop from either page
- Empty states show correct messages

---

---

## Step 11 - Browse and Filter

**What we do:**

- Build the browse page at /browse
- Add filters: length band, category, situation, difficulty, progress
- Add "loop these" button for filtered results (this adds the 5th loop source from Step 9)
- Tap a phrase to play it

**Default sort order:**

- Lesson order first, then phrase sort order within each lesson
- Optional sort later: alphabetical, newest, difficulty

**Filter persistence:**

- Browse filters persist until cleared manually
- Navigating away and coming back keeps the current filters
- A "Clear all" button resets filters

**Empty filter results:**

- "No phrases match these filters. Try removing a filter."

**Do NOT:**

- Add new content beyond the existing 30 phrases
- Modify the lesson player or loop mode
- Build onboarding or settings

**When it's done, you should see:**

- Browse all phrases with working filters
- Combine filters (e.g. 2-word + cafe)
- Start a loop from any filtered set
- Results appear in a consistent default order
- Filters survive page navigation

---

---

## Step 12 - Onboarding and Settings

**What we do:**

- Build the first-time welcome screen
- Build the settings page at /settings:
  - Playback template choice (full / standard / pt-only)
  - Speed (0.75 / 1.0 — exactly two options)
  - Pause duration (short / medium / long)
  - Dark mode toggle
  - Phonetics toggle
- Save settings to Dexie UserSettings table

**Onboarding rules:**

- Onboarding appears once on first visit
- User can skip it at any time
- Settings page has a link to reopen onboarding tips later

**Do NOT:**

- Add new content
- Modify audio engine behavior
- Add lock screen features

**When it's done, you should see:**

- First visit shows a welcome screen
- Skipping onboarding works
- Settings change how the app behaves
- Dark mode works

---

---

## Step 13 - Content Expansion

**What we do:**

- Expand from 30 phrases to the full ~240
- Fill all 5 units and all lessons
- Generate audio for all new phrases
- QA review Portuguese pronunciation using the checklist from Step 6

**Do NOT:**

- Change app code or UI
- Add new features
- Modify types or data model

**When it's done, you should see:**

- Full content library browsable
- All lessons playable
- All categories and situations populated

---

---

## Step 14 - PWA Polish

**What we do:**

- Create PWA icons at all sizes
- Finalize the manifest
- Test install on Android Chrome and iOS Safari
- Test offline mode (airplane mode)
- Run Lighthouse audit

**Offline expectations:**

- Previously cached audio plays offline
- Uncached audio is unavailable offline (no error, just skipped or noted)
- Text content remains fully browsable offline
- Progress tracking works offline

**Cache versioning:**

- New app versions invalidate outdated cached assets via the PWA update flow
- vite-plugin-pwa handles this through Workbox precache manifests

**Do NOT:**

- Add new features
- Change data model or types
- Add lock screen or background audio features

**When it's done, you should see:**

- App installs as a standalone PWA
- Works offline with cached audio
- Lighthouse PWA score 90+

---

---

## Step 15 - Lock Screen Experiments

**What we do:**

- Add Media Session API (lock screen metadata + controls)
- Test on Android Chrome
- Test on iOS Safari
- Try silent MP3 keep-alive if needed
- Document what works on each platform/browser

**Do NOT:**

- Change the data model
- Add new content
- Modify lesson or review logic
- Treat any lock screen feature as required for MVP

**When it's done, you should see:**

- On Android: lock screen shows current phrase + controls
- On iOS: documented behavior (may be limited)
- App degrades gracefully where not supported
- Clear documentation of what works where

---

---

## MVP Is Done When

- User can complete a lesson with real audio
- Loop mode works continuously
- Favorites and review persist locally
- Browse filters work
- App installs as a PWA
- Cached audio works offline
- Unsupported lock-screen behavior does not break playback

---

---

## What's Next

After Step 15, the MVP is complete.

Future work:

- Human voice recordings
- Cross-device sync (Supabase)
- More content packs
- Voice recording + playback
- Pronunciation comparison
