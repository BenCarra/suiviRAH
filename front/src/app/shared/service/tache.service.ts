import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private tachesURL: string;

  constructor(private http:HttpClient) {
    this.tachesURL = 'http://localhost:8080/taches'
   }

   public findAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.tachesURL);
   }
}
