import type { Phrase } from '../types';
import { useSettings } from '../hooks/useSettings';

interface PhraseCardProps {
  phrase: Phrase;
  showPhonetics?: boolean;
}

export default function PhraseCard({ phrase, showPhonetics = true }: PhraseCardProps) {
  const { settings } = useSettings();
  const hasVariant = !!phrase.ptFem;

  return (
    <div
      className={`rounded-xl border p-6 flex flex-col items-center text-center gap-3 ${
        settings.darkMode
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      {hasVariant ? (
        <>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <p className={`text-2xl font-semibold ${settings.darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {phrase.pt}
              </p>
              {showPhonetics && phrase.ptPhonetic && (
                <p className={`text-sm italic ${settings.darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                  {phrase.ptPhonetic}
                </p>
              )}
              <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                settings.darkMode ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>masc.</span>
            </div>
            <span className={`text-lg ${settings.darkMode ? 'text-slate-600' : 'text-slate-300'}`}>/</span>
            <div className="flex flex-col items-center">
              <p className={`text-2xl font-semibold ${settings.darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {phrase.ptFem}
              </p>
              {showPhonetics && phrase.ptFemPhonetic && (
                <p className={`text-sm italic ${settings.darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                  {phrase.ptFemPhonetic}
                </p>
              )}
              <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                settings.darkMode ? 'bg-pink-900/40 text-pink-300' : 'bg-pink-100 text-pink-600'
              }`}>fem.</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={`text-2xl font-semibold ${settings.darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {phrase.pt}
          </p>
          {showPhonetics && phrase.ptPhonetic && (
            <p className={`text-sm italic ${settings.darkMode ? 'text-slate-400' : 'text-slate-400'}`}>
              {phrase.ptPhonetic}
            </p>
          )}
        </>
      )}
      <p className={`text-base ${settings.darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
        {phrase.en}
      </p>
    </div>
  );
}
