import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from 'src/services/api/classroom.service';
import { LoaderService } from 'src/services';
import { Messages } from 'src/services/utils/constants/messages.constant';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { Location } from '@angular/common';
import {
  TypeClassroom,
  TypeResource,
} from 'src/services/utils/enum/typeResource.enum';
import { ModalController } from '@ionic/angular';
import { ModalMaterialsComponent } from 'src/app/shared/modal-materials/modal-materials.component';
import { ModalAboutCourseComponent } from 'src/app/shared/modal-about-course/modal-about-course.component';
// import { ModalValorizationComponent } from 'src/app/shared/modal-valorization/modal-valorization.component';
import { ModalResourcesComponent } from 'src/app/shared/modal-resources/modal-resources.component';
import { ItemHelper } from 'src/services/utils/helpers/item.helper';
import { finalize } from 'rxjs/operators';
import { LeadGodsService } from '../../../../../services/api';
import {
  IDataRoom,
  IDatum,
  IResource,
} from 'src/app/interface/data-room.interface';
import { Observable, of } from 'rxjs';
import { FormatHelper } from 'src/services/utils/helpers/format.helper';

@Component({
  selector: 'app-event-classroom',
  templateUrl: './event-classroom.page.html',
  styleUrls: ['./event-classroom.page.scss'],
})
export class EventClassroomPage implements OnInit, OnDestroy {
  public $dataRoom: Observable<IResource | any> | undefined;

  public segment: string = 'contenido';
  public id: number = 0;
  public slug: string = '';
  // public dataEvent: any = {};
  // public dataResource: any = [];
  public dataSessions: IDatum[];
  public typesClassroom = TypeClassroom;
  public typesResource = TypeResource;
  public type;
  public isErrorData = false;
  private secondsAdvanced: number = 0;
  public isLoading: Boolean = true;
  public timezone: any = [];
  public timezoneSelected: any = 'America/Lima';
  public eventId: number;
  public title: string = '';
  public keySelect: string;
  private resource: IResource;

  // this.resourceAux ;

  constructor(
    public classroomService: ClassroomService,
    public activatedRoute: ActivatedRoute,
    public toastHelper: ToastHelper,
    public location: Location,
    public modalController: ModalController,
    public itemHelper: ItemHelper,
    private loaderService: LoaderService,
    public leadGodsService: LeadGodsService,
    public formatHelper: FormatHelper
  ) {}

  ngOnDestroy() {
    this.loaderService.automatic = true;
  }

  ngOnInit() {
    this.loaderService.automatic = false;
    this.activatedRoute.params.subscribe((params) => {
      let data = JSON.parse(params.data);
      this.slug = data.slug;
      this.id = data.id;
      this.init(this.slug);
    });
    this.leadGodsService.getTimeZone().subscribe((data) => {
      this.timezone = data;
    });
  }

