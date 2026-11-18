import { NextResponse } from 'next/server';
import { 
  updateCollectedJobAsync, 
  deleteCollectedJobAsync, 
  approveAndPublishJobAsync 
} from '@/lib/data-store';
import { authenticateAdminRequest } from '@/lib/admin-auth';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    // Enforce Administrator Authorization
    const auth = await authenticateAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status });
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ error: 'Missing job ID' }, { status: 400 });
    }

    const body = await req.json();
    const action = body.action || 'edit';

    // 1. Publish to active portal
    if (action === 'publish') {
      const result = await approveAndPublishJobAsync(id, {
        ...(body.editedData || {}),
        reviewed_by: auth.userId,
      });
      if (!result.success) {
        return NextResponse.json({ error: result.error || 'Failed to publish job' }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: 'Job successfully approved and published to the live public portal!',
        publishedJob: result.publishedJob,
      });
    }

    // 2. Mark Approved
    if (action === 'approve') {
      const updated = await updateCollectedJobAsync(id, {
        status: 'approved',
        reviewed_by: auth.userId,
        reviewed_at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, job: updated });
    }

    // 3. Mark Rejected
    if (action === 'reject') {
      const updated = await updateCollectedJobAsync(id, {
        status: 'rejected',
        rejection_reason: body.rejection_reason || 'Rejected by administrator',
        reviewed_by: auth.userId,
        reviewed_at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, job: updated });
    }

    // 4. Update / Edit Details
    if (action === 'edit') {
      const { action: _, ...fields } = body;
      const updated = await updateCollectedJobAsync(id, fields);
      return NextResponse.json({ success: true, job: updated });
    }

    return NextResponse.json({ error: 'Unrecognized action' }, { status: 400 });
  } catch (err) {
    console.error('Collector job update error:', err);
    return NextResponse.json({ error: 'Failed to update collected job' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: RouteContext) {
  try {
    // Enforce Administrator Authorization
    const auth = await authenticateAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status });
    }

    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ error: 'Missing job ID' }, { status: 400 });
    }

    const deleted = await deleteCollectedJobAsync(id);
    return NextResponse.json({ success: deleted });
  } catch (err) {
    console.error('Collector job delete error:', err);
    return NextResponse.json({ error: 'Failed to delete collected job' }, { status: 500 });
  }
}
