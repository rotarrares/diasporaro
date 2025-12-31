import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
    }
  )
);
