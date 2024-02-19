export class Projet {
    id!: number;
    nomProjet!: string;
    jira!: string;
    techno!: string;
    service!: string;
    dateDemande!: Date;
    livraisonSouhaitee!: Date;
    livraisonRevisee!: Date;
    affectationCDS!: Date;
    priseEnCompteCDS!: Date;
    dateEstimation!: Date;
    devisEstimation!: number;
    dontGarantie!: number;
    dateFeuVert!: Date;
    dateLivraison!: Date;
    MCO!: boolean;
    datePassageMCO!: Date;
    dateSortieMCO!: Date;
    commentaires!: String;
    idClient!: number
    idEtat!: number;
    idTypeDefaut!: number;
    idTypeProjet!: number;

}
