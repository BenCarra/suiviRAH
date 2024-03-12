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

   // Récupère de l'API l'ensemble des projets
   public getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.projetsURL);
   }

   // Récupère de l'API les projets par utilisateur
   public getProjetsByUtilisateur(id:number) : Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.projetsByUtilisateurURL}/${id}`);
   }
}
