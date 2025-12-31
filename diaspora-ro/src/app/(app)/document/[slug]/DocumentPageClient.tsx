'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, FileText, Clock, Euro, Calendar } from 'lucide-react';
import Link from 'next/link';
import { ExportShareButtons } from '@/components/ui/export-share-buttons';
import { exportDocumentToPDF } from '@/lib/pdf-export';

interface DocumentPageClientProps {
  document: any;
}

export function DocumentPageClient({ document }: DocumentPageClientProps) {
  const handleExportPDF = async () => {
    if (document) {
      await exportDocumentToPDF(document);
    }
  };

  const handleSendEmail = async () => {
    if (!document) return;

    const email = prompt('Introduceți adresa de email:');
    if (!email) return;

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        type: 'document',
        data: document,
      }),
    });

    if (response.ok) {
      alert('Email trimis cu succes!');
    } else {
      alert('Eroare la trimiterea email-ului.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Înapoi la Dashboard
            </Link>
            <ExportShareButtons
              variant="compact"
              onExportPDF={handleExportPDF}
              shareData={{
                title: document.title,
                text: document.purpose,
                url: typeof window !== 'undefined' ? window.location.href : '',
              }}
              onEmailSend={handleSendEmail}
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">{document.title}</h1>
              <p className="text-sm text-gray-500">{document.officialName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Informații Rapide</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Timp procesare</p>
                <p className="font-medium">{document.processingTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Euro className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Cost</p>
                <p className="font-medium">{document.cost}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Valabilitate</p>
                <p className="font-medium">{document.validityPeriod}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Scop</p>
                <p className="font-medium text-sm">{document.purpose}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Who Needs It */}
        {document.whoNeeds.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>✅</span> Ai nevoie de acest document dacă:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {document.whoNeeds.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Who Doesn't Need It */}
        {document.whoDoesntNeed.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span>❌</span> NU ai nevoie de acest document dacă:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {document.whoDoesntNeed.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* How to Obtain */}
        {document.howToObtain.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">📝 Cum obții documentul</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {document.howToObtain.map((step: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="prose prose-gray max-w-none mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <MDXRemote source={document.content} />
          </div>
        </div>

        {/* Official Links */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">🔗 Link-uri Oficiale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href={document.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-primary">Informații oficiale</p>
                  <p className="text-sm text-gray-500 break-all">{document.officialLink}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </a>

            {document.templateLink && (
              <a
                href={document.templateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-primary">Descarcă formular</p>
                    <p className="text-sm text-gray-500 break-all">{document.templateLink}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </a>
            )}
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-medium mb-1">⚠️ Notă importantă</p>
          <p>
            Informațiile de pe această pagină sunt cu caracter informativ. Pentru situații
            complexe sau incerte, te rugăm să consulți autoritățile competente sau un
            specialist.
          </p>
        </div>
      </div>
    </div>
  );
}
