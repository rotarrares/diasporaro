'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { getDashboardCards } from '@/lib/rules-engine';
import { getResourcesByCountryAndTopic } from '@/lib/official-resources';
import { DISCLAIMER_TEXT, INFO_LAST_UPDATED } from '@/lib/constants';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TopicCard from '@/components/dashboard/TopicCard';
import DocumentsList from '@/components/dashboard/DocumentsList';
import NextSteps from '@/components/dashboard/NextSteps';
import TaxDeadlines from '@/components/dashboard/TaxDeadlines';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { profile, isProfileComplete } = useProfile();

  useEffect(() => {
    if (!isProfileComplete) {
      router.push('/onboarding');
    }
  }, [isProfileComplete, router]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Se încarcă...</p>
        </div>
      </div>
    );
  }

  const dashboardCards = getDashboardCards(profile);
  const { applicableRules } = profile;

  // Get official resources based on user's country - organized by topic
  const resourcesByTopic = {
    'social-security': getResourcesByCountryAndTopic(
      profile.destinationCountry,
      'social-security'
    ),
    healthcare: getResourcesByCountryAndTopic(
      profile.destinationCountry,
      'healthcare'
    ),
    taxes: getResourcesByCountryAndTopic(
      profile.destinationCountry,
      'taxes'
    ),
    pension: getResourcesByCountryAndTopic(
      profile.destinationCountry,
      'pension'
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader profile={profile} />

      <div className="p-4 space-y-4 pb-20">
        {/* Legal Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-1">Notă Legală</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                {DISCLAIMER_TEXT}
              </p>
              {profile.rulesLastUpdated && (
                <p className="text-xs text-amber-700 mt-2">
                  Informațiile tale au fost calculate pe baza regulilor actualizate la: {profile.rulesLastUpdated}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Next Steps - Show first for immediate action items */}
        {applicableRules.consolidatedNextSteps.length > 0 && (
          <NextSteps steps={applicableRules.consolidatedNextSteps} />
        )}

        {/* Tax Deadlines */}
        {applicableRules.taxes.deadlines && applicableRules.taxes.deadlines.length > 0 && (
          <TaxDeadlines deadlines={applicableRules.taxes.deadlines} />
        )}

        {/* Topic Cards with Official Resources */}
        {dashboardCards.map((card) => (
          <TopicCard
            key={card.topic}
            card={card}
            resources={resourcesByTopic[card.topic]}
          />
        ))}

        {/* Required Documents */}
        {applicableRules.requiredDocuments.length > 0 && (
          <DocumentsList
            documents={applicableRules.requiredDocuments}
            title="📄 Documente Necesare"
          />
        )}

        {/* Recommended Documents */}
        {applicableRules.recommendedDocuments.length > 0 && (
          <DocumentsList
            documents={applicableRules.recommendedDocuments}
            title="💡 Documente Recomandate"
          />
        )}
      </div>
    </div>
  );
}
