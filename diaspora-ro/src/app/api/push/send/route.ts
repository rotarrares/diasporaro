import { NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

export async function POST(request: NextRequest) {
  const { title, body, url, subscription } = await request.json();

  // Set VAPID details at runtime, not at module load time
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || '',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
  );

  const payload = JSON.stringify({ title, body, url });

  try {
    await webpush.sendNotification(subscription, payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Push failed:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
