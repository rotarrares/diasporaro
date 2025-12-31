import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
import { DocumentBadge } from '@/components/ui/document-badge';
import { GLOSSARY } from '@/lib/constants';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            DiasporaRO
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Ghidul tău pentru munca în UE
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Răspunde la 4 întrebări simple și primești un ghid personalizat cu tot ce trebuie să știi.
          </p>

          <Link href="/onboarding">
            <Button size="lg" className="text-lg px-8 py-6">
              Începe acum
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Fără cont</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Informații oficiale</span>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Cum funcționează?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Răspunzi la 4 întrebări simple</h3>
                <p className="text-sm text-gray-600">
                  Țară, situație de muncă, durată și situație familială
                </p>
                <p className="text-xs text-primary font-medium mt-2">
                  ⏱️ Durează ~2 minute
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Primești informații personalizate</h3>
                <p className="text-sm text-gray-600">
                  Dashboard clar cu taxe, asigurări, pensie și sănătate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Afli ce documente ai nevoie</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Lista completă cu documentele necesare și cum să le obții
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <DocumentBadge
                    label="A1"
                    explanation={GLOSSARY.A1.explanation}
                  />
                  <DocumentBadge
                    label="EHIC"
                    explanation={GLOSSARY.EHIC.explanation}
                  />
                  <DocumentBadge
                    label="U1"
                    explanation={GLOSSARY.U1.explanation}
                  />
                  <DocumentBadge
                    label="S1"
                    explanation={GLOSSARY.S1.explanation}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Countries */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Țări acoperite acum</h2>
          <div className="flex items-center justify-center gap-4 text-5xl mb-4">
            <span>🇩🇪</span>
            <span>🇪🇸</span>
            <span>🇮🇹</span>
            <span>🇫🇷</span>
            <span>🇬🇧</span>
          </div>
          <p className="text-center text-gray-600">
            Germania, Spania, Italia, Franța, Marea Britanie
          </p>

          {/* Expansion Timeline & Alternatives */}
          <Card className="mt-6 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>📍</span>
                <span>Lucrezi în altă țară UE?</span>
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Momentan acoperim cele mai populare destinații pentru diaspora românească.
                Extindem constant baza de date cu alte țări (Olanda, Belgia, Austria, etc.).
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">Informații generale UE:</span>
                    <span className="text-gray-600"> Regulile UE de bază (asigurări sociale, taxe, pensii) se aplică similar în toate statele membre</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">Resurse oficiale:</span>
                    <span className="text-gray-600"> Vezi </span>
                    <a
                      href="https://europa.eu/youreurope/citizens/work/index_ro.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Your Europe
                    </a>
                    <span className="text-gray-600"> pentru orice țară UE</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-gray-900">Sugestii de țări:</span>
                    <span className="text-gray-600"> Dacă ai nevoie de o țară specifică, scrie-ne la </span>
                    <a
                      href="mailto:contact@diasporaro.eu"
                      className="text-blue-600 hover:underline"
                    >
                      contact@diasporaro.eu
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-primary text-white border-primary">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Gata să afli ce se aplică în cazul tău?
              </h2>
              <Link href="/onboarding">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Începe Chestionarul
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer & Privacy Notice */}
        <div className="mt-12 text-center border-t pt-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r mb-6 text-left">
            <p className="text-sm text-amber-800 mb-2">
              <strong>⚠️ Declinarea responsabilității:</strong> Informațiile din această aplicație sunt cu caracter informativ și nu constituie
              consiliere juridică, fiscală sau financiară. Pentru situații complexe, consultați un specialist autorizat.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r text-left">
            <p className="text-sm text-blue-900">
              <strong>🔒 Confidențialitate:</strong> Toate informațiile tale rămân pe telefon/computer, nu le trimitem nicăieri.
              Nu te urmărim și nu folosim datele tale pentru publicitate.{' '}
              <Link href="/privacy" className="text-blue-700 underline hover:text-blue-800">
                Citește Politica de Confidențialitate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
