import { TaxDeadline } from '@/lib/types';
import { COUNTRIES } from '@/lib/types';

interface TaxDeadlinesProps {
  deadlines: TaxDeadline[];
}

export default function TaxDeadlines({ deadlines }: TaxDeadlinesProps) {
  if (!deadlines || deadlines.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          📅 Termene Fiscale
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Când trebuie să depui declarațiile fiscale
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {deadlines.map((deadline, index) => {
          const country = COUNTRIES[deadline.country];

          return (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="font-semibold text-gray-900">
                      {country.name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-700 mb-1">
                    {deadline.description}
                  </p>

                  {deadline.formName && (
                    <p className="text-xs text-gray-500 mb-2">
                      Formular: {deadline.formName}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    <span>⏰</span>
                    <span>Termen: {deadline.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          💡 Sfat: Verifică mereu termenele oficiale pe site-urile autorităților fiscale,
          deoarece acestea se pot schimba.
        </p>
      </div>
    </div>
  );
}
