import { create } from 'zustand';
import type { PauseDuration, Speed, PlaybackTemplate } from '../types';

export type LoopSource =
  | { type: 'all' }
  | { type: 'lesson'; lessonId: string }
  | { type: 'category'; categoryId: string }
  | { type: 'browse' }
  | { type: 'favorites' }
  | { type: 'review' };

interface LoopState {
  source: LoopSource | null;
  phraseIds: string[];
  /** The actual playback order (same as phraseIds when not shuffled) */
  playOrder: string[];
  currentIndex: number;
  repeatCount: number; // 2, 3, or 5
  isPlaying: boolean;
  shuffle: boolean;

  // Playback settings
  template: PlaybackTemplate;
  speed: Speed;
  pauseDuration: PauseDuration;
}

interface LoopActions {
  setSource: (source: LoopSource, phraseIds: string[]) => void;
  setRepeatCount: (count: number) => void;
  setTemplate: (template: PlaybackTemplate) => void;
  setSpeed: (speed: Speed) => void;
  setPauseDuration: (pauseDuration: PauseDuration) => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setShuffle: (shuffle: boolean) => void;
  advanceIndex: () => void;
  goNext: () => void;
  goPrevious: () => void;
  reset: () => void;
  syncSettings: (settings: {
    playbackTemplate: PlaybackTemplate;
    speed: Speed;
    pauseDuration: PauseDuration;
  }) => void;
  /** Rebuild the play order with smart shuffle weighting */
  buildPlayOrder: (practiceIds?: Set<string>) => void;
}

/** Fisher-Yates shuffle */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useLoopStore = create<LoopState & LoopActions>((set, get) => ({
  source: null,
  phraseIds: [],
  playOrder: [],
  currentIndex: 0,
  repeatCount: 2,
  isPlaying: false,
  shuffle: false,
  template: 'standard',
  speed: 1.0,
  pauseDuration: 'medium',

  setSource: (source, phraseIds) =>
    set({ source, phraseIds, playOrder: [...phraseIds], currentIndex: 0 }),

  setRepeatCount: (count) => set({ repeatCount: count }),
  setTemplate: (template) => set({ template }),
  setSpeed: (speed) => set({ speed }),
  setPauseDuration: (pauseDuration) => set({ pauseDuration }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setShuffle: (shuffle) => set({ shuffle }),

  advanceIndex: () => {
    const { currentIndex, playOrder } = get();
    const nextIndex = (currentIndex + 1) % playOrder.length;
    set({ currentIndex: nextIndex });
  },

  goNext: () => {
    const { currentIndex, playOrder } = get();
    const nextIndex = (currentIndex + 1) % playOrder.length;
    set({ currentIndex: nextIndex });
  },

  goPrevious: () => {
    const { currentIndex, playOrder } = get();
    const prevIndex = (currentIndex - 1 + playOrder.length) % playOrder.length;
    set({ currentIndex: prevIndex });
  },

  buildPlayOrder: (practiceIds) => {
    const { phraseIds, shuffle: doShuffle } = get();
    if (!doShuffle) {
      set({ playOrder: [...phraseIds], currentIndex: 0 });
      return;
    }

    // Smart shuffle: insert extra copies of practice-needed phrases
    const weighted: string[] = [];
    for (const id of phraseIds) {
      weighted.push(id);
      if (practiceIds?.has(id)) {
        // Add 2 extra copies so they appear ~3x as often
        weighted.push(id);
        weighted.push(id);
      }
    }

    set({ playOrder: shuffleArray(weighted), currentIndex: 0 });
  },

  reset: () =>
    set({
      source: null,
      phraseIds: [],
      playOrder: [],
      currentIndex: 0,
      isPlaying: false,
    }),

  syncSettings: (settings) =>
    set({
      template: settings.playbackTemplate,
      speed: settings.speed,
      pauseDuration: settings.pauseDuration,
    }),
}));
