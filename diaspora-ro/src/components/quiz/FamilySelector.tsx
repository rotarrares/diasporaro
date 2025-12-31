import { FamilyStatus, FAMILY_STATUSES } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Props {
  selected: FamilyStatus[];
  onSelect: (statuses: FamilyStatus[]) => void;
}

export default function FamilySelector({ selected, onSelect }: Props) {
  const statuses = Object.values(FAMILY_STATUSES);

  const toggleStatus = (status: FamilyStatus) => {
    if (selected.includes(status)) {
      // If deselecting the current status
      const newSelection = selected.filter(s => s !== status);
      // If nothing is left selected after deselection, don't allow it (must have at least one)
      if (newSelection.length === 0) {
        return; // Don't allow deselecting the last option
      }
      onSelect(newSelection);
    } else {
      // If selecting "single", clear all other options and set only "single"
      if (status === 'single') {
        onSelect(['single']);
      }
      // If selecting any family option, remove "single" and add the new status
      else {
        const newSelection = selected.filter(s => s !== 'single');
        onSelect([...newSelection, status]);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Situația familiei</h1>
      <p className="text-gray-500 mb-2">Selectează toate opțiunile care se aplică (poți alege mai multe)</p>
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          👨‍👩‍👧‍👦 Influențează acoperirea medicală a familiei și drepturile la asigurări sociale
        </p>
      </div>

      <div className="space-y-3">
        {statuses.map((status) => {
          const isSelected = selected.includes(status.id as FamilyStatus);

          return (
            <button
              key={status.id}
              onClick={() => toggleStatus(status.id as FamilyStatus)}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "bg-primary border-primary"
                    : "border-gray-300"
                )}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="font-medium">{status.label}</span>
            </button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 flex items-center gap-2">
            <span>✓</span>
            <span>Perfect! Ai selectat {selected.length} {selected.length === 1 ? 'opțiune' : 'opțiuni'}</span>
          </p>
        </div>
      )}

      {selected.length > 0 && !selected.includes('single') && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Poți selecta mai multe opțiuni. Dacă selectezi "Sunt singur/ă", celelalte opțiuni vor fi șterse automat.
          </p>
        </div>
      )}
    </div>
  );
}
