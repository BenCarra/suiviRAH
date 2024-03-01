import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeTache } from '../model/type-tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeTacheService {

  private typeTachesURL: string;

  constructor(private http:HttpClient) {
    this.typeTachesURL = 'http://localhost:8080/typeTaches';
   }

   public getTypeTaches(): Observable<TypeTache[]> {
    return this.http.get<TypeTache[]>(this.typeTachesURL);
   }
}
