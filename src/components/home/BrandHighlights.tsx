export function BrandHighlights() {
  const brands = [
    { name: 'Elie Saab', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Elie_Saab_logo.svg/200px-Elie_Saab_logo.svg.png' },
    { name: 'Yves Saint Laurent', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Yves_Saint_Laurent_Logo.svg/200px-Yves_Saint_Laurent_Logo.svg.png' },
    { name: 'Valentino', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Valentino_logo.svg/200px-Valentino_logo.svg.png' },
    { name: 'Burberry', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Burberry_Logo.svg/200px-Burberry_Logo.svg.png' },
    { name: 'Versace', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Versace_logo.svg/200px-Versace_logo.svg.png' },
    { name: 'Montale', logo: 'https://montale.com/cdn/shop/files/montale-paris-logo.svg?v=1698054567' },
    { name: 'Mancera', logo: 'https://manceraparfums.com/img/mancera-logo-1603291303.jpg' },
    { name: 'Parfums de Marly', logo: 'https://www.parfums-de-marly.com/cdn/shop/files/pdm-logo.svg?v=1699619195' },
    { name: 'Zadig & Voltaire', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Zadig_%26_Voltaire_logo.svg/200px-Zadig_%26_Voltaire_logo.svg.png' },
    { name: 'Carner Barcelona', logo: 'https://carfragrament.com/cdn/shop/files/CARNER-LOGO_BLACK.png?v=1647945432' },
    { name: 'Atelier des Ors', logo: 'https://atelierdesors.com/cdn/shop/files/logo-atelier-des-ors.svg?v=1695989159' },
    { name: 'The Merchant of Venice', logo: 'https://themerchantofvenicellc.com/wp-content/uploads/2021/05/merchant-of-venice-logo.png' },
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
                className="flex items-center justify-center h-10 md:h-12 w-28 md:w-36 flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
