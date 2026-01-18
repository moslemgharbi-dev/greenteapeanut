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
                Our Story
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                The Art of Fragrance
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded with a passion for the extraordinary, Maison Parfum 
                brings the world's finest fragrances to discerning collectors 
                who understand that scent is the most intimate form of expression.
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
                  Our Philosophy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe that fragrance is more than a scent—it's a story told 
                  through notes, a memory captured in a bottle, and an invisible 
                  accessory that announces your presence before you enter a room 
                  and lingers long after you leave.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                  Curated Excellence
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each fragrance in our collection has been carefully selected by 
                  our team of perfume connoisseurs. We work directly with the world's 
                  most prestigious fragrance houses to bring you authentic, luxury 
                  scents that stand the test of time.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
                  The Maison Experience
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  From the moment you discover your perfect scent to the elegant 
                  unboxing experience, we ensure every touchpoint reflects the 
                  luxury and attention to detail you deserve. Because choosing 
                  a fragrance is a deeply personal journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="container">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-center mb-16">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  Every fragrance we offer is 100% authentic, sourced directly 
                  from official distributors and renowned perfume houses.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Our fragrances are stored and 
                  handled with the utmost care to preserve their integrity.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl font-medium mb-3">Service</h3>
                <p className="text-muted-foreground">
                  Our dedicated team is passionate about helping you discover 
                  your perfect scent with personalized recommendations.
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
