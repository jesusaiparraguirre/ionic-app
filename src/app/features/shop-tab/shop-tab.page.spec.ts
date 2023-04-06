import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTabPage } from './shop-tab.page';

describe('ShopTabPage', () => {
  let component: ShopTabPage;
  let fixture: ComponentFixture<ShopTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
