import { RDS } from "./rds";

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
    datePassageMCO!: Date | null;
    dateSortieMCO!: Date | null;
    libelleEtat!: string;
    commentaires!: string;
    rds!: string[] | null;
    listTaches!: string[][];
    listCompositions!: number[][];
}
