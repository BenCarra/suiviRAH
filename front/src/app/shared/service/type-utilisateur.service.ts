import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUtilisateur } from './type-utilisateur';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {
  
  
  private url: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<TypeUtilisateur[]> {
    return this.http.get<TypeUtilisateur[]>(this.url + "/typesUtilisateur");
  }
}
