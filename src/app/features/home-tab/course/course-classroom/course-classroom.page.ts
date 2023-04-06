import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalLinkPayComponent } from 'src/app/shared/modal-link-pay/modal-link-pay.component';
import { ModalResourcesComponent } from 'src/app/shared/modal-resources/modal-resources.component';
import { ClassroomService } from 'src/services/api/classroom.service';
import {
  TypeClassroom,
  TypeResource,
} from 'src/services/utils/enum/typeResource.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { Location } from '@angular/common';
import { ItemHelper } from 'src/services/utils/helpers/item.helper';
import { Messages } from 'src/services/utils/constants/messages.constant';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/services';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { ModalAboutCourseComponent } from 'src/app/shared/modal-about-course/modal-about-course.component';
import { ModalMaterialsComponent } from 'src/app/shared/modal-materials/modal-materials.component';
import {
  IDataRoom,
  IDatum,
  IResource,
  ISidebarPublicationsCampaign,
  Item,
} from 'src/app/interface/data-room.interface';
import { Observable, of, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-classroom',
  templateUrl: './course-classroom.page.html',
  styleUrls: ['./course-classroom.page.scss'],
})
export class CourseClassroomPage implements OnInit, OnDestroy {
  public segment: string = 'contenido';
  public id: number = 0;
  public slug: string = '';
  public dataCourse: IDataRoom | undefined;

  public $dataRoom: Observable<IResource | any> | undefined;
  public $dataSide: Observable<IDatum[] | any> | undefined;

  public publications: ISidebarPublicationsCampaign[] = [];
  public typesClassroom = TypeClassroom;
  public typesResource = TypeResource;
  public type: string | undefined | null;
  public dateNow = new Date();
  public seeTransmissionPast = false;
  public isJwPlayer = false;
  public videoTest = null;
  public isErrorData = false;
  public isLoading: Boolean = true;
  public drip: ISidebarPublicationsCampaign | null = null;
  public keySelect: string = '';
  availableResource: boolean;

  constructor(
    public modalController: ModalController,
    public classroomService: ClassroomService,
    public activatedRoute: ActivatedRoute,
    public toastHelper: ToastHelper,
    public sanitizer: DomSanitizer,
    public location: Location,
    public itemHelper: ItemHelper,
    private loaderService: LoaderService,
    private functionHelper: FunctionHelper
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
  }

  ionViewWillEnter() {
    // console.log('===classroom 1===');
    // console.log('type', this.type);
  }

