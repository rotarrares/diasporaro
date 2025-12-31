import { CountryCode, COUNTRIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  selected?: CountryCode;
  onSelect: (country: CountryCode) => void;
}

export default function CountrySelector({ selected, onSelect }: Props) {
  // Filter to show only EU countries (Brexit: UK excluded)
  const euCountries = Object.values(COUNTRIES).filter(c => c.isEU);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Unde locuiești?</h1>
      <p className="text-gray-500 mb-2">Selectează țara în care locuiești în prezent</p>
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📍 Ne ajută să determinăm sistemul de taxe și asigurări sociale care se aplică situației tale
        </p>
      </div>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>⚠️ Brexit:</strong> Marea Britanie nu mai face parte din UE din 2021. Regulile pentru UK sunt diferite și vor fi adăugate în viitor.
        </p>
      </div>

      <div className="space-y-3">
        {euCountries.map((country) => (
          <button
            key={country.code}
            onClick={() => onSelect(country.code as CountryCode)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
              selected === country.code
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <span className="text-3xl">{country.flag}</span>
            <span className="font-medium">{country.name}</span>
            {selected === country.code && (
              <span className="ml-auto text-primary">●</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
