import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../model/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des utilisateurs
  public findAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateurs");
  }

  // Récupère de l'API un utilisateur par son identifiant
  public findById(id: number | undefined): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + "/utilisateurById/" + id);
  }

  // Récupère de l'API les utilisateurs par nom
  public findByNom(nom: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursByNom/" + nom);
  }

  // Récupère de l'API les utilisateurs par type utilisateur
  public findByTypeUtilisateur(typeUtilisateurLibelle: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursByTypeUtilisateur/" + typeUtilisateurLibelle);
  }

  // Récupère de l'API les utilisateurs par site
  public findBySite(nomSite: string) {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursBySite/" + nomSite);
  }

  // Demande à l'API de créer un utilisateur
  public create(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(this.url + "/createUtilisateur", utilisateur);
  }

  // Demande à l'API de mettre à jour un utilisateur
  public update(utilisateur: Utilisateur) {
    return this.http.put<Utilisateur>(this.url + "/updateUtilisateur/" + utilisateur.idUtilisateur, utilisateur);
  }

}
