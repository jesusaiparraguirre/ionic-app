import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ClassroomService } from 'src/services/api/classroom.service';
import { Messages } from 'src/services/utils/constants/messages.constant';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { isArray } from 'util';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-modal-valorization',
  templateUrl: './modal-valorization.component.html',
  styleUrls: ['./modal-valorization.component.scss'],
})
export class ModalValorizationComponent implements OnInit {

  public isLoading = false;
  public data: any = {
    id: 0,
    roomId: 0
  };
  public qualification = 0;
  public dataComments: any;
  public comments: any = [];
  public form: FormGroup;
  public messages = Messages;
  public page: any = 1;
  public eventInfiniteScroll: any = null;
  public dataRatingUser = {
    average: 0,
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    rating5: 0
  }
  public dataStarts = {
    roomId: 0,
    roomRatingUserId: 0,
    comment: "",
    ratingTotal: 0,
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    average: 0,
  }

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    public classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private toastHelper: ToastHelper
  ) { }

  ngOnInit() {
    this.data = this.navParams.get('data');
    this.initForm();
    this.init();
    this.dataStarts.roomId = this.data.id;
  }

  init() {
    //Valoración y comentarios
    this.classroomService.getValotarion(this.data.id).subscribe((data) => {
      if (data) {
        this.dataRatingUser = data;
      }
    })
    this.getValueValorization();
  }

  getValueValorization() {
    this.comments = [];
    this.classroomService.getValotarionStarts(this.data.id).subscribe((data) => {
      if (data) {
        this.dataStarts = data;
        this.dataStarts.question1 = Number(this.dataStarts.question1);
        this.dataStarts.question2 = Number(this.dataStarts.question2);
        this.dataStarts.question3 = Number(this.dataStarts.question3);
        this.dataStarts.question4 = Number(this.dataStarts.question4);
        this.dataStarts.roomRatingUserId = Number(this.dataStarts.roomRatingUserId);
        this.dataStarts.roomId = this.data.id;
        this.form.get('comment').patchValue(this.dataStarts.comment);
      }
    })
    this.classroomService.getValotarionComments(this.data.id).subscribe((data) => {
      if (data) {
        this.dataComments = data;
        if (this.dataComments.length != 0) {
          if (!isArray(this.dataComments.data)) {
            this.dataComments.data = Object.values(this.dataComments.data)
          }
          this.comments = Array.from(new Set([...this.comments, ...this.dataComments.data]));
          if (this.eventInfiniteScroll) {
            this.eventInfiniteScroll.target.complete();
          }
        }
      }
    })
  }

  initForm() {
    this.form = this.formBuilder.group({
      comment: [null, Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    //submit
    this.isLoading = true;
    let form = this.form;
    if (form.valid) {
      this.dataStarts.comment = this.f.comment.value;
      if (this.dataStarts.roomRatingUserId) {
        this.classroomService.putRatingValoration({
          roomId: this.dataStarts.roomId,
          comment: this.dataStarts.comment,
          question1: this.dataStarts.question1,
          question2: this.dataStarts.question2,
          question3: this.dataStarts.question3,
          question4: this.dataStarts.question4,
        }, this.dataStarts.roomRatingUserId).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
          data => {
            this.toastHelper.presentToastSuccess(data.message, 2000);
            this.getValueValorization();
          }, error => {
            this.toastHelper.presentToastError(error.message);
          }
        )
      } else {
        this.classroomService.postRatingValoration(this.dataStarts).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
          data => {
            this.toastHelper.presentToastSuccess(data.message, 2000);
            this.getValueValorization();
          }, error => {
            this.toastHelper.presentToastError(error.message);
          }
        )

      }
    }
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);

    const accordions = document.querySelectorAll('.accordion');

    const handleClick = accordion => () => {
      const prevState = accordion.selected;

      if (accordion.dataset.multiselect !== undefined && accordion.dataset.multiselect === 'disabled') {
        [].forEach.call(accordions, accordion => {
          accordion.selected = false;
        });
      }

      accordion.selected = !prevState;

      [].forEach.call(accordions, accordion => {
        const container = accordion.querySelector('.accordion__container');

        if (accordion.selected) {
          container.style.height = accordion.querySelector('.accordion__body').offsetHeight + 'px';
          accordion.setAttribute('aria-expanded', true);
          accordion.classList.add("activeItem");
        } else {
          container.style.height = null;
          accordion.setAttribute('aria-expanded', false);
          accordion.classList.remove("activeItem");
        }
      });
    };

    [].forEach.call(accordions, accordion => {
      accordion.querySelector('.accordion__head').addEventListener('click', handleClick(accordion));
    });
  }

  isInteger(ind: any, average: any) {
    let value = Number(average);
    if (ind == Math.round(value)) {
      return Number.isInteger(Number(value))
    }
    return true;
  }

  isDecimal(ind: any, average: any) {
    let value = Number(average);
    if (ind == Math.round(value) && !Number.isInteger(Number(value)) && Number(value.toFixed(1).toString().split('.')[1]) >= 5) {
      return true;
    }
    return false;
  }

  doInfinite(event: any) {
    this.eventInfiniteScroll = event;
    this.page++;
    this.init();
  }

}
