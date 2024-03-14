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
  private duplicateURL:string;
  private getTachesByUtilisateurURL:string;
  private getTachesByUtilisateurByMonthURL: string;
  private getTachesByUtilisateurByWeekURL: string;
  // private getDureeTachesByUtilisateurURL: string;

  constructor(private http:HttpClient) {
    this.getTachesURL = 'http://localhost:8080/taches'
    this.createTacheURL = 'http://localhost:8080/createTache'
    this.tacheURL = 'http://localhost:8080/tache'
    this.duplicateURL = 'http://localhost:8080/duplicateTache'
    this.getTachesByUtilisateurURL = 'http://localhost:8080/tachesByUtilisateur'
    this.getTachesByUtilisateurByMonthURL = 'http://localhost:8080/tachesByUtilisateurByMonth'
    this.getTachesByUtilisateurByWeekURL = 'http://localhost:8080/tachesByUtilisateurByWeek'

    // this.getDureeTachesByUtilisateurURL = 'http://localhost:8080/dureeTachesByUtilisateur'
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

  public getTachesByUtilisateur(id:number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.getTachesByUtilisateurURL}/${id}`);
  }

  public getTachesByUtilisateurByMonth(id:number, month: number, year: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.getTachesByUtilisateurByMonthURL}/${id}/${month}/${year}`);
  }

  public getTachesByUtilisateurByWeek(id:number, weekNumber: number, year: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.getTachesByUtilisateurByWeekURL}/${id}/${weekNumber}/${year}`);
  }
  //  public getTachesByUtilisateurByDay(id:number, date:Date): Observable<Tache[]> {
  //   return this.http.get<Tache[]>(`${this.getTachesByUtilisateurURL}/${id}/${date}`);
  // }

  // public getDureeTachesByUtilisateurByDay(id:number, date:Date): Observable<number> {
  //   return this.http.get<number>(`${this.getDureeTachesByUtilisateurURL}/${id}/${date}`);
  // }
}
    
   
