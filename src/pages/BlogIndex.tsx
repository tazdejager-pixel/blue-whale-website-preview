import React, { useEffect, useState } from 'react';
import { BlogPost, fetchPublishedPosts, formatDate, setSeo } from '@/lib/blog';
import { RESORT, LOGO_CREAM } from '@/data/resort';
import { Loader2 } from 'lucide-react';

const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSeo({ title: `Journal · ${RESORT.name}`, description: 'Stories, guides and news from Blue Whale Resort on the Garden Route — whale season, coastal walks and life at the edge of the ocean.', url: '/blog' });
    fetchPublishedPosts().then(setPosts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36]">
      <header className="bg-[#163842] text-[#F2ECDD] py-5">
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
          <a href="/"><img src={LOGO_CREAM} alt="Blue Whale Resort" className="w-32" /></a>
          <a href="/" className="text-[#F2ECDD]/80 hover:text-white text-sm">← Back to resort</a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 py-14">
        <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">The Blue Whale</span>
        <h1 className="font-serif text-[#1E4E5C] text-3xl sm:text-4xl uppercase tracking-[0.04em] mb-3">Journal</h1>
        <p className="text-[#3A3A36]/70 max-w-xl mb-10">Stories from the edge of the ocean — whale season, coastal walks, and life on the Garden Route.</p>

        {loading ? (
          <div className="flex items-center gap-2 text-[#3A3A36]/60 py-10"><Loader2 className="animate-spin" size={18} /> Loading…</div>
        ) : posts.length === 0 ? (
          <p className="text-[#3A3A36]/60 py-10">No journal entries yet — check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((p) => (
              <a key={p.id} href={`/blog/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#1E4E5C]/10 hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-[#F2ECDD] overflow-hidden">
                  {p.hero_image && <img src={p.hero_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>
                <div className="p-5">
                  <p className="text-[#6E93A6] text-xs mb-2">{formatDate(p.publish_date)}</p>
                  <h2 className="font-serif text-[#1E4E5C] text-lg leading-snug mb-2">{p.title}</h2>
                  <p className="text-[#3A3A36]/65 text-sm line-clamp-3">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-[#163842] text-[#F2ECDD]/70 py-8 text-center text-sm">
        © {new Date().getFullYear()} {RESORT.name} · <a href="/" className="underline">Home</a>
      </footer>
    </div>
  );
};

export default BlogIndex;
