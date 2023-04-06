import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';

declare var gapi: any;

@Component({
  selector: 'app-modal-calendario',
  templateUrl: './modal-calendario.component.html',
  styleUrls: ['./modal-calendario.component.scss'],
})
export class ModalCalendarioComponent implements OnInit {

  constructor(
    private modalController: ModalController, 
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = 'Modal Removed';
    await this.modalController.dismiss(close);
  }

  goCalendarGoogle(){
    this.functionHelper.openUrl('https://calendar.google.com/calendar/u/0/r');
  }

  goCalendarOutlook(){
    this.functionHelper.openUrl('https://outlook.live.com/calendar/0/');
  }

  goCalendarYahoo(){
    this.functionHelper.openUrl('https://calendar.yahoo.com/?guccounter=1');
  }
}
