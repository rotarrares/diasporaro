import { WorkSituation, WORK_SITUATIONS, CountryCode } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface Props {
  selected?: WorkSituation;
  onSelect: (situation: WorkSituation) => void;
  residenceCountry?: CountryCode;
}

export default function SituationSelector({ selected, onSelect, residenceCountry }: Props) {
  // Filter situations based on residence country
  const allSituations = Object.values(WORK_SITUATIONS);
  const situations = allSituations.filter(situation => {
    // If living in Romania, exclude posted_worker and remote_worker
    // (posted workers are sent FROM Romania TO another country, not living in Romania)
    // (remote workers work for RO companies while living abroad)
    if (residenceCountry === 'RO') {
      return situation.id !== 'posted_worker' && situation.id !== 'remote_worker';
    }
    return true;
  });

  return (
    <TooltipProvider>
      <div>
        <h1 className="text-2xl font-bold mb-2">Care e situația ta?</h1>
        <p className="text-gray-500 mb-2">Selectează opțiunea care te descrie cel mai bine</p>
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💼 Tip de contract determină unde plătești asigurări sociale și ce documente ai nevoie
          </p>
        </div>

        <div className="space-y-3">
          {situations.map((situation) => {
            // Add examples and tooltips for clarity
            const examples: Record<string, string> = {
              'local_employee': 'Exemplu: Locuiești în Germania și ai contract cu o firmă germană',
              'posted_worker': 'Exemplu: Lucrezi la o firmă din România, dar ai fost trimis să lucrezi în Germania pentru o perioadă limitată',
              'remote_worker': 'Exemplu: Contract cu firmă românească, dar lucrezi de acasă din Spania',
              'returning': 'Exemplu: Te întorci în România după ce ai lucrat în străinătate',
            };

            const tooltips: Record<string, { title: string; points: string[] }> = {
              'local_employee': {
                title: 'Angajat Local - Ce înseamnă?',
                points: [
                  '✓ Ai contract direct cu o companie din țara unde lucrezi fizic',
                  '✓ Compania este înregistrată în țara de lucru',
                  '✓ Plătești asigurări sociale în țara de lucru',
                  '✗ NU ai formularul A1 (nu este necesar)',
                  'Exemplu: Locuiești și lucrezi în Spania pentru o companie spaniolă',
                ],
              },
              'posted_worker': {
                title: 'Detașat - Ce înseamnă?',
                points: [
                  '✓ Ai contract cu o companie românească',
                  '✓ Ești trimis temporar în altă țară (max 24 luni)',
                  '✓ Plătești în continuare asigurări în România',
                  '✓ AI NEVOIE de formularul A1',
                  'Exemplu: Lucrezi pentru o firmă din București, trimis 1 an în Germania',
                ],
              },
              'remote_worker': {
                title: 'Remote Worker - Ce înseamnă?',
                points: [
                  '✓ Ai contract cu o companie românească',
                  '✓ Lucrezi fizic din altă țară (nu ești trimis temporar)',
                  '⚠️ Situație complexă - verifică unde plătești asigurări',
                  '⚠️ Posibile obligații fiscale duale',
                  'Exemplu: Contract cu firmă din Cluj, lucrezi de acasă din Portugalia',
                ],
              },
              'returning': {
                title: 'Întoarcere în România',
                points: [
                  '✓ Te întorci în România după ce ai lucrat în străinătate',
                  '✓ Perioadele lucrate în UE se cumulează pentru pensie',
                  '✓ Poți transfera drepturile de șomaj (formularul U1)',
                  'Important: Obține documentele înainte de plecare',
                ],
              },
            };

            const tooltipData = tooltips[situation.id];

            return (
              <button
                key={situation.id}
                onClick={() => onSelect(situation.id as WorkSituation)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  selected === situation.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">{situation.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-semibold text-gray-900">
                        {situation.title}
                      </div>
                      {tooltipData && (
                        <Tooltip>
                          <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer inline-flex items-center">
                              <Info className="h-4 w-4" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-4" side="right">
                            <div className="space-y-2">
                              <p className="font-semibold text-sm">{tooltipData.title}</p>
                              <ul className="text-xs space-y-1.5">
                                {tooltipData.points.map((point, idx) => (
                                  <li key={idx} className="leading-relaxed">{point}</li>
                                ))}
                              </ul>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {situation.description}
                    </div>
                    {examples[situation.id] && (
                      <div className="mt-2 text-xs text-gray-500 italic">
                        {examples[situation.id]}
                      </div>
                    )}
                  </div>
                  {selected === situation.id && (
                    <span className="text-primary">●</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
