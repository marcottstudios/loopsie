// --- Enums / Union Types ---

export type LengthBand = '1-word' | '2-word' | '3-word' | 'short-phrase' | 'pattern';

export type Category =
  | 'greetings'
  | 'politeness'
  | 'numbers'
  | 'food-drink'
  | 'family'
  | 'directions'
  | 'shopping'
  | 'travel'
  | 'home'
  | 'feelings-needs'
  | 'emergency'
  | 'time-dates';

export type Situation =
  | 'at-a-cafe'
  | 'at-a-restaurant'
  | 'in-a-shop'
  | 'meeting-people'
  | 'asking-directions'
  | 'at-the-airport'
  | 'at-home'
  | 'at-the-doctor'
  | 'emergency-help'
  | 'general';

export type Difficulty = 'beginner' | 'beginner-plus' | 'intermediate';

export type PlaybackTemplate = 'full' | 'standard' | 'pt-only';

export type Speed = 0.75 | 1.0;

export type PauseDuration = 'short' | 'medium' | 'long';

// --- Data Types (static, read-only) ---

export interface Phrase {
  id: string;
  en: string;
  pt: string;
  ptPhonetic?: string;
  lengthBand: LengthBand;
  category: Category;
  situations: Situation[];
  difficulty: Difficulty;
  lessonId?: string;
  sortOrder: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  phraseIds: string[];
  category: Category;
  difficulty: Difficulty;
  lengthBandFocus: LengthBand;
  sortOrder: number;
}

// --- Persisted Types (Dexie / IndexedDB) ---

export interface PhraseProgress {
  phraseId: string;
  timesPlayed: number;
  isFavorite: boolean;
  lastPracticedAt: number | null;
  reviewDueAt: number | null;
}

export interface UserSettings {
  playbackTemplate: PlaybackTemplate;
  speed: Speed;
  pauseDuration: PauseDuration;
  showPhonetics: boolean;
  darkMode: boolean;
  onboardingDone: boolean;
}

// --- Metadata Types ---

export interface CategoryMeta {
  id: Category;
  label: string;
}

export interface SituationMeta {
  id: Situation;
  label: string;
}
