import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeletePage } from './delete.page';
import {LoaderModule} from '../../../loader';

const routes: Routes = [
  {
    path: '',
    component: DeletePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoaderModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeletePage]
})
export class DeletePageModule {}
