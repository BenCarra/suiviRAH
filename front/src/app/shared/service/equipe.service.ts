import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipe } from '../model/equipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  // Récupère de l'API l'ensemble des équipes
  public findAll(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.url + "/equipes");
  }

  // Récupère de l'API une équipe par son identifiant
  public findById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(this.url + "/equipeById/" + id);
  }

  // Récupère de l'API les équipes par libellé
  public findByLibelle(libelle: string): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.url + "/equipesByLibelle/" + libelle);
  }

  // Demande à l'API de créer une équipe
  public create(equipe: Equipe) {
    return this.http.post<Equipe>(this.url + "/createEquipe", equipe);
  }

  // Demande à l'API de mettre à jour une équipe
  public update(equipe: Equipe) {
    return this.http.put<Equipe>(this.url + "/updateEquipe/" + equipe.idEquipe, equipe);
  }

  // Demande à l'API de supprimer une équipe
  public delete(id: number): Observable<Equipe> {
    return this.http.delete<Equipe>(this.url + "/deleteEquipe/" + id);
  }
}
