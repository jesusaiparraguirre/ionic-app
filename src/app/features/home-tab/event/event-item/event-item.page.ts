import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LiveDesc } from 'src/services/utils/enum/product.enum';
import { StreamType } from 'src/services/utils/enum/stream.enum';
import { Product } from 'src/services/utils/models/model.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.page.html',
  styleUrls: ['./event-item.page.scss'],
})
export class EventItemPage implements OnInit {
  @Input() item: Product = {};
  @Input() ind?: string = '';
  @Output() doAction = new EventEmitter<Product>();
  public liveDesc = LiveDesc;
  public streamType = StreamType;
  public environment: any;

  constructor() {
    this.environment = environment;
  }

  ngOnInit() {}

  toDoAction() {
    this.doAction.emit(this.item);
  }
}
