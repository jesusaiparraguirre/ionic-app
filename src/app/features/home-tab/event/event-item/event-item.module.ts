import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventItemPage } from './event-item.page';
import { ComponentsModule } from 'src/app/shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: EventItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  //declarations: [EventItemPage]
})
export class EventItemPageModule {}
