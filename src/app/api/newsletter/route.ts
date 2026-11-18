import { NextResponse } from 'next/server';
import { localStore } from '@/lib/data-store';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, preferences } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. If Supabase is configured, insert into subscribers table
    const supabase = getSupabaseClient();
    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await (supabase.from('subscribers') as any).upsert(
          {
            email: cleanEmail,
            category_preferences: preferences || ['All Jobs'],
            is_active: true,
          },
          { onConflict: 'email' }
        );
        if (error) {
          console.error('Supabase subscriber error:', error);
        }
      } catch (err) {
        console.error('Supabase subscriber exception:', err);
      }
    }

    // 2. Always register in local store as well
    localStore.addSubscriber(cleanEmail, preferences || ['All Jobs']);

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed! You will receive verified job alerts.',
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
