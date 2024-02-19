import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from './projet';
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
}
