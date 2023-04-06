import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteEventFaceToFacePageRoutingModule } from './complete-event-face-to-face-routing.module';

import { CompleteEventFaceToFacePage } from './complete-event-face-to-face.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteEventFaceToFacePageRoutingModule
  ],
  declarations: [CompleteEventFaceToFacePage]
})
export class CompleteEventFaceToFacePageModule {}
