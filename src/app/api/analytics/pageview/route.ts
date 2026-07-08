import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, path } = await req.json();

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        }
      }
    );

    const { data, error } = await supabase.from('page_views').insert({
      session_id: sessionId,
      path,
      time_spent: 0
    }).select().single();

    if (error) {
      console.error('Supabase pageview insert error:', error);
      return NextResponse.json({ error: 'Failed to record page view' }, { status: 500 });
    }

    return NextResponse.json({ success: true, viewId: data.id });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { viewId, timeSpent } = await req.json();

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        }
      }
    );

    const { error } = await supabase.from('page_views').update({
      time_spent: timeSpent
    }).eq('id', viewId);

    if (error) {
      return NextResponse.json({ error: 'Failed to update time spent' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
