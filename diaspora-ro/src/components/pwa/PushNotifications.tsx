'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      console.log('🔔 Initial notification permission:', Notification.permission);
    }
  }, []);

  const subscribe = async () => {
    if (typeof window === 'undefined') return;

    console.log('🔔 Starting push subscription...');
    console.log('🔔 VAPID Public Key:', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);

    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('🔔 Service Worker ready:', registration);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

      console.log('🔔 Push subscription created:', subscription);

      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      console.log('🔔 Subscription saved to server:', await response.json());

      setIsSubscribed(true);
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
    }
  };

  const requestPermission = async () => {
    if (typeof window === 'undefined') return;

    console.log('🔔 Button clicked! Requesting notification permission...');

    try {
      const result = await Notification.requestPermission();
      console.log('🔔 Permission result:', result);
      setPermission(result);
      if (result === 'granted') {
        await subscribe();
      } else {
        console.log('❌ Permission denied or dismissed');
      }
    } catch (error) {
      console.error('❌ Permission request failed:', error);
    }
  };

  if (!isClient || typeof window === 'undefined' || !('Notification' in window)) {
    console.log('🔔 Component not rendering:', { isClient, hasWindow: typeof window !== 'undefined', hasNotification: typeof window !== 'undefined' && 'Notification' in window });
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={requestPermission}
      className="gap-2"
      disabled={permission === 'granted' && isSubscribed}
    >
      {permission === 'granted' && isSubscribed ? (
        <><Bell className="w-4 h-4" /> Notificări active</>
      ) : (
        <><BellOff className="w-4 h-4" /> Activează notificări</>
      )}
    </Button>
  );
}
