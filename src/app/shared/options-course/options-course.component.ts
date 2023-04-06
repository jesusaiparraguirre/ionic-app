import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAboutCourseComponent } from '../modal-about-course/modal-about-course.component';
import { ModalMaterialsComponent } from '../modal-materials/modal-materials.component';
import { ModalValorizationComponent } from '../modal-valorization/modal-valorization.component';

@Component({
  selector: 'app-options-course',
  templateUrl: './options-course.component.html',
  styleUrls: ['./options-course.component.scss'],
})
export class OptionsCourseComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {}

    //More content
    async openIonModalMateriales() {
      const modal = await this.modalController.create({
        component: ModalMaterialsComponent
      });
  
      return await modal.present();
    }
  
    async openIonModalSobreCurso() {
      const modal = await this.modalController.create({
        component: ModalAboutCourseComponent
      });
  
      return await modal.present();
    }
  
    async openIonValoracion() {
      const modal = await this.modalController.create({
        component: ModalValorizationComponent
      });
  
      return await modal.present();
    }
  
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      if (!(event.target == document.getElementById("btnToggle"))) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  
    activeDropdown() {
      document.getElementById("customDropdown").classList.toggle("show");
    }
}
