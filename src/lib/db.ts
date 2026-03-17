import Dexie, { type EntityTable } from 'dexie';
import type { PhraseProgress, UserSettings } from '../types';

const db = new Dexie('loopsie') as Dexie & {
  phraseProgress: EntityTable<PhraseProgress, 'phraseId'>;
  userSettings: EntityTable<UserSettings & { id: number }, 'id'>;
};

db.version(1).stores({
  phraseProgress: 'phraseId',
  userSettings: 'id',
});

export { db };

// --- PhraseProgress helpers ---

export async function getProgress(phraseId: string): Promise<PhraseProgress | undefined> {
  return db.phraseProgress.get(phraseId);
}

export async function getAllProgress(): Promise<PhraseProgress[]> {
  return db.phraseProgress.toArray();
}

export async function upsertProgress(phraseId: string, updates: Partial<PhraseProgress>) {
  const existing = await db.phraseProgress.get(phraseId);
  if (existing) {
    await db.phraseProgress.update(phraseId, updates);
  } else {
    await db.phraseProgress.put({
      phraseId,
      timesPlayed: 0,
      isFavorite: false,
      lastPracticedAt: null,
      reviewDueAt: null,
      ...updates,
    });
  }
}

export async function incrementTimesPlayed(phraseId: string) {
  const existing = await db.phraseProgress.get(phraseId);
  const now = Date.now();
  if (existing) {
    await db.phraseProgress.update(phraseId, {
      timesPlayed: existing.timesPlayed + 1,
      lastPracticedAt: now,
    });
  } else {
    await db.phraseProgress.put({
      phraseId,
      timesPlayed: 1,
      isFavorite: false,
      lastPracticedAt: now,
      reviewDueAt: null,
    });
  }
}

export async function toggleFavorite(phraseId: string) {
  const existing = await db.phraseProgress.get(phraseId);
  if (existing) {
    await db.phraseProgress.update(phraseId, { isFavorite: !existing.isFavorite });
  } else {
    await db.phraseProgress.put({
      phraseId,
      timesPlayed: 0,
      isFavorite: true,
      lastPracticedAt: null,
      reviewDueAt: null,
    });
  }
}

export async function setReviewDue(phraseId: string, dueAt: number | null) {
  await upsertProgress(phraseId, { reviewDueAt: dueAt });
}

// --- Review scheduling helpers ---

const DAY_MS = 24 * 60 * 60 * 1000;

export function reviewDueTomorrow(): number {
  return Date.now() + DAY_MS;
}

export function reviewDueInDays(days: number): number {
  return Date.now() + days * DAY_MS;
}
