import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { phrases } from '../data/content';
import { usePlayerStore } from '../stores/playerStore';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { incrementTimesPlayed } from '../lib/db';
import { playPhraseSequence } from '../lib/AudioEngine';
import { updateMediaSession, clearMediaSession } from '../lib/mediaSession';
import { useSettings } from '../hooks/useSettings';
import PhraseCard from '../components/PhraseCard';
import PhraseActions from '../components/PhraseActions';
import LessonControls from '../components/LessonControls';
import LessonProgressBar from '../components/LessonProgressBar';

export default function LessonPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === id);
  const { settings } = useSettings();

  const {
    currentIndex,
    isPlaying,
    loadLesson,
    playCurrent,
    stop,
    next,
    previous,
  } = usePlayerStore();

  const phraseIds = lesson?.phraseIds ?? [];
  const { getState, handleFavorite, handleEasy, handlePractice, getSummary } = useLessonProgress(
    phraseIds
  );

  // Load lesson into the player store
  useEffect(() => {
    if (lesson) {
      const femIds = new Set(
        lesson.phraseIds.filter((pid) => phrases.find((p) => p.id === pid)?.ptFem)
      );
      loadLesson(lesson.id, lesson.phraseIds, femIds);
    }
    return () => {
      stop();
      clearMediaSession();
    };
    // Only reload when lesson ID changes, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Media Session for lock screen controls
  useEffect(() => {
    const phraseId = lesson?.phraseIds[currentIndex];
    if (phraseId) {
      updateMediaSession({
        phraseId,
        isPlaying,
        onPlay: () => {
          incrementTimesPlayed(phraseId);
          playCurrent();
        },
        onPause: stop,
        onNext: next,
        onPrevious: previous,
      });
    }
  }, [currentIndex, isPlaying, lesson, playCurrent, stop, next, previous]);

  if (!lesson) {
    return (
      <div className="px-4 py-6">
        <p className="text-slate-500">Lesson not found.</p>
      </div>
    );
  }

  const lessonPhrases = lesson.phraseIds
    .map((pid) => phrases.find((p) => p.id === pid))
    .filter(Boolean) as typeof phrases;

  const currentPhrase = lessonPhrases[currentIndex];

  if (!currentPhrase) {
    return (
      <div className="px-4 py-6">
        <p className="text-slate-500">No phrases in this lesson.</p>
      </div>
    );
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < lessonPhrases.length - 1;
  const isLastPhrase = currentIndex === lessonPhrases.length - 1;
  const phraseState = getState(currentPhrase.id);

  const handleComplete = () => {
    stop();
    // Store summary in sessionStorage for the complete page
    sessionStorage.setItem(
      `lesson-summary-${lesson.id}`,
      JSON.stringify(getSummary())
    );
    navigate(`/lesson/${lesson.id}/complete`);
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-5 h-full">
      {/* Progress */}
      <LessonProgressBar current={currentIndex} total={lessonPhrases.length} />

      {/* Lesson title */}
      <p className="text-sm text-slate-400 text-center">{lesson.title}</p>

      {/* Phrase card — centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full flex flex-col gap-4">
          <PhraseCard phrase={currentPhrase} showPhonetics={settings.showPhonetics} />
          <PhraseActions
            isFavorite={phraseState.isFavorite}
            rating={phraseState.rating}
            onFavorite={() => handleFavorite(currentPhrase.id)}
            onEasy={() => handleEasy(currentPhrase.id)}
            onPractice={() => handlePractice(currentPhrase.id)}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="pb-4 flex flex-col gap-4">
        <LessonControls
          onPlay={() => {
            if (isPlaying) {
              stop();
            } else {
              incrementTimesPlayed(currentPhrase.id);
              playCurrent();
            }
          }}
          onSlow={() => {
            const store = usePlayerStore.getState();
            if (store._cancelFn) store._cancelFn();
            incrementTimesPlayed(currentPhrase.id);

            const cancel = playPhraseSequence(currentPhrase.id, {
              template: store.template,
              speed: 0.75,
              pauseDuration: store.pauseDuration,
              hasFemVariant: store.femVariantIds.has(currentPhrase.id),
              onStepChange: (step) => {
                usePlayerStore.setState({ currentStep: step });
              },
              onSequenceComplete: () => {
                usePlayerStore.setState({ isPlaying: false, currentStep: null, _cancelFn: null });
              },
            });

            usePlayerStore.setState({
              isPlaying: true,
              currentPhraseId: currentPhrase.id,
              _cancelFn: cancel,
            });
          }}
          onPrevious={previous}
          onNext={next}
          isPlaying={isPlaying}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />

        {isLastPhrase && (
          <button
            onClick={handleComplete}
            className="w-full py-3 rounded-lg bg-teal-500 text-white text-sm font-medium active:bg-teal-600 transition-colors"
          >
            Complete Lesson
          </button>
        )}
      </div>
    </div>
  );
}
