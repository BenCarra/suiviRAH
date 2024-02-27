import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../model/projet';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<Projet[]>{
    return this.http.get<Projet[]>(this.url+"/projets");
  }

  public findByNom(): Observable<Projet> {

    let nom : string | null = '';

    this.activatedRoute.paramMap.subscribe((p) => {
      nom = p.get("nom");
    })

    return this.http.get<Projet>(this.url+"/projetByNom/"+nom);

  }

  public save(projet: Projet){
    return this.http.post<Projet>(this.url, projet);
  }

  public deleteById(id: string | undefined): Observable<Projet> {
    // penser à recharger le tableau du DOM après suppression
    return this.http.delete<Projet>(this.url+"/deleteProjet/"+id);
  }
}
