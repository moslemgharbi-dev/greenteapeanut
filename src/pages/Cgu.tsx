import StaticPage from "./StaticPage";

export default function Cgu() {
  return (
    <StaticPage
      eyebrow="Informations légales"
      title="CGU"
      lead="Conditions Générales d’Utilisation — modèle à valider selon ton activité."
    >
      <p className="text-xs">
        Important : ce document est un modèle informatif. Pour une conformité complète, fais-le valider par un
        professionnel.
      </p>

      <h2 className="text-base font-medium text-foreground">1. Objet</h2>
      <p>
        Les présentes Conditions Générales d’Utilisation (CGU) encadrent l’accès et l’utilisation du site « Wael Ben
        Yaghlane » (ci-après « le Site »).
      </p>

      <h2 className="text-base font-medium text-foreground">2. Accès au site</h2>
      <p>
        Le Site est accessible à toute personne disposant d’un accès internet. Le vendeur s’efforce d’assurer un accès
        continu, sans garantie d’absence d’interruptions (maintenance, incidents techniques, etc.).
      </p>

      <h2 className="text-base font-medium text-foreground">3. Compte utilisateur</h2>
      <p>
        Sauf mention contraire, la navigation et l’achat peuvent être possibles sans création de compte. Si un compte
        est proposé ultérieurement, l’utilisateur s’engage à fournir des informations exactes et à préserver la
        confidentialité de ses accès.
      </p>

      <h2 className="text-base font-medium text-foreground">4. Comportements interdits</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Porter atteinte au bon fonctionnement du Site (attaques, scraping abusif, etc.).</li>
        <li>Usurper l’identité d’un tiers, fournir de fausses informations.</li>
        <li>Publier/envoyer des contenus illégaux, diffamatoires, injurieux ou portant atteinte aux droits d’autrui.</li>
      </ul>

      <h2 className="text-base font-medium text-foreground">5. Propriété intellectuelle</h2>
      <p>
        Les contenus du Site (textes, visuels, logo, mise en page) sont protégés. Toute reproduction ou utilisation non
        autorisée est interdite.
      </p>

      <h2 className="text-base font-medium text-foreground">6. Liens externes</h2>
      <p>
        Le Site peut contenir des liens vers des services tiers. Le vendeur n’est pas responsable du contenu ou des
        pratiques de ces services.
      </p>

      <h2 className="text-base font-medium text-foreground">7. Responsabilité</h2>
      <p>
        Le vendeur ne saurait être tenu responsable des dommages indirects liés à l’utilisation du Site. Les
        informations présentes sont fournies à titre indicatif.
      </p>

      <h2 className="text-base font-medium text-foreground">8. Données personnelles</h2>
      <p>
        Les modalités de traitement des données personnelles et l’usage des cookies sont détaillés dans la page
        « Politique de confidentialité & Cookies ».
      </p>

      <h2 className="text-base font-medium text-foreground">9. Modification des CGU</h2>
      <p>
        Le vendeur peut mettre à jour les présentes CGU. La version applicable est celle publiée sur le Site au moment
        de l’utilisation.
      </p>

      <h2 className="text-base font-medium text-foreground">10. Droit applicable</h2>
      <p>
        Les présentes CGU sont régies par le droit tunisien. En cas de litige, une tentative de résolution amiable est
        privilégiée.
      </p>
    </StaticPage>
  );
}
