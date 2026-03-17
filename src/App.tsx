import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Onboarding from './components/Onboarding';
import { useSettings } from './hooks/useSettings';
import { usePlayerStore } from './stores/playerStore';
import { useLoopStore } from './stores/loopStore';
import HomePage from './pages/HomePage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import LessonCompletePage from './pages/LessonCompletePage';
import LoopSetupPage from './pages/LoopSetupPage';
import LoopPlayerPage from './pages/LoopPlayerPage';
import BrowsePage from './pages/BrowsePage';
import ReviewPage from './pages/ReviewPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';

function SettingsSync({
  playbackTemplate,
  speed,
  pauseDuration,
}: {
  playbackTemplate: 'full' | 'standard' | 'pt-only';
  speed: 0.75 | 1.0;
  pauseDuration: 'short' | 'medium' | 'long';
}) {
  const syncPlayerSettings = usePlayerStore((state) => state.syncSettings);
  const syncLoopSettings = useLoopStore((state) => state.syncSettings);

  useEffect(() => {
    const next = { playbackTemplate, speed, pauseDuration };
    syncPlayerSettings(next);
    syncLoopSettings(next);
  }, [playbackTemplate, speed, pauseDuration, syncPlayerSettings, syncLoopSettings]);

  return null;
}

export default function App() {
  const { settings, updateSettings, loading } = useSettings();

  if (loading) return null;

  return (
    <div className={settings.darkMode ? 'dark' : ''}>
      <SettingsSync
        playbackTemplate={settings.playbackTemplate}
        speed={settings.speed}
        pauseDuration={settings.pauseDuration}
      />
      {!settings.onboardingDone && (
        <Onboarding onComplete={() => updateSettings({ onboardingDone: true })} />
      )}
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="lesson/:id" element={<LessonPlayerPage />} />
            <Route path="lesson/:id/complete" element={<LessonCompletePage />} />
            <Route path="loop" element={<LoopSetupPage />} />
            <Route path="loop/play" element={<LoopPlayerPage />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
