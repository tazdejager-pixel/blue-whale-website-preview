import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Save, ExternalLink, CheckCircle2 } from 'lucide-react';

const NightsBridgePanel: React.FC = () => {
  const [bbid, setBbid] = useState('');
  const [bookingUrl, setBookingUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_config').select('*');
      const map = Object.fromEntries((data ?? []).map((r: any) => [r.key, r.value]));
      setBbid(map.nightsbridge_bbid || '17193');
      setBookingUrl(map.booking_url || `https://book.nightsbridge.com/${map.nightsbridge_bbid || '17193'}`);
      setLoading(false);
    })();
  }, []);

  const onBbidChange = (v: string) => {
    setBbid(v);
    setBookingUrl(`https://book.nightsbridge.com/${v}`);
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    setErr('');
    const { error } = await supabase.from('site_config').upsert([
      { key: 'nightsbridge_bbid', value: bbid.trim(), updated_at: new Date().toISOString() },
      { key: 'booking_url', value: bookingUrl.trim(), updated_at: new Date().toISOString() },
    ]);
    setSaving(false);
    if (error) setErr(error.message);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const availabilityUrl = `https://www.nightsbridge.co.za/bridge/view?gridwidget=2&bbid=${bbid}`;

  const input = 'w-full rounded-xl border border-[#1E4E5C]/20 bg-white px-4 py-3 text-[#3A3A36] focus:outline-none focus:ring-2 focus:ring-[#6E93A6]/50 min-h-[48px]';

  if (loading)
    return (
      <div className="flex items-center gap-2 text-[#3A3A36]/60 py-10 justify-center">
        <Loader2 className="animate-spin" size={18} /> Loading config…
      </div>
    );

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-[#1E4E5C] text-xl mb-1">NightsBridge Booking Engine</h2>
      <p className="text-[#3A3A36]/60 text-sm mb-6">
        Update the property's NightsBridge ID without a developer. This is the single config point - every
        “Book Now” button and the availability grid use these values.
      </p>

      <div className="bg-white rounded-2xl border border-[#1E4E5C]/15 p-6 space-y-5">
        <div>
          <label className="block text-[#1E4E5C] text-sm mb-2">NightsBridge BBID</label>
          <input className={input} value={bbid} onChange={(e) => onBbidChange(e.target.value)} placeholder="17193" />
        </div>
        <div>
          <label className="block text-[#1E4E5C] text-sm mb-2">Booking URL</label>
          <input className={input} value={bookingUrl} onChange={(e) => { setBookingUrl(e.target.value); setSaved(false); }} />
        </div>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4E5C] text-[#F2ECDD] px-6 py-3 text-sm hover:bg-[#163842] disabled:opacity-70"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-[#8A9A5B] text-sm">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-[#1E4E5C]/15 bg-white px-5 py-4 hover:border-[#1E4E5C]/40">
          <span className="text-[#1E4E5C] text-sm font-medium">Open booking page</span>
          <ExternalLink size={16} className="text-[#6E93A6]" />
        </a>
        <a href={availabilityUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-[#1E4E5C]/15 bg-white px-5 py-4 hover:border-[#1E4E5C]/40">
          <span className="text-[#1E4E5C] text-sm font-medium">Open availability widget</span>
          <ExternalLink size={16} className="text-[#6E93A6]" />
        </a>
      </div>
    </div>
  );
};

export default NightsBridgePanel;
