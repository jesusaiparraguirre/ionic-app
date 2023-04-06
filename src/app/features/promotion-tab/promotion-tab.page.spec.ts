import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTabPage } from './promotion-tab.page';

describe('PromotionTabPage', () => {
  let component: PromotionTabPage;
  let fixture: ComponentFixture<PromotionTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
