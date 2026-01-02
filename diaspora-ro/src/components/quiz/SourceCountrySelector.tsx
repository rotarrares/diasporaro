import { CountryCode, COUNTRIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  selected?: CountryCode;
  onSelect: (country: CountryCode) => void;
}

export default function SourceCountrySelector({ selected, onSelect }: Props) {
  // Show all countries except Romania (they're returning TO Romania FROM another country)
  const sourceCountries = Object.values(COUNTRIES).filter(c => c.code !== 'RO');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Din ce țară te întorci?</h1>
      <p className="text-gray-500 mb-2">Selectează țara în care ai lucrat înainte de a te întoarce în România</p>
      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📍 Ne ajută să îți arătăm informații relevante despre pensie, asigurări sociale și taxe specifice țării din care vii
        </p>
      </div>

      <div className="space-y-3">
        {sourceCountries.map((country) => (
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
            <div className="flex-1">
              <span className="font-medium block">{country.name}</span>
              {'note' in country && country.note && (
                <span className="text-xs text-gray-500">{country.note}</span>
              )}
            </div>
            {selected === country.code && (
              <span className="ml-auto text-primary">●</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
