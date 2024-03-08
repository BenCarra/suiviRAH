import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from '../model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.url + "/sites");
  }

  public findById(id: string | undefined): Observable<Site> {
    return this.http.get<Site>(this.url + "/siteById/" + id);
  }

  public findByNom(nom: string): Observable<Site> {
    return this.http.get<Site>(this.url + "/siteByNom/" + nom);
  }

  public create(utilisateur: Site) {
    return this.http.put<Site>(this.url + "/createSite", utilisateur);
  }

  public update(utilisateur: Site) {
    return this.http.post<Site>(this.url + "/updateSite/" + utilisateur.idSite.toString(), utilisateur);
  }
  
}
