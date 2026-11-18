/**
 * Duplicate Detection Engine for CareerFind India
 * Prevents re-inserting already processed or existing active job postings.
 */

import { Job, CollectedJob, ExtractedJobPayload } from '@/types/job';

/**
 * Normalizes an application URL by stripping tracking params and standardizing protocol/host
 */
export function normalizeUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  try {
    const url = new URL(rawUrl.trim());
    url.protocol = 'https:';
    url.hostname = url.hostname.replace(/^www\./, '').toLowerCase();
    url.hash = '';

    // Strip common tracking and referral query parameters
    const trackingParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'ref',
      'source',
      'fbclid',
      'gclid',
      'trk',
    ];
    trackingParams.forEach((p) => url.searchParams.delete(p));

    // Remove trailing slash from pathname if present
    let path = url.pathname;
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    url.pathname = path;

    return url.toString();
  } catch {
    // If not a standard URL, clean basic string
    return rawUrl
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '');
  }
}

/**
 * Generates a normalized match key combining company name and sanitized job title
 */
export function generateMatchKey(companyName: string, title: string): string {
  const cleanCompany = (companyName || '')
    .toLowerCase()
    .replace(/\b(private|pvt|ltd|limited|inc|corp|corporation|technologies|solutions|services)\b/gi, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();

  const cleanTitle = (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();

  return `${cleanCompany}:${cleanTitle}`;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason?: string;
  matchedJobId?: string;
}

/**
 * Checks whether an incoming extracted job is a duplicate against existing active jobs
 * or already pending/approved collected jobs.
 */
/**
 * Checks whether an incoming extracted job is a duplicate against existing active jobs
 * or already pending/approved collected jobs.
 * 
 * Accurately prevents duplicate postings while ensuring distinct roles at the same company
 * (e.g., Software Engineer vs Data Analyst) sharing a generic careers portal link are NOT falsely conflated.
 */
function isGenericCareersUrl(urlStr: string): boolean {
  try {
    const u = new URL(urlStr);
    const path = u.pathname.replace(/\/$/, '').toLowerCase();
    return (
      path === '' ||
      path === '/' ||
      path === '/careers' ||
      path === '/career' ||
      path === '/jobs' ||
      path === '/job' ||
      path === '/web/careers' ||
      path === '/careers.html'
    );
  } catch {
    return false;
  }
}

export function checkDuplicateJob(
  candidate: ExtractedJobPayload,
  existingJobs: Job[] = [],
  collectedQueue: CollectedJob[] = []
): DuplicateCheckResult {
  const normApplyUrl = normalizeUrl(candidate.official_apply_url);
  const normSourceUrl = candidate.source_url ? normalizeUrl(candidate.source_url) : '';
  const matchKey = generateMatchKey(candidate.company_name, candidate.title);
  const isGenericApply = isGenericCareersUrl(normApplyUrl);

  // 1. Check against active published jobs in public.jobs
  for (const job of existingJobs) {
    const jobMatchKey = generateMatchKey(job.company?.name || '', job.title);

    // Exact Apply URL match (Only consider apply URL uniquely identifying if not a generic portal landing page)
    if (normApplyUrl && normalizeUrl(job.official_apply_url) === normApplyUrl) {
      if (!isGenericApply || matchKey === jobMatchKey) {
        return {
          isDuplicate: true,
          reason: `Matches official apply URL of active job "${job.title}" at ${job.company?.name || 'Company'}`,
          matchedJobId: job.id,
        };
      }
    }

    // Exact Source URL match
    if (normSourceUrl && job.source_url && normalizeUrl(job.source_url) === normSourceUrl) {
      if (!isGenericApply || matchKey === jobMatchKey) {
        return {
          isDuplicate: true,
          reason: `Matches source URL of active job "${job.title}"`,
          matchedJobId: job.id,
        };
      }
    }

    // Normalized Company + Title key match (catches re-postings with modified tracking params)
    if (matchKey && jobMatchKey && matchKey === jobMatchKey) {
      return {
        isDuplicate: true,
        reason: `Identical company & role name to active job "${job.title}"`,
        matchedJobId: job.id,
      };
    }
  }

  // 2. Check against already collected jobs in the queue
  for (const col of collectedQueue) {
    if (col.status === 'rejected') continue; // Allow reconsideration if previously rejected

    const colKey = col.normalized_key || generateMatchKey(col.company_name, col.title);

    // Exact Apply URL match
    if (normApplyUrl && normalizeUrl(col.official_apply_url) === normApplyUrl) {
      if (!isGenericApply || matchKey === colKey) {
        return {
          isDuplicate: true,
          reason: `Matches apply URL of already collected queue item (#${col.id.slice(0, 8)})`,
          matchedJobId: col.id,
        };
      }
    }

    // Normalized Match Key match
    if (matchKey && colKey && matchKey === colKey) {
      return {
        isDuplicate: true,
        reason: `Role already present in queue (#${col.id.slice(0, 8)}) for ${col.company_name}`,
        matchedJobId: col.id,
      };
    }
  }

  return { isDuplicate: false };
}
