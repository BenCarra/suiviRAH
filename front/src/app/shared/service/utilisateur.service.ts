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

  public findAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateurs");
  }

  public findById(id: string | undefined): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + "/utilisateurById/" + id);
  }

  public findByNom(nom: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursByNom/" + nom);
  }

  public findByTypeUtilisateur(typeUtilisateurLibelle: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursByTypeUtilisateur/" + typeUtilisateurLibelle);
  }

  public findBySite(nomSite: string) {
    return this.http.get<Utilisateur[]>(this.url + "/utilisateursBySite/" + nomSite);
  }

  public create(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(this.url + "/createUtilisateur", utilisateur);
  }

  public update(utilisateur: Utilisateur) {
    return this.http.put<Utilisateur>(this.url + "/updateUtilisateur/" + utilisateur.idUtilisateur, utilisateur);
  }

  public delete(id: string | undefined): Observable<Utilisateur> {
    return this.http.delete<Utilisateur>(this.url + "/deleteUtilisateur/" + id);
  }
}
