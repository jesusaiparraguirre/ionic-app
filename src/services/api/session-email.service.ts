import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
  })
export class SessionEmailService {
    constructor(private http: HttpClient) { }

    doAuthentication(email: any): Observable<any> {
        return this.http.get(`${environment.api_url}/es/app/public/authentication-email/${email}`);
    }
    
    getProfile(): Observable<any> {
        return this.http.get(`${environment.api_url}/es/app/my-profile`);
    }

    myMeetings(page: any): Observable<any> {
        return this.http.get(`${environment.api_url}/es/app/meeting?page=${page}`);
    }

    doLogout(): Observable<any> {
        return this.http.delete(`${environment.api_url}/es/app/my-profile`);
    }
}
