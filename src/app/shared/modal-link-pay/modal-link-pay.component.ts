import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { ShoppingService } from 'src/services/api/shopping.service';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { finalize } from 'rxjs/operators';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';

@Component({
  selector: 'app-modal-link-pay',
  templateUrl: './modal-link-pay.component.html',
  styleUrls: ['./modal-link-pay.component.scss'],
})
export class ModalLinkPayComponent implements OnInit {

  public id:any;
  public linkUrl:any;
  public isActive:any = true;
  public url:any = "";

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    private shoppingService: ShoppingService,
    private toastHelper: ToastHelper,
    private clipboard: Clipboard,
    private platform: Platform,
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.url = this.navParams.get('url');
    this.initData();
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  initData(){
    this.shoppingService.getLinkShopping(this.id).pipe(
      finalize(() => {
        if(!this.linkUrl) { 
          this.linkUrl = 'Link no disponible'
        }
      })
    ).subscribe(
      data => {
        this.linkUrl = data.url;
        if(Array.isArray(data)){
          this.isActive = false;
        }
      } 
    )
  }

  async copyLink() {
    if(this.isActive){
      if(this.platform.is('desktop')){
        if (navigator.clipboard) {
          try {
            this.toastHelper.presentToastSuccess('Se copió en tu portapapeles correctamente: '+ this.linkUrl);
            await navigator.clipboard.writeText(this.linkUrl);
          } catch (err) {
            this.toastHelper.presentToastError();
          }
        }
      } else {
        this.toastHelper.presentToastSuccess('Se copió en tu portapapeles correctamente: '+ this.linkUrl);
        this.clipboard.copy(this.linkUrl);
      }
      this.functionHelper.openUrl(this.linkUrl);
    } else {
      this.toastHelper.presentToastError('Link de pago no disponible'); 
    }
  }
  

}
