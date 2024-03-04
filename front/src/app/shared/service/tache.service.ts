import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private getTachesURL: string;
  private createTacheURL: string;
  private tacheURL:string;
  private duplicateURL:string;

  constructor(private http:HttpClient) {
    this.getTachesURL = 'http://localhost:8080/taches'
    this.createTacheURL = 'http://localhost:8080/createTache'
    this.tacheURL = 'http://localhost:8080/tache'
    this.duplicateURL = 'http://localhost:8080/duplicateTache'
   }

   public getTaches(): Observable<Tache[]> {
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

   public duplicateTache(id:number, tache:Tache): Observable<any> {
    return this.http.post<any>(`${this.duplicateURL}/${id}`,tache);
  }
}
    // return this.getTacheById(id).pipe( // pipe transforme les données
    // // de la tâche originale avant de créer la tâche dupliquée
    // // map reçoit les données de la tâche originale
    // // L'opérateur map permet de créer un nouvel Observable à partir de l'Observable
    // // d'origine en transformant simplement chacune de ses valeurs.
    //   map(tacheOriginale => {
    //     const tacheDupliquee ={...tacheOriginale};
    //     tacheDupliquee.dateTache = new Date(tacheDupliquee.dateTache);
    //     tacheDupliquee.dateTache.setDate(tacheDupliquee.dateTache.getDate()+1);
        
    //     return tacheDupliquee;
    //   }),
    //   switchMap(tacheDupliquee => this.createTache(tacheDupliquee))
    // )
   
