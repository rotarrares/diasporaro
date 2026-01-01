'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PWATestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev]);
    console.log(message);
  };

  useEffect(() => {
    addLog('PWA Test page loaded');

    // Check installation status
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);
    addLog(`Is standalone: ${standalone}`);

    // Check profile
    const profile = localStorage.getItem('diasporaro-profile');
    setHasProfile(!!profile);
    addLog(`Has profile: ${!!profile}`);

    // Check dismissed status
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const daysSince = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      setIsDismissed(daysSince < 30);
      addLog(`Dismissed ${daysSince.toFixed(1)} days ago`);
    } else {
      addLog('Never dismissed');
    }

    // Listen for beforeinstallprompt
    const handler = (e: Event) => {
      addLog('beforeinstallprompt event fired!');
      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handler);
    addLog('Event listener added');

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const createProfile = () => {
    localStorage.setItem('diasporaro-profile', JSON.stringify({ test: true }));
    setHasProfile(true);
    addLog('Profile created');
  };

  const removeProfile = () => {
    localStorage.removeItem('diasporaro-profile');
    setHasProfile(false);
    addLog('Profile removed');
  };

  const clearDismissed = () => {
    localStorage.removeItem('pwa-install-dismissed');
    setIsDismissed(false);
    addLog('Dismissed status cleared');
  };

  const clearAll = () => {
    localStorage.clear();
    setHasProfile(false);
    setIsDismissed(false);
    addLog('All localStorage cleared');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">PWA Install Prompt Test</h1>

        <Card className="p-4">
          <h2 className="font-semibold mb-2">Status</h2>
          <div className="space-y-1 text-sm">
            <div>Is Standalone: <span className={isStandalone ? 'text-green-600' : 'text-red-600'}>
              {isStandalone ? 'YES' : 'NO'}
            </span></div>
            <div>Has Profile: <span className={hasProfile ? 'text-green-600' : 'text-red-600'}>
              {hasProfile ? 'YES' : 'NO'}
            </span></div>
            <div>Is Dismissed: <span className={isDismissed ? 'text-red-600' : 'text-green-600'}>
              {isDismissed ? 'YES (blocked)' : 'NO'}
            </span></div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-2">Actions</h2>
          <div className="flex flex-wrap gap-2">
            <Button onClick={createProfile} disabled={hasProfile} size="sm">
              Create Profile
            </Button>
            <Button onClick={removeProfile} disabled={!hasProfile} size="sm" variant="outline">
              Remove Profile
            </Button>
            <Button onClick={clearDismissed} disabled={!isDismissed} size="sm" variant="outline">
              Clear Dismissed
            </Button>
            <Button onClick={clearAll} size="sm" variant="destructive">
              Clear All
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-2">Event Log</h2>
          <div className="bg-black text-green-400 p-3 rounded text-xs font-mono h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">Waiting for events...</div>
            ) : (
              logs.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <h2 className="font-semibold mb-2">Instructions</h2>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Check the Status section above</li>
            <li>Create a profile if needed</li>
            <li>Watch the Event Log for "beforeinstallprompt" event</li>
            <li>If the event fires, the prompt should appear after 3 seconds</li>
            <li>Open browser console (F12) for more detailed logs</li>
          </ol>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h2 className="font-semibold mb-2">Troubleshooting</h2>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Chrome Android requires HTTPS (Vercel has this)</li>
            <li>Must not already be installed (check Is Standalone)</li>
            <li>Must not be dismissed recently (check Is Dismissed)</li>
            <li>Event only fires once per session - reload to retry</li>
            <li>Chrome has "engagement" requirements - visit site a few times</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
