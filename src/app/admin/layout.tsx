import Link from 'next/link';
import { logout } from './login/actions';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware also checks this, but we can do a secondary check
  // However, we don't want the layout to redirect on the login page itself.
  // So we only show the navigation if a user exists.

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {user && (
        <nav className="border-b border-white/20 p-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur z-50">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold uppercase tracking-widest border-r border-white/30 pr-6">SYS_ADMIN</h1>
            <div className="space-x-4 text-sm uppercase tracking-wide">
              <Link href="/admin/dashboard" className="hover:text-gray-400 transition-colors">Dashboard</Link>
              <Link href="/admin/visitors" className="hover:text-gray-400 transition-colors">Visitors</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 uppercase tracking-widest hidden sm:inline-block">Logged in: {user.email}</span>
            <form action={logout}>
              <button className="text-xs border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                Terminate
              </button>
            </form>
          </div>
        </nav>
      )}
      <main className="p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
