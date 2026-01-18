import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Welcome to the club!', {
        description: 'You\'ll be the first to know about new arrivals.',
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
            Stay Connected
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
            Join Our World
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive exclusive access to new releases, 
            special offers, and fragrance insights.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing communications. 
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
