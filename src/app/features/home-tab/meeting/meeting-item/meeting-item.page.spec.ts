import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingItemPage } from './meeting-item.page';

describe('MeetingItemPage', () => {
  let component: MeetingItemPage;
  let fixture: ComponentFixture<MeetingItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
