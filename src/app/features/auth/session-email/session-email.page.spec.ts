import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEmailPage } from './session-email.page';

describe('SessionEmailPage', () => {
  let component: SessionEmailPage;
  let fixture: ComponentFixture<SessionEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
