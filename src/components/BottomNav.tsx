import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Search, RotateCcw, Settings } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/browse', icon: Search, label: 'Browse' },
  { to: '/review', icon: RotateCcw, label: 'Review' },
  { to: '/favorites', icon: BookOpen, label: 'Favorites' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const { settings } = useSettings();

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 h-16 flex items-center justify-around border-t backdrop-blur-sm ${
        settings.darkMode
          ? 'bg-slate-950/95 border-slate-800'
          : 'bg-white/95 border-slate-200'
      }`}
    >
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              isActive ? 'text-teal-500' : settings.darkMode ? 'text-slate-500' : 'text-slate-400'
            }`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
