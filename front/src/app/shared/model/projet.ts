export class Projet {
    idProjet!: number;
    nomProjet!: string;
    nomClient!: string;
    jira!:string;
    libelleTypeProjet!: string;
    libelleTypeDefaut!: string;
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
    mco!: boolean;
    datePassageMCO!: Date;
    dateSortieMCO!: Date;
    libelleEtat!: string;
    commentaires!: string;
}
