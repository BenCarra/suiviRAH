import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUtilisateur } from '../model/type-utilisateur';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {
  
  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(this.url + "/typesUtilisateur");
  }

  public findById(id: string) {
    return this.http.get<TypeUtilisateur>(this.url + "/typeUtilisateurById/" + id);
  }

  public findByLibelle(libelle: string): Observable<TypeUtilisateur> {
    return this.http.get<TypeUtilisateur>(this.url + "/typeUtilisateurByLibelle/" + libelle);
  }

  public create(typeUtilisateur: TypeUtilisateur){
    return this.http.post<TypeUtilisateur>(this.url + "/createTypeUtilisateur", typeUtilisateur);
  }

  public update(typeUtilisateur: TypeUtilisateur) {
    return this.http.put<TypeUtilisateur>(this.url + "/updateTypeUtilisateur/" + typeUtilisateur.idTypeUtilisateur.toString(), typeUtilisateur);
  }
  
}
