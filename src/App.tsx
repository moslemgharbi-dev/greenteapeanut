import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
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
import { PerfumeAssistantWidget } from "@/components/perfumist/PerfumeAssistantWidget";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  
  return (
    <BrowserRouter>
      <PerfumeAssistantWidget />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/maison" element={<Maison />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgv" element={<Cgv />} />
        <Route path="/cgu" element={<Cgu />} />
        <Route path="/confidentialite-cookies" element={<ConfidentialiteCookies />} />
        <Route path="/parametres-cookies" element={<ParametresCookies />} />
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
