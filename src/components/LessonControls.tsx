import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface LessonControlsProps {
  onPlay: () => void;
  onSlow: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isPlaying?: boolean;
}

function ControlButton({
  onClick,
  disabled,
  children,
  primary,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const { settings } = useSettings();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 ${
        primary
          ? 'w-14 h-14 bg-teal-500 text-white active:bg-teal-600'
          : settings.darkMode
            ? 'w-12 h-12 bg-slate-950 text-slate-200 active:bg-slate-900'
            : 'w-12 h-12 bg-stone-100 text-slate-600 active:bg-stone-200'
      }`}
    >
      {children}
    </button>
  );
}

export default function LessonControls({
  onPlay,
  onSlow,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isPlaying = false,
}: LessonControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <ControlButton onClick={onPrevious} disabled={!hasPrevious}>
        <SkipBack size={20} />
      </ControlButton>

      <ControlButton onClick={onSlow}>
        <Volume2 size={18} />
      </ControlButton>

      <ControlButton onClick={onPlay} primary>
        {isPlaying ? (
          <Pause size={24} />
        ) : (
          <Play size={24} className="ml-0.5" />
        )}
      </ControlButton>

      <ControlButton onClick={onNext} disabled={!hasNext}>
        <SkipForward size={20} />
      </ControlButton>
    </div>
  );
}
