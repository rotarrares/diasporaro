'use client';

import { useEffect } from 'react';
import {
  registerServiceWorker,
  addConnectivityListeners,
  setInstallPrompt,
  BeforeInstallPromptEvent,
} from '@/lib/pwa-utils';

export function PWAInit() {
  useEffect(() => {
    // Register service worker in production, unregister in development
    if (process.env.NODE_ENV === 'production') {
      registerServiceWorker().catch((error) => {
        console.error('Failed to register service worker:', error);
      });
    } else if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Unregister any existing service workers in development
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('Service worker unregistered in development mode');
        });
      });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);

      // Optionally show a custom install button
      console.log('PWA install prompt is available');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Handle successful installation
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setInstallPrompt(null);

      // Track installation in analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'PWA Installation',
        });
      }
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Handle connectivity changes
    const cleanup = addConnectivityListeners(
      () => {
        // Online
        console.log('App is back online');

        // Show toast notification
        const event = new CustomEvent('pwa-online');
        window.dispatchEvent(event);
      },
      () => {
        // Offline
        console.log('App is offline');

        // Show toast notification
        const event = new CustomEvent('pwa-offline');
        window.dispatchEvent(event);
      }
    );

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      cleanup();
    };
  }, []);

  return null;
}
