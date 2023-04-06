import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteDigitalProductPage } from './complete-digital-product.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteDigitalProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteDigitalProductPageRoutingModule {}
