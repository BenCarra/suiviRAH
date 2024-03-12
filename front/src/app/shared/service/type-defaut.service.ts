import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeDefaut } from '../model/type-defaut';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeDefautService {

  private url: string

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080"
  }

  // Récupère de l'API l'ensemble des types de défaut
  public findAll(): Observable<TypeDefaut[]> {
    return this.http.get<TypeDefaut[]>(this.url + "/typesDefaut")
  }

  // Récupère de l'API un type de défaut par son identifiant
  public findById(id: string) {
    return this.http.get<TypeDefaut>(this.url + "/typeDefautById/" + id);
  }

  // Récupère de l'API un type de défaut par libellé
  public findByLibelle(libelle: string): Observable<TypeDefaut> {
    return this.http.get<TypeDefaut>(this.url + "/typeDefautByLibelle/" + libelle);
  }

  // Demande à l'API de créer un type de défaut
  public create(typeDefaut: TypeDefaut){
    return this.http.post<TypeDefaut>(this.url + "/createTypeDefaut", typeDefaut);
  }

  // Demande à l'API de mettre à jour un type de défaut
  public update(typeDefaut: TypeDefaut) {
    return this.http.put<TypeDefaut>(this.url + "/updateTypeDefaut/" + typeDefaut.idTypeDefaut.toString(), typeDefaut);
  }

}
