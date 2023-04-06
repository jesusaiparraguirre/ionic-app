import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalKeys } from "../utils/constants/storage.constant";
import { NavController } from '@ionic/angular';
import { SessionEmailService } from './session-email.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private navController:NavController,
    private sessionEmailService: SessionEmailService
  ) { }

  setToken(token:string) {
    localStorage.setItem(LocalKeys.Token, token);
  }

  getToken() {
    return localStorage.getItem(LocalKeys.Token) ? localStorage.getItem(LocalKeys.Token) : '';
  } 

  setPartner(partner:string) {
    localStorage.setItem(LocalKeys.Partner, partner);
  }

  getPartner() {
    return localStorage.getItem(LocalKeys.Partner);
  }

  logout() {
    this.sessionEmailService.doLogout().subscribe(
      () => {
        localStorage.clear();
        this.navController.navigateRoot('/session-email');
      }, error => {
        console.log("Error data log out", error);
        // localStorage.clear();
      });
  } 
}
