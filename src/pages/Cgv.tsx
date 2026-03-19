import StaticPage from "./StaticPage";

export default function Cgv() {
  return (
    <StaticPage
      eyebrow="Informations légales"
      title="CGV"
      lead="Conditions Générales de Vente (Tunisie) — modèle à valider par un professionnel."
    >
      <p className="text-xs">
        Important : ce document est un modèle informatif adapté à ton fonctionnement (personne physique, Tunisie,
        paiement à la livraison). Il ne remplace pas un avis juridique.
      </p>

      <h2 className="text-base font-medium text-foreground">1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits (parfums et articles
        associés) réalisées via le site « Wael Ben Yaghlane » (ci-après « le Site »).
      </p>

      <h2 className="text-base font-medium text-foreground">2. Identité du vendeur</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Vendeur : Personne physique (à compléter : nom complet si différent).</li>
        <li>Nom commercial : Wael Ben Yaghlane.</li>
        <li>Contact : via la page Contact du Site.</li>
      </ul>

      <h2 className="text-base font-medium text-foreground">3. Produits</h2>
      <p>
        Les produits proposés sont décrits et présentés avec la plus grande exactitude possible. Les visuels sont
        fournis à titre indicatif.
      </p>

      <h2 className="text-base font-medium text-foreground">4. Prix</h2>
      <p>
        Les prix sont indiqués en dinar tunisien (TND). Les frais de livraison sont indiqués avant la validation de la
        commande.
      </p>

      <h2 className="text-base font-medium text-foreground">5. Commande</h2>
      <p>
        Le client sélectionne les produits, vérifie le récapitulatif du panier, puis valide la commande. Le vendeur
        peut contacter le client pour confirmer certaines informations (adresse, disponibilité, etc.).
      </p>

      <h2 className="text-base font-medium text-foreground">6. Paiement</h2>
      <p>
        Le paiement est effectué à la livraison (paiement à la remise du colis). En cas de refus injustifié du colis,
        le vendeur se réserve le droit de refuser une commande ultérieure.
      </p>

      <h2 className="text-base font-medium text-foreground">7. Livraison</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Zone : Tunisie.</li>
        <li>Délais indicatifs : 24–48h.</li>
        <li>Frais : 8 TND (fixe), sauf indication contraire lors de la commande.</li>
      </ul>
      <p>
        Les délais sont donnés à titre indicatif. Un retard raisonnable ne peut donner lieu à l’annulation automatique
        de la commande ni à une indemnisation, sauf cas particulier.
      </p>

      <h2 className="text-base font-medium text-foreground">8. Réception — réserves</h2>
      <p>
        Le client est invité à vérifier l’état du colis au moment de la réception. En cas d’anomalie (colis endommagé,
        produit manquant, erreur), le client doit contacter le vendeur dès que possible, idéalement le jour même, avec
        des photos.
      </p>

      <h2 className="text-base font-medium text-foreground">9. Retours & échanges (produits scellés)</h2>
      <p>
        Pour des raisons d’hygiène et de protection du consommateur, les retours/échanges sont acceptés sous
        conditions : produit non utilisé, emballage d’origine et scellé intact. Toute demande doit être faite via la
        page Contact, en précisant le numéro de commande.
      </p>

      <h2 className="text-base font-medium text-foreground">10. Garantie & conformité</h2>
      <p>
        En cas de produit non conforme ou présentant un défaut, le client doit contacter le vendeur pour trouver une
        solution (échange, remboursement ou autre selon le cas).
      </p>

      <h2 className="text-base font-medium text-foreground">11. Responsabilité</h2>
      <p>
        Le vendeur ne saurait être tenu responsable des dommages indirects. L’utilisation des produits doit respecter
        les précautions d’usage (allergies, peau sensible, etc.).
      </p>

      <h2 className="text-base font-medium text-foreground">12. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans la page « Politique de confidentialité & Cookies ».
      </p>

      <h2 className="text-base font-medium text-foreground">13. Droit applicable — litiges</h2>
      <p>
        Les présentes CGV sont régies par le droit tunisien. En cas de litige, les parties chercheront une solution
        amiable avant toute action.
      </p>
    </StaticPage>
  );
}
