import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSessionsPage } from './course-sessions.page';

describe('CourseSessionsPage', () => {
  let component: CourseSessionsPage;
  let fixture: ComponentFixture<CourseSessionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSessionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
