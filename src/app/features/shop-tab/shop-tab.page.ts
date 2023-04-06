import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ModalReservarComponent } from "../../shared/modal-reservar/modal-reservar.component";
import { ModalPosponerComponent } from "../../shared/modal-posponer/modal-posponer.component";
import { ModalCalendarioComponent } from "../../shared/modal-calendario/modal-calendario.component";
import { ModalCompletarComponent } from "../../shared/modal-completar/modal-completar.component";
import { ModalCancelarComponent } from "../../shared/modal-cancelar/modal-cancelar.component";
import { ModalController, NavController } from "@ionic/angular";
import { ShoppingService } from "../../../services/api/shopping.service";
import { PublicationTypeService } from "src/services/api/publication-type.service";
import { finalize } from "rxjs/operators";
import { FormatHelper } from "src/services/utils/helpers/format.helper";

@Component({
  selector: "app-shop-tab",
  templateUrl: "./shop-tab.page.html",
  styleUrls: ["./shop-tab.page.scss"],
})
export class ShopTabPage implements OnInit {
  public segment: string = "";
  public data: any = null;
  public publications: Array<any> = [];
  public type = "";
  public keyword = "";
  public page: any = 1;
  public eventInfiniteScroll: any = null;
  public dataSegment = [{ id: "", name: "Todos" }];
  public isLoading = false;
  
  constructor(
    public modalController: ModalController,
    private shoppingService: ShoppingService,
    private publicationTypeService: PublicationTypeService,
    private navController: NavController,
    public formatHelper: FormatHelper
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initTypesPublication();
    this.getShopping();
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ionViewWillLeave() {
    this.dataSegment = [{ id: "", name: "Todos" }];
    this.publications = [];
    this.segment = "";
    this.keyword = "";
    this.type = "";
    this.page = 1;
  }

  getShopping() {
    const page = this.page;
    const keyword = this.keyword;
    const type = this.type;
    this.isLoading = true;
    this.shoppingService
      .getShopping(page, keyword, type)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.publications = Array.from(new Set([...this.publications, ...this.data.data]));
        if (this.eventInfiniteScroll) {
          this.eventInfiniteScroll.target.complete();
        }
        // console.log("DATA", this.data);
      });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.publications = [];
      this.getShopping();
      event.target.complete();
    }, 2000);
  }

  initTypesPublication() {
    this.publicationTypeService.getTypePublication().subscribe((data) => {
      this.dataSegment.push(...data);
    });
  }

  changeType(type: any) {
    this.page = 1;
    this.type = type;
    this.eventInfiniteScroll = null;
    this.publications = [];
    this.getShopping();
  }

  async openIonModalReservar() {
    const modal = await this.modalController.create({
      component: ModalReservarComponent,
    });

    return await modal.present();
  }

  async openIonModalPosponer() {
    const modal = await this.modalController.create({
      component: ModalPosponerComponent,
    });

    return await modal.present();
  }

  async openIonModalCalendario() {
    const modal = await this.modalController.create({
      component: ModalCalendarioComponent,
    });

    return await modal.present();
  }

  async openIonModalCompletar() {
    const modal = await this.modalController.create({
      component: ModalCompletarComponent,
    });

    return await modal.present();
  }

  async openIonModalCancelar() {
    const modal = await this.modalController.create({
      component: ModalCancelarComponent,
    });

    return await modal.present();
  }

  listAuthors(authors: any) {
    let list = "";
    authors.forEach((author) => {
      list = list + ", " + author.name;
    });
    return list.substring(1);
  }

  ionChange(event: any) {
    if (event.detail.value && event.detail.value.length < 4) {
      return
    }
    this.page = 1;
    this.keyword = event.detail.value;
    this.eventInfiniteScroll = null;
    this.publications = [];
    this.getShopping();
  }

  doInfinite(event: any) {
    this.eventInfiniteScroll = event;
    this.page++;
    this.getShopping();
  }

  showCourse(item: any) {
    let dataSend = {
      id: item.id,
      slug: item.slug,
    }
    this.navController.navigateForward(["/course-classroom", JSON.stringify(dataSend)]);
  }

  showEvent(item: any) {
    let dataSend = {
      id: item.id,
      slug: item.slug,
    }
    if(item.subType === 'presential') {
      this.navController.navigateForward(["/event-detail", item.id]);
    } else {
      this.navController.navigateForward(["/event-classroom", JSON.stringify(dataSend)]);
    }
  }

  showMeeting(item: any) {
    let dataSend = {
      id: item.id,
      title: item.name,
    }
    this.navController.navigateForward(["/meeting-list", JSON.stringify(dataSend)]);
  }

  showCampaign(id: any) {
    this.navController.navigateForward(["/campaign-detail", id]);
  }
}
