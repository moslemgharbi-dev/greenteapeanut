import elieSaab from '@/assets/brands/elie-saab.png';
import atelierDesOrs from '@/assets/brands/atelier-des-ors.png';
import zadigVoltaire from '@/assets/brands/zadig-voltaire.png';
import mancera from '@/assets/brands/mancera.png';
import ysl from '@/assets/brands/ysl.png';
import parfumsDeMarly from '@/assets/brands/parfums-de-marly.png';
import carnerBarcelona from '@/assets/brands/carner-barcelona.png';
import merchantOfVenice from '@/assets/brands/merchant-of-venice.png';
import valentino from '@/assets/brands/valentino.png';
import burberry from '@/assets/brands/burberry.png';
import montale from '@/assets/brands/montale.png';
import versace from '@/assets/brands/versace.png';
import giorgioArmani from '@/assets/brands/giorgio-armani.png';
import tizianaTerenzi from '@/assets/brands/tiziana-terenzi.png';
import dolceGabbana from '@/assets/brands/dolce-gabbana.png';
import essentialParfums from '@/assets/brands/essential-parfums.png';
import guerlain from '@/assets/brands/guerlain.png';
import hermes from '@/assets/brands/hermes.png';
import azzaro from '@/assets/brands/azzaro.png';
import chopard from '@/assets/brands/chopard.png';
import viktorRolf from '@/assets/brands/viktor-rolf.png';
import kenzo from '@/assets/brands/kenzo.png';
import isseyMiyake from '@/assets/brands/issey-miyake.png';
import jeanPaulGaultier from '@/assets/brands/jean-paul-gaultier.png';

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
    { name: 'Giorgio Armani', logo: giorgioArmani },
    { name: 'Tiziana Terenzi', logo: tizianaTerenzi },
    { name: 'Dolce & Gabbana', logo: dolceGabbana },
    { name: 'Essential Parfums', logo: essentialParfums },
    { name: 'Guerlain', logo: guerlain },
    { name: 'Hermès', logo: hermes },
    { name: 'Azzaro', logo: azzaro },
    { name: 'Chopard', logo: chopard },
    { name: 'Viktor & Rolf', logo: viktorRolf },
    { name: 'Kenzo', logo: kenzo },
    { name: 'Issey Miyake', logo: isseyMiyake },
    { name: 'Jean Paul Gaultier', logo: jeanPaulGaultier },
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
                className="flex items-center justify-center h-[250px] w-72 md:w-80 flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
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
