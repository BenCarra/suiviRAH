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

  public findById(id: string | undefined): Observable<RDS> {
    return this.http.get<RDS>(this.url + "/rdsById/" + id)
  }

  public findByNom(nom: string): Observable<RDS[]> {
    return this.http.get<RDS[]>(this.url + "/rdsByNom/" + nom);
  }

  public create(rds: RDS): Observable<RDS> {
    return this.http.post<RDS>(this.url + "/createRDS", rds);
  }

  public update(rds: RDS): Observable<RDS> {
    return this.http.put<RDS>(this.url + "/updateRDS/" + rds.idRDS.toString(), rds);
  }
}
