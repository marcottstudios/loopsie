interface LessonProgressBarProps {
  current: number;
  total: number;
}

export default function LessonProgressBar({ current, total }: LessonProgressBarProps) {
  const percent = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm text-slate-400 tabular-nums">
        {current + 1}/{total}
      </span>
    </div>
  );
}
