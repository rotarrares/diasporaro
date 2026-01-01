'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    console.log('[InstallPrompt] Component mounted');

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    console.log('[InstallPrompt] Is standalone:', isStandalone);
    if (isStandalone) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      console.log('[InstallPrompt] Days since dismissed:', daysSince);
      if (daysSince < 30) return;
    }

    const handleBeforeInstall = (e: Event) => {
      console.log('[InstallPrompt] beforeinstallprompt event fired');
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check for profile periodically (in case user completes onboarding after this event)
      const checkProfile = () => {
        const profile = localStorage.getItem('diasporaro-profile');
        console.log('[InstallPrompt] Checking profile:', !!profile);

        if (profile) {
          console.log('[InstallPrompt] Profile found, showing prompt in 3s');
          setTimeout(() => {
            console.log('[InstallPrompt] Setting showPrompt to true');
            setShowPrompt(true);
          }, 3000);
          return true;
        }
        return false;
      };

      // Check immediately and then every 5 seconds for up to 2 minutes
      if (!checkProfile()) {
        const interval = setInterval(() => {
          if (checkProfile()) {
            clearInterval(interval);
          }
        }, 5000);

        setTimeout(() => clearInterval(interval), 120000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Also check if the event already fired (though unlikely)
    console.log('[InstallPrompt] Event listener added');

    return () => {
      console.log('[InstallPrompt] Component unmounting');
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    console.log('[InstallPrompt] Install clicked');
    if (!deferredPrompt) {
      console.log('[InstallPrompt] No deferred prompt available');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[InstallPrompt] User choice:', outcome);
    if (outcome === 'dismissed') {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    console.log('[InstallPrompt] Dismissed');
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  console.log('[InstallPrompt] Render - showPrompt:', showPrompt, 'deferredPrompt:', !!deferredPrompt);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <Card className="bg-primary text-white border-0 shadow-2xl">
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              <h3 className="font-semibold">Instalează DiasporaRO</h3>
            </div>
            <button onClick={handleDismiss} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-white/90 mb-3">
            Instalează aplicația pentru acces rapid și funcționare offline.
          </p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} variant="secondary" className="flex-1" size="sm">
              Instalează
            </Button>
            <Button onClick={handleDismiss} variant="ghost" className="text-white hover:bg-white/10" size="sm">
              Mai târziu
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
