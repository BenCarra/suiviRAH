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

  public findAll(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.url+"/utilisateurs");
  }

  public findById(id: string | undefined): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url+"/utilisateurById/"+id);
  }

  public findByNom(): Observable<Utilisateur> {

    let nom : string | null = '';

    this.activatedRoute.paramMap.subscribe((p) => {
      nom = p.get("nom");
    })

    return this.http.get<Utilisateur>(this.url+"/utilisateurByNom/"+nom);

  }

  public create(utilisateur: Utilisateur) {
    console.log(utilisateur);
    return this.http.put<Utilisateur>(this.url+"/createUtilisateur/"+utilisateur.idUtilisateur, utilisateur);
  }

  public update(utilisateur: Utilisateur){
    console.log(utilisateur.dateNaissance);
    return this.http.post<Utilisateur>(this.url+"/updateUtilisateur/"+utilisateur.idUtilisateur, utilisateur);
  }

  public deleteById(id: string | undefined): Observable<Utilisateur> {
    // penser à recharger le tableau du DOM après suppression
    return this.http.delete<Utilisateur>(this.url+"/deleteUtilisateur/"+id);
  }
}
