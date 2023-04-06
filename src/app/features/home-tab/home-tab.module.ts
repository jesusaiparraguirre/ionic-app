import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeTabPage } from './home-tab.page';
import { ComponentsModule } from 'src/app/shared/components.module';
import { CourseItemPage } from './course/course-item/course-item.page';
import { EventItemPage } from './event/event-item/event-item.page';
import { MeetingItemPage } from './meeting/meeting-item/meeting-item.page';
import { CampaignItemPage } from './campaign/campaign-item/campaign-item.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabPage
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
  exports:[
    CourseItemPage,
    EventItemPage,
    MeetingItemPage,
    CampaignItemPage
  ],
  declarations: [
    HomeTabPage,
    CourseItemPage,
    EventItemPage,
    MeetingItemPage,
    CampaignItemPage
  ]
})
export class HomeTabPageModule {}
