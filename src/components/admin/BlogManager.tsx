import React, { useEffect, useState } from 'react';
import { BlogPost, fetchAllPosts, formatDate } from '@/lib/blog';
import BlogEditor from './BlogEditor';
import { Loader2, Plus, Pencil, ExternalLink } from 'lucide-react';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState<BlogPost | null | undefined>(undefined); // undefined = list, null = new

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      setPosts(await fetchAllPosts());
    } catch (e: any) {
      setErr(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (editing !== undefined) {
    return (
      <BlogEditor
        initial={editing}
        onClose={() => setEditing(undefined)}
        onSaved={() => { setEditing(undefined); load(); }}
        onDeleted={() => { setEditing(undefined); load(); }}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-serif text-[#17414D] text-xl">Blog Manager</h2>
          <p className="text-[#2E2A25]/75 text-sm">{posts.length} posts</p>
        </div>
        <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 rounded-full bg-[#17414D] text-[#F2ECDD] px-5 py-2.5 text-sm hover:bg-[#112E36]">
          <Plus size={16} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#2E2A25]/75 py-10 justify-center">
          <Loader2 className="animate-spin" size={18} /> Loading posts…
        </div>
      ) : err ? (
        <p className="text-red-600">{err}</p>
      ) : posts.length === 0 ? (
        <p className="text-[#2E2A25]/75 py-10 text-center">No posts yet. Create your first journal entry.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-[#17414D]/15 bg-white p-3 pr-5">
              <div className="w-20 h-16 rounded-xl bg-[#F2ECDD] overflow-hidden shrink-0">
                {p.hero_image && <img src={p.hero_image} alt={p.title} className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-[#17414D] truncate">{p.title}</h3>
                  <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${p.published ? 'bg-[#5F6E39]/20 text-[#4c5730]' : 'bg-[#2E2A25]/10 text-[#2E2A25]/75'}`}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-[#2E2A25]/70 text-xs truncate">/blog/{p.slug} · {formatDate(p.publish_date)}</p>
              </div>
              {p.published && (
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-[#456C80] hover:text-[#17414D] p-2" aria-label="View post">
                  <ExternalLink size={16} />
                </a>
              )}
              <button onClick={() => setEditing(p)} className="inline-flex items-center gap-1.5 rounded-full border border-[#17414D]/25 px-4 py-2 text-sm text-[#17414D] hover:bg-[#17414D]/5">
                <Pencil size={14} /> Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
