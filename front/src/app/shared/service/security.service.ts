import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  authenticated: boolean = false;
  url!: string

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8080';
  }

  public authenticate(credentials:any, callback: any) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    

    this.http.get(this.url + '/user', {headers: headers, responseType: 'text'}).subscribe(response => {
        console.log(response);
        if (response) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}

  /*public login(model: any): Observable<boolean>{
    return this.http.post<boolean>(this.url, model);
  }*/

  public logout(){
    this.http.post(this.url + '/logout', {}).subscribe(() => {
      this.authenticated = false;
    });
  }

}
