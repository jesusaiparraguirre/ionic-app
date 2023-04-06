import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoaderInterceptor} from '../interceptors/loader.interceptor';
import {LoaderService} from '../../services/api';

@NgModule({
    providers: [
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ],
})
export class LoaderModule {}
