import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [reviews, setReviews] = useState<{ product_handle: string; rating: number; comment: string | null; created_at: string }[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    // Fetch profile
    supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data?.full_name) setFullName(data.full_name);
    });
    // Fetch user reviews
    supabase.from('reviews').select('product_handle, rating, comment, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setReviews(data);
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ full_name: fullName.trim() }).eq('id', user.id);
    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Profil mis à jour' });
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-2xl py-16">
        <h1 className="font-serif text-2xl sm:text-3xl font-medium mb-8">Mon Profil</h1>

        <section className="space-y-4 mb-12">
          <div className="space-y-2">
            <Label htmlFor="profileName">Nom complet</Label>
            <Input id="profileName" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email ?? ''} disabled />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</Button>
            <Button variant="outline" onClick={handleSignOut}>Se déconnecter</Button>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-medium mb-4">Mes Avis ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-sm">Vous n'avez pas encore laissé d'avis.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.product_handle} className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`h-4 w-4 ${s <= r.rating ? 'fill-foreground text-foreground' : 'fill-none text-foreground/30'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-sm font-medium capitalize">{r.product_handle.replace(/-/g, ' ')}</p>
                  {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
