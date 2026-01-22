import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl font-medium">Contact</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Une question sur une fragrance, une commande ou un conseil ?
                Écrivez-nous et nous vous répondrons rapidement.
              </p>

              <div className="mt-10 rounded-lg border border-border p-6">
                <p className="text-sm text-muted-foreground">
                  Formulaire de contact à venir.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
