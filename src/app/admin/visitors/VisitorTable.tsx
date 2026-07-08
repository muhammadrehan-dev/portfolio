'use client';

import React, { useState } from 'react';

export function VisitorTable({ initialSessions }: { initialSessions: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto border border-white/20">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-white/5 uppercase tracking-widest text-xs border-b border-white/20">
          <tr>
            <th className="p-4">Timestamp</th>
            <th className="p-4">IP Address</th>
            <th className="p-4">Location</th>
            <th className="p-4">Device Info</th>
            <th className="p-4">Power</th>
          </tr>
        </thead>
        <tbody>
          {initialSessions.map((session) => (
            <React.Fragment key={session.id}>
              <tr 
                onClick={() => toggleRow(session.id)}
                className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <td className="p-4 font-mono text-gray-400 flex items-center gap-2">
                  <span className={`transition-transform ${expandedId === session.id ? 'rotate-90' : ''}`}>▶</span>
                  {new Date(session.created_at).toLocaleString()}
                </td>
                <td className="p-4 font-mono text-white">{session.ip_address}</td>
                <td className="p-4 text-gray-300">
                  {session.country !== 'Unknown' ? `${session.country} (${session.timezone})` : 'Unknown'}
                </td>
                <td className="p-4 text-gray-400 max-w-[200px] truncate" title={session.device_info}>
                  {session.device_info}
                </td>
                <td className="p-4 font-mono text-gray-300">
                  {session.battery_level !== null 
                    ? `${(session.battery_level * 100).toFixed(0)}% [${session.battery_charging ? 'AC' : 'BATT'}]`
                    : 'N/A'}
                </td>
              </tr>
              
              {/* Expandable details row */}
              {expandedId === session.id && (
                <tr className="bg-black border-b border-white/10 shadow-inner">
                  <td colSpan={5} className="p-0">
                    <div className="p-6 border-l-4 border-white/50 m-4 bg-white/5 space-y-6">
                      
                      {/* Device Info Expanded */}
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 border-b border-white/10 pb-2">Full Device Signature</h4>
                        <div className="bg-black/50 p-3 font-mono text-xs text-white break-all border border-white/10">
                          {session.device_info || 'Unknown Device'}
                        </div>
                      </div>

                      {/* Navigation Log */}
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4 border-b border-white/10 pb-2">Session Navigation Log</h4>
                        
                        {session.page_views && session.page_views.length > 0 ? (
                          <table className="w-full text-left text-xs mt-2">
                            <thead className="text-gray-500 uppercase tracking-widest border-b border-white/10">
                              <tr>
                                <th className="pb-2">Time</th>
                                <th className="pb-2">Path</th>
                                <th className="pb-2 text-right">Time Spent (s)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {session.page_views.map((pv: any) => (
                                <tr key={pv.id} className="border-b border-white/5">
                                  <td className="py-3 font-mono text-gray-400">{new Date(pv.created_at).toLocaleTimeString()}</td>
                                  <td className="py-3 font-mono text-white">{pv.path}</td>
                                  <td className="py-3 font-mono text-gray-400 text-right">{pv.time_spent}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="text-gray-500 font-mono text-xs py-2">NO_PAGE_VIEWS_LOGGED</div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {(!initialSessions || initialSessions.length === 0) && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500 uppercase tracking-widest">
                No telemetry available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
