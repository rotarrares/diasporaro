import { ExternalLink } from 'lucide-react';
import { OfficialResource } from '@/lib/official-resources';

interface OfficialResourcesProps {
  resources: OfficialResource[];
  title?: string;
}

const resourceTypeIcons: Record<OfficialResource['type'], string> = {
  portal: '🌐',
  form: '📄',
  guide: '📚',
  calculator: '🧮',
  contact: '📞',
};

const languageLabels: Record<OfficialResource['language'], string> = {
  ro: 'Română',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  multi: 'Multilingv',
};

export default function OfficialResources({
  resources,
  title = '🔗 Resurse Oficiale',
}: OfficialResourcesProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Link-uri verificate către portaluri oficiale
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">
                {resourceTypeIcons[resource.type]}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {resource.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {resource.authority}
                  </span>

                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700">
                    {languageLabels[resource.language]}
                  </span>

                  <span className="text-gray-400 truncate">{resource.url}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <span>ℹ️</span>
          <span>
            Link-urile se deschid într-o fereastră nouă. Verifică întotdeauna că
            URL-ul este cel oficial.
          </span>
        </p>
      </div>
    </div>
  );
}
