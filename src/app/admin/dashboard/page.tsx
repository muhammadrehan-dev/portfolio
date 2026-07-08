import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: totalSessions } = await supabase
    .from('visitor_sessions')
    .select('*', { count: 'exact', head: true });

  const { data: pageViews } = await supabase
    .from('page_views')
    .select('path, time_spent, session_id');

  const totalPageViews = pageViews?.length || 0;
  
  // Calculate average time spent
  const totalTimeSpent = pageViews?.reduce((acc, view) => acc + Number(view.time_spent || 0), 0) || 0;
  const avgTimeSpent = totalPageViews > 0 ? (totalTimeSpent / totalPageViews).toFixed(1) : 0;

  // Calculate bounce rate (sessions with only 1 page view)
  const sessionCounts = pageViews?.reduce((acc: Record<string, number>, view) => {
    acc[view.session_id] = (acc[view.session_id] || 0) + 1;
    return acc;
  }, {});
  
  let bounces = 0;
  if (sessionCounts) {
    Object.values(sessionCounts).forEach(count => {
      if (count === 1) bounces++;
    });
  }

  const bounceRate = totalSessions && totalSessions > 0 ? ((bounces / totalSessions) * 100).toFixed(1) : 0;

  // Top Pages
  const pageCounts = pageViews?.reduce((acc: Record<string, number>, view) => {
    acc[view.path] = (acc[view.path] || 0) + 1;
    return acc;
  }, {});
  
  const topPages = Object.entries(pageCounts || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-white/20 pb-2 inline-block">System Metrics</h2>
        <p className="text-sm text-gray-400 mt-2">Overview of network traffic and engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sessions" value={totalSessions?.toString() || '0'} />
        <StatCard title="Total Page Views" value={totalPageViews.toString()} />
        <StatCard title="Bounce Rate" value={`${bounceRate}%`} />
        <StatCard title="Avg Time/Page" value={`${avgTimeSpent}s`} />
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Top Vectors (Pages)</h3>
        <div className="border border-white/20">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 uppercase tracking-widest text-xs border-b border-white/20">
              <tr>
                <th className="p-4">Path</th>
                <th className="p-4 text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(([path, count]) => (
                <tr key={path} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-gray-300">{path}</td>
                  <td className="p-4 text-right font-mono text-white">{count}</td>
                </tr>
              ))}
              {topPages.length === 0 && (
                <tr>
                  <td colSpan={2} className="p-4 text-center text-gray-500 uppercase">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="border border-white/20 p-6 bg-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <div className="relative z-10">
        <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-2">{title}</h3>
        <p className="text-3xl font-bold font-mono tracking-tight">{value}</p>
      </div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 m-2" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 m-2" />
    </div>
  );
}
