import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // In production this can be routed to an email service or stored in Supabase
    console.log('Contact inquiry received:', { name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will respond within 24 business hours.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
  }
}
