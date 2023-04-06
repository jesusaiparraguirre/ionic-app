import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteAdvancedCoursePage } from './complete-advanced-course.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteAdvancedCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteAdvancedCoursePageRoutingModule {}
