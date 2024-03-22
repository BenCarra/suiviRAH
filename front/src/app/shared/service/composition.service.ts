import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Composition } from '../model/composition';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  url: string;

  constructor(private http: HttpClient) { 
    this.url = "http://localhost:8080";
  }

  public findAll(): Observable<Composition[]> {
    return this.http.get<Composition[]>(this.url + "/compositions");
  }
}
