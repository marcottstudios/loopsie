import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { liveQuery } from 'dexie';
import { BookOpen, Repeat, Search, RotateCcw, Heart } from 'lucide-react';
import { lessons } from '../data/lessons';
import { db } from '../lib/db';
import { useSettings } from '../hooks/useSettings';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  accent?: boolean;
}

function DashboardCard({ icon, title, description, onClick, accent }: DashboardCardProps) {
  const { settings } = useSettings();

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${
        accent
          ? 'bg-teal-500 text-white'
          : settings.darkMode
            ? 'bg-slate-950 border border-slate-800 text-slate-100'
            : 'bg-white border border-slate-200 text-slate-800'
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          accent ? 'bg-teal-600' : 'bg-stone-50'
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className={`text-lg font-medium ${accent ? 'text-white' : ''}`}>{title}</p>
        <p className={`text-sm ${accent ? 'text-teal-100' : 'text-slate-400'}`}>
          {description}
        </p>
      </div>
    </button>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [hasProgress, setHasProgress] = useState(false);
  const [resumeLessonId, setResumeLessonId] = useState<string | null>(null);

  const firstLesson = lessons[0];

  useEffect(() => {
    const subscription = liveQuery(() => db.phraseProgress.toArray()).subscribe({
      next: (progress) => {
        setHasProgress(progress.length > 0);

        const mostRecent = progress
          .filter((item) => item.lastPracticedAt !== null)
          .sort((a, b) => (b.lastPracticedAt ?? 0) - (a.lastPracticedAt ?? 0))[0];

        if (!mostRecent) {
          setResumeLessonId(null);
          return;
        }

        const lesson = lessons.find((entry) => entry.phraseIds.includes(mostRecent.phraseId));
        setResumeLessonId(lesson?.id ?? null);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      {/* Start / Continue lesson */}
      <DashboardCard
        icon={<BookOpen size={20} className={hasProgress ? 'text-white' : 'text-teal-500'} />}
        title={hasProgress ? 'Continue Lesson' : 'Start Your First Lesson'}
        description={
          hasProgress
            ? 'Pick up where you left off'
            : firstLesson.title
        }
        onClick={() => navigate(`/lesson/${resumeLessonId ?? firstLesson.id}`)}
        accent
      />

      {/* Loop Mode */}
      <DashboardCard
        icon={<Repeat size={20} className="text-teal-500" />}
        title="Loop Mode"
        description="Hands-free audio repetition"
        onClick={() => navigate('/loop')}
      />

      {/* Browse */}
      <DashboardCard
        icon={<Search size={20} className="text-teal-500" />}
        title="Browse"
        description="Explore all phrases and filter"
        onClick={() => navigate('/browse')}
      />

      {/* Review */}
      <DashboardCard
        icon={<RotateCcw size={20} className="text-teal-500" />}
        title="Review"
        description="Practice phrases that need work"
        onClick={() => navigate('/review')}
      />

      {/* Favorites */}
      <DashboardCard
        icon={<Heart size={20} className="text-teal-500" />}
        title="Favorites"
        description="Your saved phrases"
        onClick={() => navigate('/favorites')}
      />
    </div>
  );
}
