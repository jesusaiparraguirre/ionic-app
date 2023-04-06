import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteMentoringPage } from './complete-mentoring.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteMentoringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteMentoringPageRoutingModule {}
