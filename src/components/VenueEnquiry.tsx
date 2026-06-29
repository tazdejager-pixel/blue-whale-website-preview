import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { EVENT_TYPES } from '@/data/resort';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  smsOptIn: boolean;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  smsOptIn: true,
  eventType: '',
  date: '',
  guests: '',
  message: '',
};

const inputClass =
  'w-full rounded-xl border border-[#F2ECDD]/30 bg-[#F2ECDD]/10 px-4 py-3 text-[#F2ECDD] placeholder-[#F2ECDD]/50 focus:outline-none focus:ring-2 focus:ring-[#F2ECDD]/50 transition min-h-[48px]';

const VenueEnquiry: React.FC = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const update = (k: keyof FormState, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.eventType) e.eventType = 'Please choose an event type.';
    if (form.date.trim() && !/^\d{2}\/\d{2}\/\d{4}/.test(form.date.trim()))
      e.date = 'Use the format DD/MM/YYYY.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setStatus('loading');

    try {
      // No database connected in this preview build: submit succeeds for the demo
      // but is not stored. Re-connecting a real Supabase makes this persist.
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        sms_opt_in: form.smsOptIn,
        preferred_dates: form.date.trim() || null,
        guests: form.guests.trim() || null,
        interest: 'venue',
        event_type: form.eventType,
        message: form.message.trim() || null,
      });

      if (error) throw error;

      setStatus('success');
      setForm(empty);
    } catch (err) {
      console.error(err);
      setServerError('Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#0e2b33]/80 backdrop-blur-md border border-[#F2ECDD]/15 rounded-[2rem] p-10 text-center shadow-xl">
        <CheckCircle2 className="text-[#F2ECDD] mx-auto mb-4" size={48} strokeWidth={1.5} />
        <h3 className="font-serif text-[#F2ECDD] text-2xl mb-3">Thank you</h3>
        <p className="text-[#F2ECDD]/80 mb-6">
          We've received your event enquiry and will be in touch soon to help you celebrate by the ocean.
        </p>
        <button onClick={() => setStatus('idle')} className="text-[#F2ECDD] underline text-sm tracking-wide">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0e2b33]/80 backdrop-blur-md border border-[#F2ECDD]/15 rounded-[2rem] p-7 sm:p-9 space-y-5 text-left shadow-xl"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Name</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} placeholder="Your full name" />
          {errors.name && <p className="text-red-300 text-xs mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Email</label>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="you@example.com" />
          {errors.email && <p className="text-red-300 text-xs mt-1.5">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Phone number (optional)</label>
          <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+27 ..." />
        </div>
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Event type</label>
          <select
            value={form.eventType}
            onChange={(e) => update('eventType', e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="" className="text-[#1E4E5C]">Select an event type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t} className="text-[#1E4E5C]">{t}</option>
            ))}
          </select>
          {errors.eventType && <p className="text-red-300 text-xs mt-1.5">{errors.eventType}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Rough date (optional)</label>
          <input type="text" value={form.date} onChange={(e) => update('date', e.target.value)} className={inputClass} placeholder="DD/MM/YYYY" />
          {errors.date && <p className="text-red-300 text-xs mt-1.5">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-[#F2ECDD] text-sm mb-2">Guest numbers (optional)</label>
          <input type="text" value={form.guests} onChange={(e) => update('guests', e.target.value)} className={inputClass} placeholder="e.g. 80 guests" />
        </div>
      </div>

      <div>
        <label className="block text-[#F2ECDD] text-sm mb-2">Message (optional)</label>
        <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Tell us a little about your celebration..." />
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input type="checkbox" checked={form.smsOptIn} onChange={(e) => update('smsOptIn', e.target.checked)} className="mt-1 w-5 h-5 rounded accent-[#8A9A5B] shrink-0" />
        <span className="text-[#F2ECDD]/75 text-xs leading-relaxed">
          Text me updates about my event enquiry. Msg &amp; data rates may apply. Reply STOP to unsubscribe.
        </span>
      </label>

      {status === 'error' && serverError && (
        <div className="flex items-center gap-2 text-red-300 text-sm">
          <AlertCircle size={18} /> {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.22em] uppercase bg-[#F2ECDD] text-[#1E4E5C] hover:bg-white transition-all min-h-[48px] disabled:opacity-70"
      >
        {status === 'loading' ? (
          <><Loader2 size={18} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={18} /> Enquire About Your Event</>
        )}
      </button>
    </form>
  );
};

export default VenueEnquiry;
