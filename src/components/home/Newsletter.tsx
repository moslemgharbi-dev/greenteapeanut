import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Bienvenue !', {
        description: 'Vous serez le premier informé des nouveautés.',
        position: 'top-center',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            Restez connecté
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Rejoignez notre univers
          </h2>
          <p className="text-muted-foreground mb-8">
            Inscrivez-vous pour recevoir un accès exclusif aux nouveautés,
            aux offres spéciales et à nos conseils fragrance.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" size="lg">
              S'inscrire
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            En vous inscrivant, vous acceptez de recevoir des communications marketing.
            Désinscription à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
