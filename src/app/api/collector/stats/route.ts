import { NextResponse } from 'next/server';
import { fetchCollectorStatsAsync, fetchCollectedJobsAsync } from '@/lib/data-store';
import { CollectedJobStatus } from '@/types/job';
import { authenticateAdminRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Enforce Administrator Authorization
    const auth = await authenticateAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const status = (searchParams.get('status') as CollectedJobStatus) || undefined;
    const isDuplicateParam = searchParams.get('isDuplicate');
    const isDuplicate = isDuplicateParam !== null ? isDuplicateParam === 'true' : undefined;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const [stats, jobsResult] = await Promise.all([
      fetchCollectorStatsAsync(),
      fetchCollectedJobsAsync({
        status,
        isDuplicate,
        limit,
        offset,
      }),
    ]);

    return NextResponse.json({
      stats,
      jobs: jobsResult.items,
      total: jobsResult.total,
    });
  } catch (err) {
    console.error('Collector stats API error:', err);
    return NextResponse.json({ error: 'Failed to fetch collector statistics' }, { status: 500 });
  }
}
