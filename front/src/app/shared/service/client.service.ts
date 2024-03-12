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

  // Récupère de l'API l'ensemble des clients
  public findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + "/clients");
  }

  // Récupère de l'API un client par son identifiant
  public findById(id: string | undefined): Observable<Client> {
    return this.http.get<Client>(this.url + "/clientById/" + id);
  }

  // Récupère de l'API les clients par libellé
  public findByNom(nom: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + "/clientsByNom/" + nom);
  }

  // Demande à l'API de créer un client
  public create(client: Client) {
    return this.http.post<Client>(this.url + "/createClient", client);
  }

  // Demande à l'API de mettre à jour un client
  public update(client: Client) {
    return this.http.put<Client>(this.url + "/updateClient/" + client.idClient.toString(), client);
  }

}
