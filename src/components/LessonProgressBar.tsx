import { useSettings } from '../hooks/useSettings';

interface LessonProgressBarProps {
  current: number;
  total: number;
}

export default function LessonProgressBar({ current, total }: LessonProgressBarProps) {
  const { settings } = useSettings();
  const percent = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 h-2 rounded-full overflow-hidden ${
        settings.darkMode ? 'bg-slate-700' : 'bg-stone-200'
      }`}>
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className={`text-sm tabular-nums ${
        settings.darkMode ? 'text-slate-400' : 'text-slate-400'
      }`}>
        {current + 1}/{total}
      </span>
    </div>
  );
}
