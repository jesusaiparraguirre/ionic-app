import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClassroomPage } from './event-classroom.page';

describe('EventClassroomPage', () => {
  let component: EventClassroomPage;
  let fixture: ComponentFixture<EventClassroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventClassroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventClassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
