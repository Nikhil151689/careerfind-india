import { NextResponse } from 'next/server';
import { unpublishExpiredJobsAsync } from '@/lib/data-store';
import { authenticateAdminRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Enforce Administrator / Webhook Secret Authorization
    const auth = await authenticateAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status });
    }

    const unpublishedCount = await unpublishExpiredJobsAsync();
    return NextResponse.json({
      success: true,
      message: `Automatic expiry check completed. ${unpublishedCount} expired opening(s) have been hidden from public search.`,
      unpublishedCount,
    });
  } catch (err) {
    console.error('Auto-expiry error:', err);
    return NextResponse.json(
      { error: 'Failed to process job expirations' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  return POST(req);
}
