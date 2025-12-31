import { NextRequest, NextResponse } from 'next/server';

// In production, save to database
// For free tier MVP, log or use simple storage
export async function POST(request: NextRequest) {
  const subscription = await request.json();
  console.log('Push subscription:', subscription.endpoint);

  // TODO: Save to database when implementing admin panel

  return NextResponse.json({ success: true });
}
