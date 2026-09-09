import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { NIGHTSBRIDGE_BBID } from '@/data/resort';
import { Loader2, CheckCircle2, Circle, ExternalLink, RefreshCw, Mail, Phone } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  preferred_dates: string | null;
  guests: string | null;
  interest: string | null;
  message: string | null;
  handled: boolean | null;
  created_at: string | null;
}

const EnquiriesInbox: React.FC = () => {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setRows((data ?? []) as Enquiry[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleHandled = async (row: Enquiry) => {
    const next = !row.handled;
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, handled: next } : x)));
    const { error } = await supabase.from('enquiries').update({ handled: next }).eq('id', row.id);
    if (error) {
      setRows((r) => r.map((x) => (x.id === row.id ? { ...x, handled: !next } : x)));
    }
  };

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ' - ';

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-serif text-[#1E4E5C] text-xl">Enquiries &amp; Bookings Inbox</h2>
          <p className="text-[#3A3A36]/60 text-sm">{rows.length} total · newest first</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-[#1E4E5C]/25 px-4 py-2 text-sm text-[#1E4E5C] hover:bg-[#1E4E5C]/5">
            <RefreshCw size={15} /> Refresh
          </button>
          <a
            href={`https://www.nightsbridge.com/cgi-bin/bridge.cgi`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4E5C] text-[#F2ECDD] px-4 py-2 text-sm hover:bg-[#163842]"
          >
            <ExternalLink size={15} /> NightsBridge Dashboard
          </a>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#3A3A36]/60 py-10 justify-center">
          <Loader2 className="animate-spin" size={18} /> Loading enquiries…
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-[#3A3A36]/60 py-10 text-center">No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#1E4E5C]/15 bg-white">
          <table className="w-full text-sm min-w-[860px]">
            <thead>
              <tr className="text-left text-[#1E4E5C] bg-[#F2ECDD]/60 border-b border-[#1E4E5C]/10">
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium">Guest</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Dates / Guests</th>
                <th className="px-4 py-3 font-medium">Interest</th>
                <th className="px-4 py-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={`border-b border-[#1E4E5C]/8 align-top ${r.handled ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleHandled(r)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${r.handled ? 'bg-[#8A9A5B]/15 text-[#5e6b3d]' : 'bg-[#1E4E5C]/10 text-[#1E4E5C]'}`}
                    >
                      {r.handled ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                      {r.handled ? 'Handled' : 'Mark done'}
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[#3A3A36]/70">{fmt(r.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-[#1E4E5C] whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 text-[#1E4E5C] hover:underline">
                      <Mail size={13} /> {r.email}
                    </a>
                    {r.phone && (
                      <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 text-[#3A3A36]/70 hover:underline mt-1">
                        <Phone size={13} /> {r.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#3A3A36]/80 whitespace-nowrap">
                    {r.preferred_dates || ' - '}<br />
                    <span className="text-[#3A3A36]/55">{r.guests || ''}</span>
                  </td>
                  <td className="px-4 py-3 text-[#3A3A36]/80 capitalize">{r.interest?.replace(/-/g, ' ') || ' - '}</td>
                  <td className="px-4 py-3 text-[#3A3A36]/75 max-w-[280px]">{r.message || ' - '}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquiriesInbox;
