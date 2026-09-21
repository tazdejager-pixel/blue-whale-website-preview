import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import VenuePage from "./pages/VenuePage";

const queryClient = new QueryClient();

/**
 * The two toast containers mount only after the first client render.
 *
 * Both of them emit real markup at rest - a viewport <ol> and a <section> - and
 * neither is in the prerendered HTML, so rendering them on the client's first pass
 * made the trees differ. React threw #418 and #423, gave up on hydrating, and
 * re-rendered the whole page from scratch: the server HTML was still correct for a
 * crawler, but every visitor paid for the render twice. Holding them back for one
 * tick makes the first client render identical to the server's.
 *
 * Nothing can raise a toast before the page is interactive anyway.
 */
const AfterHydration = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <>{children}</> : null;
};

/**
 * `staticRouter` is set by src/entry-server.tsx during the build: the prerender wraps
 * App in a StaticRouter of its own, so App must not open a BrowserRouter inside it.
 */
const App = ({ staticRouter = false }: { staticRouter?: boolean }) => {
  const routes = (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/venue" element={<VenuePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AfterHydration>
            <Toaster />
            <Sonner />
          </AfterHydration>
          {staticRouter ? (
            routes
          ) : (
            <BrowserRouter basename={import.meta.env.BASE_URL}>{routes}</BrowserRouter>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
