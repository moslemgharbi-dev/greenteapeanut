import { brandLogos } from '@/assets/brands';

export function BrandHighlights() {
  const brands = [
    { name: 'Elie Saab', logo: brandLogos.elieSaab },
    { name: 'Yves Saint Laurent', logo: brandLogos.ysl },
    { name: 'Valentino', logo: brandLogos.valentino },
    { name: 'Burberry', logo: brandLogos.burberry },
    { name: 'Versace', logo: brandLogos.versace },
    { name: 'Montale', logo: brandLogos.montale },
    { name: 'Mancera', logo: brandLogos.mancera },
    { name: 'Parfums de Marly', logo: brandLogos.parfumsDeMarly },
    { name: 'Zadig & Voltaire', logo: brandLogos.zadigVoltaire },
    { name: 'Carner Barcelona', logo: brandLogos.carnerBarcelona },
    { name: 'Atelier des Ors', logo: brandLogos.atelierDesOrs },
    { name: 'The Merchant of Venice', logo: brandLogos.merchantOfVenice },
  ];

  return (
    <section className="border-y border-border bg-secondary/20">
      <div className="container py-8 md:py-10">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary/20 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/20 to-transparent z-10" />
          <div
            className="flex w-max items-center gap-12 md:gap-20 px-8 animate-marquee-rtl motion-reduce:animate-none"
            aria-label="Marques"
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center h-10 md:h-12 w-32 md:w-40 flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
