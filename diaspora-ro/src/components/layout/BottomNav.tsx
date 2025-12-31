'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, FileText, HelpCircle, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Acasă', icon: Home, href: '/dashboard' },
  { id: 'documents', label: 'Acte', icon: FileText, href: '/documents' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, href: '/faq' },
  { id: 'settings', label: 'Setări', icon: Settings, href: '/setari' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-t safe-area-bottom">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 min-w-[60px] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
