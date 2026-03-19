import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    // Check onboarding status then redirect
    supabase.from('profiles').select('onboarding_completed').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data?.onboarding_completed === false) {
        navigate('/onboarding', { replace: true });
      } else {
        navigate('/profil', { replace: true });
      }
    });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isForgotPassword) {
      const { error } = await resetPassword(email);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Email envoyé', description: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation. Vérifiez vos spams.' });
      }
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
      } else {
        const { data: profile } = await supabase.from('profiles').select('onboarding_completed').eq('id', (await supabase.auth.getUser()).data.user?.id ?? '').maybeSingle();
        if (profile?.onboarding_completed === false) {
          navigate('/onboarding');
        } else {
          navigate('/profil');
        }
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
        toast({ title: 'Inscription réussie', description: 'Un email de confirmation a été envoyé. Vérifiez votre boîte de réception ainsi que vos spams/indésirables.' });
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
            <h1 className="font-brand text-2xl md:text-3xl font-normal tracking-[0.15em] uppercase mb-2">
              Wael Ben Yaghlane
            </h1>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {isForgotPassword ? 'Réinitialiser votre mot de passe' : isLogin ? 'Connexion à votre compte' : 'Créer votre compte'}
            </p>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs tracking-wide uppercase">Nom complet</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100} className="h-12" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs tracking-wide uppercase">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} className="h-12" />
            </div>
            {!isForgotPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs tracking-wide uppercase">Mot de passe</Label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-foreground underline tracking-wide transition-colors"
                      onClick={() => setIsForgotPassword(true)}
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12 pr-12" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}


            <Button type="submit" className="w-full h-12 text-sm tracking-widest uppercase" disabled={loading}>
              {loading ? 'Chargement...' : isForgotPassword ? 'Envoyer le lien' : isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {isForgotPassword ? (
              <button type="button" className="underline text-foreground tracking-wide" onClick={() => setIsForgotPassword(false)}>
                Retour à la connexion
              </button>
            ) : (
              <>
                {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
                <button type="button" className="underline text-foreground tracking-wide" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Créer un compte" : 'Se connecter'}
                </button>
              </>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
