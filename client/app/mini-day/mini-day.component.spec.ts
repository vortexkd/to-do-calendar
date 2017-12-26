import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDayComponent } from './mini-day.component';

describe('MiniDayComponent', () => {
  let component: MiniDayComponent;
  let fixture: ComponentFixture<MiniDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
