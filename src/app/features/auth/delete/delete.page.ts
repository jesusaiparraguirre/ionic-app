import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, IonSelect, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/services/api/login.service';
import { GlobalService } from 'src/services/api/global.service';
import { Messages } from 'src/services/utils/constants/messages.constant';
import { SessionEmailService } from '../../../../services/api/session-email.service';

@Component({
    providers: [LoginService],
    selector: 'app-delete',
    templateUrl: './delete.page.html',
    styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

    public data: any = {};

    constructor(
        private navController: NavController,
        private sessionEmailService: SessionEmailService,
        private loginService: LoginService,
        public alertController: AlertController,
        public globalService:GlobalService,
    ) {
        this.init();
     }

    ngOnInit() {
     
    }

    init(){
        this.sessionEmailService.getProfile().subscribe(
          (data) => {
            this.data = data;
          }
        )
      }

    backButton() {
        this.navController.navigateRoot(['/app/profile']);
    }



    goDelete() {
        this.loginService.doDelete().subscribe(
            async (data) => {
                const alert = await this.alertController.create({
                    header: 'Correcto',
                    message: 'Tu cuenta fue eliminada correctamente',
                    buttons: [
                        {
                          text: 'Entendido',
                          handler: () => {
                            this.globalService.logout();
                          }
                        },
                      ]
                    });
                    await alert.present();
            },
            async (err) => {
                const alert = await this.alertController.create({
                    header: 'Error',
                    message: 'Hubo un error al elminar tu cuenta',
                    buttons: ['Entendido']
                    });
                
                    await alert.present();
            }
        )
    }
   
}
