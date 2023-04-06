import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) { }

  doLogin(credentials): Observable<any> {
    return this.http.post(`${environment.api_url}/es/app/public/authentication`, credentials);
  }

  doRecover(credentials): Observable<any> {
    return this.http.post(`${environment.api_url}/es/app/public/recover-password`, credentials);
  }
  doRegister(credentials): Observable<any> {
    return this.http.post(`${environment.api_url}/es/app/public/register`, credentials);
  }
  doDelete(): Observable<any> {
    return this.http.delete(`${environment.api_url}/es/app/account/delete`);
  }
  listCountry(): Observable<any> {
    return this.http.get(`${environment.api_url}/es/app/public/country`);
  }
  listPartner(): Observable<any> {
    return this.http.get(`${environment.api_url}/es/app/public/partners`);
  }
}
