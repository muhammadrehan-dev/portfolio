export default function PrivacyPolicy() {
  return (
    <div className="h-screen w-full flex items-center justify-center p-4 bg-black font-mono overflow-hidden">
      <div className="max-w-6xl w-full border border-white/20 p-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-white/5">
        <h1 className="text-2xl font-bold mb-4 uppercase tracking-widest border-b border-white/20 pb-2 text-center text-white">System Privacy Protocol</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300 text-xs leading-relaxed">
          <section>
            <h2 className="text-sm font-semibold mb-1 text-white border-b border-white/10 pb-1">1. Information Collected</h2>
            <p>
              We automatically collect telemetry from your device, including web browser type, IP address, timezone, and active cookies. We also track page navigation paths, referrers, and system interaction events.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-1 text-white border-b border-white/10 pb-1">2. Hardware Telemetry</h2>
            <p>
              When supported by your browser, battery status (level and charging state) and generic device information are monitored to optimize constraints and enhance viewing performance.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-1 text-white border-b border-white/10 pb-1">3. Usage of Data</h2>
            <p>
              Collected telemetry is utilized to screen for security risks, mitigate fraud (via IP tracking), and optimize the platform based on anonymous behavioral analytics.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold mb-1 text-white border-b border-white/10 pb-1">4. Cookies & Storage</h2>
            <p>
              Local session storage and essential cookies maintain connectivity. Non-essential tracking (telemetry) is only initialized upon explicit consent via the system cookie banner.
            </p>
          </section>

          <section className="lg:col-span-2">
            <h2 className="text-sm font-semibold mb-1 text-white border-b border-white/10 pb-1">5. Policy Modifications</h2>
            <p>
              This privacy protocol may undergo silent updates to reflect operational, legal, or regulatory shifts. Continued use of the system implies acceptance of the latest configuration.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
