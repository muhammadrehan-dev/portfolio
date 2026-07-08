import { createClient } from '@/lib/supabase/server';
import { VisitorTable } from './VisitorTable';

export default async function VisitorsPage() {
  const supabase = await createClient();

  // Fetch sessions and their nested page_views
  const { data: sessions } = await supabase
    .from('visitor_sessions')
    .select(`
      *,
      page_views (*)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-white/20 pb-2 inline-block">Visitor Logs</h2>
        <p className="text-sm text-gray-400 mt-2">Raw telemetry data from incoming connections.</p>
      </div>

      <VisitorTable initialSessions={sessions || []} />
    </div>
  );
}
