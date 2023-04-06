import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSendPage } from './password-send.page';

describe('PasswordSendPage', () => {
  let component: PasswordSendPage;
  let fixture: ComponentFixture<PasswordSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
