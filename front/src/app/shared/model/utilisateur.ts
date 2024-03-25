export class Utilisateur {
    idUtilisateur!: number;
    nomUtilisateur!: string;
    prenomUtilisateur!: string;
    dateNaissance!: Date;
    login!: string;
    password!: string;
    mail!: string;
    actif!: boolean;
    nomSite!: string;
    libelleTypeUtilisateur!: string;
    listTaches!: string[][];
    listEquipes!: string[][];
    listCompositions!: string[][];
}
