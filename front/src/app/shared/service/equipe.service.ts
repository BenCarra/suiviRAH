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

  public findAll(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.url + "/equipes");
  }

  public findById(id: string | undefined): Observable<Equipe> {
    return this.http.get<Equipe>(this.url + "/equipeById/" + id);
  }

  public findByLibelle(libelle: string): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.url + "/equipesByLibelle/" + libelle);
  }

  public create(equipe: Equipe) {
    return this.http.post<Equipe>(this.url + "/createEquipe", equipe);
  }

  public update(equipe: Equipe) {
    return this.http.put<Equipe>(this.url + "/updateEquipe/" + equipe.idEquipe, equipe);
  }

  public delete(id: string | undefined): Observable<Equipe> {
    return this.http.delete<Equipe>(this.url + "/deleteEquipe/" + id);
  }
}
