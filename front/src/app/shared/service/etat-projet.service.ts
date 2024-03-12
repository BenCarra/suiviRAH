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

  // Récupère de l'API l'ensemble des états de projets
  public findAll(): Observable<EtatProjet[]> {
    return this.http.get<EtatProjet[]>(this.url + "/etats")
  }

  // Récupère de l'API un état de projet par son identifiant
  public findById(id: string) {
    return this.http.get<EtatProjet>(this.url + "/etatById/" + id);
  }

  // Récupère de l'API un état de projet par libellé
  public findByLibelle(libelle: string): Observable<EtatProjet> {
    return this.http.get<EtatProjet>(this.url + "/etatByLibelle/" + libelle);
  }

  // Demande à l'API de créer un état de projet
  public create(etatProjet: EtatProjet){
    return this.http.post<EtatProjet>(this.url + "/createEtat", etatProjet);
  }

  // Demande à l'API de mettre à jour un état de projet
  public update(etatProjet: EtatProjet) {
    return this.http.put<EtatProjet>(this.url + "/updateEtat/" + etatProjet.idEtat.toString(), etatProjet);
  }
}
