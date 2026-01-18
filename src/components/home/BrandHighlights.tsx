export function BrandHighlights() {
  const brands = [
    'Chanel',
    'Dior',
    'Tom Ford',
    'Creed',
    'Guerlain',
    'Jo Malone',
  ];

  return (
    <section className="py-12 border-y border-border bg-secondary/20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <span 
              key={brand} 
              className="text-lg md:text-xl font-serif text-muted-foreground/60 hover:text-foreground transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
