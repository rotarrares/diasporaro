# Push Notifications Setup Guide

## Phase 4: Push Notifications Implementation

This document outlines the push notifications implementation for DiasporaRO.

## What's Been Implemented

### 1. Dependencies
- ✅ `web-push` package installed

### 2. VAPID Keys Generation
- ✅ Script created: `scripts/generate-vapid.js`
- Run: `node scripts/generate-vapid.js`
- Copy the output to `.env.local`:
  ```env
  NEXT_PUBLIC_VAPID_PUBLIC_KEY=<public_key>
  VAPID_PRIVATE_KEY=<private_key>
  VAPID_EMAIL=mailto:contact@diasporaro.eu
  ```

### 3. Components
- ✅ `src/components/pwa/PushNotifications.tsx` - UI component for enabling notifications
- ✅ Added to settings page at `src/app/(app)/setari/page.tsx`

### 4. API Routes
- ✅ `src/app/api/push/subscribe/route.ts` - Handles push subscription storage
- ✅ `src/app/api/push/send/route.ts` - Sends push notifications

### 5. Service Worker
- ⚠️ `public/push-handler.js` - Push notification handlers (needs integration)
- ⚠️ `worker/index.js` - Custom worker source (needs proper configuration)

## Remaining Tasks

### Service Worker Integration
The push notification handlers need to be properly integrated with the next-pwa service worker. There are a few approaches:

**Option 1: Post-build Script (Recommended)**
Create a script that patches the generated `public/sw.js` after build:

```javascript
// scripts/patch-sw.js
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/sw.js');
const pushHandlerPath = path.join(__dirname, '../public/push-handler.js');

const pushHandler = fs.readFileSync(pushHandlerPath, 'utf8');
const sw = fs.readFileSync(swPath, 'utf8');

const patched = sw + '\n\n' + pushHandler;
fs.writeFileSync(swPath, patched);
console.log('Service worker patched with push handlers');
```

Then update `package.json`:
```json
{
  "scripts": {
    "build": "next build && node scripts/patch-sw.js"
  }
}
```

**Option 2: Manual importScripts**
Modify `public/sw.js` manually after each build to include:
```javascript
importScripts('/push-handler.js');
```

**Option 3: Use workbox-webpack-plugin directly**
Configure Next.js to use workbox-webpack-plugin with InjectManifest mode instead of next-pwa.

## Testing Push Notifications

### 1. Generate VAPID Keys
```bash
node scripts/generate-vapid.js
```

### 2. Add Keys to Environment
Create/update `.env.local` with the generated keys.

### 3. Build and Run
```bash
npm run build
npm start
```

### 4. Subscribe to Notifications
1. Navigate to Settings page
2. Click "Activează notificări"
3. Accept browser permission

### 5. Send Test Notification
```bash
curl -X POST http://localhost:3000/api/push/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "body": "This is a test push notification",
    "url": "/dashboard",
    "subscription": <subscription_object_from_console>
  }'
```

## Production Considerations

### Database Storage
Currently, subscriptions are only logged. For production:
1. Store subscriptions in a database (e.g., MongoDB, PostgreSQL)
2. Associate subscriptions with user profiles
3. Handle subscription updates and deletions

### Sending Notifications
Create an admin interface to:
1. Send notifications to all users
2. Send targeted notifications based on user profiles
3. Schedule notifications
4. Track notification delivery

### Example Admin API
```typescript
// src/app/api/admin/push/broadcast/route.ts
export async function POST(request: NextRequest) {
  const { title, body, url } = await request.json();

  // Get all subscriptions from database
  const subscriptions = await db.pushSubscriptions.findMany();

  const results = await Promise.allSettled(
    subscriptions.map(sub =>
      webpush.sendNotification(
        sub,
        JSON.stringify({ title, body, url })
      )
    )
  );

  return NextResponse.json({
    sent: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length
  });
}
```

## Security Notes

1. **VAPID Keys**: Keep `VAPID_PRIVATE_KEY` secret - never commit to git
2. **Subscription Verification**: Validate subscriptions before storing
3. **Rate Limiting**: Implement rate limiting on push API endpoints
4. **User Consent**: Only send notifications users have opted into

## Current Status

- ✅ Core infrastructure in place
- ✅ UI component integrated
- ✅ API routes created
- ⚠️ Service worker integration needs completion
- ❌ Database storage not implemented (MVP uses console logging)
- ❌ Admin interface not implemented

## Next Steps

1. Choose and implement service worker integration approach
2. Test push notifications end-to-end
3. (Future) Add database storage for subscriptions
4. (Future) Create admin interface for sending notifications
