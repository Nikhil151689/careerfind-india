import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export interface AdminAuthResult {
  authorized: boolean;
  userId?: string;
  userEmail?: string;
  role?: string;
  error?: string;
  status: number;
}

/**
 * Validates that an incoming HTTP request is made by an authorized administrator
 * or an authenticated system caller (using COLLECTOR_WEBHOOK_SECRET).
 */
export async function authenticateAdminRequest(req: Request): Promise<AdminAuthResult> {
  // 1. Check if caller provided a valid webhook secret header (for cron jobs or internal automated tasks)
  const webhookSecret = req.headers.get('x-collector-secret');
  const expectedWebhookSecret = process.env.COLLECTOR_WEBHOOK_SECRET;

  if (webhookSecret && expectedWebhookSecret && webhookSecret === expectedWebhookSecret) {
    return { authorized: true, role: 'system_service', status: 200 };
  }

  // 2. Check Bearer Authorization token (from Supabase Auth session)
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  const supabase = getSupabaseAdmin();

  if (supabase && isSupabaseConfigured) {
    if (!token) {
      return {
        authorized: false,
        error: 'Unauthorized: Administrator authentication token required.',
        status: 401,
      };
    }

    try {
      // Validate session with Supabase Auth
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      if (userError || !user) {
        return {
          authorized: false,
          error: 'Unauthorized: Invalid or expired administrator session token.',
          status: 401,
        };
      }

      // Check admin_profiles table to verify user has admin privileges
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('id, email, role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError || !profile) {
        return {
          authorized: false,
          error: 'Forbidden: No administrator profile associated with this account.',
          status: 403,
        };
      }

      if (!['super_admin', 'admin', 'editor'].includes(profile.role)) {
        return {
          authorized: false,
          error: 'Forbidden: Insufficient permissions to access collector management.',
          status: 403,
        };
      }

      return {
        authorized: true,
        userId: user.id,
        userEmail: profile.email,
        role: profile.role,
        status: 200,
      };
    } catch (err) {
      console.error('Error verifying admin authorization:', err);
      return {
        authorized: false,
        error: 'Internal authorization error.',
        status: 500,
      };
    }
  }

  // 3. Fallback for offline development / test mode when Supabase is not configured
  const localAuthHeader = req.headers.get('x-admin-auth');
  if (localAuthHeader === 'true') {
    return {
      authorized: true,
      role: 'admin',
      status: 200,
    };
  }

  return {
    authorized: false,
    error: 'Unauthorized: Administrator authentication required.',
    status: 401,
  };
}
