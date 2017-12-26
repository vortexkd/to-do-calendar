import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBoxAppoComponent } from './review-box-appo.component';

describe('ReviewBoxAppoComponent', () => {
  let component: ReviewBoxAppoComponent;
  let fixture: ComponentFixture<ReviewBoxAppoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBoxAppoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBoxAppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