  init(slug: any) {
    this.$dataSide = of(null);
    this.classroomService
      .getClassRoomDetail(slug)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: IDataRoom) => {
          const { resource, sidebar } = data;
          this.availableResource =
            Array.isArray(resource) && Array.isArray(sidebar);
          this.dataCourse = data;
          if (this.availableResource) {
            this.type = this.typesClassroom.session;
            const message = (data.message || '').toUpperCase();
            this.$dataRoom = of({
              message: message || 'RECURSO NO DISPONIBLE',
              type: null,
              url: data.url,
            });
            // data sidebar
            this.$dataSide = of([]);
          } else {
            data.resource.typeClassroom = sidebar.type;
            this.type = this.typeSidebar(sidebar);
            // drip
            this.dripPublicationCampaign(data, sidebar.publicationId);
            // data sidebar
            this.$dataSide = of(
              this.formatSidebarData(sidebar.data, this.drip, resource.key)
            );
            // format resource
            this.formatResourcesRoom(resource);
          }
        },
        (error) => {
          this.toastHelper.presentToastError(Messages.ERROR_API, 3000);
          this.location.back();
        }
      );
  }

  typeSidebar(sidebar): string {
    const dataSidebar = sidebar.data[0];
    if (dataSidebar && dataSidebar.items && dataSidebar.items.length > 0) {
      return this.typesClassroom.module;
    } else {
      return this.typesClassroom.session;
    }
  }

  dripPublicationCampaign(data, publicationId: string) {
    if (data.sidebarPublicationsCampaign) {
      this.slug = publicationId;
      this.publications = data.sidebarPublicationsCampaign;
      this.drip = data.sidebarPublicationsCampaign.filter(
        (p) => p.id == publicationId && p.state === false
      )[0];
    }
  }

  formatResourcesRoom(resource: IResource) {
    if (this.drip || resource.access == false) {
      let dateAvailable: string | undefined;
      if (this.drip && this.drip.dateAvailable) {
        dateAvailable = this.drip.dateAvailable;
      } else {
        dateAvailable = resource.message;
      }
      const dripH: any = {
        name: resource.title,
        slug: this.slug,
        dateAvailable: dateAvailable,
        type: null,
      };
      this.$dataRoom = of(dripH);
    } else {
      const dataResource = this.dataCourse.resource;
      this.keySelect = dataResource.key;
      this.$dataRoom = of(dataResource);
    }
  }

  /**  */
  formatSidebarData(
    sidebarData: IDatum[],
    drip: ISidebarPublicationsCampaign | null,
    key: string
  ): IDatum[] {
    // console.log(sidebarData, 'sidebarDatasidebarDatasidebarData');
    if (!Array.isArray(sidebarData)) {
      return [];
    }
    return (sidebarData || []).map((sid: IDatum) => {
      sid.isOpen = sid.key === key ? true : false;
      sid.existItems = Array.isArray(sid.items) && sid.items.length > 0;
      if (drip) {
        sid.status = drip.state || false;
        sid.dateAvailable = drip.dateAvailable; //||  sid.dateAvailable;
        sid.dripState = drip.dripState;
      } else {
        sid.existMaterial = this.existMaterial(sid);
        sid.duration = sid.duration || '00';
        sid.items = sid.items || [];
        sid.dripState = sid.statusDrip;
        if (Array.isArray(sid.items) && sid.items.length > 0 && !drip) {
          sid.items.map((itemSidebar: Item) => {
            if (!sid.isOpen) sid.isOpen = itemSidebar.key == key ? true : false;
            itemSidebar.duration = itemSidebar.duration || '00';
            itemSidebar.existMaterial = this.existMaterial(itemSidebar);
            return itemSidebar;
          });
        }
      }
      return sid;
    });
  }

  existMaterial(sid: IDatum | Item): boolean {
    let material: boolean = false;
    if (sid.attachments) {
      material =
        sid.attachments.materials ||
        sid.attachments.schemes ||
        sid.attachments.task.length > 0
          ? true
          : false;
    }
    return material;
  }

  /**
   * course - advanced
   * @returns
   */
  changeSelectPublication() {
    this.drip = null;
    this.slug = this.slug;
    if (!(this.slug && (this.slug || this.id))) {
      return;
    }
    // filter data drip
    this.drip = this.publications.filter(
      (p) => p.id == this.slug && !p.state
    )[0];
    this.type = null;

    this.$dataRoom = of(null);
    this.$dataSide = of(null);

    this.classroomService
      .getClassRoomSidebar(
        this.slug,
        this.dataCourse ? this.dataCourse.id : undefined
      )
      .subscribe(
        async (data) => {
          // resource view
          const dataResource = data.resource.resource;
          // data side||
          this.$dataSide = of(
            this.formatSidebarData(
              data.sidebar.data,
              this.drip,
              dataResource.key
            )
          );
          // view type sidebar "module or session"
          // const dataSidebar = data.sidebar.data[0];
          // if (
          //   dataSidebar &&
          //   dataSidebar.items &&
          //   dataSidebar.items.length > 0
          // ) {
          //   this.type = this.typesClassroom.module;
          // } else {
          //   this.type = this.typesClassroom.session;
          // }
          this.type = this.typeSidebar(data.sidebar);

          if (
            (Array.isArray(dataResource) && dataResource.length > 0) ||
            !dataResource
          ) {
            const dateAvailable =
              'No tiene acceso a este recurso, le sugerimos adquirir!';
            const dripH: any = {
              id: '',
              name: data.resource.title,
              slug: this.slug,
              dateAvailable: dateAvailable,
              type: null,
            };
            this.$dataRoom = of(dripH);
          } else {
            if (this.drip || dataResource.access == false) {
              if (!dataResource.access) {
                this.$dataRoom = of({
                  message:
                    data.resource.message || 'NO TIENE ACCESO A ESTE RECURSO',
                });
              } else {
                const dripH: any = {
                  name: data.resource.title,
                  slug: this.slug,
                  dateAvailable:
                    this.drip.dateAvailable || 'NO TIENE ACCESO A ESTE RECURSO',
                  type: null,
                  dripState: true,
                };
                this.$dataRoom = of(dripH);
              }
            } else {
              this.keySelect = dataResource.key;
              // this.secondsAdvanced = Number(dataResource.duration);
              this.$dataRoom = of(dataResource);
            }
          }
        },
        (err) => {
          // console.log(err, 'error 2');
          if (err.error && err.error.message) {
            this.$dataSide = of([]);
            this.$dataRoom = of({
              message: err.error.message,
              type: null,
              // url: err.url
            });
          }
        }
      );
  }

  getroom(data: { key: string; nextKey: string }) {
    // console.log(data, 'data room');
    // this.getRoomProgress();
    if (!data) {
      return;
    }
    if (data.key) {
      // this.updateViewState(data.key);
    }
    if (data.nextKey) {
      const element = document.getElementById(data.nextKey);
      // console.log(element, 'element');
      if (element) {
        element.click();
      }
      // console.log(data, 'data next key');
    }
  }

  // // update status view
  // updateViewState(key: string): void {

  //   this.dataSidebar.sidebar.data.map((sid: IDatum) => {
  //     if (sid.key === key && sid.user) {
  //       sid.user.viewed = true;
  //     }
  //     sid.items.map((itemSidebar: IDatum) => {
  //       if (itemSidebar.key === key && itemSidebar.user) {
  //         itemSidebar.user.viewed = true;
  //       }
  //     });
  //   });

  // }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
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

  async openIonModalLinkPago(item: any) {
    const modal = await this.modalController.create({
      component: ModalLinkPayComponent,
    });

    return await modal.present();
  }

  openToggle() {
    // console.log('openToggle');
  }

  async chooseSesion(item: any) {
    this.isErrorData = false;
    this.drip = null;
    if (!item.status) {
      this.drip = item;
      const roomType = null;
      let dateAvailable: string = '';
      if (item.statusDrip || !item.dateAvailable) {
        dateAvailable = 'No tiene acceso a este recurso';
      } else {
        dateAvailable = item.dateAvailable;
      }
      this.$dataRoom = of({
        ...this.drip,
        dateAvailable,
        type: roomType,
      });
    } else {
      this.getDataRoom(item);
    }
  }

  getDataRoom(item: any) {
    this.isErrorData = false;
    // console.log(item);
    // this.dataResource = null;
    const key = item.nextKey || item.key;
    this.$dataRoom = of(null);
    this.classroomService
      .getClassroomPlayer(key)
      .pipe(finalize(() => {}))
      .subscribe(
        (data) => {
          // this.isErrorData = false;
          if (data.resource.access) {
            data.resource.typeClassroom = this.type;
            const dataResource = data.resource;
            // console.log(this.dataResource);
            // this.secondsAdvanced = Number(dataResource.duration);
            // if (
            //   item.user &&
            //   !item.user.viewed &&
            //   (dataResource.type == this.typesResource.image ||
            //     dataResource.type == this.typesResource.live)
            // ) {
            //   // this.advance(item, data.resource.id);
            // }
            this.keySelect = dataResource.key;
            this.$dataRoom = of(dataResource);
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

  // advance(item?: any, id?) {
  //   if (!id) {
  //     return;
  //   }
  //   let dataSend = {
  //     start: true,
  //     secondsAdvanced: this.secondsAdvanced,
  //     resourceId: id,
  //     complete: true,
  //   };
  //   this.classroomService.postClassroomAdvanced(dataSend).subscribe((data) => {
  //     if (item) item.user.viewed = true;
  //     if (data.key) {
  //       // let dataEmit = {
  //       //   type: this.type,
  //       //   item: data.key,
  //       // };
  //       // this.itemHelper.itemEmit$.emit(dataEmit);
  //     }
  //   });
  // }

  openUrl(url: string) {
    this.functionHelper.openUrl(url);
  }

  // getLinkMedia() {
  //   let link: any = this.dataResource.media.file;
  //   if (Array.isArray(link)) {
  //     link = link[0]
  //   }
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  // }

  //More content
  async openIonModalMateriales() {
    const modal = await this.modalController.create({
      component: ModalMaterialsComponent,
      componentProps: {
        data: this.dataCourse ? this.dataCourse.id : undefined,
      },
    });

    return await modal.present();
  }

  async openIonModalSobreCurso() {
    const modal = await this.modalController.create({
      component: ModalAboutCourseComponent,
      componentProps: {
        data: this.dataCourse ? this.dataCourse.id : undefined,
      },
    });

    return await modal.present();
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
    const customDropdown: HTMLElement | null =
      document.getElementById('customDropdown');
    customDropdown && customDropdown.classList.toggle('show');
  }

  async openValoration() {
    // const modal = await this.modalController.create({
    //   component: ModalValorizationComponent,
    //   componentProps: {
    //     data: {
    //       id: this.dataCourse.id,
    //       roomId: this.id
    //     },
    //   }
    // });
    // await modal.present();
    // return modal.onDidDismiss().then(
    //   (data: any) => {
    //     if (data) {
    //       this.init(this.dataCourse.slug);
    //       this.modalController.dismiss();
    //     }
    //   }
    // );
  }
}
