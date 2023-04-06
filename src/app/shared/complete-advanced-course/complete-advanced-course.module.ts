import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteAdvancedCoursePageRoutingModule } from './complete-advanced-course-routing.module';

import { CompleteAdvancedCoursePage } from './complete-advanced-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteAdvancedCoursePageRoutingModule
  ],
  declarations: [CompleteAdvancedCoursePage]
})
export class CompleteAdvancedCoursePageModule {}
