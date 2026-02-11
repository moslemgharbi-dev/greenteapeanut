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
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
            Restez connecté
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">
            Rejoignez notre univers
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Inscrivez-vous pour recevoir un accès exclusif aux nouveautés,
            aux offres spéciales et à nos conseils fragrance.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <Input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-9 text-sm"
              required
            />
            <Button type="submit" size="sm" className="px-6">
              S'inscrire
            </Button>
          </form>
          
          <p className="text-[10px] text-muted-foreground mt-3">
            En vous inscrivant, vous acceptez de recevoir des communications marketing.
            Désinscription à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
