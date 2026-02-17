import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { useEffect } from "react";
import { toast } from "sonner";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Brand from "./pages/Brand";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Maison from "./pages/Maison";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Faq from "./pages/Faq";
import MentionsLegales from "./pages/MentionsLegales";
import Cgv from "./pages/Cgv";
import Cgu from "./pages/Cgu";
import ConfidentialiteCookies from "./pages/ConfidentialiteCookies";
import ParametresCookies from "./pages/ParametresCookies";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import { PerfumeAssistantWidget } from "@/components/perfumist/PerfumeAssistantWidget";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

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
        sessionStorage.removeItem('session-only');
      }
    });
    return () => subscription.unsubscribe();
  }, [loadFavorites, setAuthenticated]);

  // Sign out on browser/tab close if "Rester connecté" was not checked
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionStorage.getItem('session-only') === 'true') {
        supabase.auth.signOut();
        sessionStorage.removeItem('session-only');
      }
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
      <PerfumeAssistantWidget />
      <WhatsAppButton />
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
