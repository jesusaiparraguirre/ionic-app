import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteEventFaceToFacePage } from './complete-event-face-to-face.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteEventFaceToFacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteEventFaceToFacePageRoutingModule {}
