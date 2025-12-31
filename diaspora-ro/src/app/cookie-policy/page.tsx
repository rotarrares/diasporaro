import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Politica de Cookies | DiasporaRO',
  description: 'Informații despre utilizarea cookies în aplicația DiasporaRO',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la Acasă
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Cookie className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">
              Politica de Cookies
            </h1>
          </div>
          <p className="text-sm text-gray-600">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 md:p-8 space-y-6">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Ce sunt cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies sunt fișiere text mici pe care site-urile web le salvează pe device-ul tău (computer, telefon, tabletă) pentru a-și aminti anumite informații despre vizitele tale.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              DiasporaRO folosește tehnologii similare cookies pentru a-ți oferi o experiență personalizată, dar <strong>NU folosește cookies de tracking sau publicitate</strong>.
            </p>
          </section>

          {/* What We Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Ce cookies și tehnologii folosește DiasporaRO?
            </h2>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="text-green-900 font-medium">
                ✅ Folosim DOAR tehnologii esențiale pentru funcționarea aplicației
              </p>
              <p className="text-green-800 text-sm mt-2">
                NU folosim cookies de analiză (Google Analytics, etc.), NU folosim cookies de marketing, NU folosim tracking de terță parte.
              </p>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">
              1. localStorage (Stocare Locală)
            </h3>
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded px-2 py-1 text-xs font-mono text-blue-900">
                  ESENȚIAL
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">Profil Utilizator</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Salvează răspunsurile tale din chestionar pentru a personaliza dashboard-ul.
                  </p>
                  <table className="text-xs w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Nume:</td>
                        <td className="py-1 text-gray-700"><code>diaspora-profile</code></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Scop:</td>
                        <td className="py-1 text-gray-700">Stochează țara, situația de muncă, durata și familia</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Expirare:</td>
                        <td className="py-1 text-gray-700">Indefinit (până la ștergere manuală)</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500 font-medium">Poți refuza?</td>
                        <td className="py-1 text-gray-700">NU - aplicația nu funcționează fără acest storage</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">
              2. Cookie de Consimțământ GDPR
            </h3>
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded px-2 py-1 text-xs font-mono text-blue-900">
                  ESENȚIAL
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">Consimțământ Cookie Banner</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Reține dacă ai acceptat sau refuzat politica de cookies pentru a nu afișa banner-ul repetat.
                  </p>
                  <table className="text-xs w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Nume:</td>
                        <td className="py-1 text-gray-700"><code>diaspora-cookie-consent</code></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Scop:</td>
                        <td className="py-1 text-gray-700">Salvează alegerea ta (acceptat/refuzat)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-1 text-gray-500 font-medium">Expirare:</td>
                        <td className="py-1 text-gray-700">12 luni</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-gray-500 font-medium">Poți refuza?</td>
                        <td className="py-1 text-gray-700">DA - poți refuza banner-ul (dar aplicația va funcționa oricum)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* What We Don't Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Ce NU folosim
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-medium text-red-900 mb-2">❌ Cookies de care să te temi</h3>
              <ul className="space-y-1 text-sm text-red-800">
                <li>✗ Google Analytics sau alte instrumente de analiză trafic</li>
                <li>✗ Facebook Pixel, Google Ads, sau tracking publicitar</li>
                <li>✗ Cookies de remarketing sau retargeting</li>
                <li>✗ Tracking cross-site (de urmărire între site-uri)</li>
                <li>✗ Cookies de terță parte (third-party cookies)</li>
                <li>✗ Fingerprinting sau alte tehnici de identificare</li>
              </ul>
            </div>
          </section>

          {/* Why We Use Them */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              De ce folosim localStorage?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              localStorage este esențial pentru funcționarea aplicației DiasporaRO deoarece:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Personalizare:</strong> Fără salvarea profilului, ar trebui să reiei chestionarul la fiecare vizită
              </li>
              <li>
                <strong>Privacy:</strong> Datele rămân pe device-ul tău, NU pe serverele noastre
              </li>
              <li>
                <strong>Offline:</strong> Aplicația funcționează offline (ca PWA) datorită localStorage
              </li>
              <li>
                <strong>Viteză:</strong> Încarcă instant dashboard-ul fără să apeleze servere
              </li>
            </ul>
          </section>

          {/* How to Manage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Cum gestionezi cookies și localStorage?
            </h2>

            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">
              Opțiune 1: Din aplicația DiasporaRO
            </h3>
            <div className="border rounded p-4 bg-gray-50">
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Mergi la pagina <Link href="/setari" className="text-primary underline">Setări</Link></li>
                <li>Apasă pe "Resetează Profilul"</li>
                <li>Confirmă acțiunea</li>
              </ol>
              <p className="text-xs text-gray-600 mt-2">
                ⚠️ Aceasta va șterge toate datele salvate local.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">
              Opțiune 2: Din browser
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border rounded p-3 bg-gray-50">
                <h4 className="font-medium text-sm text-gray-800 mb-1">Chrome</h4>
                <p className="text-xs text-gray-600">
                  Setări → Confidențialitate → Șterge datele de navigare → Cookies și date ale site-urilor
                </p>
              </div>
              <div className="border rounded p-3 bg-gray-50">
                <h4 className="font-medium text-sm text-gray-800 mb-1">Firefox</h4>
                <p className="text-xs text-gray-600">
                  Opțiuni → Confidențialitate → Cookies și date → Gestionează date
                </p>
              </div>
              <div className="border rounded p-3 bg-gray-50">
                <h4 className="font-medium text-sm text-gray-800 mb-1">Safari</h4>
                <p className="text-xs text-gray-600">
                  Preferințe → Confidențialitate → Gestionează datele site-urilor
                </p>
              </div>
              <div className="border rounded p-3 bg-gray-50">
                <h4 className="font-medium text-sm text-gray-800 mb-1">Edge</h4>
                <p className="text-xs text-gray-600">
                  Setări → Confidențialitate → Șterge datele de navigare → Cookies
                </p>
              </div>
            </div>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Servicii de terță parte
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              DiasporaRO este o aplicație <strong>client-side</strong> (rulează în browser-ul tău), deci nu folosește servicii de terță parte pentru cookies sau tracking.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Singura excepție: Dacă folosești funcția "Trimite Email", datele vor fi transmise temporar către <strong>Resend</strong> (serviciu de livrare email), dar fără a salva cookies.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Actualizări ale politicii
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Dacă vom adăuga noi cookies sau tehnologii de stocare, vom actualiza această pagină și vom notifica utilizatorii prin intermediul unui banner în aplicație.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Întrebări?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre cookies sau această politică, poți:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Deschide un issue pe repository-ul GitHub al proiectului</li>
              <li>Consulta <Link href="/privacy" className="text-primary underline">Politica de Confidențialitate</Link></li>
            </ul>
          </section>

          {/* Links */}
          <section className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Documente Conexe</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/privacy">
                <Button variant="outline" size="sm">
                  Politica de Confidențialitate
                </Button>
              </Link>
              <Link href="/terms">
                <Button variant="outline" size="sm">
                  Termeni și Condiții
                </Button>
              </Link>
              <Link href="/setari">
                <Button variant="outline" size="sm">
                  Șterge Datele Tale
                </Button>
              </Link>
            </div>
          </section>
        </Card>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button>
              Înapoi la Pagina Principală
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
