import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, X, Filter } from 'lucide-react';
import { phrases as allPhrases } from '../data/content';
import { categories } from '../data/categories';
import { situations } from '../data/situations';
import { useLoopStore } from '../stores/loopStore';
import { playPhraseSequence } from '../lib/AudioEngine';
import PhraseCard from '../components/PhraseCard';
import type { LengthBand, Category, Situation, Difficulty } from '../types';
import { incrementTimesPlayed } from '../lib/db';
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
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-teal-500 text-white'
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
    setSource({ type: 'category', categoryId: selectedCategory ?? '' }, ids);
    navigate('/loop/play');
  };

  useEffect(() => {
    return () => {
      if (cancelFn) cancelFn();
    };
  }, [cancelFn]);

  return (
    <div className="px-4 py-6 flex flex-col gap-4">
      {/* Filter toggle + Loop button */}
      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${
                settings.darkMode ? 'text-slate-400' : 'text-slate-400'
              }`}
            >
              <X size={12} />
              Clear
            </button>
          )}
          <button
            onClick={handleLoopThese}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium disabled:opacity-40"
          >
            <Repeat size={14} />
            Loop these
          </button>
        </div>
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
          {filtered.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => handlePlayPhrase(phrase.id)}
              className="text-left"
            >
              <PhraseCard phrase={phrase} showPhonetics={settings.showPhonetics} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
