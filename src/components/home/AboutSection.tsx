import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import aboutImage from '@/assets/about-section.jpg';

export function AboutSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <img
        src={aboutImage}
        alt="L'art de la parfumerie – flacons et ingrédients"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4 block">
            Notre philosophie
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6 text-white">
            L'art de la parfumerie
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Chez Wael Ben Yaghlane, nous croyons que la fragrance est bien plus qu'un parfum : 
            c'est une expression d'identité, un souvenir capturé en essence, et un 
            sillage invisible qui laisse une impression durable. Nous sélectionnons 
            uniquement des fragrances d'exception.
          </p>
          <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
            <Link to="/about">
              Découvrir notre histoire
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
