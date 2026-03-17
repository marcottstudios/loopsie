import { useState, useEffect, useCallback } from 'react';
import {
  toggleFavorite,
  setReviewDue,
  reviewDueTomorrow,
  reviewDueInDays,
  getProgress,
} from '../lib/db';

export type PhraseRating = 'easy' | 'practice' | null;

interface PhraseLessonState {
  isFavorite: boolean;
  rating: PhraseRating;
}

export function useLessonProgress(phraseIds: string[]) {
  const [states, setStates] = useState<Record<string, PhraseLessonState>>({});
  const phraseIdsKey = phraseIds.join(',');

  // Load initial favorite states from Dexie
  useEffect(() => {
    (async () => {
      const initial: Record<string, PhraseLessonState> = {};
      for (const id of phraseIds) {
        const progress = await getProgress(id);
        initial[id] = {
          isFavorite: progress?.isFavorite ?? false,
          rating: null,
        };
      }
      setStates(initial);
    })();
  }, [phraseIdsKey]);

  const getState = useCallback(
    (phraseId: string): PhraseLessonState =>
      states[phraseId] ?? { isFavorite: false, rating: null },
    [states]
  );

  const handleFavorite = useCallback(async (phraseId: string) => {
    await toggleFavorite(phraseId);
    setStates((prev) => ({
      ...prev,
      [phraseId]: {
        ...prev[phraseId],
        isFavorite: !(prev[phraseId]?.isFavorite ?? false),
        rating: prev[phraseId]?.rating ?? null,
      },
    }));
  }, []);

  const handleEasy = useCallback(async (phraseId: string) => {
    await setReviewDue(phraseId, reviewDueInDays(7));
    setStates((prev) => ({
      ...prev,
      [phraseId]: {
        isFavorite: prev[phraseId]?.isFavorite ?? false,
        rating: 'easy',
      },
    }));
  }, []);

  const handlePractice = useCallback(async (phraseId: string) => {
    await setReviewDue(phraseId, reviewDueTomorrow());
    setStates((prev) => ({
      ...prev,
      [phraseId]: {
        isFavorite: prev[phraseId]?.isFavorite ?? false,
        rating: 'practice',
      },
    }));
  }, []);

  // Summary for completion screen
  const getSummary = useCallback(() => {
    const entries = Object.entries(states);
    return {
      total: phraseIds.length,
      easy: entries.filter(([, s]) => s.rating === 'easy').length,
      practice: entries.filter(([, s]) => s.rating === 'practice').length,
      favorited: entries.filter(([, s]) => s.isFavorite).length,
      unrated: entries.filter(([, s]) => s.rating === null).length,
    };
  }, [states, phraseIds.length]);

  return { getState, handleFavorite, handleEasy, handlePractice, getSummary };
}
