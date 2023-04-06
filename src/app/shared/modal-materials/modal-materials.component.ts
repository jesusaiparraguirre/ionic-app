import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ClassroomService } from 'src/services/api/classroom.service';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';

@Component({
  selector: 'app-modal-materials',
  templateUrl: './modal-materials.component.html',
  styleUrls: ['./modal-materials.component.scss'],
})
export class ModalMaterialsComponent implements OnInit {

  public data: any = 0;
  public materials: any = []

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    public classroomService: ClassroomService,
    private functionHelper: FunctionHelper,
  ) { }

  ngOnInit() {
    this.data = this.navParams.get("data");
    // console.log(this.data);
    if(this.data){
      this.initMaterials();
    }
  }

  initMaterials(){
    this.classroomService.getClassroomResourcesModule(this.data).subscribe((data)=>{
      this.materials = data;
    })
  }

  openUrl(uri:any, name: string){
    this.functionHelper.openUrl(uri, name);
  }

  downloadfile(docFile) {
    this.functionHelper.downloadDocFile(docFile);
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

}
