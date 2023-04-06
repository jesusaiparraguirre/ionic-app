import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeadGodsApiService } from "./leadgods-api.service";

@Injectable({
  providedIn: "root",
})
export class PublicationTypeService {
  constructor(private leadGodsApi: LeadGodsApiService) {}

  getTypePublication(): Observable<any> {
    return this.leadGodsApi.get(`/es/app/publication-types`);
  }
}
