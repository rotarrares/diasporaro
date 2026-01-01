# PWA Install Prompt - Debugging Guide

## Changes Made

1. **Added extensive logging** to InstallPrompt.tsx
2. **Fixed timing issue** - now checks for profile periodically after event fires
3. **Created test page** at `/pwa-test` for diagnostics

## How to Test

### Option 1: Use Test Page (Recommended)

1. Deploy to Vercel
2. On Android Chrome, visit: `https://your-app.vercel.app/pwa-test`
3. Watch the Event Log and Status sections
4. Follow the on-screen instructions

### Option 2: Check Console Logs

1. Deploy to Vercel
2. On Android Chrome:
   - Visit `chrome://inspect`
   - OR use Remote Debugging from desktop Chrome
3. Complete onboarding flow
4. Watch console for logs starting with `[InstallPrompt]`

### Option 3: Desktop Testing

1. Open Chrome (not in incognito)
2. Open DevTools (F12) → Application → Manifest
3. Check for errors in manifest
4. Go to Application → Service Workers
5. Use "Add to Home Screen" in DevTools to simulate

## Expected Log Sequence

If working correctly, you should see:

```
[InstallPrompt] Component mounted
[InstallPrompt] Is standalone: false
[InstallPrompt] Event listener added
[InstallPrompt] beforeinstallprompt event fired
[InstallPrompt] Checking profile: true
[InstallPrompt] Profile found, showing prompt in 3s
[InstallPrompt] Setting showPrompt to true
[InstallPrompt] Render - showPrompt: true deferredPrompt: true
```

## Common Issues & Solutions

### 1. Event Never Fires (`beforeinstallprompt` not triggered)

**Possible causes:**
- App already installed (check "Is standalone: true")
- Not HTTPS (Vercel should be HTTPS)
- Browser doesn't support PWA (use Chrome/Edge)
- Chrome's "engagement" heuristics not met

**Solutions:**
- Uninstall app if already installed
- Visit the site 2-3 times over different days
- Clear Chrome data for the site
- Check manifest.json is valid (use Lighthouse)

### 2. Event Fires But Prompt Doesn't Show

**Possible causes:**
- No profile in localStorage
- Dismissed within last 30 days
- Console logs will show the reason

**Solutions:**
- Complete onboarding or use test page to create profile
- Clear localStorage: `localStorage.removeItem('pwa-install-dismissed')`
- Check console logs for the exact blocker

### 3. App Already in Standalone Mode

**Solution:**
- Uninstall the app
- Clear site data in Chrome settings
- Reload and test again

## Chrome's PWA Install Criteria

Chrome only fires `beforeinstallprompt` when ALL these are met:

1. ✅ Web app manifest with:
   - `name` or `short_name`
   - `icons` (192px and 512px)
   - `start_url`
   - `display: standalone` or `minimal-ui`

2. ✅ Served over HTTPS

3. ✅ Has a registered service worker

4. ✅ User engagement heuristics (varies by Chrome version):
   - Multiple visits
   - Time spent on site
   - Clicks/interactions
   - NOT visited from another app's custom tab

## Testing Engagement Heuristics

Chrome's engagement requirements can be bypassed for testing:

1. **Desktop Chrome:**
   ```
   chrome://flags/#bypass-app-banner-engagement-checks
   Enable this flag
   ```

2. **Android Chrome (requires USB debugging):**
   ```bash
   adb shell "echo '1' > /data/local/tmp/app-banner-engagement-checks"
   ```

## Quick Fixes to Try Now

### On Your Android Phone:

1. **Clear everything and start fresh:**
   ```javascript
   // In Chrome console (or use /pwa-test page)
   localStorage.clear();
   // Then reload page
   ```

2. **Check if dismissed:**
   ```javascript
   console.log(localStorage.getItem('pwa-install-dismissed'));
   // If it returns a number, clear it:
   localStorage.removeItem('pwa-install-dismissed');
   ```

3. **Check if profile exists:**
   ```javascript
   console.log(localStorage.getItem('diasporaro-profile'));
   // If null, complete onboarding or create manually:
   localStorage.setItem('diasporaro-profile', '{"test":true}');
   ```

4. **Check if already installed:**
   ```javascript
   console.log(window.matchMedia('(display-mode: standalone)').matches);
   // If true, uninstall the app first
   ```

## Force Trigger (Testing Only)

If you want to test the UI without waiting for the real event:

```javascript
// In console, simulate the event
setShowPrompt(true); // Won't work, state is private

// Better: temporarily modify the code to show without event
// In InstallPrompt.tsx, add:
// useEffect(() => { setTimeout(() => setShowPrompt(true), 3000); }, []);
```

## Next Steps

1. Deploy these changes to Vercel
2. Visit `/pwa-test` on your Android phone
3. Share the Event Log results
4. We'll diagnose from there

## Manifest Validation

Check manifest at: `https://your-app.vercel.app/manifest.json`

Should return valid JSON with all required fields.

Test in Lighthouse:
1. Open DevTools
2. Lighthouse tab
3. Select "Progressive Web App"
4. Generate report
