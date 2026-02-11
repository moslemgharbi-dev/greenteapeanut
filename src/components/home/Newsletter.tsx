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
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2">
            Rejoignez notre univers
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Recevez en avant-première nos nouveautés et offres exclusives.
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-2.5">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-9 text-sm"
              required
            />
            <Button type="submit" size="sm" className="px-6">
              S'inscrire
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-3">
            Désinscription à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
