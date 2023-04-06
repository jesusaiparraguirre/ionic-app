import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletePartnerPage } from './complete-partner.page';

const routes: Routes = [
  {
    path: '',
    component: CompletePartnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletePartnerPageRoutingModule {}
