import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { APPkeys } from "../utils/constants/app.constant";

@Injectable({
  providedIn: "root",
})
export class LeadGodsApiService {
  private url = APPkeys.url;

  constructor(protected http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${this.url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${this.url}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options?: any): Observable<any> {
    return this.http
      .post(`${this.url}${path}`, body, options)
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${this.url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
