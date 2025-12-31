import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | DiasporaRO',
  description: 'Termenii și condițiile de utilizare pentru aplicația DiasporaRO',
};

export default function TermsPage() {
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
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">
              Termeni și Condiții
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
              1. Acceptarea Termenilor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bun venit la DiasporaRO! Prin accesarea și utilizarea acestei aplicații web, accepti să respecti și să fii legat de acești Termeni și Condiții de utilizare.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Dacă nu ești de acord cu acești termeni, te rugăm să nu folosești aplicația.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Descrierea Serviciului
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              DiasporaRO este o aplicație web progresivă (PWA) gratuită care oferă informații generale despre:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Obligațiile fiscale pentru lucrătorii români în Uniunea Europeană</li>
              <li>Asigurările sociale și de sănătate în diferite state membre UE</li>
              <li>Documentele necesare pentru muncă în străinătate</li>
              <li>Drepturile de pensie și contribuții sociale</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Aplicația este un instrument informațional și educațional, <strong>NU un serviciu de consultanță juridică sau fiscală</strong>.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h2 className="text-xl font-semibold text-amber-900 mb-2">
                ⚠️ Declinarea Responsabilității
              </h2>
              <p className="text-amber-800 text-sm leading-relaxed mb-2">
                Informațiile furnizate de DiasporaRO sunt cu <strong>caracter general și informativ</strong>.
                NU constituie și NU ar trebui interpretate ca:
              </p>
              <ul className="list-disc list-inside space-y-1 text-amber-800 text-sm ml-4">
                <li>Consiliere juridică personalizată</li>
                <li>Consiliere fiscală sau contabilă</li>
                <li>Recomandări financiare</li>
                <li>Servicii de consultanță profesională</li>
              </ul>
              <p className="text-amber-900 font-medium text-sm mt-3">
                Pentru situații specifice sau complexe, consultă întotdeauna un specialist autorizat (avocat, consultant fiscal, contabil).
              </p>
            </div>
          </section>

          {/* Free Service */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Serviciu Gratuit
            </h2>
            <p className="text-gray-700 leading-relaxed">
              DiasporaRO este oferit <strong>gratuit</strong>, fără costuri ascunse, abonamente sau plăți de orice fel.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Ne rezervăm dreptul de a introduce, în viitor, funcții premium opționale sau donații, dar accesul de bază va rămâne gratuit.
            </p>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Obligațiile Utilizatorului
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Prin utilizarea DiasporaRO, te angajezi să:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Folosești aplicația legal:</strong> NU vei încerca să hackuiești, să modifici sau să perturbezi aplicația
              </li>
              <li>
                <strong>Respecti drepturile de autor:</strong> Conținutul aplicației este proprietate intelectuală protejată
              </li>
              <li>
                <strong>NU reproduci fără permisiune:</strong> Nu vei copia, distribui sau revinde conținutul aplicației fără acordul nostru scris
              </li>
              <li>
                <strong>Verifici informațiile:</strong> Îți asumi responsabilitatea să verifici acuratețea informațiilor pentru situația ta specifică
              </li>
            </ul>
          </section>

          {/* Accuracy of Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Acuratețea Informațiilor
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Depunem eforturi rezonabile pentru a asigura că informațiile din DiasporaRO sunt:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>Actualizate conform legislației la data publicării</li>
              <li>Bazate pe surse oficiale (ANAF, CNPP, instituții UE)</li>
              <li>Prezentate într-un mod clar și accesibil</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>ÎNSĂ:</strong> Legile fiscale și sociale se schimbă frecvent. Nu putem garanta că toate informațiile sunt 100% actualizate în orice moment.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-3">
              <p className="text-blue-900 text-sm">
                📅 <strong>Recomandare:</strong> Verifică întotdeauna cu surse oficiale sau consultă un specialist înainte de a lua decizii importante bazate pe informațiile din aplicație.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Limitarea Răspunderii
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              DiasporaRO și dezvoltatorii săi <strong>NU sunt responsabili</strong> pentru:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <strong>Decizii luate pe baza informațiilor din aplicație</strong> - fiecare utilizator își asumă responsabilitatea propriilor acțiuni
              </li>
              <li>
                <strong>Pierderi financiare</strong> - rezultate din interpretarea greșită a informațiilor sau din modificări legislative neprevăzute
              </li>
              <li>
                <strong>Erori sau omisiuni</strong> - în ciuda eforturilor noastre, pot exista informații incomplete sau învechite
              </li>
              <li>
                <strong>Probleme tehnice</strong> - indisponibilitatea temporară a aplicației sau erori de funcționare
              </li>
              <li>
                <strong>Link-uri externe</strong> - conținutul site-urilor terțe la care facem referire (ANAF, CNPP, etc.)
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3 font-medium">
              Utilizarea aplicației se face pe propriul risc.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Proprietate Intelectuală
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Conținutul DiasporaRO (text, design, cod, logică de business) este protejat de drepturile de autor și este oferit sub licență <strong>MIT License</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aceasta înseamnă că poți folosi codul sursă pentru proiecte personale sau comerciale, dar trebuie să menționezi autorii originali și să incluzi licența.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>NU poți:</strong> Pretinde că ai creat DiasporaRO sau că deții drepturi exclusive asupra lui.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              8. Confidențialitate și Date Personale
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Colectarea și utilizarea datelor tale sunt reglementate de <Link href="/privacy" className="text-primary underline font-medium">Politica de Confidențialitate</Link>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Pe scurt:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>NU colectăm date personale identificabile (nume, CNP, email)</li>
              <li>Datele profilului tău sunt stocate DOAR local în browser</li>
              <li>NU partajăm date cu terțe părți</li>
              <li>Poți șterge datele oricând din "Setări"</li>
            </ul>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              9. Link-uri către Site-uri Externe
            </h2>
            <p className="text-gray-700 leading-relaxed">
              DiasporaRO conține link-uri către resurse oficiale (ANAF, CNPP, Deutsche Rentenversicherung, etc.) pentru a-ți oferi informații actualizate direct de la sursă.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>NU suntem responsabili</strong> pentru conținutul, politicile de confidențialitate sau practicile acestor site-uri terțe.
            </p>
          </section>

          {/* Age Restriction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              10. Restricții de Vârstă
            </h2>
            <p className="text-gray-700 leading-relaxed">
              DiasporaRO este destinat adulților (18+ ani) care lucrează sau intenționează să lucreze în Uniunea Europeană.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              NU colectăm în mod conștient date de la minori sub 16 ani, conform GDPR.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              11. Modificări ale Termenilor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ne rezervăm dreptul de a actualiza acești Termeni și Condiții în orice moment.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Modificările vor fi comunicate prin:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Actualizarea datei "Ultima actualizare" de mai sus</li>
              <li>Notificare în aplicație (pentru modificări semnificative)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Continuarea utilizării aplicației după modificări constituie acceptarea noilor termeni.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              12. Încetarea Utilizării
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Poți înceta să folosești DiasporaRO în orice moment, fără nicio obligație.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Ne rezervăm dreptul de a suspenda sau închide aplicația în orice moment, fără notificare prealabilă (deși vom încerca să comunicăm din timp).
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              13. Legea Aplicabilă
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Acești Termeni și Condiții sunt guvernați de legile României și de reglementările Uniunii Europene (GDPR).
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Orice dispute vor fi rezolvate conform legislației române.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              14. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pentru întrebări despre acești Termeni și Condiții:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
              <li>Deschide un issue pe repository-ul GitHub al proiectului</li>
              <li>Consultă secțiunea FAQ din aplicație</li>
            </ul>
          </section>

          {/* Acceptance */}
          <section className="border-t pt-6">
            <div className="bg-primary/10 border-l-4 border-primary p-4">
              <h3 className="font-semibold text-primary mb-2">
                ✅ Prin utilizarea DiasporaRO, confirmi că:
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Ai citit și înțeles acești Termeni și Condiții</li>
                <li>✓ Ești de acord să îi respecți</li>
                <li>✓ Înțelegi că aplicația oferă informații generale, nu consiliere personalizată</li>
                <li>✓ Îți asumi responsabilitatea pentru deciziile luate pe baza informațiilor din aplicație</li>
              </ul>
            </div>
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
              <Link href="/cookie-policy">
                <Button variant="outline" size="sm">
                  Politica de Cookies
                </Button>
              </Link>
              <Link href="/setari">
                <Button variant="outline" size="sm">
                  Setări Aplicație
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
