import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface DocumentBadgeProps {
  label: string;
  explanation: string;
  variant?: 'default' | 'secondary' | 'outline';
  showIcon?: boolean;
}

export function DocumentBadge({
  label,
  explanation,
  variant = 'outline',
  showIcon = true
}: DocumentBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Badge
            variant={variant}
            className="cursor-help gap-1 hover:bg-primary/10 transition-colors"
          >
            {label}
            {showIcon && <HelpCircle className="w-3 h-3 ml-1" />}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3" side="top">
          <p className="text-sm">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
