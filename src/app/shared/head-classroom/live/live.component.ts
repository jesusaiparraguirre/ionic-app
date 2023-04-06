import { Component, Input, OnInit } from '@angular/core';
import { TypeResource } from 'src/services/utils/enum/typeResource.enum';
import { StreamTypeResources } from 'src/services/utils/enum/stream.enum';
import { IResource } from 'src/app/interface/data-room.interface';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit {
  @Input() resourceRoom: IResource | undefined;
  // public typeResource = TypeResource;
  public streamTypesResource = StreamTypeResources;

  constructor() {}

  ngOnInit() {
    window.screen.orientation.lock("portrait");
    console.log(this.resourceRoom, 'resourceRoomresourceRoom');


    // this.itemHelper.headerEmit$.subscribe(data => {
    //   if(data.type == this.typeResource.link){
    //     this.resourceRoom = data;
    //   }
    // });
  }
}
