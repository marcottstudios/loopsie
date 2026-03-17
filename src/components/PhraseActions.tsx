import { Heart, ThumbsUp, RotateCcw } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface PhraseActionsProps {
  isFavorite: boolean;
  rating: 'easy' | 'practice' | null;
  onFavorite: () => void;
  onEasy: () => void;
  onPractice: () => void;
}

export default function PhraseActions({
  isFavorite,
  rating,
  onFavorite,
  onEasy,
  onPractice,
}: PhraseActionsProps) {
  const { settings } = useSettings();

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={onEasy}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          rating === 'easy'
            ? 'bg-emerald-500 text-white'
            : settings.darkMode
              ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
              : 'bg-stone-100 text-slate-600 active:bg-stone-200'
        }`}
      >
        <ThumbsUp size={16} />
        Easy
      </button>

      <button
        onClick={onPractice}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          rating === 'practice'
            ? 'bg-amber-500 text-white'
            : settings.darkMode
              ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
              : 'bg-stone-100 text-slate-600 active:bg-stone-200'
        }`}
      >
        <RotateCcw size={16} />
        Practice
      </button>

      <button
        onClick={onFavorite}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isFavorite
            ? 'bg-rose-500 text-white'
            : settings.darkMode
              ? 'bg-slate-950 text-slate-200 active:bg-slate-900'
              : 'bg-stone-100 text-slate-600 active:bg-stone-200'
        }`}
      >
        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        Fav
      </button>
    </div>
  );
}
