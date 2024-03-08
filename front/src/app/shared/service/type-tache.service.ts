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

  public findAll(): Observable<TypeTache[]> {
    return this.http.get<TypeTache[]>(this.url + "/typesTache");
  }

  public findById(id: string) {
    return this.http.get<TypeTache>(this.url + "/typeTacheById/" + id);
  }

  public findByLibelle(libelle: string): Observable<TypeTache> {
    return this.http.get<TypeTache>(this.url + "/typeTacheByLibelle/" + libelle);
  }

  public create(typeTache: TypeTache){
    return this.http.post<TypeTache>(this.url + "/createTypeTache", typeTache);
  }

  public update(typeTache: TypeTache) {
    return this.http.put<TypeTache>(this.url + "/updateTypeTache/" + typeTache.idTypeTache.toString(), typeTache);
  }
}
