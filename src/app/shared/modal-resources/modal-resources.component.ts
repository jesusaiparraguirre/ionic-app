import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ClassroomService } from 'src/services/api/classroom.service';
import { TypeResourceDoc } from 'src/services/utils/enum/typeResource.enum';
import { ToastHelper } from 'src/services/utils/helpers/toast.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { isArray } from 'util';

@Component({
  selector: 'app-modal-resources',
  templateUrl: './modal-resources.component.html',
  styleUrls: ['./modal-resources.component.scss'],
})
export class ModalResourcesComponent implements OnInit {

  public segment: string = "tareas";
  public data: any = {}
  public schemes: any = []
  public materials: any = []
  public typeResourcesDoc = TypeResourceDoc;
  public typeTabsResources = [
    "tareas", "materiales", "esquemas"
  ]

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    public classroomService: ClassroomService,
    private toastHelper:ToastHelper,
    public sanitizer: DomSanitizer,
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
    console.log("----------------recursos ===============");
    this.data = this.navParams.get("data");
    // Linea 39 ajuste de front hasta que Joaquin arregle el attachment, descomentar linea 43
    this.initMaterials();
    if(this.data.attachments.schemes){
       this.initSchemes();
    }
    // if(this.data.attachments.materials){
    //   this.initMaterials();
    // }
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  initSchemes(){
    this.classroomService.getClassroomResources(this.data.key, 'schemes').subscribe((data)=>{
      this.schemes = data;
    })
  }

  initMaterials(){
    this.classroomService.getClassroomResources(this.data.key, 'materials').subscribe((data)=>{
      if(Array.isArray(data)){
        this.materials = data;
      }
    })
  }

  openUrl(uri:any){
    this.functionHelper.openUrl(uri);
  }

  downloadfile(docFile) {
    this.functionHelper.downloadDocFile(docFile);
  }

  openImage(url:string){
    this.functionHelper.openImage(url);
  }
}
