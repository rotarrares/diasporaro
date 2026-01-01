import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Profile } from '@/lib/types';
import { STORAGE_KEYS } from '@/lib/constants';

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  resetProfile: () => void;
  isProfileComplete: () => boolean;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,

      setProfile: (profile: Profile) => {
        set({ profile });
      },

      updateProfile: (updates: Partial<Profile>) => {
        const currentProfile = get().profile;
        if (!currentProfile) return;

        set({
          profile: {
            ...currentProfile,
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      resetProfile: () => {
        set({ profile: null });
      },

      isProfileComplete: () => {
        const profile = get().profile;
        return !!(
          profile &&
          profile.residenceCountry &&
          profile.workSituation &&
          profile.duration &&
          profile.familyStatus &&
          profile.familyStatus.length > 0
        );
      },
    }),
    {
      name: STORAGE_KEYS.PROFILE,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window === 'undefined') return null;

          try {
            const str = localStorage.getItem(name);
            if (!str) return null;

            // Check if the stored value is the corrupted "[object Object]" string
            if (str === '[object Object]') {
              console.warn('Detected corrupted localStorage data, clearing...');
              localStorage.removeItem(name);
              return null;
            }

            const parsed = JSON.parse(str);
            return parsed;
          } catch (error) {
            console.error('Failed to parse stored data:', error);
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;

          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Failed to save to localStorage:', error);
          }
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      })),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Error hydrating profile store:', error);
          // Clear corrupted data
          if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEYS.PROFILE);
          }
        }
      },
    }
  )
);
