import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LOGO_BLUE } from '@/data/resort';
import { Loader2, LogIn } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setInfo('');
    if (!email.trim() || !password) {
      setErr('Enter your email and password.');
      return;
    }
    setBusy(true);
    const fn = mode === 'in' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setBusy(false);
    if (error) {
      setErr(error);
    } else if (mode === 'up') {
      setInfo('Account created. You can now sign in.');
      setMode('in');
    }
  };

  const input =
    'w-full rounded-xl border border-[#17414D]/20 bg-white px-4 py-3 text-[#2E2A25] focus:outline-none focus:ring-2 focus:ring-[#456C80]/50 min-h-[48px]';

  return (
    <div className="min-h-screen bg-[#112E36] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-[#F2ECDD] rounded-[2rem] p-8 sm:p-10">
        <div className="text-center mb-7">
          <img src={LOGO_BLUE} alt="Blue Whale Resort" className="w-32 mx-auto mb-4" />
          <h1 className="font-serif text-[#17414D] text-2xl uppercase tracking-[0.04em]">
            Resort Admin
          </h1>
          <p className="text-[#2E2A25]/75 text-sm mt-1">
            {mode === 'in' ? 'Sign in to manage the site' : 'Create an admin account'}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-[#17414D] text-sm mb-2">Email</label>
            <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@bluewhale.co.za" />
          </div>
          <div>
            <label className="block text-[#17414D] text-sm mb-2">Password</label>
            <input className={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {err && <p className="text-red-600 text-sm">{err}</p>}
          {info && <p className="text-[#5F6E39] text-sm">{info}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium tracking-[0.22em] uppercase bg-[#17414D] text-[#F2ECDD] hover:bg-[#112E36] transition-all min-h-[48px] disabled:opacity-70"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {mode === 'in' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setErr(''); setInfo(''); }}
          className="w-full text-center text-[#17414D] underline text-sm mt-5"
        >
          {mode === 'in' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>

        <a href="/" className="block text-center text-[#2E2A25]/70 text-xs mt-6 hover:text-[#17414D]">
          ← Back to website
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
