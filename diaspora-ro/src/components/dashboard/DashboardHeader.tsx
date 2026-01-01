'use client';

import Link from 'next/link';
import { Profile } from '@/lib/types';
import { COUNTRY_FLAGS, SITUATION_NAMES, COUNTRY_NAMES } from '@/lib/constants';
import { Settings, Edit2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExportShareButtons } from '@/components/ui/export-share-buttons';
import { exportDashboardToPDF } from '@/lib/pdf-export';

interface Props {
  profile: Profile;
}

export default function DashboardHeader({ profile }: Props) {
  const countryName = COUNTRY_NAMES[profile.residenceCountry];

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case 'under_3m': return 'Sub 3 luni';
      case '3m_to_6m': return '3 - 6 luni';
      case '6m_to_1y': return '6 luni - 1 an';
      case '1y_to_2y': return '1 - 2 ani';
      case 'over_2y': return 'Peste 2 ani';
      case 'not_yet': return 'În planificare';
      default: return '';
    }
  };

  const getFamilyLabel = () => {
    if (!profile.familyStatus || profile.familyStatus.length === 0) return '';
    if (profile.familyStatus.includes('single')) return 'Singur/ă';

    const labels = [];
    if (profile.familyStatus.includes('spouse_with')) labels.push('Soț/Soție');
    if (profile.familyStatus.includes('children_with')) labels.push('Copii');
    if (profile.familyStatus.includes('family_in_romania')) labels.push('Familie în RO');

    return labels.join(', ');
  };

  const handleExportPDF = async () => {
    await exportDashboardToPDF(profile);
  };

  const handleSendEmail = async () => {
    // Prompt for email address
    const email = prompt('Introduceți adresa de email:');
    if (!email) return;

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        type: 'dashboard',
        data: {
          profile,
          nextSteps: profile.applicableRules.consolidatedNextSteps,
          requiredDocuments: profile.applicableRules.requiredDocuments,
          taxDeadlines: profile.applicableRules.taxes.deadlines,
        },
      }),
    });

    if (response.ok) {
      alert('Email trimis cu succes!');
    } else {
      alert('Eroare la trimiterea email-ului.');
    }
  };

  return (
    <div className="bg-white border-b">
      {/* Header with Back Button and Settings */}
      <div className="flex items-center justify-between p-4 pb-3">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          title="Înapoi la pagina principală"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Acasă</span>
        </Link>
        <div className="flex items-center gap-2">
          <ExportShareButtons
            variant="compact"
            onExportPDF={handleExportPDF}
            shareData={{
              title: 'Diaspora RO - Rezumatul meu',
              text: `Situația mea de lucru în ${countryName}: ${SITUATION_NAMES[profile.workSituation]}`,
              url: typeof window !== 'undefined' ? window.location.origin : '',
            }}
            onEmailSend={handleSendEmail}
          />
          <Link
            href="/setari"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Profile Summary Card */}
      <div className="px-4 pb-4">
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-lg font-semibold mb-3">
            <span className="text-2xl">{COUNTRY_FLAGS[profile.residenceCountry]}</span>
            <span>{countryName}</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 min-w-[80px]">Situație:</span>
              <span className="font-medium">{SITUATION_NAMES[profile.workSituation]}</span>
            </div>

            {profile.duration && (
              <div className="flex items-start gap-2">
                <span className="text-gray-500 min-w-[80px]">Durată:</span>
                <span className="font-medium">{getDurationLabel(profile.duration)}</span>
              </div>
            )}

            {getFamilyLabel() && (
              <div className="flex items-start gap-2">
                <span className="text-gray-500 min-w-[80px]">Familie:</span>
                <span className="font-medium">{getFamilyLabel()}</span>
              </div>
            )}
          </div>

          {/* Prominent Edit Button */}
          <Link href="/onboarding" className="block mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Modifică răspunsurile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
