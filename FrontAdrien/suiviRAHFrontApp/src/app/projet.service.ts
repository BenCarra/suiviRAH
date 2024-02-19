import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from './projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsUrl: string;

  constructor(private http: HttpClient) {
    this.projetsUrl = "http://localhost:8080/projets";
  }

  public findAll(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.projetsUrl, {responseType: 'json'});
  }
  public save(projet: Projet){
    return this.http.post<Projet>(this.projetsUrl, projet);
  }
}
