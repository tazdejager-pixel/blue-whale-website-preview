import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')!

// Every public route is prerendered to real HTML (scripts/prerender.mjs), so the
// markup is already here and React only has to attach to it. createRoot would throw
// it all away and paint the page a second time. /admin is not prerendered, so the
// empty-root case still has to work.
if (root.firstElementChild) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}
