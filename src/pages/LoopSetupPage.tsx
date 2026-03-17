import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { liveQuery } from 'dexie';
import { Repeat, BookOpen, FolderOpen, Heart, RotateCcw, Globe } from 'lucide-react';
import { lessons } from '../data/lessons';
import { phrases } from '../data/content';
import { categories } from '../data/categories';
import { useLoopStore, type LoopSource } from '../stores/loopStore';
import { db } from '../lib/db';
import { useSettings } from '../hooks/useSettings';

type SourceType = 'all' | 'lesson' | 'category' | 'favorites' | 'review';

export default function LoopSetupPage() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { setSource, repeatCount, setRepeatCount, pauseDuration, setPauseDuration } =
    useLoopStore();

  const [sourceType, setSourceType] = useState<SourceType>('lesson');
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0]?.id ?? '');
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? '');
  const [favIds, setFavIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  // Load favorites and review phrases from Dexie
  useEffect(() => {
    const subscription = liveQuery(() => db.phraseProgress.toArray()).subscribe({
      next: (all) => {
        const now = Date.now();
        setFavIds(all.filter((p) => p.isFavorite).map((p) => p.phraseId));
        setReviewIds(
          all
            .filter((p) => p.reviewDueAt !== null && p.reviewDueAt <= now)
            .map((p) => p.phraseId)
        );
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const resolveIds = (): string[] => {
    switch (sourceType) {
      case 'all':
        return phrases.map((p) => p.id);
      case 'lesson': {
        const lesson = lessons.find((l) => l.id === selectedLessonId);
        return lesson?.phraseIds ?? [];
      }
      case 'category':
        return phrases
          .filter((p) => p.category === selectedCategoryId)
          .map((p) => p.id);
      case 'favorites':
        return favIds;
      case 'review':
        return reviewIds;
    }
  };

  const resolvedIds = resolveIds();
  const isEmpty = resolvedIds.length === 0;

  const handleStart = () => {
    if (isEmpty) return;

    const source: LoopSource =
      sourceType === 'all'
        ? { type: 'all' }
        : sourceType === 'lesson'
          ? { type: 'lesson', lessonId: selectedLessonId }
          : sourceType === 'category'
            ? { type: 'category', categoryId: selectedCategoryId }
            : sourceType === 'favorites'
              ? { type: 'favorites' }
              : { type: 'review' };

    setSource(source, resolvedIds);
    navigate('/loop/play');
  };

  const sourceOptions: { type: SourceType; icon: React.ReactNode; label: string }[] = [
    { type: 'all', icon: <Globe size={18} />, label: 'All Phrases' },
    { type: 'lesson', icon: <BookOpen size={18} />, label: 'Lesson' },
    { type: 'category', icon: <FolderOpen size={18} />, label: 'Category' },
    { type: 'favorites', icon: <Heart size={18} />, label: 'Favorites' },
    { type: 'review', icon: <RotateCcw size={18} />, label: 'Review' },
  ];

  return (
    <div className="px-4 py-6 flex flex-col gap-5">
      {/* Source picker */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">Source</p>
        <div className="grid grid-cols-3 gap-2">
          {sourceOptions.map((opt) => (
            <button
              key={opt.type}
              onClick={() => setSourceType(opt.type)}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                sourceType === opt.type
                  ? 'bg-teal-500 text-white'
                  : settings.darkMode
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-selection for lesson / category */}
      {sourceType === 'lesson' && (
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">Lesson</p>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className={`w-full p-3 rounded-lg border text-sm ${
              settings.darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-100'
                : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {sourceType === 'category' && (
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">Category</p>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value as typeof selectedCategoryId)}
            className={`w-full p-3 rounded-lg border text-sm ${
              settings.darkMode
                ? 'border-slate-800 bg-slate-950 text-slate-100'
                : 'border-slate-200 bg-white text-slate-800'
            }`}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Repeat count */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">Repeat each phrase</p>
        <div className="flex gap-2">
          {[2, 3, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRepeatCount(n)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                repeatCount === n
                  ? 'bg-teal-500 text-white'
                  : settings.darkMode
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {n}x
            </button>
          ))}
        </div>
      </div>

      {/* Pause duration */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">Pause between phrases</p>
        <div className="flex gap-2">
          {(['short', 'medium', 'long'] as const).map((dur) => (
            <button
              key={dur}
              onClick={() => setPauseDuration(dur)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                pauseDuration === dur
                  ? 'bg-teal-500 text-white'
                  : settings.darkMode
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      {/* Phrase count / empty state */}
      <div className="text-center text-sm text-slate-400">
        {isEmpty
          ? 'No phrases in this set. Choose a different source.'
          : `${resolvedIds.length} phrases`}
      </div>

      {/* Start */}
      <button
        onClick={handleStart}
        disabled={isEmpty}
        className="w-full py-3 rounded-lg bg-teal-500 text-white text-sm font-medium active:bg-teal-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
      >
        <Repeat size={18} />
        Start Loop
      </button>
    </div>
  );
}
