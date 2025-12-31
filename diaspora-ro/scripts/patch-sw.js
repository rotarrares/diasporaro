const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/sw.js');
const pushHandlerPath = path.join(__dirname, '../public/push-handler.js');

try {
  // Check if files exist
  if (!fs.existsSync(swPath)) {
    console.log('Service worker not found, skipping patch');
    process.exit(0);
  }

  if (!fs.existsSync(pushHandlerPath)) {
    console.log('Push handler not found, skipping patch');
    process.exit(0);
  }

  const pushHandler = fs.readFileSync(pushHandlerPath, 'utf8');
  const sw = fs.readFileSync(swPath, 'utf8');

  // Check if already patched
  if (sw.includes('Custom service worker for push notifications')) {
    console.log('Service worker already patched');
    process.exit(0);
  }

  // Append push handler to service worker
  const patched = sw + '\n\n' + pushHandler;
  fs.writeFileSync(swPath, patched);

  console.log('✓ Service worker patched with push notification handlers');
} catch (error) {
  console.error('Error patching service worker:', error);
  // Don't fail the build
  process.exit(0);
}
