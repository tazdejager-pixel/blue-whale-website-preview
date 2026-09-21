import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RESORT, INTERESTS } from '@/data/resort';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  marketingOptIn: boolean;
  dates: string;
  guests: string;
  interest: string;
  message: string;
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  marketingOptIn: true,
  dates: '',
  guests: '',
  interest: '',
  message: '',
};

const inputClass =
  'w-full rounded-xl border border-[#17414D]/20 bg-white px-4 py-3 text-[#2E2A25] placeholder-[#2E2A25]/40 focus:outline-none focus:ring-2 focus:ring-[#456C80]/50 transition min-h-[48px]';

const Enquiry: React.FC = () => {
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
    if (form.dates.trim() && !/^\d{2}\/\d{2}\/\d{4}/.test(form.dates.trim()))
      e.dates = 'Use the format DD/MM/YYYY.';
    if (!form.message.trim()) e.message = 'Please tell us a little about your stay.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setStatus('loading');

    try {
      // No database connected in this preview build: the submit succeeds for the
      // demo but is not stored. When a real Supabase is connected, this insert
      // persists the enquiry (and an email/CRM step can be re-added then).
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        marketing_opt_in: form.marketingOptIn,
        preferred_dates: form.dates.trim() || null,
        guests: form.guests.trim() || null,
        interest: form.interest || null,
        message: form.message.trim(),
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

  return (
    <section id="enquiry" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="block text-[#456C80] tracking-[0.24em] uppercase text-[11px] mb-2">
            Get In Touch
          </span>
          <p className="font-script text-[#5F6E39] text-4xl sm:text-5xl leading-none mb-2">Reach Out</p>
          <h2 className="font-serif text-[#17414D] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-4">
            Make An Enquiry
          </h2>
          <p className="text-[#2E2A25]/85 leading-relaxed">
            Not quite ready to book? Tell us about your dream coastal escape and we'll be in touch.
            Prefer to chat? Call us on{' '}
            <a href={`tel:${RESORT.phone.replace(/\s/g, '')}`} className="underline text-[#17414D] hover:text-[#5F6E39]">
              {RESORT.phone}
            </a>
            .
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-[#F2ECDD] rounded-[2rem] p-10 text-center">
            <CheckCircle2 className="text-[#5F6E39] mx-auto mb-4" size={48} strokeWidth={1.5} />
            <h3 className="font-serif text-[#17414D] text-2xl mb-3">Thank you</h3>
            <p className="text-[#2E2A25]/85 mb-6">
              Your enquiry has been received. Our team will be in touch shortly to help plan your stay.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-[#17414D] underline text-sm tracking-wide"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#F2ECDD] rounded-[2rem] p-7 sm:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#17414D] text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-[#17414D] text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1.5">{errors.email}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#17414D] text-sm mb-2">Phone number (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                  placeholder="+27 ..."
                />
              </div>
              <div>
                <label className="block text-[#17414D] text-sm mb-2">Preferred dates (optional)</label>
                <input
                  type="text"
                  value={form.dates}
                  onChange={(e) => update('dates', e.target.value)}
                  className={inputClass}
                  placeholder="DD/MM/YYYY"
                />
                {errors.dates && <p className="text-red-600 text-xs mt-1.5">{errors.dates}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#17414D] text-sm mb-2">Number of guests (optional)</label>
                <input
                  type="text"
                  value={form.guests}
                  onChange={(e) => update('guests', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 4 guests"
                />
              </div>
              <div>
                <label className="block text-[#17414D] text-sm mb-2">I'm interested in (optional)</label>
                <select
                  value={form.interest}
                  onChange={(e) => update('interest', e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Select an option</option>
                  {INTERESTS.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* The resort asked for this box to come off (04/09/2026). It stays, with
                new wording, because it is the only lawful basis for emailing an
                enquirer later - POPIA s69 needs their consent, and an enquiry on its
                own is not consent to market to them. The old wording asked for SMS
                only, in American ("Msg & data rates may apply. Reply STOP"), so it
                permitted nothing we would actually send. */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.marketingOptIn}
                onChange={(e) => update('marketingOptIn', e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-[#17414D]/30 accent-[#17414D] shrink-0"
              />
              <span className="text-[#2E2A25]/85 text-xs leading-relaxed">
                Keep me posted. Send me the occasional email about specials, events and news
                from Blue Whale Resort. You can unsubscribe at any time, and we never pass
                your details to anyone else.
              </span>
            </label>

            <div>
              <label className="block text-[#17414D] text-sm mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your stay - number of guests, the occasion, any questions..."
              />
              {errors.message && <p className="text-red-600 text-xs mt-1.5">{errors.message}</p>}
            </div>

            {status === 'error' && serverError && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle size={18} /> {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.22em] uppercase bg-[#17414D] text-[#F2ECDD] hover:bg-[#112E36] transition-all min-h-[48px] disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Enquiry;
