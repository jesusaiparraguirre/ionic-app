import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCalendarioComponent } from 'src/app/shared/modal-calendario/modal-calendario.component';
import { ModalCancelarComponent } from 'src/app/shared/modal-cancelar/modal-cancelar.component';
import { ModalCompletarComponent } from 'src/app/shared/modal-completar/modal-completar.component';
import { ModalPosponerComponent } from 'src/app/shared/modal-posponer/modal-posponer.component';
import { ModalReservarComponent } from 'src/app/shared/modal-reservar/modal-reservar.component';
import { SessionEmailService } from 'src/services/api/session-email.service';
import { PublicationService } from 'src/services/api/publication.service';
import { Location } from '@angular/common';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { finalize } from 'rxjs/operators';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';

@Component({
  selector: 'app-my-meeting',
  templateUrl: './my-meeting.page.html',
  styleUrls: ['./my-meeting.page.scss'],
})
export class MyMeetingPage implements OnInit {

  public dataList:any = []
  public page: any = 1;
  public pagination: any = {}
  public eventInfiniteScroll: any = null;
  public isLoading: boolean = true;
  public isStarting: boolean = false;

  constructor(
    public modalController: ModalController,
    private sessionEmailService: SessionEmailService,
    private publicationService: PublicationService,
    private toastHelper:ToastHelper,
    public location: Location,
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
    this.init();
  }

  init(){
    const page = this.page;
    this.sessionEmailService.myMeetings(page).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      (data) => {
        if(data.length == 0){
          return
        }
        this.pagination = data.page;
        this.dataList = Array.from(new Set([...this.dataList, ...data.data]));
        // console.log('dataList',this.dataList);
        if (this.eventInfiniteScroll) {
          this.eventInfiniteScroll.target.complete();
        }
      }
    )
  }

  formatTime(date, hour){
    let message = "";
    if(date){
      message+=date + ' - '
    }
    if(hour){
      message+=hour + ' - '
    }
    return message.substring(0,message.length-3)
  }

  doInfinite(event: any) {
    this.eventInfiniteScroll = event;
    this.page++;
    this.init();
  }

  doAccess(url:string){
    this.functionHelper.openUrl(url);
  }
  
  doDownload(id:number){
    this.publicationService.putDownloadMeeting(id).subscribe((data)=>{
      // console.log('data',data);
      /* if (data.password) data.url = `${data.url}?pwd=${encodeURI(data.password)}` */
      this.doAccess(data.url);
    })
  }

  start(id:number){
    this.isStarting = true;
    this.publicationService.putMeetingStart(id).pipe(
      finalize(() => {
        this.isStarting = false;
      })
    )
    .subscribe( (data) => {
      // console.log('data',data);
      if(data.success){
        this.doAccess(data.streamUrl);
      }
      this.toastHelper.presentToastSuccess(data.streamStateInfo);
    },
    (error) => {
      this.toastHelper.presentToastError(error.error.message);
    }); 
  }

  async openIonModalReservar(item:any) {
    const modal = await this.modalController.create({
      component: ModalReservarComponent,
      componentProps: {
        id: item.id,
        publicationId: item.publicationId,
        reserve_product: item.action.reserve_product ? item.action.reserve_product : false,
        payment: item.payment,
        quotesId: item.quotesId,
        timezone: item.timezone,
      },
      backdropDismiss: false,
    });

    await modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        // console.log('data',data);
        if(data.data){
          this.dataList = [];
          this.page = 1;
          this.init();
          this.modalController.dismiss();
        }
      }
    );
  }

  async openIonModalPosponer(item:any) {
    const modal = await this.modalController.create({
      component: ModalPosponerComponent,
      componentProps: {
        id: item.id,
        publicationId: item.publicationId,
        reserve_product: item.action.reserve_product ? item.action.reserve_product : false,
        payment: item.payment,
        quotesId: item.quotesId,
        timezone: item.timezone,
      },
      backdropDismiss: false,
    });

    await modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        // console.log('data',data);
        if(data.data){
          this.dataList = [];
          this.page = 1;
          this.init();
          this.modalController.dismiss();
        }
      }
    );
  }

  async openIonModalCalendario() {
    const modal = await this.modalController.create({
      component: ModalCalendarioComponent
    });

    return await modal.present();
  }

  async openIonModalCompletar(id:any) {
    const modal = await this.modalController.create({
      component: ModalCompletarComponent,
      componentProps: {
        id: id
      },
      backdropDismiss: false,
    });

    await modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        // console.log('data',data);
        if(data.data){
          this.dataList = [];
          this.page = 1;
          this.init();
          this.modalController.dismiss();
        }
      }
    );
  }

  async openIonModalCancelar(id:any) {
    const modal = await this.modalController.create({
      component: ModalCancelarComponent,
      componentProps: {
        id: id 
      },
      backdropDismiss: false,
    });

    await modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        // console.log('data',data);
        if(data.data){
          this.dataList = [];
          this.page = 1;
          this.init();
          this.modalController.dismiss();
        }
      }
    );
  }
}
