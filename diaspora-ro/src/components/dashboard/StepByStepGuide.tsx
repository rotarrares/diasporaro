import { CheckCircle2, AlertCircle, Lightbulb, FileText, ExternalLink } from 'lucide-react';
import { StepByStepGuide as GuideType, GuideStep } from '@/lib/official-resources';
import { Badge } from '@/components/ui/badge';

interface StepByStepGuideProps {
  guide: GuideType;
}

const difficultyConfig = {
  easy: { label: 'Ușor', color: 'bg-green-100 text-green-800 border-green-200' },
  medium: { label: 'Mediu', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  hard: { label: 'Complex', color: 'bg-red-100 text-red-800 border-red-200' },
};

function GuideStepComponent({ step }: { step: GuideStep }) {
  return (
    <div className="relative pb-8 last:pb-0">
      {/* Connector line (except for last step) */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 last:hidden" />

      <div className="flex gap-4">
        {/* Step number */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10">
          {step.stepNumber}
        </div>

        {/* Step content */}
        <div className="flex-1 pt-1">
          <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
          <p className="text-sm text-gray-700 mb-3">{step.description}</p>

          {/* Required documents */}
          {step.requiredDocuments && step.requiredDocuments.length > 0 && (
            <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Documente necesare:
                </span>
              </div>
              <ul className="space-y-1">
                {step.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {step.tips && step.tips.length > 0 && (
            <div className="mb-3 space-y-1">
              {step.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700 p-2 bg-green-50 rounded border-l-2 border-green-400"
                >
                  <Lightbulb className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          )}

          {/* Warnings */}
          {step.warnings && step.warnings.length > 0 && (
            <div className="mb-3 space-y-1">
              {step.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700 p-2 bg-amber-50 rounded border-l-2 border-amber-400"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}

          {/* External link */}
          {step.externalLink && (
            <a
              href={step.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Acesează resursa oficială</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StepByStepGuide({ guide }: StepByStepGuideProps) {
  const difficultyStyle = difficultyConfig[guide.difficulty];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-lg font-semibold text-gray-900">{guide.title}</h2>
          <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
        </div>
        <p className="text-sm text-gray-600 mb-3">{guide.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={difficultyStyle.color}>
            Dificultate: {difficultyStyle.label}
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            ⏱️ Durată estimată: {guide.estimatedTime}
          </Badge>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6">
        {guide.steps.map((step) => (
          <GuideStepComponent key={step.stepNumber} step={step} />
        ))}
      </div>

      {/* Footer with success message */}
      <div className="p-4 bg-green-50 border-t border-green-200">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-900 mb-1">
              Gata! Ai finalizat ghidul
            </p>
            <p className="text-xs text-green-700">
              Dacă ai urmat toți pașii, ar trebui să ai tot ce îți trebuie. Verifică
              să nu fi uitat nimic!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
