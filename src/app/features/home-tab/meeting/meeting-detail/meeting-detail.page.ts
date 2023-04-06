import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { ModalSelectHourComponent } from "../../../../shared/modal-select-hour/modal-select-hour.component";
import { PublicationService } from '../../../../../services/api/publication.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ModalLinkPayComponent } from 'src/app/shared/modal-link-pay/modal-link-pay.component';
import { environment } from '../../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.page.html',
  styleUrls: ['./meeting-detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MeetingDetailPage implements OnInit {

	id: any = null;
	meeting: any = null;
	hourLocal : any = new Date().getHours() ;
	minLocal : any = new Date().getMinutes() ;
	public environment: any;
  	constructor(
		public modalController: ModalController,
		private activatedRoute: ActivatedRoute,
		private publicationService: PublicationService,
		public location: Location
	) {
		this.minLocal = this.formatNumberDate(this.minLocal);
		this.environment = environment;
  	}

  	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.id = params.data;
			this.getPublication();
		});
  	}

  	async openIonModalCalendario(e:any) {
	    const modal = await this.modalController.create({
	      	component: ModalSelectHourComponent,
			componentProps: {
				id: this.id,
				date: e.date,
			}
	    });

	    return await modal.present();
	}

	async openIonModalLinkPago(id:any) {
		const modal = await this.modalController.create({
		  component: ModalLinkPayComponent,
		  componentProps: {
			id: id,
		  },
		});
	
		return await modal.present();
	  }

	getPublication() {
		this.publicationService.getPublicationDetail(this.id).subscribe(
			data => {
				// console.log('MEETING', data);
				this.meeting = data;
				if(this.meeting.dateInterval){
					this.getDatePublication(this.meeting);
				}
			}
		)
	}

	formatNumberDate(data: number){
		return ("0" + data).slice(-2);
	}

	listAuthors(authors: any) {
		let list = '';
		authors.forEach(author => {
		list = list + ', ' + author.name;
		});
		return list.substring(1);
	}

	getDatePublication(meeting:any){
		const variable = this;
		$(document).ready(function() {
	  		var dayIni = meeting.dateInterval.dayIni;
          	var dayEnd = meeting.dateInterval.dayFin;
          	var quotesDisabled = meeting.dateUnavailable ? meeting.dateUnavailable : [];
	      	$('#datepickerMent').datepicker({
	         	language: "es",
	            todayHighlight: true,
	            format: "yyyy-mm-dd",
	            startDate : dayIni,
	            endDate   : dayEnd,
	            datesDisabled: quotesDisabled,
	            beforeShowDay: function (date) { 
	              return { content: '<button>' + date.getDate() + '</button>' };
	            }
	       	}).on('changeDate', function(e) {  
				//    console.log('e',e); 
			    variable.openIonModalCalendario(e);
			});
	    });
	}
}
