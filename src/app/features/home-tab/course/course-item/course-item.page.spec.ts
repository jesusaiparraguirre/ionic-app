import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemPage } from './course-item.page';

describe('CourseItemPage', () => {
  let component: CourseItemPage;
  let fixture: ComponentFixture<CourseItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
