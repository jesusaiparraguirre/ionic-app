import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTabPage } from './profile-tab.page';

describe('ProfileTabPage', () => {
  let component: ProfileTabPage;
  let fixture: ComponentFixture<ProfileTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
