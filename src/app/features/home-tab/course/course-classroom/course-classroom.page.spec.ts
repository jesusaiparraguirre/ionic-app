import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseClassroomPage } from './course-classroom.page';

describe('CourseClassroomPage', () => {
  let component: CourseClassroomPage;
  let fixture: ComponentFixture<CourseClassroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseClassroomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseClassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
