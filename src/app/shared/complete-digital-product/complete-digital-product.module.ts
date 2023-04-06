import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteDigitalProductPageRoutingModule } from './complete-digital-product-routing.module';

import { CompleteDigitalProductPage } from './complete-digital-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteDigitalProductPageRoutingModule
  ],
  declarations: [CompleteDigitalProductPage]
})
export class CompleteDigitalProductPageModule {}
