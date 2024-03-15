import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  url: String;

  constructor(private http: HttpClient){
    this.url = "http://localhost:8080";
  }

  public getListAnneesTaches(): Observable<number[]> {
    return this.http.get<number[]>(this.url + "/listAnneesTaches");
  }

}
   
