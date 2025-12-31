import Link from 'next/link';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">DiasporaRO</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ghidul tău gratuit pentru munca în UE. Informații despre taxe, asigurări sociale,
              sănătate și pensii pentru lucrătorii români din diaspora.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Informații Legale</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Politica de Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Termeni și Condiții
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resurse</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Întrebări Frecvente (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/setari"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Setări
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/diaspora-ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  GitHub (Open Source)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>⚠️ Notă importantă:</strong> DiasporaRO oferă informații generale cu caracter
              informativ. NU constituie consiliere juridică, fiscală sau financiară. Pentru situații
              specifice, consultați un specialist autorizat. Toate datele rămân pe telefon/computer -
              NU trimitem informații nicăieri.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} DiasporaRO. Licență MIT - Open Source.
          </p>

          {/* Made with Love */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for Romanian diaspora</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
