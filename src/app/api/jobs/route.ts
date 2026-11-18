import { NextResponse } from 'next/server';
import { 
  fetchJobs, 
  createJobAsync, 
  updateJobAsync, 
  deleteJobAsync, 
  togglePublishJobAsync 
} from '@/lib/data-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('q') || undefined;
  const location = searchParams.get('location') || undefined;
  const category = searchParams.get('category') || undefined;
  const experience = searchParams.get('experience') || undefined;
  const jobType = searchParams.get('jobType') || undefined;
  const workMode = searchParams.get('workMode') || undefined;
  const isFresher = searchParams.get('isFresher') === 'true';
  const isGovernment = searchParams.get('isGovernment') === 'true';
  const isWfh = searchParams.get('isWfh') === 'true';
  const isFeatured = searchParams.get('isFeatured') === 'true';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const sortBy = (searchParams.get('sortBy') as 'latest' | 'salary_desc' | 'deadline_asc') || 'latest';

  const result = await fetchJobs({
    query,
    location,
    category,
    experience,
    jobType,
    workMode,
    isFresher,
    isGovernment,
    isWfh,
    isFeatured,
    page,
    limit,
    sortBy,
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const jobData = await req.json();
    if (!jobData.title || !jobData.official_apply_url) {
      return NextResponse.json(
        { error: 'Job title and official_apply_url are required' },
        { status: 400 }
      );
    }
    const created = await createJobAsync(jobData);
    return NextResponse.json({ success: true, job: created }, { status: 201 });
  } catch (error) {
    console.error('API create job error:', error);
    return NextResponse.json({ error: 'Failed to create job opening' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, togglePublish, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Job id is required' }, { status: 400 });
    }

    if (togglePublish) {
      const newStatus = await togglePublishJobAsync(id);
      return NextResponse.json({ success: true, is_published: newStatus });
    }

    const updated = await updateJobAsync(id, updates);
    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error('API update job error:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ error: 'Job id is required' }, { status: 400 });
    }

    const deleted = await deleteJobAsync(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error('API delete job error:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
