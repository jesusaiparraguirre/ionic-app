import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteMentoringPageRoutingModule } from './complete-mentoring-routing.module';

import { CompleteMentoringPage } from './complete-mentoring.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteMentoringPageRoutingModule
  ],
  declarations: [CompleteMentoringPage]
})
export class CompleteMentoringPageModule {}
