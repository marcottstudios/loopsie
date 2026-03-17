import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ThumbsUp, RotateCcw, Heart } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useSettings } from '../hooks/useSettings';

interface LessonSummary {
  total: number;
  easy: number;
  practice: number;
  favorited: number;
  unrated: number;
}

export default function LessonCompletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === id);
  const { settings } = useSettings();

  // Read summary from sessionStorage
  const raw = sessionStorage.getItem(`lesson-summary-${id}`);
  const summary: LessonSummary = raw
    ? JSON.parse(raw)
    : { total: 0, easy: 0, practice: 0, favorited: 0, unrated: 0 };

  if (!lesson) {
    return (
      <div className="px-4 py-6">
        <p className="text-slate-500">Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col items-center gap-6">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle size={32} className="text-emerald-500" />
      </div>

      <div className="text-center">
        <h2 className={`text-xl font-semibold ${settings.darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
          Lesson Complete!
        </h2>
        <p className="text-sm text-slate-400 mt-1">{lesson.title}</p>
      </div>

      {/* Stats */}
      <div
        className={`w-full rounded-xl border p-4 flex flex-col gap-3 ${
          settings.darkMode
            ? 'bg-slate-950 border-slate-800'
            : 'bg-white border-slate-200'
        }`}
      >
        <p className={`text-sm font-medium ${settings.darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
          Your Results
        </p>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center">
            <ThumbsUp size={16} className="text-emerald-500" />
          </div>
          <span className={`text-sm ${settings.darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
            {summary.easy} marked easy
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center">
            <RotateCcw size={16} className="text-amber-500" />
          </div>
          <span className={`text-sm ${settings.darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
            {summary.practice} need more practice
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center">
            <Heart size={16} className="text-rose-500" />
          </div>
          <span className={`text-sm ${settings.darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
            {summary.favorited} favorited
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => navigate(`/lesson/${id}`)}
          className="w-full py-3 rounded-lg bg-teal-500 text-white text-sm font-medium active:bg-teal-600 transition-colors"
        >
          Redo Lesson
        </button>

        <button
          onClick={() => navigate('/')}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
            settings.darkMode
              ? 'bg-slate-900 text-slate-200 active:bg-slate-800'
              : 'bg-stone-100 text-slate-600 active:bg-stone-200'
          }`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
