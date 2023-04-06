import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteProjectPage } from './complete-project.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteProjectPageRoutingModule {}
