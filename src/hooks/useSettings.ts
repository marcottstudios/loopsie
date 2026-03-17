import { useState, useEffect, useCallback } from 'react';
import { liveQuery } from 'dexie';
import { db } from '../lib/db';
import type { UserSettings } from '../types';

const SETTINGS_ID = 1;

const defaults: UserSettings = {
  playbackTemplate: 'standard',
  speed: 1.0,
  pauseDuration: 'medium',
  showPhonetics: true,
  darkMode: false,
  onboardingDone: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = liveQuery(() => db.userSettings.get(SETTINGS_ID)).subscribe({
      next: (row) => {
        if (row) {
          const { id: _, ...rest } = row;
          setSettings({ ...defaults, ...rest });
        } else {
          setSettings(defaults);
        }
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateSettings = useCallback(async (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));

    const current = await db.userSettings.get(SETTINGS_ID);
    await db.userSettings.put({
      id: SETTINGS_ID,
      ...defaults,
      ...(current ?? {}),
      ...updates,
    });
  }, []);

  return { settings, updateSettings, loading };
}
