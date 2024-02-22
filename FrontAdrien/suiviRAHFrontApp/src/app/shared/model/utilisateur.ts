import { Composition } from "./composition";
import { Equipe } from "./equipe";
import { Site } from "./site";
import { Tache } from "./tache";
import { TypeUtilisateur } from "./type-utilisateur";

export class Utilisateur {
    idUtilisateur!: number;
    nomUtilisateur!: string;
    prenomUtilisateur!: string;
    login!: string
    mail!: string
    actif!: boolean
    site!: Site;
    typeUtilisateur!: TypeUtilisateur;
    listTaches!: Tache[]; 
    listEquipes!: Equipe[];
    listCompositions!: Composition[];
}
