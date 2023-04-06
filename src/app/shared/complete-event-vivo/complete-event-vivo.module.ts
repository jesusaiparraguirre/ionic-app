import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteEventVivoPageRoutingModule } from './complete-event-vivo-routing.module';

import { CompleteEventVivoPage } from './complete-event-vivo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteEventVivoPageRoutingModule
  ],
  declarations: [CompleteEventVivoPage]
})
export class CompleteEventVivoPageModule {}
