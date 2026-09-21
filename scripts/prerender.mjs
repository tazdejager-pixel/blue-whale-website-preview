/**
 * Render every public route to a real HTML file, and write the machine-readable
 * files that go with them.
 *
 * Runs after `vite build` and `vite build --ssr`. Produces:
 *   dist/index.html          the home page, fully rendered
 *   dist/venue/index.html    the venue page, fully rendered
 *   dist/404.html            the SPA fallback, so a deep link still boots
 *   dist/sitemap.xml
 *   dist/robots.txt
 *   dist/llms.txt            a plain-text brief for answer engines
 *
 * It fails loudly on purpose. A prerender that half-works is worse than one that
 * stops, because the site still looks perfect in a browser while every page quietly
 * serves the home page's title, description and schema.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const fail = (msg) => {
  console.error(`\nPrerender FAILED: ${msg}`);
  process.exit(1);
};

if (!fs.existsSync(ssrEntry)) fail(`no SSR bundle at ${ssrEntry}`);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  fail('dist/index.html is missing its injection markers');
}

const { render, PAGES, pageGraph, llmsTxt, SITE_URL } = await import(
  `file://${ssrEntry.replace(/\\/g, '/')}`
);

if (!Array.isArray(PAGES) || PAGES.length === 0) fail('the SSR bundle exported no PAGES');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const head = (page) => {
  const url = page.route === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.route}`;
  const graph = JSON.stringify(pageGraph(page)).replace(/</g, '\\u003c');
  return [
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Blue Whale Resort" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(page.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${esc(page.image)}" />`,
    `<script type="application/ld+json">${graph}</script>`,
  ].join('\n    ');
};

let shortest = Infinity;
for (const page of PAGES) {
  const html = render(page.route);
  if (!html || html.length < 2000) fail(`${page.route} rendered only ${html?.length ?? 0} characters`);
  shortest = Math.min(shortest, html.length);

  const out = template
    .replace('<title>Blue Whale Resort</title>', `<title>${esc(page.title)}</title>`)
    .replace('<!--app-head-->', head(page))
    .replace('<!--app-html-->', html);

  const dest = path.join(dist, page.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
  console.log(`  ${page.out.padEnd(20)} ${(out.length / 1024).toFixed(1)} KB`);
}

// The SPA fallback. A static host serves this for anything it has no file for, so
// /admin and a mistyped URL still boot the app. It must NOT be a copy of a
// prerendered page, or a 404 would serve the home page's markup and its canonical.
fs.writeFileSync(
  path.join(dist, '404.html'),
  template.replace('<!--app-head-->', '<meta name="robots" content="noindex" />').replace('<!--app-html-->', ''),
);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${PAGES.map(
    (p) =>
      `  <url>\n    <loc>${p.route === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.route}`}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p.priority}</priority>\n  </url>`,
  ).join('\n')}\n</urlset>\n`.replace('www.sitemap.org', 'www.sitemaps.org'),
);

// robots.txt names the answer engines explicitly. The default is already "allow
// everything", so this changes nothing technically - it is here so that a future
// session has to make a deliberate decision to remove one, rather than quietly
// blocking them with a wildcard aimed at something else.
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  [
    '# Blue Whale Resort',
    '#',
    '# The crawlers below are listed by name on purpose: this site is meant to be read',
    '# and quoted by answer engines as well as ranked by search engines.',
    '',
    ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'].map(
      (ua) => `User-agent: ${ua}\nAllow: /\n`,
    ),
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n'),
);

fs.writeFileSync(path.join(dist, 'llms.txt'), llmsTxt());

console.log(
  `\nPrerendered ${PAGES.length} routes (smallest ${(shortest / 1024).toFixed(1)} KB of HTML), ` +
    'plus sitemap.xml, robots.txt, llms.txt and a noindex 404.',
);
