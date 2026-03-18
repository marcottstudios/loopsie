import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, X, SkipForward, SkipBack, RotateCcw } from 'lucide-react';
import { phrases as allPhrases } from '../data/content';
import { useLoopStore } from '../stores/loopStore';
import { playPhraseSequence } from '../lib/AudioEngine';
import PhraseCard from '../components/PhraseCard';
import PhraseActions from '../components/PhraseActions';
import { incrementTimesPlayed, toggleFavorite, setReviewDue, reviewDueTomorrow, reviewDueInDays, getProgress } from '../lib/db';
import { updateMediaSession, clearMediaSession } from '../lib/mediaSession';
import { useSettings } from '../hooks/useSettings';

export default function LoopPlayerPage() {
  const navigate = useNavigate();
  const {
    playOrder,
    currentIndex,
    isPlaying,
    setIsPlaying,
    goNext,
    goPrevious,
    reset,
  } = useLoopStore();
  const { settings } = useSettings();

  const cancelRef = useRef<(() => void) | null>(null);
  const repeatRef = useRef(0);

  // Track favorite/practice state for current phrase
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState<'easy' | 'practice' | null>(null);

  const currentPhraseId = playOrder[currentIndex];

  const loadPhraseState = useCallback(async (phraseId: string) => {
    const progress = await getProgress(phraseId);
    setIsFavorite(progress?.isFavorite ?? false);
    if (!progress?.reviewDueAt) {
      setRating(null);
    } else {
      const now = Date.now();
      // If due date is > 2 days out, it was marked easy; otherwise practice
      setRating(progress.reviewDueAt - now > 2 * 24 * 60 * 60 * 1000 ? 'easy' : 'practice');
    }
  }, []);

  useEffect(() => {
    if (currentPhraseId) loadPhraseState(currentPhraseId);
  }, [currentPhraseId, loadPhraseState]);

  const handleFavorite = async () => {
    if (!currentPhraseId) return;
    await toggleFavorite(currentPhraseId);
    setIsFavorite((prev) => !prev);
  };

  const handleEasy = async () => {
    if (!currentPhraseId) return;
    await setReviewDue(currentPhraseId, reviewDueInDays(7));
    setRating('easy');
  };

  const handlePractice = async () => {
    if (!currentPhraseId) return;
    await setReviewDue(currentPhraseId, reviewDueTomorrow());
    setRating('practice');
  };

  // Redirect if no phrases loaded
  useEffect(() => {
    if (playOrder.length === 0) {
      navigate('/loop', { replace: true });
    }
  }, [playOrder.length, navigate]);

  // Core play function — reads state directly from store to avoid stale closures
  function playPhrase() {
    const store = useLoopStore.getState();
    const phraseId = store.playOrder[store.currentIndex];
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
          const nextIndex = (s.currentIndex + 1) % s.playOrder.length;
          useLoopStore.setState({ currentIndex: nextIndex });
        }
      },
    });

    cancelRef.current = cancel;
  }

  // Play when currentIndex changes and isPlaying is true
  useEffect(() => {
    if (isPlaying && playOrder.length > 0) {
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
    if (playOrder.length > 0 && !isPlaying) {
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Media Session for lock screen controls
  useEffect(() => {
    const phraseId = playOrder[currentIndex];
    if (phraseId) {
      updateMediaSession({
        phraseId,
        isPlaying,
        onPlay: () => setIsPlaying(true),
        onPause: () => {
          if (cancelRef.current) cancelRef.current();
          setIsPlaying(false);
        },
        onNext: handleNext,
        onPrevious: handlePrevious,
      });
    }
    return () => clearMediaSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPlaying, playOrder, setIsPlaying]);

  const handleToggle = () => {
    if (isPlaying) {
      if (cancelRef.current) cancelRef.current();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (cancelRef.current) cancelRef.current();
    repeatRef.current = 0;
    goNext();
    // isPlaying + currentIndex change triggers useEffect to play
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (cancelRef.current) cancelRef.current();
    repeatRef.current = 0;
    goPrevious();
    if (!isPlaying) setIsPlaying(true);
  };

  const handleRepeat = () => {
    if (cancelRef.current) cancelRef.current();
    repeatRef.current = 0;
    // Re-trigger by toggling isPlaying off then on, or just re-call playPhrase
    if (isPlaying) {
      // Force a re-play by briefly toggling
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (cancelRef.current) cancelRef.current();
    reset();
    navigate('/loop', { replace: true });
  };

  if (playOrder.length === 0) return null;

  const currentPhrase = allPhrases.find((p) => p.id === currentPhraseId);

  if (!currentPhrase) return null;

  return (
    <div className="px-4 py-6 flex flex-col gap-6 h-full">
      {/* Counter */}
      <p className="text-sm text-slate-400 text-center">
        Phrase {currentIndex + 1} of {playOrder.length}
      </p>

      {/* Phrase card + actions — centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex flex-col gap-4">
          <PhraseCard phrase={currentPhrase} showPhonetics={settings.showPhonetics} />
          <PhraseActions
            isFavorite={isFavorite}
            rating={rating}
            onFavorite={handleFavorite}
            onEasy={handleEasy}
            onPractice={handlePractice}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="pb-4 flex flex-col items-center gap-4">
        {/* Main controls row */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleStop}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              settings.darkMode
                ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
                : 'bg-stone-100 text-slate-600 active:bg-stone-200'
            }`}
          >
            <X size={18} />
          </button>

          <button
            onClick={handlePrevious}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              settings.darkMode
                ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
                : 'bg-stone-100 text-slate-600 active:bg-stone-200'
            }`}
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={handleToggle}
            className="w-14 h-14 rounded-lg bg-teal-500 text-white flex items-center justify-center active:bg-teal-600 transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              settings.darkMode
                ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
                : 'bg-stone-100 text-slate-600 active:bg-stone-200'
            }`}
          >
            <SkipForward size={18} />
          </button>

          <button
            onClick={handleRepeat}
            className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
              settings.darkMode
                ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
                : 'bg-stone-100 text-slate-600 active:bg-stone-200'
            }`}
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
