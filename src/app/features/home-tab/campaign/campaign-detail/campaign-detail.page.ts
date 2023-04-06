import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from '../../../../../services/api/publication.service';
import { ModalController, NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StreamType } from 'src/services/utils/enum/stream.enum';
import { Location } from '@angular/common';
import { ModalLinkPayComponent } from 'src/app/shared/modal-link-pay/modal-link-pay.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.page.html', 
  styleUrls: ['./campaign-detail.page.scss'],
})
export class CampaignDetailPage implements OnInit {

  id: any = null;
  campaign: any = null;
  public streamType = StreamType;
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
        // console.log('CAMPAIGN', data);
        this.campaign = data;
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

  async openIonModalLinkPago(id:any) {
    const modal = await this.modalController.create({
      component: ModalLinkPayComponent,
      componentProps: {
        id: id,
      },
    });

    return await modal.present();
  }

  showCourse(item:any){
    if(Boolean(item.subscription.active)){
      let dataSend = {
          id:item.id,
          slug: item.slug,
      }
      this.navController.navigateForward(["/course-classroom", JSON.stringify(dataSend)]);
    } else {
      this.navController.navigateForward(['/course-detail', item.id])
    }
	}

  showEvent(item:any){
    // console.log('item aqui',item);
    if(Boolean(item.subscription.active)){
      let dataSend = {
          id:item.id,
          slug: item.slug,
      }
      this.navController.navigateForward(["/event-classroom", JSON.stringify(dataSend)]);
    } else {
      this.navController.navigateForward(['/event-detail', item.id])
    }
	}
	
}
