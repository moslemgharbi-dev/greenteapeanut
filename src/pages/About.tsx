import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Newsletter } from '@/components/home/Newsletter';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                Notre histoire
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                Une signature, un parcours
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Derrière chaque choix, une conviction : le parfum est un langage intime.
                Il raconte une présence, révèle une mémoire, et dessine un sillage qui dure.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto space-y-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                  L'origine
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wael Ben Yaghlane est né d'une passion exigeante pour les belles compositions
                  et pour le geste du choix : comparer, sentir, comprendre, puis sélectionner.
                  L'histoire commence avec un désir simple — proposer des fragrances capables
                  de marquer un moment, sans jamais trahir l'élégance.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                  Le parcours
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Au fil du temps, la sélection s'est affinée autour d'un même fil conducteur :
                  des signatures olfactives nettes, des matières qui s'expriment avec justesse,
                  et des sillages qui restent mémorables sans être envahissants.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                  Aujourd'hui
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notre histoire continue avec vous : chaque recommandation, chaque découverte,
                  chaque retour en boutique nourrit cette quête d'excellence.
                  Choisir un parfum est un voyage personnel — nous sommes là pour le rendre
                  clair, agréable, et profondément inspirant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-center mb-16">
              Nos valeurs
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Authenticité</h3>
                <p className="text-muted-foreground">
                  Chaque fragrance proposée est authentique et sélectionnée avec soin.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Qualité</h3>
                <p className="text-muted-foreground">
                  Nous ne transigeons jamais sur la qualité. Nos produits sont conservés
                  et manipulés avec le plus grand soin.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Service</h3>
                <p className="text-muted-foreground">
                  Nous vous accompagnons avec des conseils personnalisés pour vous aider
                  à trouver la fragrance idéale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
