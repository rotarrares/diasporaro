import Link from 'next/link';
import { DocumentId } from '@/lib/types';
import { DOCUMENT_INFO, DOCUMENT_EXPLANATIONS } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface Props {
  documents: DocumentId[];
  title: string;
}

export default function DocumentsList({ documents, title }: Props) {
  if (documents.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3 px-4">{title}</h2>
      <div className="space-y-2 px-4">
        {documents.map((docId) => {
          const doc = DOCUMENT_INFO[docId];

          return (
            <Link key={docId} href={`/document/${docId}`}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{doc.icon}</span>
                      <span className="font-medium text-sm">{doc.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-600 ml-9 line-clamp-2">
                    {DOCUMENT_EXPLANATIONS[docId]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
