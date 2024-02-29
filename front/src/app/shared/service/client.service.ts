import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url+"/clients");
  }

  public findById(id: string | undefined): Observable<Client> {
    return this.http.get<Client>(this.url+"/clientById/"+id);
  }

  public findByNom(nom: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.url+"/clientsByNom/"+nom);
  }

  public create(client: Client) {
    return this.http.put<Client>(this.url+"/createClient", client);
  }

  public update(client: Client){
    return this.http.post<Client>(this.url+"/updateClient/"+client.idClient, client);
  }

  public delete(id: string | undefined): Observable<Client> {
    return this.http.delete<Client>(this.url+"/deleteClient/"+id);
  }
}
