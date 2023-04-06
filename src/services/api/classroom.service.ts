import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeadGodsApiService } from "./leadgods-api.service";

@Injectable({
  providedIn: "root",
})
export class ClassroomService {

  constructor(private leadGodsApi: LeadGodsApiService) { }

  getClassRoomDetail(slug: any): Observable<any> {
    return this.leadGodsApi.get(`/es/api-room/room/${slug}?partner=${localStorage.getItem('partner')}&v=2`);
  }
  
  getClassRoomSidebar(slug: any, roomId:any): Observable<any> {
    return this.leadGodsApi.get(`/es/api-room/sidebar/${slug}?roomId=${roomId}`);
  }

  getClassroomPlayer(key: any): Observable<any> {
    return this.leadGodsApi.get(`/es/api-room/room-resource/${key}`);
  }

  getClassroomResourcesModule(key: any): Observable<any> {
    return this.leadGodsApi.get(`/es/api-room/file-shared/${key}`);
  }

  getClassroomResources(key: any, type:any = ''): Observable<any> {
    return this.leadGodsApi.get(`/es/api-room/resource-attachment/${key}?type=${type}`);
  }

  postClassroomAdvanced(data: any) {
    return this.leadGodsApi.post(`/es/api-room/user-resource`, data);
  }
  
  getClassroomAdvanced(id: number) {
    return this.leadGodsApi.get(`/es/api-room/user-resource/${id}`).toPromise();
  }

  putRoomResourceAdvanced(roomResourceUserId: string, model: any): Observable<any> {
    return this.leadGodsApi.put(`/es/api-room/user-resource/${roomResourceUserId}`, model);
  }

  getValotarionComments(id: number){
    return this.leadGodsApi.get(`/es/api-room/comments?roomId=${id}`);
  }

  getValotarion(id: number){
    return this.leadGodsApi.get(`/es/api-room/valoration/${id}`);
  }

  getValotarionStarts(id: number){
    return this.leadGodsApi.get(`/es/api-room/rating-user?roomId=${id}`);
  }

  postRatingValoration(data:any){
    return this.leadGodsApi.post(`/es/api-room/valoration-user`, data);
  }

  putRatingValoration(data:any, id:number = 0){
    return this.leadGodsApi.put(`/es/api-room/valoration-user/${id}`, data);
  }

  getClassRoomAbout(id: number) {
    return this.leadGodsApi.get(`/es/api-room/room-detail/${id}`);
  }
  
  getDownloadUrl(key: number){
    return this.leadGodsApi.get(`/es/api-room/download/${key}`);
  }
}
