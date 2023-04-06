import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventClassroomPage } from './event-classroom.page';
import { ComponentsModule } from 'src/app/shared/components.module';
import { PlyrModule } from 'ngx-plyr';
import { EventSessionsPage } from './event-sessions/event-sessions.page';

const routes: Routes = [
  {
    path: '',
    component: EventClassroomPage
  }
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
  declarations: [
    EventClassroomPage,
    EventSessionsPage
  ]
})
export class EventClassroomPageModule {}
