import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSynopsisComponent } from './task-synopsis.component';

describe('TaskSynopsisComponent', () => {
  let component: TaskSynopsisComponent;
  let fixture: ComponentFixture<TaskSynopsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSynopsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
