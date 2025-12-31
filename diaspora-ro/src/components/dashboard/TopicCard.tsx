import Link from 'next/link';
import { DashboardCard } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  card: DashboardCard;
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

export default function TopicCard({ card }: Props) {
  return (
    <Link href={card.link}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
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
      </Card>
    </Link>
  );
}
