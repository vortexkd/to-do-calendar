import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentDialogueComponent } from './create-appointment-dialogue.component';

describe('CreateAppointmentDialogueComponent', () => {
  let component: CreateAppointmentDialogueComponent;
  let fixture: ComponentFixture<CreateAppointmentDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppointmentDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
