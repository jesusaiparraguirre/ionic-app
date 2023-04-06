import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseItemPage } from './course-item.page';
import { ComponentsModule } from 'src/app/shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: CourseItemPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  //declarations: [CourseItemPage]
})
export class CourseItemPageModule {}
