import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from '../app/shared/components.module';
import { LeadGodsService, LeadGodsApiService, LoaderService } from 'src/services';
import { HttpConfigInterceptor } from './interceptors/httpConfig.interceptor';
import { LoginService } from '../services/api/login.service';
import { LoginGuard } from './guards/login.guard';
import { PlyrModule } from 'ngx-plyr';
import { LoaderModule } from './loader';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { NetworkInterface } from '@awesome-cordova-plugins/network-interface/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { PowerOptimization } from '@awesome-cordova-plugins/power-optimization/ngx';

import * as $ from 'jquery';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        CommonModule,
        LoaderModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        IonicModule.forRoot({
            rippleEffect: false,
            mode: 'ios'
        }),
        HttpClientModule,
        AppRoutingModule,
        ComponentsModule,
    ],
    providers: [
        LoginGuard,
        LeadGodsApiService,
        LoaderService,
        LeadGodsService,
        LoginService,
        StatusBar,
        SplashScreen,
        Clipboard,
        PlyrModule,
        InAppBrowser,
        PhotoViewer,
        NetworkInterface,
        BackgroundMode,
        PowerOptimization,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
