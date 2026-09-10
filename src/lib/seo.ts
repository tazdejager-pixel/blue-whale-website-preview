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
