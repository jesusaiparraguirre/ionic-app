import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from '../../../../../services/api/publication.service';
import { ModalController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ModalLinkPayComponent } from 'src/app/shared/modal-link-pay/modal-link-pay.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  id: any = null;
  detail: any;
  iconShow: any = false;
  public show: number;
  event: any = null;
  public environment: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private navController: NavController,
    public sanitizer: DomSanitizer,
    public location: Location,
    private modalController: ModalController
  ) { 
    this.environment = environment;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.data;
      this.getPublication();
    });
  }

  getPublication() {
    this.publicationService.getPublicationDetail(this.id).subscribe(
      data => {
        // console.log('EVENT', data);
        this.event = data;
      }
    )
  }

  listAuthors(authors: any) {
    let list = '';
    authors.forEach(author => {
      list = list + ', ' + author.name;
    });
    return list.substring(1);
  }

  sumPriceTickets(prices:any[]){
    let sum = 0;
    for (let item of prices) {
      if(item.price) sum+= Number(item.price);
    }
    return sum;
  }

  ngAfterViewInit() {
    setTimeout(() => {
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
    }, 2000);
  }

  backButton() {
    this.navController.navigateRoot(['/app/home']);
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
}
