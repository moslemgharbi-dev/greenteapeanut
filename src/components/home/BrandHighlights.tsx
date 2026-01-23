export function BrandHighlights() {
  const brands = [
    'Chanel',
    'Dior',
    'Tom Ford',
    'Creed',
    'Guerlain',
    'Jo Malone',
    'Yves Saint Laurent',
    'Hermès',
    'Givenchy',
    'Prada',
    'Armani',
    'Byredo',
    'Diptyque',
    'Maison Francis Kurkdjian',
    'Kilian',
    'Initio',
    'Nishane',
    'Xerjoff',
  ];

  return (
    <section className="border-y border-border bg-secondary/20">
      <div className="container py-10 md:py-12">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-secondary/20 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-secondary/20 to-transparent" />
          <div
            className="flex w-max items-center gap-10 md:gap-16 px-8 animate-marquee-rtl motion-reduce:animate-none"
            aria-label="Marques"
          >
            {[...brands, ...brands].map((brand, idx) => (
              <span
                key={`${brand}-${idx}`}
                className="text-lg md:text-xl font-serif text-muted-foreground/60 hover:text-foreground transition-colors cursor-default whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
