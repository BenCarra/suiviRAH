import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../model/projet';
import { Observable } from 'rxjs';
import { SuiviProjet } from '../model/suivi-projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  // Récupère de l'API l'ensemble des projets
  public getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url + "/projets");
  }

  public getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(this.url + "/projetById/" + id);
  }

  public getProjetByNom(nom: string): Observable<Projet> {
    return this.http.get<Projet>(this.url + "/projetByNom/" + nom);
  }

  public getProjetsByComposition(idComposition: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url + "/projetsByComposition/" + idComposition);
  }

  public getProjetsByEquipe(idEquipe: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url + "/projetsByEquipe/" + idEquipe);
  }

  public getProjetsByUtilisateur(idUtilisateur: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.url + "/projetsByUtilisateur/" + idUtilisateur);
  }

  // Récupère de l'API le suivi des projets
  public getSuiviProjets(): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjets");
  }

  public getSuiviProjetsNonTermines() : Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjetsNonTermines"); 
  }

  public getSuiviProjetsTermines() : Observable<SuiviProjet[]>{
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjetsTermines");
  }

  // Récupère de l'API le suivi des projets par nom de client
  public getSuiviProjetsByClient(nomClient: string): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjetsByClient/" + nomClient);
  }

  public getSuiviProjetsNonTerminesByClient(nomClient: string): Observable<SuiviProjet[]> {
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjetsNonTerminesByClient/" + nomClient);
  }

  public getSuiviProjetsTerminesByClient(nomClient: string) : Observable<SuiviProjet[]>{
    return this.http.get<SuiviProjet[]>(this.url + "/suiviProjetsTerminesByClient/" + nomClient);
  }

  public create(projet: Projet){
    return this.http.post<Projet>(this.url + "/createProjet", projet);
  }

  public update(projet: Projet){
    return this.http.put<Projet>(this.url + "/updateProjet/" + projet.idProjet, projet);
  }

  public delete(id: number){
    return this.http.delete<Projet>(this.url + "/deleteProjet/" + id);
  }

}
