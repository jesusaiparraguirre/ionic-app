import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageModule } from './register.module';

describe('SessionEmailPage', () => {
  let component: RegisterPageModule;
  let fixture: ComponentFixture<RegisterPageModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
