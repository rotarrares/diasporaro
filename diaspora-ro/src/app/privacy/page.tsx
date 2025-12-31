import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | DiasporaRO',
  description: 'Politica de confidențialitate și protecția datelor pentru aplicația DiasporaRO',
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Politica de Confidențialitate
          </h1>
          <p className="text-sm text-gray-600">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <Card className="p-6 md:p-8 space-y-6">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Introducere
            </h2>
            <p className="text-gray-700 leading-relaxed">
              DiasporaRO ("noi", "aplicația noastră") respectă confidențialitatea utilizatorilor săi și se angajează să protejeze datele personale în conformitate cu Regulamentul General privind Protecția Datelor (GDPR - EU 2016/679).
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Această politică explică ce date colectăm, cum le folosim, unde le stocăm și care sunt drepturile tale.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Operator de Date
            </h2>
            <p className="text-gray-700 leading-relaxed">
              DiasporaRO este o aplicație web progresivă (PWA) open-source, furnizată ca serviciu informațional gratuit pentru lucrătorii români din Uniunea Europeană.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Pentru întrebări legate de confidențialitate, ne poți contacta prin GitHub Issues.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Ce Date Colectăm
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-900 font-medium">
                ⚠️ IMPORTANT: DiasporaRO NU transmite și NU stochează date pe servere externe.
              </p>
              <p className="text-blue-800 text-sm mt-2">
                Toate datele tale rămân EXCLUSIV în browser-ul tău (localStorage).
              </p>
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              3.1. Date de Profil (Stocate Local)
            </h3>
            <p className="text-gray-700 mb-2">
              Când completezi chestionarul, aplicația salvează următoarele informații în browser-ul tău:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Țara în care lucrezi (ex: Germania, Spania, Italia)</li>
              <li>Situația ta de muncă (ex: Angajat local, Detașat, Remote)</li>
              <li>Durata estimată a muncii în străinătate</li>
              <li>Situația familiei tale (ex: Familie în RO, Copii însoțitori)</li>
              <li>Data completării chestionarului</li>
            </ul>
            <p className="text-gray-700 mt-3 text-sm italic">
              Aceste date NU includ: nume, CNP, adresă, telefon, email sau alte date cu caracter personal identificabil.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">
              3.2. Date Tehnice (Cookies)
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Cookie de consimțământ pentru GDPR (acceptare politică cookies)</li>
              <li>localStorage pentru salvarea profilului tău</li>
            </ul>
            <p className="text-gray-700 mt-2 text-sm">
              NU folosim cookies de tracking, analytics sau publicitate.
            </p>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Cum Folosim Datele
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Datele tale de profil sunt folosite EXCLUSIV pentru:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Personalizarea informațiilor afișate pe dashboard</li>
              <li>Determinarea documentelor necesare pentru situația ta</li>
              <li>Afișarea ghidurilor relevante pentru țara și situația ta</li>
              <li>Generarea de PDF-uri sau email-uri cu rezumate personalizate (dacă alegi să folosești aceste funcții)</li>
            </ul>
            <p className="text-gray-700 mt-3 font-medium">
              NU folosim datele pentru: marketing, vânzare către terți, publicitate sau profilare.
            </p>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Unde Sunt Stocate Datele
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-green-900 font-medium mb-2">
                ✅ Stocare 100% Locală (Client-Side Only)
              </p>
              <p className="text-green-800 text-sm">
                Toate datele tale sunt stocate în <code className="bg-green-100 px-1 rounded">localStorage</code> al browser-ului tău.
                NU există nicio bază de date pe server, NU există transmitere de date către servere externe.
              </p>
            </div>
            <p className="text-gray-700 mt-3">
              Aceasta înseamnă:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Numai tu ai acces la datele tale</li>
              <li>Datele NU pot fi accesate de pe alte device-uri</li>
              <li>Dacă ștergi cache-ul browser-ului, profilul tău va fi șters</li>
              <li>Noi NU putem accesa, modifica sau șterge datele tale</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Partajarea Datelor cu Terțe Părți
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium mb-2">
              NU partajăm, NU vindem și NU transferăm datele tale către nicio terță parte.
            </p>
            <p className="text-gray-700 text-sm">
              Excepție: Dacă alegi să trimiți un email cu rezumatul tău folosind funcția "Trimite Email", datele vor fi transmise temporar către serviciul Resend (furnizor de email) DOAR pentru livrarea email-ului. Aceste date NU sunt stocate de Resend.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Drepturile Tale (GDPR)
            </h2>
            <p className="text-gray-700 mb-3">
              În conformitate cu GDPR, ai următoarele drepturi:
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium text-gray-800">📋 Dreptul de acces</h4>
                <p className="text-sm text-gray-600">
                  Poți vizualiza toate datele tale accesând pagina "Setări" din aplicație.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium text-gray-800">✏️ Dreptul de rectificare</h4>
                <p className="text-sm text-gray-600">
                  Poți modifica răspunsurile din chestionar oricând, reluând quiz-ul.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium text-gray-800">🗑️ Dreptul de ștergere</h4>
                <p className="text-sm text-gray-600">
                  Poți șterge complet profilul din "Setări" → "Resetează Profilul" sau ștergi manual localStorage din browser.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium text-gray-800">📤 Dreptul la portabilitate</h4>
                <p className="text-sm text-gray-600">
                  Poți exporta datele ca PDF folosind funcția "Exportă PDF" din dashboard.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-medium text-gray-800">🚫 Dreptul de opoziție</h4>
                <p className="text-sm text-gray-600">
                  Poți refuza utilizarea aplicației în orice moment. Pur și simplu nu o mai folosi.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Securitatea Datelor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Deoarece datele sunt stocate local în browser-ul tău, securitatea lor depinde de:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Securitatea device-ului tău (parole, blocare ecran)</li>
              <li>Securitatea browser-ului tău</li>
              <li>Conexiunea HTTPS pentru aplicația web</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Recomandăm: Nu accesa aplicația pe device-uri publice sau partajate.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Perioada de Stocare
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Datele tale rămân în localStorage <strong>indefinit</strong>, până când:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Ștergi manual profilul din "Setări"</li>
              <li>Ștergi cache-ul/cookies browser-ului</li>
              <li>Dezinstalezi aplicația (dacă e instalată ca PWA)</li>
            </ul>
          </section>

          {/* Children Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Copii Sub 16 Ani
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Această aplicație NU este destinată copiilor sub 16 ani. NU colectăm în mod conștient date de la minori.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Modificări ale Politicii
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ne rezervăm dreptul de a actualiza această politică. Modificările vor fi comunicate prin:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Actualizarea datei "Ultima actualizare" de mai sus</li>
              <li>Notificare în aplicație (dacă modificările sunt semnificative)</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre această politică sau despre datele tale:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Deschide un issue pe GitHub repository-ul proiectului</li>
              <li>Consultă documentația aplicației</li>
            </ul>
          </section>

          {/* Links */}
          <section className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Documente Conexe</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/cookie-policy">
                <Button variant="outline" size="sm">
                  Politica de Cookies
                </Button>
              </Link>
              <Link href="/terms">
                <Button variant="outline" size="sm">
                  Termeni și Condiții
                </Button>
              </Link>
              <Link href="/setari">
                <Button variant="outline" size="sm">
                  Gestionează Datele Tale
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
