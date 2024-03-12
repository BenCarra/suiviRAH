import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeProjet } from '../model/type-projet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeProjetService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des types de projet
  public findAll(): Observable<TypeProjet[]> {
    return this.http.get<TypeProjet[]>(this.url + "/typesProjet");
  }

  // Récupère de l'API un type de projet par son identifiant
  public findById(id: string) {
    return this.http.get<TypeProjet>(this.url + "/typeProjetById/" + id);
  }

  // Récupère de l'API un type de projet par libellé
  public findByLibelle(libelle: string): Observable<TypeProjet> {
    return this.http.get<TypeProjet>(this.url + "/typeProjetByLibelle/" + libelle);
  }

  // Demande à l'API de créer un type de projet
  public create(typeProjet: TypeProjet){
    return this.http.post<TypeProjet>(this.url + "/createTypeProjet", typeProjet);
  }

  // Demande à l'API de mettre à jour un type de projet
  public update(typeProjet: TypeProjet) {
    return this.http.put<TypeProjet>(this.url + "/updateTypeProjet/" + typeProjet.idTypeProjet.toString(), typeProjet);
  }
}
