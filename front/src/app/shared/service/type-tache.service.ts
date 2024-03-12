import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeTache } from '../model/type-tache';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeTacheService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des types de tâche
  public findAll(): Observable<TypeTache[]> {
    return this.http.get<TypeTache[]>(this.url + "/typesTache");
  }

  // Récupère de l'API un type de tâche par son identifiant
  public findById(id: string) {
    return this.http.get<TypeTache>(this.url + "/typeTacheById/" + id);
  }

  // Récupère de l'API un type de tâche par libellé
  public findByLibelle(libelle: string): Observable<TypeTache> {
    return this.http.get<TypeTache>(this.url + "/typeTacheByLibelle/" + libelle);
  }

  // Demande à l'API de créer un type de tâche
  public create(typeTache: TypeTache){
    return this.http.post<TypeTache>(this.url + "/createTypeTache", typeTache);
  }

  // Demande à l'API de créer un type de tâche
  public update(typeTache: TypeTache) {
    return this.http.put<TypeTache>(this.url + "/updateTypeTache/" + typeTache.idTypeTache.toString(), typeTache);
  }
}
