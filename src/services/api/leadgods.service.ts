import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home, IRecommend, Logo } from '../utils/models/model.interface';
import { LeadGodsApiService } from './leadgods-api.service';

@Injectable({
    providedIn: "root",
})
export class LeadGodsService {
    constructor(private leadGodsApi: LeadGodsApiService) {
    }

    getPartner(): Observable<any> {
        return this.leadGodsApi.get(`/es/api-room/partner`);
    }

    getHome(): Observable<Home> {
        return this.leadGodsApi.get(`/es/app/home`);
    }

    getLogo(partnerId): Observable<any> {
        return this.leadGodsApi.get(`/es/app/public/partner/${partnerId}`);
    }

    getRecommend(): Observable<IRecommend> {
        return this.leadGodsApi.get('/es/app/home-recommended');
    }

    getCourses(params): Observable<any> {
        return this.leadGodsApi.get(`/es/app/publication?path=course/list&page=1`)
    }

    getEvents(params): Observable<any> {
        return this.leadGodsApi.get(`/es/app/publication?path=event/list&page=1`)
    }

    getTimeZone(): Observable<any> {
        return this.leadGodsApi.get(`/es/app/time-zone`)
    }

    getHourTimeZone(eventId, codeTimeZone): Observable<any> {
        return this.leadGodsApi.get(`/es/api-room/sidebar-timezone/${eventId}/${codeTimeZone}`)
    }
}
