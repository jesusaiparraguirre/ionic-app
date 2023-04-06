import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TypeClassroom, TypeResource } from 'src/services/utils/enum/typeResource.enum';
import { AlertHelper } from 'src/services/utils/helpers/alert.helper';
import { FormatHelper } from 'src/services/utils/helpers/format.helper';
import { ItemHelper } from 'src/services/utils/helpers/item.helper';
import { FunctionHelper } from 'src/services/utils/helpers/function.helper';
import { IDatum, Item } from 'src/app/interface/data-room.interface';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.page.html',
  styleUrls: ['./course-modules.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseModulesPage implements OnInit {

  @Input() dataSessions: IDatum[] = [];
  @Input() keySelect: string | null | undefined;

  @Output() doModalResources = new EventEmitter<any>();
  @Output() doModalLinkPago = new EventEmitter<any>();
  @Output() doChooseSesion = new EventEmitter<Item | IDatum>();
  public typesClassroom = TypeClassroom;
  public typeResource = TypeResource;
  public currentIndex = 0;
  public currentIndexModule = 0;

  constructor(
    public itemHelper: ItemHelper,
    public alertHelper: AlertHelper,
    public formatHelper: FormatHelper,
    public cdRef: ChangeDetectorRef,
    private functionHelper: FunctionHelper
  ) { }

  ngOnInit() {
  }

  toModalResources(module: any) {
    if (!module.status) {
      return;
    }
    this.doModalResources.emit(module);
  }

  toModalLinkPago(module: any) {
    this.doModalLinkPago.emit(module);
  }

  toChooseSession(module: IDatum, item?: Item) {
    item && this.keySelectModule(item);
    this.keySelect = item ?  item.key : null;
    module.isOpen = true;
    this.doChooseSesion.emit(item || module);
  }


  keySelectModule(item: Item) {
    this.dataSessions = this.dataSessions.map(module => {
      module.isOpen = false;
      return module;
    })
  }

  ngAfterViewInit() {
    const accordions: NodeListOf<Element> = document.querySelectorAll('.accordion');
    // handle  cick
    const handleClick = accordion  => () => {
      const prevState = accordion.selected;
      if (accordion.dataset.multiselect !== undefined && accordion.dataset.multiselect === 'disabled') {
        [].forEach.call(accordions, accordion => {
          accordion.selected = false;
        });
      }
      accordion.selected = !prevState;
      [].forEach.call(accordions, accordion => {
        const container = accordion.querySelector('.accordion__container');
        if (container) {
          if (accordion.selected) {
            container.style.height = accordion.querySelector('.accordion__body').offsetHeight + 'px';
            accordion.setAttribute('aria-expanded', true);
            accordion.classList.add("activeItem");
          } else {
            container.style.height = null;
            accordion.setAttribute('aria-expanded', false);
            accordion.classList.remove("activeItem");
          }
        }
      });
    };
    [].forEach.call(accordions, (accordion: any) => {
      accordion.querySelector('.accordion__head').addEventListener('click', handleClick(accordion));
    });
  }

  openUrl(uri: any) {
    this.functionHelper.openUrl(uri);
  }

}
