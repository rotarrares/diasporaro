'use client';

import { useEffect } from 'react';

export function usePushNotifications() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Add push event listener
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'PUSH_RECEIVED') {
            console.log('Push notification received:', event.data);
          }
        });
      });
    }
  }, []);
}
