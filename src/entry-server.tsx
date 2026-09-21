import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

// Re-exported so scripts/prerender.mjs reads the REAL page table and the REAL schema
// out of the bundle, rather than parsing the TypeScript source and hoping.
export { PAGES, pageGraph, llmsTxt, SITE_URL } from './seo/pages';

/**
 * Render one route to HTML at build time.
 *
 * This exists because of a fact about how the site is read. Google renders JavaScript
 * and would eventually see this SPA, but GPTBot, OAI-SearchBot, PerplexityBot and
 * ClaudeBot parse raw HTML only. Before this, the HTML served for every URL here was
 * an empty <div id="root">, so every one of them saw a blank page: no chalets, no
 * venue, no contact details, nothing to quote or recommend.
 *
 * `scripts/prerender.mjs` calls this once per route and writes the result to disk, so
 * the first byte of the response already contains the whole page.
 */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App staticRouter />
    </StaticRouter>,
  );
}
