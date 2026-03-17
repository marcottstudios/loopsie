import type { Phrase } from '../types';
import { useSettings } from '../hooks/useSettings';

interface PhraseCardProps {
  phrase: Phrase;
  showPhonetics?: boolean;
}

export default function PhraseCard({ phrase, showPhonetics = true }: PhraseCardProps) {
  const { settings } = useSettings();

  return (
    <div
      className={`rounded-xl border p-6 flex flex-col items-center text-center gap-3 ${
        settings.darkMode
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      <p className={`text-2xl font-semibold ${settings.darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
        {phrase.pt}
      </p>
      {showPhonetics && phrase.ptPhonetic && (
        <p className={`text-sm italic ${settings.darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
          {phrase.ptPhonetic}
        </p>
      )}
      <p className={`text-base ${settings.darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
        {phrase.en}
      </p>
    </div>
  );
}
