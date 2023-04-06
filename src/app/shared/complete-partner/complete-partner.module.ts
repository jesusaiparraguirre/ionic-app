import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletePartnerPageRoutingModule } from './complete-partner-routing.module';

import { CompletePartnerPage } from './complete-partner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletePartnerPageRoutingModule
  ],
  declarations: [CompletePartnerPage]
})
export class CompletePartnerPageModule {}
