import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeadGodsApiService } from "./leadgods-api.service";

@Injectable({
  providedIn: "root",
})
export class PublicationService {
  constructor(private leadGodsApi: LeadGodsApiService) {}

  getPublicationDetail(id: any): Observable<any> {
    return this.leadGodsApi.get(`/es/app/publication/${id}`);
  }

  getPublicationQuotesDay(id: any, date: any): Observable<any> {
    return this.leadGodsApi.get(
      `/es/app/quotes-interval-time?publicationId=${id}&date=${date}`
    );
  }

  getPublication(
    page: any,
    search: any,
    publicationType: any
  ): Observable<any> {
    return this.leadGodsApi.get(
      `/es/app/publication?page=${page}&search=${search}&publicationType=${publicationType}`
    );
  }

  putDownloadMeeting(id: any) {
    return this.leadGodsApi.put(`/es/app/quotes/${id}/download`);
  }

  putMeetingCancelled(id: any) {
    return this.leadGodsApi.put(`/es/app/quotes/${id}/cancelled`);
  }

  putMeetingStart(id: any) {
    return this.leadGodsApi.put(`/es/app/quotes/${id}/start`);
  }

  putMeetingCulminate(id: any) {
    return this.leadGodsApi.put(`/es/app/quotes/${id}/culminate`);
  }

  getDetailMeeting(id: any, page: any): Observable<any> {
    return this.leadGodsApi.get(`/es/app/meeting?page=${page}&publicationId=${id}`);
  }

  getPublicationMentor(id: any, paId: any, quotesId: any): Observable<any> {
    return this.leadGodsApi.get(`/es/app/quotes-booking/${id}/1?paId=${paId}&quotesId=${quotesId}`);
  }

  getPublicationQuotesInterval(id: any, timeZone: any, reservationId: any) {
    return this.leadGodsApi.get(`/es/app/quotes-booking/${id}/2?timeZone=${timeZone}&reservationId=${reservationId}`);
  }

  getPublicationQuotesDayReserve(id: any, timeZone: any, date:any): Observable<any> {
    return this.leadGodsApi.get(`/es/app/quotes-booking/${id}/3?timeZone=${timeZone}&date=${date}`);
  }

  postReserve(data:any, id:any): Observable<any> {
    return this.leadGodsApi.post(`/es/app/quotes-booking/` + id, data);
  }

  postSuscribeFree(id: number){
    return this.leadGodsApi.post(`/es/app/publication-subscribed`,{'publicationId' : id});
  }

  checkoutAndroid(id: number){
    return this.leadGodsApi.post(`/es/app/checkout`,{'publication' : {"id":id},'sessionId':'','payment':'local','currencyCode':'USD','items':[{'id':22107,'quantity':1,'amount':150}]});
  }
}
