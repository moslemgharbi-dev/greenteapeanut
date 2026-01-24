import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { BrandHighlights } from '@/components/home/BrandHighlights';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutSection } from '@/components/home/AboutSection';
import { Newsletter } from '@/components/home/Newsletter';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <AboutSection />
        <Newsletter />
        <BrandHighlights />
      </main>
      <Footer />
    </div>
  );
}
