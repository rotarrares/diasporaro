'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Shield, Cookie, FileText, Bell } from 'lucide-react';
import { PushNotifications } from '@/components/pwa/PushNotifications';

export default function SettingsPage() {
  const router = useRouter();
  const { resetProfile } = useProfile();

  const handleReset = () => {
    if (confirm('Sigur vrei să resetezi profilul? Vei trebui să refaci chestionarul.')) {
      resetProfile();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4">
        <h1 className="text-2xl font-bold">Setări</h1>
        <p className="text-gray-600 text-sm mt-1">
          Gestionează-ți datele și configurările aplicației
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* What's Here Info Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-primary-900">
              Ce găsești în Setări
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Confidențialitate:</strong> Vezi cum păstrăm datele tale în siguranță și accesează politicile noastre</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Resetare profil:</strong> Șterge datele și reîncepe chestionarul dacă situația ta s-a schimbat</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p><strong>Informații aplicație:</strong> Versiune curentă și detalii despre DiasporaRO</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Notifications Section */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notificări
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Primește notificări când apar documente noi sau actualizări importante
            </p>
            <PushNotifications />
          </CardContent>
        </Card>

        {/* Data Privacy Section */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Confidențialitate & Date Personale
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mb-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>🔒 Datele tale sunt 100% private</strong>
              </p>
              <p className="text-xs text-blue-800">
                Toate informațiile rămân pe telefon/computer, nu le trimitem nicăieri.
                Nu te urmărim și nu folosim datele tale pentru publicitate.
              </p>
            </div>
            <div className="space-y-2">
              <Link href="/privacy" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Politica de Confidențialitate
                </Button>
              </Link>
              <Link href="/cookie-policy" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Cookie className="mr-2 h-4 w-4" />
                  Politica de Cookies
                </Button>
              </Link>
              <Link href="/terms" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Termeni și Condiții
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Reset Profile */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Resetează Profilul</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Șterge toate datele și reîncepe chestionarul
                </p>
                <p className="text-xs text-gray-500">
                  Aceasta va șterge toate informațiile salvate pe telefon/computer,
                  inclusiv răspunsurile din chestionar. Acțiunea nu poate fi anulată.
                </p>
              </div>
            </div>
            <Button
              onClick={handleReset}
              variant="destructive"
              className="w-full"
            >
              Resetează Profilul
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Despre DiasporaRO</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">
                  <strong>Versiune:</strong> 1.0.0 (MVP)
                </p>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  DiasporaRO te ajută să înțelegi obligațiile fiscale și de asigurări sociale când lucrezi în UE.
                  Primești informații personalizate bazate pe situația ta specifică.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                <p className="text-xs text-blue-800 mb-2">
                  <strong>📱 Ce poți face cu aplicația:</strong>
                </p>
                <ul className="text-xs text-blue-800 space-y-1 ml-4">
                  <li>• Află ce taxe și contribuții trebuie să plătești</li>
                  <li>• Descoperă documentele necesare pentru situația ta</li>
                  <li>• Găsește răspunsuri la întrebări despre pensie, sănătate, șomaj</li>
                  <li>• Accesează resurse oficiale guvernamentale</li>
                </ul>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r">
                <p className="text-xs text-amber-800">
                  <strong>⚠️ Declinarea responsabilității:</strong> Informațiile din această aplicație sunt cu caracter informativ și nu constituie
                  consiliere juridică, fiscală sau financiară. Pentru situații complexe, consultați un specialist autorizat.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
