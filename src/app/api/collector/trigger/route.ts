import { NextResponse } from 'next/server';
import { fetchFromPermittedFeeds } from '@/lib/permitted-feeds';
import { extractJobWithGemini } from '@/lib/gemini-extractor';
import { checkDuplicateJob, normalizeUrl, generateMatchKey } from '@/lib/collector-dedup';
import { 
  fetchAllJobsAdmin, 
  fetchCollectedJobsAsync, 
  saveCollectedJobAsync, 
  recordCollectorRunAsync 
} from '@/lib/data-store';
import { authenticateAdminRequest } from '@/lib/admin-auth';

export async function POST(req: Request) {
  try {
    // Enforce Administrator Authorization
    const auth = await authenticateAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: auth.status });
    }

    const startTime = Date.now();
    let body = {};
    try {
      body = await req.json();
    } catch {}

    const triggeredBy = (body as { triggered_by?: string })?.triggered_by || 'admin_manual';

    // 1. Fetch from lawful & permitted recruitment feeds
    const rawFeedItems = await fetchFromPermittedFeeds();

    // 2. Fetch existing listings to check duplicates
    const [existingJobs, existingQueue] = await Promise.all([
      fetchAllJobsAdmin(),
      fetchCollectedJobsAsync({ limit: 100 }),
    ]);

    let collectedCount = 0;
    let pendingCount = 0;
    let duplicateCount = 0;
    const processedJobs = [];

    // 3. Process each item through Gemini + Deduplication
    for (const item of rawFeedItems) {
      try {
        const extracted = await extractJobWithGemini({
          title: item.title,
          company: item.company,
          content: item.rawContent,
          sourceUrl: item.sourceUrl,
          sourceName: item.sourceName,
        });

        const dupCheck = checkDuplicateJob(extracted, existingJobs, existingQueue.items);
        if (dupCheck.isDuplicate) {
          duplicateCount++;
        } else {
          pendingCount++;
        }
        collectedCount++;

        const saved = await saveCollectedJobAsync({
          source_name: item.sourceName,
          source_url: item.sourceUrl,
          raw_title: item.title,
          raw_company: item.company,
          raw_content: item.rawContent,
          extracted_data: extracted as unknown as Record<string, unknown>,
          status: 'pending',
          is_duplicate: dupCheck.isDuplicate,
          duplicate_reason: dupCheck.reason,
          matched_job_id: dupCheck.matchedJobId,
          title: extracted.title,
          company_name: extracted.company_name,
          category_slug: extracted.category_slug,
          location: extracted.location,
          work_mode: extracted.work_mode,
          job_type: extracted.job_type,
          experience_level: extracted.experience_level,
          experience_min: extracted.experience_min,
          experience_max: extracted.experience_max,
          salary_text: extracted.salary_text,
          salary_min: extracted.salary_min,
          salary_max: extracted.salary_max,
          qualification: extracted.qualification,
          skills: extracted.skills,
          description: extracted.description,
          responsibilities: extracted.responsibilities,
          eligibility_criteria: extracted.eligibility_criteria,
          application_deadline: extracted.application_deadline,
          official_apply_url: extracted.official_apply_url,
          is_fresher: extracted.is_fresher,
          is_government: extracted.is_government,
          is_wfh: extracted.is_wfh,
          is_internship: extracted.is_internship,
          is_walkin: extracted.is_walkin,
          normalized_url: normalizeUrl(extracted.official_apply_url),
          normalized_key: generateMatchKey(extracted.company_name, extracted.title),
        });

        processedJobs.push({
          id: saved.id,
          title: saved.title,
          company: saved.company_name,
          is_duplicate: saved.is_duplicate,
          status: saved.status,
        });
      } catch (itemErr) {
        console.warn('Failed to extract single feed item:', itemErr);
      }
    }

    // 4. Record audit run
    await recordCollectorRunAsync({
      triggered_by: triggeredBy as 'n8n_cron' | 'admin_manual' | 'webhook',
      jobs_collected: collectedCount,
      jobs_pending: pendingCount,
      duplicates_found: duplicateCount,
      status: 'completed',
    });

    const elapsedMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: `Daily collection completed in ${elapsedMs}ms. ${collectedCount} openings gathered, ${pendingCount} added for approval, ${duplicateCount} identified as duplicates.`,
      stats: {
        collectedCount,
        pendingCount,
        duplicateCount,
        elapsedMs,
      },
      jobs: processedJobs,
    });
  } catch (err) {
    console.error('Trigger collection error:', err);
    return NextResponse.json(
      { error: 'Failed to run automated job collection' },
      { status: 500 }
    );
  }
}
