import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyMeetingPage } from './my-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: MyMeetingPage
  }
];

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyMeetingPage]
})
export class MyMeetingPageModule {}
