import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBanner}
        alt="Flacons de parfum luxueux sur marbre"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 text-center px-4 py-20">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/70 mb-6 animate-fade-in">
          Wael Ben Yaghlane
        </span>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 animate-fade-in text-white" style={{ animationDelay: '0.1s' }}>
          Là où chaque fragrance
          <br />
          <span className="italic">raconte une histoire</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-white/80 text-lg mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Découvrez notre collection exclusive de parfums d'exception, 
          créés pour les amateurs de fragrances raffinées.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild size="lg" className="min-w-[200px]">
            <Link to="/shop">
              Découvrir la collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[200px] border-white/30 text-white hover:bg-white/10">
            <Link to="/about">
              Notre histoire
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
