import { useSettings } from '../hooks/useSettings';
import { Moon, Sun, Eye, EyeOff } from 'lucide-react';
import type { PlaybackTemplate, Speed, PauseDuration } from '../types';

function SettingRow({
  label,
  darkMode,
  children,
}: {
  label: string;
  darkMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
        {label}
      </p>
      {children}
    </div>
  );
}

function OptionButtons<T extends string | number>({
  options,
  value,
  onChange,
  darkMode,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  darkMode: boolean;
}) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            value === opt.value
              ? 'bg-teal-500 text-white'
              : darkMode
                ? 'bg-slate-950 border border-slate-800 text-slate-200'
                : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
  icon,
  label,
  darkMode,
}: {
  enabled: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  label: string;
  darkMode: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-3 rounded-lg border ${
        darkMode
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>
          {label}
        </span>
      </div>
      <div
        className={`w-10 h-6 rounded-full transition-colors flex items-center ${
          enabled ? 'bg-teal-500 justify-end' : 'bg-slate-200 justify-start'
        }`}
      >
        <div className="w-5 h-5 rounded-full bg-white shadow-sm mx-0.5" />
      </div>
    </button>
  );
}

export default function SettingsPage() {
  const { settings, updateSettings, loading } = useSettings();
  const dm = settings.darkMode;

  if (loading) {
    return (
      <div className="px-4 py-6">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex flex-col gap-5">
      <SettingRow label="Playback Template" darkMode={dm}>
        <OptionButtons<PlaybackTemplate>
          options={[
            { value: 'full', label: 'Full' },
            { value: 'standard', label: 'Standard' },
            { value: 'pt-only', label: 'PT Only' },
          ]}
          value={settings.playbackTemplate}
          onChange={(v) => updateSettings({ playbackTemplate: v })}
          darkMode={dm}
        />
        <p className="text-xs text-slate-400">
          {settings.playbackTemplate === 'full' && 'English → Portuguese → Portuguese → pause'}
          {settings.playbackTemplate === 'standard' && 'English → Portuguese → pause'}
          {settings.playbackTemplate === 'pt-only' && 'Portuguese → pause'}
        </p>
      </SettingRow>

      <SettingRow label="Speed" darkMode={dm}>
        <OptionButtons<Speed>
          options={[
            { value: 0.75, label: 'Slow (0.75x)' },
            { value: 1.0, label: 'Normal (1x)' },
          ]}
          value={settings.speed}
          onChange={(v) => updateSettings({ speed: v })}
          darkMode={dm}
        />
      </SettingRow>

      <SettingRow label="Pause Duration" darkMode={dm}>
        <OptionButtons<PauseDuration>
          options={[
            { value: 'short', label: 'Short' },
            { value: 'medium', label: 'Medium' },
            { value: 'long', label: 'Long' },
          ]}
          value={settings.pauseDuration}
          onChange={(v) => updateSettings({ pauseDuration: v })}
          darkMode={dm}
        />
      </SettingRow>

      <Toggle
        enabled={settings.showPhonetics}
        onToggle={() => updateSettings({ showPhonetics: !settings.showPhonetics })}
        icon={
          settings.showPhonetics ? (
            <Eye size={18} className="text-teal-500" />
          ) : (
            <EyeOff size={18} className="text-slate-400" />
          )
        }
        label="Show Phonetics"
        darkMode={dm}
      />

      <Toggle
        enabled={settings.darkMode}
        onToggle={() => updateSettings({ darkMode: !settings.darkMode })}
        icon={
          settings.darkMode ? (
            <Moon size={18} className="text-teal-500" />
          ) : (
            <Sun size={18} className="text-slate-400" />
          )
        }
        label="Dark Mode"
        darkMode={dm}
      />
    </div>
  );
}
