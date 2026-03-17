import { phrases } from '../data/content';

interface MediaSessionConfig {
  phraseId: string;
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

/**
 * Updates the Media Session API for lock screen controls.
 * Gracefully degrades — does nothing if the browser doesn't support it.
 */
export function updateMediaSession(config: MediaSessionConfig) {
  if (!('mediaSession' in navigator)) return;

  const phrase = phrases.find((p) => p.id === config.phraseId);
  if (!phrase) return;

  navigator.mediaSession.metadata = new MediaMetadata({
    title: phrase.pt,
    artist: phrase.en,
    album: 'Loopsie',
  });

  navigator.mediaSession.playbackState = config.isPlaying ? 'playing' : 'paused';

  navigator.mediaSession.setActionHandler('play', config.onPlay ?? null);
  navigator.mediaSession.setActionHandler('pause', config.onPause ?? null);
  navigator.mediaSession.setActionHandler('nexttrack', config.onNext ?? null);
  navigator.mediaSession.setActionHandler('previoustrack', config.onPrevious ?? null);
}

export function clearMediaSession() {
  if (!('mediaSession' in navigator)) return;

  navigator.mediaSession.metadata = null;
  navigator.mediaSession.playbackState = 'none';
  navigator.mediaSession.setActionHandler('play', null);
  navigator.mediaSession.setActionHandler('pause', null);
  navigator.mediaSession.setActionHandler('nexttrack', null);
  navigator.mediaSession.setActionHandler('previoustrack', null);
}
