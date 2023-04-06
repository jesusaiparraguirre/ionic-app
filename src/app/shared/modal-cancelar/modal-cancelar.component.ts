import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PublicationService } from 'src/services/api/publication.service';
import { AlertHelper } from 'src/services/utils/helpers/alert.helper';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';

@Component({
  selector: 'app-modal-cancelar',
  templateUrl: './modal-cancelar.component.html',
  styleUrls: ['./modal-cancelar.component.scss'],
})
export class ModalCancelarComponent implements OnInit {

  public id:any;
  public isLoad: boolean = false;

  constructor(
    private modalController: ModalController,
    private publicationService: PublicationService,
    private navParams: NavParams,
    private toastHelper: ToastHelper,
    private alertHelper: AlertHelper,
  ) { }

  ngOnInit() {
    this.id = this.navParams.get("id");
  }

  async closeModel( data = false ) {
    const close: boolean = data;
    await this.modalController.dismiss(close);
  }

  async doAction(){
    this.isLoad = true;
    this.publicationService.putMeetingCancelled(this.id).pipe( 
      finalize(() => {
        this.isLoad = false;
      })
      ).subscribe(
        (data) => {
          this.alertHelper.alertSingleOption(
            true,
            data.message || "Mentoría cancelada correctamente",
            () => { this.closeModel(true); }
          )
      },
      (error) => {
        this.alertHelper.alertSingleOption(
          true,
          error.error.message,
          () => { }
        )
      }
    )
  }

}
