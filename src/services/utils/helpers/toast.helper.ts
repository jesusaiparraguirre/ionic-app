import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastHelper {

  constructor(private toastController: ToastController) { }

  async presentToastSuccess(message: any = 'Acción ejecutada correctamente', duration:number = 10000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async presentToastError(message: any = 'Ocurrió un error, inténtelo nuevamente', duration:number = 10000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
