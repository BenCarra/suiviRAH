import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private getTachesURL: string;
  private createTacheURL: string;
  private tacheURL:string;

  constructor(private http:HttpClient) {
    this.getTachesURL = 'http://localhost:8080/taches'
    this.createTacheURL = 'http://localhost:8080/createTache'
    this.tacheURL = 'http://localhost:8080/tache'
   }

   public findAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.getTachesURL);
   }

   // Le <any> permet de mettre un message dans la réponse
   public createTache(tache:Tache): Observable<any> {
    return this.http.post<any>(this.createTacheURL, tache);
   }

   public deleteTache(id:number): Observable<any> {
    return this.http.delete<any>(`${this.tacheURL}/${id}`);
   }

   public updateTache(id:number,tache:Tache): Observable<any> {
    return this.http.put<any>(`${this.tacheURL}/${id}`, tache);
   }

   public getTacheById(id:number): Observable<Tache> {
    return this.http.get<Tache>(`${this.tacheURL}/${id}`);
   }
}
