import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { ItemHelper } from 'src/services/utils/helpers/item.helper';

@Component({
  selector: 'app-view-drip',
  templateUrl: './view-drip.component.html',
  styleUrls: ['./view-drip.component.scss'],
})
export class ViewDripComponent implements OnInit, OnDestroy {

  // @Input() drip: any;
  @Input() resourceRoom: any = {};
  suscribeEvnet: any;
  isDisabled: boolean;
  constructor(
    // private itemHelper: ItemHelper
    ) { }

  ngOnInit() {
    this.isDisabled = false;
  }

  backRoom(url: string){
    this.isDisabled = true;
    window.location.href = url;
  }

  ngOnDestroy(): void {
    this.suscribeEvnet && this.suscribeEvnet.unsubscribe();
  }
}
