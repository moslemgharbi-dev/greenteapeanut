import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Veuillez renseigner votre nom.').max(100, '100 caractères maximum.'),
  email: z.string().trim().email('Adresse e-mail invalide.').max(255, '255 caractères maximum.'),
  message: z.string().trim().min(1, 'Veuillez écrire votre message.').max(1000, '1000 caractères maximum.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT = {
  addresses: [
    '254 Rte de La Goulette, La Goulette 070',
    '41 Rue des Salines, Tunis 1000',
  ],
  phones: ['+216 24 433 702', '+216 54 025 030'],
  whatsapp: {
    label: '+216 24 433 702',
    waMeUrl: 'https://wa.me/21624433702',
  },
  hours: [
    {
      title: 'Boutique Tunis',
      rows: [
        { label: 'Lundi – Samedi', value: '08:00 - 18:00' },
        { label: 'Dimanche', value: '15:00 - 21:00' },
      ],
    },
    {
      title: 'Boutique Kram',
      rows: [
        { label: 'Lundi – Samedi', value: '09:00 - 21:00' },
        { label: 'Dimanche', value: '08:00 - 13:00' },
      ],
    },
  ],
} as const;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (values: ContactFormValues) => {
    // Sans stockage (choix actuel) : on confirme seulement côté UI.
    // Ne pas logger les données utilisateur.
    void values;
    toast({
      title: 'Message envoyé',
      description: 'Merci — nous vous répondrons rapidement.',
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-muted" />
          <div className="absolute inset-0 opacity-60 [background:radial-gradient(80%_60%_at_50%_10%,hsl(var(--foreground)/0.18),transparent_65%),linear-gradient(to_bottom,hsl(var(--background)/0),hsl(var(--background)))]" />
          <div className="container relative py-14 md:py-20">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight">Contacter Nous</h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Une question sur une fragrance, une commande ou un conseil ? Écrivez-nous et nous vous répondrons
                rapidement.
              </p>
            </div>
          </div>
        </header>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="rounded-xl border border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70">
              <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-3">
                {/* Address */}
                <section aria-label="Coordonnées" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Address</h2>
                    <div className="mt-3 h-px w-12 bg-border" />
                  </div>

                  <ul className="space-y-3 text-sm">
                    {CONTACT.addresses.map((line) => (
                      <li key={line} className="flex gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <span className="text-foreground/90">{line}</span>
                      </li>
                    ))}
                    {CONTACT.phones.map((phone) => (
                      <li key={phone} className="flex gap-3">
                        <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <a
                          className="text-foreground/90 hover:underline"
                          href={`tel:${phone.replace(/\s+/g, '')}`}
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                    <li className="flex gap-3">
                      <MessageCircle className="mt-0.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <a
                        className="text-foreground/90 hover:underline"
                        href={CONTACT.whatsapp.waMeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp : {CONTACT.whatsapp.label}
                      </a>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <p className="text-sm font-semibold">Horaires</p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <span className="text-foreground/90">Boutique Tunis</span> : Lun–Sam 08:00–18:00 · Dim 15:00–21:00
                      </li>
                      <li>
                        <span className="text-foreground/90">Boutique Kram</span> : Lun–Sam 09:00–21:00 · Dim 08:00–13:00
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Hours */}
                <section aria-label="Heures de travail" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Heures De Travail</h2>
                    <div className="mt-3 h-px w-12 bg-border" />
                  </div>

                  <div className="space-y-7">
                    {CONTACT.hours.map((block) => (
                      <div key={block.title} className="space-y-3">
                        <p className="text-sm font-semibold">{block.title} :</p>
                        <ul className="space-y-2">
                          {block.rows.map((row) => (
                            <li key={`${block.title}-${row.label}`} className="flex items-center justify-between gap-4">
                              <span className="text-sm text-muted-foreground">{row.label}</span>
                              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                {row.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Form */}
                <section aria-label="Formulaire de contact" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Écrivez-nous</h2>
                    <div className="mt-3 h-px w-12 bg-border" />
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input autoComplete="name" placeholder="Votre nom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input autoComplete="email" inputMode="email" placeholder="vous@exemple.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea rows={5} placeholder="Dites-nous ce que vous recherchez…" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        Envoyer
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        En envoyant ce formulaire, vous acceptez d’être recontacté par notre équipe.
                      </p>
                    </form>
                  </Form>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
