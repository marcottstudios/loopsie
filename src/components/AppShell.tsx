import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import { useSettings } from '../hooks/useSettings';

export default function AppShell() {
  const { settings } = useSettings();

  return (
    <div
      className={`min-h-dvh ${
        settings.darkMode ? 'bg-slate-900 text-slate-100' : 'bg-stone-50 text-slate-800'
      }`}
    >
      <Header />
      <main className="min-h-[calc(100dvh-3.5rem)] overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
