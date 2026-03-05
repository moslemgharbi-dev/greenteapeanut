import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function Onboarding() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1
  const [civility, setCivility] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Step 2
  const [notifySms, setNotifySms] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
      return;
    }
    if (user) {
      // If already completed onboarding, go to profile
      supabase.from('profiles').select('onboarding_completed').eq('id', user.id).maybeSingle().then(({ data }) => {
        if (data?.onboarding_completed) {
          navigate('/profil', { replace: true });
        }
      });
    }
  }, [authLoading, user, navigate]);

  const step1Valid = civility && lastName.trim() && firstName.trim() && privacyAccepted;

  const handleConfirm = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      civility,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      full_name: `${firstName.trim()} ${lastName.trim()}`,
      phone: phone.trim() || null,
      address: address.trim() || null,
      privacy_accepted: true,
      notify_sms: notifySms,
      notify_email: notifyEmail,
      onboarding_completed: true,
    }).eq('id', user.id);

    if (error) {
      toast({ title: 'Erreur', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Bienvenue !' });
      navigate('/profil', { replace: true });
    }
    setSaving(false);
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-12 md:pt-16 pb-20 md:pb-28">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Brand header */}
          <div className="text-center mb-10">
            <h1 className="font-brand text-2xl md:text-3xl font-normal tracking-[0.15em] uppercase mb-2">
              Wael Scents
            </h1>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Complétez votre profil
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border transition-colors ${
                  step >= s ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground'
                }`}>
                  {s}
                </div>
                {s === 1 && <div className={`w-10 h-px ${step > 1 ? 'bg-foreground' : 'bg-border'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-5">
              {/* Civility */}
              <div className="space-y-3">
                <Label className="text-xs tracking-wide uppercase">Civilité</Label>
                <RadioGroup value={civility} onValueChange={setCivility} className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="monsieur" id="monsieur" />
                    <Label htmlFor="monsieur" className="cursor-pointer text-sm">Monsieur</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="madame" id="madame" />
                    <Label htmlFor="madame" className="cursor-pointer text-sm">Madame</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obLastName" className="text-xs tracking-wide uppercase">Nom *</Label>
                <Input id="obLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={100} className="h-12" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="obFirstName" className="text-xs tracking-wide uppercase">Prénom *</Label>
                <Input id="obFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={100} className="h-12" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="obPhone" className="text-xs tracking-wide uppercase">Téléphone <span className="normal-case text-muted-foreground">(optionnel)</span></Label>
                <Input id="obPhone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="obAddress" className="text-xs tracking-wide uppercase">Adresse <span className="normal-case text-muted-foreground">(optionnel)</span></Label>
                <Input id="obAddress" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={255} className="h-12" />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Checkbox id="obPrivacy" checked={privacyAccepted} onCheckedChange={(c) => setPrivacyAccepted(c === true)} className="mt-0.5" />
                <Label htmlFor="obPrivacy" className="text-sm leading-snug cursor-pointer">
                  J'ai lu et j'ai pris connaissance de la{' '}
                  <a href="/confidentialite-cookies" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                    politique de données personnelles
                  </a> *
                </Label>
              </div>

              <Button onClick={() => setStep(2)} disabled={!step1Valid} className="w-full h-12 text-sm tracking-widest uppercase">
                Suivant
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-center text-muted-foreground">
                Souhaitez-vous recevoir nos nouvelles offres ?
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox id="obSms" checked={notifySms} onCheckedChange={(c) => setNotifySms(c === true)} />
                  <Label htmlFor="obSms" className="text-sm cursor-pointer">Par SMS</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="obEmail" checked={notifyEmail} onCheckedChange={(c) => setNotifyEmail(c === true)} />
                  <Label htmlFor="obEmail" className="text-sm cursor-pointer">Par email</Label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 text-sm tracking-widest uppercase">
                  Retour
                </Button>
                <Button onClick={handleConfirm} disabled={saving} className="flex-1 h-12 text-sm tracking-widest uppercase">
                  {saving ? 'Confirmation...' : 'Confirmer'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
