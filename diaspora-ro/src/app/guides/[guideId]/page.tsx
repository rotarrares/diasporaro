'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getGuideById, getRelatedResources } from '@/lib/official-resources';
import StepByStepGuide from '@/components/dashboard/StepByStepGuide';
import OfficialResources from '@/components/dashboard/OfficialResources';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{
    guideId: string;
  }>;
}

export default function GuidePage({ params }: PageProps) {
  const router = useRouter();
  const { guideId } = use(params);
  const guide = getGuideById(guideId);
  const relatedResources = guide ? getRelatedResources(guideId) : [];

  useEffect(() => {
    if (!guide) {
      // Guide not found, redirect to dashboard
      router.push('/dashboard');
    }
  }, [guide, router]);

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Se încarcă ghidul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Ghid Pas-cu-Pas</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Main Guide */}
        <StepByStepGuide guide={guide} />

        {/* Related Official Resources */}
        {relatedResources.length > 0 && (
          <OfficialResources
            resources={relatedResources}
            title="🔗 Resurse Oficiale Relevante"
          />
        )}
      </div>
    </div>
  );
}
