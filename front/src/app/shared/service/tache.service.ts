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
  private deleteTacheURL:string;

  constructor(private http:HttpClient) {
    this.getTachesURL = 'http://localhost:8080/taches'
    this.createTacheURL = 'http://localhost:8080/createTache'
    this.deleteTacheURL = 'http://localhost:8080/tache'
   }

   public findAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.getTachesURL);
   }

   public createTache(tache:Tache): Observable<Tache> {
    return this.http.post<Tache>(this.createTacheURL, tache);
   }

   public deleteTache(id:number): Observable<any> {
    return this.http.delete<any>(`${this.deleteTacheURL}/${id}`);
   }
}
