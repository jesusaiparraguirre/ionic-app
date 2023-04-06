import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { ItemHelper } from 'src/services/utils/helpers/item.helper'
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { TypeResource } from 'src/services/utils/enum/typeResource.enum';
import { IResource } from 'src/app/interface/data-room.interface';
import { ClassroomService } from 'src/services/api/classroom.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() resourceRoom: IResource;
  @Output() public nextSessions = new EventEmitter();

  constructor(
    // private itemHelper: ItemHelper,
    private classroomService: ClassroomService,
    private functionHelper: FunctionHelper
  ) {}

  ngOnInit() {
    // this.itemHelper.headerEmit$.subscribe(data => {
    //   if(data.type == this.typeResource.image){
    //     this.resourceRoom = data;
    //   }
    // });
    setTimeout(() => {
      this.postAdvanced();
    }, 3000);
  }

  postAdvanced(): void {
    if (!this.resourceRoom) {
      return;
    }
    if (!this.resourceRoom.id) {
      return;
    }
    let model: any = {
      resourceId: this.resourceRoom.id,
      complete: true,
    };

    this.classroomService.postClassroomAdvanced(model).subscribe((res: any) => {
      this.nextSessions.emit({ key: this.resourceRoom.key });
    });
  }

  openImage(url: string) {
    this.functionHelper.openImage(url);
  }
}
