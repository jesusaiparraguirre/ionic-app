import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { assoc, clone } from 'ramda';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoaderService } from '../../services';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  public totalRequests = 0;
  private requests: any;

  constructor(readonly loaderService: LoaderService) {
    this.requests = {};
  }

  // tslint:disable-next-line: completed-docs
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const initialState = {
      failed: false,
      loading: true,
    };
    this.requests = assoc(req.url, clone(initialState), this.requests);
    this.totalRequests++;
    this.showLoader();

    return next.handle(req).pipe(
      finalize(() => {
        this.decreaseRequests();
      })
    );
  }

  // tslint:disable-next-line: completed-docs
  private decreaseRequests(): void {
    this.totalRequests--;

    if (this.totalRequests === 0) {
      this.hideLoader();
    }
  }

  // tslint:disable-next-line: completed-docs
  private showLoader(): void {
    this.loaderService.show();
  }

  // tslint:disable-next-line: completed-docs
  private hideLoader(): void {
    this.loaderService.hide();
  }
}