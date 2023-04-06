import { Component, OnInit } from '@angular/core';
import { LeadGodsService } from '../../../services/api';
import { NavController } from '@ionic/angular';
import { IRecommend, Logo, Products } from 'src/services/utils/models/model.interface';
import { SlidersConf } from "../../../services/utils/constants/config.constant";
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {


  slideOptsCourses = SlidersConf;
  slideOptsEvents = SlidersConf;
  slideOptsMent = SlidersConf;
  slideOptsCampaign = SlidersConf;

  publications: any[] = [];
  recommend: IRecommend;
  logo: Logo;
  isLoading = true;
  skeletonList = [1, 2, 3];
  public isErrorData = false;

  constructor(
    public leadGodsService: LeadGodsService,
    public navController: NavController,
    public sanitizer: DomSanitizer
  ) {
  }

  ionViewWillEnter() {
    this.initData();
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.resetIframes();
  }

  resetIframes() {
    let listaFrames = document.getElementsByTagName("iframe") as HTMLCollectionOf<HTMLIFrameElement>;
    for (var index = 0; index < listaFrames.length; index++) {
      let iframe = listaFrames[index].contentWindow;
      iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }

  initData() {
    this.leadGodsService.getHome().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      (data: any) => {
        this.isErrorData = false;
        this.publications = data;
        // console.log('publications', this.publications);
      },
      error => {
        this.isErrorData = true;
      }
    )

    this.leadGodsService.getPartner().subscribe((data) => {
      this.logo = data.logo;
    })
    this.leadGodsService.getRecommend().subscribe((data) => {
      this.recommend = data;
    })
  }

  redirectMore(type) {
    this.navController.navigateRoot(`/app/search`, { queryParams: { type: type } });
  }

  showCourse($event) {
    // console.log('event 123',$event);
    if ($event.subscription.active) {
      let dataSend = {
        id: $event.id,
        slug: $event.slug,
      }
      this.navController.navigateForward(["/course-classroom", JSON.stringify(dataSend)]);
    } else {
      this.navController.navigateForward(['/course-detail', $event.id])
    }
  }

  showEvent($event) {
    if ($event.subscription.active && $event.subType !== 'presential') {
      let dataSend = {
        id: $event.id,
        slug: $event.slug,
      }
      this.navController.navigateForward(["/event-classroom", JSON.stringify(dataSend)]);
    } else if ($event.subscription.active && $event.subscription.active === 'presential') {
      this.navController.navigateForward(['/event-detail', $event.id])
    } else {
      this.navController.navigateForward(['/event-detail', $event.id])
    }
  }

  showMeeting($event) {
    this.navController.navigateForward(['/meeting-detail', $event.id])
  }

  showCampaign($event) {
    this.navController.navigateForward(['/campaign-detail', $event.id])
  }
}
