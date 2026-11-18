import { NextResponse } from 'next/server';
import { extractJobWithGemini } from '@/lib/gemini-extractor';
import { checkDuplicateJob, normalizeUrl, generateMatchKey } from '@/lib/collector-dedup';
import { 
  fetchAllJobsAdmin, 
  fetchCollectedJobsAsync, 
  saveCollectedJobAsync,
  recordCollectorRunAsync 
} from '@/lib/data-store';
import { ExtractedJobPayload } from '@/types/job';

export async function POST(req: Request) {
  try {
    // 1. Verify Secret Header (Strict check: Environment-based secret required; never defaults to a hardcoded string)
    const secret = req.headers.get('x-collector-secret') || req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const expectedSecret = process.env.COLLECTOR_WEBHOOK_SECRET;

    if (!expectedSecret || !secret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized webhook call. Missing or invalid secret key.' },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const rawJobs = Array.isArray(body) ? body : [body];

    if (rawJobs.length === 0 || !body) {
      return NextResponse.json({ error: 'No job payload provided' }, { status: 400 });
    }

    // 2. Fetch existing jobs and pending queue for deduplication
    const [existingJobs, existingQueue] = await Promise.all([
      fetchAllJobsAdmin(),
      fetchCollectedJobsAsync({ limit: 100 }),
    ]);

    const results = [];
    let duplicatesCount = 0;
    let pendingCount = 0;

    for (const raw of rawJobs) {
      let extracted: ExtractedJobPayload;

      // Check if already extracted by n8n or requires Gemini extraction
      if (raw.extracted_data && raw.extracted_data.title && raw.extracted_data.official_apply_url) {
        extracted = raw.extracted_data as ExtractedJobPayload;
      } else if (raw.title && raw.company_name && raw.official_apply_url && raw.qualification) {
        extracted = raw as ExtractedJobPayload;
      } else {
        // Run Gemini extraction on raw text / HTML content
        extracted = await extractJobWithGemini({
          title: raw.title,
          company: raw.company || raw.company_name,
          content: raw.content || raw.raw_content || raw.description || '',
          sourceUrl: raw.sourceUrl || raw.source_url || raw.url,
          sourceName: raw.sourceName || raw.source_name || 'n8n Ingestion Agent',
        });
      }

      // Run duplicate verification
      const dupCheck = checkDuplicateJob(extracted, existingJobs, existingQueue.items);
      if (dupCheck.isDuplicate) {
        duplicatesCount++;
      } else {
        pendingCount++;
      }

      // Save to collected_jobs table (always pending approval; NEVER auto-published)
      const saved = await saveCollectedJobAsync({
        source_name: raw.source_name || raw.sourceName || 'n8n Ingestion Agent',
        source_url: raw.source_url || raw.sourceUrl || extracted.source_url,
        raw_title: raw.title || raw.raw_title,
        raw_company: raw.company || raw.company_name,
        raw_content: raw.content || raw.raw_content,
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

      results.push({
        id: saved.id,
        title: saved.title,
        company: saved.company_name,
        is_duplicate: saved.is_duplicate,
        duplicate_reason: saved.duplicate_reason,
      });
    }

    // Record audit run
    await recordCollectorRunAsync({
      triggered_by: 'webhook',
      jobs_collected: rawJobs.length,
      jobs_pending: pendingCount,
      duplicates_found: duplicatesCount,
      status: 'completed',
    });

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${rawJobs.length} job(s). ${pendingCount} pending review, ${duplicatesCount} flagged as duplicate.`,
      processed: rawJobs.length,
      pendingCount,
      duplicatesCount,
      jobs: results,
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Internal error processing collector webhook payload' },
      { status: 500 }
    );
  }
}
