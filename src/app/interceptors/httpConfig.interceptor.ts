import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable, throwError, from, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen, switchMap } from 'rxjs/operators';
import { GlobalService } from 'src/services';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    public globalService: GlobalService,
    private toastHelper: ToastHelper,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.globalService.getToken();

    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: token
        }
      });
    }
    return next.handle(request).pipe(
      retryWhen((error) => {
        // console.log(error, 'error interceprot');
        return error.pipe(
          mergeMap((error, index) => {
            if (index < 2 && error.status == 401) {
              if (index == 1) {
                this.toastHelper.presentToastError('Su sesión ha caducado, inicie sesión');
                this.globalService.logout();
              } else {
                return of(error).pipe(delay(2000));
              }
            }
            throw error;
          })
        )
      }
      )
    );
    // return next.handle(request);
  }
}
