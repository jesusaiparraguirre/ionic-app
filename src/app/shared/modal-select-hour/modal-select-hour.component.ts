import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PublicationService } from '../../../services/api/publication.service';
import * as moment from 'moment';
import { ModalLinkPayComponent } from '../modal-link-pay/modal-link-pay.component';

@Component({
  selector: 'app-modal-select-hour',
  templateUrl: './modal-select-hour.component.html',
  styleUrls: ['./modal-select-hour.component.scss'],
})
export class ModalSelectHourComponent implements OnInit {

  id: any;
  date: any;
  meetingQuotes:any;
  quotesMorning: any = []
  quotesLate: any =  []
  optionSelected : any = {};

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    private publicationService: PublicationService
  ) { }

  async ngOnInit() {
    this.id = this.navParams.get("id");
    this.date = this.navParams.get("date");
    this.date = moment(this.date).format("YYYY-MM-DD");
    this.init();
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  init(){ 
    this.publicationService.getPublicationQuotesDay(this.id, this.date).subscribe(
			data => {
        this.meetingQuotes = data;
        let quotes:any = [["",{}]];
        quotes = Object.entries(this.meetingQuotes.quotes);
        this.quotesMorning = quotes.filter( x => x[1].hourIni && Number(x[1].hourIni.substring(0,2)) < 12 );
        this.quotesLate = quotes.filter( x => x[1].hourIni && Number(x[1].hourIni.substring(0,2)) > 12 );
			}
		)
  }

  selected(item:any){
    this.optionSelected = item[1];
  }

  async openIonModalLinkPago() {
    const modal = await this.modalController.create({
      component: ModalLinkPayComponent,
      componentProps: {
        id: this.meetingQuotes.price.id || this.meetingQuotes.publicationId,
      },
    });

    return await modal.present();
  }

}
