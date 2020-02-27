import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTitleComponent } from './patient-title.component';

describe('PatientTitleComponent', () => {
  let component: PatientTitleComponent;
  let fixture: ComponentFixture<PatientTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
