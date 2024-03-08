import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtatProjet } from '../model/etat-projet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtatProjetService {

  private url: string

  constructor(private http: HttpClient) {
    this.url = "http://localhost:8080"
  }

  public findAll(): Observable<EtatProjet[]> {
    return this.http.get<EtatProjet[]>(this.url + "/etats")
  }

  public findById(id: string) {
    return this.http.get<EtatProjet>(this.url + "/etatById/" + id);
  }

  public findByLibelle(libelle: string): Observable<EtatProjet> {
    return this.http.get<EtatProjet>(this.url + "/etatByLibelle/" + libelle);
  }

  public create(etatProjet: EtatProjet){
    return this.http.post<EtatProjet>(this.url + "/createEtat", etatProjet);
  }

  public update(etatProjet: EtatProjet) {
    return this.http.put<EtatProjet>(this.url + "/updateEtat/" + etatProjet.idEtat.toString(), etatProjet);
  }
}
