import elieSaab from '@/assets/brands/elie-saab.png?format=avif&quality=80&w=384&h=256';
import atelierDesOrs from '@/assets/brands/atelier-des-ors.png?format=avif&quality=80&w=384&h=256';
import zadigVoltaire from '@/assets/brands/zadig-voltaire.png?format=avif&quality=80&w=384&h=256';
import mancera from '@/assets/brands/mancera.png?format=avif&quality=80&w=384&h=256';
import ysl from '@/assets/brands/ysl.png?format=avif&quality=80&w=384&h=256';
import parfumsDeMarly from '@/assets/brands/parfums-de-marly.png?format=avif&quality=80&w=384&h=256';
import carnerBarcelona from '@/assets/brands/carner-barcelona.png?format=avif&quality=80&w=384&h=256';
import merchantOfVenice from '@/assets/brands/merchant-of-venice.png?format=avif&quality=80&w=384&h=256';
import valentino from '@/assets/brands/valentino.png?format=avif&quality=80&w=384&h=256';
import burberry from '@/assets/brands/burberry.png?format=avif&quality=80&w=384&h=256';
import montale from '@/assets/brands/montale.png?format=avif&quality=80&w=384&h=256';
import versace from '@/assets/brands/versace.png?format=avif&quality=80&w=384&h=256';

export function BrandHighlights() {
  const brands = [
    { name: 'Elie Saab', logo: elieSaab },
    { name: 'Atelier des Ors', logo: atelierDesOrs },
    { name: 'Zadig & Voltaire', logo: zadigVoltaire },
    { name: 'Mancera', logo: mancera },
    { name: 'Yves Saint Laurent', logo: ysl },
    { name: 'Parfums de Marly', logo: parfumsDeMarly },
    { name: 'Carner Barcelona', logo: carnerBarcelona },
    { name: 'The Merchant of Venice', logo: merchantOfVenice },
    { name: 'Valentino', logo: valentino },
    { name: 'Burberry', logo: burberry },
    { name: 'Montale', logo: montale },
    { name: 'Versace', logo: versace },
  ];

  return (
    <section className="border-y border-border bg-secondary/20">
      <div className="py-4">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary/20 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/20 to-transparent z-10" />
          <div
            className="flex w-max items-center gap-0 animate-marquee-rtl motion-reduce:animate-none"
            aria-label="Marques"
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center h-40 flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-32 w-auto object-contain"
                  loading="lazy"
                  width={192}
                  height={128}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
