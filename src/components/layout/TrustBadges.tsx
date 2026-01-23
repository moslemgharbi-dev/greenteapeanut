import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";

type TrustBadge = {
  title: string;
  description?: string;
  Icon: typeof Truck;
};

const BADGES: TrustBadge[] = [
  {
    title: "Livraison rapide",
    description: "24–48h en Tunisie",
    Icon: Truck,
  },
  {
    title: "Service client",
    description: "À votre écoute 5j/7",
    Icon: Headphones,
  },
  {
    title: "Qualité premium 100%",
    description: "Sélection exigeante",
    Icon: BadgeCheck,
  },
  {
    title: "Satisfaction garantie",
    description: "Sous conditions",
    Icon: ShieldCheck,
  },
];

export function TrustBadges() {
  return (
    <section aria-label="Engagements" className="border-t border-border bg-background">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {BADGES.map(({ title, description, Icon }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
                <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
                {description ? (
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">{description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
