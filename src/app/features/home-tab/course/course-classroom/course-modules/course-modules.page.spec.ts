import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModulesPage } from './course-modules.page';

describe('CourseModulesPage', () => {
  let component: CourseModulesPage;
  let fixture: ComponentFixture<CourseModulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseModulesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
