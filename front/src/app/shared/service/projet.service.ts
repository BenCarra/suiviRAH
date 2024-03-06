import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../model/projet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private projetsURL: string;
  private projetsByUtilisateurURL: string;

  constructor(private http:HttpClient) {
    this.projetsURL = 'http://localhost:8080/projets'
    this.projetsByUtilisateurURL = 'http://localhost:8080/projetsByUtilisateur'
   }

   public getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.projetsURL);
   }

   public getProjetsByUtilisateur(id:number) : Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.projetsByUtilisateurURL}/${id}`);
   }
}
