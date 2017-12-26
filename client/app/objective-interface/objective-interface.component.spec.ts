import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveInterfaceComponent } from './objective-interface.component';

describe('ObjectiveInterfaceComponent', () => {
  let component: ObjectiveInterfaceComponent;
  let fixture: ComponentFixture<ObjectiveInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
