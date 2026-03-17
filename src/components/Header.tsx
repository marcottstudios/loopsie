import { useLocation } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

const pageTitles: Record<string, string> = {
  '/': 'Loopsie',
  '/browse': 'Browse',
  '/review': 'Review',
  '/favorites': 'Favorites',
  '/settings': 'Settings',
  '/loop': 'Loop Mode',
  '/loop/play': 'Loop Player',
};

export default function Header() {
  const { pathname } = useLocation();
  const { settings } = useSettings();

  // Match lesson routes
  let title = pageTitles[pathname];
  if (!title) {
    if (pathname.startsWith('/lesson/') && pathname.endsWith('/complete')) {
      title = 'Lesson Complete';
    } else if (pathname.startsWith('/lesson/')) {
      title = 'Lesson';
    } else {
      title = 'Loopsie';
    }
  }

  return (
    <header
      className={`h-14 flex items-center px-4 border-b ${
        settings.darkMode
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      <h1 className={`text-lg font-medium ${settings.darkMode ? 'text-slate-100' : 'text-slate-700'}`}>
        {title}
      </h1>
    </header>
  );
}
