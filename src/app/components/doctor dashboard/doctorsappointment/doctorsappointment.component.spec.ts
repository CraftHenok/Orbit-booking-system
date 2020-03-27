import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsappointmentComponent } from './doctorsappointment.component';

describe('DoctorsappointmentComponent', () => {
  let component: DoctorsappointmentComponent;
  let fixture: ComponentFixture<DoctorsappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
