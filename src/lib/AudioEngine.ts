import type { PlaybackTemplate, Speed, PauseDuration } from '../types';

const PAUSE_MS: Record<PauseDuration, number> = {
  short: 1000,
  medium: 2000,
  long: 3500,
};

// Singleton audio element — reused across all playback to maintain
// the user-gesture permission on mobile browsers (iOS Safari blocks
// audio.play() on newly created Audio elements without user interaction)
let sharedAudio: HTMLAudioElement | null = null;

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudio) {
    sharedAudio = new Audio();
  }
  return sharedAudio;
}

export interface AudioEngineOptions {
  template: PlaybackTemplate;
  speed: Speed;
  pauseDuration: PauseDuration;
  onStepChange?: (step: string) => void;
  onSequenceComplete?: () => void;
}

/**
 * Plays a phrase's audio sequence based on the selected template.
 * - full:     EN → PT → PT → pause
 * - standard: EN → PT → pause
 * - pt-only:  PT → pause
 *
 * Returns an abort function to cancel the current sequence.
 */
export function playPhraseSequence(
  phraseId: string,
  options: AudioEngineOptions
): () => void {
  let cancelled = false;
  let pauseTimer: ReturnType<typeof setTimeout> | null = null;

  const cancel = () => {
    cancelled = true;
    const audio = getSharedAudio();
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
  };

  const playFile = (path: string, rate: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (cancelled) return reject(new Error('cancelled'));

      const audio = getSharedAudio();

      const onEnded = () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        resolve();
      };
      const onError = () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        resolve();
      };

      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);
      audio.playbackRate = rate;
      audio.src = path;
      audio.play().catch(() => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        resolve();
      });
    });
  };

  const wait = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (cancelled) return reject(new Error('cancelled'));
      pauseTimer = setTimeout(() => {
        pauseTimer = null;
        if (cancelled) return reject(new Error('cancelled'));
        resolve();
      }, ms);
    });
  };

  const enPath = `/audio/en/${phraseId}.mp3`;
  const ptPath = `/audio/pt/${phraseId}.mp3`;
  const rate = options.speed;
  const pauseMs = PAUSE_MS[options.pauseDuration];

  const buildSteps = (): Array<() => Promise<void>> => {
    const steps: Array<() => Promise<void>> = [];

    switch (options.template) {
      case 'full':
        steps.push(() => {
          options.onStepChange?.('en');
          return playFile(enPath, rate);
        });
        steps.push(() => wait(400));
        steps.push(() => {
          options.onStepChange?.('pt');
          return playFile(ptPath, rate);
        });
        steps.push(() => wait(400));
        steps.push(() => {
          options.onStepChange?.('pt-repeat');
          return playFile(ptPath, rate);
        });
        break;

      case 'standard':
        steps.push(() => {
          options.onStepChange?.('en');
          return playFile(enPath, rate);
        });
        steps.push(() => wait(400));
        steps.push(() => {
          options.onStepChange?.('pt');
          return playFile(ptPath, rate);
        });
        break;

      case 'pt-only':
        steps.push(() => {
          options.onStepChange?.('pt');
          return playFile(ptPath, rate);
        });
        break;
    }

    // End-of-phrase pause
    steps.push(() => {
      options.onStepChange?.('pause');
      return wait(pauseMs);
    });

    return steps;
  };

  // Run the sequence
  (async () => {
    const steps = buildSteps();
    try {
      for (const step of steps) {
        if (cancelled) break;
        await step();
      }
      if (!cancelled) {
        options.onStepChange?.('done');
        options.onSequenceComplete?.();
      }
    } catch {
      // cancelled — do nothing
    }
  })();

  return cancel;
}
