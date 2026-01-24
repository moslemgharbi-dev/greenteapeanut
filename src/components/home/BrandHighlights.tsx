import brandLogosImage from '@/assets/brands/brand-logos.jpg';

export function BrandHighlights() {
  return (
    <section className="border-y border-border bg-secondary/20">
      <div className="container py-8 md:py-10">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary/20 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/20 to-transparent z-10" />
          <div
            className="flex w-max items-center gap-8 px-8 animate-marquee-rtl motion-reduce:animate-none"
            aria-label="Marques"
          >
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={brandLogosImage}
                alt="Nos marques partenaires"
                className="h-20 md:h-24 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
