import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { DOCUMENT_INFO, DOCUMENT_EXPLANATIONS } from '@/lib/constants';
import { ChevronRight } from 'lucide-react';
import { DocumentId } from '@/lib/types';

export default function DocumentsPage() {
  const documents = Object.entries(DOCUMENT_INFO);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4">
        <h1 className="text-2xl font-bold">Documente UE</h1>
        <p className="text-gray-600 text-sm mt-1">
          Ghiduri complete pentru fiecare document
        </p>
      </div>

      <div className="p-4 space-y-3">
        {documents.map(([id, doc]) => (
          <Link key={id} href={`/document/${id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <span className="font-medium">{doc.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 ml-11">
                  {DOCUMENT_EXPLANATIONS[id as DocumentId]}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
