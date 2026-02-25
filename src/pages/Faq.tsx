import StaticPage from "./StaticPage";

export default function Faq() {
  return (
    <StaticPage
      eyebrow="Maison Wael Scents & vous"
      title="FAQ"
      lead="Les réponses aux questions les plus fréquentes."
    >
      <h2 className="text-base font-medium text-foreground">Commandes</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <span className="text-foreground">Comment passer commande ?</span>
          <br />
          Sélectionnez votre parfum, ajoutez-le au panier, puis validez votre commande. Vous recevrez une confirmation
          avec les détails.
        </li>
        <li>
          <span className="text-foreground">Puis-je modifier ou annuler ma commande ?</span>
          <br />
          Contactez-nous au plus vite via la page Contact. Une fois la commande expédiée, la modification/annulation
          n’est généralement plus possible.
        </li>
      </ul>

      <h2 className="text-base font-medium text-foreground">Paiement</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <span className="text-foreground">Quels moyens de paiement acceptez-vous ?</span>
          <br />
          Paiement à la livraison (Tunisie).
        </li>
      </ul>

      <h2 className="text-base font-medium text-foreground">Livraison</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <span className="text-foreground">Où livrez-vous ?</span>
          <br />
          Nous livrons en Tunisie.
        </li>
        <li>
          <span className="text-foreground">Quels sont les délais de livraison ?</span>
          <br />
          En général 24–48h (selon la zone et la disponibilité).
        </li>
        <li>
          <span className="text-foreground">Quels sont les frais de livraison ?</span>
          <br />
          Frais fixes de 8 TND.
        </li>
      </ul>

      <h2 className="text-base font-medium text-foreground">Retours & échanges</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <span className="text-foreground">Puis-je retourner ou échanger un produit ?</span>
          <br />
          Oui, sous conditions : le produit doit être non utilisé, dans son emballage d’origine, avec scellé intact.
          Contactez-nous dès réception pour organiser la suite.
        </li>
        <li>
          <span className="text-foreground">Que faire si le produit est endommagé ou non conforme ?</span>
          <br />
          Contactez-nous immédiatement avec des photos du colis et du produit afin que nous puissions trouver une
          solution.
        </li>
      </ul>

      <h2 className="text-base font-medium text-foreground">Produits</h2>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          <span className="text-foreground">Les parfums sont-ils authentiques ?</span>
          <br />
          Nous sélectionnons nos fragrances avec soin et travaillons avec des partenaires de confiance.
        </li>
        <li>
          <span className="text-foreground">Je veux un conseil parfum, comment faire ?</span>
          <br />
          Écrivez-nous via la page Contact en indiquant vos goûts, l’occasion, et votre budget.
        </li>
      </ul>
    </StaticPage>
  );
}
