import { useState } from 'react';
import { Headphones, Repeat, Heart, ChevronRight } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: <Headphones size={40} className="text-teal-500" />,
    title: 'Listen & Repeat',
    description:
      'Each phrase plays in English, then European Portuguese. Listen carefully and repeat out loud.',
  },
  {
    icon: <Repeat size={40} className="text-teal-500" />,
    title: 'Loop Mode',
    description:
      'Play phrases on repeat, hands-free. Perfect for walking, commuting, or doing chores.',
  },
  {
    icon: <Heart size={40} className="text-teal-500" />,
    title: 'Track Your Progress',
    description:
      'Mark phrases as easy or needs practice. Favorite the ones you love. Review when ready.',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const { settings } = useSettings();

  const isLast = stepIndex === steps.length - 1;
  const current = steps[stepIndex];

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 ${
      settings.darkMode ? 'bg-slate-900' : 'bg-stone-50'
    }`}>
      <div className="flex flex-col items-center text-center gap-4 max-w-sm">
        {current.icon}
        <h2 className={`text-xl font-semibold ${
          settings.darkMode ? 'text-slate-100' : 'text-slate-800'
        }`}>{current.title}</h2>
        <p className={`text-sm leading-relaxed ${
          settings.darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}>{current.description}</p>
      </div>

      <div className="flex gap-2 mt-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === stepIndex ? 'bg-teal-500' : settings.darkMode ? 'bg-slate-700' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-sm mt-8 flex flex-col gap-3">
        <button
          onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              setStepIndex(stepIndex + 1);
            }
          }}
          className="w-full py-3 rounded-lg bg-teal-500 text-white text-sm font-medium active:bg-teal-600 transition-colors flex items-center justify-center gap-1"
        >
          {isLast ? "Let's Go!" : 'Next'}
          {!isLast && <ChevronRight size={16} />}
        </button>

        {!isLast && (
          <button
            onClick={onComplete}
            className="w-full py-3 text-sm font-medium text-slate-400 active:text-slate-500 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
