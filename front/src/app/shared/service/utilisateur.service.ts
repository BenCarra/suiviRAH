import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateurURL!: string;

  constructor(private http:HttpClient) {
    this.utilisateurURL = 'http://localhost:8080/utilisateur'
   }

   public getUtilisateurById(id: number) : Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.utilisateurURL}/${id}`);
   }
}
