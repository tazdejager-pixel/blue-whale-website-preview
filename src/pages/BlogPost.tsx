import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogPost as Post, fetchPostBySlug, formatDate, setSeo } from '@/lib/blog';
import { RESORT, LOGO_CREAM } from '@/data/resort';
import { Loader2 } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchPostBySlug(slug)
      .then((p) => {
        setPost(p);
        if (p)
          setSeo({
            title: `${p.meta_title || p.title} · ${RESORT.name}`,
            description: p.meta_description || p.excerpt || '',
            image: p.hero_image || undefined,
            url: `/blog/${p.slug}`,
          });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36]">
      <header className="bg-[#163842] text-[#F2ECDD] py-5">
        <div className="max-w-3xl mx-auto px-5 flex items-center justify-between">
          <a href="/"><img src={LOGO_CREAM} alt="Blue Whale Resort" className="w-32" /></a>
          <a href="/blog" className="text-[#F2ECDD]/80 hover:text-white text-sm">← Journal</a>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center gap-2 text-[#3A3A36]/60 py-20 justify-center"><Loader2 className="animate-spin" size={18} /> Loading…</div>
      ) : !post ? (
        <div className="max-w-3xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif text-[#1E4E5C] text-2xl mb-3">Post not found</h1>
          <a href="/blog" className="text-[#1E4E5C] underline">Back to the Journal</a>
        </div>
      ) : (
        <article className="max-w-3xl mx-auto px-5 py-12">
          <p className="text-[#6E93A6] text-sm mb-3">{formatDate(post.publish_date)}{post.author ? ` · ${post.author}` : ''}</p>
          <h1 className="font-serif text-[#1E4E5C] text-3xl sm:text-4xl leading-tight mb-6">{post.title}</h1>
          {post.hero_image && (
            <img src={post.hero_image} alt={post.title} className="w-full rounded-2xl mb-8" />
          )}
          {post.excerpt && <p className="text-lg text-[#3A3A36]/75 italic mb-8">{post.excerpt}</p>}
          <div
            className="blog-body max-w-none leading-relaxed text-[#3A3A36]/90 [&_h2]:font-serif [&_h2]:text-[#1E4E5C] [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_img]:rounded-xl [&_img]:my-6 [&_a]:text-[#1E4E5C] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.body || '' }}
          />
        </article>
      )}

      <footer className="bg-[#163842] text-[#F2ECDD]/70 py-8 text-center text-sm">
        © {new Date().getFullYear()} {RESORT.name} · <a href="/blog" className="underline">Journal</a> · <a href="/" className="underline">Home</a>
      </footer>
    </div>
  );
};

export default BlogPost;
