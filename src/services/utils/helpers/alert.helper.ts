import { EventEmitter, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertHelper {

  constructor(
    private alertController: AlertController,
  ) { }

  async alertMultipleOption(message, ok, cancel) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            cancel()
          }
        },
        {
          text: 'Aceptar',
          role: 'aceptar',
          handler: () => {
            ok();
          }
        }
      ],
      cssClass: 'modal-alert'
    });

    await alert.present();
  }

  async alertSingleOption(header, message, ok) {
    const alert = await this.alertController.create({
      header: header ? '' : 'ERROR',
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            ok();
          }
        }
      ]
    });

    await alert.present();
  }
}
