import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from '../model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des sites
  public findAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.url + "/sites");
  }

  // Récupère de l'API un site par son identifiant
  public findById(id: string | undefined): Observable<Site> {
    return this.http.get<Site>(this.url + "/siteById/" + id);
  }

  // Récupère de l'API un site par nom
  public findByNom(nom: string): Observable<Site> {
    return this.http.get<Site>(this.url + "/siteByNom/" + nom);
  }

  // Demande à l'API de créer un site
  public create(site: Site) {
    return this.http.post<Site>(this.url + "/createSite", site);
  }

  // Demande à l'API de mettre à jour un site
  public update(site: Site) {
    return this.http.put<Site>(this.url + "/updateSite/" + site.idSite.toString(), site);
  }
}
