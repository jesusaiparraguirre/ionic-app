import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetingPage } from './my-meeting.page';

describe('MyMeetingPage', () => {
  let component: MyMeetingPage;
  let fixture: ComponentFixture<MyMeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMeetingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
