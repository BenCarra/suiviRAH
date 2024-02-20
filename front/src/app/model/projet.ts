export class Projet {
    idProjet!: number;
    nomProjet!: string;
    idClient!: number;
    jira!:string;
    idTypeProjet!: number;
    idTypeDefaut!:number;
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
    idEtat!: number;
    commentaires!: string;

    
}
