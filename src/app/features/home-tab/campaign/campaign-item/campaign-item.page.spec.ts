import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignItemPage } from './campaign-item.page';

describe('CampaignItemPage', () => {
  let component: CampaignItemPage;
  let fixture: ComponentFixture<CampaignItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
