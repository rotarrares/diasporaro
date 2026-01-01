import Link from 'next/link';
import { DashboardCard } from '@/lib/types';
import { OfficialResource } from '@/lib/official-resources';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  card: DashboardCard;
  resources?: OfficialResource[];
}

const statusColors = {
  ok: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  action_needed: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  ok: '✓',
  warning: '⚠️',
  action_needed: '❗',
};

const topicIcons = {
  'social-security': '🛡️',
  healthcare: '🏥',
  taxes: '💰',
  pension: '👴',
};

const resourceTypeIcons: Record<OfficialResource['type'], string> = {
  portal: '🌐',
  form: '📄',
  guide: '📚',
  calculator: '🧮',
  contact: '📞',
};

export default function TopicCard({ card, resources }: Props) {
  return (
    <Card className="overflow-hidden">
      <Link href={card.link}>
        <CardContent className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{topicIcons[card.topic]}</span>
              <h3 className="font-bold uppercase text-sm tracking-wide text-gray-700">
                {card.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{card.countryFlag}</span>
              <Badge className={cn('text-xs border', statusColors[card.status])}>
                {statusIcons[card.status]}
              </Badge>
            </div>
          </div>

          {/* User Context Badges */}
          {card.userContext && (
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                📍 {card.userContext.workSituation}
              </Badge>
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                ⏱️ {card.userContext.duration}
              </Badge>
            </div>
          )}

          <p className="text-gray-900 font-semibold mb-3">{card.summary}</p>

          <div className="space-y-1 mb-3">
            {card.details.slice(0, 3).map((detail, i) => (
              <div key={i} className="text-sm text-gray-600">
                {detail}
              </div>
            ))}
          </div>

          <div className="flex items-center text-primary text-sm font-medium">
            Vezi detalii
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Link>

      {/* Official Resources Section */}
      {resources && resources.length > 0 && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="p-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
              <span>🔗</span>
              <span>Resurse Oficiale</span>
            </h4>
            <div className="space-y-2">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block p-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">
                      {resourceTypeIcons[resource.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h5>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          {resource.authority}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
