import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalCalendarioComponent } from 'src/app/shared/modal-calendario/modal-calendario.component';
import { ModalPosponerComponent } from 'src/app/shared/modal-posponer/modal-posponer.component';
import { ModalReservarComponent } from 'src/app/shared/modal-reservar/modal-reservar.component';
import { PublicationService } from 'src/services/api/publication.service';
import { Location } from '@angular/common';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { ModalCancelarComponent } from 'src/app/shared/modal-cancelar/modal-cancelar.component';
import { ModalCompletarComponent } from 'src/app/shared/modal-completar/modal-completar.component';
import { finalize } from 'rxjs/operators';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.page.html',
  styleUrls: ['./meeting-list.page.scss'],
})
export class MeetingListPage implements OnInit {

  public id: any;
  public title: any;
  public dataList: any = [];
  public page: any = 1;
  public pagination: any = {}
  public eventInfiniteScroll: any = null;
  public isLoading: boolean = true;
  public isStarting: boolean = false;

  constructor(
    public modalController: ModalController,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private toastHelper: ToastHelper,
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = JSON.parse(params.data).id;
      this.title = JSON.parse(params.data).title;
      this.getPublication();
    });
  }

  getPublication() {
    const page = this.page;
    this.publicationService.getDetailMeeting(this.id, page).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      (data) => {
        if (data.length == 0) {
          return
        }
        this.pagination = data.page;
        this.dataList = Array.from(new Set([...this.dataList, ...data.data]));
        if (this.eventInfiniteScroll) {
          this.eventInfiniteScroll.target.complete();
        }
      }
    )
  }

  doInfinite(event: any) {
    this.eventInfiniteScroll = event;
    this.page++;
    this.getPublication();
  }

  formatTime(date, hour, timezone) {
    let message = "";
    if (date) {
      message += date + ' - '
    }
    if (hour) {
      message += hour + ' - '
    }
    if (timezone) {
      message += timezone + ' - '
    }
    return message.substring(0, message.length - 3)
  }

  doAccess(url: string) {
    this.functionHelper.openUrl(url);
  }

  doDownload(id: number) {
    this.publicationService.putDownloadMeeting(id).subscribe((data) => {
      this.doAccess(data.url);
    })
  }

  start(id: number) {
    this.isStarting = true;
    this.publicationService.putMeetingStart(id).pipe(
      finalize(() => {
        this.isStarting = false;
      })
    )
      .subscribe((data) => {
        // console.log('data', data);
        if (data.success) {
          this.doAccess(data.streamUrl);
        }
        this.toastHelper.presentToastSuccess(data.streamStateInfo);
      },
        (error) => {
          this.toastHelper.presentToastError(error.error.message);
        });
  }

  async openIonModalReservar(item: any) {
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
        // console.log('data reserve', data);
        if (data.data) {
          this.dataList = [];
          this.page = 1;
          this.getPublication();
          this.modalController.dismiss();
        }
      }
    );

  }

  async openIonModalPosponer(item: any) {
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
      backdropDismiss: false
    });

    await modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        // console.log('data pospone', data);
        if (data.data) {
          this.dataList = [];
          this.page = 1;
          this.getPublication();
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

  async openIonModalCompletar(id: any) {
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
        // console.log('data', data);
        if (data.data) {
          this.dataList = [];
          this.page = 1;
          this.getPublication();
          this.modalController.dismiss();
        }
      }
    );
  }

  async openIonModalCancelar(id: any) {
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
        // console.log('data', data);
        if (data.data) {
          this.dataList = [];
          this.page = 1;
          this.getPublication();
          this.modalController.dismiss();
        }
      }
    );
  }
}