  init(slug: any) {
    this.classroomService
      .getClassRoomDetail(slug)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: IDataRoom) => {
          if (data.sidebar.data.length == 0) {
            this.toastHelper.presentToastError(
              'El evento no tiene sesiones vigentes.',
              3000
            );
            this.location.back();
          } else {
            // console.log('EVENT CLASSROOM...', data);
            // this.dataEvent = data;
            this.dataSessions = data.sidebar.data.map((r) => {
              r.dateStream = this.formatHelper.formatDateLong(
                r.dateStream,
                this.timezoneSelected
              );
              return r;
            });
            this.type = data.sidebar.type;
            this.title = data.title;
            this.keySelect = data.resource.key;
            // this.id = data.id;
            // this.dataResource = this.dataEvent.resource;
            this.$dataRoom = of(data.resource);
            this.eventId = data.id;
          }
        },
        (error) => {
          this.toastHelper.presentToastError(Messages.ERROR_API, 3000);
          this.location.back();
        }
      );
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  //More content
  async openIonModalMateriales() {
    const modal = await this.modalController.create({
      component: ModalMaterialsComponent,
      componentProps: {
        data: this.eventId, //this.dataEvent.id,
      },
    });

    return await modal.present();
  }

  async openIonModalSobreCurso() {
    const modal = await this.modalController.create({
      component: ModalAboutCourseComponent,
      componentProps: {
        data: this.eventId, //this.dataEvent.id,
      },
    });

    return await modal.present();
  }

  async openIonValoracion() {
    // const modal = await this.modalController.create({
    //   component: ModalValorizationComponent
    // });
    // return await modal.present();
  }

  async openIonModalRecursos(item: any) {
    const modal = await this.modalController.create({
      component: ModalResourcesComponent,
      componentProps: {
        data: item,
      },
    });

    return await modal.present();
  }

  async chooseSesion(dataChoose: any) {
    // console.log(dataChoose, 'itemmmm');
    this.$dataRoom = of(null);
    if (!dataChoose.status) {
      setTimeout(() => {
        this.$dataRoom = of({
          access: false,
          message: 'NO TIENE ACCESO A ESTE RECURSO',
        });
      }, 100);
    } else {
      this.getData(dataChoose.item);
    }
  }

  getData(item: any) {
    this.classroomService
      .getClassroomPlayer(item.key)
      .pipe(finalize(() => {}))
      .subscribe(
        (data) => {
          this.isErrorData = false;
          if (data.resource.access) {
            data.resource.typeClassroom = this.type;
            this.keySelect = data.resource.key;
            // this.dataResource = data.resource;
            // this.secondsAdvanced = this.dataResource.duration;

            // if (
            //   !item.user.viewed &&
            //   (this.dataResource.type == this.typesResource.image ||
            //     this.dataResource.type == this.typesResource.live)
            // ) {
            this.advance(item, data.resource.id);
            // }
            this.resource = data.resource;
            this.$dataRoom = of(data.resource);
          } else {
            this.toastHelper.presentToastError(
              Messages.MESSAGE_NOT_ACCESS_SESSION
            );
          }
        },
        (error) => {
          this.isErrorData = true;
        }
      );
  }

  advance(item?: any, id?) {
    if (!id) {
      return;
    }
    let dataSend = {
      start: true,
      secondsAdvanced: this.secondsAdvanced,
      resourceId: id,
      complete: true,
    };
    this.classroomService.postClassroomAdvanced(dataSend).subscribe((data) => {
      if (item) item.user.viewed = true;
      if (data.key) {
        let dataEmit = {
          type: this.type,
          item: data.key,
        };
        // this.itemHelper.itemEmit$.emit(dataEmit);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target == document.getElementById('btnToggle'))) {
      var dropdowns = document.getElementsByClassName('dropdown-content');
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  activeDropdown() {
    document.getElementById('customDropdown').classList.toggle('show');
  }

  timeZoneChange() {
    // this.$dataRoom = of(null);
    const codeSelect = this.timezone.filter(
      (x) => x.timezone == this.timezoneSelected
    )[0];
    this.leadGodsService
      .getHourTimeZone(this.eventId, codeSelect.code)
      .subscribe(
        (res) => {
          const { data } = res.sidebar;
          this.dataSessions = (data || []).map((r) => {
            r.dateStream = this.formatHelper.formatDateLong(
              r.dateStream,
              this.timezoneSelected
            );
            return r;
          });
          this.type = res.sidebar.type;

          // const resourceActive = (data || []).filter(
          //   (d) => d.key === this.keySelect
          // )[0];
          // console.log(resourceActive, 'resourceActive-resourceActive');
          // if (resourceActive && resourceActive.status) {
          //   console.log(this.resource, 'this.resource-this.resource');
          //   // console.log(resourceActive.dateStream, 'resourceActive.dateStream');
          //   this.resource.media.dateStream = resourceActive.dateStream;
          //   this.$dataRoom = of(this.resource);
          // } else {
          //   this.$dataRoom = of({
          //     access: false,
          //     message: 'NO TIENE ACCESO A ESTE RECURSO',
          //   });
          //   return;
          // }
        },
        (error) => {
          this.toastHelper.presentToastError(Messages.ERROR_API, 3000);
          this.location.back();
        }
      );
  }
}
