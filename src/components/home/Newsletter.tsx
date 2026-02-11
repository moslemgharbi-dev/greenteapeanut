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
    <section className="py-8 md:py-10">
      <div className="container">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="font-serif text-lg md:text-xl font-medium mb-2">
            Rejoignez notre univers
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Recevez en avant-première nos nouveautés et offres exclusives.
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-8 text-xs"
              required
            />
            <Button type="submit" size="sm" className="h-8 px-4 text-xs">
              S'inscrire
            </Button>
          </form>
          
          <p className="text-[9px] text-muted-foreground mt-2">
            Désinscription à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
