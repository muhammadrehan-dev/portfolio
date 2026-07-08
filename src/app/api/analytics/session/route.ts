import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, deviceInfo, level, charging } = await req.json();

    // Try to get IP from headers
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';
    let country = 'Unknown';
    let timezone = 'Unknown';

    // Best-effort geolocation using a free api
    if (ip && ip !== 'Unknown' && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const ipRes = await fetch(`http://ip-api.com/json/${ip.split(',')[0]}`, { cache: 'no-store' });
        const ipData = await ipRes.json();
        if (ipData.status === 'success') {
          country = ipData.country;
          timezone = ipData.timezone;
        }
      } catch (e) {
        // ignore fetch error
      }
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {}, // No need to set cookies here
        }
      }
    );

    const { error } = await supabase.from('visitor_sessions').insert({
      session_id: sessionId,
      ip_address: ip,
      country,
      timezone,
      device_info: deviceInfo,
      battery_level: level,
      battery_charging: charging
    });

    if (error) {
      console.error('Supabase session insert error:', error);
      return NextResponse.json({ error: 'Failed to record session' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
