import { Duration, DURATIONS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  selected?: Duration;
  onSelect: (duration: Duration) => void;
}

export default function DurationSelector({ selected, onSelect }: Props) {
  const durations = Object.values(DURATIONS);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">De cât timp?</h1>
      <p className="text-gray-500 mb-2">Cât timp ai petrecut sau plănuiești să petreci în străinătate?</p>
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900 font-semibold mb-3">
          ⏱️ De ce contează durata?
        </p>
        <div className="text-sm text-blue-800 space-y-3">
          <div>
            <p className="font-medium mb-1">📍 Rezidență fiscală</p>
            <p className="text-blue-700 leading-relaxed">
              <strong>183 de zile într-un an = rezident fiscal.</strong> Exemplu: 6 luni în Germania înseamnă că plătești impozit pe venit global în Germania, nu doar pe venitul german.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">🏥 Asigurări sociale & medicale</p>
            <p className="text-blue-700 leading-relaxed">
              <strong>Sub 3 luni:</strong> poți rămâne pe CNAS (România). <strong>Peste 6 luni:</strong> trebuie asigurare obligatorie în țara gazdă.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">📄 Documente necesare</p>
            <p className="text-blue-700 leading-relaxed">
              <strong>Sub 3 luni:</strong> doar pașaport. <strong>3-6 luni:</strong> înregistrare temporară. <strong>Peste 6 luni:</strong> certificat de rezidență permanent, schimbare adresă.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {durations.map((duration) => (
          <button
            key={duration.id}
            onClick={() => onSelect(duration.id as Duration)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all",
              selected === duration.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{duration.label}</div>
                <div className="text-sm text-gray-500 mt-0.5">{duration.detail}</div>
              </div>
              {selected === duration.id && (
                <span className="text-primary">●</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
