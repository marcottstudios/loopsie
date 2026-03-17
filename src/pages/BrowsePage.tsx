import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, X, Filter, Heart, Repeat2 } from 'lucide-react';
import { liveQuery } from 'dexie';
import { phrases as allPhrases } from '../data/content';
import { categories } from '../data/categories';
import { situations } from '../data/situations';
import { useLoopStore } from '../stores/loopStore';
import { playPhraseSequence } from '../lib/AudioEngine';
import PhraseCard from '../components/PhraseCard';
import type { LengthBand, Category, Situation, Difficulty } from '../types';
import { incrementTimesPlayed, toggleFavorite, db } from '../lib/db';
import { useSettings } from '../hooks/useSettings';

const lengthBands: { id: LengthBand; label: string }[] = [
  { id: '1-word', label: '1 word' },
  { id: '2-word', label: '2 words' },
  { id: '3-word', label: '3 words' },
  { id: 'short-phrase', label: 'Short phrase' },
  { id: 'pattern', label: 'Pattern' },
];

const difficulties: { id: Difficulty; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'beginner-plus', label: 'Beginner+' },
  { id: 'intermediate', label: 'Intermediate' },
];

function FilterChip({
  label,
  active,
  onClick,
  darkMode,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  darkMode: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-teal-500 text-white'
          : darkMode
            ? 'bg-slate-900 border border-slate-800 text-slate-200'
            : 'bg-white border border-slate-200 text-slate-600'
      }`}
    >
      {label}
    </button>
  );
}

export default function BrowsePage() {
  const navigate = useNavigate();
  const { setSource } = useLoopStore();
  const { settings } = useSettings();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
  const [selectedLength, setSelectedLength] = useState<LengthBand | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [cancelFn, setCancelFn] = useState<(() => void) | null>(null);

  // Favorite state from Dexie
  const [favSet, setFavSet] = useState<Set<string>>(new Set());

  // Long press state
  const [longPressId, setLongPressId] = useState<string | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load favorites reactively
  useEffect(() => {
    const sub = liveQuery(() => db.phraseProgress.toArray()).subscribe({
      next: (all) => {
        setFavSet(new Set(all.filter((p) => p.isFavorite).map((p) => p.phraseId)));
      },
    });
    return () => sub.unsubscribe();
  }, []);

  const hasFilters = selectedCategory || selectedSituation || selectedLength || selectedDifficulty;

  const filtered = allPhrases.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedSituation && !p.situations.includes(selectedSituation)) return false;
    if (selectedLength && p.lengthBand !== selectedLength) return false;
    if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedSituation(null);
    setSelectedLength(null);
    setSelectedDifficulty(null);
  };

  const handlePlayPhrase = (phraseId: string) => {
    if (cancelFn) cancelFn();
    incrementTimesPlayed(phraseId);
    const cancel = playPhraseSequence(phraseId, {
      template: settings.playbackTemplate,
      speed: settings.speed,
      pauseDuration: settings.pauseDuration,
    });
    setCancelFn(() => cancel);
  };

  const handleLoopThese = () => {
    const ids = filtered.map((p) => p.id);
    if (ids.length === 0) return;
    setSource({ type: 'browse' }, ids);
    navigate('/loop/play');
  };

  const handleFavorite = useCallback(async (phraseId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    await toggleFavorite(phraseId);
  }, []);

  const handleLoopFrom = useCallback((phraseId: string) => {
    const idx = filtered.findIndex((p) => p.id === phraseId);
    if (idx === -1) return;
    // Loop from this phrase through the rest, then wrap
    const ids = [...filtered.slice(idx), ...filtered.slice(0, idx)].map((p) => p.id);
    setSource({ type: 'browse' }, ids);
    setLongPressId(null);
    navigate('/loop/play');
  }, [filtered, setSource, navigate]);

  // Long press handlers
  const startLongPress = useCallback((phraseId: string) => {
    longPressTimer.current = setTimeout(() => {
      setLongPressId(phraseId);
    }, 500);
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (cancelFn) cancelFn();
    };
  }, [cancelFn]);

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      {/* Filter toggle + Loop button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              settings.darkMode
                ? 'bg-slate-950 border border-slate-800 text-slate-200'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            <Filter size={14} />
            Filters {hasFilters ? '(active)' : ''}
          </button>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        <button
          onClick={handleLoopThese}
          disabled={filtered.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium disabled:opacity-40"
        >
          <Repeat size={14} />
          Loop all
        </button>
      </div>

      {/* Filter panels */}
      {showFilters && (
        <div
          className={`flex flex-col gap-3 rounded-xl border p-3 ${
            settings.darkMode
              ? 'bg-slate-950 border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Category</p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <FilterChip
                  key={c.id}
                  label={c.label}
                  active={selectedCategory === c.id}
                  darkMode={settings.darkMode}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === c.id ? null : c.id)
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Situation</p>
            <div className="flex flex-wrap gap-1.5">
              {situations.map((s) => (
                <FilterChip
                  key={s.id}
                  label={s.label}
                  active={selectedSituation === s.id}
                  darkMode={settings.darkMode}
                  onClick={() =>
                    setSelectedSituation(selectedSituation === s.id ? null : s.id)
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Length</p>
            <div className="flex flex-wrap gap-1.5">
              {lengthBands.map((l) => (
                <FilterChip
                  key={l.id}
                  label={l.label}
                  active={selectedLength === l.id}
                  darkMode={settings.darkMode}
                  onClick={() =>
                    setSelectedLength(selectedLength === l.id ? null : l.id)
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-1.5">Difficulty</p>
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((d) => (
                <FilterChip
                  key={d.id}
                  label={d.label}
                  active={selectedDifficulty === d.id}
                  darkMode={settings.darkMode}
                  onClick={() =>
                    setSelectedDifficulty(selectedDifficulty === d.id ? null : d.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-400">
        {filtered.length} {filtered.length === 1 ? 'phrase' : 'phrases'}
      </p>

      {/* Results or empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 text-center py-12">
          <p className="text-slate-500">No phrases match these filters. Try removing a filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((phrase) => {
            const isFav = favSet.has(phrase.id);

            return (
              <div key={phrase.id} className="relative">
                <button
                  className="text-left w-full"
                  onClick={() => handlePlayPhrase(phrase.id)}
                  onMouseDown={() => startLongPress(phrase.id)}
                  onMouseUp={cancelLongPress}
                  onMouseLeave={cancelLongPress}
                  onTouchStart={() => startLongPress(phrase.id)}
                  onTouchEnd={cancelLongPress}
                  onTouchCancel={cancelLongPress}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <PhraseCard phrase={phrase} showPhonetics={settings.showPhonetics} />
                </button>

                {/* Heart button */}
                <button
                  onClick={(e) => handleFavorite(phrase.id, e)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                >
                  <Heart
                    size={18}
                    className={isFav ? 'text-rose-500' : 'text-slate-300'}
                    fill={isFav ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Long press popup */}
      {longPressId && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setLongPressId(null)}
          />
          <div
            className={`fixed left-4 right-4 bottom-24 z-50 rounded-xl border p-4 flex flex-col gap-3 shadow-lg ${
              settings.darkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <p className={`text-sm font-medium ${settings.darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              {allPhrases.find((p) => p.id === longPressId)?.pt}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleFavorite(longPressId);
                  setLongPressId(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-rose-500 text-white text-sm font-medium active:bg-rose-600"
              >
                <Heart size={16} fill={favSet.has(longPressId) ? 'currentColor' : 'none'} />
                {favSet.has(longPressId) ? 'Unfavorite' : 'Favorite'}
              </button>
              <button
                onClick={() => handleLoopFrom(longPressId)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-teal-500 text-white text-sm font-medium active:bg-teal-600"
              >
                <Repeat2 size={16} />
                Loop from here
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
