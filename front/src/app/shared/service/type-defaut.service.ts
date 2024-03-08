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

  public findAll(): Observable<TypeDefaut[]> {
    return this.http.get<TypeDefaut[]>(this.url + "/typesDefaut")
  }

  public findById(id: string) {
    return this.http.get<TypeDefaut>(this.url + "/typeDefautById/" + id);
  }

  public findByLibelle(libelle: string): Observable<TypeDefaut> {
    return this.http.get<TypeDefaut>(this.url + "/typeDefautByLibelle/" + libelle);
  }

  public create(typeDefaut: TypeDefaut){
    return this.http.post<TypeDefaut>(this.url + "/createTypeDefaut", typeDefaut);
  }

  public update(typeDefaut: TypeDefaut) {
    return this.http.put<TypeDefaut>(this.url + "/updateTypeDefaut/" + typeDefaut.idTypeDefaut.toString(), typeDefaut);
  }

}
