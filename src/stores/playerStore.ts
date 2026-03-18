import { create } from 'zustand';
import type { PlaybackTemplate, Speed, PauseDuration } from '../types';
import { playPhraseSequence } from '../lib/AudioEngine';

interface PlayerState {
  // Current playback
  isPlaying: boolean;
  currentPhraseId: string | null;
  currentStep: string | null; // 'en' | 'pt' | 'pt-fem' | 'pt-repeat' | 'pause' | 'done'

  // Settings (runtime defaults, overridden by Dexie settings in Step 12)
  template: PlaybackTemplate;
  speed: Speed;
  pauseDuration: PauseDuration;

  // Lesson context
  lessonId: string | null;
  phraseIds: string[];
  currentIndex: number;

  /** Set of phrase IDs that have feminine audio variants */
  femVariantIds: Set<string>;

  // Internal
  _cancelFn: (() => void) | null;
}

interface PlayerActions {
  // Lesson setup
  loadLesson: (lessonId: string, phraseIds: string[], femVariantIds?: Set<string>) => void;
  setFemVariantIds: (ids: Set<string>) => void;

  // Playback
  playCurrent: () => void;
  playPhrase: (phraseId: string) => void;
  stop: () => void;

  // Navigation
  goToIndex: (index: number) => void;
  next: () => void;
  previous: () => void;

  // Settings
  setTemplate: (template: PlaybackTemplate) => void;
  setSpeed: (speed: Speed) => void;
  setPauseDuration: (pauseDuration: PauseDuration) => void;
  syncSettings: (settings: {
    playbackTemplate: PlaybackTemplate;
    speed: Speed;
    pauseDuration: PauseDuration;
  }) => void;
}

export const usePlayerStore = create<PlayerState & PlayerActions>((set, get) => ({
  isPlaying: false,
  currentPhraseId: null,
  currentStep: null,
  template: 'standard',
  speed: 1.0,
  pauseDuration: 'medium',
  lessonId: null,
  phraseIds: [],
  currentIndex: 0,
  femVariantIds: new Set(),
  _cancelFn: null,

  setFemVariantIds: (ids) => set({ femVariantIds: ids }),

  loadLesson: (lessonId, phraseIds, femVariantIds) => {
    const { _cancelFn } = get();
    if (_cancelFn) _cancelFn();

    set({
      lessonId,
      phraseIds,
      currentIndex: 0,
      currentPhraseId: phraseIds[0] ?? null,
      isPlaying: false,
      currentStep: null,
      _cancelFn: null,
      femVariantIds: femVariantIds ?? new Set(),
    });
  },

  playCurrent: () => {
    const state = get();
    const phraseId = state.phraseIds[state.currentIndex];
    if (!phraseId) return;

    // Cancel any existing playback
    if (state._cancelFn) state._cancelFn();

    const cancel = playPhraseSequence(phraseId, {
      template: state.template,
      speed: state.speed,
      pauseDuration: state.pauseDuration,
      hasFemVariant: state.femVariantIds.has(phraseId),
      onStepChange: (step) => {
        set({ currentStep: step });
      },
      onSequenceComplete: () => {
        set({ isPlaying: false, currentStep: null, _cancelFn: null });
      },
    });

    set({
      isPlaying: true,
      currentPhraseId: phraseId,
      _cancelFn: cancel,
    });
  },

  playPhrase: (phraseId) => {
    const state = get();
    const index = state.phraseIds.indexOf(phraseId);
    if (index === -1) return;

    // Cancel any existing playback
    if (state._cancelFn) state._cancelFn();

    set({ currentIndex: index, currentPhraseId: phraseId });

    // Play after state update
    setTimeout(() => get().playCurrent(), 0);
  },

  stop: () => {
    const { _cancelFn } = get();
    if (_cancelFn) _cancelFn();
    set({ isPlaying: false, currentStep: null, _cancelFn: null });
  },

  goToIndex: (index) => {
    const state = get();
    if (index < 0 || index >= state.phraseIds.length) return;

    // Cancel any existing playback
    if (state._cancelFn) state._cancelFn();

    set({
      currentIndex: index,
      currentPhraseId: state.phraseIds[index],
      isPlaying: false,
      currentStep: null,
      _cancelFn: null,
    });
  },

  next: () => {
    const state = get();
    const nextIndex = state.currentIndex + 1;
    if (nextIndex < state.phraseIds.length) {
      state.goToIndex(nextIndex);
    }
  },

  previous: () => {
    const state = get();
    const prevIndex = state.currentIndex - 1;
    if (prevIndex >= 0) {
      state.goToIndex(prevIndex);
    }
  },

  setTemplate: (template) => set({ template }),
  setSpeed: (speed) => set({ speed }),
  setPauseDuration: (pauseDuration) => set({ pauseDuration }),
  syncSettings: (settings) =>
    set({
      template: settings.playbackTemplate,
      speed: settings.speed,
      pauseDuration: settings.pauseDuration,
    }),
}));
