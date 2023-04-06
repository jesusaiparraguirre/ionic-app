import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteProjectPageRoutingModule } from './complete-project-routing.module';

import { CompleteProjectPage } from './complete-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteProjectPageRoutingModule
  ],
  declarations: [CompleteProjectPage]
})
export class CompleteProjectPageModule {}
