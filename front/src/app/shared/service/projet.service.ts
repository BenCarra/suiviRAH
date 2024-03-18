import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../model/projet';
import { Observable } from 'rxjs';
import { SuiviProjet } from '../model/suivi-projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsURL: string;
  private projetsByUtilisateurURL: string;

  constructor(private http: HttpClient) {
    this.projetsURL = 'http://localhost:8080/projets'
    this.projetsByUtilisateurURL = 'http://localhost:8080/projetsByUtilisateur'
  }

  // Récupère de l'API l'ensemble des projets
  public getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.projetsURL);
  }

  // Récupère de l'API les projets par utilisateur
  public getProjetsByUtilisateur(id: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.projetsByUtilisateurURL}/${id}`);
  }

  // Récupère de l'API le suivi des projets
  public getSuiviProjets(): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>('http://localhost:8080/suiviProjets');
  }

  // Récupère de l'API le suivi des projets par nom de client
  public getSuiviProjetsByClient(nomClient: string): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>('http://localhost:8080/suiviProjetsByClient/' + nomClient);
  }

  /*// Récupère de l'API le suivi des projets par année
   public getSuiviProjetsByAnnee(annee: number): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>('http://localhost:8080/suiviProjetsByAnnee/' + annee);
  }

  // Récupère de l'API le suivi des projets par nom de client et par année
  public getSuiviProjetsByClientByAnnee(nomClient: string, annee: number): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>('http://localhost:8080/suiviProjetsByClientByAnnee/' + nomClient + "/" + annee);
  }*/
}
