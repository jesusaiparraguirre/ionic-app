import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from '../../../../../services/api/publication.service';
import { ModalController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ModalLinkPayComponent } from 'src/app/shared/modal-link-pay/modal-link-pay.component';
import { finalize } from "rxjs/operators";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
 
export class CourseDetailPage implements OnInit {

  id: any = null;
  detail: any;
  iconShow: any = false;
  course: any = null;
  public show: number;
  public isLoading = false;
  public environment: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private navController: NavController,
    public sanitizer: DomSanitizer,
    public location: Location,
    private modalController: ModalController,
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
    this.isLoading = true;
    this.publicationService.getPublicationDetail(this.id).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      data => {
        // console.log('COURSE', data);
        this.course = data;
      }
    )
  }

  transformSeconds(seconds: any) {
    const time = new Date(seconds * 1000).toISOString().substr(11, 8);
    return time;
  }

  listAuthors(authors: any) {
    let list = '';
    authors.forEach(author => {
      list = list + ', ' + author.name;
    });
    return list.substring(1);
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

  async openIonModalLinkPago(item:any) {
    let url;
    // console.log(item);
    this.publicationService.checkoutAndroid(item.id).subscribe(
      res=>{
        // console.log("res",res);
        url = res.url
      }
    );
    const modal = await this.modalController.create({
      component: ModalLinkPayComponent,
      componentProps: {
        id: item.price.id,
        url: url
      },
    });

    return await modal.present();
  }

  showClassroom(item){
    let dataSend = {
      id:item.id,
      slug: item.slug,
    }
    this.navController.navigateForward(["/course-classroom", JSON.stringify(dataSend)]);
  }

  subscribeFree(item){
    this.publicationService.postSuscribeFree(item.id).subscribe(
      (res:any)=>{
        let dataSend = {
          id:item.id,
          slug: item.slug,
        }
        this.navController.navigateForward(["/course-classroom", JSON.stringify(dataSend)]);
      },
      (err:any)=>{

      }
    );
  }
}
