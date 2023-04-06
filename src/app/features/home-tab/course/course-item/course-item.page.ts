import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LiveDesc } from 'src/services/utils/enum/product.enum';
import { StreamType } from 'src/services/utils/enum/stream.enum';
import { FormatHelper } from 'src/services/utils/helpers/format.helper';
import { Product } from 'src/services/utils/models/model.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.page.html',
  styleUrls: ['./course-item.page.scss'],
})
export class CourseItemPage implements OnInit {

  @Input() item: Product = {};
  @Input() ind?: string = "";
  @Output() doAction = new EventEmitter<Product>();
  public liveDesc = LiveDesc;
  public streamType = StreamType;
  public environment: any;

  constructor(
    public formatHelper: FormatHelper,
  ) {
      this.environment = environment;
   }

  ngOnInit() {
    // console.log('item',this.item);
  }

  toDoAction() {
    // console.log('item do action',this.item);
    this.doAction.emit( this.item );
  }

}
