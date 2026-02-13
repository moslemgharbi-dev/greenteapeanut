import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/profil', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        navigate('/profil');
      }
    } else {
      if (!fullName.trim()) {
        toast({ title: 'Erreur', description: 'Veuillez entrer votre nom complet.', variant: 'destructive' });
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, fullName.trim());
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Inscription réussie', description: 'Vérifiez votre email pour confirmer votre compte.' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-12 md:pt-16 pb-20 md:pb-28">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Brand identity */}
          <div className="text-center mb-10">
            <h1 className="font-brand text-2xl md:text-3xl font-medium tracking-[0.15em] uppercase mb-2">
              Wael Ben Yaghlane
            </h1>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {isLogin ? 'Connexion à votre compte' : 'Créer votre compte'}
            </p>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs tracking-wide uppercase">Nom complet</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100} className="h-12" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-wide uppercase">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs tracking-wide uppercase">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12" />
            </div>

            <Button type="submit" className="w-full h-12 text-sm tracking-widest uppercase" disabled={loading}>
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
            <button type="button" className="underline text-foreground tracking-wide" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Créer un compte" : 'Se connecter'}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
