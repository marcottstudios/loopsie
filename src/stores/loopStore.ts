import { create } from 'zustand';
import type { PauseDuration, Speed, PlaybackTemplate } from '../types';

export type LoopSource =
  | { type: 'lesson'; lessonId: string }
  | { type: 'category'; categoryId: string }
  | { type: 'browse' }
  | { type: 'favorites' }
  | { type: 'review' };

interface LoopState {
  source: LoopSource | null;
  phraseIds: string[];
  currentIndex: number;
  repeatCount: number; // 2, 3, or 5
  isPlaying: boolean;

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
  advanceIndex: () => void;
  reset: () => void;
  syncSettings: (settings: {
    playbackTemplate: PlaybackTemplate;
    speed: Speed;
    pauseDuration: PauseDuration;
  }) => void;
}

export const useLoopStore = create<LoopState & LoopActions>((set, get) => ({
  source: null,
  phraseIds: [],
  currentIndex: 0,
  repeatCount: 2,
  isPlaying: false,
  template: 'standard',
  speed: 1.0,
  pauseDuration: 'medium',

  setSource: (source, phraseIds) =>
    set({ source, phraseIds, currentIndex: 0 }),

  setRepeatCount: (count) => set({ repeatCount: count }),
  setTemplate: (template) => set({ template }),
  setSpeed: (speed) => set({ speed }),
  setPauseDuration: (pauseDuration) => set({ pauseDuration }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  advanceIndex: () => {
    const { currentIndex, phraseIds } = get();
    const nextIndex = (currentIndex + 1) % phraseIds.length;
    set({ currentIndex: nextIndex });
  },

  reset: () =>
    set({
      source: null,
      phraseIds: [],
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
