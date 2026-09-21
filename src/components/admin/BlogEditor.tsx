import React, { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BlogPost, slugify, emptyPost } from '@/lib/blog';
import { Loader2, Save, ImagePlus, X, ArrowLeft, Trash2 } from 'lucide-react';

interface Props {
  initial?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
  onDeleted: () => void;
}

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('blog-images').upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
  return data.publicUrl;
}

const BlogEditor: React.FC<Props> = ({ initial, onClose, onSaved, onDeleted }) => {
  const [post, setPost] = useState<Partial<BlogPost>>(initial ?? emptyPost());
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingBody, setUploadingBody] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const set = (k: keyof BlogPost, v: any) => setPost((p) => ({ ...p, [k]: v }));

  const onTitle = (v: string) => {
    set('title', v);
    if (!slugTouched) set('slug', slugify(v));
  };

  const onHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadingHero(true);
    setErr('');
    try {
      set('hero_image', await uploadImage(f));
    } catch (e: any) {
      setErr('Image upload failed: ' + e.message);
    }
    setUploadingHero(false);
  };

  const onBodyImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadingBody(true);
    setErr('');
    try {
      const url = await uploadImage(f);
      const alt = window.prompt('Describe this image for SEO / alt text:', post.title || '') || '';
      const tag = `\n<img src="${url}" alt="${alt.replace(/"/g, '&quot;')}" />\n`;
      const el = bodyRef.current;
      const cur = post.body || '';
      if (el) {
        const start = el.selectionStart ?? cur.length;
        set('body', cur.slice(0, start) + tag + cur.slice(start));
      } else {
        set('body', cur + tag);
      }
    } catch (e: any) {
      setErr('Image upload failed: ' + e.message);
    }
    setUploadingBody(false);
    e.target.value = '';
  };

  const save = async (publishOverride?: boolean) => {
    setErr('');
    if (!post.title?.trim()) return setErr('Title is required.');
    if (!post.slug?.trim()) return setErr('Slug is required.');
    setSaving(true);
    const payload: any = {
      title: post.title?.trim(),
      slug: slugify(post.slug || ''),
      hero_image: post.hero_image || null,
      body: post.body || null,
      excerpt: post.excerpt || null,
      meta_title: post.meta_title || null,
      meta_description: post.meta_description || null,
      focus_keyword: post.focus_keyword || null,
      author: post.author || null,
      publish_date: post.publish_date || null,
      published: publishOverride !== undefined ? publishOverride : !!post.published,
      updated_at: new Date().toISOString(),
    };
    let error;
    if (initial?.id) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', initial.id));
    } else {
      ({ error } = await supabase.from('blog_posts').insert(payload));
    }
    setSaving(false);
    if (error) return setErr(error.message);
    onSaved();
  };

  const del = async () => {
    if (!initial?.id) return;
    if (!window.confirm('Delete this post permanently?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', initial.id);
    if (error) return setErr(error.message);
    onDeleted();
  };

  const input = 'w-full rounded-xl border border-[#17414D]/20 bg-white px-4 py-3 text-[#2E2A25] focus:outline-none focus:ring-2 focus:ring-[#456C80]/50';
  const label = 'block text-[#17414D] text-sm mb-2';

  return (
    <div className="max-w-3xl">
      <button onClick={onClose} className="inline-flex items-center gap-2 text-[#17414D] text-sm mb-5 hover:underline">
        <ArrowLeft size={16} /> Back to posts
      </button>

      <h2 className="font-serif text-[#17414D] text-xl mb-6">{initial ? 'Edit Post' : 'New Post'}</h2>

      <div className="space-y-5">
        <div>
          <label className={label}>Title</label>
          <input className={input} value={post.title || ''} onChange={(e) => onTitle(e.target.value)} placeholder="Whale season on the Garden Route" />
        </div>

        <div>
          <label className={label}>URL slug</label>
          <div className="flex items-center gap-2">
            <span className="text-[#2E2A25]/70 text-sm">/blog/</span>
            <input className={input} value={post.slug || ''} onChange={(e) => { setSlugTouched(true); set('slug', e.target.value); }} />
          </div>
        </div>

        <div>
          <label className={label}>Hero image</label>
          {post.hero_image ? (
            <div className="relative inline-block">
              <img src={post.hero_image} alt="Hero preview" className="rounded-xl max-h-48 border border-[#17414D]/15" />
              <button onClick={() => set('hero_image', '')} className="absolute -top-2 -right-2 bg-[#17414D] text-white rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#17414D]/30 px-5 py-3 cursor-pointer text-[#17414D] text-sm hover:bg-[#17414D]/5">
              {uploadingHero ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
              Upload hero image
              <input type="file" accept="image/*" className="hidden" onChange={onHero} />
            </label>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[#17414D] text-sm">Body (HTML supported)</label>
            <label className="inline-flex items-center gap-1.5 text-[#17414D] text-xs cursor-pointer hover:underline">
              {uploadingBody ? <Loader2 size={13} className="animate-spin" /> : <ImagePlus size={13} />}
              Insert image
              <input type="file" accept="image/*" className="hidden" onChange={onBodyImage} />
            </label>
          </div>
          <textarea
            ref={bodyRef}
            className={`${input} font-mono text-sm resize-y`}
            rows={12}
            value={post.body || ''}
            onChange={(e) => set('body', e.target.value)}
            placeholder="<p>Write your story here. Use &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt; and insert images above.</p>"
          />
        </div>

        <div>
          <label className={label}>Excerpt (short summary on cards)</label>
          <textarea className={`${input} resize-none`} rows={2} value={post.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={label}>Author</label>
            <input className={input} value={post.author || ''} onChange={(e) => set('author', e.target.value)} />
          </div>
          <div>
            <label className={label}>Publish date</label>
            <input type="date" className={input} value={post.publish_date || ''} onChange={(e) => set('publish_date', e.target.value)} />
          </div>
        </div>

        <div className="rounded-2xl bg-[#F2ECDD] p-5 space-y-4">
          <p className="text-[#17414D] text-sm font-medium uppercase tracking-[0.16em] text-[11px]">SEO</p>
          <div>
            <label className={label}>SEO meta title</label>
            <input className={input} value={post.meta_title || ''} onChange={(e) => set('meta_title', e.target.value)} placeholder="Defaults to the post title" />
          </div>
          <div>
            <label className={label}>SEO meta description</label>
            <textarea className={`${input} resize-none`} rows={2} value={post.meta_description || ''} onChange={(e) => set('meta_description', e.target.value)} />
          </div>
          <div>
            <label className={label}>Focus keyword</label>
            <input className={input} value={post.focus_keyword || ''} onChange={(e) => set('focus_keyword', e.target.value)} placeholder="e.g. whale watching Garden Route" />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={!!post.published} onChange={(e) => set('published', e.target.checked)} className="w-5 h-5 accent-[#17414D]" />
          <span className="text-[#2E2A25]/90 text-sm">Published (visible on the public blog)</span>
        </label>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button onClick={() => save()} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#17414D] text-[#F2ECDD] px-6 py-3 text-sm hover:bg-[#112E36] disabled:opacity-70">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
          </button>
          {!post.published && (
            <button onClick={() => save(true)} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#5F6E39] text-white px-6 py-3 text-sm hover:bg-[#626f3e] disabled:opacity-70">
              Save &amp; Publish
            </button>
          )}
          {initial && (
            <button onClick={del} className="inline-flex items-center gap-2 rounded-full border border-red-300 text-red-600 px-5 py-3 text-sm hover:bg-red-50 ml-auto">
              <Trash2 size={15} /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
