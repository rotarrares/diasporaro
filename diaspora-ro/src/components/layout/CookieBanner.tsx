'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const COOKIE_CONSENT_KEY = 'diaspora-cookie-consent';
const CONSENT_EXPIRY_DAYS = 365;

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true);

    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        accepted: true,
        timestamp: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
      })
    );

    setIsVisible(false);
  };

  const handleDecline = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Remind in 30 days

    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        accepted: false,
        timestamp: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
      })
    );

    setIsVisible(false);
  };

  // Don't render on server or if not visible
  if (!isClient || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <Card className="bg-white shadow-2xl border-2 border-gray-200">
          <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-gray-900 text-lg">
                  Respectăm confidențialitatea ta
                </h3>
              </div>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Închide banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                DiasporaRO salvează informațiile tale pe telefon/computer pentru a-ți personaliza ghidul.{' '}
                <span className="text-primary font-medium">
                  Nu te urmărim și nu folosim datele tale pentru publicitate.
                </span>
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                <p className="text-xs text-green-800">
                  <strong>✅ Transparență 100%:</strong> Toate datele rămân pe dispozitivul tău.
                  Nu trimitem nimic nicăieri.
                </p>
              </div>

              <p className="text-xs text-gray-600">
                Prin continuarea utilizării, ești de acord cu{' '}
                <Link href="/cookie-policy" className="text-primary underline hover:text-primary/80">
                  Politica de Cookies
                </Link>
                {' '}și{' '}
                <Link href="/privacy" className="text-primary underline hover:text-primary/80">
                  Politica de Confidențialitate
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button
                onClick={handleAccept}
                className="flex-1 sm:flex-none"
                size="sm"
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 sm:flex-none"
                size="sm"
              >
                Refuz
              </Button>
              <Link href="/cookie-policy" className="flex-1 sm:flex-none">
                <Button variant="ghost" className="w-full" size="sm">
                  Detalii
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
