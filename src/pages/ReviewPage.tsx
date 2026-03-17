import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { liveQuery } from 'dexie';
import { Repeat, ThumbsUp, RotateCcw } from 'lucide-react';
import { phrases as allPhrases } from '../data/content';
import { db, setReviewDue, reviewDueTomorrow, reviewDueInDays } from '../lib/db';
import { useLoopStore } from '../stores/loopStore';
import type { Phrase } from '../types';
import PhraseCard from '../components/PhraseCard';
import { useSettings } from '../hooks/useSettings';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [reviewPhrases, setReviewPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSource } = useLoopStore();
  const { settings } = useSettings();

  useEffect(() => {
    const subscription = liveQuery(() => db.phraseProgress.toArray()).subscribe({
      next: (all) => {
        const now = Date.now();
        const dueIds = all
          .filter((p) => p.reviewDueAt !== null && p.reviewDueAt <= now)
          .map((p) => p.phraseId);

        const matched = dueIds
          .map((id) => allPhrases.find((p) => p.id === id))
          .filter(Boolean) as Phrase[];

        setReviewPhrases(matched);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleEasy = async (phraseId: string) => {
    await setReviewDue(phraseId, reviewDueInDays(7));
    setReviewPhrases((prev) => prev.filter((p) => p.id !== phraseId));
  };

  const handlePractice = async (phraseId: string) => {
    await setReviewDue(phraseId, reviewDueTomorrow());
    setReviewPhrases((prev) => prev.filter((p) => p.id !== phraseId));
  };

  const handleLoopThese = () => {
    const ids = reviewPhrases.map((p) => p.id);
    if (ids.length === 0) return;
    setSource({ type: 'review' }, ids);
    navigate('/loop/play');
  };

  if (loading) {
    return (
      <div className="px-4 py-6">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (reviewPhrases.length === 0) {
    return (
      <div className="px-4 py-6 flex flex-col items-center justify-center gap-3 text-center min-h-[50vh]">
        <RotateCcw size={32} className="text-slate-300" />
        <p className="text-slate-500">No phrases to review yet. Complete a lesson to get started.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{reviewPhrases.length} phrases to review</p>
        <button
          onClick={handleLoopThese}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium"
        >
          <Repeat size={14} />
          Loop these
        </button>
      </div>

      {reviewPhrases.map((phrase) => (
        <div key={phrase.id} className="flex flex-col gap-2">
          <PhraseCard phrase={phrase} showPhonetics={settings.showPhonetics} />
          <div className="flex gap-2">
            <button
              onClick={() => handleEasy(phrase.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${
                settings.darkMode
                  ? 'bg-emerald-950/40 text-emerald-300 active:bg-emerald-900/50'
                  : 'bg-emerald-50 text-emerald-600 active:bg-emerald-100'
              }`}
            >
              <ThumbsUp size={14} />
              Easy
            </button>
            <button
              onClick={() => handlePractice(phrase.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${
                settings.darkMode
                  ? 'bg-amber-950/40 text-amber-300 active:bg-amber-900/50'
                  : 'bg-amber-50 text-amber-600 active:bg-amber-100'
              }`}
            >
              <RotateCcw size={14} />
              Practice more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
