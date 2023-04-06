import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToastSuccess(message: any = 'Acción ejecutada correctamente', time:any = 1000) {
    const toast = await this.toastController.create({
      message: message,
      duration: time
    });
    toast.present();
  }

  async presentToastError(message: any = 'Ocurrió un error, inténtelo nuevamente') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }
}
