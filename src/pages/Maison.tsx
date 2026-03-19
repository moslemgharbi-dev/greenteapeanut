import StaticPage from "@/pages/StaticPage";
import { Newsletter } from "@/components/home/Newsletter";

export default function Maison() {
  return (
    <>
      <StaticPage
        eyebrow="La Maison"
        title="Wael Ben Yaghlane"
        lead="Une parfumerie pensée comme un lieu de découverte : exigeante dans la sélection, précise dans le conseil, attentive dans chaque détail."
      >
        <p>
          La Maison Wael Scents célèbre la fragrance comme un art de vivre.
          Ici, chaque création est choisie pour son caractère, sa tenue et son équilibre —
          afin que le parfum devienne une signature, et non un simple accessoire.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">Le conseil, au centre</h2>
        <p>
          Nous vous guidons avec une approche simple : comprendre votre style, votre occasion
          et votre préférence de famille olfactive (frais, floral, boisé, vanillé, épicé).
          L’objectif est de vous orienter vers une fragrance qui vous ressemble, durablement.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">Une sélection exigeante</h2>
        <p>
          Notre collection privilégie des compositions élégantes et des sillages maîtrisés.
          Nous attachons une grande importance à l’authenticité des produits, à la qualité
          de conservation, et à une expérience d’achat fluide — en boutique comme en ligne.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">Une expérience premium</h2>
        <p>
          De la découverte au coffret final, tout est pensé pour sublimer le moment.
          L’attention portée à l’emballage, à la livraison et à l’accompagnement fait partie
          intégrante de l’univers de la Maison.
        </p>
      </StaticPage>

      <Newsletter />
    </>
  );
}
