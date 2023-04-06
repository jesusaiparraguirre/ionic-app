import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { PublicationService } from 'src/services/api/publication.service';
import { finalize } from 'rxjs/operators';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { AlertHelper } from 'src/services/utils/helpers/alert.helper';

@Component({
  selector: 'app-modal-reservar',
  templateUrl: './modal-reservar.component.html',
  styleUrls: ['./modal-reservar.component.scss'],
})
export class ModalReservarComponent implements OnInit {
  public dataListMentors: any = [];
  public dataListDates: any = [];
  public dataListHours: any = [];
  public sendForm: FormGroup;
  public isActiveMentor: boolean = true;
  public isLoad: boolean = false;
  public id: any = 0;
  public publicationId: any = 0;
  public quotesId: any = 0;
  public paid: any = 0;
  public productoId: any = 0;
  public timezone: any = '';

  constructor(
    private modalController: ModalController,
    private publicationService: PublicationService,
    private fb: FormBuilder,
    public navParams: NavParams,
    private toastHelper: ToastHelper,
    private alertHelper: AlertHelper,
  ) {
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.isActiveMentor = this.navParams.get('reserve_product');
    this.publicationId = this.navParams.get('publicationId'); //Sesión
    this.paid = this.navParams.get('payment');
    this.quotesId = this.navParams.get('quotesId');
    this.timezone = this.navParams.get('timezone');
    this.initForm();
  }

  async closeModel(data = false) {
    const close: boolean = data;
    await this.modalController.dismiss(close);
  }

  async initForm() {
    this.sendForm = this.fb.group({
      publicationId: [
        { value: null, disabled: true }, //mentor
        Validators.compose([Validators.required]),
      ],
      date: [
        { value: '', disabled: true },
        Validators.compose([Validators.required]),
      ],
      hour: [
        { value: '', disabled: true },
        Validators.compose([Validators.required]),
      ],
      id: [{ value: this.navParams.get('id'), disabled: false },
      Validators.compose([Validators.required]),
      ],
      quotesId: [{ value: this.navParams.get('quotesId'), disabled: false },
      Validators.compose([Validators.required]),
      ],
      payment: [{ value: this.navParams.get('payment'), disabled: false },
      Validators.compose([Validators.required]),
      ],
    });

    if (this.isActiveMentor) {
      this.listMentors();
    } else {
      this.listDate();
    }
  }

  listMentors() {
    this.publicationService.getPublicationMentor(this.publicationId, this.paid, this.quotesId).subscribe(
      (data) => {
        this.dataListMentors = data.product;
        this.sendForm.get('publicationId').enable();
      },
      (error) => {
        this.toastHelper.presentToastError(error.error.message);
      }
    );
  }

  listDate() {
    this.productoId = this.isActiveMentor ? this.sendForm.get('publicationId').value : this.publicationId;
    this.publicationService
      .getPublicationQuotesInterval(this.productoId, this.timezone, this.id)
      .subscribe((data) => {
        this.dataListHours = [];
        this.dataListDates = data.dates;
        this.sendForm.get('date').enable();
        this.sendForm.get('hour').disable();
        this.sendForm.patchValue({
          date: null,
          hour: null,
        });

        if (data.message) {
          this.toastHelper.presentToastError(data.message || 'No hay fechas disponibles para reservar');
          this.closeModel();
        }
      },
        (error) => {
          this.toastHelper.presentToastError(error.error.message);
        });
  }

  listHour() {
    this.publicationService
      .getPublicationQuotesDayReserve(this.productoId, this.timezone, this.sendForm.get('date').value)
      .subscribe((data) => {
        this.dataListHours = data.data.quotes;
        this.sendForm.get('hour').enable();
        this.sendForm.patchValue({
          hour: null,
        });
        if (data.message) {
          this.toastHelper.presentToastError(data.message || 'No hay horas disponibles para reservar, intente con otra fecha');
        }
      },
        (error) => {
          this.toastHelper.presentToastError(error.error.message);
        }
      );
  }

  save() {
    if (this.sendForm.invalid) {
      return;
    }

    let sendForm: any = {
      type: 'reserve',
      timeZone: this.timezone,
      quotesId: this.quotesId,
      paid: this.paid,
      time: this.sendForm.get('hour').value.hourIni + ' - ' + this.sendForm.get('hour').value.hourFin,
      date: this.sendForm.get('date').value,
      productoId: this.productoId,
      reservationId: this.id
    }

    this.isLoad = true;

    this.publicationService.postReserve(sendForm, this.id)
      .pipe(
        finalize(() => {
          this.isLoad = false;
        })
      )
      .subscribe((data) => {
        this.alertHelper.alertSingleOption(
          true,
          data.message || "Mentoría reservada correctamente",
          () => { this.closeModel(true); }
        )
      },
        (error) => {
          this.alertHelper.alertSingleOption(
            true,
            error.error.message,
            () => { }
          )
        });
  }
}
