import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ModalSelectHourComponent } from './modal-select-hour/modal-select-hour.component';
import { ModalCancelarComponent } from './modal-cancelar/modal-cancelar.component';
import { ModalCalendarioComponent } from './modal-calendario/modal-calendario.component';
import { ModalCompletarComponent } from './modal-completar/modal-completar.component';
import { ModalPosponerComponent } from './modal-posponer/modal-posponer.component';
import { ModalReservarComponent } from './modal-reservar/modal-reservar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './tag/tag.component';
import { ModalResourcesComponent } from './modal-resources/modal-resources.component';
import { ModalLinkPayComponent } from './modal-link-pay/modal-link-pay.component';
import { AudioComponent } from './head-classroom/audio/audio.component';
import { ImageComponent } from './head-classroom/image/image.component';
import { LinkComponent } from './head-classroom/link/link.component';
import { LiveComponent } from './head-classroom/live/live.component';
import { LiveLinkComponent } from './head-classroom/live-link/live-link.component';
import { LivePlayerComponent } from './head-classroom/live-player/live-player.component';
import { MediaComponent } from './head-classroom/media/media.component';
import { PlyrModule } from 'ngx-plyr';
import { DefaultComponent } from './head-classroom/default/default.component';
import { ModalAboutCourseComponent } from './modal-about-course/modal-about-course.component';
import { ModalMaterialsComponent } from './modal-materials/modal-materials.component';
import { ModalValorizationComponent } from './modal-valorization/modal-valorization.component';
import { OptionsCourseComponent } from './options-course/options-course.component';
import { AudioPlayerComponent } from './head-classroom/audio-player/audio-player.component';
import { ViewDripComponent } from './head-classroom/view-drip/view-drip.component';

@NgModule({
  entryComponents: [
    ModalSelectHourComponent,
    ModalCancelarComponent,
    ModalCalendarioComponent,
    ModalCompletarComponent,
    ModalPosponerComponent,
    ModalReservarComponent,
    ModalResourcesComponent,
    ModalLinkPayComponent,
    ModalAboutCourseComponent,
    ModalMaterialsComponent,
    ModalValorizationComponent
  ],
  declarations: [
    ModalSelectHourComponent,
    ModalCancelarComponent,
    ModalCalendarioComponent,
    ModalCompletarComponent,
    ModalPosponerComponent,
    ModalReservarComponent,
    ModalResourcesComponent,
    ModalLinkPayComponent,
    ModalAboutCourseComponent,
    ModalMaterialsComponent,
    ModalValorizationComponent,
    TagComponent,
    AudioComponent,
    AudioPlayerComponent,
    ImageComponent,
    LinkComponent,
    LiveComponent,
    LiveLinkComponent,
    LivePlayerComponent,
    MediaComponent,
    DefaultComponent,
    OptionsCourseComponent,
    ViewDripComponent
  ],
  exports: [
    ModalSelectHourComponent,
    ModalCancelarComponent,
    ModalCalendarioComponent,
    ModalCompletarComponent,
    ModalPosponerComponent,
    ModalReservarComponent,
    ModalResourcesComponent,
    ModalLinkPayComponent,
    ModalAboutCourseComponent,
    ModalMaterialsComponent,
    ModalValorizationComponent,
    TagComponent,
    AudioComponent,
    AudioPlayerComponent,
    ImageComponent,
    LinkComponent,
    LiveComponent,
    LiveLinkComponent,
    LivePlayerComponent,
    MediaComponent,
    DefaultComponent,
    OptionsCourseComponent,
    ViewDripComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    PlyrModule
  ]
})
export class ComponentsModule { }
