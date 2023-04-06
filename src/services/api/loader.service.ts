import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private readonly loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  automatic = true;

  constructor() {}

  show() {
    if (this.automatic) {
      this.loaderSubject.next({ show: true } as LoaderState);
    }
  }

  hide() {
    if (this.automatic) {
      this.loaderSubject.next({ show: false } as LoaderState);
    }
  }
}
