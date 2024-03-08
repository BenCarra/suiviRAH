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

  public findAll(): Observable<TypeProjet[]> {
    return this.http.get<TypeProjet[]>(this.url + "/typesProjet");
  }

  public findById(id: string) {
    return this.http.get<TypeProjet>(this.url + "/typeProjetById/" + id);
  }

  public findByLibelle(libelle: string): Observable<TypeProjet> {
    return this.http.get<TypeProjet>(this.url + "/typeProjetByLibelle/" + libelle);
  }

  public create(typeProjet: TypeProjet){
    return this.http.post<TypeProjet>(this.url + "/createTypeProjet", typeProjet);
  }

  public update(typeProjet: TypeProjet) {
    return this.http.put<TypeProjet>(this.url + "/updateTypeProjet/" + typeProjet.idTypeProjet.toString(), typeProjet);
  }
}
