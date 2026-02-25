import StaticPage from "./StaticPage";

export default function Shipping() {
  return (
    <StaticPage
      eyebrow="Maison Wael Scents & vous"
      title="Livraison"
      lead="Livraison en Tunisie : délais, frais et retours."
    >
      <h2 className="text-base font-medium text-foreground">Zones & délais</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Livraison en Tunisie.</li>
        <li>Délais indicatifs : 24–48h (selon la zone et la disponibilité).</li>
      </ul>

      <h2 className="text-base font-medium text-foreground">Frais de livraison</h2>
      <p>Frais fixes de 8 TND.</p>

      <h2 className="text-base font-medium text-foreground">Paiement</h2>
      <p>Paiement à la livraison.</p>

      <h2 className="text-base font-medium text-foreground">Retours & échanges (sous conditions)</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Le produit doit être non utilisé, dans son emballage d’origine, avec scellé intact.</li>
        <li>
          Pour toute demande, contactez-nous rapidement via la page Contact en précisant le numéro de commande.
        </li>
      </ul>

      <p className="text-xs">
        Note : ces informations peuvent évoluer. La version applicable est celle visible sur le site au moment de la
        commande.
      </p>
    </StaticPage>
  );
}
