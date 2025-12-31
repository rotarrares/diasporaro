import { useProfileStore } from '@/stores/profileStore';
import { useMemo } from 'react';

export function useProfile() {
  const { profile, setProfile, updateProfile, resetProfile, isProfileComplete } = useProfileStore();

  const hasFamily = useMemo(() => {
    if (!profile) return false;
    return profile.familyStatus.some(status =>
      status === 'spouse_with' || status === 'children_with'
    );
  }, [profile]);

  const isReturning = useMemo(() => {
    return profile?.workSituation === 'returning';
  }, [profile]);

  const destinationCountryName = useMemo(() => {
    if (!profile) return '';
    const countryMap: Record<string, string> = {
      RO: 'România',
      DE: 'Germania',
      ES: 'Spania',
      IT: 'Italia',
      FR: 'Franța',
      UK: 'Marea Britanie',
    };
    return countryMap[profile.destinationCountry] || '';
  }, [profile]);

  return {
    profile,
    setProfile,
    updateProfile,
    resetProfile,
    isProfileComplete: isProfileComplete(),
    hasFamily,
    isReturning,
    destinationCountryName,
  };
}
