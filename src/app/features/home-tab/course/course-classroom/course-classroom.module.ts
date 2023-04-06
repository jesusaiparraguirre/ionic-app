import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseClassroomPage } from './course-classroom.page';
import { ComponentsModule } from 'src/app/shared/components.module';
import { CourseModulesPage } from './course-modules/course-modules.page';
import { CourseSessionsPage } from './course-sessions/course-sessions.page';

import { PlyrModule } from 'ngx-plyr';

const routes: Routes = [
  {
    path: '',
    component: CourseClassroomPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PlyrModule,
  ],
  declarations: [CourseClassroomPage, CourseModulesPage, CourseSessionsPage],
})
export class CourseClassroomPageModule {}
