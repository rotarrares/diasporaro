'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizAnswers, CountryCode, WorkSituation, Duration, FamilyStatus } from '@/lib/types';
import { createProfileFromQuiz } from '@/lib/rules-engine';
import { useProfileStore } from '@/stores/profileStore';
import CountrySelector from './CountrySelector';
import SituationSelector from './SituationSelector';
import SourceCountrySelector from './SourceCountrySelector';
import DurationSelector from './DurationSelector';
import FamilySelector from './FamilySelector';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

const BASE_STEPS = 4;

export default function QuizContainer() {
  const router = useRouter();
  const { setProfile } = useProfileStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Determine if we need the source country step (for returnees to Romania)
  const needsSourceCountry = answers.workSituation === 'returning' && answers.residenceCountry === 'RO';
  const totalSteps = needsSourceCountry ? BASE_STEPS + 1 : BASE_STEPS;

  // Scroll to top when step changes
  useEffect(() => {
    // Scroll window to top for better mobile experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Also scroll the main container
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const updateAnswer = <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    if (step === 1) return !!answers.residenceCountry;
    if (step === 2) return !!answers.workSituation;

    // If returning to RO, step 3 is source country selection
    if (needsSourceCountry) {
      if (step === 3) return !!answers.sourceCountry;
      if (step === 4) return !!answers.duration;
      if (step === 5) return answers.familyStatus && answers.familyStatus.length > 0;
    } else {
      if (step === 3) return !!answers.duration;
      if (step === 4) return answers.familyStatus && answers.familyStatus.length > 0;
    }

    return false;
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete quiz
      setIsProcessing(true);
      try {
        const profile = createProfileFromQuiz(answers);
        setProfile(profile);

        // Save to localStorage (Zustand persist middleware handles this)
        router.push('/dashboard');
      } catch (error) {
        console.error('Error creating profile:', error);
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-500">
          Pas {step} din {totalSteps}
        </span>
        <div className="w-9" /> {/* Spacer */}
      </header>

      {/* Progress */}
      <Progress value={(step / totalSteps) * 100} className="h-1" />

      {/* Content */}
      <main ref={mainRef} className="flex-1 p-4 overflow-y-auto">
        {step === 1 && (
          <CountrySelector
            selected={answers.residenceCountry}
            onSelect={(country) => updateAnswer('residenceCountry', country)}
          />
        )}
        {step === 2 && (
          <SituationSelector
            selected={answers.workSituation}
            onSelect={(situation) => updateAnswer('workSituation', situation)}
            residenceCountry={answers.residenceCountry}
          />
        )}
        {/* Conditional source country step for returnees to Romania */}
        {needsSourceCountry && step === 3 && (
          <SourceCountrySelector
            selected={answers.sourceCountry}
            onSelect={(country) => updateAnswer('sourceCountry', country)}
          />
        )}
        {/* Duration step - step 3 for non-returnees, step 4 for returnees */}
        {((needsSourceCountry && step === 4) || (!needsSourceCountry && step === 3)) && (
          <DurationSelector
            selected={answers.duration}
            onSelect={(duration) => updateAnswer('duration', duration)}
          />
        )}
        {/* Family step - step 4 for non-returnees, step 5 for returnees */}
        {((needsSourceCountry && step === 5) || (!needsSourceCountry && step === 4)) && (
          <FamilySelector
            selected={answers.familyStatus || []}
            onSelect={(status) => updateAnswer('familyStatus', status)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t safe-area-bottom">
        {!canProceed() && step === totalSteps && (
          <p className="text-xs text-center text-amber-600 mb-2">
            Selectează cel puțin o opțiune pentru a continua
          </p>
        )}
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? 'Se procesează...' :
           step === totalSteps ? 'Vezi rezultatele' : 'Continuă'}
        </Button>
      </footer>
    </div>
  );
}
