import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, X } from 'lucide-react';
import { phrases as allPhrases } from '../data/content';
import { useLoopStore } from '../stores/loopStore';
import { playPhraseSequence } from '../lib/AudioEngine';
import PhraseCard from '../components/PhraseCard';
import { incrementTimesPlayed } from '../lib/db';
import { updateMediaSession, clearMediaSession } from '../lib/mediaSession';
import { useSettings } from '../hooks/useSettings';

export default function LoopPlayerPage() {
  const navigate = useNavigate();
  const {
    phraseIds,
    currentIndex,
    repeatCount,
    isPlaying,
    template,
    speed,
    pauseDuration,
    setIsPlaying,
    advanceIndex,
    setCurrentIndex,
    reset,
  } = useLoopStore();
  const { settings } = useSettings();

  const cancelRef = useRef<(() => void) | null>(null);
  const repeatRef = useRef(0);

  // Redirect if no phrases loaded
  useEffect(() => {
    if (phraseIds.length === 0) {
      navigate('/loop', { replace: true });
    }
  }, [phraseIds.length, navigate]);

  // Core play function — reads state directly from store to avoid stale closures
  function playPhrase() {
    const store = useLoopStore.getState();
    const phraseId = store.phraseIds[store.currentIndex];
    if (!phraseId) return;

    if (cancelRef.current) cancelRef.current();
    incrementTimesPlayed(phraseId);

    const phrase = allPhrases.find((p) => p.id === phraseId);
    const cancel = playPhraseSequence(phraseId, {
      template: store.template,
      speed: store.speed,
      pauseDuration: store.pauseDuration,
      hasFemVariant: !!phrase?.ptFem,
      onSequenceComplete: () => {
        repeatRef.current += 1;
        const s = useLoopStore.getState();
        if (repeatRef.current < s.repeatCount) {
          playPhrase();
        } else {
          repeatRef.current = 0;
          // Advance index then play next
          const nextIndex = (s.currentIndex + 1) % s.phraseIds.length;
          useLoopStore.setState({ currentIndex: nextIndex });
        }
      },
    });

    cancelRef.current = cancel;
  }

  // Play when currentIndex changes and isPlaying is true
  useEffect(() => {
    if (isPlaying && phraseIds.length > 0) {
      repeatRef.current = 0;
      playPhrase();
    }
    return () => {
      if (cancelRef.current) {
        cancelRef.current();
        cancelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPlaying]);

  // Auto-start on mount
  useEffect(() => {
    if (phraseIds.length > 0 && !isPlaying) {
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Media Session for lock screen controls
  useEffect(() => {
    const phraseId = phraseIds[currentIndex];
    if (phraseId) {
      updateMediaSession({
        phraseId,
        isPlaying,
        onPlay: () => setIsPlaying(true),
        onPause: () => {
          if (cancelRef.current) cancelRef.current();
          setIsPlaying(false);
        },
      });
    }
    return () => clearMediaSession();
  }, [currentIndex, isPlaying, phraseIds, setIsPlaying]);

  const handleToggle = () => {
    if (isPlaying) {
      if (cancelRef.current) cancelRef.current();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (cancelRef.current) cancelRef.current();
    reset();
    navigate('/loop', { replace: true });
  };

  if (phraseIds.length === 0) return null;

  const currentPhraseId = phraseIds[currentIndex];
  const currentPhrase = allPhrases.find((p) => p.id === currentPhraseId);

  if (!currentPhrase) return null;

  return (
    <div className="px-4 py-6 flex flex-col gap-6 h-full">
      {/* Counter */}
      <p className="text-sm text-slate-400 text-center">
        Phrase {currentIndex + 1} of {phraseIds.length}
      </p>

      {/* Phrase card — centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <PhraseCard phrase={currentPhrase} showPhonetics={settings.showPhonetics} />
        </div>
      </div>

      {/* Controls */}
      <div className="pb-4 flex items-center justify-center gap-6">
        <button
          onClick={handleStop}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            settings.darkMode
              ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
              : 'bg-stone-100 text-slate-600 active:bg-stone-200'
          }`}
        >
          <X size={20} />
        </button>

        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-lg bg-teal-500 text-white flex items-center justify-center active:bg-teal-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
