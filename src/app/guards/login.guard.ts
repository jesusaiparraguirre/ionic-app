import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Subject} from 'rxjs';

import {AlertController, NavController} from '@ionic/angular';
import { GlobalService } from 'src/services';
import { LinkWithoutAuth } from "../../services/utils/enum/navigate.enum";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        protected router: Router,
        public navCtrl: NavController,
        public alertController: AlertController,
        public globalService: GlobalService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve, _) => {
            const resolved$ = new Subject();
            resolved$.next(true);
            resolved$.complete();
            resolve(true);
            
            let user = this.globalService.getToken()
            let url:any = state.url.split('/')
            url = url.length > 2 ? url[1] : LinkWithoutAuth.SessionEmail

            if (!!user) {
              if (url === LinkWithoutAuth.SessionEmail || url === LinkWithoutAuth.Login ||
                url === LinkWithoutAuth.RecoveryPassword || url === LinkWithoutAuth.PasswordSend) {
                this.navCtrl.navigateRoot(['/app/home']);
                resolve(true);
              }
              resolve(true);
            } else {
              if (url === LinkWithoutAuth.SessionEmail || url === LinkWithoutAuth.Login ||
                url === LinkWithoutAuth.RecoveryPassword || url === LinkWithoutAuth.PasswordSend) {
                  resolve(true);
              } else {
                  this.navCtrl.navigateRoot(['/session-email']);
                  resolve(false);
            }
          }
        });


    }
}
