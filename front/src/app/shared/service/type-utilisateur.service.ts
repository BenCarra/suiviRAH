import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeUtilisateur } from '../model/type-utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des types utilisateur
  public findAll(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(this.url + "/typesUtilisateur");
  }

  // Récupère de l'API un type utilisateur par son identifiant
  public findById(id: string) {
    return this.http.get<TypeUtilisateur>(this.url + "/typeUtilisateurById/" + id);
  }

  // Récupère de l'API un type utilisateur par libellé
  public findByLibelle(libelle: string): Observable<TypeUtilisateur> {
    return this.http.get<TypeUtilisateur>(this.url + "/typeUtilisateurByLibelle/" + libelle);
  }

  // Demande à l'API de créer un type utilisateur
  public create(typeUtilisateur: TypeUtilisateur){
    return this.http.post<TypeUtilisateur>(this.url + "/createTypeUtilisateur", typeUtilisateur);
  }

  // Demande à l'API de mettre à jour un type utilisateur
  public update(typeUtilisateur: TypeUtilisateur) {
    return this.http.put<TypeUtilisateur>(this.url + "/updateTypeUtilisateur/" + typeUtilisateur.idTypeUtilisateur.toString(), typeUtilisateur);
  }
}
