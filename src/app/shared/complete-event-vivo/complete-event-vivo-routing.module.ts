import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteEventVivoPage } from './complete-event-vivo.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteEventVivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteEventVivoPageRoutingModule {}
