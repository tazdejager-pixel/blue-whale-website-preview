import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/admin/AdminLogin';
import EnquiriesInbox from '@/components/admin/EnquiriesInbox';
import NightsBridgePanel from '@/components/admin/NightsBridgePanel';
import BlogManager from '@/components/admin/BlogManager';
import { LOGO_CREAM } from '@/data/resort';
import { Inbox, CalendarRange, FileText, LogOut, Loader2 } from 'lucide-react';

type Tab = 'enquiries' | 'nightsbridge' | 'blog';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'enquiries', label: 'Enquiries', icon: <Inbox size={17} /> },
  { id: 'nightsbridge', label: 'NightsBridge', icon: <CalendarRange size={17} /> },
  { id: 'blog', label: 'Blog', icon: <FileText size={17} /> },
];

const Dashboard: React.FC = () => {
  const { userEmail, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('enquiries');

  return (
    <div className="min-h-screen bg-[#F2ECDD]">
      <header className="bg-[#112E36] text-[#F2ECDD]">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_CREAM} alt="Blue Whale Resort" className="w-28" />
            <span className="hidden sm:inline text-[#F2ECDD]/80 text-sm">Admin Portal</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[#F2ECDD]/85 text-sm">{userEmail}</span>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-[#F2ECDD]/10 hover:bg-[#F2ECDD]/20 px-4 py-2 text-sm">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 pt-6">
        <div className="flex gap-2 border-b border-[#17414D]/15">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id ? 'border-[#17414D] text-[#17414D]' : 'border-transparent text-[#2E2A25]/70 hover:text-[#17414D]'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === 'enquiries' && <EnquiriesInbox />}
          {tab === 'nightsbridge' && <NightsBridgePanel />}
          {tab === 'blog' && <BlogManager />}
        </div>
      </div>
    </div>
  );
};

const Gate: React.FC = () => {
  const { userEmail, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen bg-[#112E36] flex items-center justify-center text-[#F2ECDD]">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  return userEmail ? <Dashboard /> : <AdminLogin />;
};

const Admin: React.FC = () => (
  <AuthProvider>
    <Gate />
  </AuthProvider>
);

export default Admin;
