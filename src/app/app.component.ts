import { Component, HostListener, OnInit, Optional } from '@angular/core';

import { Platform, LoadingController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LoaderService } from 'src/services';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { environment } from '../environments/environment';

var myScreenOrientation = window.screen.orientation;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isClosed = false;
  isLoader = false;
  isOpened = false;
  newLoader: any;
  showLoader = false;

  @HostListener('ionLoadingDidDismiss')
  ionLoadingDidDismiss() {
    this.isOpened = false;
    this.isClosed = false;
    this.newLoader = null;
  }

  @HostListener('ionLoadingDidPresent')
  ionLoadingDidPresent() {
    this.dismissLoading();
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    protected loaderService: LoaderService,
    protected loadingController: LoadingController,
    // private backgroundMode: BackgroundMode,
    // @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    myScreenOrientation.lock('portrait');

    this.platform.backButton.subscribeWithPriority(-1, () => {
      setTimeout(() => {
        myScreenOrientation.lock('portrait');
      }, 200);
    });

    // console.log('myScreenOrientation', myScreenOrientation);
    this.listenLoader();
  }

  initializeApp() {
    const context = this;
    this.platform.ready().then(() => {
      if (environment.android) {
        this.statusBar.styleBlackTranslucent();
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#0E0E0E');
      } else {
        this.statusBar.styleBlackOpaque();
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#0E0E0E');
      }
      this.splashScreen.hide();

      // this.backgroundMode.enable();
      // this.backgroundMode.setDefaults({ silent: true });
      // this.backgroundMode.on("deactivate").subscribe(() => {
      //     console.log('backgroundMode deactivate appcomponent');
      // })
      // this.backgroundMode.on('enable').subscribe(s => {
      //     console.log('backgroundMode enable appcomponent');
      // });
    });
  }

  listenLoader() {
    this.loaderService.loaderState
      .pipe(
        map((state) => state.show),
        distinctUntilChanged()
      )
      .subscribe((show: boolean) => {
        this.showLoader = show;

        if (show) {
          this.showLoading();
        } else {
          this.dismissLoading();
        }
      });
  }

  async dismissLoading() {
    if (this.newLoader && this.isOpened && !this.isClosed && !this.showLoader) {
      this.isClosed = true;
      await this.newLoader.dismiss();
    }
  }

  async showLoading() {
    if (!this.newLoader && !this.isOpened) {
      this.isOpened = true;

      this.newLoader = await this.loadingController.create({
        spinner: 'bubbles',
        message: '',
        animated: true,
        keyboardClose: false,
      });

      await this.newLoader.present();
    }
  }
}
