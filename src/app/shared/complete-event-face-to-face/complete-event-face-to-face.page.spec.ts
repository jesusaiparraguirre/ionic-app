import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteEventFaceToFacePage } from './complete-event-face-to-face.page';

describe('CompleteEventFaceToFacePage', () => {
  let component: CompleteEventFaceToFacePage;
  let fixture: ComponentFixture<CompleteEventFaceToFacePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteEventFaceToFacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteEventFaceToFacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
