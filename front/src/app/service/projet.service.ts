import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../model/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsURL: string;

  constructor(private http:HttpClient) {
    this.projetsURL = 'http://localhost:8080/projets'
   }

   public findAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.projetsURL);
   }
}
