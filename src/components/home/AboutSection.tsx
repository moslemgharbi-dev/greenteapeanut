import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            The Art of Perfumery
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            At Maison Parfum, we believe that fragrance is more than a scent—it's an 
            expression of identity, a memory captured in essence, and an invisible 
            accessory that leaves a lasting impression. We curate only the finest 
            fragrances from the world's most prestigious houses.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">
              Discover Our Story
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
