import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public loggedInUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private router: Router, private http:HttpClient) {
   }

   login(infosConnexion: { login: string, password: string }): Observable<any> {
    // Encodage en base64 des données d'identification 
    // car dans le back, la méthode d'authentification est Basic Auth
    const credentials = btoa(`${infosConnexion.login}:${infosConnexion.password}`);

    // Configuration de l'en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Envoi de la requête POST avec les en-têtes configurés
    return this.http.post<any>('http://localhost:8080/login', {}, { headers });
  }

  //  login(infosConnexion: { login: string, password: string }) {  
  //   return this.http.post<any>('http://localhost:8080/login', infosConnexion);
  //  }

  //  login(infosConnexion: { login: string, password: string }) {
  //     // Définir les en-têtes avec le type de contenu JSON
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     });

  //     return this.http.post<any>('http://localhost:8080/login', infosConnexion, {headers}).subscribe({
  //       next: (response) => {
  //         const token = response.token;
  //         this.loggedIn.next(true);
  //         this.loggedInUserSubject.next(infosConnexion.login);
  //         localStorage.setItem('token', token);
  //         this.router.navigate(['/calendrier']);
  //       },
  //       error: (error) => {
  //         console.error('Erreur lors de l identification', error);
  //       }
  //     })
  //   }

  //  login(infosConnexion: { login: string, password: string }): Observable<void> {
  //   // Définir les en-têtes avec le type de contenu JSON
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post<any>('http://localhost:8080/login', infosConnexion, {headers}).pipe(
  //     tap((response) => {
  //       const token = response.token;
  //       this.loggedIn.next(true);
  //       this.loggedInUserSubject.next(infosConnexion.login);
  //       localStorage.setItem('token', token);
  //       this.router.navigate(['/']);
  //     }),
  //     catchError((error) => {
  //       this.loggedIn.next(false);
  //       this.router.navigate(['/login']);
  //       return throwError(error);
  //     })
  //   );
  // }

  // isLoggedIn(): Observable<boolean> {
  //   return this.loggedIn.asObservable();
  // }

  // getLoggedInUser(): Observable<string | null> {
  //   return this.loggedInUserSubject.asObservable();
  // }
  // logout() {
  //   this.loggedIn.next(false);
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);

  // }
}
