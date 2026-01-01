'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizAnswers, CountryCode, WorkSituation, Duration, FamilyStatus } from '@/lib/types';
import { createProfileFromQuiz } from '@/lib/rules-engine';
import { useProfileStore } from '@/stores/profileStore';
import CountrySelector from './CountrySelector';
import SituationSelector from './SituationSelector';
import DurationSelector from './DurationSelector';
import FamilySelector from './FamilySelector';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

const TOTAL_STEPS = 4;

export default function QuizContainer() {
  const router = useRouter();
  const { setProfile } = useProfileStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top when step changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  const updateAnswer = <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // Scroll to top on mobile when an option is selected
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!answers.residenceCountry;
      case 2: return !!answers.workSituation;
      case 3: return !!answers.duration;
      case 4: return answers.familyStatus && answers.familyStatus.length > 0;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
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
          Pas {step} din {TOTAL_STEPS}
        </span>
        <div className="w-9" /> {/* Spacer */}
      </header>

      {/* Progress */}
      <Progress value={(step / TOTAL_STEPS) * 100} className="h-1" />

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
          />
        )}
        {step === 3 && (
          <DurationSelector
            selected={answers.duration}
            onSelect={(duration) => updateAnswer('duration', duration)}
          />
        )}
        {step === 4 && (
          <FamilySelector
            selected={answers.familyStatus || []}
            onSelect={(status) => updateAnswer('familyStatus', status)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t safe-area-bottom">
        {!canProceed() && step === 4 && (
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
           step === TOTAL_STEPS ? 'Vezi rezultatele' : 'Continuă'}
        </Button>
      </footer>
    </div>
  );
}
