import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCalendarioComponent } from 'src/app/shared/modal-calendario/modal-calendario.component';
import { FormatHelper } from 'src/services/utils/helpers/format.helper';
// import * as moment from 'moment';
import { IDatum } from 'src/app/interface/data-room.interface';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';

@Component({
  selector: 'app-event-sessions',
  templateUrl: './event-sessions.page.html',
  styleUrls: ['./event-sessions.page.scss'],
})
export class EventSessionsPage implements OnInit {
  @Input() dataSessions: IDatum[];
  @Input() keySelect: string;
  @Input() showTimeZone: boolean = true;
  @Output() doChooseSesion = new EventEmitter<any>();

  constructor(
    public modalController: ModalController,
    public toastHelper: ToastHelper,
    public formatHelper: FormatHelper
  ) {
   
  }

  ngOnInit() {
    // console.log('data', this.showTimeZone, this.dataSessions);
    // setTimeout(() => {
      // console.log('SESSION....', this.dataSessions);
      // this.dataSessions = this.dataSessions.map((session) => ({
      //   ...session,
      //   dateStatus: this.validateDates(session),
      // }));
      // console.log(this.dataSessions, 'data sessiones');
    // }, 1000);

    // this.dataSessions.map((r) => {
    //   console.log(r, 'time');
    //   r.dateStream = this.formatHelper.formatDateLong(r.dateStream, 'de')
    //   return r;
    // });

    // console.log( this.dataSessions, ' this.dataSessions');
  

  }

  toChooseSession(item: IDatum) {
    // console.log(item, 'IDatum');
    // if (!item.status) {
    //   this.toastHelper.presentToastError(
    //     'Tienes que comprar, no tiene acceso a este recurso',
    //     3000
    //   );
    //   return;
    // }
    this.keySelect = item.key;
    this.doChooseSesion.emit({item, status: item.status});
  }

  async openIonModalCalendario() {
    const modal = await this.modalController.create({
      component: ModalCalendarioComponent,
    });

    return await modal.present();
  }

  // validateDates(session: any) {
  //   if (session.dateStream) {
  //     let dateCurrent = new Date();
  //     let dateStream = new Date(session.dateStream);
  //     if (moment(dateCurrent).isAfter(dateStream, 'day')) {
  //       return false;
  //     }
  //     return true;
  //   }
  //   return false;
  // }
}
