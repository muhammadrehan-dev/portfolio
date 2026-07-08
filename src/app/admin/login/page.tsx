import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params?.error as string | undefined

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono selection:bg-white selection:text-black">
      <div className="w-full max-w-md p-8 border border-white/20 bg-black shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-widest border-b border-white pb-2">
            SYS_ADMIN
          </h1>
          <p className="text-sm text-gray-400 mt-2 uppercase tracking-wide">
            Authenticate to access terminal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-red-500 text-red-500 text-sm uppercase bg-red-500/10">
            [ERROR] {error}
          </div>
        )}

        <form action={login} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              [Email_Address]
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border border-white/30 px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all rounded-none placeholder:text-gray-700"
              placeholder="admin@system.local"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-400">
              [Security_Key]
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-transparent border border-white/30 px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all rounded-none placeholder:text-gray-700"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all active:scale-[0.98]"
          >
            Initialize Session
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-white/10 text-xs text-gray-600 text-center uppercase tracking-widest">
          Secure connection established
        </div>
      </div>
    </div>
  )
}
