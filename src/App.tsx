import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useEffect, lazy, Suspense } from "react";
import { toast } from "sonner";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

// Lazy-load all non-critical routes to reduce initial JS bundle
const Shop = lazy(() => import("./pages/Shop"));
const Brand = lazy(() => import("./pages/Brand"));
const Collection = lazy(() => import("./pages/Collection"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Maison = lazy(() => import("./pages/Maison"));
const Contact = lazy(() => import("./pages/Contact"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Faq = lazy(() => import("./pages/Faq"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Cgv = lazy(() => import("./pages/Cgv"));
const Cgu = lazy(() => import("./pages/Cgu"));
const ConfidentialiteCookies = lazy(() => import("./pages/ConfidentialiteCookies"));
const ParametresCookies = lazy(() => import("./pages/ParametresCookies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Profile = lazy(() => import("./pages/Profile"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Lazy-load non-critical widgets
const PerfumeAssistantWidget = lazy(() =>
  import("@/components/perfumist/PerfumeAssistantWidget").then(m => ({ default: m.PerfumeAssistantWidget }))
);
const WhatsAppButton = lazy(() =>
  import("@/components/layout/WhatsAppButton").then(m => ({ default: m.WhatsAppButton }))
);

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();

  const loadFavorites = useFavoritesStore(state => state.loadFavorites);
  const setAuthenticated = useFavoritesStore(state => state.setAuthenticated);

  useEffect(() => {
    loadFavorites();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        loadFavorites();
      } else if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
      }
      }
    });
    return () => subscription.unsubscribe();
  }, [loadFavorites, setAuthenticated]);

  // Always sign out on browser/tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear Supabase auth tokens from localStorage to end session
      const keys = Object.keys(localStorage).filter(k => k.startsWith('sb-'));
      keys.forEach(k => localStorage.removeItem(k));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const dismiss = () => toast.dismiss();
    document.addEventListener('touchstart', dismiss);
    document.addEventListener('click', dismiss);
    return () => {
      document.removeEventListener('touchstart', dismiss);
      document.removeEventListener('click', dismiss);
    };
  }, []);
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <PerfumeAssistantWidget />
        <WhatsAppButton />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/marque/:name" element={<Brand />} />
          <Route path="/collection/:handle" element={<Collection />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/maison" element={<Maison />} />
          <Route path="/about" element={<Maison />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<Cgv />} />
          <Route path="/cgu" element={<Cgu />} />
          <Route path="/confidentialite-cookies" element={<ConfidentialiteCookies />} />
          <Route path="/parametres-cookies" element={<ParametresCookies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;