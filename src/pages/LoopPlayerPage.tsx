import { useEffect, useRef, useCallback } from 'react';
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
    reset,
  } = useLoopStore();
  const { settings } = useSettings();

  const cancelRef = useRef<(() => void) | null>(null);
  const repeatRef = useRef(0);
  const playCurrentPhraseRef = useRef<(() => void) | null>(null);

  // Redirect if no phrases loaded
  useEffect(() => {
    if (phraseIds.length === 0) {
      navigate('/loop', { replace: true });
    }
  }, [phraseIds.length, navigate]);

  const playCurrentPhrase = useCallback(() => {
    const phraseId = phraseIds[currentIndex];
    if (!phraseId) return;

    if (cancelRef.current) cancelRef.current();
    incrementTimesPlayed(phraseId);

    const cancel = playPhraseSequence(phraseId, {
      template,
      speed,
      pauseDuration,
      onSequenceComplete: () => {
        repeatRef.current += 1;
        if (repeatRef.current < repeatCount) {
          // Play same phrase again
          playCurrentPhraseRef.current?.();
        } else {
          // Move to next phrase
          repeatRef.current = 0;
          advanceIndex();
        }
      },
    });

    cancelRef.current = cancel;
  }, [phraseIds, currentIndex, template, speed, pauseDuration, repeatCount, advanceIndex]);

  useEffect(() => {
    playCurrentPhraseRef.current = playCurrentPhrase;
  }, [playCurrentPhrase]);

  // Auto-play when index changes and isPlaying
  useEffect(() => {
    if (isPlaying && phraseIds.length > 0) {
      repeatRef.current = 0;
      playCurrentPhrase();
    }
    return () => {
      if (cancelRef.current) cancelRef.current();
    };
  }, [currentIndex, isPlaying, phraseIds.length, playCurrentPhrase]);

  // Auto-start on mount
  useEffect(() => {
    if (phraseIds.length > 0 && !isPlaying) {
      setIsPlaying(true);
    }
  }, [phraseIds.length, isPlaying, setIsPlaying]);

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
