import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeadGodsApiService } from "./leadgods-api.service";

@Injectable({
  providedIn: "root",
})
export class ShoppingService {
  constructor(private leadGodsApi: LeadGodsApiService) {}

  getShopping(page: any, search: any, publicationType: any): Observable<any> {
    return this.leadGodsApi.get(
      `/es/app/my-shopping?page=${page}&search=${search}&publicationType=${publicationType}`
    );
  }

  getLinkShopping(id: any): Observable<any> {
    return this.leadGodsApi.get(`/es/app/checkout-link/${id}`);
  }
}
