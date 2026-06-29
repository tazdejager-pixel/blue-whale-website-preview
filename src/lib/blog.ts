import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  hero_image: string | null;
  body: string | null;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  author: string | null;
  publish_date: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export const emptyPost = (): Partial<BlogPost> => ({
  title: '',
  slug: '',
  hero_image: '',
  body: '',
  excerpt: '',
  meta_title: '',
  meta_description: '',
  focus_keyword: '',
  author: 'Blue Whale Resort',
  publish_date: new Date().toISOString().slice(0, 10),
  published: false,
});

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('publish_date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost) ?? null;
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export function formatDate(d?: string | null) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return d;
  }
}

// Lightweight per-page SEO: sets title + meta description + canonical
export function setSeo(opts: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  if (opts.title) document.title = opts.title;
  const setMeta = (name: string, content: string, prop = false) => {
    if (!content) return;
    const attr = prop ? 'property' : 'name';
    let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  if (opts.description) setMeta('description', opts.description);
  if (opts.title) setMeta('og:title', opts.title, true);
  if (opts.description) setMeta('og:description', opts.description, true);
  if (opts.image) setMeta('og:image', opts.image, true);
  if (opts.url) setMeta('og:url', opts.url, true);
}
