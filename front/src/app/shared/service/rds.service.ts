import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RDS } from '../model/rds';

@Injectable({
  providedIn: 'root'
})
export class RDSService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<RDS[]> {
    return this.http.get<RDS[]>(this.url + "/rds");
  }

  public findByNom(nom: string): Observable<RDS[]> {
    return this.http.get<RDS[]>(this.url + "/rdsByNom/" + nom);
  }

  public create(): Observable<RDS> {
    return this.http.get<RDS>(this.url + "/createRDS");
  }

  public update(id: number): Observable<RDS> {
    return this.http.get<RDS>(this.url + "/updateRDS/" + id.toString());
  }
}
