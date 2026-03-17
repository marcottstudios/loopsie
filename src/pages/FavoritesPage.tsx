import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { liveQuery } from 'dexie';
import { Repeat, Heart, HeartOff } from 'lucide-react';
import { phrases as allPhrases } from '../data/content';
import { db, toggleFavorite } from '../lib/db';
import { useLoopStore } from '../stores/loopStore';
import type { Phrase } from '../types';
import PhraseCard from '../components/PhraseCard';
import { useSettings } from '../hooks/useSettings';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favPhrases, setFavPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSource } = useLoopStore();
  const { settings } = useSettings();

  useEffect(() => {
    const subscription = liveQuery(() => db.phraseProgress.toArray()).subscribe({
      next: (all) => {
        const favIds = all.filter((p) => p.isFavorite).map((p) => p.phraseId);
        const matched = favIds
          .map((id) => allPhrases.find((p) => p.id === id))
          .filter(Boolean) as Phrase[];
        setFavPhrases(matched);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUnfavorite = async (phraseId: string) => {
    await toggleFavorite(phraseId);
    setFavPhrases((prev) => prev.filter((p) => p.id !== phraseId));
  };

  const handleLoopThese = () => {
    const ids = favPhrases.map((p) => p.id);
    if (ids.length === 0) return;
    setSource({ type: 'favorites' }, ids);
    navigate('/loop/play');
  };

  if (loading) {
    return (
      <div className="px-4 py-6">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (favPhrases.length === 0) {
    return (
      <div className="px-4 py-6 flex flex-col items-center justify-center gap-3 text-center min-h-[50vh]">
        <Heart size={32} className="text-slate-300" />
        <p className="text-slate-500">No favorites yet. Tap the heart icon on any phrase to save it.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{favPhrases.length} favorites</p>
        <button
          onClick={handleLoopThese}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium"
        >
          <Repeat size={14} />
          Loop these
        </button>
      </div>

      {favPhrases.map((phrase) => (
        <div key={phrase.id} className="flex flex-col gap-2">
          <PhraseCard phrase={phrase} showPhonetics={settings.showPhonetics} />
          <button
            onClick={() => handleUnfavorite(phrase.id)}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium ${
              settings.darkMode
                ? 'bg-slate-900 text-slate-300 active:bg-slate-800'
                : 'bg-stone-100 text-slate-500 active:bg-stone-200'
            }`}
          >
            <HeartOff size={14} />
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
