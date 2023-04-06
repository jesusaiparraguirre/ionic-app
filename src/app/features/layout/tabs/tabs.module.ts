import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {LayoutModule} from "../layout.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LayoutModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
