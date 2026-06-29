/* eslint-disable @typescript-eslint/no-explicit-any */
//
// DATABASE INTENTIONALLY NOT CONNECTED (preview / presentation build).
// --------------------------------------------------------------------
// The Famous database has been unlinked. The site runs fully standalone:
//  - Hero, About, Accommodation, Venue, Why Choose Us, Footer  -> static, no backend
//  - "Book Now" + live Availability grid                       -> NightsBridge (external), works
//  - Enquiry forms                                             -> submit succeeds (not stored anywhere)
//  - Blog (/blog)                                              -> shows empty state
//  - Admin (/admin)                                            -> sign-in disabled
//
// TO CONNECT A REAL DATABASE LATER (client's own Supabase, or LAUNCHT-run):
//   import { createClient } from '@supabase/supabase-js';
//   export const supabase = createClient(
//     import.meta.env.VITE_SUPABASE_URL,
//     import.meta.env.VITE_SUPABASE_ANON_KEY,
//   );
// then recreate tables (enquiries, blog_posts, site_config), the `blog-images`
// storage bucket, RLS and auth. Nothing else in the app needs to change.

type Result = { data: unknown; error: unknown };

// A chainable, awaitable no-op query builder mimicking the supabase-js fluent API.
function makeQuery(): any {
  const handler: ProxyHandler<() => void> = {
    get(_t, prop) {
      if (prop === 'then') {
        return (onFulfilled: (r: Result) => unknown) =>
          onFulfilled({ data: [], error: null });
      }
      if (prop === 'maybeSingle' || prop === 'single') {
        return () => Promise.resolve({ data: null, error: null });
      }
      if (typeof prop === 'symbol') return undefined;
      // select / insert / update / upsert / delete / eq / order / match / limit / ...
      return () => proxy;
    },
    apply() {
      return proxy;
    },
  };
  const proxy: any = new Proxy(function () {}, handler);
  return proxy;
}

export const supabase = {
  from: () => makeQuery(),
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe() {} } },
    }),
    signInWithPassword: async () => ({
      data: { session: null, user: null },
      error: { message: 'Admin sign-in is disabled in this preview (no database connected).' },
    }),
    signUp: async () => ({
      data: { session: null, user: null },
      error: { message: 'Account creation is disabled in this preview (no database connected).' },
    }),
    signOut: async () => ({ error: null }),
  },
  storage: {
    from: () => ({
      upload: async () => ({
        data: null,
        error: { message: 'Image upload is disabled in this preview (no database connected).' },
      }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
} as any;
