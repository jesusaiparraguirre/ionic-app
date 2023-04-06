import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs/tabs.page';
import { LoginGuard } from '../../guards/login.guard';
import { PublicationService } from '../../../services/api/publication.service';
import { ShoppingService } from '../../../services/api/shopping.service';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children:
            [
                {
                    path: '',
                    redirectTo: 'home',
                },
                {
                    path: 'home',
                    loadChildren: () => import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule),
                    canActivate: [LoginGuard],
                },
                {
                    path: 'search',
                    loadChildren: () => import('../search-tab/search-tab.module').then(m => m.SearchTabPageModule),
                    canActivate: [LoginGuard]
                },
                {
                    path: 'shop',
                    loadChildren: () => import('../shop-tab/shop-tab.module').then(m => m.ShopTabPageModule),
                    canActivate: [LoginGuard]

                },
                {
                    path: 'promotion',
                    loadChildren: () => import('../promotion-tab/promotion-tab.module').then(m => m.PromotionTabPageModule),
                    canActivate: [LoginGuard]
                },
                {
                    path: 'profile',
                    loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule),
                    canActivate: [LoginGuard]
                },
                {
                    path: 'my-meeting',
                    loadChildren: () => import('../profile-tab/my-meeting/my-meeting.module').then(m => m.MyMeetingPageModule),
                    canActivate: [LoginGuard]
                },
                {
                    path: 'delete',
                    loadChildren: () => import('../auth/delete/delete.module').then(m => m.DeletePageModule),
                    canActivate: [LoginGuard]
                },
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [RouterModule],
    providers: [PublicationService, ShoppingService]

})
export class LayoutModule {
}
